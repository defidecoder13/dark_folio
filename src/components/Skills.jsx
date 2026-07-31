import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Layout, Server, ShieldCheck, Terminal, Cpu } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend & Architecture',
    icon: Layout,
    skills: ['React 18', 'Next.js 16', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'GSAP', 'WebGL / Three.js', 'Redux / Zustand']
  },
  {
    title: 'Backend & Cloud Infrastructure',
    icon: Server,
    skills: ['Node.js', 'Express', 'Prisma ORM', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'GraphQL']
  },
  {
    title: 'Testing & Performance',
    icon: Cpu,
    skills: ['Playwright', 'Jest', 'Vite', 'Turbopack', 'PWA Offline Sync', 'Lighthouse Optimization', 'CI/CD Pipelines']
  }
];

export default function Skills() {
  return (
    <section id="skills" className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          Engineering Competencies
        </h2>
        <p className="text-sm text-slate-400 mt-1">Tools and frameworks mastered across production applications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-3xl p-6 border border-slate-800/80 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-accent-indigo/10 border border-accent-indigo/20 flex items-center justify-center text-accent-indigo mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-4">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700/40 hover:border-accent-indigo/40 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
