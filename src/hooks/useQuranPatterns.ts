import { useMemo } from 'react';
import { quranData } from '../v2/data';
import { 
  calculateNaturalPatterns, 
  validateNaturalPatterns
} from '../v2/core';

export function useQuranPatterns() {
  const results = useMemo(() => calculateNaturalPatterns(quranData), []);
  const validation = useMemo(() => validateNaturalPatterns(results), [results]);

  return {
    results,
    validation
  };
}