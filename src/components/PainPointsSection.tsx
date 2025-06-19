import React from 'react';
import { Section } from './Section';
import { AlertTriangle } from 'lucide-react';

export const PainPointsSection = () => {
  const painPoints = [
    {
      emoji: "🎯",
      title: "Talking but no one buys",
      description: "You give tons of free value in podcasts, DMs, client calls but still no product people can buy without your time"
    },
    {
      emoji: "⏳",
      title: "Always teaching never scaling",
      description: "You're stuck repeating the same explanations on calls or in support tickets, wasting hours on things that could be automated"
    },
    {
      emoji: "😶‍🌫️",
      title: "The smart but silent problem",
      description: "You have deep expertise but your market doesn't see it. Bigger brands with worse products get the spotlight and the sales"
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
            If you're an expert or business struggling with
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {painPoints.map((point, index) => (
            <div key={index} className="group text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-brand-black/50 backdrop-blur-sm border border-brand-purple/20 group-hover:border-brand-purple/40 transition-all duration-300 transform group-hover:-translate-y-2 flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl">{point.emoji}</span>
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