import React from 'react';
import { Section } from './Section';
import { BenefitItem } from '../types';

export const BenefitsSection = () => {
  const benefits: BenefitItem[] = [
    {
      text: "Industry Authority — Be the go-to expert in your space."
    },
    {
      text: "A New Revenue Stream — Content that sells while you sleep."
    },
    {
      text: 'Content That Converts — Built to drive sales, not just "educate."'
    },
    {
      text: "Fast Execution — Launch in weeks without adding to your team."
    }
  ];

  return (
    <Section className="bg-gradient-to-br from-gray-900 via-brand-black to-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-white mb-12">
          What You'll Get
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={index}
              benefit={benefit}
              index={index}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

type BenefitCardProps = {
  benefit: BenefitItem;
  index: number;
};

const BenefitCard = ({ benefit, index }: BenefitCardProps) => {
  return (
    <div 
      className="bg-brand-black/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-purple-lg transition-all duration-300 transform hover:-translate-y-1 border border-brand-purple/20 hover:border-brand-purple/40"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white text-lg font-bold">✓</span>
        </div>
        <div className="ml-4">
          <p className="text-lg font-medium text-brand-white">
            {benefit.text}
          </p>
        </div>
      </div>
    </div>
  );
};