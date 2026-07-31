import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function KineticHeading() {
  const cardRef = useRef(null);

  // Raw Motion Values for Mouse Offset
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth Spring Physics configuration
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized offset from center (-0.5 to 0.5)
    const normX = (e.clientX - rect.left) / width - 0.5;
    const normY = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(normX);
    mouseY.set(normY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      className="perspective-1000 py-2 inline-block cursor-pointer select-none" 
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative group rounded-3xl p-2 transition-shadow duration-300"
      >
        {/* Subtle Ambient Mouse Light Glow Overlay */}
        <motion.div
          className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-white/10 via-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none"
        />

        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] text-white relative z-10">
          Building at the edge of <br />
          <motion.span 
            style={{ transform: 'translateZ(30px)' }}
            className="inline-block text-neutral-400 font-normal group-hover:text-white transition-colors duration-300"
          >
            engineering and craft.
          </motion.span>
        </h2>
      </motion.div>
    </div>
  );
}
