import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Authorization': password
        }
      });

      if (res.ok) {
        localStorage.setItem('adminToken', password);
        navigate('/admin');
      } else {
        const data = await res.json();
        setError(data.error || 'Kata sandi salah');
      }
    } catch (err) {
      setError('Gagal menghubungi server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-principal flex items-center justify-center font-sans text-zinc-100 p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-coral/10 blur-[120px]" />
        <div className="absolute bottom-[0%] right-[0%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
            <p className="text-zinc-400">Masuk untuk mengelola portofolio</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm rounded-lg p-3 mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-zinc-500" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                  placeholder="admin"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-zinc-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-coral hover:bg-blue-600 text-white font-medium rounded-xl py-3 px-4 flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-[0.98] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isLoading ? 'Memeriksa...' : 'Masuk'}</span>
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-6 text-center">
             <button onClick={() => navigate('/')} className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
               &larr; Kembali ke Beranda
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
