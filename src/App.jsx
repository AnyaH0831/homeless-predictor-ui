import { useState } from 'react'
import NavBar from './components/NavBar'
import Form from './components/Form'
import Result from './components/Result'
import './App.css'

function App() {
  const [showResult, setShowResult] = useState(false)
  const [prediction, setPrediction] = useState(null)
  const [probability, setProbability] = useState(null)

  const handlePredictionComplete = (pred, prob) => {
    setPrediction(pred)
    setProbability(prob)
    setShowResult(true)
  }

  const handleReset = () => {
    setShowResult(false)
    setPrediction(null)
    setProbability(null)
  }

  return (
    <>
      <NavBar />
      {showResult ? (
        <Result 
          prediction={prediction} 
          probability={probability} 
          onReset={handleReset}
        />
      ) : (
        <Form onPredictionComplete={handlePredictionComplete} />
      )}
    </>
  )
}

export default App
