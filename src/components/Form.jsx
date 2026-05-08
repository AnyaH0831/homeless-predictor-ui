import React, { useState } from 'react'
import './Form.css'

function Form({ onPredictionComplete }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    year: '',
    age: '',
    years_homeless: '',
    gender: '',
    race: '',
    mental_health: '',
    substance_use: '',
    outdoor_sleeping: '',
    shelter_type: '',
    youth: '',
    indigenous_flag: '',
    lgbtq: '',
    immigrant: '',
    foster_care_history: '',
    incarceration_history: '',
    no_income: '',
    housing_loss_income: '',
    housing_loss_health: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNext = () => {
    if (currentPage < 2) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Call the FastAPI backend to get prediction
    fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          onPredictionComplete(data.prediction, data.probability)
        } else {
          alert('Error: ' + data.error)
        }
      })
      .catch((error) => {
        console.error('Error:', error)
        alert('Failed to get prediction. Make sure the backend is running on port 8000.')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // Page 1: Demographics and Personal Info (9 fields)
  const page1Fields = (
    <>
      <div className="form-group">
        <label htmlFor="year">Year</label>
        <input
          type="number"
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Enter year"
        />
      </div>

      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter age"
        />
      </div>

      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non_binary">Non-binary</option>
          <option value="prefer_not_to_say">Prefer not to say</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="race">Race</label>
        <select
          id="race"
          name="race"
          value={formData.race}
          onChange={handleChange}
        >
          <option value="">Select race</option>
          <option value="indigenous">Indigenous</option>
          <option value="black">Black</option>
          <option value="asian">Asian</option>
          <option value="caucasian">Caucasian</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="youth">Youth</label>
        <select
          id="youth"
          name="youth"
          value={formData.youth}
          onChange={handleChange}
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="indigenous_flag">Indigenous Flag</label>
        <select
          id="indigenous_flag"
          name="indigenous_flag"
          value={formData.indigenous_flag}
          onChange={handleChange}
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="lgbtq">LGBTQ</label>
        <select
          id="lgbtq"
          name="lgbtq"
          value={formData.lgbtq}
          onChange={handleChange}
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="immigrant">Immigrant</label>
        <select
          id="immigrant"
          name="immigrant"
          value={formData.immigrant}
          onChange={handleChange}
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="years_homeless">Years Homeless</label>
        <input
          type="number"
          id="years_homeless"
          name="years_homeless"
          value={formData.years_homeless}
          onChange={handleChange}
          placeholder="Enter years"
          step="0.1"
        />
      </div>
    </>
  )

  // Page 2: Homelessness and Risk Factors (8 fields)
  const page2Fields = (
    <>
      <div className="form-group">
        <label htmlFor="outdoor_sleeping">Outdoor Sleeping</label>
        <select
          id="outdoor_sleeping"
          name="outdoor_sleeping"
          value={formData.outdoor_sleeping}
          onChange={handleChange}
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="shelter_type">Shelter Type</label>
        <select
          id="shelter_type"
          name="shelter_type"
          value={formData.shelter_type}
          onChange={handleChange}
        >
          <option value="">Select shelter type</option>
          <option value="emergency">Emergency</option>
          <option value="transitional">Transitional</option>
          <option value="supportive">Supportive</option>
          <option value="none">None</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="foster_care_history">Foster Care History</label>
        <select
          id="foster_care_history"
          name="foster_care_history"
          value={formData.foster_care_history}
          onChange={handleChange}
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="incarceration_history">Incarceration History</label>
        <select
          id="incarceration_history"
          name="incarceration_history"
          value={formData.incarceration_history}
          onChange={handleChange}
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="mental_health">Mental Health</label>
        <select
          id="mental_health"
          name="mental_health"
          value={formData.mental_health}
          onChange={handleChange}
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="substance_use">Substance Use</label>
        <select
          id="substance_use"
          name="substance_use"
          value={formData.substance_use}
          onChange={handleChange}
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="no_income">No Income</label>
        <select
          id="no_income"
          name="no_income"
          value={formData.no_income}
          onChange={handleChange}
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="housing_loss_income">Housing Loss Due to Income</label>
        <select
          id="housing_loss_income"
          name="housing_loss_income"
          value={formData.housing_loss_income}
          onChange={handleChange}
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="housing_loss_health">Housing Loss Due to Health</label>
        <select
          id="housing_loss_health"
          name="housing_loss_health"
          value={formData.housing_loss_health}
          onChange={handleChange}
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
    </>
  )

  // Page 3: Final Field (0 fields)
  const page3Fields = (
    <>
    </>
  )

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-header">
          <h2>Page {currentPage} of 2</h2>
        </div>

        <div className="form-grid">
          {currentPage === 1 && page1Fields}
          {currentPage === 2 && page2Fields}
        </div>

        {currentPage === 2 && (
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Enter'}
          </button>
        )}
      </form>

      <div className="form-buttons">
        <button
          type="button"
          className="nav-button prev-button"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {currentPage === 1 && (
          <button
            type="button"
            className="nav-button next-button"
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export default Form
