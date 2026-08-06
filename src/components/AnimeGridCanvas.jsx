import React, { useEffect, useRef } from 'react';

export default function AnimeGridCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse position tracker with smooth lerp physics
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 180
    };

    // Grid Dot parameters
    const gap = 32;
    const cols = Math.ceil(width / gap) + 2;
    const rows = Math.ceil(height / gap) + 2;

    class Point {
      constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.size = 1.6;
      }

      update() {
        // Distance to mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Repulsion / Warp force on cursor movement
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 12;
          const angle = Math.atan2(dy, dx);
          this.vx -= Math.cos(angle) * force * 0.4;
          this.vy -= Math.sin(angle) * force * 0.4;
        }

        // Damped spring return to home position
        const homeDx = this.baseX - this.x;
        const homeDy = this.baseY - this.y;
        this.vx += homeDx * 0.05;
        this.vy += homeDy * 0.05;

        // Friction / Damping
        this.vx *= 0.85;
        this.vy *= 0.85;

        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.8;
          ctx.fillStyle = `rgba(56, 189, 248, ${0.2 + alpha})`;
          ctx.shadowColor = '#06b6d4';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = 'rgba(99, 102, 241, 0.22)';
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }
    }

    // Create point grid
    let points = [];
    const initGrid = () => {
      points = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          points.push(new Point(c * gap, r * gap));
        }
      }
    };
    initGrid();

    // Event listeners
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initGrid();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('resize', handleResize);

    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Lerp mouse coordinates smoothly
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      // Update & draw grid points
      for (let i = 0; i < points.length; i++) {
        points[i].update();
        points[i].draw();
      }

      // Draw subtle connecting lines near cursor
      ctx.lineWidth = 0.8;
      for (let i = 0; i < points.length; i += 3) {
        const dx = mouse.x - points[i].x;
        const dy = mouse.y - points[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(129, 140, 248, ${0.25 * (1 - dist / 120)})`;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
}
