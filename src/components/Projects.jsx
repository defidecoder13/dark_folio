import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers, Sparkles, X, ChevronRight } from 'lucide-react';

const projects = [
  {
    id: 'medishop',
    title: 'Medishop Admin — Offline-First Health Tech Platform',
    category: 'Full Stack App / Next.js',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    description: 'Enterprise pharmaceutical dashboard engineered for instant billing, inventory management, offline-first PWA sync, and automated analytics.',
    tags: ['Next.js 16', 'TypeScript', 'IndexedDB', 'TailwindCSS', 'PWA', 'Prisma'],
    metrics: '400ms Local Latency • 100% Offline Resilience',
    demoUrl: '#',
    githubUrl: '#',
    details: 'Features automatic IndexedDB queuing for offline mutations, background worker sync triggers, Turbopack optimizations, and real-time inventory threshold alerts.'
  },
  {
    id: 'sushi-ds',
    title: 'Sushi Design System — Enterprise UI Component Suite',
    category: 'Design System / UI Engineering',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    description: 'Unified component system powering high-concurrency consumer facing e-commerce platforms with over 40+ accessible Web Components.',
    tags: ['React', 'Figma API', 'TailwindCSS', 'Radix UI', 'Storybook'],
    metrics: 'Used across 12 product teams • 99.8% Accessibility Score',
    demoUrl: '#',
    githubUrl: '#',
    details: 'Designed token architecture, automated Figma-to-code pipelines, micro-interaction states, theme customizer engine, and automated visual regression testing.'
  },
  {
    id: 'realtime-analytics',
    title: 'Nexus Analytics — Realtime Data Streamer',
    category: 'Backend & WebSockets',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    description: 'High-throughput real-time telemetry streaming engine processing over 100,000 events/sec with dynamic charts and WebSockets.',
    tags: ['Node.js', 'WebSockets', 'Redis', 'Chart.js', 'Docker'],
    metrics: '< 15ms Latency • 100k events/sec',
    demoUrl: '#',
    githubUrl: '#',
    details: 'Built distributed pub-sub caching using Redis Cluster, memory optimized websocket channels, and GPU-accelerated client canvas chart renders.'
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Featured Works & Case Studies
          </h2>
          <p className="text-sm text-slate-400 mt-1">High impact applications built with scalable architectures</p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card glass-card-hover rounded-3xl overflow-hidden group cursor-pointer border border-slate-800/80"
            onClick={() => setSelectedProject(project)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Image Preview */}
              <div className="lg:col-span-5 relative h-60 lg:h-auto overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-dark-950/90"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-dark-950/80 backdrop-blur-md text-accent-cyan text-xs font-mono border border-slate-700/60">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-accent-indigo transition-colors flex items-center gap-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-300 mt-3 line-clamp-2 font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-4">
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-800/60 text-slate-300 text-xs font-medium border border-slate-700/40">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Metrics & Action Link */}
                  <div className="flex items-center justify-between text-xs pt-2">
                    <span className="text-emerald-400 font-mono flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {project.metrics}
                    </span>
                    <span className="text-slate-400 group-hover:text-white flex items-center gap-1 font-medium transition-colors">
                      View Case Study <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-dark-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative border border-slate-700/80 shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="px-3 py-1 rounded-full bg-accent-indigo/10 border border-accent-indigo/20 text-accent-indigo text-xs font-mono">
                {selectedProject.category}
              </span>

              <h3 className="text-2xl font-display font-bold text-white mt-4">
                {selectedProject.title}
              </h3>

              <div className="mt-4 rounded-2xl overflow-hidden h-64 border border-slate-800">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mt-6">
                {selectedProject.description}
              </p>

              <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                <strong className="text-white block mb-1">Architecture Highlights:</strong>
                {selectedProject.details}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex gap-4">
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 rounded-xl bg-accent-indigo hover:bg-indigo-500 text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
