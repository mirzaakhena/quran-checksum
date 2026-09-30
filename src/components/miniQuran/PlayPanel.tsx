import { FormEvent, useState } from 'react';
import { MAX_VERSES, MIN_VERSES, MiniQuranGame, isValidVerseCount } from '../../v2/core';

interface PlayPanelProps {
  game: MiniQuranGame;
  onReveal: (surah: number, verseCount: number) => void;
  onAbandon: () => void;
}

const inputId = (surah: number) => `verses-${surah}`;

interface SurahRowProps {
  surah: number;
  onLock: (surah: number, verseCount: number) => void;
}

function OpenSurahRow({ surah, onLock }: SurahRowProps) {
  const [value, setValue] = useState('');
  const verses = Number(value);
  const valid = value !== '' && isValidVerseCount(verses);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (valid) onLock(surah, verses);
  };

  return (
    <form onSubmit={submit} className="flex flex-wrap items-center gap-2">
      <input
        id={inputId(surah)}
        type="number"
        inputMode="numeric"
        min={MIN_VERSES}
        max={MAX_VERSES}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`${MIN_VERSES}–${MAX_VERSES}`}
        aria-label={`Verses of surah ${surah}`}
        className="w-24 border border-gray-300 rounded-md px-2 py-1 tabular-nums"
      />
      <button
        type="submit"
        disabled={!valid}
        className="text-sm font-semibold rounded-md px-3 py-1 bg-quran-blue text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Lock
      </button>
      {value !== '' && !valid && (
        <span className="text-xs text-red-600">{MIN_VERSES} to {MAX_VERSES}</span>
      )}
    </form>
  );
}

export function PlayPanel({ game, onReveal, onAbandon }: PlayPanelProps) {
  const [confirmAbandon, setConfirmAbandon] = useState(false);
  const written = game.revealed.length;

  const lock = (surah: number, verseCount: number) => {
    onReveal(surah, verseCount);
    // Move to the next open surah below, wrapping around to the top
    const open = game.verseCounts
      .map((v, i) => (v === null && i + 1 !== surah ? i + 1 : null))
      .filter((s): s is number => s !== null);
    const next = open.find((s) => s > surah) ?? open[0];
    if (next !== undefined) {
      requestAnimationFrame(() => document.getElementById(inputId(next))?.focus());
    }
  };

  return (
    <div className="space-y-4">
      <section className="bg-white rounded-lg shadow-md p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-xl font-bold text-gray-900">
            {written} of {game.surahCount} surahs written
          </h2>
          {confirmAbandon ? (
            <span className="text-sm text-gray-700">
              Abandon this book?{' '}
              <button type="button" onClick={onAbandon} className="text-red-600 font-semibold underline">Yes</button>{' '}
              <button type="button" onClick={() => setConfirmAbandon(false)} className="text-gray-600 underline">No</button>
            </span>
          ) : (
            <button type="button" onClick={() => setConfirmAbandon(true)} className="text-sm text-gray-600 underline">
              Abandon this book
            </button>
          )}
        </div>
        <div className="h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
          <div className="h-full bg-quran-blue transition-all" style={{ width: `${(written / game.surahCount) * 100}%` }} />
        </div>
        <p className="text-sm text-gray-600 mt-3">
          Start from any surah. Press Enter or Lock to lock a number: it cannot be changed afterwards.
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left font-semibold px-4 py-2 w-24">Surah</th>
              <th className="text-left font-semibold px-4 py-2">Verses</th>
            </tr>
          </thead>
          <tbody>
            {game.verseCounts.map((count, i) => {
              const surah = i + 1;
              return (
                <tr key={surah} className={`border-b last:border-b-0 ${count !== null ? 'bg-gray-50' : ''}`}>
                  <td className="px-4 py-2 tabular-nums text-gray-700">{surah}</td>
                  <td className="px-4 py-2">
                    {count !== null ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="font-semibold tabular-nums text-gray-900 w-24 inline-block">{count}</span>
                        <span className="text-xs text-gray-500">🔒 Locked</span>
                      </span>
                    ) : (
                      <OpenSurahRow surah={surah} onLock={lock} />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
