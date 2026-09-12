import React, { useState } from 'react';
import { X, Send, MessageCircle, MapPin, Mail, Phone, Calendar, Loader2 } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project_type: 'Custom Web Application Development',
    details: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState('');

  if (!isOpen) return null;

  const WA_NUMBER = '6282160294628'; // Silakan ganti dengan nomor WA asli

  const handleWA = () => {
    const text = "Halo, saya tertarik untuk mendiskusikan sebuah proyek.";
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setNotification('');

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setNotification('Pesan berhasil terkirim! Saya akan segera menghubungi Anda.');
        setFormData({ name: '', email: '', project_type: 'Custom Web Application Development', details: '' });
        setTimeout(() => onClose(), 3000);
      } else {
        const data = await res.json();
        setNotification(`Error: ${data.error || 'Gagal mengirim pesan'}`);
      }
    } catch (err) {
      setNotification('Error: Terjadi kesalahan jaringan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/80 backdrop-blur-sm transition-opacity duration-300">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Drawer */}
      <div className="relative w-full max-w-2xl h-full bg-[#0A0A0A] border-l border-white/10 p-8 md:p-12 overflow-y-auto flex flex-col justify-between z-10 animate-slide-in">

        {/* Header */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <span className="text-xs font-bold tracking-widest text-coral uppercase">// KONSULTASI PROYEK</span>
            <button
              onClick={onClose}
              className="p-2 border border-white/10 rounded-full hover:border-coral/50 hover:bg-white/5 transition-all text-white hover:text-coral"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white mb-4">
            START A PROJECT <br />
            WITH <span className="text-coral">US</span>
          </h2>
          <p className="text-zinc-400 text-sm mb-8 leading-relaxed max-w-md">
            Pilih cara tercepat untuk menghubungi kami. Anda bisa langsung chat via WhatsApp atau tinggalkan pesan detail di bawah.
          </p>

          {/* Tombol WA Besar */}
          <button
            onClick={handleWA}
            className="w-full mb-10 px-8 py-5 bg-[#25D366] text-black hover:bg-[#1ebd5a] rounded-2xl font-black text-sm tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/20 transform hover:-translate-y-1"
          >
            <MessageCircle className="w-6 h-6" /> CHAT VIA WHATSAPP (FAST RESPONSE)
          </button>

          <div className="relative flex py-5 items-center mb-5">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-zinc-500 text-xs font-bold uppercase tracking-widest">Atau Tinggalkan Pesan</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          {/* Form */}
          {notification && (
            <div className={`p-4 mb-6 rounded-lg text-sm font-bold ${notification.startsWith('Error') ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
              {notification}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">NAMA LENGKAP</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                  className="bg-zinc-900 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-coral transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">EMAIL ADDRESS</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="john@company.com"
                  className="bg-zinc-900 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-coral transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">TIPE PROYEK</label>
              <select
                name="project_type"
                value={formData.project_type}
                onChange={handleInputChange}
                className="bg-zinc-900 border border-white/10 rounded-lg p-3 text-sm text-zinc-400 focus:outline-none focus:border-coral transition-colors"
              >
                <option>Custom Web Application Development</option>
                <option>Mobile App Engineering (iOS/Android)</option>
                <option>UI/UX Product Design & Systems</option>
                <option>Cloud Infrastructure & DevOps</option>
                <option>Digital Growth & SEO Retainer</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">DETAIL PESAN</label>
              <textarea
                rows="4"
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                required
                placeholder="Ceritakan tentang proyek Anda..."
                className="bg-zinc-900 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-coral transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 px-8 py-4 bg-white text-black hover:bg-coral hover:text-white font-bold text-xs rounded-xl tracking-widest transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {isLoading ? 'MENGIRIM...' : 'KIRIM PESAN'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
