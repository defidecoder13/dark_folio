import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiFramer, 
  SiNodedotjs, 
  SiExpress, 
  SiPrisma, 
  SiDocker, 
  SiRedis, 
  SiPostgresql, 
  SiFigma,
  SiMongodb,
  SiGit,
  SiJavascript
} from 'react-icons/si';
import { Sparkles, Brain, Cpu } from 'lucide-react';

const skillCategories = [
  {
    category: 'FRONTEND & DESIGN',
    items: [
      { name: 'React 18', color: '#61DAFB', Icon: SiReact },
      { name: 'Next.js 16', color: '#FFFFFF', Icon: SiNextdotjs },
      { name: 'TypeScript', color: '#3178C6', Icon: SiTypescript },
      { name: 'JavaScript', color: '#F7DF1E', Icon: SiJavascript },
      { name: 'Tailwind CSS', color: '#06B6D4', Icon: SiTailwindcss },
      { name: 'Framer Motion', color: '#0055FF', Icon: SiFramer },
      { name: 'Figma', color: '#F24E1E', Icon: SiFigma }
    ]
  },
  {
    category: 'BACKEND & INFRASTRUCTURE',
    items: [
      { name: 'Node.js', color: '#5FA04E', Icon: SiNodedotjs },
      { name: 'Express.js', color: '#EEEEEE', Icon: SiExpress },
      { name: 'Prisma ORM', color: '#2D3748', Icon: SiPrisma },
      { name: 'PostgreSQL', color: '#4169E1', Icon: SiPostgresql },
      { name: 'MongoDB', color: '#47A248', Icon: SiMongodb },
      { name: 'Redis Cache', color: '#DC382D', Icon: SiRedis },
      { name: 'Docker', color: '#2496ED', Icon: SiDocker },
      { name: 'Git', color: '#F05032', Icon: SiGit }
    ]
  },
  {
    category: 'AI & LLM TOOLING',
    items: [
      { 
        name: 'Google Gemini', 
        color: '#8E75FF', 
        svg: (
          /* Official Google Gemini Star Sparkle */
          <svg className="w-9 h-9 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.5 0C11.5 6.351 6.351 11.5 0 11.5C6.351 11.5 11.5 16.649 11.5 23C11.5 16.649 16.649 11.5 23 11.5C16.649 11.5 11.5 6.351 11.5 0Z" />
          </svg>
        ) 
      },
      { 
        name: 'Claude AI', 
        color: '#D97706', 
        svg: (
          /* Official Anthropic Claude Asterisk / Starburst */
          <svg className="w-9 h-9 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        )
      },
      { 
        name: 'OpenAI / Codex', 
        color: '#10A37F', 
        svg: (
          /* Official OpenAI Pinwheel Logo */
          <svg className="w-9 h-9 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.28 9.38a6.04 6.04 0 0 0-.52-4.86 6.09 6.09 0 0 0-6.42-3 6.06 6.06 0 0 0-4.66-2.08 6.09 6.09 0 0 0-5.83 4.29 6.04 6.04 0 0 0-4.14 3 6.09 6.09 0 0 0 .59 7.07 6.04 6.04 0 0 0 .52 4.86 6.09 6.09 0 0 0 6.42 3 6.06 6.06 0 0 0 4.66 2.08 6.09 6.09 0 0 0 5.83-4.29 6.04 6.04 0 0 0 4.14-3 6.09 6.09 0 0 0-.59-7.07zm-9.78 12.28a4.42 4.42 0 0 1-2.92-1.1l.15-.08 3.5-2.02a.84.84 0 0 0 .42-.73v-4.94l1.48.85v4.06a4.44 4.44 0 0 1-2.63 3.96zm-7.9-3.77a4.42 4.42 0 0 1-.51-3.08l.15.09 3.5 2.02a.84.84 0 0 0 .84 0l4.28-2.47v1.7l-3.51 2.03a4.44 4.44 0 0 1-4.75-.29zm-1.1-8.52a4.42 4.42 0 0 1 2.4-1.98v.17l0 4.04a.84.84 0 0 0 .42.73l4.28 2.47-1.48.85-3.5-2.02a4.44 4.44 0 0 1-2.12-4.26zm14.28 3.65l-4.28-2.47 1.48-.85 3.5 2.02a4.44 4.44 0 0 1 2.12 4.26 4.42 4.42 0 0 1-2.4 1.98v-.17l0-4.04a.84.84 0 0 0-.42-.73zm1.61-4.75l-.15-.09-3.5-2.02a.84.84 0 0 0-.84 0l-4.28 2.47v-1.7l3.51-2.03a4.44 4.44 0 0 1 5.26 3.37zm-11.02-4.8a4.44 4.44 0 0 1 4.1.37l-.15.08-3.5 2.02a.84.84 0 0 0-.42.73v4.94l-1.48-.85v-4.06a4.44 4.44 0 0 1 1.45-3.23z"/>
          </svg>
        ) 
      },
      { 
        name: 'Antigravity AI', 
        color: '#6366F1', 
        Icon: Sparkles
      },
      { 
        name: 'Kimi AI', 
        color: '#EC4899', 
        Icon: Brain
      },
      { 
        name: 'GLM / Zhipu', 
        color: '#3B82F6', 
        Icon: Cpu
      }
    ]
  }
];

export default function ElegantSkillsGrid() {
  return (
    <section id="skills" className="space-y-12 pt-8 scroll-mt-28">
      {/* Section Label */}
      <div className="flex items-center gap-4 border-b border-neutral-900 pb-6">
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">04 — SKILLS & TOOLING</span>
        <div className="h-[1px] w-16 bg-neutral-800"></div>
      </div>

      {/* Categorized Skills Grid */}
      <div className="space-y-10">
        {skillCategories.map((group) => (
          <div key={group.category} className="space-y-4">
            {/* Category Header Label */}
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-500"></span>
              <h3 className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
                {group.category}
              </h3>
            </div>

            {/* Grid Container */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-6 sm:gap-8 items-center justify-items-center bg-neutral-950/60 p-6 sm:p-8 rounded-3xl border border-neutral-900/80">
              {group.items.map((tech, index) => {
                const { Icon, svg } = tech;
                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.03 }}
                    whileHover={{ scale: 1.15 }}
                    className="group relative flex flex-col items-center gap-3 cursor-pointer"
                  >
                    {/* Icon render */}
                    <div 
                      className="text-neutral-500 transition-all duration-300 transform group-hover:-translate-y-1"
                      style={{
                        filter: 'grayscale(100%) opacity(0.55)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.filter = 'grayscale(0%) opacity(1)';
                        e.currentTarget.style.color = tech.color;
                        e.currentTarget.style.dropShadow = `0 0 16px ${tech.color}90`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.filter = 'grayscale(100%) opacity(0.55)';
                        e.currentTarget.style.color = '';
                        e.currentTarget.style.dropShadow = 'none';
                      }}
                    >
                      {Icon ? <Icon className="w-9 h-9 sm:w-10 sm:h-10" /> : svg}
                    </div>

                    {/* Skill Name Label */}
                    <span className="text-[10px] sm:text-[11px] font-mono text-neutral-600 group-hover:text-white transition-colors tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      {tech.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
