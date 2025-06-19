import React from 'react';
import { Container } from './Container';
import { Mail, Calendar, Star } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-brand-black to-gray-900 text-brand-white/70 py-16">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-brand-white mb-4 font-bricolage">
                MonetizeUrContent
              </h3>
              <p className="mb-6 text-lg leading-relaxed">
                We help B2B SaaS companies turn educational content into a revenue machine. Transform your expertise into scalable growth.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-brand-blue/10 text-brand-blue px-3 py-2 rounded-full text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">4.9/5 Rating</span>
                </div>
                <div className="text-sm text-gray-400">
                  100+ Happy Clients
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-brand-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => scrollToSection('#process')}
                    className="hover:text-brand-white transition-colors duration-200 text-left"
                  >
                    Our Process
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('#results')}
                    className="hover:text-brand-white transition-colors duration-200 text-left"
                  >
                    Results
                  </button>
                </li>
                <li>
                  <a 
                    href="https://www.fiverr.com/mohamed_mrini" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-brand-white transition-colors duration-200"
                  >
                    Portfolio
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold text-brand-white mb-6">Get Started</h4>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => scrollToSection('#schedule-call')}
                    className="flex items-center gap-2 hover:text-brand-white transition-colors duration-200 group"
                  >
                    <Calendar className="w-4 h-4 group-hover:text-brand-blue transition-colors" />
                    Schedule a Call
                  </button>
                </li>
                <li>
                  <a 
                    href="mailto:info@monetizeurcontent.com" 
                    className="flex items-center gap-2 hover:text-brand-white transition-colors duration-200 group"
                  >
                    <Mail className="w-4 h-4 group-hover:text-brand-blue transition-colors" />
                    info@monetizeurcontent.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="border-t border-brand-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-center md:text-left">
                &copy; {currentYear} MonetizeUrContent. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <a href="#" className="hover:text-brand-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-brand-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};