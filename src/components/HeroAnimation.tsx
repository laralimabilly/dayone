// src/components/HeroAnimation.tsx
import { motion } from 'framer-motion';

function HeroAnimation() {
  return (
    <>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 lg:mb-8 text-dark leading-tight"
      >
        <span className="block">Connecting</span>
        <span className="block">Great Companies with</span>
        <span className="font-bold block">Exceptional Talent</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl mb-6 sm:mb-8 lg:mb-12 text-dark/80 max-w-full sm:max-w-2xl lg:max-w-3xl leading-relaxed"
      >
        Our Talent Advisory and Executive Search firm specializes in building AI-ready leadership teams for companies undergoing expansion, transformation, and market entry.
      </motion.p>
    </>
  );
}

export default HeroAnimation;