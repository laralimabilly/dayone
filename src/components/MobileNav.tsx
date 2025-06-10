// src/components/MobileNav.jsx
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            className="md:hidden absolute top-full left-0 right-0 bg-dark py-4 border-t border-secondary/10"
          >
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <a href="#" className="nav-link py-2">About</a>
              <a href="#" className="nav-link py-2">Solutions</a>
              <a href="#" className="nav-link py-2">Our Team</a>
              <a href="#" className="nav-link py-2">Contact</a>
              <button className="btn-primary self-start mt-4">Get Started</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MobileNav;