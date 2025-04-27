import React from 'react';
import { Section } from './Section';

export const StruggleSection = () => {
  return (
    <Section className="bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
            Ready to unlock a new growth channel, own your space, and scale without the guesswork?
          </h2>
          
          <p className="text-lg text-center text-gray-700 mb-8">
            MonetizeUrContent builds video tutorials and mini-courses that bring in warm leads, cut your support costs, and position you as the obvious expert in your niche.
          </p>
          
          <div className="flex justify-center">
            <a 
              href="#schedule-call" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 md:py-4 md:text-lg md:px-8 transition transform hover:-translate-y-1 shadow-md hover:shadow-lg"
            >
              👉 Schedule Your Free Strategy Call
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};