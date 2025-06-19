import React from 'react';
import { Container } from './Container';
import { CheckItem } from '../types';
import { CheckCircle, Video, Upload, Zap } from 'lucide-react';

export const CheckmarkSection = () => {
  const benefits: CheckItem[] = [
    { text: "A done-for-you course structure", positive: true },
    { text: "Professional video editing + polish", positive: true },
    { text: "Upload & delivery on your platform", positive: true },
    { text: "Fast turnaround with crystal-clear communication", positive: true },
  ];

  const icons = [Video, CheckCircle, Upload, Zap];

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-brand-black to-gray-900">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4" />
              What You Get
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-white mb-4 font-bricolage">
              Everything You Need for a 
              <span className="block text-brand-purple mt-2">Professional Course</span>
            </h2>
            <p className="text-lg sm:text-xl text-brand-gray font-normal max-w-3xl mx-auto">
              From concept to completion I handle every detail so you can focus on what you do best.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {benefits.map((item, idx) => {
              const Icon = icons[idx];
              return (
                <div key={idx} className="group flex items-start p-6 sm:p-8 rounded-xl bg-brand-black/50 backdrop-blur-sm border border-brand-purple/20 hover:bg-brand-purple/5 hover:border-brand-purple/40 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex-shrink-0 mr-4 sm:mr-6 mt-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-brand-purple to-brand-purple-dark flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-lg sm:text-xl text-brand-white font-semibold leading-relaxed group-hover:text-brand-purple transition-colors">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12 sm:mt-16">
            <div className="bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white p-6 sm:p-8 lg:p-12 rounded-3xl shadow-purple-lg">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to transform your expertise into a profitable course?
              </h3>
              <p className="text-lg sm:text-xl text-purple-100 mb-6 max-w-2xl mx-auto">
                Let's discuss your vision and create something amazing together.
              </p>
              <button 
                onClick={() => {
                  const element = document.querySelector('#schedule-call');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-3 bg-white text-brand-purple px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group"
              >
                Book Your Free Strategy Call
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};