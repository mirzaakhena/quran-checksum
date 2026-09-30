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
          Natural Patterns
        </h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          Four patterns built only from each surah's number (A) and verse count (B). They are not
          independent: each pair below is two views of a single core fact, so there are two facts
          to verify, not four.
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
          These patterns are called "natural" because they use only the surah number and the verse
          count, with simple even/odd splits and sums, and no tolerances or extra constants. Every
          value can be checked with a spreadsheet: click a column header or a total in the table
          below to see how it is calculated and which core fact it belongs to.
        </p>
      </div>
    </div>
  )
}
