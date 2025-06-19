import React from 'react';
import { Section } from './Section';
import { ProcessStep } from '../types';
import { MessageCircle, Video, Rocket, Users, DollarSign, TrendingUp } from 'lucide-react';

export const ProcessSection = () => {
  const solutions = [
    {
      icon: Users,
      title: "The 'Category King' Positioning",
      subtitle: "What We Do:",
      description: "Because the ONLY Choice is Your Niche. We don't make videos — we build expertise empires. We don't create courses — we craft authority.",
      result: "Clear Content Clarity. You become the undisputed authority.",
      color: "purple"
    },
    {
      icon: Video,
      title: "The 'Always-On' Content Engine",
      subtitle: "What We Do:",
      description: "Because organic content is the lifeblood of performance. Start a 90-day content calendar that positions, nurtures, converting warm leads into customers.",
      result: "Real Outreach without expensive ads. Customers come to YOU.",
      color: "blue"
    },
    {
      icon: DollarSign,
      title: "The 'Profit Pipeline' Overhaul",
      subtitle: "What We Do:",
      description: "Audit every step of your funnel. Build clarity, trust, and urgency. Re-channel key values with reason to your unique Expertise-based value differentiation.",
      result: "Turn COLD audience into EAGER spending a clear multiple. Expertise-based value differentiation.",
      color: "green"
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
            How We Solve Your Struggles
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
            const Icon = solution.icon;
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
                  <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
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