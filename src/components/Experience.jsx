import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';

const experiences = [
  {
    role: 'Senior Product Engineer & Full Stack Lead',
    company: 'Nykaa (B2C & Fashion Platform)',
    period: '2023 — Present',
    highlights: [
      'Architected micro-frontend modules reducing initial bundle size by 42%.',
      'Engineered scalable design system primitives adopted across 15+ engineering squads.',
      'Optimized checkout funnel metrics resulting in a 14% conversion lift.'
    ]
  },
  {
    role: 'Frontend UI Specialist & System Designer',
    company: 'Zomato (Sushi Design Ecosystem)',
    period: '2021 — 2023',
    highlights: [
      'Developed high-performance web components for core consumer web applications.',
      'Pioneered automated Web Accessibility (a11y) tooling ensuring AA compliance.',
      'Reduced core web vitals LCP from 2.8s to 1.1s across mobile web webviews.'
    ]
  },
  {
    role: 'Software Development Engineer',
    company: 'Deloitte Digital',
    period: '2019 — 2021',
    highlights: [
      'Built multi-tenant enterprise dashboards using React, Redux Toolkit, and Node.js.',
      'Delivered real-time telemetry analytics processing high throughput data streams.'
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          Professional Journey
        </h2>
        <p className="text-sm text-slate-400 mt-1">Impact delivered at scale</p>
      </div>

      <div className="glass-card rounded-3xl p-6 sm:p-8 relative">
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative pl-10"
            >
              {/* Timeline Indicator Node */}
              <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full bg-dark-950 border-2 border-accent-indigo flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <div className="w-2 h-2 rounded-full bg-accent-indigo"></div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h3 className="text-lg font-display font-bold text-white">
                  {exp.role}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs font-mono text-accent-cyan bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/50 w-fit">
                  <Calendar className="w-3 h-3" />
                  {exp.period}
                </span>
              </div>

              <p className="text-sm font-medium text-accent-indigo mb-3">
                {exp.company}
              </p>

              <ul className="space-y-2">
                {exp.highlights.map((item, hIdx) => (
                  <li key={hIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5 font-light leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
