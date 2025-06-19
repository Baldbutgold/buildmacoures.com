import React from 'react';
import { Button } from './Button';
import { Container } from './Container';
import { Star, ArrowRight } from 'lucide-react';

export const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-32 lg:pb-24 xl:pt-40 xl:pb-28 bg-gradient-to-br from-brand-black via-gray-900 to-brand-black overflow-hidden min-h-[100vh] md:min-h-screen flex flex-col justify-center">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 opacity-40">
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
          {/* Enhanced heading */}
          <h1 className="font-bold text-brand-white leading-[0.85] mb-8 sm:mb-10 animate-fade-in font-bricolage">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Turn Your Expertise into a{' '}
            </span>
            <span className="relative inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              <span className="bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white px-2 sm:px-3 py-1 rounded-xl sm:rounded-2xl transform -rotate-2 inline-block shadow-purple-lg">
                Sellable Video Course
              </span>
            </span>
            <br />
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-brand-gray mt-4 sm:mt-6 block font-normal">
              (Without Lifting a Finger)
            </span>
          </h1>

          {/* Enhanced social proof */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => window.open('https://www.fiverr.com/mohamed_mrini', '_blank', 'noopener,noreferrer')}
              className="group flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl shadow-lg border border-brand-purple/20 hover:shadow-purple-lg transition-all duration-300 bg-brand-black/50 backdrop-blur-sm hover:border-brand-purple/40 transform hover:-translate-y-1"
            >
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-bold text-base sm:text-lg text-brand-white">4.9</span>
                <span className="text-brand-gray text-sm sm:text-base">(84 reviews)</span>
              </div>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-brand-purple group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Enhanced description */}
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-brand-gray mb-10 sm:mb-12 max-w-4xl mx-auto">
            We help <strong className="text-brand-white">experts, founders, and creators</strong> build full online courses that includes{' '}
            <strong className="text-brand-purple">strategy, scripting and video editing (all done for you).</strong>
          </p>

          {/* Enhanced CTA - moved lower */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              variant="primary" 
              size="lg" 
              className="shadow-purple-lg hover:shadow-purple transform hover:-translate-y-1 animate-float w-full sm:w-auto group"
              onClick={() => scrollToSection('#schedule-call')}
            >
              <span className="flex items-center gap-2 text-sm sm:text-base">
                🚀 Build Ma Course!
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};