import { MAX_VERSES, MIN_VERSES, parseVerseCount, scoreMiniQuran } from '../../v2/core';
import { quranData } from '../../v2/data';

interface PatternStatusProps {
  entries: string[];
}

interface Comparison {
  label: string;
  left: number;
  right: number;
}

export function PatternStatus({ entries }: PatternStatusProps) {
  const verseCounts = entries.map(parseVerseCount);
  const missing = verseCounts.filter((v) => v === null).length;

  if (missing > 0) {
    return (
      <section className="bg-white rounded-lg shadow-md p-4 text-gray-700">
        Enter a verse count ({MIN_VERSES}–{MAX_VERSES}) for every surah to check the 4 patterns:{' '}
        <strong>{entries.length - missing} of {entries.length}</strong> done.
      </section>
    );
  }

  const surahs = verseCounts.map((verseCount, i) => ({ number: i + 1, verseCount: verseCount as number }));
  const { results: r, patterns } = scoreMiniQuran(surahs);
  const passed = Object.values(patterns).filter(Boolean).length;
  const isQuran = surahs.length === quranData.length && surahs.every((s, i) => s.verseCount === quranData[i].verseCount);

  const rows: { name: string; valid: boolean; comparisons: Comparison[] }[] = [
    {
      name: 'Pattern 1',
      valid: patterns.pattern1,
      comparisons: [
        { label: 'Σ (A+B) where even = Σ verses', left: r.evenTotalSum, right: r.sumVerseCounts },
        { label: 'Σ (A+B) where odd = Σ surah numbers', left: r.oddTotalSum, right: r.sumSurahNumbers }
      ]
    },
    {
      name: 'Pattern 2',
      valid: patterns.pattern2,
      comparisons: [{ label: 'surahs with even A+B = surahs with odd A+B', left: r.evenTotalCount, right: r.oddTotalCount }]
    },
    {
      name: 'Pattern 3',
      valid: patterns.pattern3,
      comparisons: [{ label: 'Σ A where A+B even = Σ B where A+B odd (F = G)', left: r.chapterSumIfEvenTotal, right: r.verseSumIfOddTotal }]
    },
    {
      name: 'Pattern 4',
      valid: patterns.pattern4,
      comparisons: [
        { label: 'even-even = odd-even (H = J)', left: r.evenSurahEvenVerses, right: r.oddSurahEvenVerses },
        { label: 'even-odd = odd-odd (I = K)', left: r.evenSurahOddVerses, right: r.oddSurahOddVerses }
      ]
    }
  ];

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold text-gray-900">
        {passed === 4 ? 'All 4 patterns hold' : `${passed} of 4 patterns hold`}
        {isQuran && <span className="text-sm font-normal text-gray-600"> (these are the Quran's own verse counts)</span>}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        {rows.map((row) => (
          <div key={row.name} className={`bg-white rounded-lg shadow-md px-4 py-3 border-l-4 ${row.valid ? 'border-green-500' : 'border-red-500'}`}>
            <h3 className="font-bold text-gray-900">{row.valid ? '✅' : '❌'} {row.name}</h3>
            <ul className="mt-1 space-y-1 text-sm">
              {row.comparisons.map((c) => (
                <li key={c.label}>
                  <div className="text-gray-600">{c.label}</div>
                  <div className={`font-mono tabular-nums font-semibold ${c.left === c.right ? 'text-green-700' : 'text-red-700'}`}>
                    {c.left} {c.left === c.right ? '=' : '≠'} {c.right}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
