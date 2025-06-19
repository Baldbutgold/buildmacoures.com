import React from 'react';
import { Section } from './Section';
import { ProcessStep } from '../types';
import { Users, Video, DollarSign, Rocket } from 'lucide-react';

export const ProcessSection = () => {
  const solutions = [
    {
      icon: Users,
      title: "The 'Category King' Positioning",
      subtitle: "What We Do:",
      description: "Because the ONLY Choice is Your Niche. We don't make videos — we build expertise empires. We don't create courses — we craft authority.",
      result: "Clear Content Clarity. You become the undisputed authority.",
      color: "purple",
      svgIcon: (
        <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="25" r="12" stroke="currentColor" strokeWidth="3" fill="none"/>
          <path d="M35 45 Q50 35 65 45" stroke="currentColor" strokeWidth="3" fill="none"/>
          <circle cx="25" cy="60" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="75" cy="60" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M15 75 Q25 65 35 75" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M65 75 Q75 65 85 75" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M40 50 L25 60 M60 50 L75 60" stroke="currentColor" strokeWidth="2"/>
          <polygon points="45,15 50,5 55,15" fill="currentColor"/>
        </svg>
      )
    },
    {
      icon: Video,
      title: "The 'Always-On' Content Engine",
      subtitle: "What We Do:",
      description: "Because organic content is the lifeblood of performance. Start a 90-day content calendar that positions, nurtures, converting warm leads into customers.",
      result: "Real Outreach without expensive ads. Customers come to YOU.",
      color: "blue",
      svgIcon: (
        <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="20" width="80" height="50" rx="8" stroke="currentColor" strokeWidth="3" fill="none"/>
          <polygon points="35,35 35,55 55,45" fill="currentColor"/>
          <rect x="15" y="25" width="70" height="5" rx="2" fill="currentColor" opacity="0.6"/>
          <circle cx="20" cy="80" r="3" fill="currentColor"/>
          <circle cx="30" cy="80" r="3" fill="currentColor"/>
          <circle cx="40" cy="80" r="3" fill="currentColor"/>
          <path d="M50 80 L90 80" stroke="currentColor" strokeWidth="2"/>
          <rect x="70" y="75" width="15" height="10" rx="2" fill="currentColor"/>
        </svg>
      )
    },
    {
      icon: DollarSign,
      title: "The 'Profit Pipeline' Overhaul",
      subtitle: "What We Do:",
      description: "Audit every step of your funnel. Build clarity, trust, and urgency. Re-channel key values with reason to your unique Expertise-based value differentiation.",
      result: "Turn COLD audience into EAGER spending a clear multiple. Expertise-based value differentiation.",
      color: "green",
      svgIcon: (
        <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="3" fill="none"/>
          <path d="M40 35 Q50 25 60 35" stroke="currentColor" strokeWidth="3" fill="none"/>
          <path d="M40 65 Q50 75 60 65" stroke="currentColor" strokeWidth="3" fill="none"/>
          <path d="M50 30 L50 70" stroke="currentColor" strokeWidth="3"/>
          <rect x="15" y="15" width="8" height="8" fill="currentColor" opacity="0.6"/>
          <rect x="77" y="15" width="8" height="8" fill="currentColor" opacity="0.6"/>
          <rect x="15" y="77" width="8" height="8" fill="currentColor" opacity="0.6"/>
          <rect x="77" y="77" width="8" height="8" fill="currentColor" opacity="0.6"/>
          <path d="M23 19 L27 23 M81 19 L77 23 M23 81 L27 77 M81 81 L77 77" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    }
  ];

  const colorClasses = {
    purple: {
      gradient: "from-brand-purple to-brand-purple-dark",
      icon: "bg-brand-purple/20 text-brand-purple",
      border: "border-brand-purple/30"
    },
    blue: {
      gradient: "from-blue-500 to-indigo-600",
      icon: "bg-blue-500/20 text-blue-400",
      border: "border-blue-500/30"
    },
    green: {
      gradient: "from-green-500 to-emerald-600",
      icon: "bg-green-500/20 text-green-400",
      border: "border-green-500/30"
    }
  };

  return (
    <Section className="bg-gradient-to-br from-gray-900 via-brand-black to-gray-900" id="process">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Rocket className="w-4 h-4" />
            Our Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-white mb-6 font-bricolage">
            Here's how we solve your struggles
          </h2>
          <p className="text-lg sm:text-xl text-brand-gray max-w-3xl mx-auto">
            A proven process that transforms your expertise into a professional, sellable course
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {solutions.map((solution, index) => {
            const colors = colorClasses[solution.color as keyof typeof colorClasses];
            
            return (
              <div key={index} className={`group relative bg-gradient-to-br ${colors.gradient} p-8 lg:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 ${colors.border}`}>
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10 rounded-3xl" style={{
                  backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
                                   radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)`
                }}></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/20 backdrop-blur-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                    {solution.svgIcon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-tight">
                    {solution.title}
                  </h3>
                  
                  <div className="mb-4">
                    <p className="text-white/90 font-semibold text-sm mb-2">
                      {solution.subtitle}
                    </p>
                    <p className="text-white/80 leading-relaxed text-sm sm:text-base mb-4">
                      {solution.description}
                    </p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p className="text-white/90 font-semibold text-sm mb-1">
                      The Result:
                    </p>
                    <p className="text-white font-medium text-sm">
                      {solution.result}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};