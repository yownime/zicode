import React from 'react'; // trigger HMR
import { LayoutGrid, Cpu, Code2, Layers, Cloud, Sparkles } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: "Pengembangan Web",
      badge: "REACT, NEXT.JS, TAILWIND",
      desc: "Antarmuka web super cepat dan responsif dengan arsitektur modern. Kami membangun sistem teroptimasi SEO dan aplikasi interaktif.",
      icon: <Code2 className="w-8 h-8" strokeWidth={3} />
    },
    {
      title: "Desain UI/UX",
      badge: "FIGMA, FRAMER MOTION",
      desc: "Mockup interaktif dan prototipe premium. Kami menciptakan sistem desain tingkat tinggi dan interaksi mikro yang berani.",
      icon: <LayoutGrid className="w-8 h-8" strokeWidth={3} />
    },
    {
      title: "Aplikasi Mobile",
      badge: "REACT NATIVE, SWIFT",
      desc: "Solusi mobile lintas platform tanpa batas yang menawarkan performa tingkat native yang mulus dan gerakan yang cair.",
      icon: <Cpu className="w-8 h-8" strokeWidth={3} />
    },
    {
      title: "Sistem Full-Stack",
      badge: "POSTGRESQL, NESTJS",
      desc: "Pemodelan basis data yang kokoh, pengontrol API yang dioptimalkan, dan lapisan cache memori yang sangat cepat tanpa hambatan.",
      icon: <Layers className="w-8 h-8" strokeWidth={3} />
    },
    {
      title: "Cloud & DevOps",
      badge: "AWS, KUBERNETES",
      desc: "Penyebaran server cloud yang mudah diskalakan, pipeline CI/CD otomatis, dan penyeimbang beban dengan uptime tinggi.",
      icon: <Cloud className="w-8 h-8" strokeWidth={3} />
    },
    {
      title: "Pertumbuhan Digital",
      badge: "SEO, PERFORMANCE",
      desc: "Optimasi mesin pencari teknis tingkat lanjut dan web vitals inti untuk mendorong konversi dan lalu lintas organik yang tinggi.",
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
              KAMI WUJUDKAN <br className="hidden md:block"/>
              <span className="inline-block bg-[#FF007F] text-white px-4 py-2 mt-2 border-2 border-white -rotate-1">
                YANG ANDA MAU
              </span>
            </h2>
          </div>
          <p className="text-zinc-400 font-bold text-sm md:text-base max-w-md text-left leading-relaxed">
            Kami memadukan rekayasa teknis dan arahan seni desain tingkat tinggi untuk membangun platform skala besar yang menghasilkan pertumbuhan bisnis Anda.
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
