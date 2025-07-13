import { useMemo } from 'react'
import InteractiveTable from '../components/table/InteractiveTable'
import { quranData } from '../data/quran'
import { calculatePatterns, validatePatterns } from '../utils/calculations'

export default function NaturalPatterns() {
  // Calculate patterns for display in summary cards
  const results = useMemo(() => calculatePatterns(quranData), [])
  const validation = useMemo(() => validatePatterns(results), [results])
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Natural Patterns - Primary Focus
        </h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          These 6 patterns show the most robust mathematical relationships in the Quran's structure. 
          They are considered "bulletproof" with minimal risk of cherry-picking or post-hoc modification.
        </p>
      </div>

      {/* Pattern Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-pattern-1-even">
          <h3 className="font-bold text-lg mb-2">Pattern 1: Perfect Balance</h3>
          <p className="text-gray-600 mb-3">6555 vs 6236 distribution</p>
          <div className="text-2xl font-bold text-pattern-1-even">
            {results.sumSurahNumbers} / {results.sumVerseCounts}
          </div>
          <div className="text-sm mt-1">
            {validation.pattern1 ? '✅ Validated' : '❌ Not Matched'}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-pattern-1-odd">
          <h3 className="font-bold text-lg mb-2">Pattern 2: 57:57 Distribution</h3>
          <p className="text-gray-600 mb-3">Perfect even/odd chapter split</p>
          <div className="text-2xl font-bold text-pattern-1-odd">
            {results.evenSurahs} : {results.oddSurahs}
          </div>
          <div className="text-sm mt-1">
            {validation.pattern2 ? '✅ Validated' : '❌ Not Matched'}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-pattern-3-highlight">
          <h3 className="font-bold text-lg mb-2">Pattern 3: 3303 Symmetry</h3>
          <p className="text-gray-600 mb-3">Conditional symmetry pattern</p>
          <div className="text-2xl font-bold text-pattern-3-highlight">
            {validation.pattern3 ? '3303' : 'Calculating...'}
          </div>
          <div className="text-sm mt-1">
            {validation.pattern3 ? '✅ Validated' : '❌ Not Matched'}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-pattern-4-combo1">
          <h3 className="font-bold text-lg mb-2">Pattern 4: Parity Matrix</h3>
          <p className="text-gray-600 mb-3">30-27-30-27 combinations</p>
          <div className="text-2xl font-bold text-pattern-4-combo1">
            {results.evenSurahEvenVerses}-{results.evenSurahOddVerses}-{results.oddSurahEvenVerses}-{results.oddSurahOddVerses}
          </div>
          <div className="text-sm mt-1">
            {validation.pattern4 ? '✅ Validated' : '❌ Not Matched'}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-pattern-9-prime">
          <h3 className="font-bold text-lg mb-2">Pattern 9: Prime Sum</h3>
          <p className="text-gray-600 mb-3">1076+5160=6236 relationship</p>
          <div className="text-2xl font-bold text-pattern-9-prime">
            {results.primeVerses + results.nthPrimeSum}
          </div>
          <div className="text-sm mt-1">
            {validation.pattern9 ? '✅ Validated' : '❌ Not Matched'}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-pattern-10-repetitive">
          <h3 className="font-bold text-lg mb-2">Pattern 10: Golden Ratio</h3>
          <p className="text-gray-600 mb-3">φ ≈ 1.618424 emergence</p>
          <div className="text-2xl font-bold text-pattern-10-repetitive">
            φ = {results.goldenRatio.toFixed(6)}
          </div>
          <div className="text-sm mt-1">
            {validation.pattern10 ? '✅ Validated' : '❌ Not Matched'}
          </div>
        </div>
      </div>

      {/* Main Interactive Table Area */}
      <InteractiveTable />

      {/* Educational Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-3">About Natural Patterns</h3>
        <p className="text-gray-700 leading-relaxed">
          These patterns represent the strongest mathematical relationships discovered in the Quran's 
          structure. They are classified as "natural" because they emerge directly from the text 
          without requiring complex formulations or selective data inclusion. Each pattern will be 
          fully interactive, allowing you to explore the calculations and understand the underlying 
          mathematical relationships.
        </p>
      </div>
    </div>
  )
}
