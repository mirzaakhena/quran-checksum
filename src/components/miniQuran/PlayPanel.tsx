import { FormEvent, useEffect, useRef, useState } from 'react';
import { MAX_VERSES, MIN_VERSES, MiniQuranGame, isValidVerseCount, nextSurah } from '../../v2/core';
import { REVELATION_ORDER } from '../../v2/data';

interface PlayPanelProps {
  game: MiniQuranGame;
  onReveal: (surah: number, verseCount: number) => void;
  onAbandon: () => void;
}

const MODE_LABELS = {
  free: 'Your own order',
  random: 'Random order',
  historical: 'Historical order'
} as const;

export function PlayPanel({ game, onReveal, onAbandon }: PlayPanelProps) {
  const [chosen, setChosen] = useState<number | null>(null);
  const [verses, setVerses] = useState('');
  const [confirmAbandon, setConfirmAbandon] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const forced = nextSurah(game);
  const current = forced ?? chosen;
  const step = game.revealed.length;
  const place = game.mode === 'historical' ? REVELATION_ORDER[step]?.place : null;
  const lastRevealed = game.revealed[step - 1];

  useEffect(() => {
    if (current !== null) inputRef.current?.focus();
  }, [current, step]);

  const verseCount = Number(verses);
  const canReveal = current !== null && verses !== '' && isValidVerseCount(verseCount);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!canReveal || current === null) return;
    onReveal(current, verseCount);
    setVerses('');
    setChosen(null);
  };

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-md p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-xl font-bold text-gray-900">
            Revelation {Math.min(step + 1, game.surahCount)} of {game.surahCount}
          </h2>
          <span className="text-sm text-gray-600">
            {MODE_LABELS[game.mode]}
            {place && ` · ${place === 'meccan' ? 'Meccan' : 'Medinan'} period`}
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-quran-blue transition-all"
            style={{ width: `${(step / game.surahCount) * 100}%` }}
          />
        </div>

        {current === null ? (
          <p className="mt-5 text-gray-700">Choose which surah to reveal next from the grid below.</p>
        ) : (
          <form onSubmit={submit} className="mt-5 flex flex-wrap items-center gap-3">
            <label htmlFor="verse-count" className="basis-full text-gray-700">
              How many verses does <strong>surah {current}</strong> have?
            </label>
            <input
              id="verse-count"
              ref={inputRef}
              type="number"
              inputMode="numeric"
              min={MIN_VERSES}
              max={MAX_VERSES}
              value={verses}
              onChange={(e) => setVerses(e.target.value)}
              className="w-32 border border-gray-300 rounded-lg px-3 py-2 text-lg tabular-nums"
              placeholder={`${MIN_VERSES}–${MAX_VERSES}`}
            />
            <button
              type="submit"
              disabled={!canReveal}
              className="bg-quran-blue text-white font-semibold rounded-lg px-5 py-2.5 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reveal (final)
            </button>
            {game.mode === 'free' && (
              <button type="button" onClick={() => setChosen(null)} className="text-sm text-gray-600 underline py-2.5">
                Choose another surah
              </button>
            )}
            {verses !== '' && !isValidVerseCount(verseCount) && (
              <p className="basis-full text-sm text-red-600">Enter a whole number from {MIN_VERSES} to {MAX_VERSES}.</p>
            )}
          </form>
        )}

        {lastRevealed !== undefined && (
          <p className="mt-4 text-sm text-gray-500">
            Sealed: surah {lastRevealed} with {game.verseCounts[lastRevealed - 1]} verses.
          </p>
        )}
      </section>

      <section className="bg-white rounded-lg shadow-md p-5">
        <h2 className="font-semibold text-gray-900">Your book so far</h2>
        <p className="text-sm text-gray-600">
          Surah number and verse count. Revealed surahs are sealed and cannot be changed.
        </p>
        <div className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-12 gap-1.5 mt-3">
          {game.verseCounts.map((count, i) => {
            const surah = i + 1;
            const revealed = count !== null;
            const isCurrent = surah === current;
            const selectable = game.mode === 'free' && !revealed;
            return (
              <button
                key={surah}
                type="button"
                disabled={!selectable}
                onClick={() => setChosen(surah)}
                className={`rounded-md border text-center py-1 ${
                  isCurrent ? 'border-quran-blue bg-blue-50 ring-2 ring-quran-blue'
                  : revealed ? 'border-gray-200 bg-gray-50'
                  : selectable ? 'border-dashed border-gray-300 hover:border-quran-blue hover:bg-blue-50'
                  : 'border-dashed border-gray-200'
                } ${selectable ? 'cursor-pointer' : 'cursor-default'}`}
                aria-label={revealed ? `Surah ${surah}: ${count} verses` : `Surah ${surah}: not revealed yet`}
              >
                <div className="text-[10px] text-gray-500 leading-none">{surah}</div>
                <div className={`text-sm tabular-nums ${revealed ? 'font-semibold text-gray-900' : 'text-gray-300'}`}>
                  {revealed ? count : '—'}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <div className="text-sm">
        {confirmAbandon ? (
          <span className="text-gray-700">
            Abandon this book? It cannot be resumed.{' '}
            <button type="button" onClick={onAbandon} className="text-red-600 font-semibold underline">Yes, abandon</button>{' '}
            <button type="button" onClick={() => setConfirmAbandon(false)} className="text-gray-600 underline">Keep going</button>
          </span>
        ) : (
          <button type="button" onClick={() => setConfirmAbandon(true)} className="text-gray-600 underline">
            Abandon this book
          </button>
        )}
      </div>
    </div>
  );
}
