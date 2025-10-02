import React from 'react';
import SEO from '../components/seo/SEO';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from './Projects';
import Contact from './Contact';

const Home = () => {
  return (
    <>
      <SEO
        title="Ancel Ajanga - Fullstack Software Engineer Portfolio"
        description="Ancel Ajanga is a fullstack software engineer specializing in React, Node.js, Python, and modern web technologies. View portfolio of 8+ applications including finance trackers, e-learning platforms, and mobile apps. Based in Kenya."
  canonicalUrl="https://ancel.co.ke/"
      />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
};

export default Home;
