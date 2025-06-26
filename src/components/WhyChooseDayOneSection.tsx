// src/components/WhyChooseDayOneSection.tsx
import { Heart, Target, Users, TrendingUp } from 'lucide-react';

interface WhyChooseDayOneSectionProps {
  useFolderMask?: boolean
}

const WhyChooseDayOneSection = (useFolderMask: WhyChooseDayOneSectionProps) => {
  const features = [
    {
      icon: Users,
      title: "Boutique mindset. Senior attention.",
      description: "Personalized service with experienced partners leading every engagement"
    },
    {
      icon: Target,
      title: "Deep industry expertise in Tech, Digital Products, Marketing and Sales.",
      description: "Specialized knowledge in the sectors that drive digital transformation"
    },
    {
      icon: Heart,
      title: "Human-focused. Strategy-driven.",
      description: "Balancing analytical precision with genuine human connection and empathy"
    },
    {
      icon: TrendingUp,
      title: "Tailored journeys. Tangible outcomes.",
      description: "Customized approaches that deliver measurable results for your organization"
    }
  ];

  return (
    <section id="why-choose" className={`bg-light py-24 text-primary ${useFolderMask ? 'folder-mask' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-accent">
            Why Choose DayOne
          </h2>
          
          {/* Subtitle */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl lg:text-2xl font-medium text-primary/90 leading-relaxed">
              Not just search. Not just advice. A true leadership partner.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-secondary/50 backdrop-blur-sm p-6 lg:p-8 rounded-xl border border-primary/20 hover:border-accent/50 transition-all duration-300 hover:shadow-lg relative overflow-hidden"
            >
              {/* Background decorative elements */}
              <div className="absolute -right-12 -top-12 w-24 h-24 bg-accent/10 rounded-full blur-2xl opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
              
              <div className="relative z-10 flex items-start gap-4 lg:gap-6">
                {/* Icon */}
                <div className="flex-shrink-0 bg-accent/20 p-3 lg:p-4 rounded-lg group-hover:bg-accent/30 transition-all duration-300">
                  <feature.icon size={24} className="text-accent lg:w-6 lg:h-6" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg lg:text-xl font-semibold text-primary mb-2 lg:mb-3 leading-tight group-hover:text-accent transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-primary/70 text-sm lg:text-base leading-relaxed group-hover:text-primary/85 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Hover border effect */}
              <div className="absolute inset-0 border border-transparent group-hover:border-accent/20 rounded-xl transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom Quote */}
        
        <div className="text-center">
            <div className="max-w-4xl mx-auto mb-12">
                <p className="text-xl lg:text-2xl font-medium text-primary/90 leading-relaxed">
                    Because Leadership begins every day.
                </p>
          </div>
        </div>

        {/* Optional CTA Button */}
        <div className="text-center mt-12">
          <button 
            className="bg-accent text-white hover:bg-white hover:text-primary px-6 lg:px-8 py-3 lg:py-4 rounded-full font-medium inline-flex items-center gap-2 text-sm lg:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            Start Your Leadership Journey
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseDayOneSection;