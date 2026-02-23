import React from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { OptimizedImage } from './ui/optimized-image';
import { useAnimationsEnabled } from '../contexts/AnimationsContext';
import { getHoverScaleCard, getHoverTransition } from '../lib/animation-variants';

const ProjectCard = ({ project, onOpenModal, priority = false, caseStudySlug = null }) => {
  const animationsEnabled = useAnimationsEnabled();
  const hoverScale = getHoverScaleCard(animationsEnabled);
  const hoverTransition = getHoverTransition(animationsEnabled);

  const { title, displayTitle, description, technologies, liveUrl, repoUrl, image, problemSummary, sourceNote, repositoryLabel } = project;
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
    <LazyMotion features={domAnimation}>
      <m.div
      whileHover={hoverScale ?? undefined}
      transition={hoverTransition}
      className="flex flex-col h-full min-w-0 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-blue-500/50 transition-all duration-300 p-4 md:p-6"
      aria-description={techStackSummary}
      data-ai-context={dataAiContext}
    >
      {/* One image per card: fixed aspect, clipped, no overflow — parent controls size */}
      <div className="flex-shrink-0 w-full aspect-video overflow-hidden rounded-xl border border-slate-800 mb-4 md:mb-5">
        {image ? (
          <OptimizedImage
            src={image}
            alt={`${title} - Software application by Ancel Ajanga`}
            className="w-full h-full object-cover"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            width={800}
            height={450}
            skipNetlifyCDN
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800/50 text-slate-500 min-h-[200px]">
            <Eye className="w-12 h-12" />
          </div>
        )}
      </div>

      {/* Content — flex-1 so footer stays pinned, no overlap */}
      <div className="flex-1 flex flex-col min-h-0">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-1 text-slate-100">
          {displayTitle || title}
        </h3>
        {repositoryLabel && (
          <div className="text-xs text-slate-400 mb-2">
            {repositoryLabel}
          </div>
        )}
        <p className="text-sm md:text-base text-slate-400 flex-1 leading-relaxed line-clamp-3 mb-4">
          {description}
        </p>

        {/* Tech tags */}
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.slice(0, 4).map((tech, index) => {
              const techName = typeof tech === 'string' ? tech : tech.name;
              return (
                <span
                  key={index}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 text-xs font-medium border border-slate-700/50"
                >
                  {techName}
                </span>
              );
            })}
            {technologies.length > 4 && (
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-400 text-xs font-medium border border-slate-700/50">
                +{technologies.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Footer — mt-auto keeps it at bottom */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenModal(project)}
              className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center gap-1.5 min-h-[44px] px-0 transition-colors duration-200"
              title={`Read technical case study for ${title} by Ancel Ajanga`}
            >
              <Eye className="w-4 h-4 flex-shrink-0" />
              <span>View Details</span>
            </button>
            {caseStudySlug && (
              <a
                href={`/case-studies/${caseStudySlug}`}
                className="text-slate-400 hover:text-blue-400 font-medium text-sm flex items-center gap-1.5 min-h-[44px] px-0 transition-colors duration-200"
                title={`Read full case study: ${title} by Ancel Ajanga`}
              >
                <span>Read case study</span>
              </a>
            )}
          </div>
          <div className="flex items-center gap-1">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-blue-400 transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-slate-800/50"
                aria-label={`Visit ${title} live site`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {!sourceNote && repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-blue-400 transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-slate-800/50"
                aria-label={`View ${title} repository`}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </m.div>
    </LazyMotion>
  );
};

export default React.memo(ProjectCard);
