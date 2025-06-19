import React from 'react';
import { Section } from './Section';
import { AlertTriangle, Download, ArrowRight } from 'lucide-react';

export const ProblemSection = () => {
  return (
    <Section className="bg-gradient-to-br from-gray-900 via-brand-black to-gray-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4" />
            Lead Magnet
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-brand-white mb-6 font-bricolage">
            Want to build a course but 
            <span className="block text-brand-purple mt-2">not sure where to start?</span>
          </h2>
        </div>
        
        <div className="bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12 mb-12 border border-brand-purple/20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-full mb-6">
              <Download className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-white mb-4">
              Download the Free Course Blueprint
            </h3>
            <p className="text-lg sm:text-xl text-brand-gray font-medium max-w-2xl mx-auto mb-8">
              Get my proven framework for planning, structuring, and launching profitable online courses. 
              This is the exact blueprint I use with all my clients.
            </p>
            
            <div className="bg-brand-black/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-brand-purple/20">
              <h4 className="text-lg font-bold text-brand-white mb-4">What's Inside:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                  <span className="text-brand-gray">Course structure template</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                  <span className="text-brand-gray">Content planning worksheet</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                  <span className="text-brand-gray">Pricing strategy guide</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                  <span className="text-brand-gray">Launch checklist</span>
                </div>
              </div>
            </div>
            
            <button className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-brand-purple to-brand-purple-dark hover:from-brand-purple-dark hover:to-brand-purple-deep text-white font-bold text-base sm:text-lg rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-purple-lg hover:shadow-purple">
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              Download Free Blueprint
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        
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