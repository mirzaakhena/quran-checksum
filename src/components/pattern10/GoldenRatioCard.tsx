import { useMemo, useState } from 'react'
import { calculateGoldenRatioDetails } from '../../utils/calculations'
import { quranData } from '../../data/quran'

interface GoldenRatioCardProps {
  className?: string
}

export default function GoldenRatioCard({ className = '' }: GoldenRatioCardProps) {
  const goldenRatioDetails = useMemo(() => calculateGoldenRatioDetails(quranData), [])
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false)
  const [showNonRepetitiveBreakdown, setShowNonRepetitiveBreakdown] = useState(false)

  // Format arrays to show all values without truncation
  const formatArray = (arr: number[]): string => {
    return arr.join(', ')
  }

  const repetitiveDisplay = formatArray(goldenRatioDetails.repetitiveValues)
  const nonRepetitiveDisplay = formatArray(goldenRatioDetails.nonRepetitiveValues)

  return (
    <div className={`bg-gradient-to-br from-pink-50 to-orange-50 border border-pink-200 rounded-lg p-4 shadow-md ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></div>
        <h3 className="text-lg font-bold text-gray-800">Pattern 10: Golden Ratio φ</h3>
      </div>
      
      <div className="space-y-3 text-sm">
        {/* Repetitive Column C values */}
        <div className="bg-orange-100/70 p-3 rounded border border-orange-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="font-semibold text-orange-700">Repetitive Column C Values (A+B)</span>
            <span className="text-xs text-orange-600">({goldenRatioDetails.repetitiveValues.length} unique values)</span>
          </div>
          <div className="text-xs text-gray-700 mb-1">
            <div className="font-mono bg-white px-2 py-1 rounded border break-words leading-relaxed">{repetitiveDisplay}</div>
          </div>
          <div className="text-xs text-orange-600">
            → Sum: <span className="font-bold text-orange-700">{goldenRatioDetails.repetitiveSum.toLocaleString()}</span> 
            <span className="text-gray-500 ml-2">({goldenRatioDetails.repetitiveCount} total occurrences)</span>
          </div>
          <button 
            onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
            className="text-xs text-orange-600 hover:text-orange-800 underline mt-2"
          >
            {showDetailedBreakdown ? 'Hide' : 'Show'} detailed frequency breakdown
          </button>
        </div>

        {/* Detailed frequency breakdown */}
        {showDetailedBreakdown && (
          <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="font-semibold text-yellow-700">Detailed Repetitive Value Breakdown</span>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {goldenRatioDetails.repetitiveBreakdown.map((item, index) => (
                <div key={index} className="text-xs bg-white p-2 rounded border">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-gray-800">{item.columnCValue}</span>
                    <span className="text-gray-600">appears</span>
                    <span className="font-bold text-blue-600">{item.frequency} times</span>
                    <span className="text-gray-600">in surahs:</span>
                  </div>
                  <div className="font-mono text-blue-700">
                    {item.surahs.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Non-repetitive Column C values */}
        <div className="bg-blue-100/70 p-3 rounded border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="font-semibold text-blue-700">Non-Repetitive Column C Values (A+B)</span>
            <span className="text-xs text-blue-600">({goldenRatioDetails.nonRepetitiveValues.length} unique values)</span>
          </div>
          <div className="text-xs text-gray-700 mb-1">
            <div className="font-mono bg-white px-2 py-1 rounded border break-words leading-relaxed">{nonRepetitiveDisplay}</div>
          </div>
          <div className="text-xs text-blue-600">
            → Sum: <span className="font-bold text-blue-700">{goldenRatioDetails.nonRepetitiveSum.toLocaleString()}</span>
            <span className="text-gray-500 ml-2">({goldenRatioDetails.nonRepetitiveCount} total occurrences)</span>
          </div>
          <button 
            onClick={() => setShowNonRepetitiveBreakdown(!showNonRepetitiveBreakdown)}
            className="text-xs text-blue-600 hover:text-blue-800 underline mt-2"
          >
            {showNonRepetitiveBreakdown ? 'Hide' : 'Show'} detailed surah breakdown
          </button>
        </div>

        {/* Detailed non-repetitive breakdown */}
        {showNonRepetitiveBreakdown && (
          <div className="bg-cyan-50 p-3 rounded border border-cyan-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              <span className="font-semibold text-cyan-700">Detailed Non-Repetitive Value Breakdown</span>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {goldenRatioDetails.nonRepetitiveBreakdown.map((item, index) => (
                <div key={index} className="text-xs bg-white p-2 rounded border">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-gray-800">{item.columnCValue}</span>
                    <span className="text-gray-600">appears once in surah:</span>
                    <span className="font-bold text-cyan-600">{item.surah}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Golden ratio calculation */}
        <div className="bg-gradient-to-r from-pink-100 to-orange-100 p-3 rounded border border-pink-300">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-700 mb-1">Golden Ratio Calculation</div>
            <div className="text-lg font-mono font-bold text-gray-800">
              {goldenRatioDetails.repetitiveSum.toLocaleString()} ÷ {goldenRatioDetails.nonRepetitiveSum.toLocaleString()} = 
              <span className="text-pink-600 ml-2">{goldenRatioDetails.goldenRatio.toFixed(6)}</span>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Expected φ ≈ 1.618034 | 
              <span className={`ml-1 ${Math.abs(goldenRatioDetails.goldenRatio - 1.618034) < 0.001 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(goldenRatioDetails.goldenRatio - 1.618034) < 0.001 ? '✅ Match!' : '❌ No match'}
              </span>
            </div>
          </div>
          
          {/* Honest assessment of accuracy */}
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
            <div className="text-xs">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-lg">🟡</span>
                <span className="font-semibold text-yellow-700">Pattern Assessment: QUESTIONABLE</span>
              </div>
              <div className="space-y-1 text-gray-700">
                <div><strong>Calculated:</strong> {goldenRatioDetails.goldenRatio.toFixed(6)}</div>
                <div><strong>True φ:</strong> 1.618034</div>
                <div><strong>Difference:</strong> {Math.abs(goldenRatioDetails.goldenRatio - 1.618034).toFixed(6)} 
                  <span className="text-gray-600">({((Math.abs(goldenRatioDetails.goldenRatio - 1.618034) / 1.618034) * 100).toFixed(3)}% error)</span>
                </div>
                <div className="text-yellow-700 mt-1">
                  <strong>Note:</strong> While remarkably close, this pattern relies on subjective definitions of "repetitive" vs "non-repetitive" values and may be susceptible to post-hoc pattern recognition.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded border">
          <div className="font-medium mb-1">Legend:</div>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-orange-400 rounded"></div>
              <span>Repetitive: Column C values (A+B) appearing multiple times</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded"></div>
              <span>Non-repetitive: Column C values (A+B) appearing only once</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
