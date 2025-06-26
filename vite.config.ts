import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core vendor chunk
          vendor: ['react', 'react-dom'],
          // Router chunk
          router: ['react-router-dom'],
          // Icons chunk
          icons: ['lucide-react'],
          // Supabase chunk
          supabase: ['@supabase/supabase-js'],
          // PDF generation chunk
          pdf: ['jspdf']
        }
      }
    },
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console for debugging
        drop_debugger: true,
        pure_funcs: ['console.debug']
      },
      mangle: {
        safari10: true
      }
    },
    // Enable gzip compression
    reportCompressedSize: true,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Ensure proper source maps for debugging
    sourcemap: false, // Disable in production for smaller files
    // Better error handling for chunk loading
    target: 'es2015'
  },
  // Enable compression and caching
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  },
  // Add base path configuration
  base: '/',
  // Ensure proper asset handling
  assetsInclude: ['**/*.woff2', '**/*.woff', '**/*.ttf'],
  // Define environment variables for better error handling
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development')
  }
});