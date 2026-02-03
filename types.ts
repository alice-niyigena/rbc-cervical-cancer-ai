
export enum UserRole {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR'
}

export enum PredictionResult {
  NORMAL = 'Normal',
  NOT_HIGH_RISK = 'Not high risk',
  HIGH_RISK = 'High risk',
  CIN_I = 'CIN I',
  CIN_II = 'CIN II',
  CIN_III = 'CIN III',
  SUSPICIOUS = 'Suspicious early cervical cancer'
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Simulation of database password field
  role: UserRole;
  hospital: string;
}

export interface PatientData {
  age: number;
  maritalStatus: string;
  educationLevel: string;
  residence: 'Urban' | 'Rural';
  parity: number;
  smokingStatus: boolean;
  contraceptiveUse: boolean;
  hivStatus: boolean;
  hpvResult: 'Positive' | 'Negative' | 'Pending';
  viaResult: 'Positive' | 'Negative' | 'Pending';
  papSmear: 'Normal' | 'Abnormal' | 'Pending';
  prevVisits: number;
  lastVisitMonths: number;
}

export interface PredictionRecord {
  id: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  data: PatientData;
  result: PredictionResult;
  confidence: number;
  reasoning: string;
}
