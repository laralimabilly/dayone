// src/components/SocialLinks.tsx - Enhanced version
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "../hooks/useTranslation";

interface SocialLinksProps {
    colorClass?: string;
    size?: string;
    className?: string;
}

export default function SocialLinks({ 
    colorClass = "text-dark hover:text-accent",
    size = "text-xl",
    className = ""
}: SocialLinksProps) {
    const linkClasses = `${colorClass} ${size} transition-colors duration-200 ${className}`;

    const { t } = useTranslation();
    
    return (
        <>
            <a 
                href="https://linkedin.com/company/dayonetalentadvisory" 
                className={linkClasses}
                title="LinkedIn"
                target="_blank"
            >
                <FaLinkedin />
            </a>
            <a 
                href={t('hero.social.whatsapp')} 
                className={linkClasses}
                title="WhatsApp"
                target="_blank"
            >
                <FaWhatsapp />
            </a>
        </>
    );
}