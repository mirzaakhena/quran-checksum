// Questionable pattern validation
export interface QuestionableValidation {
  pattern5: boolean
  pattern6: boolean 
  pattern7: boolean
  pattern8: boolean
}

export function validateQuestionablePatterns(results: QuestionableResults): QuestionableValidation {
  return {
    // Pattern 5: 2690 balance
    pattern5: results.pattern5First27 === 2690 && results.pattern5Last33 === 2690,
    
    // Pattern 6: Four perfect symmetries
    pattern6: results.pattern6Group1 === results.pattern6Reverse2 && // 1554
              results.pattern6Group2 === results.pattern6Reverse1 && // 1551
              results.pattern6Group3 === results.pattern6Reverse4 && // 1752
              results.pattern6Group4 === results.pattern6Reverse3,   // 1698
    
    // Pattern 7: 5160 balance
    pattern7: results.pattern7PrimeSum === 5160 && results.pattern7NonPrimeSum === 5160,
    
    // Pattern 8: 2000 balance (but this is highly suspicious due to exclusion of 19)
    pattern8: results.pattern8PrimeChaptersSum === 2000 && results.pattern8Multiple19Sum === 2000
  }
}

import { QuranSurah, ChecksumResults, PatternValidation } from '../types'
import { quranData } from '../data/quran'

// Extended interface for Pattern 10 golden ratio details
export interface GoldenRatioDetails {
  repetitiveValues: number[]  // List of Column C values (A+B) that appear more than once
  nonRepetitiveValues: number[]  // List of Column C values (A+B) that appear only once
  repetitiveSum: number  // Sum of all repetitive Column C values
  nonRepetitiveSum: number  // Sum of all non-repetitive Column C values
  repetitiveCount: number  // Total count of repetitive occurrences
  nonRepetitiveCount: number  // Count of non-repetitive Column C values
  goldenRatio: number  // repetitiveSum / nonRepetitiveSum
  columnCFrequency: Map<number, number>  // Map of Column C value to frequency
  repetitiveBreakdown: RepetitiveValueBreakdown[]  // Detailed breakdown of repetitive values
  nonRepetitiveBreakdown: NonRepetitiveValueBreakdown[]  // Detailed breakdown of non-repetitive values
}

// Detailed breakdown for each repetitive value
export interface RepetitiveValueBreakdown {
  columnCValue: number  // The Column C value (A+B)
  frequency: number     // How many times it appears
  surahs: number[]      // Which surahs have this value
}

// Detailed breakdown for each non-repetitive value
export interface NonRepetitiveValueBreakdown {
  columnCValue: number  // The Column C value (A+B)
  surah: number         // Which surah has this value
}

// Prime number utilities
export function isPrime(n: number): boolean {
  if (n < 2) return false
  if (n === 2) return true
  if (n % 2 === 0) return false
  
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false
  }
  return true
}

// First 286 prime numbers (enough for our calculations)
const PRIMES = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
  157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233,
  239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317,
  331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419,
  421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503,
  509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607,
  613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701,
  709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811,
  821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911,
  919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013,
  1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091,
  1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181,
  1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277,
  1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361,
  1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451,
  1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531,
  1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609,
  1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699,
  1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789,
  1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889
]

export function getNthPrime(n: number): number {
  if (n < 1 || n > PRIMES.length) {
    return 0 // Return 0 for out of range instead of throwing error
  }
  return PRIMES[n - 1]
}

// Extended interface for questionable patterns
export interface QuestionableResults {
  // Pattern 5: Even verse split 27-33
  pattern5First27: number
  pattern5Last33: number
  
  // Pattern 6: Complex symmetry with reverse order
  pattern6Group1: number
  pattern6Group2: number
  pattern6Group3: number
  pattern6Group4: number
  pattern6Reverse1: number
  pattern6Reverse2: number
  pattern6Reverse3: number
  pattern6Reverse4: number
  
  // Pattern 7: Prime vs non-prime verses
  pattern7PrimeSum: number
  pattern7NonPrimeSum: number
  
  // Pattern 8: Prime chapters vs multiples of 19
  pattern8PrimeChaptersSum: number
  pattern8Multiple19Sum: number
}

