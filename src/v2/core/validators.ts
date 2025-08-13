// Pattern validation functions
import { PatternResults, PatternValidation } from '../types'
import { calculatePattern3Values, calculatePattern4Counts, calculatePattern9Values } from './calculations'
import { quranData } from '../data'

// Validate natural patterns
export function validateNaturalPatterns(results: PatternResults, surahs = quranData): PatternValidation {
  // Calculate Pattern 3 values (F and G)
  const pattern3Values = calculatePattern3Values(surahs)
  
  // Calculate Pattern 4 counts (H, I, J, K)
  const pattern4Counts = calculatePattern4Counts(surahs)
  
  // Calculate Pattern 9 values (Z and AA)
  const pattern9Values = calculatePattern9Values(surahs)
  
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

// Get pattern summary for UI display
export function getPatternSummary(results: PatternResults, validation: PatternValidation) {
  // Calculate Pattern 3 value for summary
  const pattern3Value = results.sumSurahNumbers - results.sumVerseCounts + results.evenSurahs - results.oddSurahs
  
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
      value: pattern3Value,
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
      value: results.primeVersesSum + results.nthPrimeSum,
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