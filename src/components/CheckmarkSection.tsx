import React from 'react';
import { Container } from './Container';
import { CheckItem } from '../types';

export const CheckmarkSection = () => {
  const benefits: CheckItem[] = [
    { text: 'Bring in warm leads', positive: true },
    { text: 'Cut your support costs', positive: true },
    { text: 'Set you up as the obvious expert in your niche', positive: true },
  ];

  const negatives: CheckItem[] = [
    { text: 'You\'ll waste money on ads while confused leads bounce.', positive: false },
    { text: 'Your support team will drown in "how do I use this?" tickets.', positive: false },
    { text: 'Customers will churn before they ever get real value.', positive: false },
    { text: 'You\'ll miss out on a growth channel that compounds over time.', positive: false },
  ];

  const positives: CheckItem[] = [
    { text: 'Passive revenue rolling in from video courses.', positive: true },
    { text: 'Support tickets cut in half with simple explainer videos.', positive: true },
    { text: 'Top-tier partners and clients chasing you.', positive: true },
    { text: 'Growth that keeps scaling — even while you sleep.', positive: true },
  ];

  return (
    <div className="py-16 bg-brand-black">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-6">
            {benefits.map((item, index) => (
              <CheckmarkItem 
                key={index} 
                text={item.text} 
                positive={item.positive} 
                animate={true} 
                delay={index * 0.1}
              />
            ))}
          </div>
          
          <p className="text-lg text-brand-white/80 text-center mt-8 mb-2">
            All done-for-you. No guessing. No extra hires.
          </p>
          
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-white mb-6 text-center">
              If You Don't Act Now…
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              {negatives.map((item, index) => (
                <CheckmarkItem 
                  key={index} 
                  text={item.text} 
                  positive={item.positive} 
                  animate={true} 
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-white mb-6 text-center">
              Imagine Instead…
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              {positives.map((item, index) => (
                <CheckmarkItem 
                  key={index} 
                  text={item.text} 
                  positive={item.positive} 
                  animate={true} 
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

type CheckmarkItemProps = {
  text: string;
  positive?: boolean;
  animate?: boolean;
  delay?: number;
};

const CheckmarkItem = ({ text, positive = true, animate = false, delay = 0 }: CheckmarkItemProps) => {
  return (
    <div 
      className={`flex items-start p-4 rounded-lg ${
        animate ? 'transform transition-all duration-500 hover:-translate-y-1 hover:shadow-md' : ''
      } bg-brand-white/5 backdrop-blur-sm`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex-shrink-0 mt-1">
        {positive ? (
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Eo_circle_green_checkmark.svg" 
            alt="Checkmark"
            className="w-6 h-6"
          />
        ) : (
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Cross_red_circle.svg" 
            alt="Cross"
            className="w-6 h-6"
          />
        )}
      </div>
      <div className="ml-3">
        <p className="text-lg font-medium text-brand-white">
          {text}
        </p>
      </div>
    </div>
  );
};