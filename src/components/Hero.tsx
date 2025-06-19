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
    <div className="relative pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 bg-gradient-to-br from-brand-black via-gray-900 to-brand-black overflow-hidden min-h-[80vh] flex flex-col justify-center">
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
        <div className="max-w-5xl mx-auto text-center px-2 sm:px-4 relative z-10">
          {/* Enhanced badge */}
          <div className="inline-flex items-center gap-2 text-sm sm:text-base mb-6 animate-fade-in">
            <div className="bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white px-4 py-2 rounded-full font-medium shadow-purple">
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-current" />
                ✨ Become the #1 Authority in Your Space ✨
              </span>
            </div>
          </div>

          {/* Enhanced heading */}
          <h1 className="font-bold text-brand-white leading-[0.9] mb-8 sm:mb-10 animate-fade-in text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bricolage">
            Transform your <br /> 
            SaaS into a{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white px-3 py-1 rounded-2xl transform -rotate-2 inline-block shadow-purple-lg">
                revenue machine
              </span>
            </span>
          </h1>

          {/* Enhanced social proof */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => window.open('https://www.fiverr.com/mohamed_mrini', '_blank', 'noopener,noreferrer')}
              className="group flex items-center space-x-4 p-4 rounded-xl shadow-lg border border-brand-purple/20 hover:shadow-purple-lg transition-all duration-300 bg-brand-black/50 backdrop-blur-sm hover:border-brand-purple/40 transform hover:-translate-y-1"
            >
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-bold text-lg text-brand-white">4.9</span>
                <span className="text-brand-gray">(84 reviews)</span>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-purple group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Enhanced description */}
          <p className="text-lg sm:text-xl leading-relaxed text-brand-gray mb-10 max-w-4xl mx-auto">
            <strong className="text-brand-white">On-demand training, video content, and done-for-you course creation</strong> for SaaS founders and tech brands.
            MonetizeUrContent makes it easy to plan, produce, and launch educational content that drives revenue, cuts support costs, and positions your product as the authority in your space.
          </p>

          {/* Enhanced CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              variant="primary" 
              size="lg" 
              className="shadow-purple-lg hover:shadow-purple transform hover:-translate-y-1 animate-float w-full sm:w-auto group"
              onClick={() => scrollToSection('#schedule-call')}
            >
              <span className="flex items-center gap-2">
                Schedule Your Free Strategy Call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            <button 
              onClick={() => scrollToSection('#process')}
              className="text-brand-purple hover:text-brand-purple-dark font-medium underline underline-offset-4 transition-colors"
            >
              See How It Works
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-brand-gray mt-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
              <span>80+ Projects Completed</span>
            </div>
            <div className="w-px h-4 bg-brand-gray/30 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
              <span>98% Client Satisfaction</span>
            </div>
            <div className="w-px h-4 bg-brand-gray/30 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
              <span>Fast 2-Week Delivery</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};