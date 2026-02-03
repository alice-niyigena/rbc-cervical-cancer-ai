
# RBC Cervical Cancer AI Risk Prediction Portal

This is a clinical decision-support tool designed for the Rwanda Biomedical Centre (RBC).

## 🚀 Deployment Instructions

### 1. Environment Variables
The application requires a Google Gemini API Key to function.
- Create an environment variable named `API_KEY`.
- You can get a key from the [Google AI Studio](https://aistudio.google.com/).

### 2. Local Development
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`

### 3. Hosting (Vercel/Netlify)
1. Push this code to GitHub.
2. Connect your GitHub to Vercel or Netlify.
3. Add the `API_KEY` in the project settings under "Environment Variables".
4. The site will build and provide you with a public URL.

## 🔐 Credentials for Testing
- **Doctor:** `bosco@rbc.gov.rw` | `doctor123`
- **Admin:** `admin@rbc.gov.rw` | `admin123`

## 🛠 Tech Stack
- **Frontend:** React 19, Tailwind CSS
- **AI Engine:** Google Gemini (via `@google/genai`)
- **Visuals:** Recharts
- **Icons:** FontAwesome
