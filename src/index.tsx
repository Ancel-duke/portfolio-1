import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Optimize font loading - add class when fonts are loaded
if ('fonts' in document) {
  (document.fonts as FontFaceSet).ready.then(() => {
    document.documentElement.classList.add('font-loaded');
  });
} else {
  // Fallback for browsers without Font Loading API
  setTimeout(() => {
    document.documentElement.classList.add('font-loaded');
  }, 100);
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for caching (if available)
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

