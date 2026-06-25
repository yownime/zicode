import React from 'react';
import { X, Send, MapPin, Mail, Phone, Calendar } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your proposal request has been received. Our team will contact you within 12 hours.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/80 backdrop-blur-sm transition-opacity duration-300">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Drawer */}
      <div className="relative w-full max-w-2xl h-full bg-[#0A0A0A] border-l border-white/10 p-8 md:p-12 overflow-y-auto flex flex-col justify-between z-10 animate-slide-in">
        
        {/* Header */}
        <div>
          <div className="flex justify-between items-center mb-12">
            <span className="text-xs font-bold tracking-widest text-coral uppercase">// WORK WITH US</span>
            <button 
              onClick={onClose}
              className="p-2 border border-white/10 rounded-full hover:border-coral/50 hover:bg-white/5 transition-all text-white hover:text-coral"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white mb-4">
            LET'S BUILD <br />
            SOMETHING <span className="text-coral">GREAT</span>
          </h2>
          <p className="text-zinc-400 text-sm mb-8 leading-relaxed max-w-md">
            Have a project in mind or looking to scale your development capabilities? Fill out the proposal parameters below, and let's get started.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">FULL NAME</label>
                <input 
                  type="text" 
                  required 
                  placeholder="John Doe" 
                  className="bg-zinc-900 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-coral transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  required 
                  placeholder="john@company.com" 
                  className="bg-zinc-900 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-coral transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">PROJECT TYPE</label>
              <select className="bg-zinc-900 border border-white/10 rounded-lg p-3 text-sm text-zinc-400 focus:outline-none focus:border-coral transition-colors">
                <option>Custom Web Application Development</option>
                <option>Mobile App Engineering (iOS/Android)</option>
                <option>UI/UX Product Design & Systems</option>
                <option>Cloud Infrastructure & DevOps</option>
                <option>Full-Stack System Engineering</option>
                <option>Digital Growth & SEO Retainer</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">PROJECT DETAILS & SCOPE</label>
              <textarea 
                rows="4" 
                required
                placeholder="Describe your goals, tech stack preferences, and any specific deadlines..." 
                className="bg-zinc-900 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-coral transition-colors resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="mt-4 px-8 py-4 bg-coral text-white hover:bg-white hover:text-black font-bold text-xs tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
            >
              SEND PROPOSAL <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Footer Contact Details */}
        <div className="border-t border-white/10 pt-8 mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-zinc-400 text-left">
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-white font-bold"><Mail className="w-4 h-4 text-coral" /> hello@zicode.com</span>
            <span className="flex items-center gap-2 text-white font-bold"><Phone className="w-4 h-4 text-coral" /> +1 (555) 019-2831</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-white font-bold"><MapPin className="w-4 h-4 text-coral" /> Tech District, SF</span>
            <span className="flex items-center gap-2 text-white font-bold"><Calendar className="w-4 h-4 text-coral" /> Response within 12h</span>
          </div>
        </div>

      </div>
    </div>
  );
}
