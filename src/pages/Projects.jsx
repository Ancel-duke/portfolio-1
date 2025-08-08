import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: 'Pizza Ordering Management System',
      description: 'A comprehensive system designed to streamline food ordering between sellers and customers.',
      detailedDescription: 'Features seamless order placement, tracking, payment processing, and delivery management. I implemented the frontend, backend endpoints, and order lifecycle management.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
      liveUrl: 'https://magical-blancmange-0e77c8.netlify.app/',
      repoUrl: 'https://github.com/Ancel-duke',
      image: '/assets/projects/pizza-1.jpg',
      outcomes: 'Improved order processing accuracy and reduced average order handling time (metrics editable).'
    },
    {
      id: 2,
      title: 'E-Commerce Website',
      description: 'A full-featured online shopping platform with product catalog, shopping cart, and secure checkout.',
      detailedDescription: 'Built the frontend store experience, payment integration, and backend inventory handling.',
      technologies: ['React', 'Node.js', 'Firebase', 'Tailwind CSS'],
      liveUrl: 'https://roaring-crepe-f217ec.netlify.app/',
      repoUrl: 'https://github.com/Ancel-duke',
      image: '/assets/projects/ecommerce-1.jpg',
      outcomes: 'Responsive design, secure checkout workflow, and inventory management (metrics editable).'
    }
  ];

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
      <Helmet>
        <title>Projects - Ancel Ajanga</title>
        <meta name="description" content="View my latest projects showcasing full-stack development skills with React, Node.js, and modern web technologies." />
      </Helmet>

      <section className="section-padding pt-24">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl font-bold mb-6">
              My <span className="text-gradient">Projects</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard
                  project={project}
                  onOpenModal={handleOpenModal}
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
