import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Error boundary for better error handling
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('Error caught by boundary:', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-brand-black flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-brand-white mb-4">Something went wrong</h1>
            <p className="text-brand-gray mb-6">Please try refreshing the page</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-brand-purple text-white px-6 py-3 rounded-lg hover:bg-brand-purple-dark transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

try {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  // Fallback rendering
  rootElement.innerHTML = `
    <div class="min-h-screen bg-brand-black flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-white mb-4">Failed to load application</h1>
        <button onclick="window.location.reload()" class="bg-purple-600 text-white px-6 py-3 rounded-lg">
          Reload Page
        </button>
      </div>
    </div>
  `;
}