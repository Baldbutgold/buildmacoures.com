import React from 'react';
import { Section } from './Section';
import { Button } from './Button';
import { Calendar, CheckCircle, ArrowRight } from 'lucide-react';

export const CTASection = () => {
  const benefits = [
    "Free 30-minute strategy session",
    "Custom content roadmap for your SaaS",
    "No obligation, no pressure",
    "Clear next steps to get started"
  ];

  return (
    <Section className="bg-gradient-to-br from-gray-900 via-brand-black to-gray-900 text-white" id="schedule-call">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-blue/20 text-brand-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Calendar className="w-4 h-4" />
            Ready to Get Started?
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-bricolage">
            Turn Your SaaS Into a Revenue Machine
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Ready to unlock a new growth channel, own your space, and scale without the guesswork?
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Benefits */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-brand-blue">
                What You'll Get in Your Free Call:
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <p className="text-lg text-gray-200">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - CTA */}
            <div className="text-center lg:text-left">
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <h4 className="text-xl font-bold mb-4 text-white">
                  Schedule Your Free Strategy Call
                </h4>
                <p className="text-gray-300 mb-8">
                  In this 30-minute call, we'll discuss your goals and show you exactly how our system can help you grow your SaaS business.
                </p>
                
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 group mb-6"
                >
                  <span className="flex items-center justify-center gap-3">
                    <Calendar className="w-5 h-5" />
                    Schedule Your Free Call Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                
                <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Usually responds within 1 hour</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12 pt-8 border-t border-white/10">
            <p className="text-gray-400">
              <strong className="text-white">100% Free.</strong> No obligation. No pressure. Just a clear roadmap for growing your SaaS with educational content.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};