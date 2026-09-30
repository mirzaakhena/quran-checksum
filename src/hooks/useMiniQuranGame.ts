import { useState } from 'react';
import {
  MiniQuranGame,
  RevelationMode,
  isComplete,
  revealSurah,
  scoreMiniQuran,
  startGame,
  toSurahs
} from '../v2/core';
import { quranData } from '../v2/data';

const GAME_KEY = 'mini-quran-game-v1';
const STATS_KEY = 'mini-quran-stats-v1';

export interface MiniQuranStats {
  started: number;
  finished: number;
  allPatterns: number;
}

const EMPTY_STATS: MiniQuranStats = { started: 0, finished: 0, allPatterns: 0 };

// Storage can be unavailable (private windows, blocked site data); the game still works without it
function load<T>(key: string, isValid: (value: unknown) => boolean): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const value = JSON.parse(raw);
    return isValid(value) ? (value as T) : null;
  } catch {
    return null;
  }
}

function save(key: string, value: unknown) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Progress is simply not kept across reloads
  }
}

const isGame = (value: unknown) => {
  const g = value as MiniQuranGame;
  return !!g && typeof g.surahCount === 'number' && Array.isArray(g.verseCounts) &&
    g.verseCounts.length === g.surahCount && Array.isArray(g.revealed);
};

const isStats = (value: unknown) => {
  const s = value as MiniQuranStats;
  return !!s && typeof s.started === 'number' && typeof s.finished === 'number' && typeof s.allPatterns === 'number';
};

// A book identical to the Quran is a copy, not a creation
export function isCopyOfQuran(game: MiniQuranGame): boolean {
  return game.surahCount === quranData.length &&
    game.verseCounts.every((v, i) => v === quranData[i].verseCount);
}

export function useMiniQuranGame() {
  const [game, setGame] = useState<MiniQuranGame | null>(() => load<MiniQuranGame>(GAME_KEY, isGame));
  const [stats, setStats] = useState<MiniQuranStats>(() => load<MiniQuranStats>(STATS_KEY, isStats) ?? EMPTY_STATS);

  const updateGame = (next: MiniQuranGame | null) => {
    setGame(next);
    save(GAME_KEY, next);
  };

  const updateStats = (next: MiniQuranStats) => {
    setStats(next);
    save(STATS_KEY, next);
  };

  const start = (surahCount: number, mode: RevelationMode) => {
    updateGame(startGame(surahCount, mode));
    updateStats({ ...stats, started: stats.started + 1 });
  };

  const reveal = (surah: number, verseCount: number) => {
    if (!game) return;
    const next = revealSurah(game, surah, verseCount);
    updateGame(next);
    if (isComplete(next)) {
      const passed = scoreMiniQuran(toSurahs(next)).allPass && !isCopyOfQuran(next);
      updateStats({
        ...stats,
        finished: stats.finished + 1,
        allPatterns: stats.allPatterns + (passed ? 1 : 0)
      });
    }
  };

  // Leaves the current book (finished or not) and returns to the setup screen
  const reset = () => updateGame(null);

  return { game, stats, start, reveal, reset };
}