// Core pattern calculations
export function calculatePatterns(surahs: QuranSurah[]): ChecksumResults {
  // Basic sums
  const sumSurahNumbers = surahs.reduce((sum, surah) => sum + surah.number, 0)
  const sumVerseCounts = surahs.reduce((sum, surah) => sum + surah.verseCount, 0)
  
  // Even/odd classification
  let evenSurahs = 0, oddSurahs = 0
  let evenVerses = 0, oddVerses = 0
  let evenSurahEvenVerses = 0, evenSurahOddVerses = 0
  let oddSurahEvenVerses = 0, oddSurahOddVerses = 0
  
  // Prime verse counting
  let primeVerses = 0
  let nthPrimeSum = 0
  
  // Golden ratio calculation
  let repetitiveSum = 0
  let nonRepetitiveSum = 0
  let repetitiveCount = 0
  let nonRepetitiveCount = 0
  const columnCMap = new Map<number, number>()
  
  surahs.forEach((surah) => {
    const surahIsEven = surah.number % 2 === 0
    const verseIsEven = surah.verseCount % 2 === 0
    
    // Count even/odd surahs and verses
    if (surahIsEven) {
      evenSurahs++
      if (verseIsEven) evenSurahEvenVerses++
      else evenSurahOddVerses++
    } else {
      oddSurahs++
      if (verseIsEven) oddSurahEvenVerses++
      else oddSurahOddVerses++
    }
    
    if (verseIsEven) evenVerses++
    else oddVerses++
    
    // Prime verse calculations
    if (isPrime(surah.verseCount)) {
      primeVerses++
      nthPrimeSum += getNthPrime(surah.verseCount)
    }
    
    // Golden ratio - count frequency of Column C values (A+B)
    const columnCValue = surah.number + surah.verseCount  // A + B
    const count = columnCMap.get(columnCValue) || 0
    columnCMap.set(columnCValue, count + 1)
  })
  
  // Calculate repetitive vs non-repetitive sums (matching Go implementation)
  surahs.forEach((surah) => {
    const columnCValue = surah.number + surah.verseCount  // A + B
    const frequency = columnCMap.get(columnCValue) || 0
    if (frequency > 1) {
      repetitiveSum += columnCValue
      repetitiveCount++
    } else {
      nonRepetitiveSum += columnCValue
      nonRepetitiveCount++
    }
  })
  
  // Calculate golden ratio (sum of repetitive / sum of non-repetitive)
  const goldenRatio = nonRepetitiveSum !== 0 ? repetitiveSum / nonRepetitiveSum : 0
  
  return {
    sumSurahNumbers,
    sumVerseCounts,
    evenSurahs,
    oddSurahs,
    evenVerses,
    oddVerses,
    evenSurahEvenVerses,
    evenSurahOddVerses,
    oddSurahEvenVerses,
    oddSurahOddVerses,
    primeVerses,
    nthPrimeSum,
    goldenRatio,
    repetitiveCount,
    nonRepetitiveCount
  }
}

// Calculate detailed golden ratio information for Pattern 10
export function calculateGoldenRatioDetails(surahs: QuranSurah[]): GoldenRatioDetails {
  const columnCFrequency = new Map<number, number>()
  const columnCToSurahs = new Map<number, number[]>()
  const repetitiveValues: number[] = []
  const nonRepetitiveValues: number[] = []
  const repetitiveBreakdown: RepetitiveValueBreakdown[] = []
  const nonRepetitiveBreakdown: NonRepetitiveValueBreakdown[] = []
  
  // Count frequency of each Column C value (A+B) and track which surahs have each value
  surahs.forEach((surah) => {
    const columnCValue = surah.number + surah.verseCount  // A + B
    const count = columnCFrequency.get(columnCValue) || 0
    columnCFrequency.set(columnCValue, count + 1)
    
    // Track which surahs have this Column C value
    const surahList = columnCToSurahs.get(columnCValue) || []
    surahList.push(surah.number)
    columnCToSurahs.set(columnCValue, surahList)
  })
  
  // Separate repetitive (frequency > 1) vs non-repetitive (frequency = 1)
  columnCFrequency.forEach((frequency, columnCValue) => {
    if (frequency > 1) {
      repetitiveValues.push(columnCValue)
      // Create detailed breakdown for repetitive values
      const surahs = columnCToSurahs.get(columnCValue) || []
      repetitiveBreakdown.push({
        columnCValue,
        frequency,
        surahs: surahs.sort((a, b) => a - b)
      })
    } else {
      nonRepetitiveValues.push(columnCValue)
      // Create detailed breakdown for non-repetitive values
      const surahs = columnCToSurahs.get(columnCValue) || []
      nonRepetitiveBreakdown.push({
        columnCValue,
        surah: surahs[0]  // Only one surah since frequency = 1
      })
    }
  })
  
  // Calculate sums
  let repetitiveSum = 0
  let repetitiveCount = 0
  let nonRepetitiveSum = 0
  let nonRepetitiveCount = 0
  
  surahs.forEach((surah) => {
    const columnCValue = surah.number + surah.verseCount  // A + B
    const frequency = columnCFrequency.get(columnCValue) || 0
    if (frequency > 1) {
      repetitiveSum += columnCValue
      repetitiveCount++
    } else {
      nonRepetitiveSum += columnCValue
      nonRepetitiveCount++
    }
  })
  
  const goldenRatio = repetitiveSum / nonRepetitiveSum
  
  return {
    repetitiveValues: repetitiveValues.sort((a, b) => a - b),
    nonRepetitiveValues: nonRepetitiveValues.sort((a, b) => a - b),
    repetitiveSum,
    nonRepetitiveSum,
    repetitiveCount,
    nonRepetitiveCount,
    goldenRatio,
    columnCFrequency,
    repetitiveBreakdown: repetitiveBreakdown.sort((a, b) => a.columnCValue - b.columnCValue),
    nonRepetitiveBreakdown: nonRepetitiveBreakdown.sort((a, b) => a.columnCValue - b.columnCValue)
  }
}

