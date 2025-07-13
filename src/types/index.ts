// Core data types for the Quran Checksum Explorer

export interface QuranSurah {
  number: number;
  verseCount: number;
  name?: string;
}

export interface ChecksumResults {
  // Pattern 1-4 core calculations
  sumSurahNumbers: number;
  sumVerseCounts: number;
  evenSurahs: number;
  oddSurahs: number;
  evenVerses: number;
  oddVerses: number;
  
  // Pattern combinations
  evenSurahEvenVerses: number;
  evenSurahOddVerses: number;
  oddSurahEvenVerses: number;
  oddSurahOddVerses: number;
  
  // Pattern 9 - Prime calculations
  primeVerses: number;
  nthPrimeSum: number;
  
  // Pattern 10 - Golden ratio
  goldenRatio: number;
  repetitiveCount: number;
  nonRepetitiveCount: number;
}

export interface PatternValidation {
  pattern1: boolean; // 6555/6236 balance
  pattern2: boolean; // 57:57 distribution
  pattern3: boolean; // 3303 symmetry
  pattern4: boolean; // 30-27-27-30 parity
  pattern9: boolean; // Z+AA=6236
  pattern10: boolean; // φ ≈ 1.618424
}

export interface GameState {
  difficulty: 'beginner' | 'intermediate' | 'expert';
  surahCount: number;
  verseCounts: number[];
  attempts: number;
  successes: number;
  currentResults: ChecksumResults | null;
  validation: PatternValidation;
}

export interface PatternInfo {
  id: string;
  name: string;
  description: string;
  formula: string;
  expectedValue: number | string;
  category: 'natural' | 'questionable' | 'suspicious';
  riskLevel: 'low' | 'medium' | 'high';
}
