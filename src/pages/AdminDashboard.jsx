import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Image as ImageIcon, Link as LinkIcon, Type, AlignLeft, Trash2, LayoutDashboard } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    thumbnail: '',
    link: ''
  });

  const [notification, setNotification] = useState('');

  useEffect(() => {
    // Load initial portfolios from localStorage
    const savedPortfolios = localStorage.getItem('portfolios');
    if (savedPortfolios) {
      setPortfolios(JSON.parse(savedPortfolios));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuth');
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPortfolio = {
      id: Date.now().toString(),
      ...formData,
      category: 'Web Development', // Default category for now
    };

    const updatedPortfolios = [newPortfolio, ...portfolios];
    setPortfolios(updatedPortfolios);
    localStorage.setItem('portfolios', JSON.stringify(updatedPortfolios));
    
    // Reset form
    setFormData({ name: '', description: '', thumbnail: '', link: '' });
    
    // Show notification
    setNotification('Portfolio berhasil ditambahkan!');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleDelete = (id) => {
    const updatedPortfolios = portfolios.filter(p => p.id !== id);
    setPortfolios(updatedPortfolios);
    localStorage.setItem('portfolios', JSON.stringify(updatedPortfolios));
  };

  return (
    <div className="min-h-screen bg-principal font-sans text-zinc-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <span className="text-coral">Admin</span>Panel
          </h1>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 bg-zinc-900 text-white rounded-xl border border-zinc-800 transition-colors">
                <LayoutDashboard size={18} className="text-coral" />
                <span className="font-medium">Portofolio</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
          >
            <LogOut size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
          <h1 className="text-xl font-bold"><span className="text-coral">Admin</span>Panel</h1>
          <button onClick={handleLogout} className="p-2 text-zinc-400 hover:text-red-400">
            <LogOut size={20} />
          </button>
        </div>

        <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-10">
          
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold mb-2">Kelola Portofolio</h2>
              <p className="text-zinc-400">Tambahkan proyek terbaru ke halaman utama Anda.</p>
            </div>
            <button onClick={() => navigate('/')} className="text-sm px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors">
              Lihat Website
            </button>
          </div>

          {notification && (
            <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-xl flex items-center justify-between">
              <span>{notification}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Form Section */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-coral/5 blur-3xl rounded-full"></div>
                
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Plus size={20} className="text-coral" />
                  Tambah Baru
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">Nama Proyek</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Type size={16} className="text-zinc-500" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                        placeholder="Contoh: E-Commerce App"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">Deskripsi Singkat</label>
                    <div className="relative">
                      <div className="absolute top-3 left-0 pl-3 pointer-events-none">
                        <AlignLeft size={16} className="text-zinc-500" />
                      </div>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-colors resize-none"
                        placeholder="Aplikasi toko online..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">URL Thumbnail Image</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ImageIcon size={16} className="text-zinc-500" />
                      </div>
                      <input
                        type="url"
                        name="thumbnail"
                        value={formData.thumbnail}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">Link Proyek</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LinkIcon size={16} className="text-zinc-500" />
                      </div>
                      <input
                        type="url"
                        name="link"
                        value={formData.link}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                        placeholder="https://myproject.com"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-zinc-100 text-zinc-900 hover:bg-white font-semibold rounded-xl py-2.5 px-4 transition-all duration-300 transform active:scale-[0.98] mt-2"
                  >
                    Simpan Portofolio
                  </button>
                </form>
              </div>
            </div>

            {/* List Section */}
            <div className="lg:col-span-2">
              <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-6">Daftar Portofolio ({portfolios.length})</h3>
                
                {portfolios.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500">
                    <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
                    <p>Belum ada portofolio yang ditambahkan.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {portfolios.map((portfolio) => (
                      <div key={portfolio.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-zinc-950 border border-zinc-800 rounded-xl group hover:border-zinc-700 transition-colors">
                        <div className="w-full sm:w-24 h-20 rounded-lg overflow-hidden bg-zinc-900 shrink-0">
                          <img 
                            src={portfolio.thumbnail} 
                            alt={portfolio.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                            }}
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0 w-full">
                          <h4 className="font-semibold text-lg truncate">{portfolio.name}</h4>
                          <p className="text-sm text-zinc-400 line-clamp-1 mt-1">{portfolio.description}</p>
                          <a href={portfolio.link} target="_blank" rel="noopener noreferrer" className="text-xs text-coral hover:underline mt-2 inline-block truncate max-w-full">
                            {portfolio.link}
                          </a>
                        </div>

                        <div className="shrink-0 w-full sm:w-auto flex justify-end">
                          <button 
                            onClick={() => handleDelete(portfolio.id)}
                            className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
