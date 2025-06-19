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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {painPoints.map((point, index) => (
            <div key={index} className="group relative bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-purple-lg transition-all duration-500 border border-brand-purple/20 hover:border-brand-purple/40 transform hover:-translate-y-2">
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl sm:text-3xl">{point.emoji}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-brand-white group-hover:text-orange-400 transition-colors">
                    {point.title}
                  </h3>
                </div>
                <p className="text-brand-gray leading-relaxed text-sm sm:text-base">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};