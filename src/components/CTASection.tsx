import React, { useEffect } from 'react';
import { Section } from './Section';
import { Calendar } from 'lucide-react';

export const CTASection = () => {
  useEffect(() => {
    // Ensure Calendly script is loaded and configure redirect
    if (window.Calendly) {
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/baldbutgold/discovery-call?hide_event_type_details=1',
        parentElement: document.querySelector('.calendly-inline-widget'),
        prefill: {},
        utm: {},
        // Add redirect configuration
        onEventScheduled: function(e) {
          // Redirect to call booked page when event is scheduled
          window.location.href = '/call-booked';
        }
      });
    }

    // Also listen for Calendly events
    const handleCalendlyEvent = (e) => {
      if (e.data.event && e.data.event === 'calendly.event_scheduled') {
        // Redirect when event is scheduled
        setTimeout(() => {
          window.location.href = '/call-booked';
        }, 1000); // Small delay to ensure the booking is processed
      }
    };

    window.addEventListener('message', handleCalendlyEvent);

    return () => {
      window.removeEventListener('message', handleCalendlyEvent);
    };
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
            Stop Wasting Time on DIY Course Creation
          </h2>
          <p className="text-lg sm:text-xl text-brand-gray mb-8 max-w-3xl mx-auto">
            Book a free strategy call and I'll show you exactly how to turn your expertise into a professional course that sells—without you having to learn video editing, course platforms, or marketing funnels.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-brand-purple/20">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-brand-purple">
              Book Your Free "Course Blueprint" Call
            </h3>
            <p className="text-brand-gray text-base sm:text-lg max-w-2xl mx-auto">
              In 30 minutes, I'll create a custom roadmap for your course and show you exactly what it takes to get it built and launched professionally.
            </p>
          </div>

          {/* Large Calendly Widget with proper redirect configuration */}
          <div className="flex justify-center calendly-container">
            <div 
              className="calendly-inline-widget w-full max-w-4xl" 
              data-url="https://calendly.com/baldbutgold/discovery-call?hide_event_type_details=1" 
              style={{
                minWidth: '280px', 
                height: '700px', 
                borderRadius: '16px', 
                overflow: 'hidden',
                width: '100%',
                pointerEvents: 'auto',
                touchAction: 'pan-y'
              }}
            ></div>
          </div>
          
          <div className="text-center mt-8 pt-6 border-t border-brand-purple/20">
            <p className="text-brand-gray text-sm sm:text-base">
              <strong className="text-white">100% Free.</strong> No sales pitch. Just a clear plan for turning your expertise into a profitable course that actually sells.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};