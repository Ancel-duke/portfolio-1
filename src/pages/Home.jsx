import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from './Projects';
import Contact from './Contact';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Ancel Ajanga - Fullstack Software Engineer Portfolio</title>
        <meta name="description" content="Ancel Ajanga is a fullstack software engineer specializing in React, Node.js, Python, and modern web technologies. View portfolio of 8+ applications including finance trackers, e-learning platforms, and mobile apps. Based in Kenya." />
        
        {/* Open Graph */}
        <meta property="og:title" content="Ancel Ajanga - Fullstack Software Engineer" />
        <meta property="og:description" content="I craft complete software applications — mobile, web, and desktop — using diverse tech stacks to deliver impactful, high-performance solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ancel-ajanga-portfolio.netlify.app/" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ancel Ajanga - Fullstack Software Engineer" />
        <meta name="twitter:description" content="I craft complete software applications — mobile, web, and desktop — using diverse tech stacks to deliver impactful, high-performance solutions." />
        
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Ancel Ajanga",
            "jobTitle": "Fullstack Software Engineer",
            "description": "I craft complete software applications — mobile, web, and desktop — using diverse tech stacks to deliver impactful, high-performance solutions.",
            "url": "https://ancel-ajanga-portfolio.netlify.app/",
            "sameAs": [
              "https://github.com/Ancel-duke",
              "https://www.instagram.com/lema.yian._/#"
            ],
            "email": "ancel.ajanga@yahoo.com",
            "telephone": "+254768901257",
            "knowsAbout": [
              "React", "React Native", "Node.js", "Python", "JavaScript", 
              "MongoDB", "Express", "Laravel", "Machine Learning"
            ]
          })}
        </script>
      </Helmet>
      
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
