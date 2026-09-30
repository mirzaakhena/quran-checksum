import { MiniQuranGame, scoreMiniQuran, toSurahs } from '../../v2/core';
import { isCopyOfQuran } from '../../hooks/useMiniQuranGame';

interface ResultPanelProps {
  game: MiniQuranGame;
  onRestart: () => void;
}

interface Comparison {
  label: string;
  left: number;
  right: number;
}

function downloadCsv(game: MiniQuranGame) {
  const header = 'Surah Number (A),Verse Count (B),A + B,Revealed as #';
  const rows = game.verseCounts.map((verses, i) => {
    const surah = i + 1;
    return [surah, verses, surah + (verses ?? 0), game.revealed.indexOf(surah) + 1].join(',');
  });
  const blob = new Blob([[header, ...rows].join('\n') + '\n'], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'my-mini-quran.csv';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function ResultPanel({ game, onRestart }: ResultPanelProps) {
  const { results: r, patterns } = scoreMiniQuran(toSurahs(game));
  const copied = isCopyOfQuran(game);
  const passed = Object.values(patterns).filter(Boolean).length;

  const rows: { name: string; quran: string; valid: boolean; comparisons: Comparison[] }[] = [
    {
      name: 'Pattern 1',
      quran: '6236 / 6555',
      valid: patterns.pattern1,
      comparisons: [
        { label: 'Σ (A+B) where even = Σ verses', left: r.evenTotalSum, right: r.sumVerseCounts },
        { label: 'Σ (A+B) where odd = Σ surah numbers', left: r.oddTotalSum, right: r.sumSurahNumbers }
      ]
    },
    {
      name: 'Pattern 2',
      quran: '57 : 57',
      valid: patterns.pattern2,
      comparisons: [
        { label: 'surahs with even A+B = surahs with odd A+B', left: r.evenTotalCount, right: r.oddTotalCount }
      ]
    },
    {
      name: 'Pattern 3',
      quran: '3303',
      valid: patterns.pattern3,
      comparisons: [
        { label: 'Σ surah numbers where A+B even = Σ verses where A+B odd', left: r.chapterSumIfEvenTotal, right: r.verseSumIfOddTotal }
      ]
    },
    {
      name: 'Pattern 4',
      quran: '30-27-30-27',
      valid: patterns.pattern4,
      comparisons: [
        { label: 'even surah & even verses = odd surah & even verses (H = J)', left: r.evenSurahEvenVerses, right: r.oddSurahEvenVerses },
        { label: 'even surah & odd verses = odd surah & odd verses (I = K)', left: r.evenSurahOddVerses, right: r.oddSurahOddVerses }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-md p-5">
        <h2 className="text-2xl font-bold text-gray-900">
          {copied
            ? 'That is the Quran itself'
            : passed === 4 ? 'All 4 patterns hold' : `${passed} of 4 patterns hold`}
        </h2>
        <p className="text-gray-600 mt-2">
          {copied
            ? 'Your verse counts are exactly those of the Quran, so every pattern holds. Copying does not count: try building your own.'
            : `Your book has ${game.surahCount} surahs and ${r.sumVerseCounts} verses. Patterns 1 and 3 are one fact (Sum Balance) and Patterns 2 and 4 are another (Parity Balance), so they hold or fail in pairs.`}
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rows.map((row) => (
          <section key={row.name} className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${row.valid ? 'border-green-500' : 'border-red-500'}`}>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-bold text-lg text-gray-900">{row.name}</h3>
              <span className="text-xs text-gray-500">The Quran: {row.quran}</span>
            </div>
            <ul className="mt-2 space-y-1.5 text-sm">
              {row.comparisons.map((c) => (
                <li key={c.label} className="flex flex-wrap items-center justify-between gap-x-3">
                  <span className="text-gray-600">{c.label}</span>
                  <span className={`font-mono tabular-nums font-semibold ${c.left === c.right ? 'text-green-700' : 'text-red-700'}`}>
                    {c.left} {c.left === c.right ? '=' : '≠'} {c.right}
                  </span>
                </li>
              ))}
            </ul>
            <p className={`text-sm font-semibold mt-3 ${row.valid ? 'text-green-600' : 'text-red-600'}`}>
              {row.valid ? '✅ Holds' : '❌ Does not hold'}
            </p>
          </section>
        ))}
      </div>

      <section className="bg-white rounded-lg shadow-md p-5">
        <h2 className="font-semibold text-gray-900">Your book</h2>
        <div className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-12 gap-1.5 mt-3">
          {game.verseCounts.map((count, i) => (
            <div key={i} className="rounded-md border border-gray-200 bg-gray-50 text-center py-1">
              <div className="text-[10px] text-gray-500 leading-none">{i + 1}</div>
              <div className="text-sm font-semibold tabular-nums text-gray-900">{count}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRestart}
          className="bg-quran-blue text-white font-semibold rounded-lg px-5 py-2.5 hover:bg-blue-700"
        >
          Build another book
        </button>
        <button
          type="button"
          onClick={() => downloadCsv(game)}
          className="border border-gray-300 text-gray-700 font-semibold rounded-lg px-5 py-2.5 hover:bg-gray-50"
        >
          ⬇ Download your book (CSV)
        </button>
      </div>
    </div>
  );
}
