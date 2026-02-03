
import React from 'react';
import { User, PredictionRecord, UserRole } from '../types';

interface Props {
  users: User[];
  predictions: PredictionRecord[];
  onAddUser: (user: User) => void;
  onDeleteUser: (id: string) => void;
}

const AdminPanel: React.FC<Props> = ({ users, predictions, onDeleteUser }) => {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', val: users.length, icon: 'fa-users', color: 'bg-blue-500' },
          { label: 'Total Predictions', val: predictions.length, icon: 'fa-microscope', color: 'bg-green-500' },
          { label: 'High Risk Alerts', val: predictions.filter(p => p.result.includes('High') || p.result.includes('CIN')).length, icon: 'fa-triangle-exclamation', color: 'bg-red-500' },
          { label: 'Active Facilities', val: new Set(users.map(u => u.hospital)).size, icon: 'fa-hospital', color: 'bg-purple-500' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center">
            <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mr-4 shadow-sm`}>
              <i className={`fa-solid ${stat.icon}`}></i>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* User Management */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">System User Management</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">
            <i className="fa-solid fa-user-plus mr-2"></i> Add New User
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">User Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Facility</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 mr-3">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{u.name}</div>
                        <div className="text-xs text-slate-500">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                      u.role === UserRole.ADMIN ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{u.hospital}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => onDeleteUser(u.id)}
                      className="text-slate-400 hover:text-red-500 transition mr-3"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <button className="text-slate-400 hover:text-blue-500 transition">
                      <i className="fa-solid fa-pen"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
