import { FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function SocialLinks() {
    return(
        <>
            <a href="https://linkedin.com/company/dayonetalentadvisory" className="text-dark hover:text-accent text-xl" title="LinkedIn">
                <FaLinkedin />
            </a>
            <a href="https://wa.me/5511997127227?Hey%2C%20I%20would%20like%20to%20know%20more%20about..." className="text-dark hover:text-accent text-xl" title="WhatsApp">
                <FaWhatsapp />
            </a>
        </>
    );
}