import React from 'react';
import { Section } from './Section';
import { ProcessStep } from '../types';
import { MessageCircle, Video, Rocket } from 'lucide-react';

export const ProcessSection = () => {
  const steps: ProcessStep[] = [
    {
      number: 1,
      title: "Strategy Call",
      description: "We map out your course vision, audience, and structure in a detailed planning session.",
      icon: MessageCircle
    },
    {
      number: 2,
      title: "Content Production",
      description: "You record. I handle all the editing, polishing, and formatting to professional standards.",
      icon: Video
    },
    {
      number: 3,
      title: "Launch-Ready Delivery",
      description: "Final files uploaded, branded, and delivered ready to sell and start generating revenue.",
      icon: Rocket
    }
  ];

  return (
    <Section className="bg-gradient-to-br from-brand-purple via-brand-purple-dark to-brand-purple-deep text-brand-white" id="process">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Rocket className="w-4 h-4" />
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-bricolage">
            3 Simple Steps to Your Course
          </h2>
          <p className="text-lg sm:text-xl text-purple-100 max-w-3xl mx-auto">
            A proven process that transforms your expertise into a professional, sellable course
          </p>
        </div>
        
        <div className="relative">
          {/* Enhanced connection line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-white/30 via-white/50 to-white/30 transform -translate-x-1/2"></div>
          
          <div className="space-y-12 sm:space-y-16 lg:space-y-24 relative">
            {steps.map((step, index) => (
              <StepCard 
                key={index}
                step={step}
                isEven={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

type StepCardProps = {
  step: ProcessStep & { icon: React.ComponentType<any> };
  isEven?: boolean;
};

const StepCard = ({ step, isEven = false }: StepCardProps) => {
  const Icon = step.icon;
  
  return (
    <div className={`flex flex-col lg:flex-row items-center ${isEven ? 'lg:flex-row-reverse' : ''} gap-6 sm:gap-8 lg:gap-16`}>
      {/* Step number and icon */}
      <div className="flex-shrink-0 relative z-10">
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white text-brand-purple flex items-center justify-center shadow-2xl">
          <div className="text-center">
            <Icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 mx-auto mb-1" />
            <span className="text-xs sm:text-sm font-bold">{step.number}</span>
          </div>
        </div>
      </div>
      
      {/* Content card */}
      <div className={`flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${isEven ? 'lg:text-right' : ''} text-center lg:text-left ${isEven ? 'lg:text-right' : ''}`}>
        <div className="mb-4">
          <span className="text-xs sm:text-sm font-medium text-purple-200 uppercase tracking-wider">
            Step {step.number}
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-white">
          {step.title}
        </h3>
        <p className="text-base sm:text-lg text-purple-100 leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
};