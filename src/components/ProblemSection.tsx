import React from 'react';
import { Section } from './Section';

export const ProblemSection = () => {
  return (
    <Section className="bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
          Why Most Founders Struggle <span className="text-orange-500">(And How You Can Skip It)</span>
        </h2>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <p className="text-xl text-center font-medium text-gray-800 mb-6">
            Creating great educational content is hard.
            If you try to do it yourself…
          </p>
          
          <div className="space-y-4 mt-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white font-bold">✕</span>
              </div>
              <div className="ml-3">
                <p className="text-lg text-gray-700">
                  You waste months fiddling with scripts and videos that don't convert.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white font-bold">✕</span>
              </div>
              <div className="ml-3">
                <p className="text-lg text-gray-700">
                  Prospects bounce because your product still seems "too complicated."
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white font-bold">✕</span>
              </div>
              <div className="ml-3">
                <p className="text-lg text-gray-700">
                  Your support team gets slammed with the same questions every day.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white font-bold">✕</span>
              </div>
              <div className="ml-3">
                <p className="text-lg text-gray-700">
                  You leave money and market share on the table.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-xl text-center font-medium text-gray-800 mb-10">
          It doesn't have to be that way.
        </p>
        
        <p className="text-lg text-center text-gray-700">
          When you work with MonetizeUrContent, you get a full system — built, launched, and working — without adding more to your plate.
        </p>
      </div>
    </Section>
  );
};