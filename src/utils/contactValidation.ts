// src/utils/contactValidation.ts
import type { FormData, FormErrors, FieldValidationConfig } from '../types/contact';

// Validation configuration for each field
export const FIELD_VALIDATION_CONFIG: FieldValidationConfig = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/
  },
  email: {
    required: true,
    maxLength: 100,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: {
    required: true,
    minLength: 10,
    maxLength: 15
  },
  company: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000
  }
};

// Field-specific validation functions
export const validateField = (name: keyof FormData, value: string): string | undefined => {
  const config = FIELD_VALIDATION_CONFIG[name];
  const trimmedValue = value.trim();

  // Required validation
  if (config.required && !trimmedValue) {
    return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
  }

  // Skip other validations if field is empty and not required
  if (!trimmedValue && !config.required) {
    return undefined;
  }

  // Min length validation
  if (config.minLength && trimmedValue.length < config.minLength) {
    return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${config.minLength} characters`;
  }

  // Max length validation
  if (config.maxLength && trimmedValue.length > config.maxLength) {
    return `${name.charAt(0).toUpperCase() + name.slice(1)} must be less than ${config.maxLength} characters`;
  }

  // Pattern validation
  if (config.pattern && !config.pattern.test(trimmedValue)) {
    return getPatternErrorMessage(name, config.pattern);
  }

  // Field-specific validation
  switch (name) {
    case 'phone':
      return validatePhone(value);
    case 'email':
      return validateEmail(trimmedValue);
    case 'name':
      return validateName(trimmedValue);
    default:
      return undefined;
  }
};

// Phone-specific validation
const validatePhone = (value: string): string | undefined => {
  const phoneDigits = value.replace(/\D/g, '');
  const config = FIELD_VALIDATION_CONFIG.phone;
  
  if (config.minLength && phoneDigits.length < config.minLength) {
    return `Phone must be at least ${config.minLength} digits`;
  }
  
  if (config.maxLength && phoneDigits.length > config.maxLength) {
    return `Phone must be less than ${config.maxLength} digits`;
  }
  
  return undefined;
};

// Email-specific validation
const validateEmail = (value: string): string | undefined => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address';
  }
  
  return undefined;
};

// Name-specific validation
const validateName = (value: string): string | undefined => {
  const namePattern = /^[a-zA-ZÀ-ÿ\s'-]+$/;
  
  if (!namePattern.test(value)) {
    return 'Name contains invalid characters';
  }
  
  return undefined;
};

// Get user-friendly pattern error messages
const getPatternErrorMessage = (fieldName: keyof FormData, pattern: RegExp): string => {
  switch (fieldName) {
    case 'email':
      return 'Please enter a valid email address';
    case 'name':
      return 'Name contains invalid characters';
    default:
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} format is invalid`;
  }
};

// Validate entire form
export const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};
  
  (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
    const error = validateField(key, formData[key]);
    if (error) {
      errors[key] = error;
    }
  });

  return errors;
};

// Check if form has any errors
export const hasFormErrors = (errors: FormErrors): boolean => {
  return Object.keys(errors).length > 0;
};

// Format phone number as user types
export const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  
  // For international numbers or longer formats
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

// Sanitize form data before submission
export const sanitizeFormData = (formData: FormData): FormData => {
  return {
    name: formData.name.trim(),
    email: formData.email.trim().toLowerCase(),
    phone: formData.phone.trim(),
    company: formData.company.trim(),
    message: formData.message.trim()
  };
};