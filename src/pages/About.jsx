import React from 'react';
import { Helmet } from 'react-helmet-async';
import About from '../components/About';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About - Ancel Ajanga | Fullstack Software Engineer</title>
        <meta name="description" content="Learn more about Ancel Ajanga, a fullstack software engineer from Kenya specializing in React, Node.js, Python, and mobile app development. View skills, experience, and career goals." />
      </Helmet>

      <div className="pt-16">
        <About />
      </div>
    </>
  );
};

export default AboutPage;
