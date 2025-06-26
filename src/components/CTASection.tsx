import React, { useEffect } from 'react';
import { Section } from './Section';
import { Calendar } from 'lucide-react';

export const CTASection = () => {
  const handleBookCallClick = () => {
    window.location.href = '/book-call';
  };

  return (
    <Section className="bg-gradient-to-br from-gray-900 via-brand-black to-gray-900 text-white" id="schedule-call">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Calendar className="w-4 h-4" />
            Ready to Get Started?
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-bricolage">
            Stop Wasting Time on DIY Course Creation
          </h2>
          <p className="text-lg sm:text-xl text-brand-gray mb-8 max-w-3xl mx-auto">
            Book a free strategy call and I'll show you exactly how to turn your expertise into a professional course that sells—without you having to learn video editing, course platforms, or marketing funnels.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-brand-purple/20">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-brand-purple">
              Book Your Free "Course Blueprint" Call
            </h3>
            <p className="text-brand-gray text-base sm:text-lg max-w-2xl mx-auto mb-8">
              In 30 minutes, I'll create a custom roadmap for your course and show you exactly what it takes to get it built and launched professionally.
            </p>

            {/* CTA Button */}
            <button 
              onClick={handleBookCallClick}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white px-8 py-4 rounded-full font-bold text-lg hover:from-brand-purple-dark hover:to-brand-purple-deep transition-all duration-300 transform hover:-translate-y-1 shadow-purple hover:shadow-purple-lg group"
            >
              📞 Book Your Free Strategy Call
            </button>
          </div>
          
          <div className="text-center pt-6 border-t border-brand-purple/20">
            <p className="text-brand-gray text-sm sm:text-base">
              <strong className="text-white">100% Free.</strong> No sales pitch. Just a clear plan for turning your expertise into a profitable course that actually sells.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};