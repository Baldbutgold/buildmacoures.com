import React from 'react';
import { Section } from './Section';
import { Rocket } from 'lucide-react';

export const ProcessSection = () => {
  const solutions = [
    {
      emoji: "👑",
      title: "The 'Category King' Positioning",
      subtitle: "What We Do:",
      description: "Because the ONLY Choice is Your Niche. We don't make videos — we build expertise empires. We don't create courses — we craft authority.",
      result: "Clear Content Clarity. You become the undisputed authority."
    },
    {
      emoji: "🚀",
      title: "The 'Always-On' Content Engine",
      subtitle: "What We Do:",
      description: "Because organic content is the lifeblood of performance. Start a 90-day content calendar that positions, nurtures, converting warm leads into customers.",
      result: "Real Outreach without expensive ads. Customers come to YOU."
    },
    {
      emoji: "💰",
      title: "The 'Profit Pipeline' Overhaul",
      subtitle: "What We Do:",
      description: "Audit every step of your funnel. Build clarity, trust, and urgency. Re-channel key values with reason to your unique Expertise-based value differentiation.",
      result: "Turn COLD audience into EAGER spending a clear multiple. Expertise-based value differentiation."
    }
  ];

  return (
    <Section className="bg-gradient-to-br from-gray-900 via-brand-black to-gray-900" id="process">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Rocket className="w-4 h-4" />
            Our Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-white mb-6 font-bricolage">
            Here's how we solve your struggles
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {solutions.map((solution, index) => (
            <div key={index} className="group text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-brand-black/50 backdrop-blur-sm border border-brand-purple/20 group-hover:border-brand-purple/40 transition-all duration-300 transform group-hover:-translate-y-2 flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl">{solution.emoji}</span>
                </div>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-brand-white mb-4 group-hover:text-brand-purple transition-colors leading-tight">
                {solution.title}
              </h3>
              
              <div className="text-left space-y-4">
                <div>
                  <p className="text-brand-purple font-semibold text-sm mb-2">
                    {solution.subtitle}
                  </p>
                  <p className="text-brand-gray leading-relaxed text-base sm:text-lg">
                    {solution.description}
                  </p>
                </div>
                
                <div className="bg-brand-black/30 backdrop-blur-sm rounded-xl p-4 border border-brand-purple/10">
                  <p className="text-brand-purple font-semibold text-sm mb-1">
                    The Result:
                  </p>
                  <p className="text-brand-white font-medium text-sm sm:text-base">
                    {solution.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators moved here */}
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
    </Section>
  );
};