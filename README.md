# Homeless Predictor UI

A React + Vite web app for entering client information and viewing a homelessness risk prediction from a FastAPI backend.

The app is split into two parts:

- Frontend: React UI built with Vite and styled with Tailwind CSS
- Backend: FastAPI service that loads a machine learning model and returns predictions

## What the app does

- Collects demographic, housing, and risk-factor inputs through a multi-step form
- Sends the data to a local API at http://localhost:8000/predict
- Displays the prediction result, confidence scores, and feature importance ranking
- Falls back to a simple heuristic prediction if the model file cannot be loaded

## Tech stack

- React 19
- Vite
- Tailwind CSS 4
- FastAPI
- Uvicorn
- NumPy
- XGBoost
- scikit-learn

## Project structure

- app.py: FastAPI backend and prediction endpoint
- model/: trained model file used by the backend
- src/: React source code
  - App.jsx: main layout and result state handling
  - components/Form.jsx: multi-page input form
  - components/Result.jsx: prediction and feature importance display
  - components/NavBar.jsx: top navigation bar

## Prerequisites

- Node.js 18 or newer
- Python 3.10 or newer
- npm and pip available in your terminal

## Setup

### 1. Install frontend dependencies

```bash
npm install
```

### 2. Install backend dependencies

```bash
pip install -r requirements.txt
```

## Running the app locally

You need both services running at the same time.

### Start the backend

```bash
python app.py
```

The backend runs on http://localhost:8000.

### Start the frontend

```bash
npm run dev
```

The frontend runs on the Vite dev server, usually at http://localhost:5173.

## API endpoints

### GET /health

Returns a simple health check response.

Example response:

```json
{ "status": "ok" }
```

### POST /predict

Accepts a JSON body with the form fields and returns:

- prediction: 0 or 1
- chronic: true or false
- probability: not_chronic and chronic scores
- feature_importance: ranked feature list

Example response:

```json
{
  "success": true,
  "prediction": 1,
  "chronic": true,
  "probability": {
    "not_chronic": 0.21,
    "chronic": 0.79
  },
  "feature_importance": []
}
```

## Input fields

The form captures the following information:

- Year
- Age
- Years Homeless
- Gender
- Race
- Mental Health
- Substance Use
- Outdoor Sleeping
- Shelter Type
- Youth
- Indigenous Flag
- LGBTQ
- Immigrant
- Foster Care History
- Incarceration History
- No Income
- Housing Loss Due to Income
- Housing Loss Due to Health

## Model behavior

- The backend tries to load model/youth_chronic_xgboost.pkl at startup
- If the model is available, predictions and probabilities come from the trained model
- If the model is missing or fails to load, the API still works and returns a heuristic fallback prediction
- Feature importance is derived from the loaded model when possible, otherwise a fallback ranking is used

## Important notes

- The app is configured for local development and expects the backend to run on port 8000
- The backend enables CORS for all origins during development
- The prediction output is intended for demonstration and research use only
- It should not be used as the sole basis for clinical, legal, housing, or eligibility decisions

## Common issues

### Backend error when starting

Make sure the required Python packages are installed, including XGBoost and scikit-learn, and that the model file exists at model/youth_chronic_xgboost.pkl.

### Frontend cannot fetch predictions

Confirm that the backend is running on http://localhost:8000 before submitting the form.

### Port already in use

Stop any other process using port 8000 for the backend or the Vite port for the frontend, then start the app again.

## Available scripts

From package.json:

- npm run dev: start the frontend in development mode
- npm run build: build the frontend for production
- npm run lint: run ESLint
- npm run preview: preview the production build

## License

No license has been specified yet.
