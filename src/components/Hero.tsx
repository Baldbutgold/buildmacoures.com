import React from 'react';
import { Button } from './Button';
import { Container } from './Container';
import { Star, ArrowRight, Play } from 'lucide-react';

export const Hero = React.memo(() => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative pt-16 pb-12 md:pt-24 md:pb-20 lg:pt-32 lg:pb-24 xl:pt-40 xl:pb-28 bg-gradient-to-br from-brand-black via-gray-900 to-brand-black overflow-hidden min-h-screen flex flex-col justify-center contain-layout">
      {/* Optimized background pattern */}
      <div className="absolute inset-0 opacity-40 will-change-transform">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)` 
        }}></div>
        <div className="grid-pattern pointer-events-none" style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <Container>
        <div className="max-w-6xl mx-auto text-center px-2 sm:px-4 relative z-10">
          {/* Enhanced heading with mobile optimization */}
          <h1 className="font-bold text-brand-white leading-[0.85] mb-6 sm:mb-8 md:mb-10 animate-fade-in font-bricolage">
            <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Turn Your Expertise Into{' '}
            </span>
            <span className="relative inline-block text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-2 sm:mt-4">
              <span className="bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white px-2 sm:px-3 py-1 rounded-lg sm:rounded-xl md:rounded-2xl transform -rotate-1 sm:-rotate-2 inline-block shadow-purple-lg gpu-accelerated">
                a Sellable Video Course
              </span>
            </span>
            <br />
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-brand-gray mt-3 sm:mt-4 md:mt-6 block font-normal">
              (Without Lifting a Finger)
            </span>
          </h1>

          {/* Video placeholder - DISABLED TEMPORARILY */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-brand-purple/20 hover:border-brand-purple/40 transition-all duration-300 transform hover:-translate-y-1 bg-brand-black/20 backdrop-blur-sm aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-purple/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 text-brand-purple ml-1" />
                </div>
                <p className="text-brand-gray text-sm sm:text-base">Video temporarily unavailable</p>
              </div>
            </div>
          </div>

          {/* Optimized social proof */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <button
              onClick={() => window.open('https://www.fiverr.com/mohamed_mrini', '_blank', 'noopener,noreferrer')}
              className="group flex items-center space-x-2 sm:space-x-3 md:space-x-4 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl shadow-lg border border-brand-purple/20 hover:shadow-purple-lg transition-all duration-300 bg-brand-black/50 backdrop-blur-sm hover:border-brand-purple/40 transform hover:-translate-y-1 gpu-accelerated"
              aria-label="View our 4.9 star rating on Fiverr"
            >
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="flex" role="img" aria-label="5 star rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-bold text-sm sm:text-base md:text-lg text-brand-white">4.9</span>
                <span className="text-brand-gray text-xs sm:text-sm md:text-base">(84 reviews)</span>
              </div>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-brand-purple group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Enhanced description with mobile optimization */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-brand-gray mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto px-2">
            I help <strong className="text-brand-white">experts, founders, and creators</strong> build full courses that includes{' '}
            <strong className="text-brand-purple">strategy, scripting and video editing (all done for you).</strong>
          </p>

          {/* Enhanced CTA with mobile optimization */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 px-2">
            <Button 
              variant="primary" 
              size="lg" 
              className="shadow-purple-lg hover:shadow-purple transform hover:-translate-y-1 animate-float w-full sm:w-auto group gpu-accelerated text-sm sm:text-base"
              onClick={() => scrollToSection('#schedule-call')}
            >
              <span className="flex items-center gap-2">
                🚀 Build Ma Course!
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
});

Hero.displayName = 'Hero';