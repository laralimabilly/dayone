import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

export default function SocialLinks() {
    return(
        <>
            <a href="#" className="text-secondary hover:text-accent text-xl">
                <FaLinkedin />
            </a>
            <a href="#" className="text-secondary-dark hover:text-accent text-xl">
                <FaInstagram />
            </a>
            <a href="#" className="text-secondary-dark hover:text-accent text-xl">
                <FaFacebook />
            </a>
        </>
    );
}