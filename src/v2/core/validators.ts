// Pattern validation functions
import { PatternResults, PatternValidation } from '../types'

// Expected values for every pattern - the single source of truth for validators and UI
export const EXPECTED = {
  sumSurahNumbers: 6555,
  sumVerseCounts: 6236,
  pattern1: { evenTotalSum: 6236, oddTotalSum: 6555 },
  pattern2: { evenTotalCount: 57, oddTotalCount: 57 },
  pattern3: 3303,
  pattern4: { H: 30, I: 27, J: 30, K: 27 }
} as const

// Display helpers so every component formats patterns the same way
export const formatPattern1 = (evenTotalSum: number, oddTotalSum: number) => `${evenTotalSum}/${oddTotalSum}`
export const formatPattern2 = (evenTotalCount: number, oddTotalCount: number) => `${evenTotalCount}:${oddTotalCount}`
export const formatPattern4 = (H: number, I: number, J: number, K: number) => `${H}-${I}-${J}-${K}`

export const EXPECTED_LABELS = {
  pattern1: formatPattern1(EXPECTED.pattern1.evenTotalSum, EXPECTED.pattern1.oddTotalSum),
  pattern2: formatPattern2(EXPECTED.pattern2.evenTotalCount, EXPECTED.pattern2.oddTotalCount),
  pattern3: String(EXPECTED.pattern3),
  pattern4: formatPattern4(EXPECTED.pattern4.H, EXPECTED.pattern4.I, EXPECTED.pattern4.J, EXPECTED.pattern4.K)
} as const

// The four patterns are not independent: they come in two equivalent pairs, and within a pair
// neither pattern is more fundamental, each holds exactly when the other does.
//
// Sum balance (patterns 1 & 3):  Σ D = Σ B  ⇔  F = G
//   Σ D = Σ(A | C even) + Σ(B | C even) and Σ B = Σ(B | C even) + Σ(B | C odd),
//   so Σ D = Σ B exactly when Σ(A | C even) = Σ(B | C odd), i.e. F = G.
//   Σ E = Σ A goes with it, because Σ D + Σ E = Σ A + Σ B always.
//
// Parity balance (patterns 2 & 4):  COUNT(C even) = COUNT(C odd)  ⇔  H = J (and I = K)
//   C is even exactly when A and B share parity, so COUNT(C even) = H + K and COUNT(C odd) = I + J.
//   There are always 57 even and 57 odd surah numbers (H + I = 57, J + K = 57),
//   so H + K = I + J exactly when H = J, and then I = K as well.
export const CORE_FACTS = {
  sumBalance: {
    title: 'Sum Balance',
    patterns: ['pattern1', 'pattern3'] as const
  },
  parityBalance: {
    title: 'Parity Balance',
    patterns: ['pattern2', 'pattern4'] as const
  }
} as const

export function checkCoreFacts(results: PatternResults) {
  return {
    sumBalance: results.chapterSumIfEvenTotal === results.verseSumIfOddTotal,
    parityBalance: results.evenSurahEvenVerses === results.oddSurahEvenVerses
  }
}

// Validate natural patterns
// Uses only `results`, so the validation always matches the data the results were computed from.
export function validateNaturalPatterns(results: PatternResults): PatternValidation {
  return {
    // Pattern 1: Σ(C even) = ΣB = 6236 and Σ(C odd) = ΣA = 6555
    pattern1: results.evenTotalSum === EXPECTED.pattern1.evenTotalSum &&
              results.oddTotalSum === EXPECTED.pattern1.oddTotalSum &&
              results.evenTotalSum === results.sumVerseCounts &&
              results.oddTotalSum === results.sumSurahNumbers,

    // Pattern 2: 57 surahs with even C, 57 with odd C
    pattern2: results.evenTotalCount === EXPECTED.pattern2.evenTotalCount &&
              results.oddTotalCount === EXPECTED.pattern2.oddTotalCount,

    // Pattern 3: 3303 symmetry (F=G where F=chapter if total even, G=verses if total odd)
    pattern3: results.chapterSumIfEvenTotal === EXPECTED.pattern3 &&
              results.verseSumIfOddTotal === EXPECTED.pattern3,

    // Pattern 4: 30-27-30-27 parity combinations (count of H, I, J, K)
    pattern4: results.evenSurahEvenVerses === EXPECTED.pattern4.H &&
              results.evenSurahOddVerses === EXPECTED.pattern4.I &&
              results.oddSurahEvenVerses === EXPECTED.pattern4.J &&
              results.oddSurahOddVerses === EXPECTED.pattern4.K
  }
}

// Get pattern summary for UI display
export function getPatternSummary(results: PatternResults, validation: PatternValidation) {
  const F = results.chapterSumIfEvenTotal
  const G = results.verseSumIfOddTotal

  return {
    pattern1: {
      description: "Perfect Balance",
      value: formatPattern1(results.evenTotalSum, results.oddTotalSum),
      expected: EXPECTED_LABELS.pattern1,
      valid: validation.pattern1
    },
    pattern2: {
      description: "57:57 Distribution",
      value: formatPattern2(results.evenTotalCount, results.oddTotalCount),
      expected: EXPECTED_LABELS.pattern2,
      valid: validation.pattern2
    },
    pattern3: {
      description: "3303 Symmetry",
      value: F === G ? String(F) : `${F}/${G}`,
      expected: EXPECTED_LABELS.pattern3,
      valid: validation.pattern3
    },
    pattern4: {
      description: "Parity Matrix",
      value: formatPattern4(results.evenSurahEvenVerses, results.evenSurahOddVerses, results.oddSurahEvenVerses, results.oddSurahOddVerses),
      expected: EXPECTED_LABELS.pattern4,
      valid: validation.pattern4
    }
  }
}
