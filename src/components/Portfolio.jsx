import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      badge: 'FINTECH PLATFORM',
      title: 'AURA CAPITAL',
      desc: 'High-performing transaction management, smart investment allocation interfaces, and institutional liquidity dashboards designed for next-gen financial operators.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: 2,
      badge: 'E-COMMERCE ECOSYSTEM',
      title: 'VELOCITY APPAREL',
      desc: 'High-converting interactive catalog with fluid micro-interactions and headless checkout infrastructure built for rapid scaling.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 3,
      badge: 'AI-POWERED SAAS',
      title: 'SYNAPSE AI',
      desc: 'Seamless machine learning playground, workflow pipelines builder, and visual analytics dashboards for LLM agents orchestration.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 4,
      badge: 'NEXT-GEN MOBILE APP',
      title: 'ORION FITNESS',
      desc: 'Ultra-responsive iOS/Android application displaying real-time bio-metric telemetry overlays, personalized plans, and audio coaching companion.',
      image: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?q=80&w=800&auto=format&fit=crop',
    }
  ];

  const [activeId, setActiveId] = useState(1);

  return (
    <section id="portfolio" className="relative py-24 px-6 md:px-12 bg-black border-t border-white/5 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Row */}
        <div className="w-full flex flex-col mb-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-white/10 pb-6 w-full gap-6">
            <h3 className="text-xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase text-white leading-none max-w-2xl">
              CRAFTING HIGH-IMPACT PRODUCTS FOR AMBITIOUS BRANDS
            </h3>
            <p className="text-zinc-400 text-xs md:text-sm max-w-md text-left lg:text-right leading-relaxed">
              We bridge code and aesthetics to build scalable platforms that deliver exceptional user retention and business-driven growth.
            </p>
          </div>
          <div className="flex justify-between items-center pt-3 text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
            <span>(04)</span>
            <span>Selected Showcases</span>
            <span>Our Projects</span>
          </div>
        </div>

        {/* Showcase List Layout */}
        <div className="flex flex-col w-full border-t border-white/5">
          {projects.map((project) => {
            const isActive = activeId === project.id;
            return (
              <div
                key={project.id}
                onMouseEnter={() => setActiveId(project.id)}
                className="py-8 md:py-10 border-b border-white/5 cursor-pointer group transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left: Number & Title */}
                  <div className="flex items-center gap-6 md:gap-8 flex-1 min-w-0">
                    <span className={`text-xs md:text-sm font-mono transition-colors duration-300 ${
                      isActive ? 'text-coral font-bold' : 'text-zinc-600 group-hover:text-zinc-400'
                    }`}>
                      /0{project.id}
                    </span>
                    <h4 
                      className={`text-2xl md:text-4xl lg:text-6xl font-black tracking-tighter uppercase transition-all duration-500 ${
                        isActive 
                          ? 'text-white translate-x-2' 
                          : 'text-zinc-600 group-hover:text-zinc-400'
                      }`}
                    >
                      {project.title}
                    </h4>
                  </div>
                  
                  {/* Right: Rounded Photo + Arrow Icon */}
                  <div className="flex items-center gap-6 justify-end">
                    {/* Rounded Square Photo */}
                    <div 
                      className={`relative aspect-square rounded-2xl overflow-hidden border bg-zinc-950 transition-all duration-500 ease-out shrink-0 ${
                        isActive 
                          ? 'w-24 h-24 md:w-44 md:h-44 border-coral/50 shadow-lg shadow-coral/10 scale-105' 
                          : 'w-16 h-16 md:w-28 md:h-28 border-white/10 opacity-30 grayscale group-hover:opacity-75 group-hover:grayscale-0'
                      }`}
                    >
                      <div 
                        className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out ${
                          isActive ? 'scale-110' : 'scale-100'
                        }`}
                        style={{ backgroundImage: `url('${project.image}')` }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>

                    {/* Arrow Button */}
                    <div className={`p-3 border rounded-full transition-all duration-300 shrink-0 ${
                      isActive 
                        ? 'border-coral bg-coral text-white rotate-45' 
                        : 'border-white/10 text-zinc-500 group-hover:text-white'
                    }`}>
                      <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                  </div>
                </div>

                {/* Smooth Expandable Description Block */}
                <div 
                  className={`grid transition-all duration-500 ease-in-out ${
                    isActive 
                      ? 'grid-rows-[1fr] opacity-100 mt-6' 
                      : 'grid-rows-[0fr] opacity-0 h-0 overflow-hidden'
                  }`}
                >
                  <div className="overflow-hidden pl-12 md:pl-[4.5rem] pr-6 md:pr-48">
                    <span className="text-[10px] font-mono tracking-widest text-coral uppercase font-bold mb-1 block">
                      {project.badge}
                    </span>
                    <p className="text-xs md:text-sm text-zinc-400 leading-relaxed max-w-3xl">
                      {project.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
