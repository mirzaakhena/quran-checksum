// Simple test script for v2 refactored code
import { quranData } from './data'
import { 
  calculateNaturalPatterns, 
  validateNaturalPatterns,
  calculateGoldenRatioDetails,
  calculatePattern3Values,
  calculatePattern4Counts,
  calculatePattern9Values
} from './core'
import { isPrime, getNthPrime } from './utils/math'

function runTests() {
  console.log('Running tests for Quran Checksum Explorer v2...\n')

  // Test 1: Prime number utilities
  console.log('Test 1: Prime number utilities')
  console.assert(isPrime(2) === true, 'isPrime(2) should be true')
  console.assert(isPrime(3) === true, 'isPrime(3) should be true')
  console.assert(isPrime(4) === false, 'isPrime(4) should be false')
  console.assert(isPrime(17) === true, 'isPrime(17) should be true')
  console.assert(getNthPrime(1) === 2, 'getNthPrime(1) should be 2')
  console.assert(getNthPrime(5) === 11, 'getNthPrime(5) should be 11')
  console.assert(getNthPrime(0) === 0, 'getNthPrime(0) should be 0')
  console.log('✓ Prime number utilities tests passed\n')

  // Test 2: Pattern calculations with mock data
  console.log('Test 2: Pattern calculations with mock data')
  const mockSurahData = [
    { number: 1, verseCount: 7, name: "Al-Fatihah" },
    { number: 2, verseCount: 286, name: "Al-Baqarah" },
    { number: 3, verseCount: 200, name: "Ali 'Imran" },
    { number: 4, verseCount: 176, name: "An-Nisa" },
    { number: 5, verseCount: 120, name: "Al-Ma'idah" }
  ]

  const results = calculateNaturalPatterns(mockSurahData)
  console.assert(results.sumSurahNumbers === 15, 'Sum of surah numbers should be 15')
  console.assert(results.sumVerseCounts === 789, 'Sum of verse counts should be 789')
  console.assert(results.evenSurahs === 2, 'Even surahs should be 2')
  console.assert(results.oddSurahs === 3, 'Odd surahs should be 3')
  console.assert(results.primeVersesSum === 7, 'Prime verses sum should be 7')
  console.assert(results.nthPrimeSum === 17, 'Nth prime sum should be 17')
  console.log('✓ Pattern calculations tests passed\n')

  // Test 3: Pattern validation helpers
  console.log('Test 3: Pattern validation helpers')
  const { F, G } = calculatePattern3Values(mockSurahData)
  console.assert(F === 7, 'Pattern 3 F value should be 7')
  console.assert(G === 320, 'Pattern 3 G value should be 320')

  const { H, I, J, K } = calculatePattern4Counts(mockSurahData)
  console.assert(H === 2, 'Pattern 4 H value should be 2')
  console.assert(I === 0, 'Pattern 4 I value should be 0')
  console.assert(J === 2, 'Pattern 4 J value should be 2')
  console.assert(K === 1, 'Pattern 4 K value should be 1')

  const { Z, AA } = calculatePattern9Values(mockSurahData)
  console.assert(Z === 7, 'Pattern 9 Z value should be 7')
  console.assert(AA === 17, 'Pattern 9 AA value should be 17')
  console.log('✓ Pattern validation helpers tests passed\n')

  // Test 4: Full Quran data validation
  console.log('Test 4: Full Quran data validation')
  const fullResults = calculateNaturalPatterns(quranData)
  console.assert(fullResults.sumSurahNumbers === 6555, 'Full data sum surah numbers should be 6555')
  console.assert(fullResults.sumVerseCounts === 6236, 'Full data sum verse counts should be 6236')
  console.assert(fullResults.evenSurahs === 57, 'Full data even surahs should be 57')
  console.assert(fullResults.oddSurahs === 57, 'Full data odd surahs should be 57')

  const validation = validateNaturalPatterns(fullResults)
  console.assert(validation.pattern1 === true, 'Pattern 1 should be valid')
  console.assert(validation.pattern2 === true, 'Pattern 2 should be valid')
  console.assert(validation.pattern3 === true, 'Pattern 3 should be valid')
  console.assert(validation.pattern4 === true, 'Pattern 4 should be valid')
  console.assert(validation.pattern9 === true, 'Pattern 9 should be valid')
  console.assert(validation.pattern10 === true, 'Pattern 10 should be valid')

  const goldenRatioDetails = calculateGoldenRatioDetails(quranData)
  console.assert(goldenRatioDetails.repetitiveSum === 7906, 'Repetitive sum should be 7906')
  console.assert(goldenRatioDetails.nonRepetitiveSum === 4885, 'Non-repetitive sum should be 4885')
  console.log('✓ Full Quran data validation tests passed\n')

  console.log('All tests passed! 🎉')
}

runTests()