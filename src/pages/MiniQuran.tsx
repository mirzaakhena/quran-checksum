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
        <p className="text-gray-700 leading-relaxed mt-2">
          Build your own book of surahs: choose how many surahs it has and type a verse count for each. The table
          works exactly like the one on the checksum page and updates as you type. Can you make all 4 patterns hold?
        </p>
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
