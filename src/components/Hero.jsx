import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDownRight, Terminal, Cpu, Zap, Globe } from 'lucide-react';
import TextReveal from './TextReveal';

export default function Hero() {
  return (
    <section id="about" className="pt-2 lg:pt-0">
      <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-violet/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Floating Top Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-mono mb-6"
        >
          <Terminal className="w-3.5 h-3.5 text-accent-cyan" />
          <span>Architecting High-Scale Digital Experiences</span>
        </motion.div>

        {/* Main Dramatic Headline with Staggered Mask Reveal */}
        <div className="mb-6">
          <TextReveal
            text="Crafting web products with precision engineering & cinematic aesthetics."
            as="h1"
            className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]"
            staggerDelay={0.05}
          />
        </div>

        {/* Bio Paragraph */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light mb-8"
        >
          I am a Senior Full-Stack Engineer with over 5 years of expertise designing robust platform architectures, micro-frontends, design systems, and real-time enterprise dashboards. Focused on sub-second rendering performance and intuitive UX.
        </motion.p>

        {/* Metric Highlights Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80"
        >
          <div className="glass-card rounded-2xl p-4 border border-slate-800/50 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2 text-accent-indigo mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-2xl font-display font-bold text-white">99.9%</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Uptime & Reliability</p>
          </div>

          <div className="glass-card rounded-2xl p-4 border border-slate-800/50 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2 text-accent-violet mb-1">
              <Cpu className="w-4 h-4" />
              <span className="text-2xl font-display font-bold text-white">50M+</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Monthly Active Users</p>
          </div>

          <div className="glass-card rounded-2xl p-4 border border-slate-800/50 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2 text-accent-cyan mb-1">
              <Globe className="w-4 h-4" />
              <span className="text-2xl font-display font-bold text-white">10+</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Production Systems</p>
          </div>

          <div className="glass-card rounded-2xl p-4 border border-slate-800/50 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-2xl font-display font-bold text-white">Awwwards</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Design System Focus</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
