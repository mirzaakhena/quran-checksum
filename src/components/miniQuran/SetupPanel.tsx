import { useState } from 'react';
import { MAX_SURAHS, MAX_VERSES, MIN_SURAHS, MIN_VERSES, RevelationMode, isValidSurahCount } from '../../v2/core';
import { MiniQuranStats } from '../../hooks/useMiniQuranGame';

interface SetupPanelProps {
  stats: MiniQuranStats;
  onStart: (surahCount: number, mode: RevelationMode) => void;
}

const MODES: { id: RevelationMode; title: string; description: string }[] = [
  {
    id: 'free',
    title: 'Your own order',
    description: 'Start wherever you like: pick which surah to reveal next.'
  },
  {
    id: 'random',
    title: 'Random order',
    description: 'Surahs arrive in an unpredictable order, as events unfold.'
  },
  {
    id: 'historical',
    title: 'Historical order',
    description: 'Surahs arrive in the traditional order of revelation, starting with surah 96 in Mecca. Needs 114 surahs.'
  }
];

export function SetupPanel({ stats, onStart }: SetupPanelProps) {
  const [surahCount, setSurahCount] = useState(String(MAX_SURAHS));
  const [mode, setMode] = useState<RevelationMode>('free');

  const n = Number(surahCount);
  const validCount = isValidSurahCount(n);
  const canStart = validCount && (mode !== 'historical' || n === MAX_SURAHS);

  const chooseMode = (next: RevelationMode) => {
    setMode(next);
    if (next === 'historical') setSurahCount(String(MAX_SURAHS));
  };

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-md p-5">
        <h2 className="text-xl font-bold text-gray-900">The rules</h2>
        <ol className="list-decimal pl-5 mt-3 space-y-2 text-gray-700">
          <li>Decide how many surahs your book has.</li>
          <li>Give each surah a number of verses ({MIN_VERSES} to {MAX_VERSES}).</li>
          <li><strong>Every decision is final.</strong> There is no correction and no going back.</li>
          <li>
            <strong>No calculating.</strong> While you build, no totals or pattern results are shown.
            Play fair: no calculator, spreadsheet or notes, just as there were none during revelation.
          </li>
          <li>
            When the last surah is revealed, your book is checked against the same 4 patterns as the Quran
            (6236 / 6555, 57 : 57, 3303 and 30-27-30-27), stated for your own book: the balances must hold,
            whatever the numbers turn out to be.
          </li>
        </ol>
      </section>

      <section className="bg-white rounded-lg shadow-md p-5 space-y-5">
        <div>
          <label htmlFor="surah-count" className="block font-semibold text-gray-900">Number of surahs</label>
          <p className="text-sm text-gray-600">An even number from {MIN_SURAHS} to {MAX_SURAHS}. The Quran has 114.</p>
          <input
            id="surah-count"
            type="number"
            inputMode="numeric"
            min={MIN_SURAHS}
            max={MAX_SURAHS}
            step={2}
            value={surahCount}
            disabled={mode === 'historical'}
            onChange={(e) => setSurahCount(e.target.value)}
            className="mt-2 w-32 border border-gray-300 rounded-lg px-3 py-2 text-lg tabular-nums disabled:bg-gray-100"
          />
          {!validCount && (
            <p className="text-sm text-red-600 mt-1">Choose an even number from {MIN_SURAHS} to {MAX_SURAHS}.</p>
          )}
        </div>

        <fieldset>
          <legend className="font-semibold text-gray-900">Order of revelation</legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
            {MODES.map((m) => (
              <label
                key={m.id}
                className={`cursor-pointer rounded-lg border-2 p-3 transition-colors ${
                  mode === m.id ? 'border-quran-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  value={m.id}
                  checked={mode === m.id}
                  onChange={() => chooseMode(m.id)}
                  className="sr-only"
                />
                <div className="font-semibold text-gray-900">{m.title}</div>
                <div className="text-sm text-gray-600 mt-1">{m.description}</div>
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="button"
          onClick={() => onStart(n, mode)}
          disabled={!canStart}
          className="bg-quran-blue text-white font-semibold rounded-lg px-5 py-2.5 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start revelation
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
