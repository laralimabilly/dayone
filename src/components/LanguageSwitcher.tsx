// src/components/LanguageSelector.tsx - New component
import { useState, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { getCurrentLocale, setCurrentLocale, availableLocales, type Locale } from '../utils/i18n';

interface LanguageSelectorProps {
  variant?: 'header' | 'footer';
  showIcon?: boolean;
}

const LanguageSelector = ({ variant = 'header', showIcon = true }: LanguageSelectorProps) => {
  const [currentLocale, setCurrentLocaleState] = useState<Locale>('en');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Initialize locale
    setCurrentLocaleState(getCurrentLocale());

    // Listen for locale changes
    const handleLocaleChange = (event: CustomEvent<Locale>) => {
      setCurrentLocaleState(event.detail);
    };

    window.addEventListener('localeChanged', handleLocaleChange as EventListener);
    
    return () => {
      window.removeEventListener('localeChanged', handleLocaleChange as EventListener);
    };
  }, []);

  const handleLanguageChange = (locale: Locale) => {
    setCurrentLocale(locale);
    setCurrentLocaleState(locale);
    setIsOpen(false);
  };

  const currentLang = availableLocales.find(lang => lang.code === currentLocale);

  const baseClasses = variant === 'header' 
    ? "relative"
    : "relative w-full sm:w-auto";

  const buttonClasses = variant === 'header'
    ? "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-white/10"
    : "flex items-center justify-between gap-2 px-4 py-2 bg-white/10 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-white/20 w-full sm:w-auto";

  const dropdownClasses = variant === 'header'
    ? "absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-secondary/20 overflow-hidden z-50"
    : "absolute bottom-full left-0 mb-2 w-full sm:w-48 bg-white rounded-lg shadow-xl border border-secondary/20 overflow-hidden z-50";

  return (
    <div className={baseClasses}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClasses}
        aria-label="Select Language"
      >
        {showIcon && <Globe size={16} />}
        <span className="flex items-center gap-2">
          <span>{currentLang?.flag}</span>
          <span className="hidden sm:inline">{currentLang?.name}</span>
          <span className="sm:hidden">{currentLang?.code.toUpperCase()}</span>
        </span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className={dropdownClasses}>
            {availableLocales.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-200 ${
                  currentLocale === lang.code
                    ? 'bg-accent text-white'
                    : 'text-primary hover:bg-accent/10 hover:text-accent'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {currentLocale === lang.code && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;