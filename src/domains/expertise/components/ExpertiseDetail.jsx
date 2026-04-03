import React from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { 
  Zap, 
  Layers, 
  Shield, 
  Code, 
  Settings, 
  TrendingUp, 
  CheckCircle, 
  Cpu, 
  Globe, 
  Database, 
  Layout, 
  Smartphone,
  ArrowRight,
  Workflow
} from 'lucide-react';
import { useAnimationsEnabled } from '@/contexts/AnimationsContext';
import { getSectionVariants } from '@/shared/utils/animation-variants';
import Link from 'next/link';

export default function ExpertiseDetail({ data }) {
  const animationsEnabled = useAnimationsEnabled();
  const { containerVariants, itemVariants } = getSectionVariants(animationsEnabled);

  if (!data) return null;

  const {
    title,
    subtitle,
    description,
    coreCompetencies,
    philosophy,
    methodology,
    relatedProjects,
    technologies
  } = data;

  const getIconForExpertise = (title) => {
    if (title.includes('Architecture')) return <Layers className="w-8 h-8 text-blue-400" />;
    if (title.includes('Backend')) return <Database className="w-8 h-8 text-emerald-400" />;
    if (title.includes('Frontend')) return <Layout className="w-8 h-8 text-purple-400" />;
    if (title.includes('Distributed')) return <Globe className="w-8 h-8 text-orange-400" />;
    return <Zap className="w-8 h-8 text-blue-400" />;
  };

  return (
    <section className="section-padding pt-24 w-full overflow-x-hidden min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <LazyMotion features={domAnimation}>
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                {getIconForExpertise(title)}
              </div>
              <div className="flex-1">
                <m.h1 variants={itemVariants} className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tight mb-4 leading-tight">
                  {title.split(' & ')[0]} <br className="hidden md:block" />
                  <span className="text-gradient">& {title.split(' & ')[1]}</span>
                </m.h1>
                <m.p variants={itemVariants} className="text-xl text-slate-400 max-w-3xl">
                  {subtitle}
                </m.p>
              </div>
            </div>

            {/* Deep Dive Description */}
            <m.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
              <div className="lg:col-span-8">
                <h3 className="text-2xl font-bold mb-4 text-slate-200">Domain Overview</h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-slate-300 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
              <div className="lg:col-span-4">
                <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
                  <h3 className="text-lg font-bold mb-4 text-slate-200 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-blue-400" />
                    Preferred Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </m.div>

            {/* Core Competencies */}
            <m.div variants={itemVariants} className="mb-20">
              <h2 className="text-3xl font-bold mb-8 text-center">Core <span className="text-gradient">Competencies</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {coreCompetencies.map((comp, idx) => (
                  <div key={idx} className="p-8 rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-blue-500/30 transition-all duration-300">
                    <h4 className="text-xl font-bold mb-3 text-slate-100 flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      {comp.title}
                    </h4>
                    <p className="text-slate-400 leading-relaxed">
                      {comp.description}
                    </p>
                  </div>
                ))}
              </div>
            </m.div>

            {/* Philosophy & Methodology */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              <m.div variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-100">
                  <Workflow className="w-6 h-6 text-purple-400" />
                  Engineering Philosophy
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed italic border-l-4 border-slate-800 pl-6">
                  "{philosophy}"
                </p>
              </m.div>
              <m.div variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-100">
                  <Shield className="w-6 h-6 text-emerald-400" />
                  Methodology & Lifecycle
                </h2>
                <ul className="space-y-4">
                  {methodology.map((m, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-400">
                      <ArrowRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </m.div>
            </div>

            {/* Related Case Studies */}
            <m.div variants={itemVariants} className="pt-12 border-t border-slate-800">
              <h2 className="text-2xl font-bold mb-8 text-slate-100">Proof of Capability: Flagship Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((projectSlug) => (
                  <Link 
                    key={projectSlug} 
                    href={`/projects/${projectSlug}`}
                    className="group p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold tracking-widest uppercase text-blue-400">Project</span>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors uppercase">
                      {projectSlug.replace('-', ' ')}
                    </h4>
                    <p className="text-sm text-slate-500 mt-2">
                      Deep-dive technical case study available.
                    </p>
                  </Link>
                ))}
              </div>
            </m.div>

          </m.div>
        </LazyMotion>
      </div>
    </section>
  );
}
