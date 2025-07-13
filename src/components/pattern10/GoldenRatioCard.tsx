import { useMemo } from 'react'
import { calculateGoldenRatioDetails } from '../../utils/calculations'
import { quranData } from '../../data/quran'

interface GoldenRatioCardProps {
  className?: string
}

export default function GoldenRatioCard({ className = '' }: GoldenRatioCardProps) {
  const goldenRatioDetails = useMemo(() => calculateGoldenRatioDetails(quranData), [])

  // Create value-to-info mapping for tooltips
  const repetitiveValueInfo = useMemo(() => {
    const info: Record<number, { frequency: number; surahs: number[] }> = {}
    goldenRatioDetails.repetitiveBreakdown.forEach(item => {
      info[item.columnCValue] = {
        frequency: item.frequency,
        surahs: item.surahs
      }
    })
    return info
  }, [goldenRatioDetails.repetitiveBreakdown])

  const nonRepetitiveValueInfo = useMemo(() => {
    const info: Record<number, { surah: number }> = {}
    goldenRatioDetails.nonRepetitiveBreakdown.forEach(item => {
      info[item.columnCValue] = {
        surah: item.surah
      }
    })
    return info
  }, [goldenRatioDetails.nonRepetitiveBreakdown])

  return (
    <div className={`bg-gradient-to-br from-pink-50 to-orange-50 border border-pink-200 rounded-lg p-4 shadow-md ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></div>
        <h3 className="text-lg font-bold text-gray-800">Pattern 10: Golden Ratio φ</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
        {/* Card 1: Repetitive Column C values */}
        <div className="bg-orange-100/70 p-4 rounded border border-orange-200 h-fit">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div>
              <div className="font-semibold text-orange-700">Repetitive Values</div>
              <div className="text-xs text-orange-600">({goldenRatioDetails.repetitiveValues.length} unique)</div>
            </div>
          </div>
          <div className="text-xs text-gray-700 mb-3">
            <div className="font-mono break-words leading-relaxed">
              {goldenRatioDetails.repetitiveValues.map((value, index) => (
                <span
                  key={value}
                  className="relative inline-block cursor-help hover:bg-orange-200 hover:text-orange-800 px-1 rounded transition-colors group"
                  title={`Value ${value}: appears ${repetitiveValueInfo[value]?.frequency} times in surahs ${repetitiveValueInfo[value]?.surahs.join(', ')}`}
                >
                  {value}{index < goldenRatioDetails.repetitiveValues.length - 1 ? ', ' : ''}
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="text-center">
                      <div className="font-bold">Value: {value}</div>
                      <div>Appears {repetitiveValueInfo[value]?.frequency} times</div>
                      <div>Surahs: {repetitiveValueInfo[value]?.surahs.join(', ')}</div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                  </div>
                </span>
              ))}
            </div>
          </div>
          <div className="text-xs text-orange-600 text-center">
            <div><strong>Sum:</strong> <span className="font-bold text-orange-700">{goldenRatioDetails.repetitiveSum.toLocaleString()}</span></div>
            <div className="text-gray-500">({goldenRatioDetails.repetitiveCount} total occurrences)</div>
          </div>
        </div>

        {/* Card 2: Non-repetitive Column C values */}
        <div className="bg-blue-100/70 p-4 rounded border border-blue-200 h-fit">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div>
              <div className="font-semibold text-blue-700">Non-Repetitive Values</div>
              <div className="text-xs text-blue-600">({goldenRatioDetails.nonRepetitiveValues.length} unique)</div>
            </div>
          </div>
          <div className="text-xs text-gray-700 mb-3">
            <div className="font-mono break-words leading-relaxed">
              {goldenRatioDetails.nonRepetitiveValues.map((value, index) => (
                <span
                  key={value}
                  className="relative inline-block cursor-help hover:bg-blue-200 hover:text-blue-800 px-1 rounded transition-colors group"
                  title={`Value ${value}: appears once in surah ${nonRepetitiveValueInfo[value]?.surah}`}
                >
                  {value}{index < goldenRatioDetails.nonRepetitiveValues.length - 1 ? ', ' : ''}
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="text-center">
                      <div className="font-bold">Value: {value}</div>
                      <div>Appears once</div>
                      <div>Surah: {nonRepetitiveValueInfo[value]?.surah}</div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                  </div>
                </span>
              ))}
            </div>
          </div>
          <div className="text-xs text-blue-600 text-center">
            <div><strong>Sum:</strong> <span className="font-bold text-blue-700">{goldenRatioDetails.nonRepetitiveSum.toLocaleString()}</span></div>
            <div className="text-gray-500">({goldenRatioDetails.nonRepetitiveCount} total occurrences)</div>
          </div>
        </div>

        {/* Card 3: Golden ratio calculation + Assessment */}
        <div className="bg-gradient-to-r from-pink-100 to-orange-100 p-4 rounded border border-pink-300 h-fit">
          <div className="text-center mb-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Golden Ratio Calculation</div>
            <div className="text-base font-mono font-bold text-gray-800 mb-1">
              {goldenRatioDetails.repetitiveSum.toLocaleString()} ÷ {goldenRatioDetails.nonRepetitiveSum.toLocaleString()}
            </div>
            <div className="text-xl font-mono font-bold text-pink-600">
              = {goldenRatioDetails.goldenRatio.toFixed(6)}
            </div>
            <div className="text-xs text-gray-600 mt-2">
              Expected φ ≈ 1.618034 | 
              <span className={`ml-1 ${Math.abs(goldenRatioDetails.goldenRatio - 1.618034) < 0.001 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(goldenRatioDetails.goldenRatio - 1.618034) < 0.001 ? '✅ Match!' : '❌ No match'}
              </span>
            </div>
          </div>
          
          {/* Honest assessment of accuracy */}
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
            <div className="text-xs">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-lg">🟡</span>
                <span className="font-semibold text-yellow-700">QUESTIONABLE Pattern</span>
              </div>
              <div className="space-y-1 text-gray-700">
                <div><strong>Calculated:</strong> {goldenRatioDetails.goldenRatio.toFixed(6)}</div>
                <div><strong>True φ:</strong> 1.618034</div>
                <div><strong>Error:</strong> {((Math.abs(goldenRatioDetails.goldenRatio - 1.618034) / 1.618034) * 100).toFixed(3)}%</div>
                <div className="text-yellow-700 mt-2 text-xs">
                  <strong>Note:</strong> Relies on subjective categorization and may be susceptible to post-hoc pattern recognition.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
