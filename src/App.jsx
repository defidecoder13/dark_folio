import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import CommandPalette from './components/CommandPalette';
import ElegantSkillsGrid from './components/ElegantSkillsGrid';
import Preloader from './components/Preloader';
import KineticHeading from './components/KineticHeading';
import ParticleAvatar from './components/ParticleAvatar';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
import {
  ArrowUpRight,
  Terminal,
  Layers,
  Cpu,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Mail,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Code2,
  Database,
  Smartphone,
  Layout,
  Workflow
} from 'lucide-react';

const animatedKeywords = [
  'Creative Developer',
  'Full Stack Engineer',
  'Design System',
  'UI/UX Craftsman',
  'AI Enthusiast'
];

export default function App() {
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Real-Time Dynamic Clock for Kolkata, India (IST / UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Custom Event Listener for Cmd+K Shortcut
  useEffect(() => {
    const handleOpen = () => setIsCmdPaletteOpen(true);
    window.addEventListener('open-command-palette', handleOpen);
    return () => window.removeEventListener('open-command-palette', handleOpen);
  }, []);

  // Live Interactive Developer State
  const [devState, setDevState] = useState({
    name: 'Subham',
    role: 'Creative Developer',
    focus: 'PWA Offline & High Scale',
    availableForHire: true
  });

  // Typewriter Keypad Effect for Keywords
  useEffect(() => {
    const currentKeyword = animatedKeywords[keywordIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentKeyword.substring(0, displayText.length + 1));
        if (displayText.length === currentKeyword.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentKeyword.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setKeywordIndex((prev) => (prev + 1) % animatedKeywords.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, keywordIndex]);

  // Lenis Smooth Scroll integrated with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  useGSAP((context) => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      context.add(() => {
        // 1. Hero Animations (Initial Entry)
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    heroTl.from(".hero-loc", {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.2
    });
    
    heroTl.from(".hero-title-line", {
      opacity: 0,
      y: 55,
      rotationX: 10,
      stagger: 0.15,
      duration: 1.2,
    }, "-=0.8");

    heroTl.from(".hero-desc", {
      opacity: 0,
      y: 30,
      duration: 1,
    }, "-=0.9");

    heroTl.from(".hero-social-btn", {
      opacity: 0,
      scale: 0.8,
      y: 20,
      stagger: 0.08,
      duration: 0.8,
    }, "-=0.8");

    heroTl.from(".hero-avatar", {
      opacity: 0,
      scale: 0.95,
      duration: 1.5,
    }, "-=1.2");

    heroTl.from(".hero-scroll-btn", {
      opacity: 0,
      y: -10,
      yoyo: true,
      repeat: -1,
      duration: 1,
    }, "-=0.5");
    // 4. Section Headers Reveal Animations (Dynamic ScrollTrigger for all section headers)
    const sections = ["#about", "#experience", "#education", "#work", "#skills", "#contact"];
    sections.forEach((secId) => {
      const secHeader = document.querySelector(`${secId} .section-header`);
      if (secHeader) {
        gsap.from(secHeader, {
          opacity: 0,
          x: -40,
          duration: 0.8,
          scrollTrigger: {
            trigger: secId,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      }
    });

    // 3. About Section Parallax & Content Slide-up
    gsap.from(".about-heading", {
      opacity: 0,
      y: 60,
      duration: 1,
      scrollTrigger: {
        trigger: "#about",
        start: "top 75%",
      }
    });

    gsap.from(".about-body p", {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#about",
        start: "top 70%",
      }
    });

    gsap.from(".about-resume-btn", {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#about",
        start: "top 65%",
      }
    });

    // 4. Experience Section Timeline Vertical Line and Staggered Entries
    gsap.to(".experience-line-fill", {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".experience-timeline-container",
        start: "top 70%",
        end: "bottom 70%",
        scrub: true
      }
    });

    gsap.from(".experience-card", {
      opacity: 0,
      x: -40,
      stagger: 0.3,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#experience",
        start: "top 65%",
      }
    });

    // 5. Education Cards Sequential Reveals
    gsap.from(".education-card", {
      opacity: 0,
      y: 40,
      stagger: 0.25,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".education-card",
        start: "top 85%",
      }
    });

    // 6. Selected Work / Projects Staggered Reveals & Vertical Fill
    gsap.to(".work-line-fill", {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".work-timeline-container",
        start: "top 70%",
        end: "bottom 70%",
        scrub: true
      }
    });

    gsap.from(".project-card", {
      opacity: 0,
      x: -50,
      stagger: 0.3,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#work",
        start: "top 65%",
      }
    });

    // 7. Footer Reveal Animation
    gsap.from(".footer-reveal", {
      opacity: 0,
      y: 40,
      duration: 1.2,
      scrollTrigger: {
        trigger: "#contact",
        start: "top 80%",
      }
    });

    // Recalculate ScrollTrigger start/end triggers now that loader is gone
    ScrollTrigger.refresh();
      });
    }, 250);

    return () => clearTimeout(timer);

  }, { scope: containerRef, dependencies: [isLoading] });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">

      {/* Cinematic Dark Preloader Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Cmd + K Command Palette Modal */}
      <CommandPalette isOpen={isCmdPaletteOpen} onClose={() => setIsCmdPaletteOpen(false)} />

      {/* Floating Glassmorphic Pill Header */}
      <header className="fixed top-6 left-0 w-full z-50 px-4 sm:px-6 pointer-events-none flex justify-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-auto max-w-6xl w-full flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3 rounded-full bg-neutral-900/85 backdrop-blur-xl border border-neutral-800/80 shadow-2xl shadow-black/80"
        >
          {/* Responsive Brand Text Initials Collapse */}
          <a href="#" className="flex items-center group pl-1">
            <span className="font-mono text-[11px] sm:text-xs tracking-widest text-white font-semibold uppercase group-hover:text-neutral-300 transition-colors">
              <span className="hidden sm:inline">{devState.name || 'Subham'}</span>
              <span className="inline sm:hidden">S.S.</span>
            </span>
          </a>

          {/* Navigation Links + Cmd+K Trigger */}
          <nav className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-mono tracking-widest text-neutral-400">
            <a
              href="#work"
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full hover:text-white hover:bg-neutral-800/60 transition-all duration-200"
            >
              WORK
            </a>
            <a
              href="#experience"
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full hover:text-white hover:bg-neutral-800/60 transition-all duration-200"
            >
              EXPERIENCE
            </a>
            <a
              href="#skills"
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full hover:text-white hover:bg-neutral-800/60 transition-all duration-200 hidden sm:inline-block"
            >
              SKILLS
            </a>

            {/* Cmd + K Button Badge */}
            <button
              onClick={() => setIsCmdPaletteOpen(true)}
              className="px-2 sm:px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all flex items-center gap-1.5 text-[10px] sm:text-[11px]"
              title="Open Command Palette (Cmd + K)"
            >
              <kbd className="font-mono text-[9px] sm:text-[10px] text-neutral-400">⌘K</kbd>
            </button>

            <a
              href="#contact"
              className="ml-1 sm:ml-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white text-black font-medium tracking-normal hover:bg-neutral-200 transition-all duration-200 shadow-md shadow-white/10 hidden sm:inline-block"
            >
              GET IN TOUCH
            </a>
          </nav>
        </motion.div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-36 pb-16 sm:pb-24 space-y-20 sm:space-y-32 overflow-x-hidden">

        {/* HERO SECTION — Clean Headline with Keypad Typewriter Animation */}
        <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[75vh]">
          <div className="lg:col-span-7 space-y-6 pt-4">
            
            {/* Location & Dynamic Real-Time Clock Tag */}
            <div className="hero-loc flex items-center gap-2 text-xs font-mono text-neutral-400 tracking-wider">
              <span className="text-sm">📍</span>
              <span>Based in Kolkata, WB <span className="text-neutral-500 font-normal">— {currentTime || 'LOCAL TIME'}</span> <span className="text-neutral-600">(UTC+5:30)</span></span>
            </div>

            <h1 className="text-4xl sm:text-7xl font-bold tracking-tight leading-[1.05] overflow-hidden">
              <span className="hero-title-line block">Hi, I'm {devState.name},</span>
              <span className="hero-title-line block text-neutral-400 font-mono text-2xl sm:text-5xl font-normal underline decoration-neutral-700 underline-offset-8">
                {displayText}
                <span className="inline-block w-1 h-8 sm:h-12 bg-white ml-1 animate-pulse align-middle"></span>
              </span>
            </h1>

            <p className="hero-desc text-neutral-400 text-base sm:text-lg font-light max-w-xl leading-relaxed pt-2">
              Specializing in micro-frontends, high-throughput architectures, PWA offline resilience, and modern design systems.
            </p>

            {/* Social Media Links with Authentic Hover Highlights */}
            <div className="flex items-center gap-4 pt-2">
              {/* GitHub */}
              <a
                href="https://github.com/defidecoder13"
                target="_blank"
                rel="noreferrer"
                className="hero-social-btn p-3 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-500 hover:bg-neutral-800/80 hover:shadow-[0_0_15px_rgba(255,255,255,0.25)] transition-[background-color,border-color,color,box-shadow,transform] duration-300 transform hover:-translate-y-1"
                title="GitHub"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/defidecoder13"
                target="_blank"
                rel="noreferrer"
                className="hero-social-btn p-3 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/10 hover:shadow-[0_0_18px_rgba(10,102,194,0.35)] transition-[background-color,border-color,color,box-shadow,transform] duration-300 transform hover:-translate-y-1"
                title="LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.77a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" /></svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com/subham_sl"
                target="_blank"
                rel="noreferrer"
                className="hero-social-btn p-3 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-500 hover:bg-neutral-800/80 hover:shadow-[0_0_15px_rgba(255,255,255,0.25)] transition-[background-color,border-color,color,box-shadow,transform] duration-300 transform hover:-translate-y-1"
                title="X / Twitter"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>

              {/* Email */}
              <a
                href="mailto:subhamsantra001@gmail.com"
                className="hero-social-btn p-3 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/60 hover:bg-emerald-500/10 hover:shadow-[0_0_18px_rgba(52,211,153,0.35)] transition-[background-color,border-color,color,box-shadow,transform] duration-300 transform hover:-translate-y-1"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Portrait Cutout Container */}
          <div className="hero-avatar lg:col-span-5 relative flex flex-col items-center gap-4">
            <div className="relative w-full max-w-md aspect-[4/5] flex items-center justify-center">
              <ParticleAvatar />
            </div>

            {/* Pure Raw Text Status (No Container / No Pill Shape) */}
            <div className="flex items-center gap-2.5 pt-1">
              <span className="relative flex h-2 w-2">
                {devState.availableForHire && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${devState.availableForHire ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              </span>
              <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase font-medium">
                {devState.availableForHire ? 'AVAILABLE FOR HIRE' : 'CURRENTLY BOOKED'}
              </span>
            </div>
          </div>

          {/* Animated Scroll Indicator at Bottom Center */}
          <div className="hero-scroll-btn lg:col-span-12 flex justify-center pt-8">
            <a 
              href="#about" 
              className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-neutral-500 hover:text-white transition-colors duration-300 group"
            >
              <span className="group-hover:translate-y-1 transition-transform duration-300">↓</span>
              <span>SCROLL TO EXPLORE</span>
            </a>
          </div>
        </section>


        {/* 01 — ABOUT SECTION (Refined Split Typography Layout) */}
        <section id="about" className="space-y-12 pt-8 scroll-mt-28">
          <div className="section-header flex items-center gap-4">
            <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">01 — ABOUT</span>
            <div className="h-[1px] w-16 bg-neutral-800"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Big Impact Heading with 3D Kinetic Cursor Magnet */}
            <div className="about-heading lg:col-span-6">
              <KineticHeading />
            </div>

            {/* Right Detailed Narrative Paragraphs & Resume Pill */}
            <div className="about-body lg:col-span-6 space-y-6">
              {/* Radial Target Dot Indicator */}
              <div className="w-7 h-7 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
              </div>

              <p className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed">
                I build full stack digital experiences that combine scalable engineering with refined visual design. My work focuses on frontend architecture, backend systems, motion-driven interfaces, and building products that feel immersive, fast, and deeply intentional.
              </p>

              <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
                I care about the things that are hard to quantify — the feeling of a transition, the weight of a typeface, the moment an interface becomes invisible. Good engineering makes that possible.
              </p>

              {/* Resume CTA Button with Glowing Ambient Glow */}
              <div className="about-resume-btn pt-4">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 hover:border-white text-white text-xs font-mono tracking-wider transition-[background-color,border-color,color,box-shadow] duration-300 group shadow-[0_0_20px_rgba(255,255,255,0.12)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                >
                  {/* Subtle Pulse Ring */}
                  <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-neutral-500/20 to-white/20 blur opacity-60 group-hover:opacity-100 transition duration-500 pointer-events-none"></span>
                  <span className="relative z-10">Resume</span>
                  <ArrowUpRight className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION — Minimalist Split Layout (Medsathi Real-World Software) */}
        <section id="experience" className="space-y-12 pt-8 scroll-mt-28">
          <div className="section-header flex items-center gap-4">
            <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">02 — EXPERIENCE</span>
            <div className="h-[1px] w-16 bg-neutral-800"></div>
          </div>

          <div className="experience-timeline-container relative pl-4 sm:pl-6 border-l border-neutral-900/60 pt-4 space-y-12">
            {/* Scroll-Triggered Animated Fill Line */}
            <div className="absolute top-0 left-[-1px] w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-emerald-500 origin-top experience-line-fill" style={{ height: "0%" }}></div>

            {/* Medsathi Primary Role */}
            <div className="experience-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative pl-4 sm:pl-8 group">
              {/* Vertical Timeline Node Dot */}
              <div className="absolute -left-[21px] sm:-left-[29px] top-2 w-3 h-3 rounded-full bg-neutral-950 border-2 border-indigo-500 group-hover:scale-125 transition-transform duration-300"></div>

              {/* Left Column: Organization & Dates */}
              <div className="lg:col-span-4 space-y-1">
                <h3 className="text-base font-semibold text-white">Freelance Fullstack Developer</h3>
                <p className="text-xs font-mono text-neutral-500">Medsathi Pharmacy Management Software</p>
                <p className="text-xs font-mono text-neutral-600 pt-1">2024 — Present</p>
              </div>

              {/* Right Column: Narrative & Tech Stack Badges */}
              <div className="lg:col-span-8 space-y-6">
                <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
                  Architected and deployed <span className="text-white font-medium">Medsathi</span> — a production-grade, offline-first pharmacy management platform currently operating live in medical retail stores. Engineered real-time POS billing, batch-level inventory tracking, barcode scanning integration, automated stock-expiry alerts, and offline IndexedDB mutation queuing with automatic sync resilience.
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {['TYPESCRIPT', 'NEXTJS 16', 'REACTJS', 'TAILWIND CSS', 'INDEXEDDB', 'PRISMA', 'NODEJS', 'EXPRESS', 'OFFLINE PWA', 'REDUX TOOLKIT'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md bg-neutral-900/90 border border-neutral-800 text-[10px] font-mono text-neutral-400 tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 — EDUCATION SECTION */}
        <section id="education" className="space-y-12 pt-8 scroll-mt-28">
          <div className="section-header flex items-center gap-4">
            <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">03 — EDUCATION</span>
            <div className="h-[1px] w-16 bg-neutral-800"></div>
          </div>

          <div className="space-y-10 border-t border-neutral-900 pt-8">
            {/* MCA Degree */}
            <div className="education-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-start p-4 hover:bg-neutral-900/30 rounded-xl transition-colors duration-300">
              <div className="lg:col-span-4 space-y-1">
                <h3 className="text-base font-semibold text-white">Master of Computer Applications (MCA)</h3>
                <p className="text-xs font-mono text-neutral-500">Brainware University</p>
                <p className="text-xs font-mono text-neutral-600 pt-1">2024 — 2026</p>
              </div>
              <div className="lg:col-span-8">
                <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
                  Advanced studies in distributed systems, web architectures, enterprise database optimizations, algorithms, and cloud computing.
                </p>
              </div>
            </div>

            {/* BCA Degree */}
            <div className="education-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-neutral-900/60 p-4 hover:bg-neutral-900/30 rounded-xl transition-colors duration-300">
              <div className="lg:col-span-4 space-y-1">
                <h3 className="text-base font-semibold text-white">Bachelor of Computer Applications (BCA)</h3>
                <p className="text-xs font-mono text-neutral-500">Brainware University</p>
                <p className="text-xs font-mono text-neutral-600 pt-1">2021 — 2024</p>
              </div>
              <div className="lg:col-span-8">
                <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
                  Core fundamentals in software engineering, object-oriented programming, data structures, relational database management, and fullstack web application development.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* 05 — SELECTED PROJECTS & SYSTEMS */}
        <section id="work" className="space-y-12 pt-8 scroll-mt-24">
          <div className="section-header flex items-center gap-4">
            <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">05 — SELECTED WORK</span>
            <div className="h-[1px] w-16 bg-neutral-800"></div>
          </div>

          <div className="flex items-center justify-between border-b border-neutral-900 pb-8">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
              Selected <span className="text-neutral-500 font-normal">projects & systems.</span>
            </h2>
          </div>

          <div className="work-timeline-container relative pl-4 sm:pl-6 border-l border-neutral-900/60 pt-4 space-y-12">
            {/* Scroll-Triggered Animated Fill Line */}
            <div className="absolute top-0 left-[-1px] w-[2px] bg-gradient-to-b from-emerald-500 via-sky-500 to-indigo-500 origin-top work-line-fill" style={{ height: "0%" }}></div>
            
            {/* Project 01 — Medsathi Pharmacy Suite */}
            <div className="project-card relative pl-2 sm:pl-8 space-y-6 group">
              {/* Vertical Timeline Indicator Node */}
              <div className="absolute -left-[21px] sm:-left-[29px] top-2 w-3 h-3 rounded-full bg-neutral-950 border-2 border-indigo-500 group-hover:scale-125 transition-transform duration-300"></div>

              {/* Header Badges & Links */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-indigo-400 text-[10px] font-mono tracking-widest uppercase">
                      PRODUCTION
                    </span>
                    <span className="text-xs font-mono text-neutral-600">2026</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-neutral-200 transition-colors">
                    Medsathi — Offline Pharmacy Platform
                  </h3>
                  <p className="text-xs font-mono text-neutral-500">Real-life retail pharmacy management system</p>
                </div>

                <div className="flex flex-col items-end gap-1.5 text-xs font-mono">
                  <a 
                    href="https://github.com/defidecoder13/medical-shop-management" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    GitHub <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Radial Center Target Dot */}
              <div className="w-8 h-8 rounded-full bg-neutral-900/90 border border-neutral-800 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-accent-indigo"></div>
              </div>

              {/* Description Paragraph */}
              <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed max-w-3xl">
                A production-grade pharmaceutical enterprise platform engineered for instant POS checkout, batch inventory tracking, barcode scanning, stock-expiry triggers, and offline PWA IndexedDB mutation queuing with automatic background sync resilience.
              </p>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-2">
                {['TYPESCRIPT', 'NEXTJS 16', 'REACTJS', 'TAILWIND CSS', 'INDEXEDDB', 'PRISMA', 'EXPRESS', 'NODEJS'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800/80 text-[10px] font-mono text-neutral-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-neutral-900 max-w-lg">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">400ms</div>
                  <div className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">LOCAL LATENCY</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">100%</div>
                  <div className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">OFFLINE SYNC</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">0s</div>
                  <div className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">DATA LOSS</div>
                </div>
              </div>
            </div>


            {/* Project 02 — Studium AI Academic Copilot */}
            <div className="project-card relative pl-2 sm:pl-8 space-y-6 group">
              {/* Vertical Timeline Indicator Node */}
              <div className="absolute -left-[21px] sm:-left-[29px] top-2 w-3 h-3 rounded-full bg-neutral-950 border-2 border-emerald-400 group-hover:scale-125 transition-transform duration-300"></div>

              {/* Header Badges & Info */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-emerald-400 text-[10px] font-mono tracking-widest uppercase">
                      AI PLATFORM
                    </span>
                    <span className="text-xs font-mono text-neutral-600">2026</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-neutral-200 transition-colors">
                    Studium — AI Academic Copilot & Assessment Engine
                  </h3>
                  <p className="text-xs font-mono text-neutral-500">Smart textbook & YouTube learning assistant</p>
                </div>
              </div>

              {/* Radial Center Target Dot */}
              <div className="w-8 h-8 rounded-full bg-neutral-900/90 border border-neutral-800 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
              </div>

              {/* Description Paragraph */}
              <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed max-w-3xl">
                Developed an intelligent study platform supporting synchronized PDF textbook reading and interactive YouTube video transcripts. Built an AI tutor powered by Google Gemini to answer questions with page-level citations and automatically generate interactive exam quizzes.
              </p>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-2">
                {['NEXTJS', 'TYPESCRIPT', 'TAILWIND CSS', 'PRISMA', 'POSTGRESQL', 'NEON DB', 'GOOGLE GEMINI AI'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800/80 text-[10px] font-mono text-neutral-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-neutral-900 max-w-lg">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">GEMINI 1.5</div>
                  <div className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">AI LLM ENGINE</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">CITATIONS</div>
                  <div className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">PAGE ACCURACY</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">REALTIME</div>
                  <div className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">QUIZ GENERATION</div>
                </div>
              </div>
            </div>


            {/* Project 03 — UniRoomies Student Accommodation */}
            <div className="project-card relative pl-2 sm:pl-8 space-y-6 group">
              {/* Vertical Timeline Indicator Node */}
              <div className="absolute -left-[21px] sm:-left-[29px] top-2 w-3 h-3 rounded-full bg-neutral-950 border-2 border-sky-400 group-hover:scale-125 transition-transform duration-300"></div>

              {/* Header Badges & Info */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-sky-400 text-[10px] font-mono tracking-widest uppercase">
                      WEB PLATFORM
                    </span>
                    <span className="text-xs font-mono text-neutral-600">2026</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-neutral-200 transition-colors">
                    UniRoomies — Student Accommodation Platform
                  </h3>
                  <p className="text-xs font-mono text-neutral-500">Student rental marketplace & vacancy manager</p>
                </div>
              </div>

              {/* Radial Center Target Dot */}
              <div className="w-8 h-8 rounded-full bg-neutral-900/90 border border-neutral-800 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-sky-400"></div>
              </div>

              {/* Description Paragraph */}
              <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed max-w-3xl">
                Built a fullstack web platform connecting students with affordable rental accommodations. Developed a comprehensive listing management system for posting, editing, and managing room vacancies with a seamless mobile-responsive interface for inquiries.
              </p>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-2">
                {['NEXTJS', 'REACTJS', 'TYPESCRIPT', 'TAILWIND CSS', 'SUPABASE'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800/80 text-[10px] font-mono text-neutral-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-neutral-900 max-w-lg">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">SUPABASE</div>
                  <div className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">BACKEND & AUTH</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">LISTING</div>
                  <div className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">VACANCY SYSTEM</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">RESPONSIVE</div>
                  <div className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">MOBILE FIRST</div>
                </div>
              </div>
            </div>


            {/* Project 04 — InterviewAI (Building) */}
            <div className="project-card relative pl-2 sm:pl-8 space-y-6 group">
              {/* Vertical Timeline Indicator Node */}
              <div className="absolute -left-[21px] sm:-left-[29px] top-2 w-3 h-3 rounded-full bg-neutral-950 border-2 border-amber-400 group-hover:scale-125 transition-transform duration-300"></div>

              {/* Header Badges & Info */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/80 text-amber-400 text-[10px] font-mono tracking-widest uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                      BUILDING
                    </span>
                    <span className="text-xs font-mono text-neutral-600">IN DEVELOPMENT</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-neutral-200 transition-colors">
                    InterviewAI — AI Interview Platform
                  </h3>
                  <p className="text-xs font-mono text-neutral-500">Automated technical & behavioral evaluation engine</p>
                </div>
              </div>

              {/* Radial Center Target Dot */}
              <div className="w-8 h-8 rounded-full bg-neutral-900/90 border border-neutral-800 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
              </div>

              {/* Description Paragraph */}
              <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed max-w-3xl">
                Integrated Google Gemini API to dynamically generate role-specific technical & behavioral interview questions based on real-time resume parsing. Developed an automated evaluation engine analyzing multi-turn transcripts, scoring responses, and synthesizing 10/10 STAR-framework rectified answers.
              </p>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-2">
                {['NEXTJS', 'TYPESCRIPT', 'TAILWIND CSS', 'GOOGLE GEMINI API'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800/80 text-[10px] font-mono text-neutral-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-neutral-900 max-w-lg">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">GEMINI API</div>
                  <div className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">RESUME PARSER</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">STAR 10/10</div>
                  <div className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">ANSWERS SYNTHESIS</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">MULTI-TURN</div>
                  <div className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">TRANSCRIPT SCORING</div>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* TECHNICAL SKILLS & TOOLING */}
        <ElegantSkillsGrid />


        {/* FOOTER CALL TO ACTION */}
        <section id="contact" className="pt-20 pb-16 text-center space-y-10">
          <div className="footer-reveal space-y-8 max-w-2xl mx-auto">
            {/* Top Brand Name Signature */}
            <div className="space-y-1">
              <span className="font-mono text-xl sm:text-2xl font-light tracking-widest text-white uppercase">
                SUBHAM<span className="text-neutral-500">/</span>SANTRA
              </span>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center justify-center gap-6 text-neutral-500 pt-2">
              <a 
                href="https://linkedin.com/in/defidecoder13" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white transition-colors duration-300"
                title="LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.77a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/></svg>
              </a>
              <a 
                href="https://github.com/defidecoder13" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white transition-colors duration-300"
                title="GitHub"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a 
                href="https://x.com/subham_sl" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white transition-colors duration-300"
                title="X / Twitter"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a 
                href="mailto:subhamsantra001@gmail.com" 
                className="hover:text-white transition-colors duration-300"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* Large Centered Headline */}
            <h2 className="text-4xl sm:text-5xl font-normal tracking-tight leading-tight text-white max-w-xl mx-auto">
              From concept to creation, let's make it happen
            </h2>

            {/* Subtitle Narrative Paragraph */}
            <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed max-w-md mx-auto pt-2">
              Curious to know more about my work and process?<br />
              Let's connect and talk about what really matters.
            </p>

            <p className="text-[11px] font-mono text-neutral-600 pt-8">
              © 2026 Subham Santra. Built with React & TailwindCSS.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
