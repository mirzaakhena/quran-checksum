import { quranData } from '../../v2/data'
import {
  calculateNaturalPatterns,
  validateNaturalPatterns,
  calculatePattern3Values,
  calculatePattern4Counts,
  checkCoreFacts,
  getPatternSummary
} from '../../v2/core'

// Test data
const mockSurahData = [
  { number: 1, verseCount: 7, name: "Al-Fatihah" },
  { number: 2, verseCount: 286, name: "Al-Baqarah" },
  { number: 3, verseCount: 200, name: "Ali 'Imran" },
  { number: 4, verseCount: 176, name: "An-Nisa" },
  { number: 5, verseCount: 120, name: "Al-Ma'idah" }
]

// Deterministic pseudo-random generator (mulberry32) so tests are reproducible
function seededRandom(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6D2B79F5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

describe('Quran Checksum Explorer v2 - Core Calculations', () => {
  describe('Natural Pattern Calculations', () => {
    test('calculateNaturalPatterns should calculate correct sums', () => {
      const results = calculateNaturalPatterns(mockSurahData)

      // Sum of surah numbers: 1+2+3+4+5 = 15
      expect(results.sumSurahNumbers).toBe(15)

      // Sum of verse counts: 7+286+200+176+120 = 789
      expect(results.sumVerseCounts).toBe(789)
    })

    test('calculateNaturalPatterns should classify even/odd correctly', () => {
      const results = calculateNaturalPatterns(mockSurahData)

      // C = A+B: 8, 288, 203, 180, 125
      // Even C: surahs 1, 2, 4 -> 8+288+180 = 476
      expect(results.evenTotalCount).toBe(3)
      expect(results.evenTotalSum).toBe(476)

      // Odd C: surahs 3, 5 -> 203+125 = 328
      expect(results.oddTotalCount).toBe(2)
      expect(results.oddTotalSum).toBe(328)
    })
  })

  describe('Pattern Validation Helpers', () => {
    test('calculatePattern3Values should calculate F and G correctly', () => {
      const { F, G } = calculatePattern3Values(mockSurahData)

      // F = sum of surah numbers where (surah + verses) is even
      // Surah 1: 1+7=8 (even) -> include 1
      // Surah 2: 2+286=288 (even) -> include 2
      // Surah 3: 3+200=203 (odd) -> exclude
      // Surah 4: 4+176=180 (even) -> include 4
      // Surah 5: 5+120=125 (odd) -> exclude
      // F = 1 + 2 + 4 = 7
      expect(F).toBe(7)

      // G = sum of verse counts where (surah + verses) is odd
      // Surah 1: 1+7=8 (even) -> exclude
      // Surah 2: 2+286=288 (even) -> exclude
      // Surah 3: 3+200=203 (odd) -> include 200
      // Surah 4: 4+176=180 (even) -> exclude
      // Surah 5: 5+120=125 (odd) -> include 120
      // G = 200 + 120 = 320
      expect(G).toBe(320)
    })

    test('calculatePattern4Counts should count parity combinations correctly', () => {
      const { H, I, J, K } = calculatePattern4Counts(mockSurahData)

      // H = count of (even surah AND even verses)
      // Surah 2: even surah (2) AND even verses (286) -> H++
      // Surah 4: even surah (4) AND even verses (176) -> H++
      // H = 2
      expect(H).toBe(2)

      // I = count of (even surah AND odd verses)
      // No matches in mock data
      expect(I).toBe(0)

      // J = count of (odd surah AND even verses)
      // Surah 1: odd surah (1) AND even verses (7) -> No, 7 is odd
      // Surah 3: odd surah (3) AND even verses (200) -> J++
      // Surah 5: odd surah (5) AND even verses (120) -> J++
      // J = 2
      expect(J).toBe(2)

      // K = count of (odd surah AND odd verses)
      // Surah 1: odd surah (1) AND odd verses (7) -> K++
      // Surah 3: odd surah (3) AND even verses (200) -> No
      // Surah 5: odd surah (5) AND even verses (120) -> No
      // K = 1
      expect(K).toBe(1)
    })
  })

  describe('Core Facts', () => {
    test('checkCoreFacts should hold for full Quran data', () => {
      expect(checkCoreFacts(calculateNaturalPatterns(quranData))).toEqual({
        sumBalance: true,
        parityBalance: true
      })
    })

    test('Pattern 1 balance is equivalent to F = G, and the 57:57 split to H = J, for any verse counts', () => {
      const random = seededRandom(19)

      for (let trial = 0; trial < 2000; trial++) {
        const surahs = quranData.map(s => ({ ...s, verseCount: 1 + Math.floor(random() * 30) }))
        const r = calculateNaturalPatterns(surahs)
        const facts = checkCoreFacts(r)

        expect(r.evenTotalSum === r.sumVerseCounts).toBe(facts.sumBalance)
        expect(r.oddTotalSum === r.sumSurahNumbers).toBe(facts.sumBalance)
        expect(r.evenTotalCount === r.oddTotalCount).toBe(facts.parityBalance)
      }
    })

    test('Pattern 1 balance holds whenever F = G (random data almost never hits F = G)', () => {
      const balanced = [
        // 1+1 even -> F = 1; 2+1 odd -> G = 1
        [{ number: 1, verseCount: 1 }, { number: 2, verseCount: 1 }],
        // Even A+B: 1+3, 4+2, 5+1 -> F = 1 + 4 + 5 = 10
        // Odd A+B:  2+3, 3+4, 6+3 -> G = 3 + 4 + 3 = 10
        [
          { number: 1, verseCount: 3 }, { number: 2, verseCount: 3 }, { number: 3, verseCount: 4 },
          { number: 4, verseCount: 2 }, { number: 5, verseCount: 1 }, { number: 6, verseCount: 3 }
        ]
      ]

      balanced.forEach(surahs => {
        const r = calculateNaturalPatterns(surahs)
        expect(checkCoreFacts(r).sumBalance).toBe(true)
        expect(r.evenTotalSum).toBe(r.sumVerseCounts)
        expect(r.oddTotalSum).toBe(r.sumSurahNumbers)
      })
    })
  })

  describe('Full Quran Data Validation', () => {
    test('calculateNaturalPatterns should produce correct results for full Quran data', () => {
      const results = calculateNaturalPatterns(quranData)

      expect(results.sumSurahNumbers).toBe(6555)
      expect(results.sumVerseCounts).toBe(6236)
      expect(results.evenTotalSum).toBe(6236)
      expect(results.oddTotalSum).toBe(6555)
      expect(results.evenTotalCount).toBe(57)
      expect(results.oddTotalCount).toBe(57)
      expect(results.chapterSumIfEvenTotal).toBe(3303)
      expect(results.verseSumIfOddTotal).toBe(3303)
    })

    test('validateNaturalPatterns should use only the given results', () => {
      // Change a single surah (Al-Fatihah 7 -> 8 verses); validation must not fall back to quranData
      const altered = quranData.map(s => s.number === 1 ? { ...s, verseCount: 8 } : s)
      const validation = validateNaturalPatterns(calculateNaturalPatterns(altered))

      expect(validation).toEqual({
        pattern1: false,
        pattern2: false,
        pattern3: false,
        pattern4: false
      })
    })

    test('getPatternSummary values should match expected labels for full Quran data', () => {
      const results = calculateNaturalPatterns(quranData)
      const summary = getPatternSummary(results, validateNaturalPatterns(results))

      Object.values(summary).forEach(p => {
        expect(p.valid).toBe(true)
        expect(p.value).toBe(p.expected)
      })
    })

    test('validateNaturalPatterns should validate all patterns correctly', () => {
      const results = calculateNaturalPatterns(quranData)
      const validation = validateNaturalPatterns(results)

      expect(validation).toEqual({
        pattern1: true,
        pattern2: true,
        pattern3: true,
        pattern4: true
      })
    })
  })
})
