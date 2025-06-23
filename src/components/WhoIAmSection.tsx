import React from 'react';
import { Container } from './Container';
import { User, CheckCircle, Star } from 'lucide-react';

export const WhoIAmSection = () => {
  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-brand-black to-gray-900">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
              <User className="w-4 h-4" />
              Meet Your Course Creator
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-white mb-4 font-bricolage">
              Who I Am & Why I Do This
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image Section */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-brand-purple/20 to-brand-purple-dark/20 border border-brand-purple/20 shadow-2xl">
                  <img 
                    src="/1337_headshot_ael-hadj-removebg-preview.png" 
                    alt="Mohamed - Course Creation Expert"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white px-4 py-2 rounded-full shadow-lg border border-brand-purple/20">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-sm">80+ Courses Built</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-lg sm:text-xl text-brand-gray leading-relaxed">
                  I handle the entire A-Z production. You're the expert; my job is to turn your knowledge into a finished asset without you lifting a finger.
                </p>
                
                <p className="text-lg sm:text-xl text-brand-gray leading-relaxed">
                  We do all the content creation—scripting, curriculum design—and all the technical work. I've systemized the process for over 80 clients.
                </p>
                
                <p className="text-xl sm:text-2xl font-bold text-brand-white leading-relaxed">
                  You provide the genius, I build the machine.
                </p>
              </div>

              {/* Key Points */}
              <div className="space-y-4 pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-brand-white mb-1">Complete A-Z Production</h4>
                    <p className="text-brand-gray">From initial strategy to final upload—I handle everything</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-brand-white mb-1">Systemized Process</h4>
                    <p className="text-brand-gray">Proven framework refined through 80+ successful course launches</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-brand-white mb-1">Zero Work For You</h4>
                    <p className="text-brand-gray">You focus on being the expert, I focus on everything else</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-brand-purple/20">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-brand-purple mb-1">80+</div>
                  <div className="text-sm text-brand-gray">Courses Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-brand-purple mb-1">4.9★</div>
                  <div className="text-sm text-brand-gray">Client Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};