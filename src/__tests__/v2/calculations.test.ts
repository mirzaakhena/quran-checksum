import { quranData } from '../../v2/data'
import { 
  calculateNaturalPatterns, 
  validateNaturalPatterns,
  calculateGoldenRatioDetails,
  calculatePattern3Values,
  calculatePattern4Counts,
  calculatePattern9Values
} from '../../v2/core'
import { isPrime, getNthPrime } from '../../v2/utils/math'

// Test data
const mockSurahData = [
  { number: 1, verseCount: 7, name: "Al-Fatihah" },
  { number: 2, verseCount: 286, name: "Al-Baqarah" },
  { number: 3, verseCount: 200, name: "Ali 'Imran" },
  { number: 4, verseCount: 176, name: "An-Nisa" },
  { number: 5, verseCount: 120, name: "Al-Ma'idah" }
]

describe('Quran Checksum Explorer v2 - Core Calculations', () => {
  describe('Prime Number Utilities', () => {
    test('isPrime should correctly identify prime numbers', () => {
      expect(isPrime(2)).toBe(true)
      expect(isPrime(3)).toBe(true)
      expect(isPrime(4)).toBe(false)
      expect(isPrime(17)).toBe(true)
      expect(isPrime(100)).toBe(false)
    })

    test('getNthPrime should return correct prime numbers', () => {
      expect(getNthPrime(1)).toBe(2)
      expect(getNthPrime(2)).toBe(3)
      expect(getNthPrime(5)).toBe(11)
      expect(getNthPrime(10)).toBe(29)
      expect(getNthPrime(100)).toBe(541)
    })

    test('getNthPrime should return 0 for out of range values', () => {
      expect(getNthPrime(0)).toBe(0)
      expect(getNthPrime(-1)).toBe(0)
      expect(getNthPrime(1000)).toBe(0)
    })
  })

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
      
      // Even surahs: 2, 4 (2 surahs)
      expect(results.evenSurahs).toBe(2)
      
      // Odd surahs: 1, 3, 5 (3 surahs)
      expect(results.oddSurahs).toBe(3)
    })

    test('calculateNaturalPatterns should calculate prime verse sums correctly', () => {
      const results = calculateNaturalPatterns(mockSurahData)
      
      // Prime verse counts: 7 (1 surah with 7 verses)
      expect(results.primeVersesSum).toBe(7)
      
      // nth prime for 7: 17 (7th prime is 17)
      expect(results.nthPrimeSum).toBe(17)
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

    test('calculatePattern9Values should calculate prime verse sums correctly', () => {
      const { Z, AA } = calculatePattern9Values(mockSurahData)
      
      // Z = sum of prime verse counts
      // Only surah 1 has prime verse count (7)
      expect(Z).toBe(7)
      
      // AA = sum of nth primes where n = prime verse count
      // For surah 1: prime verse count = 7, 7th prime = 17
      expect(AA).toBe(17)
    })
  })

  describe('Full Quran Data Validation', () => {
    test('calculateNaturalPatterns should produce correct results for full Quran data', () => {
      const results = calculateNaturalPatterns(quranData)
      
      expect(results.sumSurahNumbers).toBe(6555)
      expect(results.sumVerseCounts).toBe(6236)
      expect(results.evenSurahs).toBe(57)
      expect(results.oddSurahs).toBe(57)
    })

    test('validateNaturalPatterns should validate all patterns correctly', () => {
      const results = calculateNaturalPatterns(quranData)
      const validation = validateNaturalPatterns(results)
      
      expect(validation.pattern1).toBe(true)
      expect(validation.pattern2).toBe(true)
      expect(validation.pattern3).toBe(true)
      expect(validation.pattern4).toBe(true)
      expect(validation.pattern9).toBe(true)
      expect(validation.pattern10).toBe(true)
    })

    test('calculateGoldenRatioDetails should calculate correct golden ratio', () => {
      const details = calculateGoldenRatioDetails(quranData)
      
      expect(details.repetitiveSum).toBe(7906)
      expect(details.nonRepetitiveSum).toBe(4885)
      expect(details.goldenRatio).toBeCloseTo(1.618424, 5)
    })
  })
})