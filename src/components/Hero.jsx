import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload, FiCode, FiSmartphone, FiMonitor } from 'react-icons/fi';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Hi, I'm{' '}
                <span className="text-gradient">Ancel Ajanga</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl text-gray-600 dark:text-gray-300 font-medium">
                Fullstack Software Engineer
              </h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl"
            >
              I craft complete software applications — mobile, web, and desktop — using diverse tech stacks to deliver impactful, high-performance solutions with attention to UX and scalability.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/projects"
                className="btn-primary flex items-center justify-center space-x-2 group"
              >
                <span>View Projects</span>
                <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <a
                href="/assets/resume.pdf"
                download
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <FiDownload className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <FiCode className="w-4 h-4" />
                <span>Web Development</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiSmartphone className="w-4 h-4" />
                <span>Mobile Apps</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiMonitor className="w-4 h-4" />
                <span>Desktop Apps</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div className="relative">
              {/* Code-like visual element */}
              <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-400">const</span>
                    <span className="text-green-400">developer</span>
                    <span className="text-white">=</span>
                    <span className="text-yellow-400">'Ancel Ajanga'</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-400">const</span>
                    <span className="text-green-400">skills</span>
                    <span className="text-white">= [</span>
                  </div>
                  <div className="ml-4 space-y-1">
                    <span className="text-yellow-400">'React'</span>
                    <span className="text-white">,</span>
                    <span className="text-yellow-400">'Node.js'</span>
                    <span className="text-white">,</span>
                    <span className="text-yellow-400">'Python'</span>
                    <span className="text-white">,</span>
                    <span className="text-yellow-400">'Mobile Dev'</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white">]</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-400">const</span>
                    <span className="text-green-400">passion</span>
                    <span className="text-white">=</span>
                    <span className="text-yellow-400">'Building amazing apps'</span>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-primary-500 rounded-full opacity-20"
              ></motion.div>
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent-500 rounded-full opacity-20"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
