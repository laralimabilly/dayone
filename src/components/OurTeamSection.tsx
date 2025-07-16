// src/components/OurTeamSection.tsx
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import type { Person } from '../types/person';
import TeamMember from './TeamMember';

const OurTeamSection = () => {
  
  const { t } = useTranslation();

  const persons: Person[] = [
    {
      id: 'fernanda-amorim',
      name: 'Fernanda Amorim',
      title: t('team.person.fernanda.title'),
      email: 'fernanda.amorim@dayonetalent.com',
      image: '/img/Fernanda.png',
      linkedinUrl: 'https://www.linkedin.com/in/fernandaamorim/',
      description: t('team.person.fernanda.description')
    },
    {
      id: 'claudio-guerreiro',
      name: 'Claudio Guerreiro',
      title: t('team.person.claudio.title'),
      email: 'claudio.guerreiro@dayonetalent.com',
      image: '/img/Claudio.png',
      linkedinUrl: 'https://www.linkedin.com/in/claudio-guerreiro/',
      description: t('team.person.claudio.description')
    },
    {
      id: 'carla-viborny',
      name: 'Carla Vyborny',
      title: t('team.person.carla.title'),
      email: 'carla.vyborny@dayonetalent.com',
      image: '/img/Carla.png',
      linkedinUrl: 'https://www.linkedin.com/in/carla-vyborny-96554523/',
      description: t('team.person.carla.description')
    },
    {
      id: 'roberta-viborny',
      name: 'Roberta Vyborny',
      title: t('team.person.roberta.title'),
      email: 'roberta.vyborny@dayonetalent.com',
      image: '/img/Roberta.png',
      linkedinUrl: 'https://www.linkedin.com/in/roberta-vyborny-389ba123/',
      description: t('team.person.roberta.description')
    }
  ];

  // Group persons by their title
  const groupedPersons = persons.reduce((acc, person) => {
    if (!acc[person.title]) {
        acc[person.title] = [];
    }
    acc[person.title].push(person);
    return acc;
    }, {} as Record<string, Person[]>);

  return (
    <section id="our-team" className="section bg-light">
      <div className="container mx-auto px-4 py-16">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-12 text-accent text-center"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('team.title')}
        </motion.h2>
        
        <motion.p 
          className="text-primary text-center max-w-full md:max-w-1/2 m-auto mb-8"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {t('team.subtitle')}
        </motion.p>
        
        {Object.entries(groupedPersons).map(([title, groupPersons], groupIndex) => (
          <motion.div 
            key={title} 
            className="mt-24 last:mb-0"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: groupIndex * 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl lg:text-2xl font-bold text-primary font-mono mb-8 text-center">
              {title}s
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
              {groupPersons.map((person, index) => (
                <motion.div
                  key={person.id}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <TeamMember person={person} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
        
        {/* Brand Symbol */}
        <motion.div 
          className="text-center mt-24"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.img 
            className="max-w-24 md:max-w-32 mx-auto opacity-60 hover:opacity-80 transition-opacity duration-300" 
            src="/img/DayOne_Symbol.svg" 
            alt="DayOne Brain Symbol"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default OurTeamSection;