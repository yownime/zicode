import React from 'react';

const About = () => {
  return (
    <section className="relative w-full bg-white text-black py-20 md:py-28 px-6 md:px-12 lg:px-24 overflow-hidden">
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center gap-8 md:gap-10">
        
        {/* Badge */}
        <div className="inline-block bg-black text-white font-black uppercase tracking-widest text-xs px-5 py-2 border-2 border-black shadow-[4px_4px_0px_#FDE047] -rotate-2">
          (00) Who We Are
        </div>
        
        {/* Huge Short Statement */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[1.2]">
          KAMI MEMBANGUN PENGALAMAN DIGITAL YANG <span className="bg-[#FF007F] text-white px-2 py-1 mt-2 inline-block shadow-[6px_6px_0px_black] rotate-1">MENCURI PERHATIAN.</span>
        </h2>
        


      </div>
    </section>
  );
};

export default About;
