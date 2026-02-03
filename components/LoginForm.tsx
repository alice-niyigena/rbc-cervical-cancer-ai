
import React, { useState } from 'react';
import { User } from '../types';
import { mockUsers } from '../mockData';

interface Props {
  onLogin: (user: User) => void;
}

const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulating database latency
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email && u.password === password);
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid clinical credentials. Please contact IT support.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-slate-200 animate-in fade-in zoom-in duration-300">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white text-4xl shadow-xl shadow-blue-200">
            <i className="fa-solid fa-ribbon"></i>
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight uppercase">RBC Portal</h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">Cervical Cancer Early Risk Prediction System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium rounded animate-shake">
              <i className="fa-solid fa-circle-exclamation mr-2"></i> {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Institutional Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition outline-none text-slate-700"
                placeholder="doctor@rbc.gov.rw"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
              <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot?</a>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                required
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition outline-none text-slate-700"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-[0.98] transition disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <i className="fa-solid fa-circle-notch fa-spin mr-3"></i> Authenticating...
              </span>
            ) : 'Sign In To System'}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-tighter">
            Security Notice: This system is for authorized personnel only. 
            All activities are logged per Rwanda Biomedical Centre policy.
          </p>
        </div>
  <div className="mt-10 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-tighter">
           1. Medical Doctor Credentials<br>
Email: bosco@rbc.gov.rw<br>
Password: doctor123<br>
Access: Can perform AI risk predictions, view their own clinical history, and generate patient reports.<br>
2. Administrator Credentials<br>
Email: admin@rbc.gov.rw<br>
Password: admin123<br>
Access: Full system access, user management (add/delete doctors), and national-level screening statistics.<br>
3. Alternative Doctor Credentials<br>
Email: uwase@rbc.gov.rw<br>
Password: doctor123<br>

          </p>
        </div>
        
      </div>
    </div>
  );
};

export default LoginForm;
