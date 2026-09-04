import React from 'react'; // trigger HMR for Services.jsx
import { LayoutGrid, Cpu, Code2, Layers, Cloud, Sparkles } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: "Custom Web Dev",
      badge: "REACT, NEXT.JS, TAILWIND",
      desc: "Blazing-fast, responsive web interfaces structured with modern architecture. We construct SEO-optimized storefronts and interactive applications.",
      icon: <Code2 className="w-8 h-8" strokeWidth={3} />
    },
    {
      title: "UI/UX Design",
      badge: "FIGMA, FRAMER MOTION",
      desc: "Interactive, premium mockups and prototypes. We create high-fidelity design systems and bold micro-interactions.",
      icon: <LayoutGrid className="w-8 h-8" strokeWidth={3} />
    },
    {
      title: "Mobile Eng",
      badge: "REACT NATIVE, SWIFT",
      desc: "Seamless cross-platform mobile solutions offering smooth native-level performance and fluid gestures.",
      icon: <Cpu className="w-8 h-8" strokeWidth={3} />
    },
    {
      title: "Full-Stack Sys",
      badge: "POSTGRESQL, NESTJS",
      desc: "Robust databases modeling, optimized API controllers, and fast memory caching layers ensuring zero bottleneck.",
      icon: <Layers className="w-8 h-8" strokeWidth={3} />
    },
    {
      title: "Cloud & DevOps",
      badge: "AWS, KUBERNETES",
      desc: "Scalable cloud server deployment, automatic CI/CD pipelines, and high-uptime load balancers.",
      icon: <Cloud className="w-8 h-8" strokeWidth={3} />
    },
    {
      title: "Digital Growth",
      badge: "SEO, PERFORMANCE",
      desc: "Advanced technical search-engine optimization and core web vitals optimization to drive conversion and organic traffic.",
      icon: <Sparkles className="w-8 h-8" strokeWidth={3} />
    }
  ];

  return (
    <section id="services" className="relative py-24 px-6 md:px-12 lg:px-24 bg-black select-none overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-white/20 pb-8 mb-16 gap-8">
          <div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase text-white leading-tight">
              WE DO WHAT <br className="hidden md:block"/>
              <span className="inline-block bg-[#FF007F] text-white px-4 py-2 mt-2 border-2 border-white -rotate-1">
                YOU WANT
              </span>
            </h2>
          </div>
          <p className="text-zinc-400 font-bold text-sm md:text-base max-w-md text-left leading-relaxed">
            We bridge core engineering and sleek art direction to build scalable platforms that deliver exceptional user retention and business-driven growth.
          </p>
        </div>

        {/* Clean Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => (
            <div key={idx} className="bg-black border-4 border-white p-8 flex flex-col justify-start hover:bg-zinc-900 transition-colors duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white text-black">
                  {svc.icon}
                </div>
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                {svc.title}
              </h3>
              <div className="mb-4">
                <span className="inline-block bg-[#FDE047] text-black text-[10px] font-black px-2 py-1 uppercase tracking-widest">
                  {svc.badge}
                </span>
              </div>
              <p className="text-zinc-400 font-medium text-sm leading-relaxed">
                {svc.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
