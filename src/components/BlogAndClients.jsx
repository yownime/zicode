import React from 'react'; // trigger HMR
import { ArrowUpRight } from 'lucide-react';

export default function BlogAndClients({ onOpenContact }) {
  const articles = [
    {
      category: 'REKAYASA SISTEM',
      readTime: 'BACA 6 MENIT',
      title: 'MENSKALAKAN APLIKASI REACT UNTUK JUTAAN PENGGUNA',
      desc: 'Rincian mendalam tentang hidrasi state di sisi server, virtualisasi kode, dan pola rute dinamis untuk kecepatan render kilat.',
      date: '22 JUNI 2026',
      badgeColor: 'bg-[#FDE047]'
    },
    {
      category: 'SISTEM DESAIN',
      readTime: 'BACA 4 MENIT',
      title: 'MENGAPA PENGALAMAN PENGGUNA MENENTUKAN RETENSI ANDA',
      desc: 'Mengeksplorasi putaran umpan balik, petunjuk interaksi mikro, dan analisis friksi kognitif yang memengaruhi kesetiaan pengguna.',
      date: '18 MEI 2026',
      badgeColor: 'bg-[#00E5FF]'
    }
  ];

  return (
    <section id="blog" className="relative py-24 px-6 md:px-12 lg:px-24 bg-black select-none overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        
        {/* Blog section */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="text-left">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-white leading-none flex flex-wrap items-center gap-4">
                <span className="tracking-tighter">JURNAL</span>
                <span className="inline-block bg-[#FF007F] text-white px-4 py-2 border-2 border-white -rotate-1 mt-2 md:mt-0">
                  ZICODE
                </span>
              </h2>
            </div>
            <button className="text-xs font-black tracking-widest text-white hover:text-black hover:bg-white hover:border-white flex items-center gap-2 transition-colors uppercase group border-4 border-white p-4">
              LIHAT SEMUA ARTIKEL 
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={3} />
            </button>
          </div>

          {/* Styled Articles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {articles.map((article, index) => {
              return (
                <article 
                  key={index}
                  className="group relative border-4 border-white bg-black hover:bg-zinc-900 p-8 md:p-10 flex flex-col justify-between text-left transition-colors"
                >
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      {/* Category Badge & Read Time */}
                      <div className="flex justify-between items-center text-[10px] font-black mb-8">
                        <span className={`px-3 py-1 border-2 border-white text-black uppercase tracking-widest ${article.badgeColor}`}>
                          {article.category}
                        </span>
                        <span className="flex items-center gap-2 font-bold text-white uppercase tracking-widest bg-white/10 px-2 py-1 border-2 border-white/20">
                          {article.readTime}
                        </span>
                      </div>

                      {/* Article Title */}
                      <h3 className="text-2xl md:text-3xl font-black text-white uppercase leading-tight tracking-tighter mb-4 group-hover:text-white">
                        {article.title}
                      </h3>

                      {/* Article Description */}
                      <p className="text-zinc-400 font-medium text-sm leading-relaxed mb-8 max-w-xl">
                        {article.desc}
                      </p>
                    </div>

                    {/* Bottom Row */}
                    <div className="border-t-4 border-white/20 pt-6 mt-auto flex justify-between items-center text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                      <span>{article.date}</span>
                      <span className="text-white group-hover:text-[#FDE047] transition-colors flex items-center gap-2">
                        BACA ARTIKEL 
                        <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" strokeWidth={3} />
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
