import React from 'react';
import { ArrowUp, Globe, Link2, Share2, MessageSquare } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-coral text-white w-full pt-20 pb-8 px-6 md:px-12 relative overflow-hidden">
      
      {/* Background large watermark */}
      <div className="absolute bottom-0 right-0 text-[15rem] md:text-[25rem] font-black tracking-tighter opacity-[0.03] select-none pointer-events-none leading-none -mb-16 -mr-16 text-black">
        ZICODE
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
          
          {/* Column 1: Main navigation links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/60 border-b border-white/15 pb-2">
              NAVIGATION
            </h4>
            <ul className="flex flex-col gap-3 text-lg font-black tracking-tight uppercase">
              <li><a href="#portfolio" className="hover:text-black transition-colors">PROJECTS</a></li>
              <li><a href="#" className="hover:text-black transition-colors">WHAT WE DO</a></li>
              <li><a href="#" className="hover:text-black transition-colors">TECH STACK</a></li>
              <li><a href="#" className="hover:text-black transition-colors">CAREERS</a></li>
            </ul>
          </div>

          {/* Column 2: Legal links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/60 border-b border-white/15 pb-2">
              LEGAL
            </h4>
            <ul className="flex flex-col gap-3 text-sm font-semibold uppercase tracking-wider">
              <li><a href="#" className="hover:text-black transition-colors">PRIVACY POLICY</a></li>
              <li><a href="#" className="hover:text-black transition-colors">TERMS OF SERVICE</a></li>
              <li><a href="#" className="hover:text-black transition-colors">COOKIE POLICY</a></li>
              <li><a href="#" className="hover:text-black transition-colors">SECURITY REPORT</a></li>
            </ul>
          </div>

          {/* Column 3: Social handles */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/60 border-b border-white/15 pb-2">
              DEV & SOCIAL
            </h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="flex items-center gap-2 hover:text-black font-semibold transition-colors text-sm">
                <Globe className="w-4 h-4" /> GITHUB
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-black font-semibold transition-colors text-sm">
                <Link2 className="w-4 h-4" /> LINKEDIN
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-black font-semibold transition-colors text-sm">
                <Share2 className="w-4 h-4" /> INSTAGRAM
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-black font-semibold transition-colors text-sm">
                <MessageSquare className="w-4 h-4" /> TWITTER
              </a>
            </div>
          </div>

          {/* Column 4: Contact details */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/60 border-b border-white/15 pb-2">
              GET IN TOUCH
            </h4>
            <div className="flex flex-col gap-2 text-sm font-bold">
              <a href="mailto:hello@zicode.com" className="text-lg font-black hover:text-black transition-colors block">
                hello@zicode.com
              </a>
              <p className="mt-2 text-white/90 font-medium">+1 (555) 019-2831</p>
              <p className="text-white/90 font-medium leading-relaxed">
                100 Innovation Parkway,<br />
                Suite 400, Tech District
              </p>
            </div>
          </div>

        </div>

        {/* Lower footer */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-white">ZICODE.</span>
            <span className="text-xs font-mono text-white/70">© 2026 Zicode. All rights reserved.</span>
          </div>

          {/* Scroll to Top */}
          <button 
            onClick={handleScrollToTop}
            className="w-12 h-12 rounded-full border border-white/20 hover:border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
