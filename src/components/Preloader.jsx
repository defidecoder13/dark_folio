import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loaderWords = [
  'INITIALIZING',
  'SUBHAM SANTRA',
  'CREATIVE DEVELOPER',
  'PWA ARCHITECTURE',
  'SYSTEMS & CRAFT',
  'WELCOME'
];

export default function Preloader({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [counter, setCounter] = useState(0);

  // Counter 0% to 100% animation
  useEffect(() => {
    const duration = 2200; // total duration in ms
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev + increment >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Word sequence animation
  useEffect(() => {
    if (index < loaderWords.length - 1) {
      const timeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 350);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  // Trigger onComplete when counter reaches 100%
  useEffect(() => {
    if (counter >= 100) {
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [counter, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-100%',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#030303] px-8 py-10 text-white font-mono selection:bg-none"
    >
      {/* Top Status Header */}
      <div className="flex items-center justify-between text-xs tracking-widest text-neutral-500 uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-neutral-300">SUBHAM / PORTFOLIO</span>
        </div>
        <span>2026 EDITION</span>
      </div>

      {/* Center Cinematic Typography Sequence */}
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Animated Bracket Container */}
        <div className="flex items-center gap-3">
          <span className="text-neutral-600 text-xl font-light sm:text-3xl">[</span>
          
          <div className="h-10 sm:h-14 overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={loaderWords[index]}
                initial={{ y: 40, opacity: 0, filter: 'blur(8px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -40, opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="text-xl sm:text-3xl font-semibold tracking-wider text-white uppercase text-center"
              >
                {loaderWords[index]}
              </motion.span>
            </AnimatePresence>
          </div>

          <span className="text-neutral-600 text-xl font-light sm:text-3xl">]</span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-48 sm:w-64 h-[2px] bg-neutral-900 rounded-full overflow-hidden relative mt-6">
          <motion.div 
            className="h-full bg-white"
            style={{ width: `${counter}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
      </div>

      {/* Bottom Counter & Matrix Data */}
      <div className="flex items-end justify-between border-t border-neutral-900/80 pt-6">
        <div className="text-[11px] text-neutral-600 space-y-0.5 hidden sm:block">
          <div>LOC: KOLKATA, WB (UTC+5:30)</div>
          <div>STATUS: SYSTEM READY</div>
        </div>

        {/* Giant Numerical Percentage Counter */}
        <div className="text-5xl sm:text-7xl font-bold font-mono tracking-tighter text-neutral-300">
          {Math.floor(counter)}<span className="text-sm font-normal text-neutral-600 ml-1">%</span>
        </div>
      </div>
    </motion.div>
  );
}
