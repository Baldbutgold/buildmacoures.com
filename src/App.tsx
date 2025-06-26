import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { LazySection } from './components/LazySection';

// Lazy load components with better error handling
const createLazyComponent = (importFn: () => Promise<any>, componentName: string) => {
  return lazy(() => 
    importFn()
      .then(module => ({ default: module[componentName] || module.default }))
      .catch(error => {
        console.error(`Failed to load ${componentName}:`, error);
        return { 
          default: () => (
            <div className="py-8 text-center">
              <p className="text-brand-gray">Failed to load {componentName}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-brand-purple text-white rounded-lg hover:bg-brand-purple-dark transition-colors"
              >
                Reload Page
              </button>
            </div>
          )
        };
      })
  );
};

// Lazy load non-critical components
const WhoIAmSection = createLazyComponent(() => import('./components/WhoIAmSection'), 'WhoIAmSection');
const OverwhelmingSection = createLazyComponent(() => import('./components/OverwhelmingSection'), 'OverwhelmingSection');
const CheckmarkSection = createLazyComponent(() => import('./components/CheckmarkSection'), 'CheckmarkSection');
const ReviewsCarousel = createLazyComponent(() => import('./components/ReviewsCarousel'), 'ReviewsCarousel');
const CTASection = createLazyComponent(() => import('./components/CTASection'), 'CTASection');

// Lazy load pages
const BlogPage = createLazyComponent(() => import('./pages/BlogPage'), 'BlogPage');
const BlogPost = createLazyComponent(() => import('./pages/BlogPost'), 'BlogPost');
const CallBooked = createLazyComponent(() => import('./pages/CallBooked'), 'CallBooked');
const BookCallPage = createLazyComponent(() => import('./pages/BookCallPage'), 'BookCallPage');
const PrivacyPolicy = createLazyComponent(() => import('./pages/PrivacyPolicy'), 'PrivacyPolicy');
const TermsOfService = createLazyComponent(() => import('./pages/TermsOfService'), 'TermsOfService');
const CurriculumGeneratorPage = createLazyComponent(() => import('./pages/CurriculumGeneratorPage'), 'CurriculumGeneratorPage');
const ViewCurriculumPage = createLazyComponent(() => import('./pages/ViewCurriculumPage'), 'ViewCurriculumPage');
const SEOContentGeneratorPage = createLazyComponent(() => import('./pages/SEOContentGeneratorPage'), 'SEOContentGeneratorPage');

// Optimized loading fallback component
const SectionFallback = React.memo(() => (
  <div className="py-8 sm:py-12 lg:py-16">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="h-64 sm:h-80 lg:h-96 bg-gray-800/20 animate-pulse rounded-2xl" />
    </div>
  </div>
));

SectionFallback.displayName = 'SectionFallback';

// Optimized page fallback
const PageFallback = React.memo(() => (
  <div className="min-h-screen bg-gradient-to-br from-brand-black via-gray-900 to-brand-black flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-brand-gray">Loading...</p>
    </div>
  </div>
));

PageFallback.displayName = 'PageFallback';

function HomePage() {
  return (
    <>
      <Hero />
      <LazySection>
        <Suspense fallback={<SectionFallback />}>
          <WhoIAmSection />
        </Suspense>
      </LazySection>
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
    try {
      const skeleton = document.getElementById('loading-skeleton');
      if (skeleton) {
        skeleton.style.display = 'none';
      }

      // Preload critical routes on user interaction
      const preloadRoutes = () => {
        try {
          import('./pages/BookCallPage').catch(() => {});
          import('./pages/CurriculumGeneratorPage').catch(() => {});
          import('./pages/SEOContentGeneratorPage').catch(() => {});
        } catch (error) {
          console.warn('Failed to preload routes:', error);
        }
      };

      // Preload on first user interaction
      const handleFirstInteraction = () => {
        preloadRoutes();
        document.removeEventListener('mouseenter', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      };

      document.addEventListener('mouseenter', handleFirstInteraction, { once: true });
      document.addEventListener('touchstart', handleFirstInteraction, { once: true });

      return () => {
        document.removeEventListener('mouseenter', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      };
    } catch (error) {
      console.error('Error in App useEffect:', error);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/call-booked" element={<CallBooked />} />
              <Route path="/book-call" element={<BookCallPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/generate-curriculum" element={<CurriculumGeneratorPage />} />
              <Route path="/curriculum/:token" element={<ViewCurriculumPage />} />
              <Route path="/seo-content-generator" element={<SEOContentGeneratorPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;