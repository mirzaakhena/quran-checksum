import { useEffect, useState } from 'react';
import { MAX_SURAHS, MIN_SURAHS, isValidSurahCount } from '../../v2/core';

interface MiniQuranControlsProps {
  surahCount: number;
  onSurahCountChange: (surahCount: number) => void;
  onFillWithQuran: () => void;
  onFillRandom: () => void;
  onClear: () => void;
}

export function MiniQuranControls({ surahCount, onSurahCountChange, onFillWithQuran, onFillRandom, onClear }: MiniQuranControlsProps) {
  const [draft, setDraft] = useState(String(surahCount));
  useEffect(() => setDraft(String(surahCount)), [surahCount]);

  const n = Number(draft);
  const valid = isValidSurahCount(n);

  // Applied on Enter or when leaving the field, so typing "120" does not briefly cut the book to 12 surahs
  const apply = () => {
    if (valid && n !== surahCount) onSurahCountChange(n);
    if (!valid) setDraft(String(surahCount));
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-4 flex flex-wrap items-end gap-4">
      <div>
        <label htmlFor="surah-count" className="block text-sm font-semibold text-gray-900">
          Number of surahs ({MIN_SURAHS}–{MAX_SURAHS})
        </label>
        <input
          id="surah-count"
          type="number"
          inputMode="numeric"
          min={MIN_SURAHS}
          max={MAX_SURAHS}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={apply}
          onKeyDown={(e) => { if (e.key === 'Enter') apply(); }}
          className="mt-1 w-28 border border-gray-300 rounded-lg px-3 py-1.5 tabular-nums"
        />
      </div>
      <button
        type="button"
        onClick={onFillWithQuran}
        className="border border-gray-300 text-gray-700 font-semibold rounded-lg px-4 py-1.5 hover:bg-gray-50"
      >
        Fill with the Quran's verse counts
      </button>
      <button
        type="button"
        onClick={onFillRandom}
        className="border border-gray-300 text-gray-700 font-semibold rounded-lg px-4 py-1.5 hover:bg-gray-50"
      >
        Fill with random verse counts
      </button>
      <button
        type="button"
        onClick={onClear}
        className="border border-gray-300 text-gray-700 font-semibold rounded-lg px-4 py-1.5 hover:bg-gray-50"
      >
        Clear all
      </button>
      {surahCount % 2 === 1 && (
        <p className="basis-full text-sm text-amber-700">
          With an odd number of surahs, Patterns 2 and 4 cannot hold: they need the surahs to split into two equal halves.
        </p>
      )}
    </section>
  );
}
