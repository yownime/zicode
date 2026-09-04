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
    <section id="portfolio" className="relative py-24 px-6 md:px-12 lg:px-24 bg-white select-none overflow-hidden">
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Row */}
        <div className="w-full flex flex-col mb-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b-4 border-black pb-8 w-full gap-8">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase text-black leading-[1.1] max-w-3xl">
              PRODUK DIGITAL YANG <br className="hidden md:block" />
              <span className="bg-[#FF007F] text-white px-3 py-1 mt-2 lg:mt-3 border-4 border-black shadow-[6px_6px_0px_black] -rotate-1 inline-block">MENCURI PERHATIAN.</span>
            </h3>
            <p className="text-gray-800 font-bold text-base md:text-lg max-w-md text-left lg:text-right leading-relaxed border-l-8 lg:border-l-0 lg:border-r-8 border-black pl-6 lg:pl-0 lg:pr-6">
              Kami memadukan desain dan teknologi untuk membangun platform digital yang mendatangkan retensi pengguna dan pertumbuhan bisnis.
            </p>
          </div>
          <div className="flex justify-between items-center pt-6 text-[10px] md:text-xs font-black tracking-widest text-black uppercase">
            <span className="bg-[#FF007F] text-white px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_black] rotate-2">(04)</span>
            <span className="hidden md:inline-block">Selected Showcases</span>
            <span>Our Projects</span>
          </div>
        </div>

        {/* Showcase List Layout (Brutalist Accordion) */}
        <div className="flex flex-col w-full border-t-4 border-black">
          {projects.map((project) => {
            const isActive = activeId === project.id;
            return (
              <div
                key={project.id}
                onMouseEnter={() => setActiveId(project.id)}
                className="py-8 md:py-12 border-b-4 border-black cursor-pointer group transition-all duration-300 hover:bg-gray-50"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left: Number & Title */}
                  <div className="flex items-center gap-4 md:gap-8 flex-1 min-w-0">
                    <span className={`text-sm md:text-lg font-black transition-colors duration-300 ${
                      isActive ? 'text-[#FF007F]' : 'text-gray-400 group-hover:text-black'
                    }`}>
                      /0{project.id}
                    </span>
                    <h4 
                      className={`text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase transition-all duration-300 ${
                        isActive 
                          ? 'text-black translate-x-2 md:translate-x-4' 
                          : 'text-gray-300 group-hover:text-black'
                      }`}
                    >
                      {project.title}
                    </h4>
                  </div>
                  
                  {/* Right: Brutalist Photo + Arrow Icon */}
                  <div className="flex items-center gap-4 md:gap-8 justify-end">
                    {/* Square Photo Container */}
                    <div 
                      className={`relative aspect-square overflow-hidden bg-zinc-900 transition-all duration-500 ease-out shrink-0 ${
                        isActive 
                          ? 'w-24 h-24 md:w-48 md:h-48 border-4 border-black shadow-[8px_8px_0px_#FDE047] scale-105 rotate-2' 
                          : 'w-16 h-16 md:w-32 md:h-32 border-4 border-gray-200 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:border-black'
                      }`}
                    >
                      <div 
                        className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out ${
                          isActive ? 'scale-110' : 'scale-100'
                        }`}
                        style={{ backgroundImage: `url('${project.image}')` }}
                      ></div>
                    </div>

                    {/* Brutalist Arrow Button */}
                    <div className={`p-3 border-4 transition-all duration-300 shrink-0 ${
                      isActive 
                        ? 'border-black bg-[#FF007F] text-white rotate-45 shadow-[4px_4px_0px_black]' 
                        : 'border-gray-200 text-gray-400 group-hover:border-black group-hover:text-black'
                    }`}>
                      <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />
                    </div>
                  </div>
                </div>

                {/* Smooth Expandable Description Block */}
                <div 
                  className={`grid transition-all duration-500 ease-in-out ${
                    isActive 
                      ? 'grid-rows-[1fr] opacity-100 mt-8' 
                      : 'grid-rows-[0fr] opacity-0 h-0 overflow-hidden'
                  }`}
                >
                  <div className="overflow-hidden pl-12 md:pl-[6rem] pr-6 md:pr-48">
                    <span className="inline-block text-[10px] md:text-xs font-black tracking-widest bg-black text-white px-3 py-1.5 uppercase mb-4 shadow-[4px_4px_0px_#00E5FF] -rotate-1">
                      {project.badge}
                    </span>
                    <p className="text-sm md:text-lg text-gray-900 font-bold leading-relaxed max-w-3xl border-l-4 border-black pl-4">
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
