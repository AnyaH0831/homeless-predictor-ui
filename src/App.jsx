import { useState } from 'react'
import NavBar from './components/NavBar'
import Form from './components/Form'
import Result from './components/Result'

function App() {
  const [prediction, setPrediction] = useState(null)
  const [probability, setProbability] = useState(null)
  const [featureImportance, setFeatureImportance] = useState([])
  const [hasResult, setHasResult] = useState(false)

  const handlePredictionComplete = (pred, prob, importance = []) => {
    setPrediction(pred)
    setProbability(prob)
    setFeatureImportance(importance)
    setHasResult(true)
  }

  const handleReset = () => {
    setPrediction(null)
    setProbability(null)
    setFeatureImportance([])
    setHasResult(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 text-gray-800">
      <NavBar />
      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-2 lg:items-start lg:gap-8 sm:px-6 lg:px-8">
        <section className="order-1">
          <Form onPredictionComplete={handlePredictionComplete} />
        </section>
        <section className="order-2">
          <Result
            prediction={prediction}
            probability={probability}
            featureImportance={featureImportance}
            hasResult={hasResult}
            onReset={handleReset}
          />
        </section>
      </main>
    </div>
  )
}

export default App
