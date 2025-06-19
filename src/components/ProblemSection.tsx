import React from 'react';
import { Section } from './Section';
import { ArrowRight } from 'lucide-react';

export const ProblemSection = () => {
  return (
    <Section className="bg-gradient-to-br from-gray-900 via-brand-black to-gray-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <div className="bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white p-6 sm:p-8 lg:p-12 rounded-3xl shadow-purple-lg">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to skip the guesswork?
            </h3>
            <p className="text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-6">
              Let me handle the entire course creation process for you from structure to final delivery.
            </p>
            <button 
              onClick={() => {
                const element = document.querySelector('#schedule-call');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-3 bg-white text-brand-purple px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group"
            >
              Book Your Strategy Call
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};