'use client';

import { useState, useCallback, ChangeEvent, FormEvent, useRef, useEffect } from 'react';

/**
 * Правила валидации для поля
 */
export interface ValidationRule {
  /** Проверка значения (возвращает true если валидно) */
  validator: (value: any) => boolean;
  /** Сообщение об ошибке */
  message: string;
  /** Параметры для сложных валидаций */
  params?: Record<string, any>;
}

/**
 * Конфигурация поля формы
 */
export interface FieldConfig {
  /** Начальное значение */
  initialValue: any;
  /** Правила валидации */
  rules?: ValidationRule[];
  /** Обязательное ли поле */
  required?: boolean;
  /** Функция преобразования значения перед валидацией */
  transform?: (value: any) => any;
}

/**
 * Конфигурация формы
 */
export interface FormConfig<T extends Record<string, any>> {
  /** Конфигурация полей */
  fields: {
    [K in keyof T]: FieldConfig;
  };
  /** Функция отправки формы */
  onSubmit: (values: T) => Promise<void> | void;
  /** Валидация всей формы */
  validateForm?: (values: T) => Record<keyof T, string> | null;
  /** Колбэк при успешной отправке */
  onSuccess?: (values: T) => void;
  /** Колбэк при ошибке */
  onError?: (error: any) => void;
  /** Максимальное количество попыток повторной отправки при ошибках сети */
  maxRetries?: number;
  /** Начальная задержка между попытками в мс */
  retryDelay?: number;
  /** Включить ли автоматическую повторную отправку при сетевых ошибках */
  enableRetry?: boolean;
}

/**
 * Состояние формы
 */
export interface FormState<T extends Record<string, any>> {
  /** Значения полей */
  values: T;
  /** Ошибки валидации */
  errors: Partial<Record<keyof T, string>>;
  /** Отправляется ли форма */
  isSubmitting: boolean;
  /** Успешно ли отправлена форма */
  isSuccess: boolean;
  /** Общая ошибка формы */
  submitError: string | null;
  /** Были ли поля затронуты (touched) */
  touched: Partial<Record<keyof T, boolean>>;
  /** Количество выполненных попыток отправки */
  retryCount: number;
  /** Является ли текущая отправка повторной попыткой */
  isRetrying: boolean;
}

/**
 * Хук для управления формой
 * @param config Конфигурация формы
 * @returns Объект с состоянием и методами управления
 */
