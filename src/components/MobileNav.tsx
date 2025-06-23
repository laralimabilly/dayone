// src/components/MobileNav.tsx (Fixed)
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from 'astro:assets';
import logo from '../assets/DayOne_Logo_Light.png';

function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMenuOpen(false);
    
    // Check if it's a homepage anchor link
    if (href.startsWith('/#')) {
      if (window.location.pathname === '/') {
        // We're on homepage, scroll to section
        e.preventDefault();
        
        const targetId = href.substring(2); // Remove /#
        
        // Small delay to allow menu to close
        setTimeout(() => {
          const targetElement = document.getElementById(targetId);
          if (!targetElement) return;
          
          const header = document.querySelector('header');
          const headerHeight = header ? header.offsetHeight : 80;
          
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
      // If we're not on homepage, let the browser navigate normally
    }
    // For regular links like /blog, let them work normally
  };

  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsMenuOpen(false);
    
    if (window.location.pathname === '/') {
      // We're on homepage, scroll to contact
      const targetElement = document.getElementById('contact');
      if (targetElement) {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Navigate to homepage contact section
      window.location.href = '/#contact';
    }
  };

  const navItems = [
    { href: '/#our-solutions', label: 'Our Solutions', isHash: true },
    { href: '/#our-team', label: 'Our Team', isHash: true },
    { href: '/blog', label: 'Blog', isHash: false },
  ];

  return (
    <div className="md:hidden">
      {/* Mobile menu button */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="relative z-[100] text-secondary hover:text-accent transition-colors duration-200 p-2"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        type="button"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop and Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed h-dvh inset-0 bg-black/50 z-[90]"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ 
                type: 'tween',
                duration: 0.3,
                ease: 'easeInOut'
              }}
              className="fixed top-0 right-0 h-dvh w-80 max-w-[90vw] bg-dark border-l border-secondary/20 z-[95] shadow-2xl"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-secondary/20">
                <Image 
                  src={logo} 
                  alt="Logo Day One" 
                  class="h-8 w-auto" 
                />
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col p-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.1 }}
                    className="flex items-center justify-between py-4 px-4 rounded-lg text-secondary hover:text-accent hover:bg-secondary/10 transition-all duration-200"
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    <span className="text-lg font-medium">{item.label}</span>
                    <svg 
                      width="16" 
                      height="16" 
                      fill="currentColor" 
                      className="opacity-50"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                  </motion.a>
                ))}
              </nav>

              {/* CTA Section */}
              <div className="p-6 border-t border-secondary/20">
                <button 
                  className="w-full bg-accent text-white hover:bg-accent/90 transition-colors px-6 py-4 rounded-full font-medium text-lg"
                  onClick={handleContactClick}
                  type="button"
                >
                  Get Started
                </button>
                
                {/* Contact Info */}
                <div className="mt-6 text-center space-y-2">
                  <p className="text-secondary/60 text-sm">Let's Talk!</p>
                  <a 
                    href="mailto:contato@dayonetalent.com"
                    className="block text-accent hover:text-accent/80 transition-colors text-sm font-medium"
                    title="Mail to contato@dayonetalent.com"
                  >
                    contato@dayonetalent.com
                  </a>
                  <a 
                    href="tel:+5511997127227"
                    className="block text-accent hover:text-accent/80 transition-colors text-sm font-medium"
                    title="Call +55 11 99712-7227"
                  >
                    +55 11 99712-7227
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MobileNav;