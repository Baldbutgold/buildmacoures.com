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
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="text-blue-900 font-bold text-xl">
              MonetizeUrContent
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button variant="primary">
              Schedule a Free Call
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </Container>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md">
          <div className="py-4 px-4 space-y-4">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button variant="primary" className="w-full mt-4">
              Schedule a Free Call
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};