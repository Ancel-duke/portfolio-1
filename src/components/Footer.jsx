import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Ancel-duke',
      icon: <FiGithub className="w-5 h-5" />
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ajanga-ancel-42bbb7213',
      icon: <FiLinkedin className="w-5 h-5" />
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/lema.yian._/#',
      icon: <FiInstagram className="w-5 h-5" />
    }
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container-custom">
        <div className="py-8 sm:py-12">
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {/* Brand */}
            <div className="space-y-3 sm:space-y-4">
              <Link to="/" className="flex items-center space-x-2 text-lg sm:text-xl font-bold text-gradient">
                <span>Ancel Ajanga</span>
              </Link>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-md">
                Fullstack software engineer crafting complete applications with diverse tech stacks.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                                  <li>
                    <Link to="/" className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/projects" className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                      Contact
                    </Link>
                  </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 text-sm sm:text-base">Connect</h3>
              <div className="flex space-x-3 sm:space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(social.url, '_blank', 'noopener,noreferrer');
                    }}
                    className="p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-colors duration-200"
                    aria-label={`Visit ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 flex justify-center">
            <div className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              <span>© {currentYear} Ancel Ajanga. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
