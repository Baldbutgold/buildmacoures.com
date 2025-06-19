import React from 'react';
import { Container } from './Container';
import { CheckItem } from '../types';
import { X, Check } from 'lucide-react';

export const CheckmarkSection = () => {
  const negatives: CheckItem[] = [
    { text: "Your first or next course launch falls flat, wasting time, energy & money.", positive: false },
    { text: "You might regret not acting now to tap into the multi-billion-dollar knowledge economy.", positive: false },
    { text: "Months—or even years—could pass as you struggle with the complexity of getting started.", positive: false },
    { text: "Your business won't grow beyond its current limitations.", positive: false },
  ];

  const positives: CheckItem[] = [
    { text: "Unlock a scalable revenue stream that generates income while you sleep.", positive: true },
    { text: "Impact more lives by sharing your expertise with a broader audience.", positive: true },
    { text: "Position yourself as an industry leader, attracting new clients and opportunities.", positive: true },
    { text: "Gain the freedom to work from anywhere, on your own terms.", positive: true },
  ];

  return (
    <div className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-brand-black to-gray-900">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-white mb-4 font-bricolage">
              Creating an online course is overwhelming.
            </h2>
            <p className="text-xl text-gray-300 font-normal max-w-3xl mx-auto">
              Without expert guidance, here's what often happens...
            </p>
          </div>

          {/* Problems Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {negatives.map((item, idx) => (
              <div key={idx} className="group flex items-start p-6 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/15 transition-all duration-300">
                <div className="flex-shrink-0 mr-4 mt-1">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                    <X className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-lg text-brand-white font-medium leading-relaxed group-hover:text-red-100 transition-colors">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-white mb-6 font-bricolage">
              It doesn't have to be this way.
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-300 mb-4">
                Instead of guessing your way through course creation, <strong className="text-brand-blue">let MonetizeUrContent help you fast-track your success</strong>. With our proven strategies and expert support, you'll have everything you need to plan, build, and begin to promote a course that works.
              </p>
              <p className="text-lg text-brand-blue italic font-medium">
                Imagine results like being able to...
              </p>
            </div>
          </div>

          {/* Solutions Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {positives.map((item, idx) => (
              <div key={idx} className="group flex items-start p-6 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/15 transition-all duration-300">
                <div className="flex-shrink-0 mr-4 mt-1">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-lg text-brand-white font-medium leading-relaxed group-hover:text-green-100 transition-colors">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};