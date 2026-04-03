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

  const tieredProjects = useMemo(() => {
    return {
      flagship: projects.filter(p => p.tier === 1),
      core: projects.filter(p => p.tier === 2),
      supporting: projects.filter(p => p.tier === 3)
    };
  }, [projects]);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const renderProjectGrid = (projectList, sectionAriaLabel) => (
    <m.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-20"
      itemScope
      itemType="https://schema.org/ItemList"
      aria-label={sectionAriaLabel}
    >
      {projectList.map((project, index) => (
        <m.div key={project.id} variants={itemVariants} className="min-w-0 flex">
          <ProjectCard
            project={project}
            onOpenModal={handleOpenModal}
            priority={project.tier === 1 && index === 0}
            caseStudySlug={getCaseStudySlugForProject(caseStudiesData || [], project)}
          />
        </m.div>
      ))}
    </m.div>
  );

  return (
    <section className="section-padding pt-24 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <LazyMotion features={domAnimation}>
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <m.h1 variants={itemVariants} className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tight mb-4">
              Project <span className="text-gradient">Ecosystem</span>
            </m.h1>
            <m.p
              variants={itemVariants}
              className="text-sm md:text-base text-slate-400 max-w-3xl mx-auto"
            >
              Enterprise-grade systems engineered for scalability, resilience, and security. 
              From high-security coordination platforms to autonomous infrastructure guardrails.
            </m.p>
          </m.div>

          {/* Section 1: Flagship Case Studies */}
          <m.div variants={itemVariants} className="mb-8 pl-1 border-l-4 border-blue-500/50">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100">
              Flagship Case Studies
            </h2>
            <p className="text-sm md:text-base text-slate-400 mt-1">
              Production-grade systems featuring 2,000+ word technical deep-dives into architecture and failure handling.
            </p>
          </m.div>
          {renderProjectGrid(tieredProjects.flagship, "Flagship projects by Ancel Ajanga")}

          {/* Section 2: Core Engineering Projects */}
          <m.div variants={itemVariants} className="mb-8 pl-1 border-l-4 border-slate-700">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100">
              Core Engineering Projects
            </h2>
            <p className="text-sm md:text-base text-slate-400 mt-1">
              Robust systems and applications demonstrating domain expertise in finance, AIOps, and distributed systems.
            </p>
          </m.div>
          {renderProjectGrid(tieredProjects.core, "Core engineering projects by Ancel Ajanga")}

          {/* Section 3: Supporting Labs & Utilities */}
          <m.div variants={itemVariants} className="mb-8 pl-1 border-l-4 border-slate-800">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100">
              Supporting Labs & Experimental PoCs
            </h2>
            <p className="text-sm md:text-base text-slate-400 mt-1">
              Refined labs and technical experiments exploring new patterns in UI engineering and frontend optimization.
            </p>
          </m.div>
          {renderProjectGrid(tieredProjects.supporting, "Supporting labs and projects by Ancel Ajanga")}

          <m.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="p-6 md:p-8 rounded-xl border border-dashed border-slate-700 bg-slate-900/30">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2 text-slate-300">
                Continuous R&D in Progress
              </h3>
              <p className="text-sm md:text-base text-slate-400">
                I'm currently architecting new systems in the areas of decentralized identity and high-performance financial ledgers.
                Check back soon for more architecture deep-dives.
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
