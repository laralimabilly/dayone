// src/components/HeroAnimation.jsx
import { motion } from 'framer-motion';

function HeroAnimation() {
  return (
    <>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-6xl mb-6 text-secondary"
      >
        Connecting<br />Top Companies with<br />
        <span className="font-bold">Exceptional Talent</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-lg md:text-xl mb-8 text-secondary/80 max-w-2xl"
      >
        Our Talent Advisory and Executive Search firm is specialized in building AI ready leadership teams for companies undergoing expansion, transformation, and market entry.
      </motion.p>
    </>
  );
}

export default HeroAnimation;