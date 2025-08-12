import React from 'react';
import { Helmet } from 'react-helmet-async';
import About from '../components/About';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>Ancel Ajanga</title>
        <meta name="description" content="Learn more about Ancel Ajanga - a self-driven, innovative software engineer with expertise in full-stack development and modern technologies." />
      </Helmet>

      <div className="pt-16">
        <About />
      </div>
    </>
  );
};

export default AboutPage;
