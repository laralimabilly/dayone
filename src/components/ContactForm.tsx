// src/components/ContactForm.tsx - Enhanced with validation and EmailJS
import { useState } from 'react';
import { User, Mail, Phone, Building, MessageSquare, Check, AlertCircle, Send } from 'lucide-react';
import type { 
  FormData, 
  FormErrors, 
  SubmissionState
} from '../types/contact';
import { 
  validateField, 
  validateForm, 
  hasFormErrors, 
  formatPhoneNumber 
} from '../utils/contactValidation';
import { sendContactEmail } from '../utils/emailjs';
import { FORM_CONFIG } from '../config/contact';

function ContactForm() {
  const [formData, setFormData] = useState<FormData>(FORM_CONFIG.DEFAULT_FORM_DATA);

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [submission, setSubmission] = useState<SubmissionState>({
    isSubmitting: false,
    isSuccess: false,
    error: null
  });

  // Validation rules
  const validateSingleField = (name: keyof FormData, value: string): string | undefined => {
    return validateField(name, value);
  };

  // Validate all fields
  const validateAllFields = (): boolean => {
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    return !hasFormErrors(newErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Special formatting for phone
    const finalValue = name === 'phone' ? formatPhoneNumber(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));

    // Clear field error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    // Reset submission state if user modifies form after success
    if (submission.isSuccess) {
      setSubmission(prev => ({ ...prev, isSuccess: false, error: null }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setTouched(prev => new Set(prev).add(name));
    
    // Validate field on blur
    const error = validateSingleField(name as keyof FormData, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched(new Set(Object.keys(formData)));
    
    // Validate form
    if (!validateAllFields()) {
      return;
    }

    setSubmission({
      isSubmitting: true,
      isSuccess: false,
      error: null
    });

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        setSubmission({
          isSubmitting: false,
          isSuccess: true,
          error: null
        });

        // Reset form after successful submission
        setFormData(FORM_CONFIG.DEFAULT_FORM_DATA);
        setTouched(new Set());
        setErrors({});

        // Auto-hide success message after configured duration
        setTimeout(() => {
          setSubmission(prev => ({ ...prev, isSuccess: false }));
        }, FORM_CONFIG.SUCCESS_MESSAGE_DURATION);
      } else {
        setSubmission({
          isSubmitting: false,
          isSuccess: false,
          error: result.message
        });
      }
    } catch (error: any) {
      console.error('Unexpected error:', error);
      
      setSubmission({
        isSubmitting: false,
        isSuccess: false,
        error: FORM_CONFIG.MESSAGES.error.fallback
      });
    }
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return touched.has(fieldName) ? errors[fieldName as keyof FormErrors] : undefined;
  };

  const hasFieldError = (fieldName: string): boolean => {
    return touched.has(fieldName) && !!errors[fieldName as keyof FormErrors];
  };

  return (
    <div className="bg-[#414F59]/30 p-4 sm:p-6 lg:p-8 rounded-xl border border-[#414F59] relative overflow-hidden">
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-[#E2A86B]/10 rounded-full blur-2xl"></div>
      <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-[#E2A86B]/10 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl sm:text-2xl font-bold text-secondary mb-4 sm:mb-6">Send us a message</h3>
        
        {/* Success Message */}
        {submission.isSuccess && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg flex items-center gap-3">
            <Check size={20} className="text-green-600 flex-shrink-0" />
            <div>
              <p className="text-green-800 font-medium">Message sent successfully!</p>
              <p className="text-green-700 text-sm">We'll get back to you within 24 hours.</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submission.error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-medium">{FORM_CONFIG.MESSAGES.error.title}</p>
              <p className="text-red-700 text-sm">{submission.error}</p>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Name field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-[#E0DFD5] font-medium text-sm sm:text-base">
                Name <span className="text-[#E2A86B]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={16} className={hasFieldError('name') ? FORM_CONFIG.STYLES.icon.error : FORM_CONFIG.STYLES.icon.normal} />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${FORM_CONFIG.STYLES.input.base} ${
                    hasFieldError('name') 
                      ? FORM_CONFIG.STYLES.input.error
                      : FORM_CONFIG.STYLES.input.normal
                  }`}
                  placeholder="Your name"
                  maxLength={50}
                />
              </div>
              {getFieldError('name') && (
                <p className="text-red-400 text-xs sm:text-sm flex items-center gap-1">
                  <AlertCircle size={12} />
                  {getFieldError('name')}
                </p>
              )}
            </div>
            
            {/* Email field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-[#E0DFD5] font-medium text-sm sm:text-base">
                Email <span className="text-[#E2A86B]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className={hasFieldError('email') ? FORM_CONFIG.STYLES.icon.error : FORM_CONFIG.STYLES.icon.normal} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${FORM_CONFIG.STYLES.input.base} ${
                    hasFieldError('email') 
                      ? FORM_CONFIG.STYLES.input.error
                      : FORM_CONFIG.STYLES.input.normal
                  }`}
                  placeholder="your.email@company.com"
                  maxLength={100}
                />
              </div>
              {getFieldError('email') && (
                <p className="text-red-400 text-xs sm:text-sm flex items-center gap-1">
                  <AlertCircle size={12} />
                  {getFieldError('email')}
                </p>
              )}
            </div>
            
            {/* Phone field */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-[#E0DFD5] font-medium text-sm sm:text-base">
                Phone <span className="text-[#E2A86B]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={16} className={hasFieldError('phone') ? FORM_CONFIG.STYLES.icon.error : FORM_CONFIG.STYLES.icon.normal} />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${FORM_CONFIG.STYLES.input.base} ${
                    hasFieldError('phone') 
                      ? FORM_CONFIG.STYLES.input.error
                      : FORM_CONFIG.STYLES.input.normal
                  }`}
                  placeholder="(11) 91234-5678"
                />
              </div>
              {getFieldError('phone') && (
                <p className="text-red-400 text-xs sm:text-sm flex items-center gap-1">
                  <AlertCircle size={12} />
                  {getFieldError('phone')}
                </p>
              )}
            </div>
            
            {/* Company field */}
            <div className="space-y-2">
              <label htmlFor="company" className="block text-[#E0DFD5] font-medium text-sm sm:text-base">
                Company <span className="text-[#E2A86B]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building size={16} className={hasFieldError('company') ? FORM_CONFIG.STYLES.icon.error : FORM_CONFIG.STYLES.icon.normal} />
                </div>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${FORM_CONFIG.STYLES.input.base} ${
                    hasFieldError('company') 
                      ? FORM_CONFIG.STYLES.input.error
                      : FORM_CONFIG.STYLES.input.normal
                  }`}
                  placeholder="Your company name"
                  maxLength={100}
                />
              </div>
              {getFieldError('company') && (
                <p className="text-red-400 text-xs sm:text-sm flex items-center gap-1">
                  <AlertCircle size={12} />
                  {getFieldError('company')}
                </p>
              )}
            </div>
          </div>
          
          {/* Message field */}
          <div className="space-y-2">
            <label htmlFor="message" className="block text-[#E0DFD5] font-medium text-sm sm:text-base">
              Message <span className="text-[#E2A86B]">*</span>
              <span className="text-[#E0DFD5]/60 text-xs ml-2">
                ({formData.message.length}/1000)
              </span>
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                <MessageSquare size={16} className={hasFieldError('message') ? FORM_CONFIG.STYLES.icon.error : FORM_CONFIG.STYLES.icon.normal} />
              </div>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${FORM_CONFIG.STYLES.textarea.base} ${
                  hasFieldError('message') 
                    ? FORM_CONFIG.STYLES.textarea.error
                    : FORM_CONFIG.STYLES.textarea.normal
                }`}
                placeholder="How can we help you? Please provide details about your needs..."
                maxLength={1000}
              />
            </div>
            {getFieldError('message') && (
              <p className="text-red-400 text-xs sm:text-sm flex items-center gap-1">
                <AlertCircle size={12} />
                {getFieldError('message')}
              </p>
            )}
          </div>
          
          {/* Submit button */}
          <div className="flex justify-end pt-2">
            <button 
              type="submit"
              disabled={submission.isSubmitting}
              className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base w-full sm:w-auto inline-flex items-center justify-center gap-2 transition-all duration-200 ${
                submission.isSubmitting
                  ? FORM_CONFIG.STYLES.button.loading
                  : FORM_CONFIG.STYLES.button.normal
              }`}
            >
              {submission.isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  {FORM_CONFIG.MESSAGES.loading}
                </>
              ) : (
                <>
                  <Send size={16} />
                  {FORM_CONFIG.MESSAGES.submit}
                </>
              )}
            </button>
          </div>
          
          {/* Form info */}
          <div className="text-center pt-2">
            <p className="text-[#E0DFD5]/60 text-xs">
              {FORM_CONFIG.MESSAGES.privacy.text}{' '}
              <a href="/privacy-policy" className="text-[#E2A86B] hover:text-[#E2A86B]/80 underline" title="Privacy Policy">
                {FORM_CONFIG.MESSAGES.privacy.linkText}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;