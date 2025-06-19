import React, { useEffect } from 'react';
import { Section } from './Section';
import { Calendar } from 'lucide-react';

export const CTASection = () => {
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
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
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
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-brand-purple">
              Book Your Free Strategy Call
            </h3>
            <p className="text-brand-gray text-base sm:text-lg max-w-2xl mx-auto">
              In this 30-minute call, we'll discuss your expertise and show you exactly how to turn it into a profitable course.
            </p>
          </div>

          {/* Large Calendly Widget */}
          <div className="flex justify-center">
            <div 
              className="calendly-inline-widget w-full max-w-4xl" 
              data-url="https://calendly.com/baldbutgold/discovery-call?hide_event_type_details=1&redirect_url=https://buildmacourse.com/call-booked" 
              style={{
                minWidth: '280px', 
                height: '700px', 
                borderRadius: '16px', 
                overflow: 'hidden',
                width: '100%'
              }}
            ></div>
          </div>
          
          <div className="text-center mt-8 pt-6 border-t border-brand-purple/20">
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-brand-gray mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Usually responds within 1 hour</span>
              </div>
            </div>
            <p className="text-brand-gray text-sm sm:text-base">
              <strong className="text-white">100% Free.</strong> No obligation. No pressure. Just a clear roadmap for turning your expertise into a profitable course.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};