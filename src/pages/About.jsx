import React from 'react';
import SEO from '../components/seo/SEO';
import About from '../components/About';

const AboutPage = () => {
  return (
    <>
      <SEO
        title="About - Ancel Ajanga | Fullstack Software Engineer"
        description="Learn more about Ancel Ajanga, a fullstack software engineer from Kenya specializing in React, Node.js, Python, and mobile app development. View skills, experience, and career goals."
  canonicalUrl="https://ancel.co.ke/about"
      />

      <div className="pt-16">
        <About />
      </div>
    </>
  );
};

export default AboutPage;
