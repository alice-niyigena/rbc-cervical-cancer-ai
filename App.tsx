
import React, { useState } from 'react';
import { User, UserRole, PredictionRecord } from './types';
import { mockUsers, initialPredictions } from './mockData';
import RiskAssessmentForm from './components/RiskAssessmentForm';
import AdminPanel from './components/AdminPanel';
import Reports from './components/Reports';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [predictions, setPredictions] = useState<PredictionRecord[]>(initialPredictions);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    // Logins default to dashboard
    setActiveTab('dashboard');
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  const handleSavePrediction = (record: PredictionRecord) => {
    setPredictions(prev => [...prev, record]);
    setActiveTab('history');
  };

  const handleDeleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const doctorPredictions = predictions.filter(p => p.doctorId === currentUser.id);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-slate-900 text-white flex flex-col shadow-2xl z-10">
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-blue-900/40">
              <i className="fa-solid fa-ribbon text-lg"></i>
            </div>
            <div className="flex flex-col">
              <span className="font-black tracking-tighter text-xl leading-none">RBC PORTAL</span>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">AI Diagnostic Unit</span>
            </div>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 backdrop-blur-sm">
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Active Session</p>
            </div>
            <p className="text-sm font-bold truncate text-slate-100">{currentUser.name}</p>
            <p className="text-[10px] text-blue-400 font-bold uppercase mt-0.5">{currentUser.role} Account</p>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-3">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/50 scale-[1.02]' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
          >
            <i className="fa-solid fa-chart-line w-6 text-center mr-3"></i> Dashboard
          </button>
          
          {currentUser.role === UserRole.DOCTOR && (
            <button 
              onClick={() => setActiveTab('predict')}
              className={`w-full flex items-center px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === 'predict' ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/50 scale-[1.02]' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
            >
              <i className="fa-solid fa-microscope w-6 text-center mr-3"></i> AI Prediction
            </button>
          )}

          <button 
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === 'history' ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/50 scale-[1.02]' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
          >
            <i className="fa-solid fa-folder-open w-6 text-center mr-3"></i> Case Records
          </button>

          {currentUser.role === UserRole.ADMIN && (
            <button 
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === 'users' ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/50 scale-[1.02]' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
            >
              <i className="fa-solid fa-shield-halved w-6 text-center mr-3"></i> System Admin
            </button>
          )}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button 
            onClick={logout}
            className="w-full flex items-center px-4 py-3.5 rounded-xl text-sm font-bold text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <i className="fa-solid fa-right-from-bracket w-6 text-center mr-3"></i> Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen p-6 md:p-10 animate-in fade-in duration-700">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="animate-in slide-in-from-left duration-500">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              {activeTab === 'dashboard' && 'Screening Intelligence'}
              {activeTab === 'predict' && 'Risk Stratification'}
              {activeTab === 'history' && 'Medical Archive'}
              {activeTab === 'users' && 'Access Control'}
            </h1>
            <div className="flex items-center mt-1">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
              <p className="text-slate-500 font-medium text-sm">{currentUser.hospital}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-200 animate-in slide-in-from-right duration-500">
            <i className="fa-solid fa-calendar-day text-blue-500"></i>
            <span className="text-sm font-bold text-slate-600">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </header>

        <div className="max-w-7xl mx-auto space-y-8">
          {activeTab === 'dashboard' && (
             <Reports 
                predictions={currentUser.role === UserRole.ADMIN ? predictions : doctorPredictions} 
                title={currentUser.role === UserRole.ADMIN ? "National" : "Personal"} 
              />
          )}

          {activeTab === 'predict' && currentUser.role === UserRole.DOCTOR && (
            <RiskAssessmentForm user={currentUser} onSave={handleSavePrediction} />
          )}

          {activeTab === 'history' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom duration-500">
               <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                 <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">Archived Cases</h3>
                 <div className="relative">
                   <input type="text" placeholder="Search ID..." className="pl-8 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                   <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]"></i>
                 </div>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Patient Identity</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Screening Date</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">AI Result</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Clinical Insight</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(currentUser.role === UserRole.ADMIN ? predictions : doctorPredictions).map(p => (
                        <tr key={p.id} className="hover:bg-blue-50/30 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-800">{p.patientName}</span>
                              <span className="text-[10px] text-slate-400 uppercase font-bold">Age: {p.data.age}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-600 text-sm font-medium">{p.date}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm ${
                              p.result.includes('High') || p.result.includes('CIN') ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
                            }`}>
                              {p.result}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-500 leading-relaxed max-w-sm truncate italic">
                            {p.reasoning}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
            </div>
          )}

          {activeTab === 'users' && currentUser.role === UserRole.ADMIN && (
            <AdminPanel 
              users={users} 
              predictions={predictions} 
              onAddUser={(u) => setUsers([...users, u])}
              onDeleteUser={handleDeleteUser}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
