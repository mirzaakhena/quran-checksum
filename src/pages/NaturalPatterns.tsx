import { Link } from 'react-router-dom'
import InteractiveTable from '../components/table/InteractiveTable'
import { CoreFacts } from '../components/patterns/CoreFacts'
import { useQuranPatterns } from '../hooks/useQuranPatterns'

export default function NaturalPatterns() {
  const { results, validation } = useQuranPatterns()

  return (
    <div className="space-y-8">
      <p className="text-gray-700 leading-relaxed max-w-4xl">
        For every surah, take its number <strong>A</strong> and its verse count <strong>B</strong>, and
        add them: <strong>C = A + B</strong>. Splitting the surahs by whether C is even or odd reveals four
        patterns. They are not independent: they reduce to the two facts below. Everything is simple sums and
        counts, with no tolerances or extra constants.
      </p>

      <CoreFacts results={results} validation={validation} />

      <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-gray-700">
          Think these patterns are easy to produce? Build your own book of surahs under the conditions of
          revelation: no planning, no correction, no going back.
        </p>
        <Link
          to="/mini-quran"
          className="shrink-0 self-start sm:self-auto bg-quran-blue text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-700"
        >
          Try the Mini Quran Challenge →
        </Link>
      </div>

      <InteractiveTable />
    </div>
  )
}
