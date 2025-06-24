// src/config/contact.ts
import { User, Mail, Phone, Building, MessageSquare } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { FormFieldConfig } from '../types/contact';

// Form field configurations for dynamic rendering (if needed)
export const FORM_FIELDS: FormFieldConfig[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Your name',
    icon: User,
    required: true,
    maxLength: 50
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'your.email@company.com',
    icon: Mail,
    required: true,
    maxLength: 100
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    placeholder: '(555) 123-4567',
    icon: Phone,
    required: true
  },
  {
    name: 'company',
    label: 'Company',
    type: 'text',
    placeholder: 'Your company name',
    icon: Building,
    required: true,
    maxLength: 100
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    placeholder: 'How can we help you? Please provide details about your needs...',
    icon: MessageSquare,
    required: true,
    maxLength: 1000,
    rows: 4
  }
];

// Form configuration constants
export const FORM_CONFIG = {
  // Auto-hide success message after this duration (ms)
  SUCCESS_MESSAGE_DURATION: 5000,
  
  // Default form values
  DEFAULT_FORM_DATA: {
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  },
  
  // Form styling classes
  STYLES: {
    input: {
      base: 'bg-[#2C2F34]/70 text-secondary w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border transition-all duration-200 text-sm sm:text-base',
      normal: 'border-[#414F59]/50 focus:border-[#E2A86B] focus:outline-none focus:ring-1 focus:ring-[#E2A86B]',
      error: 'border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400'
    },
    textarea: {
      base: 'bg-[#2C2F34]/70 text-secondary w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border transition-all duration-200 resize-none text-sm sm:text-base',
      normal: 'border-[#414F59]/50 focus:border-[#E2A86B] focus:outline-none focus:ring-1 focus:ring-[#E2A86B]',
      error: 'border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400'
    },
    icon: {
      normal: 'text-[#E0DFD5]/50',
      error: 'text-red-400'
    },
    button: {
      normal: 'bg-accent text-white hover:bg-white hover:text-primary',
      loading: 'bg-gray-400 text-gray-200 cursor-not-allowed'
    }
  },
  
  // Form messages
  MESSAGES: {
    success: {
      title: 'Message sent successfully!',
      description: "We'll get back to you within 24 hours."
    },
    error: {
      title: 'Failed to send message',
      fallback: 'An unexpected error occurred. Please try again.'
    },
    loading: 'Sending...',
    submit: 'Send Message',
    privacy: {
      text: 'By submitting this form, you agree to our',
      linkText: 'Privacy Policy'
    }
  }
};

// Success/Error message types for better type safety
export type MessageType = 'success' | 'error';

// Form submission states
export const SUBMISSION_STATES = {
  IDLE: 'idle',
  SUBMITTING: 'submitting',
  SUCCESS: 'success',
  ERROR: 'error'
} as const;

export type SubmissionState = typeof SUBMISSION_STATES[keyof typeof SUBMISSION_STATES];