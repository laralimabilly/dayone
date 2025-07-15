import en from '../locales/en.json';
import pt from '../locales/pt.json';

const translations = {
  en,
  pt
};

export type Locale = keyof typeof translations;
export type TranslationKey = string;

// Server-side default (for Astro SSR)
let serverLocale: Locale = 'en';

// Get current locale (works on both server and client)
export function getCurrentLocale(): Locale {
  // Client-side
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('locale') as Locale;
    if (stored && stored in translations) {
      return stored;
    }
    
    // Detect from browser
    const browserLang = navigator.language.split('-')[0] as Locale;
    if (browserLang && browserLang in translations) {
      localStorage.setItem('locale', browserLang);
      return browserLang;
    }
    
    // Fallback to English
    localStorage.setItem('locale', 'en');
    return 'en';
  }
  
  // Server-side - return default or detected locale
  return serverLocale;
}

// Set current locale
export function setCurrentLocale(locale: Locale): void {
  serverLocale = locale; // Update server-side cache
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('locale', locale);
    // Dispatch custom event for React components
    window.dispatchEvent(new CustomEvent('localeChanged', { detail: locale }));
    // Dispatch event for Astro components that need to reload
    window.dispatchEvent(new CustomEvent('astroLocaleChanged', { detail: locale }));
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

// Hook for Astro components
export function useTranslations(locale?: Locale) {
  const targetLocale = locale || getCurrentLocale();
  
  return {
    t: (key: TranslationKey) => t(key, targetLocale),
    locale: targetLocale
  };
}

// Initialize locale from browser/storage
export function initializeLocale(): void {
  if (typeof window !== 'undefined') {
    getCurrentLocale(); // This will set up localStorage if needed
  }
}

// Available locales
export const availableLocales: { code: Locale; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' }
];