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

const techLogos = [
  { name: 'React', color: '#61DAFB', Icon: SiReact },
  { name: 'Next.js', color: '#FFFFFF', Icon: SiNextdotjs },
  { name: 'TypeScript', color: '#3178C6', Icon: SiTypescript },
  { name: 'JavaScript', color: '#F7DF1E', Icon: SiJavascript },
  { name: 'TailwindCSS', color: '#06B6D4', Icon: SiTailwindcss },
  { name: 'Framer Motion', color: '#0055FF', Icon: SiFramer },
  { name: 'Node.js', color: '#5FA04E', Icon: SiNodedotjs },
  { name: 'Express', color: '#EEEEEE', Icon: SiExpress },
  { name: 'Prisma', color: '#2D3748', Icon: SiPrisma },
  { name: 'MongoDB', color: '#47A248', Icon: SiMongodb },
  { name: 'PostgreSQL', color: '#4169E1', Icon: SiPostgresql },
  { name: 'Redis', color: '#DC382D', Icon: SiRedis },
  { name: 'Docker', color: '#2496ED', Icon: SiDocker },
  { name: 'Git', color: '#F05032', Icon: SiGit },
  { name: 'Figma', color: '#F24E1E', Icon: SiFigma }
];

export default function ElegantSkillsGrid() {
  return (
    <section id="skills" className="space-y-12 pt-8">
      {/* Section Label */}
      <div className="flex items-center gap-4 border-b border-neutral-900 pb-6">
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">04 — SKILLS & TOOLING</span>
        <div className="h-[1px] w-16 bg-neutral-800"></div>
      </div>

      {/* Official Simple Icons Grid — Monochrome to Brand Color Hover */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-8 sm:gap-12 items-center justify-items-center">
        {techLogos.map((tech, index) => {
          const { Icon } = tech;
          return (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              whileHover={{ scale: 1.15 }}
              className="group relative flex flex-col items-center gap-3 cursor-pointer"
            >
              {/* React-Icon (Simple Icons Vector) */}
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
                <Icon className="w-9 h-9 sm:w-10 sm:h-10" />
              </div>

              {/* Skill Name */}
              <span className="text-[11px] font-mono text-neutral-600 group-hover:text-white transition-colors tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {tech.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
