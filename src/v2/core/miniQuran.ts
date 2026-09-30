// "Mini Quran" challenge: build your own book of surahs, one irreversible decision at a time,
// and see whether it satisfies the same 4 patterns as the Quran.
import { QuranSurah } from '../types'
import { REVELATION_ORDER } from '../data/revelationOrder'
import { calculateNaturalPatterns } from './calculations'
import { checkCoreFacts } from './validators'

// free: the player picks which surah to fill next
// random: the next surah is drawn at random
// historical: the traditional order of revelation (114 surahs only)
export type RevelationMode = 'free' | 'random' | 'historical'

export const MIN_SURAHS = 10
export const MAX_SURAHS = 114
export const MIN_VERSES = 1
export const MAX_VERSES = 300

export interface MiniQuranGame {
  surahCount: number
  mode: RevelationMode
  // Fixed at the start for random and historical modes, so reloading the page cannot re-draw it
  order: number[] | null
  // verseCounts[surah - 1]; null until that surah is revealed
  verseCounts: (number | null)[]
  // Surah numbers in the order they were revealed
  revealed: number[]
}

export function isValidSurahCount(n: number): boolean {
  return Number.isInteger(n) && n >= MIN_SURAHS && n <= MAX_SURAHS && n % 2 === 0
}

export function isValidVerseCount(n: number): boolean {
  return Number.isInteger(n) && n >= MIN_VERSES && n <= MAX_VERSES
}

function shuffle(values: number[], random: () => number): number[] {
  const result = [...values]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function startGame(surahCount: number, mode: RevelationMode, random: () => number = Math.random): MiniQuranGame {
  if (!isValidSurahCount(surahCount)) {
    throw new Error(`The number of surahs must be an even number from ${MIN_SURAHS} to ${MAX_SURAHS}`)
  }
  if (mode === 'historical' && surahCount !== REVELATION_ORDER.length) {
    throw new Error(`The historical order needs exactly ${REVELATION_ORDER.length} surahs`)
  }

  const numbers = Array.from({ length: surahCount }, (_, i) => i + 1)
  const order =
    mode === 'random' ? shuffle(numbers, random)
    : mode === 'historical' ? REVELATION_ORDER.map(step => step.surah)
    : null

  return { surahCount, mode, order, verseCounts: Array(surahCount).fill(null), revealed: [] }
}

export function isComplete(game: MiniQuranGame): boolean {
  return game.revealed.length === game.surahCount
}

// The surah that must be revealed next, or null in free mode (the player chooses) or when complete
export function nextSurah(game: MiniQuranGame): number | null {
  if (isComplete(game) || !game.order) return null
  return game.order[game.revealed.length]
}

// Records a surah's verse count. Decisions are final: a revealed surah can never be changed.
export function revealSurah(game: MiniQuranGame, surah: number, verseCount: number): MiniQuranGame {
  if (!Number.isInteger(surah) || surah < 1 || surah > game.surahCount) {
    throw new Error(`Surah ${surah} does not exist`)
  }
  if (game.verseCounts[surah - 1] !== null) {
    throw new Error(`Surah ${surah} has already been revealed and cannot be changed`)
  }
  const expected = nextSurah(game)
  if (expected !== null && surah !== expected) {
    throw new Error(`Surah ${expected} must be revealed next`)
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

// The same 4 patterns as the Quran, stated for any even number of surahs:
// the specific values (6236, 3303, 57, 30) depend on the book, the equalities do not.
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
