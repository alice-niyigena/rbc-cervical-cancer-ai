
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { PredictionRecord, PredictionResult } from '../types';

interface Props {
  predictions: PredictionRecord[];
  title: string;
}

const Reports: React.FC<Props> = ({ predictions, title }) => {
  const resultCounts = predictions.reduce((acc, curr) => {
    acc[curr.result] = (acc[curr.result] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(resultCounts).map(([name, value]) => ({ name, value }));
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">{title} Risk Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Patient Screenings by Age Group</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { group: '18-25', count: predictions.filter(p => p.data.age <= 25).length },
                { group: '26-35', count: predictions.filter(p => p.data.age > 25 && p.data.age <= 35).length },
                { group: '36-45', count: predictions.filter(p => p.data.age > 35 && p.data.age <= 45).length },
                { group: '46-60', count: predictions.filter(p => p.data.age > 45 && p.data.age <= 60).length },
                { group: '60+', count: predictions.filter(p => p.data.age > 60).length },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="group" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 font-bold text-slate-800">Recent Prediction Logs</div>
        <div className="overflow-x-auto">
           <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Patient</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Result</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Doctor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {predictions.slice().reverse().map(p => (
                <tr key={p.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-800">{p.patientName}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{p.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      p.result.includes('High') || p.result.includes('CIN') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {p.result}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{p.doctorName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
