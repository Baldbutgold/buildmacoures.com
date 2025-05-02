import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CheckmarkSection } from './components/CheckmarkSection';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { ProcessSection } from './components/ProcessSection';
import { BenefitsSection } from './components/BenefitsSection';
import { StruggleSection } from './components/StruggleSection';
import { ResultsSection } from './components/ResultsSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { ReviewsCarousel } from './components/ReviewsCarousel';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <ReviewsCarousel />
        <CheckmarkSection />
        <ProblemSection />
        <SolutionSection />
        <ProcessSection />
        <BenefitsSection />
        <StruggleSection />
        <ResultsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;