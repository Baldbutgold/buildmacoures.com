import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { LazySection } from './components/LazySection';

// Lazy load non-critical components
const OverwhelmingSection = lazy(() => import('./components/OverwhelmingSection').then(module => ({ default: module.OverwhelmingSection })));
const CheckmarkSection = lazy(() => import('./components/CheckmarkSection').then(module => ({ default: module.CheckmarkSection })));
const ReviewsCarousel = lazy(() => import('./components/ReviewsCarousel').then(module => ({ default: module.ReviewsCarousel })));
const CTASection = lazy(() => import('./components/CTASection').then(module => ({ default: module.CTASection })));

// Lazy load pages
const BlogPage = lazy(() => import('./pages/BlogPage').then(module => ({ default: module.BlogPage })));
const BlogPost = lazy(() => import('./pages/BlogPost').then(module => ({ default: module.BlogPost })));
const CallBooked = lazy(() => import('./pages/CallBooked').then(module => ({ default: module.CallBooked })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./pages/TermsOfService').then(module => ({ default: module.TermsOfService })));
const CurriculumGeneratorPage = lazy(() => import('./pages/CurriculumGeneratorPage').then(module => ({ default: module.CurriculumGeneratorPage })));
const ViewCurriculumPage = lazy(() => import('./pages/ViewCurriculumPage').then(module => ({ default: module.ViewCurriculumPage })));

// Loading fallback component
const SectionFallback = () => (
  <div className="py-8 sm:py-12 lg:py-16">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="h-64 sm:h-80 lg:h-96 bg-gray-800/20 animate-pulse rounded-2xl" />
    </div>
  </div>
);

// Wistia Video Component
const WistiaVideo = () => {
  React.useEffect(() => {
    // Load Wistia scripts
    const playerScript = document.createElement('script');
    playerScript.src = 'https://fast.wistia.com/player.js';
    playerScript.async = true;
    document.head.appendChild(playerScript);

    const embedScript = document.createElement('script');
    embedScript.src = 'https://fast.wistia.com/embed/4mw8h1u2ey.js';
    embedScript.async = true;
    embedScript.type = 'module';
    document.head.appendChild(embedScript);

    // Add Wistia styles
    const style = document.createElement('style');
    style.textContent = `
      wistia-player[media-id='4mw8h1u2ey']:not(:defined) { 
        background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/4mw8h1u2ey/swatch'); 
        display: block; 
        filter: blur(5px); 
        padding-top: 56.25%; 
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Cleanup scripts and styles on unmount
      document.head.removeChild(playerScript);
      document.head.removeChild(embedScript);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-brand-black to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <wistia-player media-id="4mw8h1u2ey" aspect="1.7777777777777777"></wistia-player>
        </div>
      </div>
    </div>
  );
};

function HomePage() {
  return (
    <>
      <Hero />
      <LazySection>
        <Suspense fallback={<SectionFallback />}>
          <OverwhelmingSection />
        </Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={<SectionFallback />}>
          <CheckmarkSection />
        </Suspense>
      </LazySection>
      <WistiaVideo />
      <LazySection>
        <Suspense fallback={<SectionFallback />}>
          <ReviewsCarousel />
        </Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={<SectionFallback />}>
          <CTASection />
        </Suspense>
      </LazySection>
    </>
  );
}

function App() {
  // Remove loading skeleton once React loads
  React.useEffect(() => {
    const skeleton = document.getElementById('loading-skeleton');
    if (skeleton) {
      skeleton.style.display = 'none';
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-brand-black via-gray-900 to-brand-black flex items-center justify-center">
              <div className="loading-spinner"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/call-booked" element={<CallBooked />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/generate-curriculum" element={<CurriculumGeneratorPage />} />
              <Route path="/curriculum/:token" element={<ViewCurriculumPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;