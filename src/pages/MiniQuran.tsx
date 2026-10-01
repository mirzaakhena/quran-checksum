import { Link } from 'react-router-dom'
import { MiniQuranControls } from '../components/miniQuran/MiniQuranControls'
import { MiniQuranTable } from '../components/miniQuran/MiniQuranTable'
import { PatternStatus } from '../components/miniQuran/PatternStatus'
import { useMiniQuranBook } from '../hooks/useMiniQuranBook'

export default function MiniQuran() {
  const { book, setSurahCount, setEntry, fillWithQuran, clear } = useMiniQuranBook()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mini Quran Challenge</h2>
        <section className="text-gray-700 leading-relaxed mt-3 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Imagine you are in the Prophet's place</h3>
          <p>
            It is the 7th century. Over the next 23 years, the Quran will reach you piece by piece: a few verses at a
            time, in response to events, questions and crises, and not in the order of the book we hold today. The
            first verses you receive will become part of surah 96; some surahs will be completed only years after they
            were begun.
          </p>
          <p>
            You cannot read or write. There are no computers and no calculators: the verses are memorized by your
            companions and written on parchment, palm stalks and bones. At the same time you are teaching, leading a
            community through war and peace, and caring for a family.
          </p>
          <p>
            You do not design a structure, and there is no time to. You never number the surahs or the verses: early
            copies of the Quran marked where verses ended but did not number them, and the verse totals used today
            (6236 in the Kufan count) were recorded later by the scholars of the counting schools. There is no report
            of you or your companions adding surah numbers to verse counts, or doing any calculation of this kind.
          </p>
          <p>
            Yet the result, under the Kufan count, satisfies the patterns on the{' '}
            <Link to="/natural-patterns" className="text-quran-blue font-semibold underline">checksum page</Link>.
          </p>
          <p>
            <strong>Now it is your turn.</strong> Choose how many surahs your book has and give each one a verse
            count. You do not even have to write the content of a single surah: you only choose the numbers. And
            unlike the Prophet, you see every total as you type and can change any number as often as you like. Can
            you make all 4 patterns hold?
          </p>
        </section>
      </div>

      <MiniQuranControls
        surahCount={book.surahCount}
        onSurahCountChange={setSurahCount}
        onFillWithQuran={fillWithQuran}
        onClear={clear}
      />

      <PatternStatus entries={book.entries} />

      <MiniQuranTable entries={book.entries} onEntryChange={setEntry} />
    </div>
  )
}
