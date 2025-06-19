import React from 'react';
import { Section } from './Section';
import { TrendingUp, HeadphonesIcon, Award, ArrowRight } from 'lucide-react';

export const ResultsSection = () => {
  const results = [
    {
      icon: TrendingUp,
      title: "More Revenue",
      description: "Create a new passive income stream with high-quality educational content that sells 24/7.",
      color: "green",
      stat: "300% ROI Average"
    },
    {
      icon: HeadphonesIcon,
      title: "Less Support",
      description: "Reduce your support tickets by up to 50% with clear, professional video tutorials that answer common questions.",
      color: "blue",
      stat: "50% Fewer Tickets"
    },
    {
      icon: Award,
      title: "More Authority",
      description: "Position yourself as the clear industry expert, attracting better clients and partnerships.",
      color: "orange",
      stat: "10x Brand Recognition"
    }
  ];

  const colorClasses = {
    green: {
      bg: "bg-green-500",
      border: "border-green-500",
      text: "text-green-600",
      bgLight: "bg-green-50",
      iconBg: "bg-green-100"
    },
    blue: {
      bg: "bg-brand-blue",
      border: "border-brand-blue",
      text: "text-brand-blue",
      bgLight: "bg-blue-50",
      iconBg: "bg-blue-100"
    },
    orange: {
      bg: "bg-orange-500",
      border: "border-orange-500",
      text: "text-orange-600",
      bgLight: "bg-orange-50",
      iconBg: "bg-orange-100"
    }
  };

  return (
    <Section className="bg-gradient-to-br from-gray-50 via-white to-blue-50/30" id="results">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            Proven Results
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-6 font-bricolage">
            The Results You Can Expect
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds of SaaS founders who've transformed their business with our content solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {results.map((result, index) => {
            const Icon = result.icon;
            const colors = colorClasses[result.color as keyof typeof colorClasses];
            
            return (
              <div key={index} className={`group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-t-4 ${colors.border} transform hover:-translate-y-2`}>
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 ${colors.bgLight} opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-2xl`}></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${colors.iconBg} ${colors.text} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className={`text-sm font-bold ${colors.text} uppercase tracking-wider mb-2`}>
                      {result.stat}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {result.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {result.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-brand-blue to-blue-600 text-white p-8 md:p-12 rounded-3xl shadow-xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 font-bricolage">
              Ready to see these results for your SaaS?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join the growing number of SaaS founders who've unlocked new revenue streams with our proven content framework.
            </p>
            <button 
              onClick={() => {
                const element = document.querySelector('#schedule-call');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-3 bg-white text-brand-blue px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group"
            >
              Get Your Free Strategy Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};