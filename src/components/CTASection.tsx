import React from 'react';
import { Section } from './Section';
import { Button } from './Button';
import { Calendar, CheckCircle, ArrowRight } from 'lucide-react';

export const CTASection = () => {
  const benefits = [
    "Free 30-minute strategy session",
    "Custom course roadmap for your expertise",
    "No obligation, no pressure",
    "Clear next steps to get started"
  ];

  return (
    <Section className="bg-gradient-to-br from-gray-900 via-brand-black to-gray-900 text-white" id="schedule-call">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Calendar className="w-4 h-4" />
            Ready to Get Started?
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-bricolage">
            Ready to turn your expertise into a sellable course?
          </h2>
          <p className="text-xl text-brand-gray mb-8 max-w-3xl mx-auto">
            Let's discuss your vision and create a professional course that generates revenue and establishes your authority.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-brand-purple/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Benefits */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-brand-purple">
                What You'll Get in Your Free Call:
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <p className="text-lg text-brand-gray">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - CTA */}
            <div className="text-center lg:text-left">
              <div className="bg-brand-black/50 backdrop-blur-sm rounded-2xl p-8 border border-brand-purple/30">
                <h4 className="text-xl font-bold mb-4 text-white">
                  Book Your Free Strategy Call
                </h4>
                <p className="text-brand-gray mb-8">
                  In this 30-minute call, we'll discuss your expertise and show you exactly how to turn it into a profitable course.
                </p>
                
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full shadow-purple-lg hover:shadow-purple transform hover:-translate-y-1 group mb-6"
                >
                  <span className="flex items-center justify-center gap-3">
                    <Calendar className="w-5 h-5" />
                    🚀 Book Your Free Call Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                
                <div className="flex items-center justify-center gap-4 text-sm text-brand-gray">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Usually responds within 1 hour</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12 pt-8 border-t border-brand-purple/20">
            <p className="text-brand-gray">
              <strong className="text-white">100% Free.</strong> No obligation. No pressure. Just a clear roadmap for turning your expertise into a profitable course.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};