export function useForm<T extends Record<string, any>>(config: FormConfig<T>) {
  // Инициализация состояния
  const initialValues = Object.entries(config.fields).reduce(
    (acc, [key, fieldConfig]) => {
      acc[key as keyof T] = fieldConfig.initialValue;
      return acc;
    },
    {} as T
  );

  const [state, setState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    isSubmitting: false,
    isSuccess: false,
    submitError: null,
    touched: {},
    retryCount: 0,
    isRetrying: false,
  });

  /**
   * Валидация одного поля
   */
  const validateField = useCallback(
    (fieldName: keyof T, value: any): string | null => {
      const fieldConfig = config.fields[fieldName];
      if (!fieldConfig) return null;

      // Проверка на обязательность
      if (fieldConfig.required && (value === '' || value === null || value === undefined)) {
        return 'Это поле обязательно для заполнения';
      }

      // Применение трансформации если есть
      const transformedValue = fieldConfig.transform ? fieldConfig.transform(value) : value;

      // Проверка правил валидации
      if (fieldConfig.rules) {
        for (const rule of fieldConfig.rules) {
          if (!rule.validator(transformedValue)) {
            return rule.message;
          }
        }
      }

      return null;
    },
    [config.fields]
  );

  /**
   * Валидация всей формы
   */
  const validateForm = useCallback((): Partial<Record<keyof T, string>> => {
    const errors: Partial<Record<keyof T, string>> = {};

    // Валидация каждого поля
    Object.keys(config.fields).forEach((fieldName) => {
      const error = validateField(fieldName as keyof T, state.values[fieldName as keyof T]);
      if (error) {
        errors[fieldName as keyof T] = error;
      }
    });

    // Дополнительная валидация формы если предоставлена
    if (config.validateForm) {
      const formErrors = config.validateForm(state.values);
      if (formErrors) {
        Object.assign(errors, formErrors);
      }
    }

    return errors;
  }, [config.fields, config.validateForm, state.values, validateField]);

  /**
   * Обработчик изменения поля
   */
  const handleChange = useCallback(
    (fieldName: keyof T) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.value;
      
      setState(prev => {
        const newValues = { ...prev.values, [fieldName]: value };
        const error = validateField(fieldName, value);
        
        return {
          ...prev,
          values: newValues,
          errors: {
            ...prev.errors,
            [fieldName]: error || undefined,
          },
          touched: {
            ...prev.touched,
            [fieldName]: true,
          },
          submitError: null, // Сбрасываем ошибку отправки при изменении поля
        };
      });
    },
    [validateField]
  );

  /**
   * Установка значения поля вручную
   */
  const setFieldValue = useCallback(
    (fieldName: keyof T, value: any) => {
      setState(prev => {
        const newValues = { ...prev.values, [fieldName]: value };
        const error = validateField(fieldName, value);
        
        return {
          ...prev,
          values: newValues,
          errors: {
            ...prev.errors,
            [fieldName]: error || undefined,
          },
          touched: {
            ...prev.touched,
            [fieldName]: true,
          },
        };
      });
    },
    [validateField]
  );

  /**
   * Сброс формы к начальным значениям
   */
  const resetForm = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      isSubmitting: false,
      isSuccess: false,
      submitError: null,
      touched: {},
      retryCount: 0,
      isRetrying: false,
    });
  }, [initialValues]);

  // Референс для таймера повторной отправки
  const retryTimerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Обработчик отправки формы с поддержкой повторных попыток
   */
  const handleSubmit = useCallback(
    async (e?: FormEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      // Валидация формы
      const errors = validateForm();
      const hasErrors = Object.keys(errors).length > 0;

      setState(prev => ({
        ...prev,
        errors: errors as Partial<Record<keyof T, string>>,
        touched: Object.keys(config.fields).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {}
        ) as Partial<Record<keyof T, boolean>>,
        submitError: hasErrors ? 'Пожалуйста, исправьте ошибки в форме' : null,
      }));

      if (hasErrors) {
        return;
      }

      // Сброс счетчика повторных попыток при новой отправке
      setState(prev => ({
        ...prev,
        isSubmitting: true,
        submitError: null,
        retryCount: 0,
        isRetrying: false,
      }));

      // Внутренняя функция для выполнения отправки с повторными попытками
      const executeSubmit = async (currentRetryCount: number = 0): Promise<void> => {
        const maxRetries = config.maxRetries ?? 3;
        const retryDelay = config.retryDelay ?? 1000;
        const enableRetry = config.enableRetry ?? true;

        try {
          await config.onSubmit(state.values);
          
          // Успешная отправка
          setState(prev => ({
            ...prev,
            isSubmitting: false,
            isSuccess: true,
            isRetrying: false,
            retryCount: 0,
          }));

          config.onSuccess?.(state.values);
        } catch (error: any) {
          const isNetworkError = error.message?.includes('Network') ||
                                error.message?.includes('network') ||
                                error.message?.includes('Сетевая ошибка');
          
          // Проверяем, можно ли повторить отправку
          const canRetry = enableRetry &&
                          isNetworkError &&
                          currentRetryCount < maxRetries;

          if (canRetry) {
            const nextRetryCount = currentRetryCount + 1;
            const delay = retryDelay * Math.pow(2, currentRetryCount); // Экспоненциальная задержка
            
            // Устанавливаем состояние как повторная попытка
            setState(prev => ({
              ...prev,
              isRetrying: true,
              retryCount: nextRetryCount,
              submitError: `Сетевая ошибка. Повторная попытка ${nextRetryCount}/${maxRetries} через ${delay/1000} сек...`,
            }));

            // Планируем повторную попытку
            retryTimerRef.current = setTimeout(() => {
              executeSubmit(nextRetryCount);
            }, delay);
          } else {
            // Финальная ошибка
            const errorMessage = error.message || 'Произошла ошибка при отправке формы';
            
            setState(prev => ({
              ...prev,
              isSubmitting: false,
              isRetrying: false,
              submitError: errorMessage,
            }));

            config.onError?.(error);
          }
        }
      };

      // Запускаем отправку
      executeSubmit();
    },
    [config, state.values, validateForm]
  );

  /**
   * Проверка валидности формы
   */
  const isValid = Object.keys(state.errors).length === 0;

  /**
   * Проверка, было ли поле затронуто
   */
  const isFieldTouched = (fieldName: keyof T) => !!state.touched[fieldName];

  /**
   * Проверка, есть ли ошибка у поля
   */
  const getFieldError = (fieldName: keyof T) => state.errors[fieldName];

  /**
   * Получение пропсов для поля
   */
  const getFieldProps = (fieldName: keyof T) => {
    return {
      name: fieldName as string,
      value: state.values[fieldName],
      onChange: handleChange(fieldName),
      onBlur: () => {
        if (!state.touched[fieldName]) {
          setState(prev => ({
            ...prev,
            touched: { ...prev.touched, [fieldName]: true },
          }));
        }
      },
      'aria-invalid': !!state.errors[fieldName],
      'aria-describedby': state.errors[fieldName] ? `${String(fieldName)}-error` : undefined,
    };
  };

  /**
   * Функция отмены повторных попыток
   */
  const cancelRetry = useCallback(() => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
    setState(prev => ({
      ...prev,
      isRetrying: false,
    }));
  }, []);

  // Очистка таймера при размонтировании компонента
  useEffect(() => {
    return () => {
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
    };
  }, []);

  return {
    // Состояние
    values: state.values,
    errors: state.errors,
    isSubmitting: state.isSubmitting,
    isSuccess: state.isSuccess,
    submitError: state.submitError,
    touched: state.touched,
    retryCount: state.retryCount,
    isRetrying: state.isRetrying,
    
    // Методы
    handleChange,
    setFieldValue,
    handleSubmit,
    resetForm,
    validateForm,
    cancelRetry,
    
    // Вспомогательные функции
    isValid,
    isFieldTouched,
    getFieldError,
    getFieldProps,
    
    // Пропсы для формы
    formProps: {
      onSubmit: handleSubmit,
      noValidate: true,
    },
  };
}

/**
 * Предопределенные правила валидации
 */
export const validationRules = {
  required: (message: string = 'Это поле обязательно для заполнения'): ValidationRule => ({
    validator: (value) => {
      if (typeof value === 'string') {
        return value.trim().length > 0;
      }
      return value !== undefined && value !== null && value !== '';
    },
    message,
  }),
  
  email: (message: string = 'Введите корректный email адрес'): ValidationRule => ({
    validator: (value) => {
      if (!value) return true; // Если поле не обязательно, пустое значение пропускаем
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    message,
  }),
  
  phone: (message: string = 'Введите корректный номер телефона'): ValidationRule => ({
    validator: (value) => {
      if (!value) return true;
      const digits = value.replace(/\D/g, '');
      return digits.length >= 10;
    },
    message,
  }),
  
  minLength: (min: number, message?: string): ValidationRule => ({
    validator: (value) => {
      if (!value) return true;
      return String(value).length >= min;
    },
    message: message || `Минимальная длина: ${min} символов`,
  }),
  
  maxLength: (max: number, message?: string): ValidationRule => ({
    validator: (value) => {
      if (!value) return true;
      return String(value).length <= max;
    },
    message: message || `Максимальная длина: ${max} символов`,
  }),
};