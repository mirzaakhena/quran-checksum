// Test file for v2 refactored code
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

describe('Quran Checksum Explorer v2', () => {
  test('should calculate natural patterns correctly', () => {
    const results = calculateNaturalPatterns(quranData)
    
    expect(results.sumSurahNumbers).toBe(6555)
    expect(results.sumVerseCounts).toBe(6236)
    expect(results.evenSurahs).toBe(57)
    expect(results.oddSurahs).toBe(57)
  })

  test('should validate all natural patterns correctly', () => {
    const results = calculateNaturalPatterns(quranData)
    const validation = validateNaturalPatterns(results)
    
    expect(validation.pattern1).toBe(true)
    expect(validation.pattern2).toBe(true)
    expect(validation.pattern3).toBe(true)
    expect(validation.pattern4).toBe(true)
    expect(validation.pattern9).toBe(true)
    expect(validation.pattern10).toBe(true)
  })

  test('should calculate golden ratio details correctly', () => {
    const details = calculateGoldenRatioDetails(quranData)
    
    expect(details.repetitiveSum).toBe(7906)
    expect(details.nonRepetitiveSum).toBe(4885)
    expect(details.goldenRatio).toBeCloseTo(1.618424, 5)
  })

  test('should calculate pattern 3 values correctly', () => {
    const { F, G } = calculatePattern3Values(quranData)
    
    expect(F).toBe(3303)
    expect(G).toBe(3303)
  })

  test('should calculate pattern 4 counts correctly', () => {
    const { H, I, J, K } = calculatePattern4Counts(quranData)
    
    expect(H).toBe(30)
    expect(I).toBe(27)
    expect(J).toBe(30)
    expect(K).toBe(27)
  })

  test('should calculate pattern 9 values correctly', () => {
    const { Z, AA } = calculatePattern9Values(quranData)
    
    expect(Z).toBe(1076)
    expect(AA).toBe(5160)
  })

  test('should correctly identify prime numbers', () => {
    expect(isPrime(2)).toBe(true)
    expect(isPrime(3)).toBe(true)
    expect(isPrime(4)).toBe(false)
    expect(isPrime(17)).toBe(true)
    expect(isPrime(100)).toBe(false)
  })

  test('should get nth prime numbers correctly', () => {
    expect(getNthPrime(1)).toBe(2)
    expect(getNthPrime(2)).toBe(3)
    expect(getNthPrime(5)).toBe(11)
    expect(getNthPrime(10)).toBe(29)
    expect(getNthPrime(100)).toBe(541)
  })
})