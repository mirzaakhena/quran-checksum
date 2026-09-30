import { useState } from 'react';
import { MAX_SURAHS, MAX_VERSES, MIN_SURAHS, MIN_VERSES, isValidSurahCount } from '../../v2/core';
import { MiniQuranStats } from '../../hooks/useMiniQuranGame';

interface SetupPanelProps {
  stats: MiniQuranStats;
  onStart: (surahCount: number) => void;
  onUseQuran: () => void;
}

export function SetupPanel({ stats, onStart, onUseQuran }: SetupPanelProps) {
  const [surahCount, setSurahCount] = useState('114');

  const n = Number(surahCount);
  const valid = isValidSurahCount(n);

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-md p-5">
        <h2 className="text-xl font-bold text-gray-900">The rules</h2>
        <ol className="list-decimal pl-5 mt-3 space-y-2 text-gray-700">
          <li>Choose how many surahs your book has ({MIN_SURAHS} to {MAX_SURAHS}).</li>
          <li>Write the number of verses of each surah ({MIN_VERSES} to {MAX_VERSES}), starting from any surah you like.</li>
          <li><strong>Every number is locked as soon as you write it.</strong> There is no correction and no going back.</li>
          <li>
            <strong>No calculating.</strong> While you write, no totals or pattern results are shown.
            Play fair: no calculator, spreadsheet or notes, just as there were none during revelation.
          </li>
          <li>
            When every surah is written, your book is checked against the same 4 patterns as the Quran
            (6236 / 6555, 57 : 57, 3303 and 30-27-30-27), stated for your own book: the balances must hold,
            whatever the numbers turn out to be.
          </li>
        </ol>
      </section>

      <section className="bg-white rounded-lg shadow-md p-5">
        <label htmlFor="surah-count" className="block font-semibold text-gray-900">Number of surahs</label>
        <p className="text-sm text-gray-600">From {MIN_SURAHS} to {MAX_SURAHS}. The Quran has 114.</p>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <input
            id="surah-count"
            type="number"
            inputMode="numeric"
            min={MIN_SURAHS}
            max={MAX_SURAHS}
            value={surahCount}
            onChange={(e) => setSurahCount(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && valid) onStart(n); }}
            className="w-32 border border-gray-300 rounded-lg px-3 py-2 text-lg tabular-nums"
          />
          <button
            type="button"
            onClick={() => onStart(n)}
            disabled={!valid}
            className="bg-quran-blue text-white font-semibold rounded-lg px-5 py-2.5 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start writing
          </button>
        </div>
        {!valid && (
          <p className="text-sm text-red-600 mt-2">Choose a whole number from {MIN_SURAHS} to {MAX_SURAHS}.</p>
        )}
        {valid && n % 2 === 1 && (
          <p className="text-sm text-amber-700 mt-2">
            With an odd number of surahs, Patterns 2 and 4 cannot hold: they need the surahs to split into two equal halves.
          </p>
        )}
      </section>

      <section className="bg-white rounded-lg shadow-md p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-gray-700">
          Want to see a book where every pattern holds? Fill all 114 surahs with the Quran's own verse counts.
        </p>
        <button
          type="button"
          onClick={onUseQuran}
          className="shrink-0 self-start sm:self-auto border border-gray-300 text-gray-700 font-semibold rounded-lg px-4 py-2 hover:bg-gray-50"
        >
          Use the Quran's verse counts
        </button>
      </section>

      {stats.started > 0 && (
        <p className="text-sm text-gray-600">
          On this device: {stats.started} {stats.started === 1 ? 'book' : 'books'} started, {stats.finished} finished,{' '}
          {stats.allPatterns} with all 4 patterns.
        </p>
      )}
    </div>
  );
}
