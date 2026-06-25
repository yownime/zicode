import React, { useEffect, useState } from 'react';

export default function Navbar({ onOpenContact }) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Navbar sticks when the page scrolls past the first fold (height of the viewport)
      if (window.scrollY >= window.innerHeight - 70) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`left-0 w-full z-50 backdrop-blur-md bg-black/85 transition-[padding,background-color,border-color] duration-300 ${
        isSticky 
          ? 'fixed top-0 translate-y-0 border-b border-white/10 py-3 shadow-lg px-6 md:px-12' 
          : 'absolute top-[100vh] -translate-y-full border-t border-white/10 py-4 px-6 md:px-12'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
        {/* Brand Logo */}
        <a href="#" className="text-xl font-black tracking-tighter text-white uppercase select-none shrink-0">
          ZICODE<span className="text-coral">.</span>
        </a>

        {/* Separator */}
        <span className="text-zinc-700 font-light text-sm hidden md:inline">|</span>
        
        {/* Distributed Desktop Links */}
        <a href="#services" className="hidden md:inline hover:text-white transition-colors duration-200">
          Services
        </a>
        <a href="#portfolio" className="hidden md:inline hover:text-white transition-colors duration-200">
          Portfolio
        </a>
        <a href="#blog" className="hidden md:inline hover:text-white transition-colors duration-200">
          Blog
        </a>
        <a href="#testimonials" className="hidden md:inline hover:text-white transition-colors duration-200">
          Testimonials
        </a>
        <button onClick={onOpenContact} className="hidden md:inline hover:text-white transition-colors duration-200 uppercase">
          Get in touch
        </button>

        {/* Right Side: CTA Button & Mobile Trigger */}
        <div className="flex items-center gap-4 shrink-0">
          <button 
            onClick={onOpenContact}
            className="px-6 py-2.5 bg-black border border-white/20 hover:border-white text-white font-bold text-[10px] tracking-widest hover:bg-white hover:text-black transition-all duration-300 rounded-full uppercase"
          >
            LET'S BUILD
          </button>
          
          {/* Mobile hamburger icon */}
          <button 
            onClick={onOpenContact}
            className="md:hidden w-9 h-9 flex flex-wrap gap-1 p-2 items-center justify-center border border-white/10 hover:border-coral/50 rounded-full hover:bg-white/5 transition-all duration-300 group"
            aria-label="Toggle Menu"
          >
            <span className="w-1.5 h-1.5 bg-white group-hover:bg-coral transition-colors duration-300 rounded-sm"></span>
            <span className="w-1.5 h-1.5 bg-white group-hover:bg-coral transition-colors duration-300 rounded-sm"></span>
            <span className="w-1.5 h-1.5 bg-white group-hover:bg-coral transition-colors duration-300 rounded-sm"></span>
            <span className="w-1.5 h-1.5 bg-white group-hover:bg-coral transition-colors duration-300 rounded-sm"></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
