import React from 'react';
import { Section } from './Section';
import { Button } from './Button';

export const SolutionSection = () => {
  return (
    <Section className="bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
          Here's What Happens When You Work With Us
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white text-lg font-bold">✓</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  New Marketing Channel
                </h3>
                <p className="text-gray-700">
                  You unlock a new marketing channel that brings leads 24/7.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white text-lg font-bold">✓</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Industry Authority
                </h3>
                <p className="text-gray-700">
                  You become the obvious choice in your niche.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white text-lg font-bold">✓</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Cost Savings
                </h3>
                <p className="text-gray-700">
                  You save a ton on support and onboarding.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white text-lg font-bold">✓</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Effortless Scaling
                </h3>
                <p className="text-gray-700">
                  You scale faster, without more stress.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">
            You Built Something Amazing.
            <br />
            <span className="text-orange-500">Now It's Time Everyone Knows About It.</span>
          </h3>
          
          <Button variant="primary" size="lg" className="mt-8 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Schedule Your Free Strategy Call
          </Button>
        </div>
      </div>
    </Section>
  );
};