import React, { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, FileText, Shield, TrendingUp, Rocket, Settings, Code, Lightbulb, CheckCircle, Database, Server, Zap } from 'lucide-react';
import caseStudiesData from '../data/case-studies.json';
import { OptimizedImage } from './ui/optimized-image';

const ProjectModal = ({ project, isOpen, onClose }) => {
  // Merge project data with case study data if available
  // Must call hooks before any early returns
  const enrichedProject = useMemo(() => {
    if (!project) return null;
    
    // Normalize titles for better matching
    const normalizeTitle = (title) => {
      return title.toLowerCase()
        .replace(/[-–—]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    };
    
    const projectTitleNormalized = normalizeTitle(project.title);
    
    // Try to find matching case study by title, slug, or key words
    const caseStudy = caseStudiesData.find(cs => {
      const csTitleNormalized = normalizeTitle(cs.title);
      const csSlug = cs.slug ? cs.slug.toLowerCase() : '';
      
      // Extract key words (first word before any dash or space)
      const projectKeyWord = projectTitleNormalized.split(' ')[0];
      const csKeyWord = csTitleNormalized.split(' ')[0];
      
      return (
        csTitleNormalized === projectTitleNormalized ||
        csTitleNormalized.includes(projectTitleNormalized) ||
        projectTitleNormalized.includes(csTitleNormalized) ||
        (csSlug && projectTitleNormalized.includes(csSlug)) ||
        (projectKeyWord && csKeyWord && projectKeyWord === csKeyWord && projectKeyWord.length > 3)
      );
    });
    
    if (caseStudy) {
      // Merge case study data with project data
      return {
        ...project,
        // Use case study data for detailed fields
        problem: caseStudy.problem,
        solution: caseStudy.solution,
        impact: caseStudy.impact,
        architecture: caseStudy.architecture,
        isolation: caseStudy.isolation,
        tradeoffs: caseStudy.tradeoffs,
        implementationStatus: caseStudy.implementationStatus,
        potentialExpansion: caseStudy.potentialExpansion,
        metrics: caseStudy.metrics,
        // Use case study technologies if available (they have category info)
        technologies: caseStudy.technologies || project.technologies,
        // Use case study image if available
        image: caseStudy.images?.hero || project.image,
        // Use case study links if available
        liveUrl: caseStudy.links?.live || project.liveUrl,
        repoUrl: caseStudy.links?.github || project.repoUrl,
        docsUrl: caseStudy.links?.docs || project.docsUrl,
        // Keep project description for short preview
        description: project.description,
        // Use detailed description from case study or project
        detailedDescription: caseStudy.description || project.detailedDescription || project.description,
      };
    }
    
    return project;
  }, [project]);

  // Group technologies by category - must be called before early return
  const techByCategory = useMemo(() => {
    if (!enrichedProject?.technologies || enrichedProject.technologies.length === 0) return {};
    
    const grouped = {};
    enrichedProject.technologies.forEach(tech => {
      const techName = typeof tech === 'string' ? tech : tech.name;
      const category = typeof tech === 'object' && tech.category ? tech.category : 'Other';
      
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(techName);
    });
    
    return grouped;
  }, [enrichedProject]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Early return after all hooks
  if (!enrichedProject) return null;

  const { 
    title, 
    description, 
    detailedDescription,
    technologies, 
    liveUrl, 
    repoUrl, 
    docsUrl,
    sourceNote,
    repositoryLabel,
    image, 
    outcomes,
    problem,
    solution,
    impact,
    architecture,
    isolation,
    tradeoffs,
    implementationStatus,
    potentialExpansion,
    metrics,
    type
  } = enrichedProject;

  const isFullStack = type === 'fullstack' || problem || architecture;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white dark:bg-gray-900 rounded-lg sm:rounded-2xl shadow-2xl w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] max-w-5xl max-h-[90vh] sm:max-h-[90vh] overflow-y-auto mx-auto my-4 sm:my-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: H3 for AI-Overview / SGE semantic clarity */}
              <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-10 flex items-center justify-between p-4 sm:p-6">
              <div className="pr-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 pr-4 line-clamp-2">
                  {title}
                </h3>
                {repositoryLabel && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {repositoryLabel}
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center flex-shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
              {/* Summary (small image + text) */}
              <div className="grid grid-cols-1 md:grid-cols-[260px,1fr] gap-4 sm:gap-6 items-start">
                {image && (
                  <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 w-full h-40 sm:h-48 md:h-40">
                    <OptimizedImage
                      src={image}
                      alt={title}
                      width={520}
                      height={293}
                      loading="lazy"
                      skipNetlifyCDN
                      sizes="(max-width: 768px) 100vw, 260px"
                      className="w-full h-full"
                      imgClassName="object-contain"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                    <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                    {liveUrl && (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary flex items-center justify-center space-x-2 min-h-[48px] text-sm sm:text-base"
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Visit Live Site</span>
                      </a>
                    )}
                    
                    {(sourceNote || repoUrl || docsUrl) && (
                      <div className="flex flex-col gap-2 w-full sm:w-auto">
                        {sourceNote ? (
                          <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 rounded-lg p-3 bg-muted/20">
                            {sourceNote}
                          </div>
                        ) : (
                          repoUrl && (
                            <a
                              href={repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-secondary flex items-center justify-center space-x-2 min-h-[48px] text-sm sm:text-base"
                            >
                              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span>View Code</span>
                            </a>
                          )
                        )}

                        {docsUrl && (
                          <a
                            href={docsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary flex items-center justify-center space-x-2 min-h-[48px] text-sm sm:text-base"
                          >
                            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>View Docs (ARCHITECTURE.md)</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Full-Stack Project Sections */}
              {isFullStack && (
                <>
                  {/* Problem Statement */}
                  {problem && (
                    <section className="space-y-3">
                      <div className="flex items-center space-x-2 mb-3">
                        <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                          Problem Statement
                        </h3>
                      </div>
                      <div className="bg-muted/50 dark:bg-gray-800/50 rounded-lg p-4 sm:p-6">
                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                          {problem}
                        </p>
                      </div>
                    </section>
                  )}

                  {/* Solution */}
                  {solution && (
                    <section className="space-y-3">
                      <div className="flex items-center space-x-2 mb-3">
                        <Code className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                          Solution
                        </h3>
                      </div>
                      <div className="bg-muted/50 dark:bg-gray-800/50 rounded-lg p-4 sm:p-6">
                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                          {solution}
                        </p>
                      </div>
                    </section>
                  )}

                  {/* Isolation & Resilience */}
                  {isolation && (
                    <section className="space-y-3">
                      <div className="flex items-center space-x-2 mb-3">
                        <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                          Isolation & Resilience Strategies
                        </h3>
                      </div>
                      <div className="bg-muted/50 dark:bg-gray-800/50 rounded-lg p-4 sm:p-6">
                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                          {isolation}
                        </p>
                      </div>
                    </section>
                  )}

                  {/* Why This Approach */}
                  {tradeoffs && (
                    <section className="space-y-3">
                      <div className="flex items-center space-x-2 mb-3">
                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                          Why This Approach
                        </h3>
                      </div>
                      <div className="bg-muted/50 dark:bg-gray-800/50 rounded-lg p-4 sm:p-6">
                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                          {tradeoffs}
                        </p>
                      </div>
                    </section>
                  )}

                  {/* Implementation Status */}
                  {implementationStatus && (
                    <section className="space-y-3">
                      <div className="flex items-center space-x-2 mb-3">
                        <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                          Implementation Status
                        </h3>
                      </div>
                      <div className="bg-muted/50 dark:bg-gray-800/50 rounded-lg p-4 sm:p-6">
                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                          {implementationStatus}
                        </p>
                      </div>
                    </section>
                  )}

                  {/* Potential Expansion */}
                  {potentialExpansion && (
                    <section className="space-y-3">
                      <div className="flex items-center space-x-2 mb-3">
                        <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                          Potential Expansion
                        </h3>
                      </div>
                      <div className="bg-muted/50 dark:bg-gray-800/50 rounded-lg p-4 sm:p-6">
                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                          {potentialExpansion}
                        </p>
                      </div>
                    </section>
                  )}

                  {/* Key Metrics / Impact */}
                  {(impact || metrics) && (
                    <section className="space-y-3">
                      <div className="flex items-center space-x-2 mb-3">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                          Key Metrics & Impact
                        </h3>
                      </div>
                      <div className="bg-muted/50 dark:bg-gray-800/50 rounded-lg p-4 sm:p-6">
                        {impact && (
                          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            {impact}
                          </p>
                        )}
                        {metrics && metrics.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                            {metrics.map((metric, index) => (
                              <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                                  {metric.value}
                                </div>
                                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                  {metric.label}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                  {metric.description}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </section>
                  )}
                </>
              )}

              {/* Technology Stack */}
              <section className="space-y-3">
                <div className="flex items-center space-x-2 mb-3">
                  <Database className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Technology Stack
                  </h3>
                </div>
                <div className="bg-muted/50 dark:bg-gray-800/50 rounded-lg p-4 sm:p-6">
                  {Object.keys(techByCategory).length > 0 ? (
                    <div className="space-y-4">
                      {Object.entries(techByCategory).map(([category, techs]) => (
                        <div key={category}>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                            {category === 'Frontend' && <Code className="w-4 h-4 mr-2" />}
                            {category === 'Backend' && <Server className="w-4 h-4 mr-2" />}
                            {category === 'Database' && <Database className="w-4 h-4 mr-2" />}
                            {category === 'Real-time' && <Zap className="w-4 h-4 mr-2" />}
                            {category}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {techs.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary-700 dark:text-primary-300 rounded-full text-xs sm:text-sm font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {technologies && technologies.map((tech, index) => {
                        const techName = typeof tech === 'string' ? tech : tech.name;
                        return (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary-700 dark:text-primary-300 rounded-full text-xs sm:text-sm font-medium"
                          >
                            {techName}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </section>

              {/* Detailed Description (for non-fullstack or fallback) */}
              {!isFullStack && detailedDescription && (
                <section className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Project Overview
                  </h3>
                  <div className="bg-muted/50 dark:bg-gray-800/50 rounded-lg p-4 sm:p-6">
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {detailedDescription}
                    </p>
                  </div>
                </section>
              )}

              {/* Key Outcomes */}
              {outcomes && (
                <section className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Key Outcomes
                  </h3>
                  <div className="bg-muted/50 dark:bg-gray-800/50 rounded-lg p-4 sm:p-6">
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      {outcomes}
                    </p>
                  </div>
                </section>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
