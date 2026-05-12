import { useState } from 'react'

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

  const resetForm = () => {
    setCurrentPage(1)
    setFormData({
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
  }

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
          onPredictionComplete(data.prediction, data.probability, data.feature_importance || [])
          resetForm()
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

  const fieldWrapperClass = 'flex flex-col'
  const fieldLabelClass = 'mb-2 text-sm font-semibold text-gray-700'
  const fieldInputClass =
    'rounded-md border border-gray-300 bg-white px-3 py-3 text-base text-gray-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100'

  // Page 1: Demographics and Personal Info (9 fields)
  const page1Fields = (
    <>
      <div className={fieldWrapperClass}>
        <label className={fieldLabelClass} htmlFor="year">Year</label>
        <input
          className={fieldInputClass}
          type="number"
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Enter year"
        />
      </div>

      <div className={fieldWrapperClass}>
        <label className={fieldLabelClass} htmlFor="age">Age</label>
        <input
          className={fieldInputClass}
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter age"
        />
      </div>

      <div className={fieldWrapperClass}>
        <label className={fieldLabelClass} htmlFor="gender">Gender</label>
        <select
          className={fieldInputClass}
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

      <div className={fieldWrapperClass}>
        <label className={fieldLabelClass} htmlFor="race">Race</label>
        <select
          className={fieldInputClass}
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

      <div className={fieldWrapperClass}>
        <label className={fieldLabelClass} htmlFor="youth">Youth</label>
        <select
          className={fieldInputClass}
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

      <div className={fieldWrapperClass}>
        <label className={fieldLabelClass} htmlFor="indigenous_flag">Indigenous Flag</label>
        <select
          className={fieldInputClass}
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

      <div className={fieldWrapperClass}>
        <label className={fieldLabelClass} htmlFor="lgbtq">LGBTQ</label>
        <select
          className={fieldInputClass}
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

      <div className={fieldWrapperClass}>
        <label className={fieldLabelClass} htmlFor="immigrant">Immigrant</label>
        <select
          className={fieldInputClass}
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

      <div className={fieldWrapperClass}>
        <label className={fieldLabelClass} htmlFor="years_homeless">Years Homeless</label>
        <input
          className={fieldInputClass}
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
      <div className={fieldWrapperClass}>
        <label className={fieldLabelClass} htmlFor="outdoor_sleeping">Outdoor Sleeping</label>
        <select
          className={fieldInputClass}
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

      <div className={fieldWrapperClass}>
        <label className={fieldLabelClass} htmlFor="shelter_type">Shelter Type</label>
        <select
          className={fieldInputClass}
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

      <div className={fieldWrapperClass}>
        <label className={fieldLabelClass} htmlFor="foster_care_history">Foster Care History</label>
        <select
          className={fieldInputClass}
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

      <div className={fieldWrapperClass}>
        <label className={fieldLabelClass} htmlFor="incarceration_history">Incarceration History</label>
        <select
          className={fieldInputClass}
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

      <div className={fieldWrapperClass}>
        <label className={fieldLabelClass} htmlFor="mental_health">Mental Health</label>
        <select
          className={fieldInputClass}
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

      <div className={fieldWrapperClass}>
        <label className={fieldLabelClass} htmlFor="substance_use">Substance Use</label>
        <select
          className={fieldInputClass}
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

      <div className={fieldWrapperClass}>
        <label className={fieldLabelClass} htmlFor="no_income">No Income</label>
        <select
          className={fieldInputClass}
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

      <div className={fieldWrapperClass}>
        <label className={fieldLabelClass} htmlFor="housing_loss_income">Housing Loss Due to Income</label>
        <select
          className={fieldInputClass}
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

      <div className={fieldWrapperClass}>
        <label className={fieldLabelClass} htmlFor="housing_loss_health">Housing Loss Due to Health</label>
        <select
          className={fieldInputClass}
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

  return (
    <div className="mx-auto w-full max-w-6xl px-2 sm:px-4">
      <form onSubmit={handleSubmit} className="mb-6 rounded-lg bg-white p-4 shadow-md sm:p-6 lg:p-8">
        <div className="mb-8 text-center">
          <h2 className="m-0 text-2xl font-semibold text-gray-800">Page {currentPage} of 2</h2>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentPage === 1 && page1Fields}
          {currentPage === 2 && page2Fields}
        </div>

        {currentPage === 2 && (
          <button
            type="submit"
            className="w-full rounded-md bg-red-600 px-8 py-3 text-base font-semibold text-white transition hover:bg-red-700 active:bg-red-800 disabled:cursor-not-allowed disabled:bg-red-300 disabled:opacity-70"
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Enter'}
          </button>
        )}
      </form>

      <div className="mt-4 flex gap-4">
        <button
          type="button"
          className="flex-1 rounded-md bg-gray-200 px-6 py-3 text-base font-semibold text-gray-700 transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {currentPage === 1 && (
          <button
            type="button"
            className="flex-1 rounded-md bg-gray-200 px-6 py-3 text-base font-semibold text-gray-700 transition hover:bg-gray-300"
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
