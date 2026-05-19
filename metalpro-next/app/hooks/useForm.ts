'use client';

import { useState, useCallback, ChangeEvent, FormEvent, useRef, useEffect, useMemo } from 'react';
import { ValidationRule, validationRules as commonValidationRules, validateValue } from '@/app/utils/validation';

/**
 * Конфигурация поля формы
 */
export interface FieldConfig<T = any> {
  /** Начальное значение */
  initialValue: T;
  /** Правила валидации */
  rules?: ValidationRule<T>[];
  /** Обязательное ли поле */
  required?: boolean;
  /** Функция преобразования значения перед валидацией */
  transform?: (value: T) => T;
}

/**
 * Конфигурация формы
 */
export interface FormConfig<T extends Record<string, any>> {
  /** Конфигурация полей */
  fields: {
    [K in keyof T]: FieldConfig<T[K]>;
  };
  /** Функция отправки формы */
  onSubmit: (values: T) => Promise<void> | void;
  /** Валидация всей формы */
  validateForm?: (values: T) => Partial<Record<keyof T, string>> | null;
  /** Колбэк при успешной отправке */
  onSuccess?: (values: T) => void;
  /** Колбэк при ошибке */
  onError?: (error: any) => void;
  /** Включить ли дебаунс для предотвращения множественных отправок (мс) */
  debounceSubmit?: number;
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
}

/**
 * Хук для управления формой
 * @param config Конфигурация формы
 * @returns Объект с состоянием и методами управления
 */
export function useForm<T extends Record<string, any>>(config: FormConfig<T>) {
  // Инициализация состояния
  const initialValues = useMemo(() => {
    return Object.entries(config.fields).reduce(
      (acc, [key, fieldConfig]) => {
        acc[key as keyof T] = fieldConfig.initialValue;
        return acc;
      },
      {} as T
    );
  }, [config.fields]);

  const [state, setState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    isSubmitting: false,
    isSuccess: false,
    submitError: null,
    touched: {},
  });

  // Референс для таймера дебаунса
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

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
        return validateValue(transformedValue, fieldConfig.rules);
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
      const target = e.target;
      const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
      
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
    });
  }, [initialValues]);

  /**
   * Обработчик отправки формы с дебаунсом
   */
  const handleSubmit = useCallback(
    async (e?: FormEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      // Очистка предыдущего таймера дебаунса
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
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

      // Установка состояния отправки
      setState(prev => ({
        ...prev,
        isSubmitting: true,
        submitError: null,
      }));

      // Функция выполнения отправки с дебаунсом
      const executeSubmit = async () => {
        try {
          await config.onSubmit(state.values);
          
          // Успешная отправка
          setState(prev => ({
            ...prev,
            isSubmitting: false,
            isSuccess: true,
          }));

          config.onSuccess?.(state.values);
        } catch (error: any) {
          const errorMessage = error.message || 'Произошла ошибка при отправке формы';
          
          setState(prev => ({
            ...prev,
            isSubmitting: false,
            submitError: errorMessage,
          }));

          config.onError?.(error);
        }
      };

      // Применение дебаунса если указан
      const debounceTime = config.debounceSubmit ?? 0;
      if (debounceTime > 0) {
        debounceTimerRef.current = setTimeout(executeSubmit, debounceTime);
      } else {
        await executeSubmit();
      }
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
   * Получение пропсов для текстового поля (input, textarea, select)
   */
  const getFieldProps = (fieldName: keyof T) => {
    const value = state.values[fieldName];
    return {
      name: fieldName as string,
      value: typeof value === 'boolean' ? (value ? 'true' : 'false') : String(value ?? ''),
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
   * Получение пропсов для чекбокса
   */
  const getCheckboxProps = (fieldName: keyof T) => {
    return {
      name: fieldName as string,
      checked: Boolean(state.values[fieldName]),
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

  // Очистка таймера при размонтировании компонента
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
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
    
    // Методы
    handleChange,
    setFieldValue,
    handleSubmit,
    resetForm,
    validateForm,
    
    // Вспомогательные функции
    isValid,
    isFieldTouched,
    getFieldError,
    getFieldProps,
    getCheckboxProps,
    
    // Пропсы для формы
    formProps: {
      onSubmit: handleSubmit,
      noValidate: true,
    },
  };
}

/**
 * Предопределенные правила валидации (реэкспорт из утилит)
 */
export const validationRules = commonValidationRules;