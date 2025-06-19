import React from 'react';
import { Section } from './Section';
import { ArrowRight, Target } from 'lucide-react';

export const StruggleSection = () => {
  return (
    <Section className="bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              Ready to Transform?
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-6 font-bricolage">
              Ready to unlock a new growth channel, own your space, and scale without the guesswork?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              MonetizeUrContent builds video tutorials and mini-courses that bring in warm leads, cut your support costs, and position you as the obvious expert in your niche.
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
              👉 Schedule Your Free Strategy Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};