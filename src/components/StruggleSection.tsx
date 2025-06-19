import React from 'react';
import { Section } from './Section';
import { ArrowRight, Target } from 'lucide-react';

export const StruggleSection = () => {
  return (
    <Section className="bg-gradient-to-br from-gray-900 via-brand-black to-gray-900">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-brand-purple/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              Ready to Get Started?
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-white mb-6 font-bricolage">
              Ready to turn your expertise into a sellable course?
            </h2>
            <p className="text-xl text-brand-gray mb-8 max-w-3xl mx-auto">
              Expert2Course handles everything from structure to final delivery, so you can focus on what you do best — sharing your knowledge and growing your business.
            </p>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={() => {
                const element = document.querySelector('#schedule-call');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              🚀 Book Your Free Strategy Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};