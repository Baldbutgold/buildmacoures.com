import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Error boundary for better error handling
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('Error caught by boundary:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#0a0a0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Something went wrong
            </h1>
            <p style={{ color: '#d1d5db', marginBottom: '1.5rem' }}>
              Please try refreshing the page
            </p>
            <button 
              onClick={() => window.location.reload()} 
              style={{
                backgroundColor: '#a855f7',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#9333ea'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#a855f7'}
            >
              Reload Page
            </button>
            {this.state.error && (
              <details style={{ marginTop: '1rem', textAlign: 'left' }}>
                <summary style={{ cursor: 'pointer', color: '#a855f7' }}>
                  Error Details
                </summary>
                <pre style={{ 
                  fontSize: '0.75rem', 
                  color: '#d1d5db', 
                  marginTop: '0.5rem',
                  padding: '1rem',
                  backgroundColor: '#1f2937',
                  borderRadius: '0.25rem',
                  overflow: 'auto'
                }}>
                  {this.state.error.message}
                  {this.state.error.stack && '\n\n' + this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Initialize app with better error handling
function initializeApp() {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('Root element not found');
    document.body.innerHTML = `
      <div style="min-height: 100vh; background: #0a0a0a; display: flex; align-items: center; justify-content: center; color: white; font-family: system-ui;">
        <div style="text-align: center;">
          <h1 style="font-size: 1.5rem; margin-bottom: 1rem;">Root element not found</h1>
          <button onclick="window.location.reload()" style="background: #a855f7; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; border: none; cursor: pointer;">
            Reload Page
          </button>
        </div>
      </div>
    `;
    return;
  }

  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    );
  } catch (error) {
    console.error('Failed to render app:', error);
    
    // Fallback rendering with inline styles
    rootElement.innerHTML = `
      <div style="min-height: 100vh; background: #0a0a0a; display: flex; align-items: center; justify-content: center; color: white; font-family: system-ui;">
        <div style="text-align: center; padding: 2rem;">
          <h1 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Failed to load application</h1>
          <p style="color: #d1d5db; margin-bottom: 1.5rem;">There was an error loading the app. Please try refreshing.</p>
          <button onclick="window.location.reload()" style="background: #a855f7; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; border: none; cursor: pointer; font-size: 1rem;">
            Reload Page
          </button>
          <div style="margin-top: 1rem; font-size: 0.875rem; color: #9ca3af;">
            Error: ${error instanceof Error ? error.message : 'Unknown error'}
          </div>
        </div>
      </div>
    `;
  }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}