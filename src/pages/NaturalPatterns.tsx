import { Link } from 'react-router-dom'
import InteractiveTable from '../components/table/InteractiveTable'
import { CoreFacts } from '../components/patterns/CoreFacts'
import { useQuranPatterns } from '../hooks/useQuranPatterns'

export default function NaturalPatterns() {
  const { results, validation } = useQuranPatterns()

  return (
    <div className="space-y-8">
      <section className="text-gray-700 leading-relaxed space-y-3">
        <h2 className="text-2xl font-bold text-gray-900">What is the Quran?</h2>
        <p>
          The Quran is the holy book of Islam. Muslims believe it is the word of God, revealed in Arabic to the
          Prophet Muhammad over about 23 years, from 610 to 632 CE. It is recited in prayer every day and is
          memorized in full by millions of people.
        </p>
        <p>
          The book is divided into <strong>114 chapters</strong>, each called a <em>surah</em>, and every surah is
          divided into <em>verses</em> (<em>ayat</em>). The surahs vary greatly in length: the longest, Al-Baqarah,
          has 286 verses, while the shortest have only 3. They are not arranged in the order they were revealed:
          after the short opening surah, Al-Fatihah, the long surahs come first and the short ones last. In total
          the Quran has <strong>6236 verses</strong>, using the Kufan count found in most printed copies today
          (other early counting traditions divide a few verses differently).
        </p>
        <h2 className="text-2xl font-bold text-gray-900 pt-2">What this page checks</h2>
        <p>
          This page does not look at the text of the Quran at all. It uses only two numbers per surah: its
          position in the book (1 to 114) and how many verses it has. These numbers turn out to follow a set of
          simple arithmetic patterns, called here the "Quran Checksum". Below you can verify those patterns
          yourself, see how they are calculated, and judge how meaningful they are.
        </p>
      </section>

      <p className="text-gray-700 leading-relaxed">
        For every surah, take its number <strong>A</strong> and its verse count <strong>B</strong>, and
        add them: <strong>C = A + B</strong>. Splitting the surahs by whether C is even or odd reveals four
        patterns. They are not independent: they reduce to the two facts below. Everything is simple sums and
        counts, with no tolerances or extra constants.
      </p>

      <CoreFacts results={results} validation={validation} />

      <InteractiveTable />

      <section className="bg-amber-50 border border-amber-200 rounded-lg p-5 text-sm text-gray-700 leading-relaxed">
        <h2 className="font-bold text-gray-900 text-base">Disclaimer: this is not a true checksum</h2>
        <p className="mt-2">
          A real checksum locks the data: changing any single value breaks it. These patterns do not work
          that way. For example, if Al-Fatihah had 9 verses instead of 7, all four balances would still hold:
          the verse total would become 6238, and so would the even group of A + B, while 57 : 57, 3303 and
          30-27-30-27 would not change at all.
        </p>
        <p className="mt-2">
          In general, adding or removing an even number of verses in any of the 57 surahs whose A + B is even
          keeps every balance. About 1 in 4 of all possible single-surah changes (to any count from 1 to 300)
          goes undetected. Changing one of the other 57 surahs, or changing a count by an odd number, does
          break the patterns.
        </p>
        <p className="mt-2">
          The patterns are also not hard to produce on purpose: with planning, a book of 114 surahs that
          satisfies all four can be designed with mental arithmetic. The real question is whether they could
          arise <em>without</em> planning. To see how each verse count affects the patterns, build your own
          book in the{' '}
          <Link to="/mini-quran" className="text-quran-blue font-semibold underline">
            Mini Quran Challenge
          </Link>.
        </p>
      </section>
    </div>
  )
}
