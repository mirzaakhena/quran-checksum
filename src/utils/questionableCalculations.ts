import { QuranSurah } from '../types'
import { isPrime, getNthPrime } from './calculations'

export interface QuestionableResults {
  pattern5: {
    firstGroup: number
    secondGroup: number
  }
  pattern6: {
    values: number[]
    isValid: boolean
    details: string
  }
  pattern7: {
    primeSum: number
    nonPrimeSum: number
  }
  pattern8: {
    primeChaptersSum: number
    divisibleBy19Sum: number
  }
  pattern10: {
    repetitiveSum: number
    nonRepetitiveSum: number
    ratio: number
  }
}

export function calculateQuestionablePatterns(surahs: QuranSurah[]): QuestionableResults {
  return {
    pattern5: calculatePattern5(surahs),
    pattern6: calculatePattern6(surahs),
    pattern7: calculatePattern7(surahs),
    pattern8: calculatePattern8(surahs),
    pattern10: calculatePattern10(surahs)
  }
}

// Pattern 5: 2690 - Split 60 even-verse surahs at position 27/33
function calculatePattern5(surahs: QuranSurah[]): { firstGroup: number; secondGroup: number } {
  // Find all surahs with even verse counts
  const evenVerseSurahs = surahs.filter(surah => surah.verseCount % 2 === 0)
  
  // Split into first 27 and last 33
  const first27 = evenVerseSurahs.slice(0, 27)
  const last33 = evenVerseSurahs.slice(27)
  
  // Sum verse counts for first 27, surah numbers for last 33
  const firstGroup = first27.reduce((sum, surah) => sum + surah.verseCount, 0)
  const secondGroup = last33.reduce((sum, surah) => sum + surah.number, 0)
  
  return { firstGroup, secondGroup }
}

// Pattern 6: Complex symmetry with reverse order
function calculatePattern6(surahs: QuranSurah[]): { values: number[]; isValid: boolean; details: string } {
  let oddTotalOddVerses = 0  // N: surah numbers where (surah+verses) is odd AND verses are odd
  let evenTotalOddSurah = 0  // P: surah numbers where (surah+verses) is even AND surah is odd
  let evenTotalEvenVerses = 0 // R: surah numbers where (surah+verses) is even AND verses are even
  let oddTotalEvenVerses = 0  // T: surah numbers where (surah+verses) is odd AND verses are even
  
  let reverseN = 0 // O: reverse of N (114-n+1)
  let reverseP = 0 // Q: reverse of P 
  let reverseR = 0 // S: reverse of R
  let reverseT = 0 // U: reverse of T
  
  surahs.forEach(surah => {
    const total = surah.number + surah.verseCount
    const totalIsOdd = total % 2 === 1
    const surahIsOdd = surah.number % 2 === 1
    const versesAreOdd = surah.verseCount % 2 === 1
    
    // Calculate conditions and their reverses
    if (totalIsOdd && versesAreOdd) {
      oddTotalOddVerses += surah.number
      reverseN += (114 - surah.number + 1)
    }
    
    if (!totalIsOdd && surahIsOdd) {
      evenTotalOddSurah += surah.number
      reverseP += (114 - surah.number + 1)
    }
    
    if (!totalIsOdd && !versesAreOdd) {
      evenTotalEvenVerses += surah.number
      reverseR += (114 - surah.number + 1)
    }
    
    if (totalIsOdd && !versesAreOdd) {
      oddTotalEvenVerses += surah.number
      reverseT += (114 - surah.number + 1)
    }
  })
  
  const values = [reverseP, oddTotalOddVerses, reverseT, reverseR]
  const expectedValues = [1551, 1554, 1698, 1752]
  const isValid = values.every((val, idx) => val === expectedValues[idx])
  
  const details = `N (odd total, odd verses): ${oddTotalOddVerses}
O (reverse N): ${reverseN}
P (even total, odd surah): ${evenTotalOddSurah} 
Q (reverse P): ${reverseP}
R (even total, even verses): ${evenTotalEvenVerses}
S (reverse R): ${reverseR}
T (odd total, even verses): ${oddTotalEvenVerses}
U (reverse T): ${reverseT}`

  return { values, isValid, details }
}

