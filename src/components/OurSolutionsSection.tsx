// src/components/OurSolutionsSection.tsx
import { Search, Users, TrendingUp } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const OurSolutionsSection = () => {

  const { t } = useTranslation();

  const solutions = [
    {
      icon: Search,
      title: t('solutions.executiveSearch.title'),
      description: t('solutions.executiveSearch.description'),
      subtitle: t('solutions.executiveSearch.subtitle'),
      imagePlaceholder: "/img/methodology/methodology-kickoff.jpg" // Placeholder for actual image
    },
    {
      icon: Users,
      title: t('solutions.talentAdvisory.title'),
      description: t('solutions.talentAdvisory.description'),
      subtitle: t('solutions.talentAdvisory.subtitle'),
      imagePlaceholder: "/img/methodology/methodology-assessment.jpg" // Placeholder for actual image
    },
    {
      icon: TrendingUp,
      title: t('solutions.careerTransition.title'),
      description: t('solutions.careerTransition.description'),
      subtitle: t('solutions.careerTransition.subtitle'),
      imagePlaceholder: "/img/methodology/methodology-closing.jpg" // Placeholder for actual image
    }
  ];

  return (
    <section id="our-solutions" className="bg-light py-24 text-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-accent">
            {t('solutions.title')}
          </h2>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {solutions.map((solution, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-xl border border-secondary/30 hover:border-accent/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <div 
                  className="w-full h-full bg-cover bg-center bg-gray-200"
                  style={{
                    backgroundImage: `url('${solution.imagePlaceholder}')`,
                    backgroundColor: '#f3f4f6' // Fallback color
                  }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/60 to-dark/30 group-hover:from-dark/95 group-hover:via-dark/70 group-hover:to-dark/40 transition-all duration-300"></div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -right-16 -top-16 w-32 h-32 bg-accent/20 rounded-full blur-2xl opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                  <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-accent/20 rounded-full blur-2xl opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                </div>

                {/* Placeholder content when no image */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/80 to-accent/60">
                  <solution.icon size={48} className="text-white/10" />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-end min-h-[400px] lg:min-h-[450px]">
                {/* Icon */}
                <div className="mb-4 lg:mb-6">
                  <div className="bg-accent/20 backdrop-blur-sm p-3 rounded-lg w-12 h-12 flex items-center justify-center group-hover:bg-accent/30 transition-all duration-300">
                    <solution.icon size={24} className="text-accent" />
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-3 lg:space-y-4">
                  <h3 className="text-lg lg:text-xl font-bold text-accent group-hover:text-accent-light transition-colors duration-300">
                    {solution.title}
                  </h3>
                  
                  <p className="text-secondary/90 text-sm lg:text-base leading-relaxed group-hover:text-secondary transition-colors duration-300">
                    {solution.description}
                  </p>
                  
                  <p className="text-secondary/75 text-xs lg:text-sm leading-relaxed group-hover:text-secondary/90 transition-colors duration-300">
                    {solution.subtitle}
                  </p>
                </div>

                {/* Action indicator */}
                {/* <div className="mt-4 lg:mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="flex items-center text-accent text-sm font-medium">
                    Learn more
                    <svg 
                      className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div> */}
              </div>

              {/* Hover border effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/30 rounded-xl transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 md:mt-48">
          <div className="bg-secondary/30 p-6 sm:p-8 rounded-xl border border-secondary/50 inline-block relative overflow-hidden max-w-2xl">
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-accent/10 rounded-full blur-2xl opacity-70"></div>
            <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-accent/10 rounded-full blur-2xl opacity-70"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl lg:text-2xl font-bold text-primary mb-4">
                {t('solutions.cta.title')}
              </h3>
              <p className="text-primary/80 mb-6 text-sm lg:text-base">
                {t('solutions.cta.subtitle')}
              </p>
              <button 
                className="bg-accent text-white hover:bg-white hover:text-primary transition-colors px-6 lg:px-8 py-3 lg:py-4 rounded-full font-medium inline-flex items-center gap-2 text-sm lg:text-base"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                title={t('common.getStarted')}
              >
                {t('common.getStarted')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurSolutionsSection;