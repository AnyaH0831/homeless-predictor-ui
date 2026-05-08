from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Try to load the model
model = None
try:
    with open('model/youth_chronic_xgboost.pkl', 'rb') as f:
        model = pickle.load(f)
except Exception as e:
    print(f"Warning: Could not load model: {e}")
    print("The API will work but will return mock predictions.")

# Define request model
class PredictionRequest(BaseModel):
    year: int = 0
    age: int = 0
    years_homeless: float = 0.0
    gender: str = "male"
    race: str = "caucasian"
    mental_health: str = "no"
    substance_use: str = "no"
    outdoor_sleeping: str = "no"
    shelter_type: str = "none"
    youth: str = "no"
    indigenous_flag: str = "no"
    lgbtq: str = "no"
    immigrant: str = "no"
    foster_care_history: str = "no"
    incarceration_history: str = "no"
    no_income: str = "no"
    housing_loss_income: str = "no"
    housing_loss_health: str = "no"

@app.post("/predict")
def predict(request: PredictionRequest):
    try:
        # Convert categorical fields to numeric values
        gender_map = {'male': 0, 'female': 1, 'non_binary': 2, 'prefer_not_to_say': 3}
        race_map = {'indigenous': 0, 'black': 1, 'asian': 2, 'caucasian': 3, 'other': 4}
        shelter_map = {'emergency': 0, 'transitional': 1, 'supportive': 2, 'none': 3}
        yes_no_map = {'yes': 1, 'no': 0}
        
        # Prepare feature vector
        features = np.array([[
            request.year,
            request.age,
            request.years_homeless,
            gender_map.get(request.gender, 0),
            race_map.get(request.race, 3),
            yes_no_map.get(request.mental_health, 0),
            yes_no_map.get(request.substance_use, 0),
            yes_no_map.get(request.outdoor_sleeping, 0),
            shelter_map.get(request.shelter_type, 3),
            yes_no_map.get(request.youth, 0),
            yes_no_map.get(request.indigenous_flag, 0),
            yes_no_map.get(request.lgbtq, 0),
            yes_no_map.get(request.immigrant, 0),
            yes_no_map.get(request.foster_care_history, 0),
            yes_no_map.get(request.incarceration_history, 0),
            yes_no_map.get(request.no_income, 0),
            yes_no_map.get(request.housing_loss_income, 0),
            yes_no_map.get(request.housing_loss_health, 0),
        ]])
        
        # Make prediction
        if model is not None:
            prediction = model.predict(features)[0]
            probability = model.predict_proba(features)[0]
        else:
            # Fallback: Use a simple heuristic if model is not available
            # Count risk factors
            risk_score = (
                yes_no_map.get(request.mental_health, 0) +
                yes_no_map.get(request.substance_use, 0) +
                yes_no_map.get(request.outdoor_sleeping, 0) +
                yes_no_map.get(request.foster_care_history, 0) +
                yes_no_map.get(request.incarceration_history, 0) +
                yes_no_map.get(request.no_income, 0)
            )
            
            # Simple heuristic: if 3+ risk factors, predict chronic
            prediction = 1 if risk_score >= 3 else 0
            prob_chronic = min(0.95, (risk_score / 6.0) * 0.9 + 0.1)
            probability = np.array([1 - prob_chronic, prob_chronic])
        
        return {
            'success': True,
            'prediction': int(prediction),
            'chronic': bool(prediction),
            'probability': {
                'not_chronic': float(probability[0]),
                'chronic': float(probability[1])
            }
        }
    
    except Exception as e:
        print(f"Prediction error: {e}")
        return {
            'success': False,
            'error': str(e)
        }

@app.get("/health")
def health():
    return {'status': 'ok'}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
