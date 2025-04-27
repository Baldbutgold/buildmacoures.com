import React from 'react';
import { Section } from './Section';
import { Button } from './Button';

export const CTASection = () => {
  return (
    <Section className="bg-blue-900 text-white" id="schedule-call">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Turn Your SaaS Into a Revenue Machine
        </h2>
        
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Ready to unlock a new growth channel, own your space, and scale without the guesswork?
        </p>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-10 shadow-lg">
          <h3 className="text-2xl font-bold mb-6">Schedule Your Free Strategy Call</h3>
          
          <p className="text-blue-100 mb-8">
            In this 30-minute call, we'll discuss your goals and show you exactly how our system can help you grow your SaaS business.
          </p>
          
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full md:w-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-pulse"
          >
            👉 Schedule Your Free Strategy Call
          </Button>
          
          <p className="text-sm text-blue-200 mt-6">
            No obligation. No pressure. Just a clear roadmap for growing your SaaS with educational content.
          </p>
        </div>
      </div>
    </Section>
  );
};