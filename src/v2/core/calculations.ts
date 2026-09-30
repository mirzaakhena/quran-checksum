// Core pattern calculations for natural patterns
import { QuranSurah, PatternResults } from '../types'

// Calculate all natural patterns
// Every value is derived from the per-pattern helpers below, so the table,
// the summary cards and the validators always read the same numbers.
export function calculateNaturalPatterns(surahs: QuranSurah[]): PatternResults {
  const sumSurahNumbers = surahs.reduce((sum, surah) => sum + surah.number, 0)
  const sumVerseCounts = surahs.reduce((sum, surah) => sum + surah.verseCount, 0)

  const parity = calculatePattern1Values(surahs)
  const { F, G } = calculatePattern3Values(surahs)
  const { H, I, J, K } = calculatePattern4Counts(surahs)

  return {
    sumSurahNumbers,
    sumVerseCounts,
    ...parity,
    chapterSumIfEvenTotal: F,
    verseSumIfOddTotal: G,
    evenSurahEvenVerses: H,
    evenSurahOddVerses: I,
    oddSurahEvenVerses: J,
    oddSurahOddVerses: K
  }
}

// Helper functions for accurate pattern validation
export function calculatePattern1Values(surahs: QuranSurah[]) {
  let evenTotalSum = 0    // Σ D: C when C is even
  let oddTotalSum = 0     // Σ E: C when C is odd
  let evenTotalCount = 0
  let oddTotalCount = 0

  surahs.forEach(surah => {
    const C = surah.number + surah.verseCount

    if (C % 2 === 0) {
      evenTotalSum += C
      evenTotalCount++
    } else {
      oddTotalSum += C
      oddTotalCount++
    }
  })

  return { evenTotalSum, oddTotalSum, evenTotalCount, oddTotalCount }
}

export function calculatePattern3Values(surahs: QuranSurah[]) {
  let F = 0  // Chapter if total (A+B) is even
  let G = 0  // Verses if total (A+B) is odd

  surahs.forEach(surah => {
    const A = surah.number
    const B = surah.verseCount
    const C = A + B
    const isCEven = C % 2 === 0

    if (isCEven) {
      F += A  // Chapter number when total is even
    } else {
      G += B  // Verse count when total is odd
    }
  })

  return { F, G }
}

export function calculatePattern4Counts(surahs: QuranSurah[]) {
  let H = 0  // Count: Even chapter AND even verses
  let I = 0  // Count: Even chapter AND odd verses
  let J = 0  // Count: Odd chapter AND even verses
  let K = 0  // Count: Odd chapter AND odd verses

  surahs.forEach(surah => {
    const A = surah.number
    const B = surah.verseCount
    const isAEven = A % 2 === 0
    const isBEven = B % 2 === 0

    if (isAEven && isBEven) H++
    if (isAEven && !isBEven) I++
    if (!isAEven && isBEven) J++
    if (!isAEven && !isBEven) K++
  })

  return { H, I, J, K }
}
