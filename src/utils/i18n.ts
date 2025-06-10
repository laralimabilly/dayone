// src/utils/i18n.ts
import en from '../locales/en.json';
import pt from '../locales/pt.json';

const translations = {
  en,
  pt
};

export type Locale = keyof typeof translations;

export function useTranslations(locale: Locale = 'en') {
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return { t };
}

export function getStaticPaths() {
  return [
    { params: { lang: 'en' } },
    { params: { lang: 'pt' } }
  ];
}