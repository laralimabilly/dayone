// src/components/CookieConsent.tsx
import { useState, useEffect } from 'react';
import { Cookie, X, Check, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';

const CookieConsent = () => {

  const { t } = useTranslation();

  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    const consentTimestamp = localStorage.getItem('cookie-consent-timestamp');
    
    // Show modal if no consent or consent is older than 6 months
    if (!consent || !consentTimestamp || 
        Date.now() - parseInt(consentTimestamp) > 6 * 30 * 24 * 60 * 60 * 1000) {
      setIsVisible(true);
    }

    // Listen for cookie policy clicks to reopen the modal
    const handleCookiePolicyClick = () => {
      setIsVisible(true);
      setShowDetails(false); // Reset details state when reopening
    };

    // Add event listener for cookie policy button
    document.addEventListener('cookie-policy-click', handleCookiePolicyClick);

    // Cleanup
    return () => {
      document.removeEventListener('cookie-policy-click', handleCookiePolicyClick);
    };
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-timestamp', Date.now().toString());
    setIsVisible(false);
    
    // Enable GTM
    enableGTM();
  };

  const handleDeclineAll = () => {
    localStorage.setItem('cookie-consent', 'declined');
    localStorage.setItem('cookie-consent-timestamp', Date.now().toString());
    setIsVisible(false);
    
    // Disable GTM and clear existing data
    disableGTM();
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary-only');
    localStorage.setItem('cookie-consent-timestamp', Date.now().toString());
    setIsVisible(false);
    
    // Disable GTM but keep necessary cookies
    disableGTM();
  };

  const enableGTM = () => {
    // Enable GTM data collection
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });
    }
  };

  const disableGTM = () => {
    // Disable GTM data collection
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('consent', 'update', {
          'analytics_storage': 'denied',
          'ad_storage': 'denied'
        });
      }
      
      // Clear GTM cookies
      const gtmCookies = ['_ga', '_ga_*', '_gid', '_gat', '_gtag_*'];
      gtmCookies.forEach(cookieName => {
        if (cookieName.includes('*')) {
          // Handle wildcard cookies
          const prefix = cookieName.replace('*', '');
          Object.keys(document.cookie.split(';')).forEach(cookie => {
            const name = cookie.split('=')[0].trim();
            if (name.startsWith(prefix)) {
              deleteCookie(name);
            }
          });
        } else {
          deleteCookie(cookieName);
        }
      });
    }
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`;
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-end justify-center p-4 pointer-events-none">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto"
          onClick={() => setIsVisible(false)}
        />

        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-dark border border-secondary/20 rounded-xl shadow-2xl pointer-events-auto overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute -right-16 -top-16 w-32 h-32 bg-accent/10 rounded-full blur-2xl opacity-70"></div>
          <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-accent/10 rounded-full blur-2xl opacity-70"></div>

          <div className="relative z-10 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-accent/20 p-2 rounded-lg">
                  <Cookie size={20} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-secondary">{t('cookies.title')}</h3>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-secondary/60 hover:text-secondary transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="mb-6">
              <p className="text-secondary/80 text-sm leading-relaxed mb-4">
                {t('cookies.description')}
              </p>

              {/* Details Toggle */}
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="text-accent hover:text-accent-light text-sm font-medium flex items-center gap-2 mb-4"
              >
                <Shield size={16} />
                {showDetails ? t('cookies.showDetails') : t('cookies.hideDetails')}
                <svg 
                  className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Cookie Details */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-primary/20 rounded-lg p-4 mb-4 space-y-3"
                  >
                    <div>
                      <h4 className="text-secondary font-medium text-sm mb-1">{t('cookies.necessary.title')}</h4>
                      <p className="text-secondary/70 text-xs">{t('cookies.necessary.description')}</p>
                    </div>
                    <div>
                      <h4 className="text-secondary font-medium text-sm mb-1">{t('cookies.analytics.title')}</h4>
                      <p className="text-secondary/70 text-xs">{t('cookies.analytics.description')}</p>
                    </div>
                    <div>
                      <h4 className="text-secondary font-medium text-sm mb-1">{t('cookies.marketing.title')}</h4>
                      <p className="text-secondary/70 text-xs">{t('cookies.marketing.description')}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleAcceptAll}
                className="flex-1 bg-accent text-white hover:bg-accent-light transition-colors px-4 py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2"
              >
                <Check size={16} />
                {t('cookies.acceptAll')}
              </button>
              
              <button 
                onClick={handleAcceptNecessary}
                className="flex-1 border border-secondary/30 text-secondary hover:bg-secondary/10 transition-colors px-4 py-3 rounded-lg font-medium text-sm"
              >
               {t('cookies.necessaryOnly')}
              </button>
              
              <button 
                onClick={handleDeclineAll}
                className="flex-1 border border-red-500/30 text-red-300 hover:bg-red-500/10 transition-colors px-4 py-3 rounded-lg font-medium text-sm"
              >
                {t('cookies.declineAll')}
              </button>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-secondary/20">
              <p className="text-secondary/60 text-xs text-center">
                {t('cookies.footer')}{' '}
                <a href="/privacy-policy" title="Privacy Policy" className="text-accent hover:text-accent-light underline">
                  {t('privacy.title')}
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Extend window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default CookieConsent;