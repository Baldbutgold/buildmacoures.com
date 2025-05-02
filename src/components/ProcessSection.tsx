import React from 'react';
import { Section } from './Section';
import { ProcessStep } from '../types';

export const ProcessSection = () => {
  const steps: ProcessStep[] = [
    {
      number: 1,
      title: "Strategy Deep Dive",
      description: "We map your customer journey, set clear goals, and design your full content plan."
    },
    {
      number: 2,
      title: "Done-For-You Production",
      description: "Scripting, recording, editing, voiceovers — we handle it all, start to finish."
    },
    {
      number: 3,
      title: "Launch & Amplify",
      description: "We set up your LMS, build landing pages, and launch campaigns to drive leads and sales."
    }
  ];

  return (
    <Section className="bg-brand-blue text-brand-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Our 3-Step Authority Framework
        </h2>
        
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-brand-white hidden md:block" style={{ marginLeft: '-0.5px' }}></div>
          
          <div className="space-y-16 md:space-y-24 relative">
            {steps.map((step, index) => (
              <StepCard 
                key={index}
                step={step}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

type StepCardProps = {
  step: ProcessStep;
};

const StepCard = ({ step }: StepCardProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start">
      <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-brand-white text-brand-blue text-xl font-bold z-10 mb-4 md:mb-0">
        {step.number}
      </div>
      
      <div className="md:ml-8 bg-brand-black rounded-xl p-6 w-full md:w-auto flex-grow transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <h3 className="text-xl font-bold mb-3 text-brand-blue">
          Step {step.number}: {step.title}
        </h3>
        <p className="text-brand-white">
          {step.description}
        </p>
      </div>
    </div>
  );
};