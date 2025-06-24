// src/types/contact.ts
export interface FormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
  }
  
  export interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    message?: string;
  }
  
  export interface SubmissionState {
    isSubmitting: boolean;
    isSuccess: boolean;
    error: string | null;
  }
  
  export interface EmailJSConfig {
    serviceId: string;
    templateId: string;
    publicKey: string;
  }
  
  export interface EmailJSTemplateParams {
    from_name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
    to_email?: string;
  }
  
  // Validation rule type
  export type ValidationRule = (value: string) => string | undefined;
  
  // Field validation configuration
  export interface FieldValidation {
    required: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    customValidator?: ValidationRule;
  }
  
  export type FieldValidationConfig = {
    [K in keyof FormData]: FieldValidation;
  };
  
  // Form field configuration for dynamic form generation (if needed in the future)
  export interface FormFieldConfig {
    name: keyof FormData;
    label: string;
    type: 'text' | 'email' | 'tel' | 'textarea';
    placeholder: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    required: boolean;
    maxLength?: number;
    rows?: number; // For textarea
  }
  
  // Form submission response
  export interface FormSubmissionResponse {
    success: boolean;
    message: string;
    data?: any;
  }