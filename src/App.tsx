import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { LazySection } from './components/LazySection';

// Lazy load non-critical components with better error handling
const WhoIAmSection = lazy(() => 
  import('./components/WhoIAmSection').then(module => ({ default: module.WhoIAmSection })).catch(() => ({ default: () => <div>Error loading section</div> }))
);
const OverwhelmingSection = lazy(() => 
  import('./components/OverwhelmingSection').then(module => ({ default: module.OverwhelmingSection })).catch(() => ({ default: () => <div>Error loading section</div> }))
);
const CheckmarkSection = lazy(() => 
  import('./components/CheckmarkSection').then(module => ({ default: module.CheckmarkSection })).catch(() => ({ default: () => <div>Error loading section</div> }))
);
const ReviewsCarousel = lazy(() => 
  import('./components/ReviewsCarousel').then(module => ({ default: module.ReviewsCarousel })).catch(() => ({ default: () => <div>Error loading section</div> }))
);
const CTASection = lazy(() => 
  import('./components/CTASection').then(module => ({ default: module.CTASection })).catch(() => ({ default: () => <div>Error loading section</div> }))
);

// Lazy load pages with error handling
const BlogPage = lazy(() => 
  import('./pages/BlogPage').then(module => ({ default: module.BlogPage })).catch(() => ({ default: () => <div>Error loading page</div> }))
);
const BlogPost = lazy(() => 
  import('./pages/BlogPost').then(module => ({ default: module.BlogPost })).catch(() => ({ default: () => <div>Error loading page</div> }))
);
const CallBooked = lazy(() => 
  import('./pages/CallBooked').then(module => ({ default: module.CallBooked })).catch(() => ({ default: () => <div>Error loading page</div> }))
);
const BookCallPage = lazy(() => 
  import('./pages/BookCallPage').then(module => ({ default: module.BookCallPage })).catch(() => ({ default: () => <div>Error loading page</div> }))
);
const PrivacyPolicy = lazy(() => 
  import('./pages/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy })).catch(() => ({ default: () => <div>Error loading page</div> }))
);
const TermsOfService = lazy(() => 
  import('./pages/TermsOfService').then(module => ({ default: module.TermsOfService })).catch(() => ({ default: () => <div>Error loading page</div> }))
);
const CurriculumGeneratorPage = lazy(() => 
  import('./pages/CurriculumGeneratorPage').then(module => ({ default: module.CurriculumGeneratorPage })).catch(() => ({ default: () => <div>Error loading page</div> }))
);
const ViewCurriculumPage = lazy(() => 
  import('./pages/ViewCurriculumPage').then(module => ({ default: module.ViewCurriculumPage })).catch(() => ({ default: () => <div>Error loading page</div> }))
);
const SEOContentGeneratorPage = lazy(() => 
  import('./pages/SEOContentGeneratorPage').then(module => ({ default: module.SEOContentGeneratorPage })).catch(() => ({ default: () => <div>Error loading page</div> }))
);

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
    <div className="loading-spinner"></div>
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
    const skeleton = document.getElementById('loading-skeleton');
    if (skeleton) {
      skeleton.style.display = 'none';
    }

    // Preload critical routes on user interaction
    const preloadRoutes = () => {
      import('./pages/BookCallPage').catch(() => {});
      import('./pages/CurriculumGeneratorPage').catch(() => {});
      import('./pages/SEOContentGeneratorPage').catch(() => {});
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