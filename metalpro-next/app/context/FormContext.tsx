'use client';

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';

// Типы для состояния формы
export interface FormState {
  isSubmitting: boolean;
  errors: Record<string, string>;
  isSuccess: boolean;
  data: Record<string, any>;
}

// Состояние всех форм
export interface FormsState {
  forms: Record<string, FormState>;
}

// Действия для редюсера
type FormAction =
  | { type: 'UPDATE_FORM'; payload: { formId: string; updates: Partial<FormState> } }
  | { type: 'RESET_FORM'; payload: { formId: string } }
  | { type: 'SET_SUBMITTING'; payload: { formId: string; isSubmitting: boolean } }
  | { type: 'SET_ERRORS'; payload: { formId: string; errors: Record<string, string> } }
  | { type: 'SET_SUCCESS'; payload: { formId: string; isSuccess: boolean } }
  | { type: 'SET_FORM_DATA'; payload: { formId: string; data: Record<string, any> } };

// Контекст форм
export interface FormContextType {
  state: FormsState;
  updateForm: (formId: string, updates: Partial<FormState>) => void;
  resetForm: (formId: string) => void;
  setSubmitting: (formId: string, isSubmitting: boolean) => void;
  setErrors: (formId: string, errors: Record<string, string>) => void;
  setSuccess: (formId: string, isSuccess: boolean) => void;
  setFormData: (formId: string, data: Record<string, any>) => void;
  getFormState: (formId: string) => FormState;
}

// Начальное состояние
const initialState: FormsState = {
  forms: {},
};

// Редюсер для управления состоянием форм
function formsReducer(state: FormsState, action: FormAction): FormsState {
  switch (action.type) {
    case 'UPDATE_FORM': {
      const { formId, updates } = action.payload;
      const currentForm = state.forms[formId] || {
        isSubmitting: false,
        errors: {},
        isSuccess: false,
        data: {},
      };
      return {
        ...state,
        forms: {
          ...state.forms,
          [formId]: {
            ...currentForm,
            ...updates,
          },
        },
      };
    }
    case 'RESET_FORM': {
      const { formId } = action.payload;
      const newForms = { ...state.forms };
      delete newForms[formId];
      return {
        ...state,
        forms: newForms,
      };
    }
    case 'SET_SUBMITTING': {
      const { formId, isSubmitting } = action.payload;
      const currentForm = state.forms[formId] || {
        isSubmitting: false,
        errors: {},
        isSuccess: false,
        data: {},
      };
      return {
        ...state,
        forms: {
          ...state.forms,
          [formId]: {
            ...currentForm,
            isSubmitting,
          },
        },
      };
    }
    case 'SET_ERRORS': {
      const { formId, errors } = action.payload;
      const currentForm = state.forms[formId] || {
        isSubmitting: false,
        errors: {},
        isSuccess: false,
        data: {},
      };
      return {
        ...state,
        forms: {
          ...state.forms,
          [formId]: {
            ...currentForm,
            errors,
          },
        },
      };
    }
    case 'SET_SUCCESS': {
      const { formId, isSuccess } = action.payload;
      const currentForm = state.forms[formId] || {
        isSubmitting: false,
        errors: {},
        isSuccess: false,
        data: {},
      };
      return {
        ...state,
        forms: {
          ...state.forms,
          [formId]: {
            ...currentForm,
            isSuccess,
          },
        },
      };
    }
    case 'SET_FORM_DATA': {
      const { formId, data } = action.payload;
      const currentForm = state.forms[formId] || {
        isSubmitting: false,
        errors: {},
        isSuccess: false,
        data: {},
      };
      return {
        ...state,
        forms: {
          ...state.forms,
          [formId]: {
            ...currentForm,
            data,
          },
        },
      };
    }
    default:
      return state;
  }
}

// Создание контекста
const FormContext = createContext<FormContextType | undefined>(undefined);

// Провайдер контекста
export function FormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(formsReducer, initialState);

  // Обновление состояния формы
  const updateForm = useCallback((formId: string, updates: Partial<FormState>) => {
    dispatch({ type: 'UPDATE_FORM', payload: { formId, updates } });
  }, []);

  // Сброс состояния формы
  const resetForm = useCallback((formId: string) => {
    dispatch({ type: 'RESET_FORM', payload: { formId } });
  }, []);

  // Установка состояния отправки
  const setSubmitting = useCallback((formId: string, isSubmitting: boolean) => {
    dispatch({ type: 'SET_SUBMITTING', payload: { formId, isSubmitting } });
  }, []);

  // Установка ошибок
  const setErrors = useCallback((formId: string, errors: Record<string, string>) => {
    dispatch({ type: 'SET_ERRORS', payload: { formId, errors } });
  }, []);

  // Установка успешного состояния
  const setSuccess = useCallback((formId: string, isSuccess: boolean) => {
    dispatch({ type: 'SET_SUCCESS', payload: { formId, isSuccess } });
  }, []);

  // Установка данных формы
  const setFormData = useCallback((formId: string, data: Record<string, any>) => {
    dispatch({ type: 'SET_FORM_DATA', payload: { formId, data } });
  }, []);

  // Получение состояния формы
  const getFormState = useCallback((formId: string): FormState => {
    return state.forms[formId] || {
      isSubmitting: false,
      errors: {},
      isSuccess: false,
      data: {},
    };
  }, [state.forms]);

  const value: FormContextType = {
    state,
    updateForm,
    resetForm,
    setSubmitting,
    setErrors,
    setSuccess,
    setFormData,
    getFormState,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

// Хук для использования контекста форм
export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}

// Удобный хук для работы с конкретной формой
export function useFormState(formId: string) {
  const { getFormState, updateForm, setSubmitting, setErrors, setSuccess, setFormData } = useFormContext();
  const formState = getFormState(formId);

  return {
    ...formState,
    updateForm: (updates: Partial<FormState>) => updateForm(formId, updates),
    setSubmitting: (isSubmitting: boolean) => setSubmitting(formId, isSubmitting),
    setErrors: (errors: Record<string, string>) => setErrors(formId, errors),
    setSuccess: (isSuccess: boolean) => setSuccess(formId, isSuccess),
    setFormData: (data: Record<string, any>) => setFormData(formId, data),
  };
}