// Pattern 7: 5160 - Prime vs non-prime verse counts
function calculatePattern7(surahs: QuranSurah[]): { primeSum: number; nonPrimeSum: number } {
  let primeSum = 0      // nth prime for prime verse counts
  let nonPrimeSum = 0   // original values for non-prime verse counts
  
  surahs.forEach(surah => {
    if (isPrime(surah.verseCount)) {
      // For prime verse counts, use nth prime where n = verse count
      try {
        primeSum += getNthPrime(surah.verseCount)
      } catch (error) {
        // Skip if nth prime is out of range
        console.warn(`Cannot get ${surah.verseCount}th prime for surah ${surah.number}`)
      }
    } else {
      // For non-prime verse counts, use original value
      nonPrimeSum += surah.verseCount
    }
  })
  
  return { primeSum, nonPrimeSum }
}

// Pattern 8: 2000 - Prime chapters (excluding 19) vs chapters divisible by 19
function calculatePattern8(surahs: QuranSurah[]): { primeChaptersSum: number; divisibleBy19Sum: number } {
  let primeChaptersSum = 0     // verse counts for prime chapter numbers (excluding 19)
  let divisibleBy19Sum = 0     // nth primes for chapters divisible by 19
  
  surahs.forEach(surah => {
    // Prime chapters excluding 19
    if (isPrime(surah.number) && surah.number !== 19) {
      primeChaptersSum += surah.verseCount
    }
    
    // Chapters divisible by 19
    if (surah.number % 19 === 0) {
      try {
        divisibleBy19Sum += getNthPrime(surah.number)
      } catch (error) {
        console.warn(`Cannot get ${surah.number}th prime for surah ${surah.number}`)
      }
    }
  })
  
  return { primeChaptersSum, divisibleBy19Sum }
}

// Pattern 10: Golden ratio from repetitive vs non-repetitive frequency
function calculatePattern10(surahs: QuranSurah[]): { repetitiveSum: number; nonRepetitiveSum: number; ratio: number } {
  // Calculate frequency of each (surah + verses) value
  const valueFrequency = new Map<number, number>()
  
  surahs.forEach(surah => {
    const value = surah.number + surah.verseCount
    valueFrequency.set(value, (valueFrequency.get(value) || 0) + 1)
  })
  
  let repetitiveSum = 0    // sum of values that appear more than once
  let nonRepetitiveSum = 0 // sum of values that appear exactly once
  
  // Group values by frequency and calculate sums
  surahs.forEach(surah => {
    const value = surah.number + surah.verseCount
    const frequency = valueFrequency.get(value) || 1
    
    if (frequency > 1) {
      repetitiveSum += value
    } else {
      nonRepetitiveSum += value
    }
  })
  
  const ratio = nonRepetitiveSum > 0 ? repetitiveSum / nonRepetitiveSum : 0
  
  return { repetitiveSum, nonRepetitiveSum, ratio }
}

// Helper function to validate all questionable patterns
export function validateQuestionablePatterns(results: QuestionableResults): Record<string, boolean> {
  return {
    pattern5: results.pattern5.firstGroup === 2690 && results.pattern5.secondGroup === 2690,
    pattern6: results.pattern6.isValid,
    pattern7: results.pattern7.primeSum === 5160 && results.pattern7.nonPrimeSum === 5160,
    pattern8: results.pattern8.primeChaptersSum === 2000 && results.pattern8.divisibleBy19Sum === 2000,
    pattern10: Math.abs(results.pattern10.ratio - 1.618424) < 0.001
  }
}

// Helper function to get pattern descriptions
export function getQuestionablePatternDescriptions(): Record<string, { title: string; formula: string; concern: string }> {
  return {
    pattern5: {
      title: 'Even Verse Split (27:33)',
      formula: 'Split 60 even-verse surahs: first 27 verse counts vs last 33 surah numbers',
      concern: 'Arbitrary split point - why 27/33 instead of 30/30?'
    },
    pattern6: {
      title: 'Complex Reverse Symmetry',
      formula: 'Four-way classification with reverse order (114-n+1)',
      concern: 'Over-engineered with artificial reverse order formula'
    },
    pattern7: {
      title: 'Prime vs Non-Prime Balance',
      formula: 'nth_prime(prime_verse_counts) vs original(non_prime_verse_counts)',
      concern: 'Sophisticated number manipulation with prime dependency'
    },
    pattern8: {
      title: 'Prime Chapters with Exclusion',
      formula: 'verse_sum(prime_chapters ≠ 19) vs nth_prime_sum(chapters ÷ 19)',
      concern: 'Arbitrary exclusion of 19 from prime list - major red flag'
    },
    pattern10: {
      title: 'Golden Ratio from Frequency',
      formula: 'repetitive_sum ÷ non_repetitive_sum ≈ φ',
      concern: 'Subjective definition of repetitive vs non-repetitive'
    }
  }
}
