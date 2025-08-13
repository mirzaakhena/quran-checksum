import { useMemo } from 'react';
import { quranData } from '../v2/data';
import { 
  calculateNaturalPatterns, 
  validateNaturalPatterns,
  calculateGoldenRatioDetails,
  calculatePattern3Values,
  calculatePattern4Counts,
  calculatePattern9Values
} from '../v2/core';

export function useQuranPatterns() {
  const results = useMemo(() => calculateNaturalPatterns(quranData), []);
  const validation = useMemo(() => validateNaturalPatterns(results), [results]);
  const goldenRatioDetails = useMemo(() => calculateGoldenRatioDetails(quranData), []);
  const pattern3Values = useMemo(() => calculatePattern3Values(quranData), []);
  const pattern4Counts = useMemo(() => calculatePattern4Counts(quranData), []);
  const pattern9Values = useMemo(() => calculatePattern9Values(quranData), []);

  return {
    results,
    validation,
    goldenRatioDetails,
    pattern3Values,
    pattern4Counts,
    pattern9Values
  };
}