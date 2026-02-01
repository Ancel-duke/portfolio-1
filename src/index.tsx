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

// Unregister service worker so updates are never blocked by stale cache.
// (Previously registered SW was serving old files on normal refresh.)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    });
  });
}

