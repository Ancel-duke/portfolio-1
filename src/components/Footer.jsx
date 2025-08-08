import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiInstagram, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Ancel-duke',
      icon: <FiGithub className="w-5 h-5" />
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
        <div className="py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gradient">
                <span className="text-2xl">AA</span>
                <span>Ancel Ajanga</span>
              </Link>
              <p className="text-gray-600 dark:text-gray-300 max-w-md">
                Fullstack software engineer crafting complete applications with diverse tech stacks.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Connect</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-colors duration-200"
                    aria-label={`Visit ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <span>© {currentYear} Ancel Ajanga. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <span>Built with</span>
              <FiHeart className="w-4 h-4 text-red-500" />
              <span>using React & Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
