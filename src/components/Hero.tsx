import React from 'react';
import { Button } from './Button';
import { Container } from './Container';

export const Hero = () => {
  return (
    <div className="relative pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 bg-brand-white overflow-hidden min-h-[70vh] flex flex-col justify-center">
      <div className="absolute inset-0 grid-pattern"></div>
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          {/* Updated subtitle styling: Adjusted gradient for less transparency */}
          <p className="text-lg md:text-xl mb-4 animate-fade-in font-semibold 
                      bg-gradient-to-l from-brand-blue via-brand-blue to-blue-300 
                      bg-clip-text text-transparent">
            Become the #1 Authority in Your Space
          </p>
          
          {/* Updated H1 with new line breaks */}
          <h1 className="text-[80px] font-bold text-black leading-none mb-5 animate-fade-in">
            Transform your <br /> SaaS into a{' '} <br />
            {/* Updated span styling */}
            <span style={{
              backgroundColor: '#44b1ff', 
              color: 'white', 
              padding: '0.05em 0.2em', /* Reduced padding */
              borderRadius: '0.5em', /* Increased border radius */
              display: 'inline-block', /* Needed for transform */
              transform: 'rotate(-2deg)' /* Added rotation */
            }}>
              revenue machine
            </span>
          </h1>
          
          {/* Updated paragraph max-width again */}
          <p className="text-2xl leading-[35px] text-brand-black/80 mb-12 max-w-6xl mx-auto font-['Polysans_Slim',_Arial,_sans-serif]">
            <strong>On-demand training, video content, and done-for-you course creation</strong> for SaaS founders and tech brands.
            MonetizeUrContent makes it easy to plan, produce, and launch educational content that drives revenue, cuts support costs, and positions your product as the authority in your space.
          </p>
          
          <div className="mb-12">
            <Button 
              variant="primary" 
              size="lg" 
              className="shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-float bg-brand-blue hover:bg-opacity-90 text-brand-white"
            >
              Schedule Your Free Strategy Call {/* Or update button text if needed */}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};