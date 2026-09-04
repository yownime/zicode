import React, { useState, useEffect, useRef } from 'react'; // trigger HMR revert 2
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import InteractiveBackground from './InteractiveBackground';
import fotoSaya from '../assets/foto_saya.png';
import fontImage from '../assets/font.png';
export default function Hero({ onOpenContact }) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const sectionTop = rect.top + window.scrollY;

      const scrolled = window.scrollY - sectionTop;
      const maxScroll = sectionHeight - window.innerHeight;

      if (maxScroll <= 0) return;

      const currentProgress = Math.min(Math.max(scrolled / maxScroll, 0), 1);
      setProgress(currentProgress);
    };

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const brands = [
    { name: 'stripe', svg: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg' },
    { name: 'vercel', svg: 'https://cdn.worldvectorlogo.com/logos/vercel.svg' },
    { name: 'figma', svg: 'https://cdn.worldvectorlogo.com/logos/figma-5.svg' },
    { name: 'supabase', svg: 'https://cdn.worldvectorlogo.com/logos/supabase.svg' },
    { name: 'google cloud', svg: 'https://cdn.worldvectorlogo.com/logos/google-cloud-1.svg' },
    { name: 'react', svg: 'https://cdn.worldvectorlogo.com/logos/react-2.svg' },
    { name: 'docker', svg: 'https://cdn.worldvectorlogo.com/logos/docker.svg' },
    { name: 'aws', svg: 'https://cdn.worldvectorlogo.com/logos/amazon-web-services-2.svg' },
  ];

  const showcaseImages = [
    {
      url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop',
      title: 'Zicode Web Platform v3',
      badge: 'Next-Gen Interface'
    },
    {
      url: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?q=80&w=1200&auto=format&fit=crop',
      title: 'Orion Fitness Companion',
      badge: 'Mobile App Engineering'
    },
    {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      title: 'Aura Capital Dashboard',
      badge: 'Fintech Platform UI'
    }
  ];

  // Normalize progress for Page 2
  // t1: Phase 1 (0 to 0.3) - text fades out, card expands to fullscreen
  const t1 = Math.min(progress / 0.3, 1);
  const textOpacity = 1 - t1;
  const textTranslateX = -t1 * 50;

  // t2: Phase 2 (0.3 to 1.0) - horizontal scroll of mockup images
  const t2 = Math.max(0, (progress - 0.3) / 0.7);

  // Dynamic Styles for Desktop (Initial state is even wider: 54vw wide, starting at 42vw left, 4vw right)
  const leftVal = 42 * (1 - t1);
  const rightVal = 4 * (1 - t1);
  const cardStyles = isDesktop ? {
    position: 'absolute',
    left: `${leftVal}vw`,
    right: `${rightVal}vw`,
    top: `calc((50vh - 16.875vw) * ${1 - t1})`,
    bottom: `calc((50vh - 16.875vw) * ${1 - t1})`,
    borderRadius: `${16 * (1 - t1)}px`,
    borderWidth: `${1 - t1}px`,
  } : {};

  return (
    <>
      <section className="relative h-screen flex flex-col justify-end items-center overflow-hidden bg-coral pb-0 select-none">
        {/* Faded Grid Background */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-90 bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1.5px,transparent_1.5px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1.5px,transparent_1.5px)] bg-[size:4rem_4rem] animate-grid-move"
          style={{ maskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)', WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)' }}
        ></div>





        {/* Diagonal Marquee Tapes (Crossed perfectly in the center, Behind Profile) */}
        {/* Pink Tape (Reverse) */}
        <div className="absolute top-[70%] md:top-[65%] left-[-10%] w-[120%] h-12 md:h-14 bg-[#FF007F] rotate-[8deg] md:rotate-[4deg] z-[4] border-y-4 border-black overflow-hidden flex items-center shadow-[4px_8px_0px_rgba(0,0,0,1)]">
          <div className="flex w-max animate-marquee whitespace-nowrap [animation-direction:reverse]">
             {[...Array(4)].map((_, i) => (
               <div key={`pink-${i}`} className="flex shrink-0 items-center text-white font-black uppercase tracking-widest text-sm md:text-lg">
                 <span className="px-4">✦ BEYOND LIMITS</span>
                 <span className="px-4">✦ INNOVATIVE DESIGN</span>
                 <span className="px-4">✦ WEB EXPERIENCES</span>
               </div>
             ))}
          </div>
        </div>

        {/* Yellow Tape (Forward) */}
        <div className="absolute top-[70%] md:top-[65%] left-[-10%] w-[120%] h-12 md:h-14 bg-[#FDE047] -rotate-[8deg] md:-rotate-[4deg] z-[5] border-y-4 border-black overflow-hidden flex items-center shadow-[4px_8px_0px_rgba(0,0,0,1)]">
          <div className="flex w-max animate-marquee whitespace-nowrap">
             {[...Array(4)].map((_, i) => (
               <div key={`yellow-${i}`} className="flex shrink-0 items-center text-black font-black uppercase tracking-widest text-sm md:text-lg">
                 <span className="px-4">✦ FRONTEND WIZARD</span>
                 <span className="px-4">✦ PIXEL PERFECT</span>
                 <span className="px-4">✦ ALWAYS LEARNING</span>
                 <span className="px-4">✦ LET'S COLLABORATE</span>
               </div>
             ))}
          </div>
        </div>

        {/* Minimalist Top Anchors */}
        {/* Top Left: Location/Info */}
        <div className="absolute top-8 md:top-10 left-6 md:left-12 z-30 hidden md:block">
          <p className="text-white/50 text-xs font-medium uppercase tracking-widest text-left leading-relaxed">
            Berbasis di<br/>
            <span className="text-white font-bold">Indonesia</span>
          </p>
        </div>

        {/* Status Pill (Centered below logo on mobile, Top Right on desktop) */}
        <div className="absolute top-36 md:top-10 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-12 z-30 w-max">
          <button 
            onClick={onOpenContact}
            className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full text-black text-[10px] md:text-xs font-black uppercase tracking-widest hover:scale-105 hover:shadow-lg transition-all cursor-pointer shadow-md"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Tersedia untuk Proyek
          </button>
        </div>

        {/* Small Logo Graphic (Top) */}
        <div className="absolute top-6 md:top-8 z-20 max-w-[120px] md:max-w-[160px] animate-reveal">
          <img src={fontImage} alt="Logo" className="w-full h-auto object-contain drop-shadow-md" />
        </div>

        {/* Profile Image (Bottom Center) */}
        <div className="relative z-10 w-[85%] max-w-[380px] md:w-auto md:max-w-[480px] animate-reveal" style={{ animationDelay: '150ms' }}>
          <img src={fotoSaya} alt="Ziky Profile" className="w-full h-auto object-contain drop-shadow-[0px_-10px_20px_rgba(0,0,0,0.2)]" />
        </div>
      </section>

      {/* 2. Area Konten Bawah (CTA & Mockups) - Page 2 with Horizontal Scroll Showcase */}
      <section ref={containerRef} className="relative h-[300vh] bg-black border-t border-white/5">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-black px-6 md:px-12">

          <div className="max-w-7xl mx-auto w-full flex flex-col gap-10">
            {/* Header Row (as shown in the mockup) */}
            <div className="w-full flex flex-col select-none">
              <div className="flex justify-between items-end border-b border-white/10 pb-4 w-full">
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase text-white leading-none flex flex-wrap items-center">
                  <span>SOLUSI DIGITAL YANG</span>
                  <span className="bg-[#FF007F] text-white px-4 py-2 ml-3 inline-block select-none border-2 border-white shadow-[6px_6px_0px_white] -rotate-2 mt-2 md:mt-0">TERHUBUNG & BERDAMPAK</span>
                </h3>
                <span className="text-xs md:text-sm font-black tracking-widest uppercase text-zinc-500">
                  KARYA KAMI
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                <span>(01)</span>
                <span>Karya Terpilih</span>
              </div>
            </div>

            {/* Horizontal Showcase Cards Strip */}
            <div className="w-full overflow-visible">
              <div
                className="flex flex-row gap-8 transition-transform duration-300 ease-out"
                style={{
                  transform: isDesktop ? `translateX(-${progress * 45}vw)` : 'none',
                  width: isDesktop ? '145vw' : '100%'
                }}
              >
                {showcaseImages.map((image, index) => (
                  <div
                    key={index}
                    className="w-full lg:w-[42vw] shrink-0 flex flex-col text-left"
                  >
                    {/* Image wrapper (Brutalist Style) */}
                    <div className="relative w-full aspect-[16/10] bg-zinc-900 border-4 border-white shadow-[8px_8px_0px_white] overflow-hidden group hover:-translate-y-2 hover:translate-x-2 hover:shadow-[4px_4px_0px_white] transition-all duration-300">
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-85 group-hover:scale-105 transition-transform duration-700"
                        style={{ backgroundImage: `url('${image.url}')` }}
                      ></div>
                      {/* Brutalist badge overlay */}
                      <div className="absolute top-4 right-4 px-4 py-1.5 bg-[#FDE047] text-black border-2 border-black font-black text-[10px] tracking-widest uppercase shadow-[4px_4px_0px_rgba(0,0,0,1)] -rotate-2">
                        {image.badge}
                      </div>
                    </div>

                    {/* Info below image */}
                    <div className="flex flex-row justify-between items-start gap-4 mt-4 px-1">
                      <div className="w-1/2">
                        <h4 className="text-lg md:text-xl font-black text-white uppercase tracking-tight leading-tight">
                          {image.title}
                        </h4>
                      </div>
                      <div className="w-1/2">
                        <p className="text-xs text-zinc-400 leading-normal max-w-[280px]">
                          {index === 0 && 'Sistem dasbor berperforma tinggi dan analitik alokasi keuangan tingkat lanjut yang dirancang untuk skala institusi.'}
                          {index === 1 && 'Dasbor pemantauan kesehatan generasi berikutnya yang berisi metrik telemetri waktu-nyata dan overlay kepelatihan.'}
                          {index === 2 && 'Dasbor fintech kustom, pelacakan smart contract otomatis, dan API perutean aset keuangan yang aman.'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Tech Ticker Section (Separate Full-Width Divider below Page 2) */}
      <section className="relative w-full bg-black pt-16 pb-12 overflow-hidden z-10 px-6 md:px-12 select-none">

        {/* Giant Running Text */}
        <div className="relative w-full overflow-hidden mb-6 py-4">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

          <div className="flex w-max animate-marquee whitespace-nowrap">
            {/* First run */}
            <div className="flex shrink-0 items-center text-5xl md:text-7xl lg:text-[7.5rem] font-black tracking-tighter text-white uppercase leading-none pr-12 select-none">
              <span>CODE THAT IMPACTS &nbsp;&bull;&nbsp; DESIGN THAT CONNECTS &nbsp;&bull;&nbsp; PRODUCTS THAT SCALE &nbsp;&bull;&nbsp;</span>
            </div>
            {/* Second run for seamless looping */}
            <div className="flex shrink-0 items-center text-5xl md:text-7xl lg:text-[7.5rem] font-black tracking-tighter text-white uppercase leading-none pr-12 select-none">
              <span>CODE THAT IMPACTS &nbsp;&bull;&nbsp; DESIGN THAT CONNECTS &nbsp;&bull;&nbsp; PRODUCTS THAT SCALE &nbsp;&bull;&nbsp;</span>
            </div>
          </div>
        </div>

        {/* Separator and Info Row */}
        <div className="max-w-7xl mx-auto w-full flex flex-col mt-4">
          <div className="border-b border-white/10 w-full mb-3"></div>
          <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
            <span className="w-1/4 text-left">(02)</span>
            <span className="w-2/4 text-center">High-Fidelity Engineering & Design Systems</span>
            <div className="w-1/4 flex justify-end">
              <span className="bg-gradient-to-r from-coral to-blue-600 text-white font-bold px-3 py-1 rounded-md text-[8px] tracking-wider uppercase select-none">
                OUR TECH STACK
              </span>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}
