import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Image as ImageIcon, Link as LinkIcon, Type, AlignLeft, Trash2, LayoutDashboard, Loader2, Tag, GripVertical, Mail, CheckCircle2, Circle } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('portfolios');

  // --- State Portfolios ---
  const [portfolios, setPortfolios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    link: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // --- State Messages ---
  const [messages, setMessages] = useState([]);
  const [isFetchingMessages, setIsFetchingMessages] = useState(false);

  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (activeTab === 'portfolios') {
      fetchPortfolios();
    } else {
      fetchMessages();
    }
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  // --- Portfolio Handlers ---
  const fetchPortfolios = async () => {
    try {
      setIsFetching(true);
      const res = await fetch('/api/portfolios');
      if (res.ok) {
        const data = await res.json();
        setPortfolios(data);
      }
    } catch (error) {
      console.error('Failed to fetch portfolios', error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setNotification('Error: Silakan pilih gambar terlebih dahulu!');
      setTimeout(() => setNotification(''), 3000);
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        link: formData.link,
        imageBase64: imagePreview,
      };

      const adminToken = localStorage.getItem('adminToken');
      const res = await fetch('/api/portfolios', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': adminToken
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setNotification('Portfolio berhasil ditambahkan!');
        setFormData({ name: '', category: '', description: '', link: '' });
        setImageFile(null);
        setImagePreview('');
        fetchPortfolios();
      } else if (res.status === 401) {
        alert('Sesi Anda telah berakhir atau kata sandi diubah. Silakan login kembali.');
        handleLogout();
      } else {
        const err = await res.json();
        setNotification(`Error: ${err.error || 'Gagal menyimpan data'}`);
      }
    } catch (error) {
      console.error(error);
      setNotification('Error: Terjadi kesalahan jaringan');
    } finally {
      setIsLoading(false);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(portfolios);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPortfolios(items);

    const updatedItems = items.map((item, index) => ({
      id: item.id,
      sort_order: index
    }));

    try {
      const adminToken = localStorage.getItem('adminToken');
      const res = await fetch('/api/portfolios', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': adminToken
        },
        body: JSON.stringify({ items: updatedItems })
      });

      if (res.status === 401) {
        alert('Sesi Anda telah berakhir. Silakan login kembali.');
        handleLogout();
      } else if (!res.ok) {
        setNotification('Error: Gagal menyimpan urutan baru');
        setTimeout(() => setNotification(''), 3000);
      }
    } catch (e) {
      console.error('Failed to save order', e);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus portofolio ini?')) return;
    
    try {
      const adminToken = localStorage.getItem('adminToken');
      const res = await fetch(`/api/portfolios?id=${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': adminToken
        }
      });
      if (res.ok) {
        setPortfolios(prev => prev.filter(p => p.id !== id));
      } else if (res.status === 401) {
        alert('Akses ditolak. Silakan login kembali.');
        handleLogout();
      } else {
        alert('Gagal menghapus data');
      }
    } catch (error) {
      console.error('Failed to delete', error);
      alert('Gagal menghubungi server');
    }
  };

  // --- Message Handlers ---
  const fetchMessages = async () => {
    try {
      setIsFetchingMessages(true);
      const adminToken = localStorage.getItem('adminToken');
      const res = await fetch('/api/messages', {
        headers: { 'Authorization': adminToken }
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      } else if (res.status === 401) {
        handleLogout();
      }
    } catch (error) {
      console.error('Failed to fetch messages', error);
    } finally {
      setIsFetchingMessages(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const res = await fetch('/api/messages', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': adminToken
        },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: 1 } : m));
      }
    } catch (error) {
      console.error('Error marking as read', error);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Yakin ingin menghapus pesan ini?')) return;
    try {
      const adminToken = localStorage.getItem('adminToken');
      const res = await fetch(`/api/messages?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': adminToken }
      });
      if (res.ok) {
        setMessages(prev => prev.filter(m => m.id !== id));
      }
    } catch (error) {
      console.error('Error deleting message', error);
    }
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
              <button 
                onClick={() => setActiveTab('portfolios')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${activeTab === 'portfolios' ? 'bg-zinc-900 text-white border-zinc-700' : 'bg-transparent border-transparent text-zinc-400 hover:bg-zinc-900/50 hover:text-white'}`}
              >
                <LayoutDashboard size={18} className={activeTab === 'portfolios' ? "text-coral" : ""} />
                <span className="font-medium">Portofolio</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('messages')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${activeTab === 'messages' ? 'bg-zinc-900 text-white border-zinc-700' : 'bg-transparent border-transparent text-zinc-400 hover:bg-zinc-900/50 hover:text-white'}`}
              >
                <Mail size={18} className={activeTab === 'messages' ? "text-coral" : ""} />
                <span className="font-medium flex-1 text-left">Pesan Masuk</span>
                {messages.filter(m => !m.is_read).length > 0 && (
                  <span className="bg-coral text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {messages.filter(m => !m.is_read).length}
                  </span>
                )}
              </button>
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
        <div className="md:hidden p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
          <h1 className="text-xl font-bold"><span className="text-coral">Admin</span>Panel</h1>
          <button onClick={handleLogout} className="p-2 text-zinc-400 hover:text-red-400">
            <LogOut size={20} />
          </button>
        </div>

        <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-10">
          
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {activeTab === 'portfolios' ? 'Kelola Portofolio' : 'Kotak Masuk'}
              </h2>
              <p className="text-zinc-400">
                {activeTab === 'portfolios' 
                  ? 'Tambahkan proyek terbaru dengan aman ke database Anda.'
                  : 'Pesan dari pengunjung website yang masuk melalui Contact Form.'}
              </p>
            </div>
            <div className="flex gap-4">
              <div className="md:hidden flex bg-zinc-900 p-1 rounded-lg">
                <button onClick={() => setActiveTab('portfolios')} className={`px-3 py-1 text-sm rounded ${activeTab === 'portfolios' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}>Porto</button>
                <button onClick={() => setActiveTab('messages')} className={`px-3 py-1 text-sm rounded ${activeTab === 'messages' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}>Pesan</button>
              </div>
              <button onClick={() => navigate('/')} className="text-sm px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors">
                Lihat Website
              </button>
            </div>
          </div>

          {notification && (
            <div className={`border px-4 py-3 rounded-xl flex items-center justify-between ${notification.startsWith('Error') ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'bg-green-500/10 border-green-500/50 text-green-400'}`}>
              <span>{notification}</span>
            </div>
          )}

          {activeTab === 'portfolios' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
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
                      <label className="block text-sm font-medium text-zinc-400 mb-1.5">Kategori (Badge)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Tag size={16} className="text-zinc-500" />
                        </div>
                        <input
                          type="text"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                          placeholder="Contoh: FINTECH PLATFORM"
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
                      <label className="block text-sm font-medium text-zinc-400 mb-1.5">Upload Gambar</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-coral/10 file:text-coral hover:file:bg-coral/20 cursor-pointer"
                      />
                      {imagePreview && (
                        <div className="mt-3 relative w-full h-32 rounded-lg overflow-hidden border border-zinc-800">
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
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
                      disabled={isLoading}
                      className="w-full bg-zinc-100 text-zinc-900 hover:bg-white font-semibold rounded-xl py-2.5 px-4 transition-all duration-300 transform active:scale-[0.98] mt-2 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? <Loader2 size={18} className="animate-spin" /> : null}
                      {isLoading ? 'Menyimpan...' : 'Simpan Portofolio'}
                    </button>
                  </form>
                </div>
              </div>

              {/* List Section */}
              <div className="lg:col-span-2">
                <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-6">Daftar Portofolio ({portfolios.length})</h3>
                  
                  {isFetching ? (
                    <div className="flex justify-center py-12">
                      <Loader2 size={32} className="animate-spin text-coral" />
                    </div>
                  ) : portfolios.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500">
                      <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
                      <p>Belum ada portofolio yang ditambahkan.</p>
                    </div>
                  ) : (
                    <DragDropContext onDragEnd={handleDragEnd}>
                      <Droppable droppableId="portfolios-list">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                            {portfolios.map((portfolio, index) => (
                              <Draggable key={portfolio.id} draggableId={portfolio.id.toString()} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className={`flex flex-col sm:flex-row items-center gap-4 p-4 bg-zinc-950 border rounded-xl group transition-colors ${
                                      snapshot.isDragging ? 'border-coral shadow-lg shadow-coral/10 z-50' : 'border-zinc-800 hover:border-zinc-700'
                                    }`}
                                  >
                                    {/* Drag Handle */}
                                    <div 
                                      {...provided.dragHandleProps} 
                                      className="text-zinc-600 hover:text-zinc-300 cursor-grab active:cursor-grabbing p-1"
                                      title="Tahan dan Geser"
                                    >
                                      <GripVertical size={20} />
                                    </div>
                                    
                                    <div className="w-full sm:w-24 h-20 rounded-lg overflow-hidden bg-zinc-900 shrink-0">
                                      <img 
                                        src={portfolio.thumbnail} 
                                        alt={portfolio.name} 
                                        className="w-full h-full object-cover"
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
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 animate-fade-in">
              {isFetchingMessages ? (
                <div className="flex justify-center py-12">
                  <Loader2 size={32} className="animate-spin text-coral" />
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500">
                  <Mail size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Kotak masuk Anda masih kosong.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`p-5 rounded-xl border transition-colors ${msg.is_read ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-900/80 border-coral/30'}`}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-lg flex items-center gap-2">
                            {msg.name}
                            {!msg.is_read && <span className="bg-coral text-white text-[9px] px-2 py-0.5 rounded-full uppercase tracking-widest">New</span>}
                          </h4>
                          <a href={`mailto:${msg.email}`} className="text-sm text-coral hover:underline">{msg.email}</a>
                        </div>
                        <div className="text-xs text-zinc-500">
                          {new Date(msg.created_at).toLocaleString('id-ID')}
                        </div>
                      </div>
                      
                      <div className="inline-block bg-zinc-800 px-3 py-1 rounded-md text-xs font-semibold text-zinc-300 mb-4">
                        {msg.project_type}
                      </div>
                      
                      <p className="text-sm text-zinc-300 bg-zinc-950 p-4 rounded-lg border border-zinc-800/50 whitespace-pre-wrap">
                        {msg.details}
                      </p>

                      <div className="mt-4 flex justify-end gap-3">
                        {!msg.is_read && (
                          <button 
                            onClick={() => handleMarkAsRead(msg.id)}
                            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors bg-zinc-800 px-3 py-1.5 rounded-lg"
                          >
                            <CheckCircle2 size={14} /> Tandai Dibaca
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-red-400 transition-colors bg-zinc-800 hover:bg-red-500/10 px-3 py-1.5 rounded-lg"
                        >
                          <Trash2 size={14} /> Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
