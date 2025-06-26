import React from 'react';
import { Section } from './Section';
import { AlertTriangle } from 'lucide-react';

export const OverwhelmingSection = () => {
  const painPoints = [
    {
      emoji: "😵‍💫",
      title: "Drowning in technical details",
      description: "Video editing, course platforms, file formats, audio quality... there are so many moving pieces that you spend more time learning tools than teaching your expertise"
    },
    {
      emoji: "⏰",
      title: "Months of work with no guarantee",
      description: "You could spend 6+ months creating a course, only to launch to crickets because the structure, marketing, or presentation wasn't quite right"
    },
    {
      emoji: "🎯",
      title: "Perfectionism paralysis",
      description: "You know your content inside and out, but you keep second-guessing the structure, worrying about video quality, and never actually launching anything"
    }
  ];

  const benefits = [
    {
      emoji: "💰",
      title: "Launch in weeks, not months",
      description: "Get a complete, professional course ready to sell while your competitors are still figuring out their camera settings"
    },
    {
      emoji: "🎬",
      title: "Hollywood-quality production",
      description: "Your course looks and sounds like it was made by a professional studio, commanding premium prices and student respect"
    },
    {
      emoji: "🚀",
      title: "Proven structure that converts",
      description: "Every module, lesson, and transition is designed using frameworks that keep students engaged and completing your course"
    }
  ];

  return (
    <Section className="bg-gradient-to-br from-gray-900 via-brand-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Main Headline */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4" />
            The Reality Check
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-white mb-6 font-bricolage">
            Here's what happens when you try to{' '}
            <span className="italic text-orange-400">do it all yourself...</span>
          </h2>
          <p className="text-lg sm:text-xl text-brand-gray mb-8 max-w-3xl mx-auto">
            Most experts who try to create their own course end up in one of these situations
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
            But what if there was a better way?
          </h3>
          <p className="text-lg sm:text-xl text-brand-gray mb-8 max-w-4xl mx-auto leading-relaxed">
            What if you could skip all the technical headaches, avoid the months of trial and error, and get a{' '}
            <strong className="text-brand-purple">professional course that's ready to sell</strong> in just a few weeks?{' '}
            <strong className="text-brand-white">That's exactly what I do for my clients.</strong>
          </p>
          <p className="text-lg sm:text-xl text-brand-purple font-semibold mb-8">
            Here's what you get instead...
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-16 sm:mb-20">
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

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white p-6 sm:p-8 lg:p-12 rounded-3xl shadow-purple-lg">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 font-bricolage">
              Ready to skip the struggle?
            </h3>
            <p className="text-lg sm:text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how to turn your expertise into a professional course without the technical headaches.
            </p>
            <button 
              onClick={() => window.location.href = '/book-call'}
              className="inline-flex items-center gap-3 bg-white text-brand-purple px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group"
            >
              📞 Book Your Free Strategy Call
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};