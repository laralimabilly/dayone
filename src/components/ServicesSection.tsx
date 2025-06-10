import { Users, FileSearch, Award, BookOpen, BarChart, Handshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ServicesSection = () => {

  const {t} = useTranslation();

  const services = [
    {
      icon: Users,
      title: t('solutions.services.role.title'),
      description: t('solutions.services.role.description')
    },
    {
      icon: FileSearch,
      title: t('solutions.services.market.title'),
      description: t('solutions.services.market.description')
    },
    {
      icon: Award,
      title: t('solutions.services.assessment.title'),
      description: t('solutions.services.assessment.description')
    },
    {
      icon: BookOpen,
      title: t('solutions.services.resume.title'),
      description: t('solutions.services.resume.description')
    },
    {
      icon: BarChart,
      title: t('solutions.services.skills.title'),
      description: t('solutions.services.skills.description')
    },
    {
      icon: Handshake,
      title: t('solutions.services.programs.title'),
      description: t('solutions.services.programs.description')
    }
  ];

  return (
    <section className="bg-light py-24 text-primary folder-mask">
      <div className="container mx-auto px-6">
        {/* Featured section with image */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accent">
              {t('solutions.h2')}
            </h2>
            <h3 className="text-xl mb-6 text-primary">
              {t('solutions.h3')}
            </h3>
            <p className="text-primary/80 mb-8">
              {t('solutions.p')}
            </p>
            <button className="bg-accent text-white hover:bg-white hover:text-primary transition-colors px-8 py-3 rounded-full font-medium">
              Explore Solutions
            </button>

            {/* Services grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-24">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="group bg-secondary/30 p-6 rounded-xl border border-secondary hover:border-accent/50 transition-all duration-300 flex flex-col relative overflow-hidden"
                >
                  {/* Background effect similar to dashboard */}
                  <div className="absolute -right-16 -top-16 w-32 h-32 bg-accent/15 rounded-full blur-2xl opacity-70"></div>
                  <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-accent/15 rounded-full blur-2xl opacity-70"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-4 bg-accent/20 p-3 rounded-lg w-12 h-12 flex items-center justify-center group-hover:bg-accent/30 transition-colors duration-300">
                      <service.icon 
                        size={24} 
                        className="text-accent"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">
                      {service.title}
                    </h3>
                    <p className="text-primar text-sm">
                      {service.description}
                    </p>
                    {/* <div className="mt-4">
                      <button className="text-accent text-sm font-medium flex items-center group-hover:text-primary transition-colors duration-300">
                        Learn more 
                        <svg className="w-3 h-3 ml-1 group-hover:ml-2 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              {/* Mock API/HR Dashboard visualization */}
              <div className="bg-secondary/30 p-8 rounded-xl border border-secondary relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-accent/15 rounded-full blur-2xl"></div>
                <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-accent/15 rounded-full blur-2xl"></div>
                
                <div className="relative z-10 text-center mb-6">
                  <div className="inline-block bg-accent/20 p-3 rounded-lg mb-4">
                    <Users size={32} className="text-accent" />
                  </div>
                  <h4 className="text-xl font-bold text-primary">HR Management Dashboard</h4>
                </div>
                
                <div className="bg-light/70 rounded-lg p-4 mb-4 border border-accent/50">
                  <div className="flex justify-between items-center mb-3">
                    <div className="font-medium">Employee Performance</div>
                    <div className="text-accent">+12.4%</div>
                  </div>
                  <div className="w-full bg-secondary/30 h-2 rounded-full">
                    <div className="bg-accent h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
                
                <div className="flex gap-3 mb-4">
                  <div className="bg-light/70 rounded-lg p-4 flex-1 border border-accent/50">
                    <div className="text-dark/70 text-sm mb-1">New Hires</div>
                    <div className="text-xl font-bold">24</div>
                  </div>
                  <div className="bg-light/70 rounded-lg p-4 flex-1 border border-accent/50">
                    <div className="text-dark/70 text-sm mb-1">Retention</div>
                    <div className="text-xl font-bold">92%</div>
                  </div>
                </div>
                
                <div className="bg-light/70 rounded-lg p-4 border border-accent/50">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">Training Completion</div>
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`h-1 rounded-full ${i < 4 ? 'bg-accent' : 'bg-secondary/30'}`}></div>
                    ))}
                  </div>
                  <div className="text-sm text-dark/70 mt-2">4/5 modules completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default ServicesSection;