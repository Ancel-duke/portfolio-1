import React, { useState, useMemo } from 'react';
import SEO from '../components/seo/SEO';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import StructuredData from '../components/seo/StructuredData';
import { generateProjectSchema, generatePortfolioSchema } from '../components/seo/schemas';
import projectsData from '../data/projects.json';
import { getMasterSortedProjects } from '../utils/projectSorter';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use useMemo to prevent flicker on reload - sorted projects remain stable
  // Master sort: fullstack before frontend, most recent first within each type
  const projects = useMemo(() => {
    return getMasterSortedProjects(projectsData);
  }, []);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const projectSchemas = useMemo(() => projects.map((p) => generateProjectSchema(p)), [projects]);
  const itemListSchema = useMemo(() => generatePortfolioSchema(projects), [projects]);

  return (
    <>
      <SEO
        title="Projects - Ancel Ajanga | Fullstack Engineer — System Resilience"
        description="15 software projects by Fullstack Engineer Ancel Ajanga: resilient systems, fintech, e-learning, real-time collaboration, and self-healing infrastructure. System resilience from UI to database."
        canonicalUrl="https://ancel.co.ke/projects"
      />
      <StructuredData data={[itemListSchema, ...projectSchemas]} />

      <section className="section-padding pt-24 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h1 variants={itemVariants} className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight mb-4">
              My <span className="text-gradient">Projects</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base text-slate-400 max-w-3xl mx-auto"
            >
              Enterprise-grade systems showcasing resilient architecture, hybrid databases, and scalable solutions. 
              Click on any project to explore detailed architecture, design decisions, and real-world impact.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
            itemScope
            itemType="https://schema.org/ItemList"
            aria-label="Portfolio of 15 projects by Fullstack Engineer Ancel Ajanga"
          >
            {projects.map((project, index) => (
              <motion.div key={project.id} variants={itemVariants} className="min-w-0 flex">
                <ProjectCard
                  project={project}
                  onOpenModal={handleOpenModal}
                  priority={index < 3}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Placeholder for future projects */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="p-6 md:p-8 rounded-xl border border-dashed border-slate-700 bg-slate-900/30">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2 text-slate-300">
                More Projects Coming Soon
              </h3>
              <p className="text-sm md:text-base text-slate-400">
                I'm constantly working on new projects. Check back soon for more updates!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Projects;
