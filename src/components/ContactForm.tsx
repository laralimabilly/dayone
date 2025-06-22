// src/components/ContactForm.tsx
import { useState } from 'react';
import { User, Mail, Phone, Building, MessageSquare } from 'lucide-react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-[#414F59]/30 p-4 sm:p-6 lg:p-8 rounded-xl border border-[#414F59] relative overflow-hidden">
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-[#E2A86B]/10 rounded-full blur-2xl"></div>
      <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-[#E2A86B]/10 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl sm:text-2xl font-bold text-secondary mb-4 sm:mb-6">Send us a message</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Name field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-[#E0DFD5] font-medium text-sm sm:text-base">
                Name <span className="text-[#E2A86B]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={16} className="text-[#E0DFD5]/50" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-[#2C2F34]/70 text-secondary w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border border-[#414F59]/50 focus:border-[#E2A86B] focus:outline-none focus:ring-1 focus:ring-[#E2A86B] transition-all duration-200 text-sm sm:text-base"
                  placeholder="Your name"
                />
              </div>
            </div>
            
            {/* Email field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-[#E0DFD5] font-medium text-sm sm:text-base">
                Email <span className="text-[#E2A86B]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-[#E0DFD5]/50" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[#2C2F34]/70 text-secondary w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border border-[#414F59]/50 focus:border-[#E2A86B] focus:outline-none focus:ring-1 focus:ring-[#E2A86B] transition-all duration-200 text-sm sm:text-base"
                  placeholder="your.email@company.com"
                />
              </div>
            </div>
            
            {/* Phone field */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-[#E0DFD5] font-medium text-sm sm:text-base">
                Phone <span className="text-[#E2A86B]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={16} className="text-[#E0DFD5]/50" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-[#2C2F34]/70 text-secondary w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border border-[#414F59]/50 focus:border-[#E2A86B] focus:outline-none focus:ring-1 focus:ring-[#E2A86B] transition-all duration-200 text-sm sm:text-base"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
            
            {/* Company field */}
            <div className="space-y-2">
              <label htmlFor="company" className="block text-[#E0DFD5] font-medium text-sm sm:text-base">
                Company <span className="text-[#E2A86B]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building size={16} className="text-[#E0DFD5]/50" />
                </div>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-[#2C2F34]/70 text-secondary w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border border-[#414F59]/50 focus:border-[#E2A86B] focus:outline-none focus:ring-1 focus:ring-[#E2A86B] transition-all duration-200 text-sm sm:text-base"
                  placeholder="Your company name"
                />
              </div>
            </div>
          </div>
          
          {/* Message field */}
          <div className="space-y-2">
            <label htmlFor="message" className="block text-[#E0DFD5] font-medium text-sm sm:text-base">
              Message <span className="text-[#E2A86B]">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                <MessageSquare size={16} className="text-[#E0DFD5]/50" />
              </div>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="bg-[#2C2F34]/70 text-secondary w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border border-[#414F59]/50 focus:border-[#E2A86B] focus:outline-none focus:ring-1 focus:ring-[#E2A86B] transition-all duration-200 resize-none text-sm sm:text-base"
                placeholder="How can we help you?"
              ></textarea>
            </div>
          </div>
          
          {/* Submit button */}
          <div className="flex justify-end pt-2">
            <button 
              type="submit"
              className="bg-accent text-white hover:bg-white hover:text-primary transition-colors px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base w-full sm:w-auto"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;