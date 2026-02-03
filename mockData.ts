
import { PredictionRecord, User, UserRole, PredictionResult } from './types';

export const mockUsers: User[] = [
  { 
    id: '1', 
    name: 'Dr. Jean Bosco', 
    email: 'bosco@rbc.gov.rw', 
    password: 'doctor123',
    role: UserRole.DOCTOR, 
    hospital: 'Kigali Referral Hospital' 
  },
  { 
    id: '2', 
    name: 'Admin Sarah', 
    email: 'admin@rbc.gov.rw', 
    password: 'admin123',
    role: UserRole.ADMIN, 
    hospital: 'RBC Headquarters' 
  },
  { 
    id: '3', 
    name: 'Dr. Uwase Marie', 
    email: 'uwase@rbc.gov.rw', 
    password: 'doctor123',
    role: UserRole.DOCTOR, 
    hospital: 'Butare University Teaching Hospital' 
  },
];

export const initialPredictions: PredictionRecord[] = [
  {
    id: 'p1',
    patientName: 'Mukamana Alice',
    doctorId: '1',
    doctorName: 'Dr. Jean Bosco',
    date: '2024-05-10',
    result: PredictionResult.NORMAL,
    confidence: 0.98,
    reasoning: 'Patient shows no abnormal clinical markers. VIA and HPV tests are negative.',
    data: {
      age: 32, maritalStatus: 'Married', educationLevel: 'Secondary', residence: 'Urban', parity: 2,
      smokingStatus: false, contraceptiveUse: true, hivStatus: false,
      hpvResult: 'Negative', viaResult: 'Negative', papSmear: 'Normal',
      prevVisits: 3, lastVisitMonths: 12
    }
  },
  {
    id: 'p2',
    patientName: 'Nyiramana Solange',
    doctorId: '3',
    doctorName: 'Dr. Uwase Marie',
    date: '2024-05-12',
    result: PredictionResult.HIGH_RISK,
    confidence: 0.85,
    reasoning: 'HPV Positive and VIA shows mild abnormalities. Patient is HIV+ which increases risk factors.',
    data: {
      age: 45, maritalStatus: 'Widowed', educationLevel: 'Primary', residence: 'Rural', parity: 5,
      smokingStatus: false, contraceptiveUse: false, hivStatus: true,
      hpvResult: 'Positive', viaResult: 'Positive', papSmear: 'Abnormal',
      prevVisits: 1, lastVisitMonths: 48
    }
  }
];
