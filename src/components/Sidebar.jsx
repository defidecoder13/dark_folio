import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Briefcase, 
  Mail, 
  Download, 
  Award,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Code2,
  Layers,
  Terminal,
  FolderGit2,
  Globe
} from 'lucide-react';

export default function Sidebar({ onOpenContact, onOpenBadge, activeSection }) {
  const navItems = [
    { id: 'about', label: 'About', icon: Code2 },
    { id: 'projects', label: 'Featured Projects', icon: FolderGit2 },
    { id: 'experience', label: 'Experience', icon: Layers },
    { id: 'skills', label: 'Tech Stack', icon: Terminal },
  ];

  return (
    <aside className="w-full lg:w-[380px] shrink-0">
      <div className="lg:sticky lg:top-8 flex flex-col gap-6">
        
        {/* Profile Main Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden group">
          {/* Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-accent-indigo/20 rounded-full blur-3xl pointer-events-none group-hover:bg-accent-indigo/30 transition-all duration-700"></div>
          <div className="absolute -bottom-20 -right-20 w-52 h-52 bg-accent-cyan/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* Profile Header Image with Rim Light */}
          <div className="relative mb-6">
            <div className="relative w-36 h-36 mx-auto lg:mx-0 rounded-2xl overflow-hidden p-[2px] bg-gradient-to-b from-slate-700 via-slate-800 to-accent-indigo/40 shadow-2xl">
              <img 
                src="/src/assets/profile.png" 
                alt="Subham Santra" 
                className="w-full h-full object-cover rounded-[14px] grayscale contrast-125 brightness-95 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 ring-1 ring-white/10 rounded-[14px] pointer-events-none"></div>
            </div>

            {/* Live Availability Badge */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for High-Impact Roles
            </motion.div>
          </div>

          {/* User Bio Details */}
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight flex items-center justify-center lg:justify-start gap-2">
              Subham Santra
              <Sparkles className="w-5 h-5 text-accent-indigo animate-pulse" />
            </h1>
            <p className="text-sm font-medium text-slate-400 flex items-center justify-center lg:justify-start gap-2">
              <span>Senior Full Stack Engineer</span>
              <span className="text-slate-600">•</span>
              <span className="text-accent-cyan">Creative Dev</span>
            </p>
          </div>

          {/* Location & Meta Chips */}
          <div className="mt-5 pt-5 border-t border-slate-800/80 space-y-3 text-xs text-slate-400">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span>India — Remote / Hybrid</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <Briefcase className="w-4 h-4 text-slate-500" />
              <span>5+ Years Experience (Nykaa & Zomato Stack Inspired)</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-col gap-3">
            <button 
              onClick={onOpenContact}
              className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-accent-indigo to-accent-violet hover:from-indigo-500 hover:to-violet-500 text-white font-medium text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95"
            >
              <Mail className="w-4 h-4" />
              <span>Initiate Collaboration</span>
            </button>

            <div className="flex gap-2">
              <button 
                onClick={onOpenBadge}
                className="flex-1 py-2.5 px-4 rounded-xl glass-card hover:bg-slate-800/80 text-slate-300 text-xs font-medium flex items-center justify-center gap-2 border border-slate-700/50 transition-all"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Featured Wall Badge</span>
              </button>
              
              <a 
                href="#cv" 
                className="py-2.5 px-4 rounded-xl glass-card hover:bg-slate-800/80 text-slate-300 text-xs font-medium flex items-center justify-center gap-2 border border-slate-700/50 transition-all"
                title="Download Resume"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-center lg:justify-start gap-3">
            <a href="https://github.com/defidecoder13" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800/50" title="GitHub">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://linkedin.com/in/defidecoder13" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800/50" title="LinkedIn">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.77a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/></svg>
            </a>
            <a href="https://x.com/subham_sl" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800/50" title="X / Twitter">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="glass-card rounded-2xl p-2 hidden lg:flex flex-col gap-1 border border-slate-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-slate-800/90 text-white shadow-inner border border-slate-700/50' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-accent-indigo' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-0 text-accent-indigo' : '-translate-x-1 opacity-0'}`} />
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
