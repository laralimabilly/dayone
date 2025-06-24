// src/utils/emailjs.ts
import type { FormData, EmailJSConfig, EmailJSTemplateParams } from '../types/contact';
import { sanitizeFormData } from './contactValidation';

// EmailJS configuration
export const EMAILJS_CONFIG: EmailJSConfig = {
  serviceId: 'service_qjhc8sh',
  templateId: 'template_x22wvak',
  publicKey: '_E5yG9FVXM5glYWQE'
};

// Convert form data to EmailJS template parameters
export const createTemplateParams = (formData: FormData): Record<string, unknown> => {
  const sanitizedData = sanitizeFormData(formData);
  
  return {
    from_name: sanitizedData.name,
    email: sanitizedData.email,
    phone: sanitizedData.phone,
    company: sanitizedData.company,
    message: sanitizedData.message,
    // to_email: 'contato@dayonetalent.com' // Optional: if needed in template
  };
};

// Send email using EmailJS
export const sendContactEmail = async (formData: FormData): Promise<{ success: boolean; message: string }> => {
  try {
    // Dynamically import EmailJS to avoid SSR issues
    const emailjs = await import('@emailjs/browser');
    
    const templateParams = createTemplateParams(formData);
    
    console.log('Sending email with params:', templateParams);

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log('EmailJS Response:', response);

    if (response.status === 200) {
      return {
        success: true,
        message: 'Message sent successfully!'
      };
    } else {
      throw new Error(`Failed to send message. Status: ${response.status}`);
    }
  } catch (error: any) {
    console.error('EmailJS Error:', error);
    
    let errorMessage = 'Failed to send message. Please try again.';
    
    if (error.text) {
      errorMessage = `Error: ${error.text}`;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage
    };
  }
};

// Validate EmailJS configuration
export const validateEmailJSConfig = (): boolean => {
  const { serviceId, templateId, publicKey } = EMAILJS_CONFIG;
  
  if (!serviceId || !templateId || !publicKey) {
    console.error('EmailJS configuration is incomplete');
    return false;
  }
  
  return true;
};

// Initialize EmailJS (if needed for additional setup)
export const initializeEmailJS = async (): Promise<boolean> => {
  try {
    if (!validateEmailJSConfig()) {
      return false;
    }
    
    // Additional initialization logic can go here if needed
    return true;
  } catch (error) {
    console.error('Failed to initialize EmailJS:', error);
    return false;
  }
};