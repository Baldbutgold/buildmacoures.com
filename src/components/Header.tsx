import React, { useState, useEffect } from 'react';
import { MenuIcon, X } from 'lucide-react';
import { Button } from './Button';
import { Container } from './Container';
import { NavItem } from '../types';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: 'How It Works', href: '#process' },
    { label: 'Testimonials', href: '#testimonials' },
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
        isScrolled ? 'bg-brand-black/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a 
              href="/"
              className={`font-bricolage font-bold text-[clamp(1.5rem,1rem+1.5vw,2rem)] leading-none tracking-[-1px] transition-colors duration-200 ${
                isScrolled ? 'text-brand-white hover:text-brand-purple' : 'text-brand-white hover:text-brand-purple'
              }`}
            >
              Expert2Course
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button 
                key={item.label} 
                onClick={() => scrollToSection(item.href)}
                className="text-brand-white hover:text-brand-purple font-medium transition-colors duration-200 font-sans relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-purple transition-all duration-200 group-hover:w-full"></span>
              </button>
            ))}
            <Button 
              variant="primary"
              onClick={() => scrollToSection('#schedule-call')}
              className="shadow-purple hover:shadow-purple-lg"
            >
              Book Free Strategy Call
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-brand-white p-2 rounded-lg hover:bg-brand-purple/20 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </Container>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-brand-black/95 backdrop-blur-md shadow-lg border-t border-brand-purple/20">
          <div className="py-4 px-4 space-y-4">
            {navItems.map((item) => (
              <button 
                key={item.label} 
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left text-brand-white hover:text-brand-purple font-medium py-2 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button 
              variant="primary" 
              className="w-full mt-4"
              onClick={() => scrollToSection('#schedule-call')}
            >
              Book Free Strategy Call
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};