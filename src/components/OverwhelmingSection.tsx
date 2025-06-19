import React from 'react';
import { Section } from './Section';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';

export const OverwhelmingSection = () => {
  const problems = [
    "Your first or next course launch falls flat, wasting time, energy & money.",
    "You might regret not acting now to tap into the multi-billion-dollar knowledge economy.",
    "Months—or even years—could pass as you struggle with the complexity of getting started.",
    "Your business won't grow."
  ];

  const benefits = [
    "Unlock a scalable revenue stream that generates income while you sleep.",
    "Impact more lives by sharing your expertise with a broader audience.",
    "Position yourself as an industry leader, attracting new clients and opportunities.",
    "Gain the freedom to work from anywhere, on your own terms."
  ];

  return (
    <Section className="bg-gradient-to-br from-gray-900 via-brand-black to-gray-900">
      <div className="max-w-5xl mx-auto">
        {/* Main Headline */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-white mb-6 font-bricolage">
            Creating an online course is{' '}
            <span className="italic text-brand-purple">overwhelming.</span>
          </h2>
          <p className="text-lg sm:text-xl text-brand-gray mb-8 max-w-3xl mx-auto">
            Without expert guidance, here's what often happens...
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 sm:mb-16">
          {problems.map((problem, index) => (
            <div key={index} className="flex items-start gap-4 p-6 bg-brand-black/50 backdrop-blur-sm rounded-2xl border border-red-500/20">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                  <X className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-brand-gray leading-relaxed">
                {problem}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-4 p-6 bg-brand-black/50 backdrop-blur-sm rounded-2xl border border-green-500/20">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-brand-gray leading-relaxed">
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};