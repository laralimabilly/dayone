// src/components/SocialLinks.tsx - Enhanced version
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";

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
    
    return (
        <>
            <a 
                href="https://linkedin.com/company/dayonetalentadvisory" 
                className={linkClasses}
                title="LinkedIn"
            >
                <FaLinkedin />
            </a>
            <a 
                href="https://wa.me/5511997127227?Hey%2C%20I%20would%20like%20to%20know%20more%20about..." 
                className={linkClasses}
                title="WhatsApp"
            >
                <FaWhatsapp />
            </a>
        </>
    );
}