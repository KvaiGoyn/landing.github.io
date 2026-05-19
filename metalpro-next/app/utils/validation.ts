/**
 * Утилиты валидации для форм
 */

export type ValidationRule<T = any> = {
  validator: (value: T, fieldName?: string) => boolean;
  message: string;
};

export type ValidationSchema<T extends Record<string, any>> = {
  [K in keyof T]?: ValidationRule<T[K]>[];
};

/**
 * Предопределенные правила валидации
 */
export const validationRules = {
  required: (message: string = 'Это поле обязательно для заполнения'): ValidationRule => ({
    validator: (value) => {
      if (typeof value === 'string') {
        return value.trim().length > 0;
      }
      if (typeof value === 'boolean') {
        return value === true;
      }
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== undefined && value !== null && value !== '';
    },
    message,
  }),

  email: (message: string = 'Введите корректный email адрес'): ValidationRule => ({
    validator: (value) => {
      if (!value) return true; // Если поле не обязательно, пустое значение пропускаем
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(String(value));
    },
    message,
  }),

  phone: (message: string = 'Введите корректный номер телефона'): ValidationRule => ({
    validator: (value) => {
      if (!value) return true;
      const digits = String(value).replace(/\D/g, '');
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

  numeric: (message: string = 'Введите числовое значение'): ValidationRule => ({
    validator: (value) => {
      if (!value) return true;
      return !isNaN(Number(value));
    },
    message,
  }),

  pattern: (regex: RegExp, message: string): ValidationRule => ({
    validator: (value) => {
      if (!value) return true;
      return regex.test(String(value));
    },
    message,
  }),
};

/**
 * Валидация значения по набору правил
 */
export function validateValue<T>(
  value: T,
  rules: ValidationRule<T>[] = []
): string | null {
  for (const rule of rules) {
    if (!rule.validator(value)) {
      return rule.message;
    }
  }
  return null;
}

/**
 * Валидация всей формы по схеме
 */
export function validateForm<T extends Record<string, any>>(
  values: T,
  schema: ValidationSchema<T>
): Partial<Record<keyof T, string>> {
  const errors: Partial<Record<keyof T, string>> = {};

  for (const fieldName in schema) {
    const fieldRules = schema[fieldName];
    if (fieldRules && fieldRules.length > 0) {
      const error = validateValue(values[fieldName], fieldRules);
      if (error) {
        errors[fieldName] = error;
      }
    }
  }

  return errors;
}

/**
 * Создание схемы валидации для формы
 */
export function createValidationSchema<T extends Record<string, any>>(
  schema: ValidationSchema<T>
): ValidationSchema<T> {
  return schema;
}