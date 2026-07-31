import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X, Sparkles, Download, CheckCircle, ShieldCheck } from 'lucide-react';

export default function BadgeModal({ isOpen, onClose }) {
  const [transformStyle, setTransformStyle] = useState('rotateX(0deg) rotateY(0deg)');

  // 3D Parallax Tilt Effect on Mouse Move
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setTransformStyle(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('rotateX(0deg) rotateY(0deg) scale(1)');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-card rounded-3xl max-w-lg w-full p-8 relative border border-slate-700/80 shadow-2xl overflow-hidden text-center"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* User Profile Avatar */}
            <div className="relative w-20 h-20 mx-auto mb-4">
              <img 
                src="/src/assets/profile.png" 
                alt="Subham Santra" 
                className="w-full h-full object-cover rounded-2xl ring-2 ring-accent-indigo shadow-lg grayscale hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-amber-400 text-dark-950 flex items-center justify-center font-bold text-xs shadow-md">
                ★
              </div>
            </div>

            <h2 className="text-2xl font-display font-bold text-white">
              Wall of Portfolios Featured
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Top 30% Featured Engineering & Design Showcase
            </p>

            {/* 3D Tilt Badge Card Container */}
            <div className="my-8 perspective-1000 flex justify-center">
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: transformStyle,
                  transition: 'transform 0.15s ease-out'
                }}
                className="w-48 h-56 rounded-2xl bg-gradient-to-b from-slate-800 via-slate-900 to-dark-950 border border-slate-700/80 p-6 flex flex-col items-center justify-between shadow-2xl cursor-pointer relative group"
              >
                {/* Glowing Badge Radial */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-indigo/20 to-accent-cyan/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[10px] tracking-wider uppercase">
                  <Sparkles className="w-3 h-3" /> Certified Portfolio
                </div>

                {/* Silver / Gold Emblem */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-slate-400 via-slate-100 to-slate-400 p-[2px] shadow-xl">
                  <div className="w-full h-full rounded-full bg-dark-950 flex items-center justify-center text-amber-400">
                    <Award className="w-12 h-12 stroke-[1.5]" />
                  </div>
                </div>

                <span className="text-xs font-mono font-semibold text-slate-300 tracking-widest">
                  2026 EDITION
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 px-4 leading-relaxed font-light">
              Recognized for technical craftsmanship, clean interactive architecture, and cinematic UI design.
            </p>

            <div className="mt-6">
              <button 
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-accent-indigo hover:bg-indigo-500 text-white font-medium text-sm transition-colors shadow-lg shadow-indigo-500/25"
              >
                Close Showcase
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
