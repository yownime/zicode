import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import InteractiveBackground from './InteractiveBackground';

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
      <section className="relative h-screen flex flex-col justify-between items-center overflow-hidden bg-[#0A0A0A] pt-16 pb-0 select-none">

        {/* Top Decoration Row */}
        <div className="relative z-10 w-full max-w-7xl flex justify-between items-center px-6 md:px-12 pt-6 text-[10px] font-mono tracking-widest text-zinc-500">
          <div className="flex items-center gap-2 w-1/3 justify-start">
            <span className="w-1.5 h-1.5 bg-coral rounded-full animate-ping"></span>
            <span>SYSTEM ACTIVE</span>
          </div>

          {/* Centered Logo ZICODE. */}
          <div className="flex justify-center w-1/3">
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase select-none">
              ZICODE<span className="text-coral">.</span>
            </span>
          </div>

          <div className="flex justify-end w-1/3">
            <span>[ 00 : 00 : EST ]</span>
          </div>
        </div>

        {/* Dynamic Background Particle/Gradient Canvas & Interactive Grid */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
          <div className="absolute top-[20%] left-[10%] w-[30rem] h-[30rem] bg-coral/10 rounded-full blur-[120px] animate-pulse-subtle"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[35rem] h-[35rem] bg-blue-900/15 rounded-full blur-[150px] animate-pulse-subtle" style={{ animationDelay: '1.5s' }}></div>
          {/* Interactive grid pattern overlay - static */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,85,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,85,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        {/* Main Heading */}
        <div className="relative z-10 max-w-4xl mx-auto w-full px-6 md:px-12 text-center animate-reveal flex-grow flex flex-col justify-center items-center select-none">

          <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-black tracking-tighter leading-[0.95] uppercase text-white flex flex-col items-center gap-2">

            {/* Row 1 */}
            <span className="interactive-word block flex gap-[0.2em] justify-center glow-hover">
              {"THE".split("").map((char, index) => (
                <span key={index} className="transition-all duration-300 hover:text-white" style={{ transitionDelay: `${index * 30}ms` }}>{char}</span>
              ))}
              <span className="w-4"></span>
              {"DIGITAL".split("").map((char, index) => (
                <span key={index} className="transition-all duration-300 hover:text-white" style={{ transitionDelay: `${(index + 3) * 30}ms` }}>{char}</span>
              ))}
            </span>

            {/* Row 2 */}
            <span className="interactive-word block flex gap-[0.2em] justify-center glow-hover">
              {"SOLUTION".split("").map((char, index) => (
                <span key={index} className="transition-all duration-300 hover:text-white" style={{ transitionDelay: `${index * 30}ms` }}>{char}</span>
              ))}
              <span className="w-4"></span>
              {"YOU'VE".split("").map((char, index) => (
                <span key={index} className="transition-all duration-300 hover:text-white" style={{ transitionDelay: `${(index + 6) * 30}ms` }}>{char}</span>
              ))}
            </span>

            {/* Row 3 */}
            <span className="interactive-word block flex gap-[0.2em] justify-center glow-hover whitespace-nowrap">
              {"BEEN".split("").map((char, index) => (
                <span key={index} className="transition-all duration-300 hover:text-white" style={{ transitionDelay: `${index * 30}ms` }}>{char}</span>
              ))}
              <span className="w-4"></span>
              <span className="relative inline-flex items-center flicker-active-1 whitespace-nowrap">
                {/* Figma Cursor 1 (ZICODE - Electric Blue Theme) */}
                <span className="absolute top-0 left-0 animate-figma-cursor-1 flex items-start gap-1 z-30 pointer-events-none">
                  <svg className="w-4 h-4 text-blue-500 fill-current drop-shadow-md" viewBox="0 0 24 24">
                    <path d="M4.5 3v15.2l4.7-4.3 3.8 8.8 3.5-1.5-3.8-8.8 6-0.6Z" />
                  </svg>
                  <span className="bg-blue-500 text-white text-[8px] font-mono px-1.5 py-0.5 rounded-sm font-bold shadow-md uppercase tracking-wider">
                    ZICODE
                  </span>
                </span>

                {"LOOKING".split("").map((char, index) => (
                  <span key={index} className="transition-all duration-300" style={{ transitionDelay: `${(index + 4) * 30}ms` }}>{char}</span>
                ))}
              </span>
              <span className="w-4"></span>
              {"FOR".split("").map((char, index) => (
                <span key={index} className="transition-all duration-300 hover:text-white" style={{ transitionDelay: `${(index + 11) * 30}ms` }}>{char}</span>
              ))}
            </span>

          </h1>
        </div>

        {/* Scroll Hint at absolute bottom of first viewport fold */}
        <div className="relative z-10 w-full flex flex-col items-center gap-4 pb-8">
          <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase animate-bounce">SCROLL TO DISCOVER ↓</span>
        </div>
      </section>

      {/* 2. Area Konten Bawah (CTA & Mockups) - Page 2 with Horizontal Scroll Showcase */}
      <section ref={containerRef} className="relative h-[300vh] bg-black border-t border-white/5">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-black px-6 md:px-12">

          <div className="max-w-7xl mx-auto w-full flex flex-col gap-10">
            {/* Header Row (as shown in the mockup) */}
            <div className="w-full flex flex-col select-none">
              <div className="flex justify-between items-end border-b border-white/10 pb-4 w-full">
                <h3 className="text-xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase text-white leading-none flex flex-wrap items-center">
                  <span>DIGITAL SOLUTIONS THAT</span>
                  <span className="bg-coral text-white px-3 py-1.5 ml-2.5 inline-block select-none rounded-xl">CONNECT & PERFORM</span>
                </h3>
                <span className="text-xs md:text-sm font-black tracking-widest uppercase text-zinc-500">
                  THE WORK
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                <span>(01)</span>
                <span>Selected Showcases</span>
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
                    {/* Image wrapper */}
                    <div className="relative w-full aspect-[16/10] bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl group hover:border-coral/40 transition-all duration-500">
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-85 group-hover:scale-105 transition-transform duration-700"
                        style={{ backgroundImage: `url('${image.url}')` }}
                      ></div>
                      {/* Glassmorphism badge overlay */}
                      <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur rounded text-[9px] font-bold text-coral tracking-widest uppercase border border-white/5">
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
                          {index === 0 && 'High-performing dashboard systems and advanced financial allocation analytics designed for institutional scale.'}
                          {index === 1 && 'Next-gen health monitoring dashboard containing real-time telemetry metrics and coaching overlays.'}
                          {index === 2 && 'Custom fintech dashboards, automated smart contract tracking, and secure financial asset routing APIs.'}
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
