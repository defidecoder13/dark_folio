import React, { useEffect, useRef, useState } from 'react';

export default function ParticleAvatar() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let scrollY = 0;
    const mouse = {
      x: null,
      y: null,
      radius: 80
    };

    class Particle {
      constructor(x, y, r, g, b, a) {
        this.baseX = x;
        this.baseY = y;
        this.x = x + (Math.random() - 0.5) * 100; // Start slightly offset for load effect
        this.y = y + (Math.random() - 0.5) * 100;
        this.vx = 0;
        this.vy = 0;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a / 255;
        this.size = 1.6;
        this.density = (Math.random() * 20) + 8;
        
        // Dispersion properties for scroll transition (radial angle + random fly distance)
        this.angle = Math.random() * Math.PI * 2;
        this.distFactor = (Math.random() * 400) + 200; // Increased distance factor for wider dispersion area
      }

      update() {
        // Disperse particles based on window scroll progress (reaches max dispersion at 500px scroll)
        const scrollFactor = Math.min(1, scrollY / 500);
        const targetX = this.baseX + Math.cos(this.angle) * this.distFactor * scrollFactor;
        // Pushes them radially outwards and drifts them upwards like wind-blown ashes/dust
        const targetY = this.baseY + Math.sin(this.angle) * this.distFactor * scrollFactor - (scrollFactor * 260);

        if (mouse.x === null || mouse.y === null) {
          // Return to dynamic target position (home position shifted by scroll offset)
          const dx = targetX - this.x;
          const dy = targetY - this.y;
          this.vx += dx * 0.08;
          this.vy += dy * 0.08;
        } else {
          // Calculate distance to mouse cursor
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            // Repulsion force
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.vx -= Math.cos(angle) * force * this.density * 0.4;
            this.vy -= Math.sin(angle) * force * this.density * 0.4;
          } else {
            // Return to dynamic target
            const homeDx = targetX - this.x;
            const homeDy = targetY - this.y;
            this.vx += homeDx * 0.08;
            this.vy += homeDy * 0.08;
          }
        }

        // Apply friction/damping
        this.vx *= 0.85;
        this.vy *= 0.85;

        this.x += this.vx;
        this.y += this.vy;
      }

      draw(scrollFactor) {
        // Fade out opacity as scroll dispersion increases
        const opacity = Math.max(0, this.a * (1 - scrollFactor * 0.85));
        ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const img = new Image();
    
    img.onload = () => {
      console.log("ParticleAvatar image loaded successfully.");
      setImageLoaded(true);
      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.clientWidth || 320;
      const containerHeight = container.clientHeight || 400;

      // Expand canvas dimensions to 2x parent width/height for broad dispersion area
      const width = containerWidth * 2;
      const height = containerHeight * 2;

      canvas.width = width;
      canvas.height = height;

      // Draw the image scaled to fit the original container size, centered in the expanded canvas
      const scale = Math.min(containerWidth / img.width, containerHeight / img.height);
      const imgWidth = img.width * scale;
      const imgHeight = img.height * scale;
      const offsetX = (width - imgWidth) / 2;
      const offsetY = (height - imgHeight) / 2;

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, offsetX, offsetY, imgWidth, imgHeight);

      // Scan the pixel coordinates
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      particles = [];

      // Step size controls the density of particles (higher = fewer/faster)
      const step = 4;

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 128) {
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            particles.push(new Particle(x, y, r, g, b, alpha));
          }
        }
      }

      // Start animation loop
      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        const scrollFactor = Math.min(1, scrollY / 500);

        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw(scrollFactor);
        }

        animationFrameId = requestAnimationFrame(animate);
      };

      animate();
    };

    img.crossOrigin = 'anonymous';
    img.src = '/profile-nobg.png';

    // Track mouse movements relative to canvas bounding box
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[350px] sm:min-h-[400px] flex items-center justify-center relative select-none">
      {!imageLoaded && (
        <div className="absolute text-xs font-mono text-neutral-500 animate-pulse">
          SCANNING AVATAR PIXELS...
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] max-w-none pointer-events-auto cursor-crosshair" 
      />
    </div>
  );
}
