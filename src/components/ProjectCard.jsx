import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';

const ProjectCard = ({ project, onOpenModal }) => {
  const { title, description, technologies, liveUrl, repoUrl, image } = project;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card p-4 sm:p-6 h-full flex flex-col"
    >
      {/* Project Image */}
      <div className="relative mb-6 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 aspect-video">
        {image ? (
          <img
            src={image}
            alt={`${title} - Software application by Ancel Ajanga`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            width="800"
            height="450"
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
          {title}
        </h3>
        
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 flex-1 leading-relaxed">
          {description}
        </p>

        {/* Technologies */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="px-2 sm:px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 4 && (
              <span className="px-2 sm:px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
                +{technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-auto">
          <button
            onClick={() => onOpenModal(project)}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm sm:text-base flex items-center space-x-1 transition-colors duration-200 min-h-[44px] px-2"
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
