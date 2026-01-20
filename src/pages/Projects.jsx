import React, { useState, useMemo } from 'react';
import SEO from '../components/seo/SEO';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
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

  return (
    <>
      <SEO
        title="Projects - Ancel Ajanga | Fullstack Software Engineer/Developer & App Developer"
        description="View Ancel Ajanga (Duke)'s portfolio of 8+ software projects including finance trackers, e-learning platforms, mobile apps, and web applications built with React, Node.js, Python, and modern technologies."
  canonicalUrl="https://ancel.co.ke/projects"
      />

      <section className="section-padding pt-24">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h1 variants={itemVariants} className="text-[clamp(2rem,5vw,3rem)] font-bold mb-[clamp(1.5rem,3vw,2rem)]">
              My <span className="text-gradient">Projects</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-[clamp(1rem,2vw,1.125rem)] text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Here are some of the projects I've built, showcasing my skills in full-stack development, 
              mobile applications, and modern web technologies.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,3vw,2rem)]"
          >
            {projects.map((project, index) => (
              <motion.div key={project.id} variants={itemVariants}>
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
            <div className="card p-8 border-2 border-dashed border-gray-300 dark:border-gray-600">
              <h3 className="text-xl font-semibold mb-4 text-gray-600 dark:text-gray-400">
                More Projects Coming Soon
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
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
