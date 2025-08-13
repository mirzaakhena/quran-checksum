// Questionable pattern calculations
import { QuranSurah, QuestionablePatternResults, QuestionablePatternValidation } from '../types'
import { isPrime, getNthPrime } from '../utils/math'

// Calculate questionable patterns (5-8)
export function calculateQuestionablePatterns(surahs: QuranSurah[]): QuestionablePatternResults {
  // Pattern 5: Even verse split 27-33
  const evenVerseSurahs = surahs.filter(s => s.verseCount % 2 === 0)
  let pattern5FirstGroup = 0
  let pattern5SecondGroup = 0
  
  // First 27 even-verse surahs: take verse count
  // Last 33 even-verse surahs: take surah number
  evenVerseSurahs.forEach((surah, index) => {
    if (index < 27) {
      pattern5FirstGroup += surah.verseCount
    } else {
      pattern5SecondGroup += surah.number
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
    pattern5FirstGroup,
    pattern5SecondGroup,
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

// Validate questionable patterns
export function validateQuestionablePatterns(results: QuestionablePatternResults): QuestionablePatternValidation {
  return {
    // Pattern 5: 2690 balance
    pattern5: results.pattern5FirstGroup === 2690 && results.pattern5SecondGroup === 2690,
    
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