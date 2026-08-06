import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { RefreshCw, Play, Pause } from 'lucide-react';
import TextReveal from './TextReveal';

const skillsList = [
  { name: 'React 18', category: 'FRONTEND', color: '#61DAFB' },
  { name: 'Next.js 16', category: 'FRONTEND', color: '#FFFFFF' },
  { name: 'TypeScript', category: 'FRONTEND', color: '#3178C6' },
  { name: 'TailwindCSS', category: 'FRONTEND', color: '#06B6D4' },
  { name: 'Framer Motion', category: 'FRONTEND', color: '#0055FF' },
  { name: 'GSAP', category: 'FRONTEND', color: '#88CE02' },
  { name: 'Lenis', category: 'FRONTEND', color: '#FF0055' },
  { name: 'Node.js', category: 'BACKEND', color: '#5FA04E' },
  { name: 'Express', category: 'BACKEND', color: '#E5E7EB' },
  { name: 'Prisma ORM', category: 'BACKEND', color: '#2D3748' },
  { name: 'IndexedDB PWA', category: 'ARCHITECTURE', color: '#F59E0B' },
  { name: 'Docker', category: 'DEVOPS', color: '#2496ED' },
  { name: 'Redis', category: 'BACKEND', color: '#DC382D' },
  { name: 'PostgreSQL', category: 'BACKEND', color: '#4169E1' },
  { name: 'WebSockets', category: 'REALTIME', color: '#A855F7' }
];

export default function GravitySkillsCanvas() {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [resetCount, setResetCount] = useState(0);

  useEffect(() => {
    if (!sceneRef.current) return;

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;

    const width = sceneRef.current.clientWidth || 800;
    const height = 450;

    // 1. Create Engine
    const engine = Engine.create({
      gravity: { x: 0, y: 0.9 }
    });
    engineRef.current = engine;

    // 2. Create Render
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: 'transparent'
      }
    });

    // 3. Create Ground & Walls
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Bodies.rectangle(width / 2, height + 25, width + 400, 50, wallOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height * 2, wallOptions);

    Composite.add(engine.world, [ground, leftWall, rightWall]);

    // 4. Create Badge Bodies
    const badgeBodies = skillsList.map((skill, index) => {
      const badgeWidth = Math.min(180, 110 + skill.name.length * 5);
      const badgeHeight = 44;
      const startX = Math.random() * (width - 240) + 120;
      const startY = 30 + (index % 4) * 55; // Initial visible grid positioning before falling

      const body = Bodies.rectangle(startX, startY, badgeWidth, badgeHeight, {
        chamfer: { radius: 18 },
        restitution: 0.65,
        friction: 0.1,
        density: 0.002,
        render: { visible: false } // Custom render handles graphics
      });

      body.skillData = skill;
      body.badgeWidth = badgeWidth;
      body.badgeHeight = badgeHeight;
      return body;
    });

    Composite.add(engine.world, badgeBodies);

    // 5. Add Mouse Control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Composite.add(engine.world, mouseConstraint);

    // 6. Custom Drawing Event After Physics Step
    Events.on(render, 'afterRender', () => {
      const ctx = render.context;

      badgeBodies.forEach((body) => {
        const { x, y } = body.position;
        const angle = body.angle;
        const skill = body.skillData;
        const bw = body.badgeWidth;
        const bh = body.badgeHeight;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        // Glass Card Outer Box
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 18);
        } else {
          ctx.rect(-bw / 2, -bh / 2, bw, bh);
        }
        ctx.fillStyle = '#0f0f17';
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = skill.color + '80';
        ctx.stroke();

        // Accent Glow Dot
        ctx.beginPath();
        ctx.arc(-bw / 2 + 18, 0, 4, 0, Math.PI * 2);
        ctx.fillStyle = skill.color;
        ctx.shadowColor = skill.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Skill Name Text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '600 12px "Space Mono", monospace, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(skill.name, 4, -3);

        // Skill Category Text
        ctx.fillStyle = '#9CA3AF';
        ctx.font = '8px monospace';
        ctx.fillText(skill.category, 4, 10);

        ctx.restore();
      });
    });

    // 7. Run Physics & Render
    Render.run(render);
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [resetCount]);

  const togglePause = () => {
    if (!runnerRef.current) return;
    if (isPaused) {
      Matter.Runner.run(runnerRef.current, engineRef.current);
    } else {
      Matter.Runner.stop(runnerRef.current);
    }
    setIsPaused(!isPaused);
  };

  return (
    <section id="skills" className="space-y-8 pt-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">03 — SKILLS & TOOLING</span>
            <div className="h-[1px] w-16 bg-neutral-800"></div>
          </div>
          <TextReveal
            text="Gravity Physics Drop."
            as="h2"
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white"
            staggerDelay={0.05}
          />
        </div>

        {/* Physics Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePause}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white hover:border-neutral-700 transition-all"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span>{isPaused ? 'RESUME GRAVITY' : 'PAUSE GRAVITY'}</span>
          </button>
          <button
            onClick={() => setResetCount(prev => prev + 1)}
            className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
            title="Redrop Skill Pills"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Matter.js Physics Canvas Container */}
      <div className="relative rounded-3xl bg-neutral-950/90 border border-neutral-900 overflow-hidden shadow-2xl">
        <div className="absolute top-4 left-6 z-10 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase">
            2D MATTER.JS RIGID BODY ENGINE
          </span>
        </div>

        <div 
          ref={sceneRef} 
          className="w-full h-[450px] cursor-grab active:cursor-grabbing relative"
        />

        <div className="absolute bottom-4 right-6 pointer-events-none text-right">
          <p className="text-[11px] font-mono text-neutral-600">
            🖱️ Click, grab, drag, & toss skill pills to watch gravity colliders react
          </p>
        </div>
      </div>
    </section>
  );
}
