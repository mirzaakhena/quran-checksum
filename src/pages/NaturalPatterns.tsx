import InteractiveTable from '../components/table/InteractiveTable'
import PatternSummaryCard from '../components/patterns/PatternSummaryCard'
import { useQuranPatterns } from '../hooks/useQuranPatterns'

export default function NaturalPatterns() {
  const { results, validation } = useQuranPatterns()

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
        <PatternSummaryCard
          title="Pattern 6555-6236"
          formula="perfect balance distribution"
          value={`${results.sumSurahNumbers} / ${results.sumVerseCounts}`}
          expected="6555 / 6236"
          isValid={validation.pattern1}
          className="border-l-4 border-pattern-1-even"
        />

        <PatternSummaryCard
          title="Pattern 57:57"
          formula="Perfect even/odd split distribution"
          value={`${results.evenSurahs} : ${results.oddSurahs}`}
          expected="57 : 57"
          isValid={validation.pattern2}
          className="border-l-4 border-pattern-1-odd"
        />

        <PatternSummaryCard
          title="Pattern 3303"
          formula="Conditional symmetry pattern"
          value={validation.pattern3 ? '3303' : 'Calculating...'}
          expected="3303"
          isValid={validation.pattern3}
          className="border-l-4 border-pattern-3-highlight"
        />

        <PatternSummaryCard
          title="Pattern 30-27"
          formula="Even Odd Parity Matrix combinations"
          value={`${results.evenSurahEvenVerses}-${results.evenSurahOddVerses}-${results.oddSurahEvenVerses}-${results.oddSurahOddVerses}`}
          expected="30-27-27-30"
          isValid={validation.pattern4}
          className="border-l-4 border-pattern-4-combo1"
        />

        <PatternSummaryCard
          title="Pattern Prime Sum"
          formula="1076+5160=6236 relationship"
          value={results.primeVersesSum + results.nthPrimeSum}
          expected="6236"
          isValid={validation.pattern9}
          className="border-l-4 border-pattern-9-prime"
        />

        <PatternSummaryCard
          title="Pattern Golden Ratio"
          formula="φ ≈ 1.618424 emergence"
          value={`φ = ${results.goldenRatio.toFixed(6)}`}
          expected="1.618424"
          isValid={validation.pattern10}
          className="border-l-4 border-pattern-10-repetitive"
        />
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
