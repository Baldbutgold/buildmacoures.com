import React from 'react';
import { Container } from './Container';
import { CheckItem } from '../types';
import { CheckCircle, Video, Upload, Zap } from 'lucide-react';

export const CheckmarkSection = () => {
  const steps = [
    {
      number: "01",
      title: "STRATEGY & CURRICULUM DESIGN",
      description: "We establish the foundation for a successful course. Our process begins with a deep dive into your market and subject matter. We work with you to analyze your target audience, refine your course topic, and define clear learning outcomes. Our instructional designers then structure this information into a logical and engaging curriculum, complete with detailed module and lesson outlines.",
      deliverable: "A comprehensive course blueprint that includes a validated topic, ideal student profile, and a complete, structured curriculum ready for content development."
    },
    {
      number: "02", 
      title: "CONTENT DEVELOPMENT & SCRIPTING",
      description: "We translate your expertise into production-ready materials. In this phase, our team of content developers and writers collaborates with you to transform the curriculum into tangible teaching assets. We write clear, concise scripts for every video lesson, design branded presentations and slides, and create all necessary supplementary materials, such as worksheets, guides, and quizzes.",
      deliverable: "A complete set of assets for your course, including polished video scripts, branded slide decks, and all student-facing downloadable resources."
    },
    {
      number: "03",
      title: "VIDEO PRODUCTION & PLATFORM BUILD-OUT",
      description: "We handle the complete technical production and setup of your course. Our production team manages the entire filming and post-production process. This includes professional video and audio editing, adding on-screen graphics, and ensuring a high-quality final product. Concurrently, we build out your course on your preferred hosting platform (like Kajabi or Teachable), upload all lessons and materials, and configure the technical settings for a seamless student experience.",
      deliverable: "A full library of professionally produced, high-definition video lessons and a fully-built, tested, and student-ready online course on your chosen platform."
    }
  ];

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-brand-black to-gray-900">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4" />
              The Process
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-white mb-4 font-bricolage">
              Our Online Course Creation Process
            </h2>
            <p className="text-lg sm:text-xl text-brand-gray font-normal max-w-3xl mx-auto">
              We handle the entire video course production process from start to finish! Here's our simple 3-step course creation services process!
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
                        {step.deliverable}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="text-center mt-16 sm:mt-20">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-brand-gray text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-brand-white">20+ Courses Created</span>
              </div>
              <div className="w-px h-4 sm:h-6 bg-brand-gray/30 hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="font-semibold text-brand-white">98% Client Satisfaction</span>
              </div>
              <div className="w-px h-4 sm:h-6 bg-brand-gray/30 hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="font-semibold text-brand-white">Since 2019</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};