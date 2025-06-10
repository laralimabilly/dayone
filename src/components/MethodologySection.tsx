import { Users, Target, Search, UserCheck, BarChart, Handshake, Calendar, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const MethodolodySection = () => {

    const {t} = useTranslation();

    const methodologySteps = [
        {
          icon: Users,
          title: "Kickoff",
          subtitle: "Strategic & Cultural Alignment",
          description: "Deep dive sessions with HR and area leaders to understand your organizational culture, strategic goals, and specific leadership requirements.",
          details: ["Cultural assessment", "Stakeholder interviews", "Strategic goal mapping"],
          image: "/img/methodology/methodology-kickoff.jpg" // Suggested: Business meeting, diverse team discussion
        },
        {
          icon: Target,
          title: "Role Definition",
          subtitle: "Commitment Between Parts",
          description: "Precise definition of role specifications, success metrics, and mutual commitments to ensure perfect alignment throughout the process.",
          details: ["Role specification", "Success criteria", "Timeline agreement"],
          image: "/img/methodology/methodology-definition.jpg" // Suggested: Document collaboration, whiteboard planning
        },
        {
          icon: Search,
          title: "Active Mapping",
          subtitle: "Targeted Hunting",
          description: "Comprehensive market research and proactive candidate identification using our extensive network and advanced sourcing techniques.",
          details: ["Market intelligence", "Network activation", "Talent mapping"],
          image: "/img/methodology/methodology-mapping.jpg" // Suggested: Network visualization, talent search interface
        },
        {
          icon: UserCheck,
          title: "Assessment",
          subtitle: "Technical & Behavioral Evaluation",
          description: "Multi-dimensional evaluation process combining technical competency assessment with cultural fit and leadership potential analysis.",
          details: ["Technical evaluation", "Behavioral assessment", "Leadership analysis"],
          image: "/img/methodology/methodology-assessment.jpg" // Suggested: Interview process, evaluation charts
        },
        {
          icon: BarChart,
          title: "Weekly Deliveries",
          subtitle: "Pipeline Information",
          description: "Regular progress updates with detailed candidate profiles, market insights, and transparent communication throughout the search process.",
          details: ["Progress reports", "Candidate profiles", "Market insights"],
          image: "/img/methodology/methodology-reporting.jpg" // Suggested: Dashboard analytics, progress charts
        },
        {
          icon: Handshake,
          title: "Closing Support",
          subtitle: "Offer & Onboarding",
          description: "Complete support during offer negotiation, acceptance process, and seamless integration into your organization.",
          details: ["Offer negotiation", "Contract support", "Integration planning"],
          image: "/img/methodology/methodology-closing.jpg" // Suggested: Handshake, contract signing
        },
        {
          icon: Calendar,
          title: "100-Day Plan",
          subtitle: "Integration & Review",
          description: "Structured onboarding plan with clear milestones and regular check-ins to ensure successful leadership transition.",
          details: ["Onboarding roadmap", "Milestone tracking", "Performance review"],
          image: "/img/methodology/methodology-integration.jpg" // Suggested: Calendar planning, milestone tracking
        },
        {
          icon: TrendingUp,
          title: "Follow Through",
          subtitle: "Monthly Assessments",
          description: "Ongoing support with monthly assessments throughout the first year to ensure sustained success and address any challenges.",
          details: ["Monthly reviews", "Performance monitoring", "Continuous support"],
          image: "/img/methodology/methodology-follow-through.jpg" // Suggested: Growth charts, continuous improvement
        }
      ];
    
      return (
        <section className="bg-dark py-24 text-secondary">
          <div className="container mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accent">
                    {t('methodology.h2')}
                </h2>
                <h3 className="text-xl mb-6 text-light max-w-3xl mx-auto">
                    {t('methodology.h3')}
                </h3>
                <p className="text-light/80 mb-8 max-w-3xl mx-auto">
                    {t('methodology.p')}
                </p>
            </div>
    
            {/* Methodology Timeline */}
            <div className="relative">
              {/* Timeline line - visible on larger screens */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-accent to-accent/30 h-full"></div>
    
              {/* Steps */}
              <div className="space-y-16 lg:space-y-24">
                {methodologySteps.map((step, index) => (
                  <div key={index} className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Content Side */}
                    <div className="lg:w-1/2 relative">
                      <div className="bg-primary/30 p-8 rounded-xl border border-primary relative overflow-hidden">
                        {/* Background effects */}
                        <div className="absolute -right-16 -top-16 w-32 h-32 bg-accent/10 rounded-full blur-2xl opacity-70"></div>
                        <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-accent/10 rounded-full blur-2xl opacity-70"></div>
                        
                        <div className="relative z-10">
                          {/* Step number and icon */}
                          <div className="flex items-center gap-3 lg:gap-4 mb-4 lg:mb-6">
                            <div className="bg-accent text-white w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-bold text-base lg:text-lg">
                              {index + 1}
                            </div>
                            <div className="bg-accent/20 p-2 lg:p-3 rounded-lg">
                              <step.icon size={20} className="text-accent lg:w-6 lg:h-6" />
                            </div>
                          </div>
                          
                          {/* Content */}
                          <h3 className="text-xl lg:text-2xl font-bold text-secondary mb-2">
                            {step.title}
                          </h3>
                          <h4 className="text-accent font-medium mb-3 lg:mb-4 text-sm lg:text-base">
                            {step.subtitle}
                          </h4>
                          <p className="text-light/80 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
                            {step.description}
                          </p>
                          
                          {/* Details list */}
                          <div className="space-y-2">
                            {step.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-center gap-3">
                                <CheckCircle size={16} className="text-accent flex-shrink-0" />
                                <span className="text-light/70 text-sm">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Timeline connector - visible on larger screens */}
                      <div className="hidden lg:block absolute top-1/2 transform -translate-y-1/2 w-8 h-8 bg-accent rounded-full border-4 border-dark" 
                           style={{ [index % 2 === 0 ? 'right' : 'left']: '-4rem' }}>
                      </div>
                    </div>
    
                    {/* Visual Side */}
                    <div className="lg:w-1/2 w-full">
                      <div className="relative group">
                        <div className="bg-primary/20 rounded-xl p-4 lg:p-6 border border-primary/50 overflow-hidden">
                          <div className="aspect-video bg-[#2C2F34]/70 rounded-lg relative overflow-hidden">
                            {/* Placeholder for actual image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                              <div className="text-center px-4">
                                <step.icon size={32} className="text-accent/50 mx-auto mb-2 lg:w-12 lg:h-12 lg:mb-4" />
                                {/* <p className="text-light/50 text-xs lg:text-sm">
                                  Image: {step.image}
                                </p> */}
                              </div>
                            </div>
                            
                            {/* Uncomment when you have actual images */}
                            <img 
                              src={step.image} 
                              alt={`${step.title} process visualization`}
                              className="w-full h-full object-cover"
                            />
                            
                            {/* Overlay effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2C2F34]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </div>
                        
                        {/* Step indicator for mobile */}
                        <div className="lg:hidden absolute -top-3 -left-3 bg-accent text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
    
            {/* Bottom CTA */}
            <div className="text-center mt-20">
              <div className="bg-primary/30 p-8 rounded-xl border border-primary inline-block relative overflow-hidden">
                <div className="absolute -right-16 -top-16 w-32 h-32 bg-accent/10 rounded-full blur-2xl opacity-70"></div>
                <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-accent/10 rounded-full blur-2xl opacity-70"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-secondary mb-4">
                    Ready to Transform Your Leadership Team?
                  </h3>
                  <p className="text-light/80 mb-6 max-w-2xl">
                    Our methodology delivers results. Let's discuss how we can help you find 
                    the exceptional leaders your organization needs to thrive.
                  </p>
                  <button className="bg-accent text-white hover:bg-white hover:text-primary transition-colors px-8 py-3 rounded-full font-medium inline-flex items-center gap-2">
                    Start Your Search
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    };

export default MethodolodySection;