import React from 'react';
import { Container } from './Container';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold text-white mb-4">MonetizeUrContent</h3>
              <p className="mb-4">
                We help B2B SaaS companies turn educational content into a revenue machine.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#case-studies" className="hover:text-white transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#blog" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#schedule-call" className="hover:text-white transition-colors">
                    Schedule a Call
                  </a>
                </li>
                <li>
                  <a href="mailto:info@monetizeurcontent.com" className="hover:text-white transition-colors">
                    info@monetizeurcontent.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>
              &copy; {currentYear} MonetizeUrContent. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};