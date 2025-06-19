import React from 'react';
import { Section } from './Section';
import { Button } from './Button';
import { CheckCircle, TrendingUp, Users, DollarSign, Zap } from 'lucide-react';

export const SolutionSection = () => {
  const solutions = [
    {
      icon: TrendingUp,
      title: "Passive Income Stream",
      description: "Create a course that generates revenue 24/7, even while you sleep.",
      color: "green"
    },
    {
      icon: Users,
      title: "Industry Authority",
      description: "Position yourself as the go-to expert in your field and attract premium clients.",
      color: "purple"
    },
    {
      icon: DollarSign,
      title: "Scalable Business",
      description: "Reach thousands of students without trading time for money.",
      color: "orange"
    },
    {
      icon: Zap,
      title: "Professional Quality",
      description: "Get a polished, professional course that stands out from the competition.",
      color: "blue"
    }
  ];

  const colorClasses = {
    green: "from-green-500 to-emerald-600",
    purple: "from-brand-purple to-brand-purple-dark", 
    orange: "from-orange-500 to-red-500",
    blue: "from-blue-500 to-indigo-600"
  };

  return (
    <Section className="bg-gradient-to-br from-gray-900 via-brand-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            The Benefits
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-white mb-6 font-bricolage">
            Transform Your Expertise Into
            <span className="block text-brand-purple mt-2">Real Business Results</span>
          </h2>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">
            Join successful creators who've turned their knowledge into profitable, scalable businesses
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            const gradientClass = colorClasses[solution.color as keyof typeof colorClasses];
            
            return (
              <div key={index} className="group bg-brand-black/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-purple-lg transition-all duration-500 border border-brand-purple/20 hover:border-brand-purple/40 transform hover:-translate-y-2">
                <div className="flex items-start gap-6">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${gradientClass} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brand-white mb-3 group-hover:text-brand-purple transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-brand-gray leading-relaxed">
                      {solution.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Enhanced bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-brand-black via-gray-900 to-brand-black text-white p-8 md:p-12 rounded-3xl shadow-2xl border border-brand-purple/20">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 font-bricolage">
              You Have the Knowledge.
            </h3>
            <h4 className="text-2xl md:text-3xl font-bold text-orange-400 mb-6">
              Let Me Turn It Into Profit.
            </h4>
            <p className="text-xl text-brand-gray mb-8 max-w-2xl mx-auto">
              Stop letting your expertise go to waste. Transform it into a professional course that generates income and establishes your authority.
            </p>
            
            <Button 
              variant="primary" 
              size="lg" 
              className="shadow-purple-lg hover:shadow-purple transform hover:-translate-y-1 group"
              onClick={() => {
                const element = document.querySelector('#schedule-call');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="flex items-center gap-2">
                Book Your Free Strategy Call
                <CheckCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};