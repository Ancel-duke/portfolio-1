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
        title="Ancel Ajanga - Fullstack Engineer | System Resilience & Scale"
        description="Ancel Ajanga is a Fullstack Engineer and Software Engineer specializing in system resilience: hardened backends, fluid frontends, and self-healing infrastructure. Scale and resilience from UI to database. Based in Kenya."
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