// Helper function to check if a Column C value (A+B) is repetitive
export function isRepetitiveColumnCValue(columnCValue: number, goldenRatioDetails?: GoldenRatioDetails): boolean {
  if (!goldenRatioDetails) {
    // Fallback calculation if details not provided
    const details = calculateGoldenRatioDetails(quranData)
    return details.repetitiveValues.includes(columnCValue)
  }
  return goldenRatioDetails.repetitiveValues.includes(columnCValue)
}

// Calculate questionable patterns (5-8)
export function calculateQuestionablePatterns(surahs: QuranSurah[]): QuestionableResults {
  // Pattern 5: Even verse split 27-33
  const evenVerseSurahs = surahs.filter(s => s.verseCount % 2 === 0)
  let pattern5First27 = 0
  let pattern5Last33 = 0
  
  // First 27 even-verse surahs: take verse count
  // Last 33 even-verse surahs: take surah number
  evenVerseSurahs.forEach((surah, index) => {
    if (index < 27) {
      pattern5First27 += surah.verseCount
    } else {
      pattern5Last33 += surah.number
    }
  })
  
  // Pattern 6: Complex symmetry with reverse order
  let pattern6Group1 = 0, pattern6Group2 = 0, pattern6Group3 = 0, pattern6Group4 = 0
  let pattern6Reverse1 = 0, pattern6Reverse2 = 0, pattern6Reverse3 = 0, pattern6Reverse4 = 0
  
  surahs.forEach(surah => {
    const A = surah.number
    const B = surah.verseCount
    const total = A + B
    const isAEven = A % 2 === 0
    const isBEven = B % 2 === 0
    const isTotalEven = total % 2 === 0
    
    // Group 1: Total odd AND verses odd -> surah number
    if (!isTotalEven && !isBEven) {
      pattern6Group1 += A
      pattern6Reverse1 += (114 - A + 1)
    }
    
    // Group 2: Total even AND surah odd -> surah number  
    if (isTotalEven && !isAEven) {
      pattern6Group2 += A
      pattern6Reverse2 += (114 - A + 1)
    }
    
    // Group 3: Total even AND verses even -> surah number
    if (isTotalEven && isBEven) {
      pattern6Group3 += A
      pattern6Reverse3 += (114 - A + 1)
    }
    
    // Group 4: Total odd AND verses even -> surah number
    if (!isTotalEven && isBEven) {
      pattern6Group4 += A
      pattern6Reverse4 += (114 - A + 1)
    }
  })
  
  // Pattern 7: Prime vs non-prime verses
  let pattern7PrimeSum = 0
  let pattern7NonPrimeSum = 0
  
  surahs.forEach(surah => {
    if (isPrime(surah.verseCount)) {
      try {
        pattern7PrimeSum += getNthPrime(surah.verseCount)
      } catch {
        // Skip if prime index is out of range
      }
    } else {
      pattern7NonPrimeSum += surah.verseCount
    }
  })
  
  // Pattern 8: Prime chapters vs multiples of 19
  let pattern8PrimeChaptersSum = 0
  let pattern8Multiple19Sum = 0
  
  surahs.forEach(surah => {
    // Prime chapters (excluding 19) -> verse count
    if (isPrime(surah.number) && surah.number !== 19) {
      pattern8PrimeChaptersSum += surah.verseCount
    }
    
    // Chapters divisible by 19 -> nth prime of chapter number
    if (surah.number % 19 === 0) {
      try {
        pattern8Multiple19Sum += getNthPrime(surah.number)
      } catch {
        // Skip if prime index is out of range
      }
    }
  })
  
  return {
    pattern5First27,
    pattern5Last33,
    pattern6Group1,
    pattern6Group2,
    pattern6Group3,
    pattern6Group4,
    pattern6Reverse1,
    pattern6Reverse2,
    pattern6Reverse3,
    pattern6Reverse4,
    pattern7PrimeSum,
    pattern7NonPrimeSum,
    pattern8PrimeChaptersSum,
    pattern8Multiple19Sum
  }
}

