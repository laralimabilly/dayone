import { useTranslation } from '../hooks/useTranslation';

interface TranslatedTextProps {
  translationKey: string;
  fallback?: string;
  className?: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
}

const TranslatedText = ({ 
  translationKey, 
  fallback, 
  className = '', 
  as: Component = 'span' 
}: TranslatedTextProps) => {
  const { t } = useTranslation();
  
  const text = t(translationKey);
  const displayText = text !== translationKey ? text : (fallback || translationKey);

  return <Component className={className}>{displayText}</Component>;
};

export default TranslatedText;