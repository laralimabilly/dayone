import { useState, useEffect } from 'react';
import { getCurrentLocale, t, type Locale, type TranslationKey } from '../utils/i18n';

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    // Initialize with current locale
    setLocale(getCurrentLocale());

    // Listen for locale changes
    const handleLocaleChange = (event: CustomEvent<Locale>) => {
      setLocale(event.detail);
    };

    window.addEventListener('localeChanged', handleLocaleChange as EventListener);
    
    return () => {
      window.removeEventListener('localeChanged', handleLocaleChange as EventListener);
    };
  }, []);

  const translate = (key: TranslationKey) => t(key, locale);

  return {
    t: translate,
    locale,
    isReady: true // Always ready in this simple implementation
  };
}