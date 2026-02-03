
import { GoogleGenAI, Type } from "@google/genai";
import { PatientData, PredictionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const predictRisk = async (data: PatientData): Promise<{ result: PredictionResult, confidence: number, reasoning: string }> => {
  const prompt = `
    As an AI specialized in cervical cancer risk prediction for the Rwanda Biomedical Centre, analyze this patient data:
    - Age: ${data.age}
    - Marital Status: ${data.maritalStatus}
    - Residence: ${data.residence}
    - Parity: ${data.parity}
    - HIV Status: ${data.hivStatus ? 'Positive' : 'Negative'}
    - Smoking: ${data.smokingStatus ? 'Yes' : 'No'}
    - HPV Result: ${data.hpvResult}
    - VIA Result: ${data.viaResult}
    - Pap Smear: ${data.papSmear}
    - Last Screening: ${data.lastVisitMonths} months ago

    Provide a risk prediction based on standard clinical guidelines for cervical cancer screening.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          result: {
            type: Type.STRING,
            description: "One of: Normal, Not high risk, High risk, CIN I, CIN II, CIN III, Suspicious early cervical cancer",
          },
          confidence: {
            type: Type.NUMBER,
            description: "Value between 0 and 1",
          },
          reasoning: {
            type: Type.STRING,
            description: "Short clinical explanation for the prediction",
          }
        },
        required: ["result", "confidence", "reasoning"],
      },
      systemInstruction: "You are an expert oncologist and AI diagnostic system designed for the RBC National Cervical Cancer Screening Program in Rwanda. Your goal is early risk stratification."
    },
  });

  try {
    const output = JSON.parse(response.text || '{}');
    return {
      result: output.result as PredictionResult,
      confidence: output.confidence || 0.5,
      reasoning: output.reasoning || "Automatic analysis completed."
    };
  } catch (e) {
    console.error("Error parsing Gemini response", e);
    return {
      result: PredictionResult.NORMAL,
      confidence: 0,
      reasoning: "Analysis failed. Please consult a specialist."
    };
  }
};
