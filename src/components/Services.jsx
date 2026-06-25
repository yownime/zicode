import React from 'react';
import { LayoutGrid, Cpu, Code2, Layers, Cloud, Sparkles } from 'lucide-react';

export default function Services() {
  return (
    <section id="services" className="relative py-24 px-6 md:px-12 bg-zinc-950 border-t border-white/5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[30%] right-[-10%] w-[25rem] h-[25rem] bg-coral/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[25rem] h-[25rem] bg-coral/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-white/10 pb-8 mb-16 gap-6 reveal-on-scroll">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-coral uppercase font-bold block mb-3">// WHAT WE DO</span>
            <h2 className="text-5xl md:text-8xl font-black uppercase text-white leading-none">
              <span className="tracking-tighter">WE DO WHAT</span> <br/>
              <span className="inline-block bg-coral text-white px-5 py-2 md:px-8 md:py-3.5 rounded-2xl md:rounded-[2rem] tracking-tighter mt-4 text-[90%]">
                YOU WANT
              </span>
            </h2>
          </div>
          <p className="text-zinc-400 text-xs md:text-sm lg:text-base max-w-md leading-relaxed text-left">
            We bridge core engineering and sleek art direction to build scalable platforms that deliver exceptional user retention and business-driven growth.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Custom Web Development (col-span-2) */}
          <div className="lg:col-span-2 bg-black border border-white/5 hover:border-coral/40 p-8 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-black/60 transition-all duration-500 group relative overflow-hidden gap-6 reveal-3d">
            <div className="flex-grow">
              <div className="mb-6 p-3 bg-white/5 rounded-2xl inline-block group-hover:bg-coral/10 group-hover:scale-110 transition-all duration-300">
                <Code2 className="w-8 h-8 text-coral" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-coral transition-colors duration-300 text-left">
                Custom Web Development
              </h3>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-4 border-b border-white/5 pb-2 text-left">
                React, Next.js, TypeScript, Tailwind
              </span>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed text-left max-w-md">
                Blazing-fast, responsive web interfaces structured with modern architecture. We construct SEO-optimized storefronts, interactive applications, and enterprise micro-frontends.
              </p>
            </div>
            
            {/* Visual Panel: Code IDE mockup */}
            <div className="hidden sm:block w-64 bg-zinc-900/60 border border-white/10 rounded-2xl p-4 font-mono text-[9px] text-zinc-500 shadow-2xl relative overflow-hidden shrink-0 self-stretch flex flex-col justify-between">
              <div className="flex items-center gap-1.5 mb-3 border-b border-white/5 pb-2">
                <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/60"></div>
                <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
                <span className="text-[8px] text-zinc-600 ml-2">App.tsx</span>
              </div>
              <div className="space-y-1 text-left flex-grow">
                <p className="text-coral">import <span className="text-white">React</span> from <span className="text-zinc-400">'react'</span>;</p>
                <p className="text-coral">const <span className="text-white">AgencyApp</span> = () =&gt; &#123;</p>
                <p className="pl-3 text-zinc-400">const [score, setScore] = useState(100);</p>
                <p className="pl-3 text-coral">return <span className="text-white">&lt;Speed score=&#123;score&#125; /&gt;</span>;</p>
                <p className="text-coral">&#125;;</p>
              </div>
              <div className="absolute right-3 bottom-3 bg-coral/10 text-coral text-[8px] px-2 py-0.5 rounded-full border border-coral/20 font-bold tracking-widest font-mono">
                100% SCORE
              </div>
            </div>
          </div>

          {/* Card 2: UI/UX Digital Design (col-span-1) */}
          <div className="bg-black border border-white/5 hover:border-coral/40 p-8 rounded-3xl flex flex-col justify-between hover:bg-black/60 transition-all duration-500 group relative overflow-hidden gap-6 reveal-3d delay-100">
            <div>
              <div className="mb-6 p-3 bg-white/5 rounded-2xl inline-block group-hover:bg-coral/10 group-hover:scale-110 transition-all duration-300">
                <LayoutGrid className="w-8 h-8 text-coral" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-coral transition-colors duration-300 text-left">
                UI/UX Design
              </h3>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-4 border-b border-white/5 pb-2 text-left">
                Figma, Rive, Framer Motion
              </span>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed text-left mb-6">
                Interactive, premium mockups and prototypes. We create high-fidelity design systems, custom iconography sets, and micro-interactions.
              </p>
            </div>

            {/* Visual Panel: Figma canvas mockup */}
            <div className="relative w-full h-32 bg-zinc-900/40 border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center shrink-0">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:12px_18px]"></div>
              <div className="relative w-32 h-16 border border-coral/30 rounded-xl flex items-center justify-center bg-coral/5 font-mono text-[9px] text-coral font-bold uppercase tracking-widest">
                <span>Auto Layout</span>
                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border border-coral bg-black"></div>
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border border-coral bg-black"></div>
                
                {/* Simulated Figma Cursor */}
                <div className="absolute -bottom-2 -left-4 flex items-center gap-1 animate-pulse">
                  <svg className="w-3.5 h-3.5 text-coral fill-current drop-shadow-lg" viewBox="0 0 24 24">
                    <path d="M4 4l11.733 11.733h-5.867l-3.2 6.4-2.667-1.333 3.2-6.4h-3.2z" />
                  </svg>
                  <span className="bg-coral text-white text-[7px] px-1.5 py-0.5 rounded font-mono font-normal">Zicode.design</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Mobile App Engineering (col-span-1) */}
          <div className="bg-black border border-white/5 hover:border-coral/40 p-8 rounded-3xl flex flex-col justify-between hover:bg-black/60 transition-all duration-500 group relative overflow-hidden gap-6 reveal-3d delay-200">
            <div>
              <div className="mb-6 p-3 bg-white/5 rounded-2xl inline-block group-hover:bg-coral/10 group-hover:scale-110 transition-all duration-300">
                <Cpu className="w-8 h-8 text-coral" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-coral transition-colors duration-300 text-left">
                Mobile Engineering
              </h3>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-4 border-b border-white/5 pb-2 text-left">
                React Native, Swift, Kotlin
              </span>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed text-left mb-6">
                Seamless cross-platform mobile solutions offering smooth native-level performance, fluid gestures, and instant real-time websocket syncs.
              </p>
            </div>

            {/* Visual Panel: Smart device mockup */}
            <div className="relative w-full h-32 bg-zinc-900/40 border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center shrink-0">
              <div className="w-24 h-48 bg-zinc-900 border border-white/10 rounded-2xl p-1.5 flex flex-col justify-between shadow-2xl relative translate-y-12">
                <div className="w-8 h-2.5 bg-zinc-950 rounded-full mx-auto mb-1"></div>
                <div className="flex-1 rounded-xl bg-zinc-950 p-2 flex flex-col gap-1.5 justify-start">
                  <div className="w-full h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-[7px] font-mono text-zinc-600">
                    Scroll Active
                  </div>
                  <div className="w-full h-10 rounded-lg bg-coral/10 border border-coral/20 flex flex-col justify-center items-center">
                    <span className="text-[5px] text-zinc-500 uppercase">TELEMETRY</span>
                    <span className="text-[9px] font-bold text-coral">99.8 FPS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Full-Stack Systems (col-span-2) */}
          <div className="lg:col-span-2 bg-black border border-white/5 hover:border-coral/40 p-8 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-black/60 transition-all duration-500 group relative overflow-hidden gap-6 reveal-3d">
            <div className="flex-grow">
              <div className="mb-6 p-3 bg-white/5 rounded-2xl inline-block group-hover:bg-coral/10 group-hover:scale-110 transition-all duration-300">
                <Layers className="w-8 h-8 text-coral" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-coral transition-colors duration-300 text-left">
                Full-Stack Systems
              </h3>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-4 border-b border-white/5 pb-2 text-left">
                GraphQL, PostgreSQL, NestJS, Redis
              </span>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed text-left max-w-md">
                Robust databases modeling, optimized API controllers, and fast memory caching layers ensuring zero bottleneck data exchanges under traffic spikes.
              </p>
            </div>
            
            {/* Visual Panel: Database nodes / network */}
            <div className="hidden sm:flex flex-col gap-2.5 w-64 font-mono text-[9px] text-zinc-500 bg-zinc-900/60 border border-white/10 rounded-2xl p-4 shrink-0 self-stretch justify-center">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-zinc-400 font-bold">API CONTROLLERS</span>
                <span className="text-green-500 flex items-center gap-1 font-bold">● ACTIVE</span>
              </div>
              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center bg-black/40 p-2 rounded border border-white/5">
                  <span>GET /api/users</span>
                  <span className="text-coral">12ms</span>
                </div>
                <div className="flex justify-between items-center bg-black/40 p-2 rounded border border-white/5">
                  <span>Redis Cache Hit</span>
                  <span className="text-green-400">0.8ms</span>
                </div>
                <div className="flex justify-between items-center bg-black/40 p-2 rounded border border-white/5">
                  <span>Postgres Query</span>
                  <span className="text-yellow-500">22ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Cloud & DevOps (col-span-1) */}
          <div className="bg-black border border-white/5 hover:border-coral/40 p-8 rounded-3xl flex flex-col justify-between hover:bg-black/60 transition-all duration-500 group relative overflow-hidden gap-6 reveal-3d delay-100">
            <div>
              <div className="mb-6 p-3 bg-white/5 rounded-2xl inline-block group-hover:bg-coral/10 group-hover:scale-110 transition-all duration-300">
                <Cloud className="w-8 h-8 text-coral" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-coral transition-colors duration-300 text-left">
                Cloud & DevOps
              </h3>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-4 border-b border-white/5 pb-2 text-left">
                AWS, Docker, Kubernetes, CI/CD
              </span>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed text-left mb-6">
                Scalable cloud server deployment, automatic CI/CD pipelines, infrastructure as code templates, and high-uptime load balancers.
              </p>
            </div>

            {/* Visual Panel: Pipeline steps */}
            <div className="relative w-full h-32 bg-zinc-900/40 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-center px-6 font-mono text-[9px] text-zinc-500 shrink-0">
              <div className="space-y-2 w-full text-left">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-[8px] font-bold">✓</div>
                  <span>Vite Build Successful</span>
                  <span className="ml-auto text-zinc-600">42s</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-[8px] font-bold">✓</div>
                  <span>Run Unit Tests</span>
                  <span className="ml-auto text-zinc-600">18s</span>
                </div>
                <div className="flex items-center gap-2 text-coral">
                  <div className="w-3.5 h-3.5 rounded-full bg-coral/20 text-coral flex items-center justify-center relative">
                    <span className="absolute inset-0 bg-coral rounded-full animate-ping opacity-75"></span>
                    <span className="text-[7px]">●</span>
                  </div>
                  <span>AWS ECS Deployment</span>
                  <span className="ml-auto animate-pulse">Live</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 6: Digital Growth & SEO (col-span-2) */}
          <div className="lg:col-span-2 bg-black border border-white/5 hover:border-coral/40 p-8 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-black/60 transition-all duration-500 group relative overflow-hidden gap-6 reveal-3d delay-200">
            <div className="flex-grow">
              <div className="mb-6 p-3 bg-white/5 rounded-2xl inline-block group-hover:bg-coral/10 group-hover:scale-110 transition-all duration-300">
                <Sparkles className="w-8 h-8 text-coral" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-coral transition-colors duration-300 text-left">
                Digital Growth & SEO
              </h3>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-4 border-b border-white/5 pb-2 text-left">
                GA4, Schema Markup, Speed Optimization
              </span>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed text-left max-w-md">
                Advanced technical search-engine optimization, structural meta mappings, and core web vitals optimization to drive conversion and organic traffic scaling.
              </p>
            </div>
            
            {/* Visual Panel: Growth Chart */}
            <div className="hidden sm:block w-64 bg-zinc-900/60 border border-white/10 rounded-2xl p-4 relative overflow-hidden shrink-0 self-stretch flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] font-mono text-zinc-400 uppercase">Organic Search Reach</span>
                <span className="text-xs font-bold text-coral">+340%</span>
              </div>
              {/* SVG Graphic */}
              <svg className="w-full h-16 text-coral" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 25C20 23 30 10 50 12C70 14 80 2 100 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M0 25C20 23 30 10 50 12C70 14 80 2 100 1V30H0V25Z" fill="url(#paint_bento_grad)" />
                <defs>
                  <linearGradient id="paint_bento_grad" x1="50" y1="0" x2="50" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0055FF" stopOpacity="0.25" />
                    <stop offset="1" stopColor="#0055FF" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
