import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function BlogAndClients({ onOpenContact }) {
  const sectors = [
    { title: 'Tech Startups', desc: 'Accelerating MVPs to seed & Series A with production-ready architectures.' },
    { title: 'Enterprise Solutions', desc: 'Refactoring legacy networks, custom API gateways, and distributed cloud computing.' },
    { title: 'Public Sector', desc: 'Secure web systems adhering to strict data privacy regulations and compliance.' },
    { title: 'E-Commerce Brands', desc: 'Highly customized headless Shopify environments optimized for conversion.' }
  ];

  const articles = [
    {
      category: 'ENGINEERING',
      readTime: '6 MIN READ',
      title: 'SCALING REACT APPLICATIONS FOR MILLIONS OF USERS',
      desc: 'An in-depth breakdown of server-side state hydration, code virtualization, and dynamic route rendering patterns to maintain sub-second rendering speeds.',
      date: 'JUNE 22, 2026'
    },
    {
      category: 'DESIGN SYSTEM',
      readTime: '4 MIN READ',
      title: 'WHY USER EXPERIENCE DICTATES YOUR RETENTION RATE',
      desc: 'Exploring structural feedback loops, micro-interaction cues, and cognitive friction point analysis that drive product loyalty.',
      date: 'MAY 18, 2026'
    }
  ];

  return (
    <section id="blog" className="relative py-24 px-6 md:px-12 bg-black border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        
        {/* Sectors section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left panel */}
          <div className="lg:col-span-5 text-left reveal-on-scroll">
            <span className="text-xs font-bold tracking-widest text-coral uppercase block mb-3">// TARGET SECTORS</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white leading-none mb-6">
              OUR COLLABORATORS
            </h2>
            <p className="text-zinc-400 text-sm max-w-sm mb-8 leading-relaxed">
              We align with builders, founders, and innovation leaders. We don't just supply developers; we co-pilot technical roadmaps.
            </p>
            <button 
              onClick={onOpenContact}
              className="px-6 py-3 border border-white text-xs font-bold tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300 rounded-full"
            >
              WHO WE SCALE
            </button>
          </div>

          {/* Right panel (sectors list) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sectors.map((sector, index) => {
              const delays = ['delay-75', 'delay-150', 'delay-200', 'delay-300'];
              return (
                <div 
                  key={index}
                  className={`p-8 border border-white/5 bg-zinc-950/50 rounded-2xl hover:border-coral/30 hover:bg-zinc-900/40 transition-all duration-300 flex flex-col justify-between text-left group reveal-slide-right ${delays[index]}`}
                >
                  <div>
                    <span className="text-xs font-mono text-zinc-600 block mb-4">0{index + 1}/</span>
                    <h3 className="text-xl font-bold text-white uppercase group-hover:text-coral transition-colors duration-300 mb-2">
                      {sector.title}
                    </h3>
                  </div>
                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mt-4">
                    {sector.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Blog section */}
        <div className="border-t border-white/10 pt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal-on-scroll">
            <div className="text-left">
              <span className="text-xs font-bold tracking-widest text-coral uppercase block mb-3">// TECH INSIGHTS</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase text-white leading-none flex flex-wrap items-center gap-3">
                <span className="tracking-tighter">ZICODE</span>
                <span className="inline-block bg-coral text-white px-4 py-1.5 md:px-6 md:py-2.5 rounded-xl md:rounded-[1.5rem] tracking-tighter text-[90%]">
                  JOURNAL
                </span>
              </h2>
            </div>
            <button className="text-[10px] md:text-xs font-bold tracking-widest text-white hover:text-coral flex items-center gap-2 transition-colors self-start md:self-end group uppercase font-mono">
              VIEW ALL INSIGHTS 
              <span className="p-1 rounded-full bg-white/5 border border-white/10 group-hover:border-coral/40 group-hover:bg-coral/10 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Styled Articles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {articles.map((article, index) => {
              const isFirst = index === 0;
              return (
                <article 
                  key={index}
                  className={`group relative border border-white/5 bg-zinc-950/40 hover:bg-zinc-950/80 p-8 md:p-10 rounded-3xl flex flex-col justify-between text-left hover:border-coral/30 transition-all duration-500 overflow-hidden ${
                    isFirst ? 'reveal-slide-left' : 'reveal-slide-right'
                  }`}
                >
                  {/* Decorative glowing gradient orb behind the content */}
                  <div className={`absolute top-[-20%] right-[-10%] w-72 h-72 rounded-full blur-[90px] pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-700 ${
                    isFirst ? 'bg-coral/20' : 'bg-violet-600/20'
                  }`}></div>

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      {/* Category Badge & Read Time */}
                      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mb-8">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-bold text-coral tracking-wider">
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1.5 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse"></span>
                          {article.readTime}
                        </span>
                      </div>

                      {/* Article Title */}
                      <h3 className="text-2xl md:text-3xl font-black text-white uppercase leading-tight tracking-tighter mb-4 group-hover:text-coral transition-colors duration-300">
                        {article.title}
                      </h3>

                      {/* Article Description */}
                      <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-8 max-w-xl">
                        {article.desc}
                      </p>
                    </div>

                    {/* Bottom Row */}
                    <div className="border-t border-white/5 pt-6 mt-auto flex justify-between items-center text-[10px] font-mono text-zinc-500">
                      <span>{article.date}</span>
                      <span className="text-white group-hover:text-coral transition-colors flex items-center gap-2 font-bold tracking-wider">
                        READ ARTICLE 
                        <span className="p-1 rounded-full bg-white/5 border border-white/10 group-hover:border-coral/40 group-hover:bg-coral/10 transition-all duration-300">
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
                        </span>
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
