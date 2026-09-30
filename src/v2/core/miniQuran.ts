// "Mini Quran" challenge: build your own book of surahs, one irreversible decision at a time,
// and see whether it satisfies the same 4 patterns as the Quran.
import { QuranSurah } from '../types'
import { calculateNaturalPatterns } from './calculations'
import { checkCoreFacts } from './validators'

export const MIN_SURAHS = 2
export const MAX_SURAHS = 200
export const MIN_VERSES = 2
export const MAX_VERSES = 300

export interface MiniQuranGame {
  surahCount: number
  // verseCounts[surah - 1]; null until that surah is written
  verseCounts: (number | null)[]
  // Surah numbers in the order they were written
  revealed: number[]
}

export function isValidSurahCount(n: number): boolean {
  return Number.isInteger(n) && n >= MIN_SURAHS && n <= MAX_SURAHS
}

export function isValidVerseCount(n: number): boolean {
  return Number.isInteger(n) && n >= MIN_VERSES && n <= MAX_VERSES
}

export function startGame(surahCount: number): MiniQuranGame {
  if (!isValidSurahCount(surahCount)) {
    throw new Error(`The number of surahs must be a whole number from ${MIN_SURAHS} to ${MAX_SURAHS}`)
  }
  return { surahCount, verseCounts: Array(surahCount).fill(null), revealed: [] }
}

export function isComplete(game: MiniQuranGame): boolean {
  return game.revealed.length === game.surahCount
}

// Records a surah's verse count, in any order. Decisions are final: a written surah can never be changed.
export function revealSurah(game: MiniQuranGame, surah: number, verseCount: number): MiniQuranGame {
  if (!Number.isInteger(surah) || surah < 1 || surah > game.surahCount) {
    throw new Error(`Surah ${surah} does not exist`)
  }
  if (game.verseCounts[surah - 1] !== null) {
    throw new Error(`Surah ${surah} is already locked and cannot be changed`)
  }
  if (!isValidVerseCount(verseCount)) {
    throw new Error(`A surah must have ${MIN_VERSES} to ${MAX_VERSES} verses`)
  }

  const verseCounts = [...game.verseCounts]
  verseCounts[surah - 1] = verseCount
  return { ...game, verseCounts, revealed: [...game.revealed, surah] }
}

export function toSurahs(game: MiniQuranGame): QuranSurah[] {
  return game.verseCounts.map((verseCount, i) => ({ number: i + 1, verseCount: verseCount ?? 0 }))
}

// The same 4 patterns as the Quran, stated for any number of surahs:
// the specific values (6236, 3303, 57, 30) depend on the book, the equalities do not.
// With an odd number of surahs, Patterns 2 and 4 cannot hold (they need an even split).
export function scoreMiniQuran(surahs: QuranSurah[]) {
  const results = calculateNaturalPatterns(surahs)
  const patterns = {
    pattern1: results.evenTotalSum === results.sumVerseCounts && results.oddTotalSum === results.sumSurahNumbers,
    pattern2: results.evenTotalCount === results.oddTotalCount,
    pattern3: results.chapterSumIfEvenTotal === results.verseSumIfOddTotal,
    pattern4: results.evenSurahEvenVerses === results.oddSurahEvenVerses &&
              results.evenSurahOddVerses === results.oddSurahOddVerses
  }
  return {
    results,
    patterns,
    facts: checkCoreFacts(results),
    allPass: Object.values(patterns).every(Boolean)
  }
}
