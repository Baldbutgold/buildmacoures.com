import React from 'react';
import { Container } from './Container';
import { CheckItem } from '../types';
import { CheckCircle, Video, Upload, Zap } from 'lucide-react';

export const CheckmarkSection = () => {
  const steps = [
    {
      number: "01",
      title: "STRATEGY & CURRICULUM DESIGN",
      description: "We start by understanding your expertise and your ideal student. I'll interview you to extract your knowledge, then design a curriculum that takes students from where they are to where they want to be. No guesswork—just a proven framework that ensures your course actually delivers results.",
      deliverable: "A complete course blueprint with validated topic positioning, detailed student avatar, and a module-by-module curriculum that guarantees student success."
    },
    {
      number: "02", 
      title: "CONTENT DEVELOPMENT & SCRIPTING",
      description: "I transform your raw expertise into polished, engaging content. Every lesson gets a professional script that sounds like you but flows perfectly. I create all slides, worksheets, and bonus materials using proven templates that keep students engaged and moving forward.",
      deliverable: "Production-ready scripts for every video, professionally designed slide decks, and all student resources—everything needed to start filming immediately."
    },
    {
      number: "03",
      title: "VIDEO PRODUCTION & PLATFORM SETUP",
      description: "I handle all the technical heavy lifting. Professional video editing with graphics, transitions, and perfect audio. Then I upload everything to your chosen platform, set up the sales pages, and make sure everything works flawlessly before you launch.",
      deliverable: "A complete, live course on your platform with professional video lessons, perfect audio, and all technical setup complete—ready for students on day one."
    }
  ];

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-brand-black to-gray-900">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4" />
              How It Works
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-white mb-4 font-bricolage">
              From Your Expertise to Sellable Course
            </h2>
            <p className="text-lg sm:text-xl text-brand-gray font-normal max-w-3xl mx-auto">
              I take care of everything while you focus on what you do best—being the expert. Here's my proven 3-step process that's worked for 80+ successful course creators.
            </p>
          </div>

          {/* Steps with Timeline */}
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-brand-purple/30 hidden md:block"></div>
            
            {steps.map((step, idx) => (
              <div key={idx} className="relative mb-12 sm:mb-16 last:mb-0">
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-brand-purple rounded-full border-4 border-brand-black hidden md:block"></div>
                
                {/* Content */}
                <div className="md:ml-20">
                  <div className="bg-brand-black/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-brand-purple/20 hover:border-brand-purple/40 transition-all duration-300">
                    {/* Step Number and Badge */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-brand-purple/20 text-brand-purple px-3 py-1 rounded-full text-sm font-bold">
                        STEP {step.number}
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-brand-white mb-6 font-bricolage">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-brand-gray leading-relaxed text-sm sm:text-base mb-6">
                      {step.description}
                    </p>
                    
                    {/* Deliverable Box */}
                    <div className="bg-brand-purple/10 border border-brand-purple/20 rounded-xl p-4 sm:p-6">
                      <p className="text-brand-white font-medium text-sm sm:text-base leading-relaxed">
                        <strong className="text-brand-purple">What you get:</strong> {step.deliverable}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust indicators and CTA */}
          <div className="text-center mt-16 sm:mt-20">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-brand-gray text-sm sm:text-base mb-8">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-brand-white">80+ Courses Created</span>
              </div>
              <div className="w-px h-4 sm:h-6 bg-brand-gray/30 hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="font-semibold text-brand-white">4.9/5 Client Rating</span>
              </div>
              <div className="w-px h-4 sm:h-6 bg-brand-gray/30 hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="font-semibold text-brand-white">Since 2019</span>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              onClick={() => window.location.href = '/book-call'}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:from-brand-purple-dark hover:to-brand-purple-deep transition-all duration-300 transform hover:-translate-y-1 shadow-purple hover:shadow-purple-lg group"
            >
              🚀 Let's Build Your Course!
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};