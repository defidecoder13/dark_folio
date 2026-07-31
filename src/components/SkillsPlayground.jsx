import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Layers, RefreshCw } from 'lucide-react';

const skillsData = [
  {
    id: 'react',
    name: 'React 18',
    category: 'frontend',
    color: '#61DAFB',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="2" />
        <g stroke="currentColor" strokeWidth="1.5" fill="none">
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
        </g>
      </svg>
    )
  },
  {
    id: 'nextjs',
    name: 'Next.js 16',
    category: 'frontend',
    color: '#FFFFFF',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.17 17.65l-6.19-9.14v7.71H9.36V7.78h1.86l6.09 9.02v-9.02h1.62v9.87h-1.76z" />
      </svg>
    )
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    color: '#3178C6',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0zm10.74 13.97a3.02 3.02 0 0 0-1.02-2.31c-.68-.58-1.77-.98-3.27-1.2-1.05-.16-1.77-.38-2.16-.67a1.14 1.14 0 0 1-.41-.95c0-.4.18-.74.55-.99.36-.26.92-.38 1.66-.38 1.34 0 2.45.54 3.32 1.62l1.6-1.55c-1.3-1.62-3.03-2.43-5.2-2.43-1.46 0-2.65.37-3.56 1.1a3.05 3.05 0 0 0-1.16 2.43c0 1.05.37 1.86 1.11 2.43.74.58 1.88.97 3.42 1.18 1.02.16 1.7.37 2.05.65.35.28.53.64.53 1.08 0 .44-.22.82-.66 1.12-.44.3-1.12.45-2.03.45-1.58 0-2.9-.6-3.95-1.81l-1.65 1.65c1.44 1.8 3.3 2.7 5.58 2.7 1.6 0 2.92-.38 3.96-1.14a3.3 3.3 0 0 0 1.34-2.73c0-1.15-.4-2.04-1.2-2.65zm9.36.03h-3.66v-6.3h-2.3v-1.6h6.26v1.6h-2.3v6.3z" />
      </svg>
    )
  },
  {
    id: 'tailwind',
    name: 'TailwindCSS',
    category: 'frontend',
    color: '#06B6D4',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    )
  },
  {
    id: 'framer',
    name: 'Framer Motion',
    category: 'frontend',
    color: '#0055FF',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    )
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    color: '#5FA04E',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3.5 6.9v9.8L12 21.6l8.5-4.9V6.9L12 2zm6.7 13.7l-6.7 3.8-6.7-3.8V8.3l6.7-3.8 6.7 3.8v7.4z" />
      </svg>
    )
  },
  {
    id: 'express',
    name: 'Express',
    category: 'backend',
    color: '#E5E7EB',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.053c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-4.708 5.75c-.886-.71-1.39-1.84-1.39-3.23 0-2.39 1.64-4.22 3.97-4.22.61 0 1.15.14 1.58.4l-.56 1.45c-.32-.19-.71-.29-1.12-.29-1.42 0-2.34 1.1-2.34 2.62 0 1.01.39 1.84 1.09 2.37l-1.23.9zm-4.9-7.53h-3.66v1.45h3.42v1.44h-3.42v1.73h3.76v1.46h-5.26v-7.53h5.16v1.45z" />
      </svg>
    )
  },
  {
    id: 'prisma',
    name: 'Prisma ORM',
    category: 'backend',
    color: '#2D3748',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.36 15.5L12 22.84L2.64 15.5L12 1.16L21.36 15.5ZM12 4.67L5.56 14.58L12 19.61L18.44 14.58L12 4.67Z" />
      </svg>
    )
  },
  {
    id: 'indexeddb',
    name: 'IndexedDB PWA',
    category: 'architecture',
    color: '#F59E0B',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    )
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'devops',
    color: '#2496ED',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.185.185 0 00.186-.186V3.575a.185.185 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm0 5.43h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zM8.077 5.648h2.118a.185.185 0 00.185-.186V3.575a.185.185 0 00-.185-.185H8.077a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm0 5.43h2.118a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186H8.077a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zM5.123 11.078h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H5.123a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185z" />
      </svg>
    )
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'backend',
    color: '#DC382D',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.75 8.75l-10.75 4.5-10.75-4.5 10.75-4.5 10.75 4.5zm-21.5 4.5l10.75 4.5 10.75-4.5v3l-10.75 4.5-10.75-4.5v-3z" />
      </svg>
    )
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'backend',
    color: '#4169E1',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
      </svg>
    )
  }
];

export default function SkillsPlayground() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [resetKey, setResetKey] = useState(0);
  const containerRef = useRef(null);

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="space-y-8 pt-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">03 — SKILLS & TOOLING</span>
            <div className="h-[1px] w-16 bg-neutral-800"></div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Interactive <span className="text-neutral-500 font-normal">Tech Playground.</span>
          </h2>
        </div>

        {/* Filter Pills & Reset Control */}
        <div className="flex items-center gap-2 flex-wrap">
          {['all', 'frontend', 'backend', 'architecture'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-white text-black font-semibold shadow-md shadow-white/10'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={() => setResetKey(prev => prev + 1)}
            className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
            title="Reset Physics Arena"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Physics Arena */}
      <div 
        ref={containerRef}
        className="relative min-h-[360px] sm:min-h-[420px] rounded-3xl bg-neutral-950/60 border border-neutral-900 p-6 sm:p-10 overflow-hidden flex flex-wrap gap-4 items-center justify-center select-none"
      >
        {/* Subtle Ambient Background Grids */}
        <div className="absolute inset-0 bg-[radial-gradient(#1f1f2e_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>

        <AnimatePresence key={resetKey}>
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              drag
              dragConstraints={containerRef}
              dragElastic={0.2}
              whileDrag={{ scale: 1.15, cursor: 'grabbing', zIndex: 50 }}
              whileHover={{ 
                scale: 1.08, 
                borderColor: skill.color,
                boxShadow: `0 8px 30px ${skill.color}25`
              }}
              initial={{ opacity: 0, scale: 0.6, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
                delay: index * 0.05
              }}
              className="glass-card hover:bg-neutral-900/90 px-4 py-3 rounded-2xl border border-neutral-800/80 cursor-grab flex items-center gap-3 shadow-xl backdrop-blur-xl transition-colors duration-200 group"
            >
              <div 
                className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 group-hover:text-white transition-colors"
                style={{ color: skill.color }}
              >
                {skill.svg}
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-medium text-white group-hover:text-white font-mono">
                  {skill.name}
                </span>
                <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">
                  {skill.category}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <p className="text-center text-xs font-mono text-neutral-600">
        💡 Drag, toss, and filter badges to explore tech stack competencies
      </p>
    </section>
  );
}
