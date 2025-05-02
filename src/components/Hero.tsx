import React from 'react';
import { Button } from './Button';
import { Container } from './Container';

export const Hero = () => {
  return (
    // Use brand-white for background
    <div className="relative pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 bg-brand-white overflow-hidden min-h-[70vh] flex flex-col justify-center">
      {/* Grid pattern uses brand-blue with opacity */}
      <div className="absolute inset-0 grid-pattern pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(68, 177, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(68, 177, 255, 0.1) 1px, transparent 1px)' }}></div>
      <Container>
        <div className="max-w-4xl mx-auto text-center px-2 sm:px-4">
          {/* Subtitle uses brand-black background, brand-white text */}
          <p className="inline-block text-sm sm:text-base md:text-base mb-4 animate-fade-in font-normal bg-brand-black text-brand-white px-3 sm:px-4 py-1 rounded-full transform rotate-3">
            ✨ Become the #1 Authority in Your Space ✨
          </p>
          {/* Heading uses brand-black text */}
          <h1
            className="font-bold text-brand-black leading-none mb-8 sm:mb-10 animate-fade-in text-3xl sm:text-5xl md:text-7xl lg:text-[80px]"
            style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontOpticalSizing: 'auto', fontWeight: 700, fontStyle: 'normal', fontVariationSettings: '"wdth" 100' }}
          >
            Transform your <br /> SaaS into a{' '} <br />
            <span style={{
              backgroundColor: 'rgb(68, 177, 255)',
              color: 'rgb(255, 255, 255)',
              padding: '0.05em 0.2em',
              borderRadius: '0.5em',
              display: 'inline-block',
              transform: 'rotate(-2deg)'
            }}>
              revenue machine.
            </span>
          </h1>
          <div className="w-full flex justify-center mb-6 sm:mb-8">
            <button
              onClick={() => window.open('https://www.fiverr.com/mohamed_mrini', '_blank', 'noopener,noreferrer')}
              className="flex items-center space-x-4 p-3 sm:p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition bg-white cursor-pointer min-h-12"
              style={{ textDecoration: 'none', border: 'none', background: 'none' }}
            >
              <span aria-label="Rating" className="flex items-center">
                <svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                  <path fillRule="evenodd" clipRule="evenodd" d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z" fill="#FFC107"/>
                </svg>
                <strong className="text-base sm:text-lg font-semibold text-gray-900">4.9</strong>
                <span className="ml-1 text-gray-600">(84)</span>
              </span>
            </button>
          </div>
          <p className="text-base sm:text-xl leading-[28px] sm:leading-[35px] text-brand-black/80 mb-8 sm:mb-12 max-w-6xl mx-auto font-['Polysans_Slim',_Arial,_sans-serif]">
            <strong>On-demand training, video content, and done-for-you course creation</strong> for SaaS founders and tech brands.
            MonetizeUrContent makes it easy to plan, produce, and launch educational content that drives revenue, cuts support costs, and positions your product as the authority in your space.
          </p>
          <div className="mb-8 sm:mb-12">
            <Button 
              variant="primary" 
              size="lg" 
              className="shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-float w-full sm:w-auto min-h-12"
            >
              Schedule Your Free Strategy Call
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};