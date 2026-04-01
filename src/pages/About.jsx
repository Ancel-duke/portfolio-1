import React from 'react';
import SEO from '@/domains/seo';
import About from '../components/About';

const AboutPage = () => {
  return (
    <>
      <SEO
        title="About - Ancel Ajanga | Fullstack Engineer & Software Engineer — Resilience & Scale"
        description="Ancel Ajanga: Fullstack Developer and Software Engineer. Full request lifecycle from Flutter UI to M-Pesa and database. System resilience, hardened backends, fluid frontends. Kenya."
        canonicalUrl="https://ancel.co.ke/about"
      />

      <div className="pt-16">
        <About />
      </div>
    </>
  );
};

export default AboutPage;
