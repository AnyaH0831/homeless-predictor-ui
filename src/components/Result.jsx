import React from 'react'
import './Result.css'

function Result({ prediction, probability, onReset }) {
  const isChronic = prediction === 1

  return (
    <div className="result-container">
      <div className="result-card">
        <div className="result-header">
          <h2>Prediction Result</h2>
        </div>

        <div className={`result-content ${isChronic ? 'chronic' : 'not-chronic'}`}>
          <div className="result-icon">
            {isChronic ? '⚠️' : '✓'}
          </div>

          <div className="result-text">
            <h3>
              {isChronic
                ? 'Likely to be Chronically Homeless'
                : 'Not Likely to be Chronically Homeless'}
            </h3>
            <p className="result-description">
              {isChronic
                ? 'Based on the provided information, this individual is predicted to experience chronic homelessness.'
                : 'Based on the provided information, this individual is not predicted to experience chronic homelessness.'}
            </p>
          </div>

          <div className="probability-section">
            <h4>Prediction Confidence</h4>
            <div className="probability-bars">
              <div className="probability-item">
                <label>Not Chronic</label>
                <div className="probability-bar">
                  <div
                    className="probability-fill not-chronic-fill"
                    style={{
                      width: `${(probability.not_chronic * 100).toFixed(1)}%`,
                    }}
                  >
                    <span className="probability-text">
                      {(probability.not_chronic * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="probability-item">
                <label>Chronic</label>
                <div className="probability-bar">
                  <div
                    className="probability-fill chronic-fill"
                    style={{
                      width: `${(probability.chronic * 100).toFixed(1)}%`,
                    }}
                  >
                    <span className="probability-text">
                      {(probability.chronic * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="reset-button" onClick={onReset}>
          Start Over
        </button>
      </div>
    </div>
  )
}

export default Result
