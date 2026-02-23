import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Download } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <LazyMotion features={domAnimation}>
      <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-lg sm:text-xl font-bold text-gradient"
            onClick={closeMobileMenu}
          >
            <span className="hidden sm:block">Ancel Ajanga</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium transition-colors duration-200 hover:text-primary-500 ${
                  location.pathname === item.path
                    ? 'text-primary-500'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            
            <a
              href="/assets/Resume%20(1).pdf"
              download
              className="btn-primary flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block py-2 font-medium transition-colors duration-200 hover:text-primary-500 ${
                      location.pathname === item.path
                        ? 'text-primary-500'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                  >
                    {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  </button>
                  
                  <a
                    href="/assets/Resume%20(1).pdf"
                    download
                    className="btn-primary flex items-center space-x-2"
                    onClick={closeMobileMenu}
                  >
                    <Download className="w-4 h-4" />
                    <span>Resume</span>
                  </a>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
      </header>
    </LazyMotion>
  );
};

export default Header;
