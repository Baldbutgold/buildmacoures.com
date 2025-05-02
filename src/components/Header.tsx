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
    { label: 'Blog', href: '#blog' },
    { label: 'About Us', href: '#about' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        // Use brand-white for scrolled background
        isScrolled ? 'bg-brand-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Apply Bricolage Grotesque font, bold weight, specific size, leading, and tracking */}
            <a 
              href="/"
              className="text-brand-black font-bricolage font-bold text-[clamp(1.5rem,1rem+1.5vw,2rem)] leading-none tracking-[-1px]"
            >
              MonetizeUrContent
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                // Use Inter font for nav links (default sans)
                className="text-brand-black hover:text-brand-blue font-medium transition-colors font-sans"
              >
                {item.label}
              </a>
            ))}
            {/* Button uses brand-blue via variant */}
            <Button variant="primary">
              Schedule a Free Call
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            // Use brand-black for icon
            className="md:hidden text-brand-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </Container>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        // Use brand-white for mobile menu background
        <div className="md:hidden absolute top-full left-0 right-0 bg-brand-white shadow-md">
          <div className="py-4 px-4 space-y-4">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                // Use brand-black and hover brand-blue for mobile nav links
                className="block text-brand-black hover:text-brand-blue font-medium py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {/* Button uses brand-blue via variant */}
            <Button variant="primary" className="w-full mt-4">
              Schedule a Free Call
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};