import React from 'react';
import { Section } from './Section';
import { AlertTriangle } from 'lucide-react';

export const OverwhelmingSection = () => {
  const painPoints = [
    {
      emoji: "💸",
      title: "Course launch falls flat",
      description: "Your first or next course launch fails, wasting time, energy & money on something that doesn't sell"
    },
    {
      emoji: "⏰",
      title: "Years pass struggling",
      description: "Months—or even years—could pass as you struggle with the complexity of getting started while opportunities slip away"
    },
    {
      emoji: "📈",
      title: "Missing the knowledge economy",
      description: "You might regret not acting now to tap into the multi-billion-dollar knowledge economy while it's booming"
    }
  ];

  const benefits = [
    {
      emoji: "💰",
      title: "Scalable revenue stream",
      description: "Unlock a revenue stream that generates income while you sleep, without trading time for money"
    },
    {
      emoji: "🌍",
      title: "Impact more lives",
      description: "Share your expertise with a broader audience and make a bigger difference in people's lives"
    },
    {
      emoji: "👑",
      title: "Industry authority",
      description: "Position yourself as an industry leader, attracting new clients and premium opportunities"
    }
  ];

  return (
    <Section className="bg-gradient-to-br from-gray-900 via-brand-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Main Headline */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4" />
            Without Expert Guidance
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-white mb-6 font-bricolage">
            Creating an online course is{' '}
            <span className="italic text-brand-purple">overwhelming...</span>
          </h2>
          <p className="text-lg sm:text-xl text-brand-gray mb-8 max-w-3xl mx-auto">
            You will struggle with
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-16 sm:mb-20">
          {painPoints.map((point, index) => (
            <div key={index} className="group text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-brand-black/50 backdrop-blur-sm border border-red-500/20 group-hover:border-red-500/40 transition-all duration-300 transform group-hover:-translate-y-2 flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl">{point.emoji}</span>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-brand-white mb-4 group-hover:text-red-400 transition-colors">
                {point.title}
              </h3>
              <p className="text-brand-gray leading-relaxed text-base sm:text-lg">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Transition */}
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-white mb-6 font-bricolage">
            It doesn't have to be this way.
          </h3>
          <p className="text-lg sm:text-xl text-brand-gray mb-8 max-w-4xl mx-auto leading-relaxed">
            Instead of guessing your way through course creation, let{' '}
            <strong className="text-brand-purple">BuildMaCourse</strong> help you{' '}
            <strong className="text-brand-white">fast-track your success.</strong> With our proven strategies and expert support, you'll have everything you need to plan, build, and begin to promote a course that works.
          </p>
          <p className="text-lg sm:text-xl text-brand-purple font-semibold mb-8">
            Imagine results like being able to...
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {benefits.map((benefit, index) => (
            <div key={index} className="group text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-brand-black/50 backdrop-blur-sm border border-green-500/20 group-hover:border-green-500/40 transition-all duration-300 transform group-hover:-translate-y-2 flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl">{benefit.emoji}</span>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-brand-white mb-4 group-hover:text-green-400 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-brand-gray leading-relaxed text-base sm:text-lg">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};