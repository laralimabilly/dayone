// src/components/OurTeamSection.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Person {
  id: string;
  name: string;
  title: string;
  email: string;
  image: string;
  linkedinUrl: string;
  description: string;
}

const persons: Person[] = [
  {
    id: 'fernanda-amorim',
    name: 'Fernanda Amorim',
    title: 'Managing Partner',
    email: 'fernanda.amorim@dayonetalent.com',
    image: '/img/Fernanda.png',
    linkedinUrl: 'https://www.linkedin.com/in/fernandaamorim/',
    description: 
        `Fernanda Amorim brings over 20 years of experience in executive search, with a strong track record leading more than 400 projects, and a reputation of delivering tailored, high-impact solutions with assertiveness and a sharp insight into digital transformation and human connections. \n
        She built her career in global firms such as KPMG, Michael Page, Page Executive, Oracle, and Indeed, where she developed deep expertise in business strategy and strategic hiring, as well as consultative B2B leadership. \n
        Most recently, as a Sr. Executive Partner at FIND HR, she led top management recruitment across players in tech, telecom and digital and championed diversity in leadership.`
  },
  {
    id: 'claudio-guerreiro',
    name: 'Claudio Guerreiro',
    title: 'Managing Partner',
    email: 'claudio.guerreiro@dayonetalent.com',
    image: '/img/Claudio.png',
    linkedinUrl: 'https://www.linkedin.com/in/claudio-guerreiro/',
    description: 
        `With over 20 years of experience in the technology sector, acquired at companies such as SAP and IBM, Claudio Guerreiro built a solid career as an executive before becoming an entrepreneur and entering the executive search market, where he worked as a partner at renowned consultancies such as 2Get and Heidrick & Struggles, in addition to being a board member of innovative companies. \n
        At FIND HR, he led the company's strategic expansion, expanding its service offering and strengthening its presence in executive recruitment for technology and digital transformation roles. \n
        His approach combines deep industry knowledge with a strong results-oriented mindset, focusing on assertiveness and excellence in executive recruitment.`
  },
  {
    id: 'carla-viborny',
    name: 'Carla Vyborny',
    title: 'Associate',
    email: 'carla.vyborny@dayonetalent.com',
    image: '/img/Carla.png',
    linkedinUrl: 'https://www.linkedin.com/in/carla-vyborny-96554523/',
    description: 
        `Carla has over 15 years of experience in executive recruitment, with a strong focus on leadership and senior management roles. She is recognized for her ability to deliver highly accurate, tailored solutions by combining business acumen, deep market knowledge, and a human-centered approach to professional connections. \n
        She built her career in specialized recruitment consultancies and executive search firms, working with companies such as Michael Page, Hays, Robert Walters, FIND, and Vyborny’s Consulting. She has contributed to strategic projects for major groups in the technology, industrial, and retail sectors. \n
        Throughout her career, she has developed expertise in building high-performance teams and supporting companies during moments of transformation, growth, or restructuring—always with a focus on strategic leadership and diversity. Her work emphasizes innovation, agility, and real business impact.`
  },
  {
    id: 'roberta-viborny',
    name: 'Roberta Vyborny',
    title: 'Associate',
    email: 'roberta.vyborny@dayonetalent.com',
    image: '/img/Roberta.png',
    linkedinUrl: 'https://www.linkedin.com/in/roberta-vyborny-389ba123/',
    description: 
        `An experienced professional with over 10 years in recruitment and selection, Roberta has a strong track record in strategic and leadership roles. Throughout her career, she has developed solid expertise in attracting, selecting, and developing talent for mid- and senior-level positions, directly contributing to the formation of high-performance teams and the strengthening of organizational culture in major companies. \n
        Her experience includes working as a Manager at Calzedonia Group, a global Italian retail company, where she led recruitment processes and market mapping initiatives. In addition, she has collaborated with specialized recruitment consultancies, delivering strategic projects for leading groups in the retail, industrial, and technology sectors—always focused on results, agility, and excellence in delivery. \n
        She is recognized for her analytical mindset, organizational diagnostic skills, and ability to align professional profiles with the unique needs of each business.`
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

const formatDescription = (text: string): string[] => {
  return text.split('\n\n').map(paragraph => paragraph.trim()).filter(p => p.length > 0);
};

// LinkedIn Icon Component
const LinkedInIcon = () => (
  <svg className="w-5 h-5 text-accent hover:text-accent-light transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TeamMember = ({ person }: { person: Person }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const paragraphs = formatDescription(person.description);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="group overflow-hidden transition-all duration-300 relative">
        <div className="relative z-10">
          {/* Image Section */}
          <div className="p-6 pb-0">
            <div className="relative mb-6">
              <motion.img
                src={person.image}
                alt={person.name}
                className="w-full max-w-xs mx-auto object-cover transition-shadow duration-300 cursor-pointer"
                onClick={openModal}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-6 pt-0">
            {/* Name and LinkedIn */}
            <div className="text-center mb-4">
              <a 
                href={person.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 group-link"
                title={`LinkedIn of ${person.name}`}
              >
                <motion.h4 
                  className="text-xl lg:text-2xl text-accent hover:text-accent/80 font-semibold transition-colors duration-300"
                  whileHover={{ y: -1 }}
                >
                  {person.name}
                </motion.h4>
                <LinkedInIcon />
              </a>
            </div>
            
            {/* Description Preview */}
            <div className="text-dark text-sm lg:text-base leading-relaxed space-y-3">
              {paragraphs.slice(0, 1).map((paragraph, index) => (
                <p key={index} className="text-justify">
                  {paragraph}
                </p>
              ))}
              
              {/* Read More Button */}
              {paragraphs.length > 2 && (
                <div className="pt-2">
                  <motion.button 
                    onClick={openModal}
                    className="text-accent hover:text-accent/80 flex items-center group-btn transition-colors duration-300 text-sm font-medium"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    Read More 
                    <motion.svg 
                      width="16" 
                      height="16" 
                      fill="currentColor" 
                      className="ml-1" 
                      viewBox="0 0 24 24"
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </motion.svg>
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal with Cookie Consent Style Backdrop */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop with blur effect */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={closeModal}
            />

            {/* Modal */}
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-dark border border-secondary/20 rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background effects */}
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-accent/10 rounded-full blur-2xl opacity-70"></div>
              <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-accent/10 rounded-full blur-2xl opacity-70"></div>

              <div className="relative z-10">
                {/* Modal Header */}
                <div className="sticky top-0 bg-dark/95 backdrop-blur-sm border-b border-secondary/20 p-6 flex items-center justify-between rounded-t-xl">
                  <div className="flex items-center gap-4">
                    <img 
                      src={person.image} 
                      alt={person.name}
                      className="absolute w-[110px] -left-[20px] -top-[22px] md:w-[150px] md:-left-[50px] md:top-auto"
                    />
                    <div className="ml-[65px] md:ml-[80px]">
                      <h3 className="text-xl font-semibold text-secondary">{person.name}</h3>
                      <p className="text-secondary/60 text-sm">{person.title}</p>
                    </div>
                  </div>
                  <motion.button 
                    onClick={closeModal}
                    className="p-2 hover:bg-secondary/10 rounded-lg transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-5 h-5 text-secondary/60" />
                  </motion.button>
                </div>
                
                {/* Modal Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <div className="flex items-center gap-3 mb-6">
                    <motion.a 
                      href={person.linkedinUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-accent hover:text-accent-light transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <LinkedInIcon />
                      Connect on LinkedIn
                    </motion.a>
                  </div>
                  
                  <div className="text-secondary/80 leading-relaxed space-y-4">
                    {paragraphs.map((paragraph, index) => (
                      <motion.p 
                        key={index}
                        className="text-justify"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const OurTeamSection = () => {
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
          Our Team
        </motion.h2>
        
        <motion.p 
          className="text-primary text-center max-w-full md:max-w-1/2 m-auto mb-8"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          At DAYONE, we believe that every great impact begins with the energy of the first day — and that true transformation happens when that
          energy is renewed, every single day. We focus on identifying leaders who don't just adapt — they drive the evolution of our clients.
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