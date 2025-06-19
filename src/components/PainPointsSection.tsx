import React from 'react';
import { Section } from './Section';
import { AlertTriangle } from 'lucide-react';

export const PainPointsSection = () => {
  const painPoints = [
    {
      title: "Posting Blindly Into the Void",
      description: "Spending hours creating content that flops, while competitors dominate feeds with viral hooks.",
      icon: (
        <svg className="w-16 h-16 sm:w-20 sm:h-20 text-brand-purple" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="25" width="70" height="50" rx="8" stroke="currentColor" strokeWidth="3" fill="none"/>
          <rect x="20" y="30" width="60" height="8" rx="4" fill="currentColor" opacity="0.6"/>
          <rect x="20" y="42" width="45" height="6" rx="3" fill="currentColor" opacity="0.4"/>
          <rect x="20" y="52" width="35" height="6" rx="3" fill="currentColor" opacity="0.4"/>
          <circle cx="75" cy="15" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M70 10 L80 10 M75 5 L75 15" stroke="currentColor" strokeWidth="2"/>
          <path d="M25 85 Q50 75 75 85" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5"/>
        </svg>
      )
    },
    {
      title: "Traffic Graveyard",
      description: "Thousands of visitors, but crickets when it's time to buy. Your content feels like a leaky bucket.",
      icon: (
        <svg className="w-16 h-16 sm:w-20 sm:h-20 text-brand-purple" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="20" width="12" height="25" rx="2" fill="currentColor" opacity="0.6"/>
          <rect x="25" y="15" width="12" height="30" rx="2" fill="currentColor" opacity="0.7"/>
          <rect x="40" y="10" width="12" height="35" rx="2" fill="currentColor" opacity="0.8"/>
          <rect x="55" y="25" width="12" height="20" rx="2" fill="currentColor" opacity="0.5"/>
          <rect x="70" y="30" width="12" height="15" rx="2" fill="currentColor" opacity="0.4"/>
          <path d="M15 55 L85 55" stroke="currentColor" strokeWidth="2"/>
          <path d="M15 55 L15 50 M85 55 L85 50" stroke="currentColor" strokeWidth="2"/>
          <circle cx="50" cy="75" r="15" stroke="currentColor" strokeWidth="3" fill="none"/>
          <path d="M42 75 L50 83 L58 75" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    {
      title: "The Invisible Expert Syndrome",
      description: "You're the best-kept secret in your niche. Customers choose 'big names' even though your results are better.",
      icon: (
        <svg className="w-16 h-16 sm:w-20 sm:h-20 text-brand-purple" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="35" cy="30" r="12" stroke="currentColor" strokeWidth="3" fill="none"/>
          <path d="M20 55 Q35 45 50 55" stroke="currentColor" strokeWidth="3" fill="none"/>
          <circle cx="65" cy="30" r="12" stroke="currentColor" strokeWidth="3" fill="none"/>
          <path d="M50 55 Q65 45 80 55" stroke="currentColor" strokeWidth="3" fill="none"/>
          <circle cx="50" cy="70" r="12" stroke="currentColor" strokeWidth="3" fill="none"/>
          <path d="M35 85 Q50 75 65 85" stroke="currentColor" strokeWidth="3" fill="none"/>
          <circle cx="50" cy="30" r="8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" strokeDasharray="4 4"/>
          <path d="M42 30 L50 38 L58 30" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
        </svg>
      )
    }
  ];

  return (
    <Section className="bg-gradient-to-br from-gray-900 via-brand-black to-gray-900" id="pain-points">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4" />
            Common Struggles
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-white mb-6 font-bricolage">
            If you're a business that struggles with
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {painPoints.map((point, index) => (
            <div key={index} className="group text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-2xl bg-brand-black/50 backdrop-blur-sm border border-brand-purple/20 group-hover:border-brand-purple/40 transition-all duration-300 transform group-hover:-translate-y-2">
                  {point.icon}
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-brand-white mb-4 group-hover:text-brand-purple transition-colors">
                {point.title}
              </h3>
              <p className="text-brand-gray leading-relaxed text-base sm:text-lg">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};