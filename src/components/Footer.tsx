import React from 'react';
import { Container } from './Container';
import { Mail, Calendar, Star, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  
  const scrollToSection = (href: string) => {
    if (location.pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookCallClick = () => {
    window.location.href = '/book-call';
  };
  
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-brand-black to-gray-900 text-brand-gray py-12 sm:py-16">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-white mb-4 font-bricolage">
                BuildMaCourse
              </h3>
              <p className="mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
                We help experts, founders, and creators turn their expertise into professional, profitable video courses. From strategy to final delivery everything handled for you.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-3 py-2 rounded-full text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">4.9/5 Rating</span>
                </div>
                <div className="text-sm text-brand-gray">
                  80+ Happy Clients
                </div>
              </div>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="text-base sm:text-lg font-bold text-brand-white mb-4 sm:mb-6">Get Started</h4>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/generate-curriculum"
                    className="flex items-center gap-2 hover:text-brand-white transition-colors duration-200 group text-sm sm:text-base"
                  >
                    <Sparkles className="w-4 h-4 group-hover:text-brand-purple transition-colors" />
                    Free Curriculum Generator
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={handleBookCallClick}
                    className="flex items-center gap-2 hover:text-brand-white transition-colors duration-200 group text-sm sm:text-base"
                  >
                    <Calendar className="w-4 h-4 group-hover:text-brand-purple transition-colors" />
                    Book a Strategy Call
                  </button>
                </li>
                <li>
                  <a 
                    href="mailto:contact@buildmacourse.com" 
                    className="flex items-center gap-2 hover:text-brand-white transition-colors duration-200 group text-sm sm:text-base"
                  >
                    <Mail className="w-4 h-4 group-hover:text-brand-purple transition-colors" />
                    contact@buildmacourse.com
                  </a>
                </li>
                <li>
                  <Link 
                    to="/blog"
                    className="hover:text-brand-white transition-colors duration-200 text-sm sm:text-base"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="border-t border-brand-purple/20 pt-6 sm:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left text-sm sm:text-base">
                <p className="mb-1">
                  &copy; {currentYear} MonetizeUrContent LLC. All rights reserved.
                </p>
                <p className="text-xs text-brand-gray">
                  BuildMaCourse operates under MonetizeUrContent LLC
                </p>
              </div>
              <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
                <Link to="/privacy-policy" className="hover:text-brand-white transition-colors">Privacy Policy</Link>
                <Link to="/terms-of-service" className="hover:text-brand-white transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};