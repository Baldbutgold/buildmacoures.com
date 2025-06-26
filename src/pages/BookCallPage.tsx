import React, { useEffect } from 'react';
import { Container } from '../components/Container';
import { Calendar, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BookCallPage = () => {
  useEffect(() => {
    // Load Calendly script if not already loaded
    const loadCalendly = () => {
      if (window.Calendly) {
        // Calendly is already loaded, initialize the widget
        initializeCalendlyWidget();
        return;
      }

      // Load Calendly script
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => {
        initializeCalendlyWidget();
      };
      document.head.appendChild(script);
    };

    const initializeCalendlyWidget = () => {
      const calendlyContainer = document.querySelector('.calendly-inline-widget');
      if (calendlyContainer && window.Calendly) {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/baldbutgold/discovery-call?hide_event_type_details=1',
          parentElement: calendlyContainer,
          prefill: {},
          utm: {}
        });
      }
    };

    // Load Calendly when component mounts
    loadCalendly();

    // Listen for Calendly events
    const handleCalendlyEvent = (e) => {
      if (e.data.event && e.data.event === 'calendly.event_scheduled') {
        // Redirect when event is scheduled
        setTimeout(() => {
          window.location.href = '/call-booked';
        }, 1000);
      }
    };

    window.addEventListener('message', handleCalendlyEvent);

    return () => {
      window.removeEventListener('message', handleCalendlyEvent);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-black via-gray-900 to-brand-black pt-20 sm:pt-24 lg:pt-32">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Back to Home */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-brand-purple hover:text-brand-purple-dark font-medium transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Calendar className="w-4 h-4" />
              Ready to Get Started?
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-white mb-6 font-bricolage">
              Stop Wasting Time on DIY Course Creation
            </h1>
            <p className="text-lg sm:text-xl text-brand-gray mb-8 max-w-3xl mx-auto">
              Book a free strategy call and I'll show you exactly how to turn your expertise into a professional course that sells—without you having to learn video editing, course platforms, or marketing funnels.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-brand-purple/20">
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-brand-purple">
                Book Your Free "Course Blueprint" Call
              </h2>
              <p className="text-brand-gray text-base sm:text-lg max-w-2xl mx-auto">
                In 30 minutes, I'll create a custom roadmap for your course and show you exactly what it takes to get it built and launched professionally.
              </p>
            </div>

            {/* Calendly Widget Container */}
            <div className="flex justify-center">
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/baldbutgold/discovery-call?hide_event_type_details=1" 
                style={{
                  minWidth: '280px', 
                  height: '700px', 
                  width: '100%',
                  maxWidth: '900px',
                  borderRadius: '16px', 
                  overflow: 'hidden'
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
      </Container>
    </div>
  );
};