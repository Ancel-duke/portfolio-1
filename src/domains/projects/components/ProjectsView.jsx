import React, { useState, useMemo } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import caseStudiesData from '@/data/case-studies.json';
import { getCaseStudySlugForProject } from '@/shared/utils/metadata';
import { useAnimationsEnabled } from '@/contexts/AnimationsContext';
import { getSectionVariants } from '@/shared/utils/animation-variants';
import { getSortedProjects } from '../services/projects-data';

export default function ProjectsView() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const animationsEnabled = useAnimationsEnabled();
  const { containerVariants, itemVariants } = getSectionVariants(animationsEnabled);

  const projects = useMemo(() => getSortedProjects(), []);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section className="section-padding pt-24 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <LazyMotion features={domAnimation}>
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <m.h1 variants={itemVariants} className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight mb-4">
              My <span className="text-gradient">Projects</span>
            </m.h1>
            <m.p
              variants={itemVariants}
              className="text-sm md:text-base text-slate-400 max-w-3xl mx-auto"
            >
              Enterprise-grade systems showcasing resilient architecture, hybrid databases, and scalable solutions.
              Click on any project to explore detailed architecture, design decisions, and real-world impact.
            </m.p>
          </m.div>

          <m.div
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
              <m.div key={project.id} variants={itemVariants} className="min-w-0 flex">
                <ProjectCard
                  project={project}
                  onOpenModal={handleOpenModal}
                  priority={index === 0}
                  caseStudySlug={getCaseStudySlugForProject(caseStudiesData || [], project)}
                />
              </m.div>
            ))}
          </m.div>

          <m.div
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
          </m.div>
        </LazyMotion>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
