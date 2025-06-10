// src/components/MobileNav.tsx
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close mobile menu
    
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;
    
    // Calculate header height for offset
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    
    // Scroll to target with offset for fixed header
    const targetPosition = targetElement.offsetTop - headerHeight - 20; // 20px extra padding
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-secondary hover:text-accent"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-dark py-4 border-t border-secondary/10 z-50"
          >
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <a 
                href="#solutions" 
                className="nav-link py-2"
                onClick={(e) => handleNavClick(e, 'solutions')}
              >
                Solutions
              </a>
              <a 
                href="#methodology" 
                className="nav-link py-2"
                onClick={(e) => handleNavClick(e, 'methodology')}
              >
                How We Work
              </a>
              <a 
                href="#about" 
                className="nav-link py-2"
                onClick={(e) => handleNavClick(e, 'about')}
              >
                Our Team
              </a>
              <a 
                href="#contact" 
                className="nav-link py-2"
                onClick={(e) => handleNavClick(e, 'contact')}
              >
                Contact
              </a>
              <button 
                className="btn-primary self-start mt-4"
                onClick={(e) => handleNavClick(e, 'contact')}
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MobileNav;