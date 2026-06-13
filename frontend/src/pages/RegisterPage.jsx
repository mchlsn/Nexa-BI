import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Eye, EyeOff, BarChart3, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await api.post(
        '/auth/register',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Registrasi gagal. Username mungkin sudah digunakan.');
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f1117 0%, #1a1d27 50%, #0f1117 100%)' }}>

      {/* Background glow decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md lg:max-w-4xl mx-4 bg-[#1a1d27]/90 border border-[#2a2d3a] rounded-3xl overflow-hidden backdrop-blur-xl animate-fade-in lg:grid lg:grid-cols-2 shadow-2xl">
        {/* Left Column (Illustration/Branding) - Desktop only */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border-r border-[#2a2d3a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">NexaBI</span>
          </div>

          <div className="space-y-6 my-auto">
            <h2 className="text-3xl font-extrabold text-white leading-tight">
              Mulai Analisis Bisnis Anda Sekarang.
            </h2>
            <p className="text-muted text-sm leading-relaxed">
              Buat akun dalam hitungan detik untuk mengakses data analytics dashboard lengkap, monitoring churn, segmentasi RFM, dan wawasan AI.
            </p>
            <div className="space-y-4">
              {[
                'Akses aman dengan enkripsi modern.',
                'Visualisasi data instan di perangkat Anda.',
                'AI Recommendation Engine siap pakai.',
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-emerald-400 bg-emerald-500/10">✓</span>
                  <span className="text-gray-300 text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-muted text-xs">
            NexaBI Analytics Platform © 2026
          </p>
        </div>

        {/* Right Column (Form) */}
        <div className="p-6 sm:p-10 flex flex-col justify-center">
          {/* Header branding (only visible on mobile/tablet) */}
          <div className="text-center mb-6 lg:hidden">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">NexaBI</h1>
            <p className="text-muted mt-1 text-xs">Buat akun untuk mengakses platform</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">Daftar Akun Baru</h2>
            <p className="text-muted text-sm mt-1">Lengkapi form di bawah ini</p>
          </div>

          {success ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4 animate-bounce" />
              <h3 className="text-lg font-medium text-white mb-2">Registrasi Berhasil!</h3>
              <p className="text-sm text-muted">Mengarahkan ke halaman login...</p>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-muted mb-2">Username</label>
                <input
                  id="register-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Pilih username"
                  required
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-muted text-sm outline-none transition-all focus:ring-2 focus:ring-accent"
                  style={{
                    background: '#0f1117',
                    border: '1px solid #2a2d3a',
                  }}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-muted mb-2">Password</label>
                <div className="relative">
                  <input
                    id="register-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Buat password (min. 6 karakter)"
                    required
                    minLength={6}
                    className="w-full px-4 py-3 pr-12 rounded-xl text-white placeholder-muted text-sm outline-none transition-all focus:ring-2 focus:ring-accent"
                    style={{
                      background: '#0f1117',
                      border: '1px solid #2a2d3a',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}>
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              {/* Submit button */}
              <button
                id="register-submit"
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 min-h-[44px]"
                style={{ background: loading ? '#4f46e5' : 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Mendaftar...</>
                ) : (
                  'Daftar Sekarang'
                )}
              </button>

              {/* Login Link */}
              <div className="text-center mt-4">
                <span className="text-muted text-sm">Sudah punya akun? </span>
                <button type="button" onClick={goToLogin} className="text-indigo-400 text-sm font-medium hover:text-indigo-300">
                  Masuk di sini
                </button>
              </div>
            </form>
          )}

          {/* Footer branding (only visible on mobile/tablet) */}
          <p className="text-center text-muted text-xs mt-6 lg:hidden">
            NexaBI © 2026 · Powered by Gemini AI
          </p>
        </div>
      </div>
    </div>
  );
}
