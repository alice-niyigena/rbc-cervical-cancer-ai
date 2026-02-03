
import React, { useState } from 'react';
import { PatientData, PredictionResult, PredictionRecord, User } from '../types';
import { predictRisk } from '../services/geminiService';

interface Props {
  user: User;
  onSave: (record: PredictionRecord) => void;
}

const RiskAssessmentForm: React.FC<Props> = ({ user, onSave }) => {
  const [patientName, setPatientName] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PatientData>({
    age: 30,
    maritalStatus: 'Single',
    educationLevel: 'Secondary',
    residence: 'Urban',
    parity: 0,
    smokingStatus: false,
    contraceptiveUse: false,
    hivStatus: false,
    hpvResult: 'Pending',
    viaResult: 'Pending',
    papSmear: 'Pending',
    prevVisits: 0,
    lastVisitMonths: 12
  });

  const [prediction, setPrediction] = useState<{
    result: PredictionResult;
    confidence: number;
    reasoning: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await predictRisk(formData);
      setPrediction(result);
    } catch (error) {
      alert("Prediction failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!prediction) return;
    const record: PredictionRecord = {
      id: Math.random().toString(36).substr(2, 9),
      patientName,
      doctorId: user.id,
      doctorName: user.name,
      date: new Date().toISOString().split('T')[0],
      data: formData,
      result: prediction.result,
      confidence: prediction.confidence,
      reasoning: prediction.reasoning
    };
    onSave(record);
    setPrediction(null);
    setPatientName('');
    alert("Prediction saved successfully!");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h2 className="text-xl font-bold text-slate-800">New Patient Risk Assessment</h2>
        <p className="text-sm text-slate-500">Enter clinical data to generate an AI prediction</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="col-span-full">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Patient Full Name</label>
            <input
              required
              type="text"
              value={patientName}
              onChange={e => setPatientName(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={e => setFormData({ ...formData, age: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Residence</label>
            <select
              value={formData.residence}
              onChange={e => setFormData({ ...formData, residence: e.target.value as 'Urban' | 'Rural' })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            >
              <option value="Urban">Urban</option>
              <option value="Rural">Rural</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Parity (Childbirths)</label>
            <input
              type="number"
              value={formData.parity}
              onChange={e => setFormData({ ...formData, parity: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">HPV Test</label>
            <select
              value={formData.hpvResult}
              onChange={e => setFormData({ ...formData, hpvResult: e.target.value as any })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            >
              <option value="Pending">Pending</option>
              <option value="Negative">Negative</option>
              <option value="Positive">Positive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">VIA Result</label>
            <select
              value={formData.viaResult}
              onChange={e => setFormData({ ...formData, viaResult: e.target.value as any })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            >
              <option value="Pending">Pending</option>
              <option value="Negative">Negative</option>
              <option value="Positive">Positive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">HIV Status</label>
            <div className="flex items-center mt-2">
               <input
                type="checkbox"
                checked={formData.hivStatus}
                onChange={e => setFormData({ ...formData, hivStatus: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded border-slate-300"
              />
              <span className="ml-2 text-sm text-slate-600">HIV Positive</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !patientName}
            className={`px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50`}
          >
            {loading ? (
              <span className="flex items-center">
                <i className="fa-solid fa-circle-notch fa-spin mr-2"></i> Analyzing...
              </span>
            ) : 'Run AI Prediction'}
          </button>
        </div>
      </form>

      {prediction && (
        <div className="m-6 p-6 bg-blue-50 border border-blue-200 rounded-xl animate-in fade-in duration-500">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-blue-900">AI Analysis Complete</h3>
              <p className="text-sm text-blue-700">Recommended stratification for {patientName}</p>
            </div>
            <div className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-bold">
              Confidence: {(prediction.confidence * 100).toFixed(1)}%
            </div>
          </div>

          <div className="mb-4">
             <span className={`text-2xl font-black uppercase tracking-wider ${
               prediction.result.includes('High') || prediction.result.includes('CIN') || prediction.result.includes('Suspicious') 
               ? 'text-red-600' : 'text-green-600'
             }`}>
               {prediction.result}
             </span>
          </div>

          <p className="text-slate-700 mb-6 leading-relaxed italic border-l-4 border-blue-300 pl-4">
            &quot;{prediction.reasoning}&quot;
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
            >
              Save to Patient Records
            </button>
            <button
              onClick={() => setPrediction(null)}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-bold"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskAssessmentForm;
