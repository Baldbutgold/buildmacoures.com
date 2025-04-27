import React from 'react';
import { Section } from './Section';
import { CheckCircle } from 'lucide-react';

export const ResultsSection = () => {
  return (
    <Section className="bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
          The Results You Can Expect
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-green-500">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-500 mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">More Revenue</h3>
            </div>
            <p className="text-gray-600 text-center">
              Create a new passive income stream with high-quality educational content that sells 24/7.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-blue-500">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-500 mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Less Support</h3>
            </div>
            <p className="text-gray-600 text-center">
              Reduce your support tickets by up to 50% with clear, professional video tutorials that answer common questions.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-orange-500">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-500 mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">More Authority</h3>
            </div>
            <p className="text-gray-600 text-center">
              Position yourself as the clear industry expert, attracting better clients and partnerships.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};