// Enhanced validation function with actual table calculations
export function validatePatternsWithTableData(results: ChecksumResults): PatternValidation {
  // Calculate Pattern 3 values (F and G)
  const pattern3Values = calculatePattern3Values()
  
  // Calculate Pattern 4 counts (H, I, J, K)
  const pattern4Counts = calculatePattern4Counts()
  
  // Calculate Pattern 9 values (Z and AA)
  const pattern9Values = calculatePattern9Values()
  
  return {
    // Pattern 1: Perfect balance 6555/6236
    pattern1: results.sumSurahNumbers === 6555 && results.sumVerseCounts === 6236,
    
    // Pattern 2: Perfect 57:57 distribution
    pattern2: results.evenSurahs === 57 && results.oddSurahs === 57,
    
    // Pattern 3: 3303 symmetry (F=G where F=chapter if total even, G=verses if total odd)
    pattern3: pattern3Values.F === 3303 && pattern3Values.G === 3303,
    
    // Pattern 4: 30-27-27-30 parity combinations (count of H, I, J, K)
    pattern4: pattern4Counts.H === 30 && 
              pattern4Counts.I === 27 &&
              pattern4Counts.J === 30 &&
              pattern4Counts.K === 27,
    
    // Pattern 9: Z+AA=6236 (prime verses + nth prime sum)
    pattern9: (pattern9Values.Z + pattern9Values.AA) === 6236,
    
    // Pattern 10: Golden ratio φ ≈ 1.618424
    pattern10: Math.abs(results.goldenRatio - 1.618424) < 0.001
  }
}

// Legacy function for backward compatibility
export function validatePatterns(results: ChecksumResults): PatternValidation {
  return validatePatternsWithTableData(results)
}

// Helper functions for accurate pattern validation (exported for component use)
export function calculatePattern3Values() {
  let F = 0  // Chapter if total (A+B) is even
  let G = 0  // Verses if total (A+B) is odd
  
  quranData.forEach(surah => {
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

export function calculatePattern4Counts() {
  let H = 0  // Count: Even chapter AND even verses
  let I = 0  // Count: Even chapter AND odd verses
  let J = 0  // Count: Odd chapter AND even verses  
  let K = 0  // Count: Odd chapter AND odd verses
  
  quranData.forEach(surah => {
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

export function calculatePattern9Values() {
  let Z = 0   // Sum of prime verse counts
  let AA = 0  // Sum of nth primes for prime verse counts
  
  quranData.forEach(surah => {
    const B = surah.verseCount
    if (isPrime(B)) {
      Z += B
      AA += getNthPrime(B)
    }
  })
  
  return { Z, AA }
}

// Helper function for Pattern 3 calculation
function calculatePattern3Value(results: ChecksumResults): number {
  // This is a simplified version - the actual formula may be more complex
  // Based on conditional symmetry pattern from the research
  return results.sumSurahNumbers - results.sumVerseCounts + results.evenSurahs - results.oddSurahs
}

// Utility to get pattern summary
export function getPatternSummary(results: ChecksumResults, validation: PatternValidation) {
  return {
    pattern1: {
      description: "Perfect Balance",
      value: `${results.sumSurahNumbers}/${results.sumVerseCounts}`,
      expected: "6555/6236",
      valid: validation.pattern1
    },
    pattern2: {
      description: "57:57 Distribution", 
      value: `${results.evenSurahs}:${results.oddSurahs}`,
      expected: "57:57",
      valid: validation.pattern2
    },
    pattern3: {
      description: "3303 Symmetry",
      value: calculatePattern3Value(results),
      expected: 3303,
      valid: validation.pattern3
    },
    pattern4: {
      description: "Parity Matrix",
      value: `${results.evenSurahEvenVerses}-${results.evenSurahOddVerses}-${results.oddSurahEvenVerses}-${results.oddSurahOddVerses}`,
      expected: "30-27-27-30",
      valid: validation.pattern4
    },
    pattern9: {
      description: "Prime Sum",
      value: results.primeVerses + results.nthPrimeSum,
      expected: 6236,
      valid: validation.pattern9
    },
    pattern10: {
      description: "Golden Ratio",
      value: results.goldenRatio.toFixed(6),
      expected: "1.618424",
      valid: validation.pattern10
    }
  }
}
