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

// Loading fallback component
const SectionFallback = () => (
  <div className="py-8 sm:py-12 lg:py-16">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="h-64 sm:h-80 lg:h-96 bg-gray-800/20 animate-pulse rounded-2xl" />
    </div>
  </div>
);

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
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;