// src/utils/i18n.ts - Global solution for static sites
import en from '../locales/en.json';
import pt from '../locales/pt.json';

const translations = {
  en,
  pt
};

export type Locale = keyof typeof translations;
export type TranslationKey = string;

// Global locale that persists across components
let globalLocale: Locale = 'en';

// Get current locale
export function getCurrentLocale(): Locale {
  // Client-side - read from localStorage
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('locale') as Locale;
    if (stored && stored in translations) {
      globalLocale = stored;
      return stored;
    }
    
    // Detect from browser
    const browserLang = navigator.language.split('-')[0] as Locale;
    if (browserLang && browserLang in translations) {
      localStorage.setItem('locale', browserLang);
      globalLocale = browserLang;
      return browserLang;
    }
    
    // Fallback to English
    localStorage.setItem('locale', 'en');
    globalLocale = 'en';
    return 'en';
  }
  
  // Server-side - return global locale
  return globalLocale;
}

// Set current locale (used by language selector)
export function setCurrentLocale(locale: Locale): void {
  globalLocale = locale;
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('locale', locale);
    
    // Dispatch custom event for React components
    window.dispatchEvent(new CustomEvent('localeChanged', { detail: locale }));
    
    // Update Astro components that use data attributes
    updateAstroTranslations(locale);
  }
}

// Translation function
export function t(key: TranslationKey, locale?: Locale): string {
  const targetLocale = locale || getCurrentLocale();
  const keys = key.split('.');
  let value: any = translations[targetLocale];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  // Fallback to English if translation not found
  if (value === undefined && targetLocale !== 'en') {
    let fallbackValue: any = translations.en;
    for (const k of keys) {
      fallbackValue = fallbackValue?.[k];
    }
    value = fallbackValue;
  }
  
  return value || key;
}

// Hook for Astro components - automatically uses global locale
export function useTranslations(): { t: (key: TranslationKey) => string; locale: Locale } {
  const currentLocale = getCurrentLocale();
  
  return {
    t: (key: TranslationKey) => t(key, currentLocale),
    locale: currentLocale
  };
}

// Update Astro translations on client-side
function updateAstroTranslations(locale: Locale): void {
  const translatableElements = document.querySelectorAll('[data-translate-key]');
  
  translatableElements.forEach(element => {
    const key = element.getAttribute('data-translate-key');
    if (key) {
      const translation = t(key, locale);
      
      if (element.getAttribute('data-translate-html') === 'true') {
        element.innerHTML = translation;
      } else {
        element.textContent = translation;
      }
    }
  });
}

// Initialize locale and set up global listeners (called only once from Layout)
export function initializeGlobalTranslations(): void {
  if (typeof window !== 'undefined' && !window.__i18nInitialized) {
    // Get the current locale to ensure it's set
    const currentLocale = getCurrentLocale();
    
    // Set up global listener for locale changes
    window.addEventListener('localeChanged', (event: CustomEvent) => {
      updateAstroTranslations(event.detail);
    });
    
    // Update translations immediately based on stored locale
    // Use a small delay to ensure DOM is ready
    setTimeout(() => {
      updateAstroTranslations(currentLocale);
    }, 0);
    
    window.__i18nInitialized = true;
  }
}

// Available locales
export const availableLocales: { code: Locale; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' }
];

// Extend window interface for TypeScript
declare global {
  interface Window {
    __i18nInitialized?: boolean;
  }
}