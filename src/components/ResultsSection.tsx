import React from 'react';
import { Section } from './Section';
import { TrendingUp, Clock, Award, ArrowRight } from 'lucide-react';

export const ResultsSection = () => {
  const results = [
    {
      icon: TrendingUp,
      title: "Higher Revenue",
      description: "Professional courses command premium prices and generate consistent passive income streams.",
      color: "green",
      stat: "3x Higher Pricing"
    },
    {
      icon: Clock,
      title: "Faster Launch",
      description: "Skip months of learning curve and launch your course quickly with expert production.",
      color: "purple",
      stat: "Quick Delivery"
    },
    {
      icon: Award,
      title: "Professional Quality",
      description: "Stand out from amateur courses with polished editing, clear structure, and engaging content.",
      color: "orange",
      stat: "Studio-Quality Results"
    }
  ];

  const colorClasses = {
    green: {
      bg: "bg-green-500",
      border: "border-green-500",
      text: "text-green-400",
      bgLight: "bg-green-500/10",
      iconBg: "bg-green-500/20"
    },
    purple: {
      bg: "bg-brand-purple",
      border: "border-brand-purple",
      text: "text-brand-purple",
      bgLight: "bg-brand-purple/10",
      iconBg: "bg-brand-purple/20"
    },
    orange: {
      bg: "bg-orange-500",
      border: "border-orange-500",
      text: "text-orange-400",
      bgLight: "bg-orange-500/10",
      iconBg: "bg-orange-500/20"
    }
  };

  return (
    <Section className="bg-gradient-to-br from-gray-900 via-brand-black to-gray-900" id="results">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            The Results
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-white mb-6 font-bricolage">
            What You Can Expect
          </h2>
          <p className="text-lg sm:text-xl text-brand-gray max-w-3xl mx-auto">
            Join successful creators who've transformed their expertise into profitable, professional courses
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {results.map((result, index) => {
            const Icon = result.icon;
            const colors = colorClasses[result.color as keyof typeof colorClasses];
            
            return (
              <div key={index} className={`group relative bg-brand-black/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-purple-lg transition-all duration-500 border border-brand-purple/20 hover:border-brand-purple/40 transform hover:-translate-y-2`}>
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 ${colors.bgLight} opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-2xl`}></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full ${colors.iconBg} ${colors.text} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <div className={`text-xs sm:text-sm font-bold ${colors.text} uppercase tracking-wider mb-2`}>
                      {result.stat}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-brand-white mb-4">
                      {result.title}
                    </h3>
                  </div>
                  <p className="text-brand-gray text-center leading-relaxed text-sm sm:text-base">
                    {result.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white p-6 sm:p-8 lg:p-12 rounded-3xl shadow-purple-lg">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 font-bricolage">
              Ready to see these results for yourself?
            </h3>
            <p className="text-lg sm:text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join the growing number of creators who've transformed their expertise into profitable, professional courses.
            </p>
            <button 
              onClick={() => {
                const element = document.querySelector('#schedule-call');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-3 bg-white text-brand-purple px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group"
            >
              Book Your Free Strategy Call
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};