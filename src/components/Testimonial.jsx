import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function Testimonial({ onOpenContact }) {
  return (
    <section id="testimonials" className="relative py-24 px-6 md:px-12 bg-zinc-950 border-t border-white/5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[20%] left-[-10%] w-[30rem] h-[30rem] bg-coral/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        
        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Rating Summary Card */}
          <div className="lg:col-span-4 bg-black border border-white/5 p-8 rounded-3xl flex flex-col justify-between text-left hover:border-coral/30 transition-all duration-500 group relative overflow-hidden reveal-blur-zoom">
            <div className="absolute top-0 right-0 w-32 h-32 bg-coral/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div>
              <span className="text-[10px] font-mono tracking-widest text-coral uppercase font-bold block mb-6">
                // CLIENT VERDICT
              </span>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-6xl md:text-7xl font-black text-white tracking-tighter">5.0</span>
                <span className="text-xl font-bold text-coral">/ 5.0</span>
              </div>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-coral text-coral" />
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-6 mt-6">
              <span className="text-xs font-mono text-zinc-400 block uppercase tracking-wider mb-1">
                100% Client Satisfaction
              </span>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-mono">
                Verified reviews based on frontend execution speed, system integration, and UI/UX design deliverables.
              </p>
            </div>
          </div>

          {/* Right Column: Detailed Quote Card */}
          <div className="lg:col-span-8 bg-black border border-white/5 p-8 md:p-10 rounded-3xl flex flex-col justify-between text-left hover:border-coral/30 transition-all duration-500 relative overflow-hidden group reveal-blur-zoom delay-150">
            {/* Giant background quote icon */}
            <div className="absolute right-6 top-6 text-zinc-900 group-hover:text-coral/5 transition-colors duration-500 pointer-events-none">
              <Quote className="w-24 h-24 md:w-32 md:h-32" />
            </div>

            <div className="relative z-10">
              <span className="text-[10px] font-mono tracking-widest text-coral uppercase font-bold block mb-8">
                // CUSTOMER STORY
              </span>
              <blockquote className="text-xl md:text-3xl font-black tracking-tight text-white leading-relaxed mb-8 uppercase max-w-3xl">
                "Zicode restructured our entire SaaS application dashboard and accelerated page response times by 300%. Their front-end expertise and system engineering made the deployment completely seamless."
              </blockquote>
            </div>

            <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <cite className="not-italic font-black text-white uppercase text-base tracking-wider block">
                  Sarah Jenkins
                </cite>
                <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mt-1 block">
                  Product Manager & Tech Lead
                </span>
              </div>
              
              {/* Highlight company badge */}
              <span className="inline-block bg-zinc-900 border border-white/10 text-white text-[9px] font-mono px-3.5 py-1.5 rounded-full uppercase tracking-wider self-start sm:self-center font-bold">
                Vertex Solutions
              </span>
            </div>
          </div>

        </div>

        {/* Final CTA Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[16/8] min-h-[350px] flex items-center p-8 md:p-16 group reveal-blur-zoom">
          {/* Background image overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:scale-[1.03] transition-transform duration-700 pointer-events-none"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

          {/* Banner content */}
          <div className="relative z-10 text-left max-w-3xl flex flex-col items-start gap-6">
            <span className="px-3 py-1 bg-coral/10 border border-coral/30 rounded-full font-bold text-[10px] text-coral tracking-widest uppercase font-mono">
              NEXT STEP
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase text-white leading-tight">
              START YOUR BRAND'S NEXT <br/>
              <span className="inline-block bg-coral text-white px-4 py-1.5 md:px-6 md:py-2.5 rounded-xl md:rounded-[1.5rem] tracking-tighter text-[90%] mt-2">
                DIGITAL CHAPTER
              </span>
            </h2>
            <button 
              onClick={onOpenContact}
              className="mt-4 px-8 py-4 bg-white text-black hover:bg-coral hover:text-white font-bold text-xs tracking-widest transition-all duration-300 rounded-full font-mono uppercase"
            >
              REQUEST A PROPOSAL
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
