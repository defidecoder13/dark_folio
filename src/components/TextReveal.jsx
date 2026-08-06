import React from 'react';
import { motion } from 'framer-motion';

export default function TextReveal({
  text,
  className = '',
  as = 'h2',
  staggerDelay = 0.08,
  baseDelay = 0.2,
  mode = 'words' // 'words' or 'characters'
}) {
  const Component = as;

  const items = mode === 'characters' ? text.split('') : text.split(' ');

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: baseDelay
      }
    }
  };

  const itemVariants = {
    hidden: {
      y: '120%',
      opacity: 0,
      rotateX: 45,
      filter: 'blur(4px)'
    },
    visible: {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <Component className={`inline-block ${className}`}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-20px' }}
        variants={containerVariants}
        className="inline-flex flex-wrap gap-x-[0.25em] gap-y-1 overflow-hidden"
      >
        {items.map((item, index) => (
          <span key={index} className="overflow-hidden inline-block py-0.5">
            <motion.span
              variants={itemVariants}
              className="inline-block transform-gpu"
            >
              {item === ' ' ? '\u00A0' : item}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}
