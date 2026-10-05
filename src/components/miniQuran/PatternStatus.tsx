import { MAX_VERSES, MIN_VERSES, parseVerseCount, scoreMiniQuran } from '../../v2/core';
import { quranData } from '../../v2/data';
import { useT } from '../../i18n/LanguageContext';

interface PatternStatusProps {
  entries: string[];
}

interface Comparison {
  label: string;
  left: number;
  right: number;
}

export function PatternStatus({ entries }: PatternStatusProps) {
  const t = useT();
  const verseCounts = entries.map(parseVerseCount);
  const missing = verseCounts.filter((v) => v === null).length;

  if (missing > 0) {
    return (
      <section className="bg-white rounded-lg shadow-md p-4 text-gray-700">
        {t.miniQuran.enterAll(MIN_VERSES, MAX_VERSES)}{' '}
        <strong>{t.miniQuran.done(entries.length - missing, entries.length)}</strong> {t.miniQuran.doneSuffix}
      </section>
    );
  }

  const surahs = verseCounts.map((verseCount, i) => ({ number: i + 1, verseCount: verseCount as number }));
  const { results: r, patterns } = scoreMiniQuran(surahs);
  const passed = Object.values(patterns).filter(Boolean).length;
  const isQuran = surahs.length === quranData.length && surahs.every((s, i) => s.verseCount === quranData[i].verseCount);

  const m = t.miniQuran;
  const rows: { name: string; valid: boolean; comparisons: Comparison[] }[] = [
    {
      name: t.coreFacts.pattern(1),
      valid: patterns.pattern1,
      comparisons: [
        { label: m.cmp1a, left: r.evenTotalSum, right: r.sumVerseCounts },
        { label: m.cmp1b, left: r.oddTotalSum, right: r.sumSurahNumbers }
      ]
    },
    {
      name: t.coreFacts.pattern(2),
      valid: patterns.pattern2,
      comparisons: [{ label: m.cmp2, left: r.evenTotalCount, right: r.oddTotalCount }]
    },
    {
      name: t.coreFacts.pattern(3),
      valid: patterns.pattern3,
      comparisons: [{ label: m.cmp3, left: r.chapterSumIfEvenTotal, right: r.verseSumIfOddTotal }]
    },
    {
      name: t.coreFacts.pattern(4),
      valid: patterns.pattern4,
      comparisons: [
        { label: m.cmp4a, left: r.evenSurahEvenVerses, right: r.oddSurahEvenVerses },
        { label: m.cmp4b, left: r.evenSurahOddVerses, right: r.oddSurahOddVerses }
      ]
    }
  ];

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold text-gray-900">
        {passed === 4 ? m.allHold : m.someHold(passed)}
        {isQuran && <span className="text-sm font-normal text-gray-600">{m.isQuran}</span>}
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
