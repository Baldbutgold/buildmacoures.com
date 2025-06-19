import React, { useState, useEffect } from 'react';
import { MenuIcon, X } from 'lucide-react';
import { Button } from './Button';
import { Container } from './Container';
import { NavItem } from '../types';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Process', href: '#process' },
    { label: 'Results', href: '#results' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a 
              href="/"
              className="text-brand-black font-bricolage font-bold text-[clamp(1.5rem,1rem+1.5vw,2rem)] leading-none tracking-[-1px] hover:text-brand-blue transition-colors duration-200"
            >
              MonetizeUrContent
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button 
                key={item.label} 
                onClick={() => scrollToSection(item.href)}
                className="text-brand-black hover:text-brand-blue font-medium transition-colors duration-200 font-sans relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-200 group-hover:w-full"></span>
              </button>
            ))}
            <Button 
              variant="primary"
              onClick={() => scrollToSection('#schedule-call')}
              className="shadow-md hover:shadow-lg"
            >
              Schedule a Free Call
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-brand-black p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </Container>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-100">
          <div className="py-4 px-4 space-y-4">
            {navItems.map((item) => (
              <button 
                key={item.label} 
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left text-brand-black hover:text-brand-blue font-medium py-2 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button 
              variant="primary" 
              className="w-full mt-4"
              onClick={() => scrollToSection('#schedule-call')}
            >
              Schedule a Free Call
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};