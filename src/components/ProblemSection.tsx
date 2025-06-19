import React from 'react';
import { Section } from './Section';
import { AlertTriangle, X } from 'lucide-react';

export const ProblemSection = () => {
  const problems = [
    "You waste months fiddling with scripts and videos that don't convert.",
    "Prospects bounce because your product still seems \"too complicated.\"",
    "Your support team gets slammed with the same questions every day.",
    "You leave money and market share on the table."
  ];

  return (
    <Section className="bg-gradient-to-br from-gray-900 via-brand-black to-gray-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4" />
            The Challenge
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-brand-white mb-6 font-bricolage">
            Why Most Founders Struggle 
            <span className="block text-orange-400 mt-2">(And How You Can Skip It)</span>
          </h2>
        </div>
        
        <div className="bg-brand-black/50 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 mb-12 border border-brand-purple/20">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-brand-white mb-4">
              Creating great educational content is hard.
            </h3>
            <p className="text-xl text-brand-gray font-medium">
              If you try to do it yourself…
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problems.map((problem, index) => (
              <div key={index} className="group flex items-start p-6 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/15 transition-all duration-300">
                <div className="flex-shrink-0 mr-4 mt-1">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <X className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-lg text-brand-gray font-medium leading-relaxed">
                  {problem}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <div className="bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white p-8 md:p-12 rounded-3xl shadow-purple-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              It doesn't have to be that way.
            </h3>
            <p className="text-xl leading-relaxed max-w-3xl mx-auto">
              When you work with MonetizeUrContent, you get a full system — built, launched, and working — without adding more to your plate.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};