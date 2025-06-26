import React from 'react';
import { Container } from './Container';
import { User, CheckCircle, Star } from 'lucide-react';
import { LazyImage } from './LazyImage';

export const WhoIAmSection = () => {
  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-brand-black to-gray-900">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-4 sm:mb-6">
              <User className="w-4 h-4" />
              Meet Your Course Creator
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white mb-4 font-bricolage">
              Who I Am & Why I Do This
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Image Section - Simple border that touches the image */}
            <div className="order-1 lg:order-1">
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  {/* Simple border that touches the image exactly */}
                  <div className="relative border-2 border-brand-purple/30 rounded-2xl overflow-hidden">
                    <LazyImage 
                      src="/1337_headshot_ael-hadj-removebg-preview.png" 
                      alt="Mohamed - Course Creation Expert"
                      className="w-64 sm:w-80 md:w-96 lg:w-full lg:max-w-md h-auto object-contain"
                      fallback="M"
                      priority={true}
                    />
                  </div>
                  
                  {/* Simple floating badge */}
                  <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-lg border border-brand-purple/20 z-20">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                      <span className="font-bold text-xs sm:text-sm">80+ Courses Built</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="order-2 lg:order-2">
              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-base sm:text-lg lg:text-xl text-brand-gray leading-relaxed">
                    I handle the entire A-Z production. You're the expert; my job is to turn your knowledge into a finished asset without you lifting a finger.
                  </p>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-brand-gray leading-relaxed">
                    We do all the content creation—scripting, curriculum design—and all the technical work. I've systemized the process for over 80 clients.
                  </p>
                  
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-brand-white leading-relaxed">
                    You provide the genius, I build the machine.
                  </p>
                </div>

                {/* Key Points */}
                <div className="space-y-4 pt-4 sm:pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-brand-white mb-1 text-sm sm:text-base">Complete A-Z Production</h4>
                      <p className="text-brand-gray text-sm sm:text-base">From initial strategy to final upload—I handle everything</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-brand-white mb-1 text-sm sm:text-base">Systemized Process</h4>
                      <p className="text-brand-gray text-sm sm:text-base">Proven framework refined through 80+ successful course launches</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-brand-white mb-1 text-sm sm:text-base">Zero Work For You</h4>
                      <p className="text-brand-gray text-sm sm:text-base">You focus on being the expert, I focus on everything else</p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-brand-purple/20">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-purple mb-1">80+</div>
                    <div className="text-xs sm:text-sm text-brand-gray">Courses Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-purple mb-1">4.9★</div>
                    <div className="text-xs sm:text-sm text-brand-gray">Client Rating</div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-6">
                  <button 
                    onClick={() => window.location.href = '/book-call'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white px-6 py-3 rounded-full font-semibold text-base hover:from-brand-purple-dark hover:to-brand-purple-deep transition-all duration-300 transform hover:-translate-y-1 shadow-purple hover:shadow-purple-lg"
                  >
                    🚀 Book Your Free Strategy Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};