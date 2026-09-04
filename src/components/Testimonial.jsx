import React from 'react'; // trigger HMR for Testimonial

export default function Testimonial({ onOpenContact }) {
  return (
    <section id="cta" className="relative py-24 px-6 md:px-12 lg:px-24 bg-black select-none overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Final CTA Banner */}
        <div className="w-full bg-black border-4 border-white p-12 md:p-24 flex flex-col items-center text-center relative hover:bg-zinc-900 transition-colors duration-500">
          
          <span className="inline-block bg-white text-black px-4 py-1 border-2 border-white font-black text-xs tracking-widest uppercase mb-8 -rotate-2">
            NEXT STEP
          </span>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase text-white leading-[1.1] mb-12">
            START YOUR BRAND'S NEXT <br/>
            <span className="inline-block bg-blue-600 text-white px-6 py-2 mt-4 border-2 border-white rotate-1">
              DIGITAL CHAPTER
            </span>
          </h2>
          
          <button 
            onClick={onOpenContact}
            className="px-8 py-5 bg-blue-600 text-white border-4 border-white font-black text-sm md:text-base tracking-widest hover:bg-white hover:text-black transition-all uppercase shadow-[8px_8px_0px_white] hover:translate-y-1 hover:shadow-[4px_4px_0px_white]"
          >
            REQUEST A PROPOSAL
          </button>
          
        </div>

      </div>
    </section>
  );
}
