import React from 'react'; // trigger HMR
import { ArrowUp, Globe, Link2, Share2, MessageSquare } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white w-full pt-20 pb-8 px-6 md:px-12 relative overflow-hidden border-t-4 border-white/10">
      
      {/* Background large watermark */}
      <div className="absolute bottom-0 right-0 text-[15rem] md:text-[25rem] font-black tracking-tighter opacity-[0.03] select-none pointer-events-none leading-none -mb-16 -mr-16 text-white">
        ZICODE
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
          
          {/* Column 1: Main navigation links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/60 border-b-2 border-white/20 pb-2">
              NAVIGATION
            </h4>
            <ul className="flex flex-col gap-3 text-lg font-black tracking-tight uppercase">
              <li><a href="#portfolio" className="hover:text-blue-500 transition-colors">PROJECTS</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">WHAT WE DO</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">TECH STACK</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">CAREERS</a></li>
            </ul>
          </div>

          {/* Column 2: Legal links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/60 border-b-2 border-white/20 pb-2">
              LEGAL
            </h4>
            <ul className="flex flex-col gap-3 text-sm font-bold uppercase tracking-wider">
              <li><a href="#" className="hover:text-blue-500 transition-colors">PRIVACY POLICY</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">TERMS OF SERVICE</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">COOKIE POLICY</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">SECURITY REPORT</a></li>
            </ul>
          </div>

          {/* Column 3: Social handles */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/60 border-b-2 border-white/20 pb-2">
              DEV & SOCIAL
            </h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="flex items-center gap-2 hover:text-blue-500 font-bold transition-colors text-sm uppercase tracking-wider">
                <Globe className="w-4 h-4" /> GITHUB
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-blue-500 font-bold transition-colors text-sm uppercase tracking-wider">
                <Link2 className="w-4 h-4" /> LINKEDIN
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-blue-500 font-bold transition-colors text-sm uppercase tracking-wider">
                <Share2 className="w-4 h-4" /> INSTAGRAM
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-blue-500 font-bold transition-colors text-sm uppercase tracking-wider">
                <MessageSquare className="w-4 h-4" /> TWITTER
              </a>
            </div>
          </div>

          {/* Column 4: Contact details */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/60 border-b-2 border-white/20 pb-2">
              GET IN TOUCH
            </h4>
            <div className="flex flex-col gap-2 text-sm font-bold tracking-wider uppercase">
              <a href="mailto:hello@zicode.com" className="text-lg font-black hover:text-blue-500 transition-colors block">
                hello@zicode.com
              </a>
              <p className="mt-2 text-white/60">+1 (555) 019-2831</p>
              <p className="text-white/60 leading-relaxed">
                100 Innovation Parkway,<br />
                Suite 400, Tech District
              </p>
            </div>
          </div>

        </div>

        {/* Lower footer */}
        <div className="border-t-2 border-white/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-white">ZICODE.</span>
            <span className="text-xs font-bold uppercase tracking-widest text-white/40">© 2026 Zicode. All rights reserved.</span>
          </div>

          {/* Scroll to Top */}
          <button 
            onClick={handleScrollToTop}
            className="w-12 h-12 rounded-none border-2 border-white flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-colors group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" strokeWidth={3} />
          </button>
        </div>

      </div>
    </footer>
  );
}
