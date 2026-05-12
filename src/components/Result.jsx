function Result({ prediction, probability, featureImportance = [], hasResult, onReset }) {
  if (!hasResult || prediction === null || !probability) {
    return (
      <div className="w-full rounded-lg bg-white p-6 shadow-md sm:p-8">
        <h2 className="m-0 border-b-2 border-gray-200 pb-4 text-center text-2xl font-semibold text-gray-800">
          Prediction Result
        </h2>
        <div className="mt-6 rounded-md border border-dashed border-gray-300 bg-white p-6 text-center text-gray-600">
          Submit the form to view prediction, confidence, and feature importance ranking.
        </div>
      </div>
    )
  }

  const isChronic = prediction === 1
  const totalImportance = featureImportance.reduce(
    (sum, item) => sum + (Number(item.importance) || 0),
    0,
  )
  const topFeatures = featureImportance.slice(0, 10)

  return (
    <div className="w-full rounded-lg bg-white p-6 shadow-md sm:p-8">
        <div className="mb-8 border-b-2 border-gray-200 pb-4 text-center">
          <h2 className="m-0 text-2xl font-semibold text-gray-800">Prediction Result</h2>
        </div>

        <div className="mb-8 rounded-md bg-white px-4 py-4 text-center sm:px-6">
          <div>
            <h3 className="my-2 text-2xl font-semibold text-gray-800 sm:text-3xl">
              {isChronic
                ? 'Likely to be Chronically Homeless'
                : 'Not Likely to be Chronically Homeless'}
            </h3>
            <p className="mt-2 text-base leading-6 text-gray-600">
              {isChronic
                ? 'Based on the provided information, this individual is predicted to experience chronic homelessness.'
                : 'Based on the provided information, this individual is not predicted to experience chronic homelessness.'}
            </p>
          </div>

          <div className="mt-6 rounded-md bg-white p-4 text-left sm:p-6">
            <h4 className="mb-4 text-center text-lg font-semibold text-gray-800">Prediction Confidence</h4>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600">Not Chronic</label>
                <div className="relative h-10 w-full overflow-hidden rounded bg-gray-200">
                  <div
                    className="flex h-full min-w-10 items-center justify-end bg-gradient-to-r from-green-600 to-green-500 pr-3 text-white transition-all duration-500 ease-out"
                    style={{
                      width: `${(probability.not_chronic * 100).toFixed(1)}%`,
                    }}
                  >
                    <span className="whitespace-nowrap text-sm font-semibold">
                      {(probability.not_chronic * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600">Chronic</label>
                <div className="relative h-10 w-full overflow-hidden rounded bg-gray-200">
                  <div
                    className="flex h-full min-w-10 items-center justify-end bg-gradient-to-r from-red-600 to-red-500 pr-3 text-white transition-all duration-500 ease-out"
                    style={{
                      width: `${(probability.chronic * 100).toFixed(1)}%`,
                    }}
                  >
                    <span className="whitespace-nowrap text-sm font-semibold">
                      {(probability.chronic * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-md bg-white p-4 text-left sm:p-6">
            <h4 className="mb-4 text-center text-lg font-semibold text-gray-800">Feature Importance Ranking</h4>
            <div className="flex flex-col gap-3">
              {topFeatures.map((item, index) => {
                const rawImportance = Number(item.importance) || 0
                const normalized = totalImportance > 0 ? (rawImportance / totalImportance) * 100 : 0
                return (
                  <div key={item.feature} className="rounded border border-gray-200 p-3">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-gray-700">
                        {index + 1}. {item.label}
                      </span>
                      <span className="text-xs font-medium text-gray-500">
                        {normalized.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded bg-gray-200">
                      <div
                        className="h-full rounded bg-blue-500"
                        style={{ width: `${Math.max(normalized, 2)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <button
          className="mt-4 w-full rounded-md bg-red-600 px-8 py-3 text-base font-semibold text-white transition hover:bg-red-700 active:bg-red-800"
          onClick={onReset}
        >
          Start Over
        </button>
    </div>
  )
}

export default Result
