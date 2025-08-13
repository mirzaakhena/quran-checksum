import InteractiveTable from '../components/table/InteractiveTable'
import { PatternSummarySection } from '../components/patterns/PatternSummarySection'
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
      <PatternSummarySection results={results} validation={validation} />

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
