import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { OptimizedImage } from './ui/optimized-image';

const ProjectCard = ({ project, onOpenModal, priority = false }) => {
  const { title, displayTitle, description, technologies, liveUrl, repoUrl, image, problemSummary } = project;
  const techStack = technologies?.length
    ? technologies.slice(0, 5).map((t) => (typeof t === 'string' ? t : t.name)).join(', ')
    : 'Fullstack';
  const projectName = displayTitle ? displayTitle.split(':')[0].trim() : title.split(' -')[0].trim();
  const problem = problemSummary ? problemSummary.replace(/^([a-z])/, (_, c) => c.toUpperCase()) : 'real-world problems';
  const dataAiContext = `${projectName} is a ${techStack} solution by Ancel Ajanga solving ${problem}.`;
  const techStackSummary = technologies?.length
    ? `Built with ${techStack}${technologies.length > 5 ? ' and more' : ''}.`
    : 'Software project by Ancel Ajanga.';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card p-4 sm:p-6 h-full flex flex-col"
      aria-description={techStackSummary}
      data-ai-context={dataAiContext}
    >
      {/* Project Image — Netlify CDN + skeleton when deployed */}
      <div className="relative mb-6 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 aspect-video">
        {image ? (
          <OptimizedImage
            src={image}
            alt={`${title} - Software application by Ancel Ajanga`}
            className="w-full h-full object-cover"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            width={800}
            height={450}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Eye className="w-12 h-12" />
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-gray-100">
          {displayTitle || title}
        </h3>
        
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 flex-1 leading-relaxed">
          {description}
        </p>

        {/* Technologies */}
        {technologies && technologies.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {technologies.slice(0, 4).map((tech, index) => {
                const techName = typeof tech === 'string' ? tech : tech.name;
                return (
                  <span
                    key={index}
                    className="px-2 sm:px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                  >
                    {techName}
                  </span>
                );
              })}
              {technologies.length > 4 && (
                <span className="px-2 sm:px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
                  +{technologies.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-auto">
          <button
            type="button"
            onClick={() => onOpenModal(project)}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm sm:text-base flex items-center space-x-1 transition-colors duration-200 min-h-[44px] px-2"
            title={`Read technical case study for ${title} by Ancel Ajanga`}
          >
            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>View Details</span>
          </button>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={`Visit ${title} live site`}
              >
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            )}
            
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={`View ${title} repository`}
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(ProjectCard);
