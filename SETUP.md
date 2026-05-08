# Homeless Predictor UI

A web application to predict whether individuals are likely to experience chronic homelessness based on demographic and personal factors.

## Setup

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8 or higher
- pip (Python package manager)

### Backend Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Start the FastAPI backend server:
```bash
python app.py
```

The backend will run on `http://localhost:8000`

### Frontend Setup

1. Install Node dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is in use)

## How to Use

1. Make sure both the backend (Flask) and frontend (Vite) servers are running
2. Navigate to the frontend URL in your browser
3. Fill out the form across the 3 pages with the individual's information
4. Click "Enter" on the final page to submit
5. View the prediction result showing whether they are likely to be chronically homeless

## Form Fields

The form collects 19 fields across 3 pages:

**Page 1:**
- Year
- Age
- Gender
- Race
- Youth
- Indigenous Flag
- LGBTQ
- Immigrant
- Years Homeless

**Page 2:**
- Chronic Homeless
- Outdoor Sleeping
- Shelter Type
- Foster Care History
- Incarceration History
- Mental Health
- Substance Use
- No Income
- Housing Loss Due to Income

**Page 3:**
- Housing Loss Due to Health

## Model

The application uses an XGBoost machine learning model (`youth_chronic_xgboost.pkl`) to predict whether an individual is likely to experience chronic homelessness based on the provided information.

## API Endpoint

### POST /predict

Sends form data to the backend for prediction on `http://localhost:8000/predict`.

**Request:**
```json
{
  "year": 2024,
  "age": 35,
  "years_homeless": 3.5,
  "gender": "male",
  "race": "caucasian",
  "mental_health": "yes",
  "substance_use": "no",
  "outdoor_sleeping": "yes",
  "chronic_homeless": "no",
  "shelter_type": "emergency",
  "youth": "no",
  "indigenous_flag": "no",
  "lgbtq": "no",
  "immigrant": "no",
  "foster_care_history": "no",
  "incarceration_history": "yes",
  "no_income": "no",
  "housing_loss_income": "yes",
  "housing_loss_health": "no"
}
```

**Response:**
```json
{
  "success": true,
  "prediction": 1,
  "chronic": true,
  "probability": {
    "not_chronic": 0.25,
    "chronic": 0.75
  }
}
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

## Technologies Used

- **Frontend:** React, Vite, CSS
- **Backend:** FastAPI, Uvicorn, numpy
- **Model:** XGBoost classifier (with heuristic fallback)
