import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PainPointsSection } from './components/PainPointsSection';
import { ProcessSection } from './components/ProcessSection';
import { CheckmarkSection } from './components/CheckmarkSection';
import { ReviewsCarousel } from './components/ReviewsCarousel';
import { SolutionSection } from './components/SolutionSection';
import { BenefitsSection } from './components/BenefitsSection';
import { StruggleSection } from './components/StruggleSection';
import { ResultsSection } from './components/ResultsSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { BlogPage } from './pages/BlogPage';
import { BlogPost } from './pages/BlogPost';

function HomePage() {
  return (
    <>
      <Hero />
      <PainPointsSection />
      <ProcessSection />
      <CheckmarkSection />
      <ReviewsCarousel />
      <SolutionSection />
      <BenefitsSection />
      <StruggleSection />
      <ResultsSection />
      <CTASection />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;