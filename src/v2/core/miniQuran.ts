// "Mini Quran" challenge: build your own book of surahs and see whether it satisfies
// the same 4 patterns as the Quran.
import { QuranSurah } from '../types'
import { calculateNaturalPatterns } from './calculations'
import { checkCoreFacts } from './validators'

export const MIN_SURAHS = 2
export const MAX_SURAHS = 200
export const MIN_VERSES = 2
export const MAX_VERSES = 300

export function isValidSurahCount(n: number): boolean {
  return Number.isInteger(n) && n >= MIN_SURAHS && n <= MAX_SURAHS
}

export function isValidVerseCount(n: number): boolean {
  return Number.isInteger(n) && n >= MIN_VERSES && n <= MAX_VERSES
}

// A verse count as typed by the user: a valid number, or null when empty or out of range
export function parseVerseCount(text: string): number | null {
  const trimmed = text.trim()
  if (!/^\d+$/.test(trimmed)) return null
  const n = Number(trimmed)
  return isValidVerseCount(n) ? n : null
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
