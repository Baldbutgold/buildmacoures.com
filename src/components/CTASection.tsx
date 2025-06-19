import React, { useEffect } from 'react';
import { Section } from './Section';
import { Calendar, CheckCircle } from 'lucide-react';

export const CTASection = () => {
  const benefits = [
    "Free 30-minute strategy session",
    "Custom course roadmap for your expertise",
    "No obligation, no pressure",
    "Clear next steps to get started"
  ];

  useEffect(() => {
    // Ensure Calendly script is loaded
    if (window.Calendly) {
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/baldbutgold/discovery-call?hide_event_type_details=1',
        parentElement: document.querySelector('.calendly-inline-widget'),
        prefill: {},
        utm: {}
      });
    }
  }, []);

  return (
    <Section className="bg-gradient-to-br from-gray-900 via-brand-black to-gray-900 text-white" id="schedule-call">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Calendar className="w-4 h-4" />
            Ready to Get Started?
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-bricolage">
            Ready to turn your expertise into a sellable course?
          </h2>
          <p className="text-lg sm:text-xl text-brand-gray mb-8 max-w-3xl mx-auto">
            Let's discuss your vision and create a professional course that generates revenue and establishes your authority.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-brand-purple/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Left side - Benefits */}
            <div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 text-brand-purple">
                What You'll Get in Your Free Call:
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 sm:gap-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                    </div>
                    <p className="text-base sm:text-lg text-brand-gray">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Calendly */}
            <div className="text-center lg:text-left">
              <div className="bg-brand-black/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-brand-purple/30">
                <h4 className="text-lg sm:text-xl font-bold mb-4 text-white">
                  Book Your Free Strategy Call
                </h4>
                <p className="text-brand-gray mb-6 sm:mb-8 text-sm sm:text-base">
                  In this 30-minute call, we'll discuss your expertise and show you exactly how to turn it into a profitable course.
                </p>
                
                {/* Calendly Widget */}
                <div 
                  className="calendly-inline-widget" 
                  data-url="https://calendly.com/baldbutgold/discovery-call?hide_event_type_details=1" 
                  style={{minWidth: '320px', height: '600px', borderRadius: '12px', overflow: 'hidden'}}
                ></div>
                
                <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-brand-gray mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Usually responds within 1 hour</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-brand-purple/20">
            <p className="text-brand-gray text-sm sm:text-base">
              <strong className="text-white">100% Free.</strong> No obligation. No pressure. Just a clear roadmap for turning your expertise into a profitable course.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};