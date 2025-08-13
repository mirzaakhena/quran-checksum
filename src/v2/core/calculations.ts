// Core pattern calculations for natural patterns
import { QuranSurah, PatternResults, GoldenRatioDetails, RepetitiveValueBreakdown, NonRepetitiveValueBreakdown } from '../types'
import { isPrime, getNthPrime } from '../utils/math'

// Calculate all natural patterns
export function calculateNaturalPatterns(surahs: QuranSurah[]): PatternResults {
  // Basic sums
  const sumSurahNumbers = surahs.reduce((sum, surah) => sum + surah.number, 0)
  const sumVerseCounts = surahs.reduce((sum, surah) => sum + surah.verseCount, 0)
  
  // Even/odd classification
  let evenSurahs = 0, oddSurahs = 0
  let evenVerses = 0, oddVerses = 0
  let evenSurahEvenVerses = 0, evenSurahOddVerses = 0
  let oddSurahEvenVerses = 0, oddSurahOddVerses = 0
  
  // Prime verse counting
  let primeVersesSum = 0
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
      primeVersesSum += surah.verseCount
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
    primeVersesSum,
    nthPrimeSum,
    goldenRatio,
    repetitiveSum,
    nonRepetitiveSum,
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

// Helper functions for accurate pattern validation
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

export function calculatePattern9Values(surahs: QuranSurah[]) {
  let Z = 0   // Sum of prime verse counts
  let AA = 0  // Sum of nth primes for prime verse counts
  
  surahs.forEach(surah => {
    const B = surah.verseCount
    if (isPrime(B)) {
      Z += B
      AA += getNthPrime(B)
    }
  })
  
  return { Z, AA }
}