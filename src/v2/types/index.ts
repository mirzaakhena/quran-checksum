// Core data types for the Quran Checksum Explorer

export interface QuranSurah {
  number: number;
  verseCount: number;
  name?: string;
}

// Pattern calculation results
export interface PatternResults {
  // Basic sums
  sumSurahNumbers: number;
  sumVerseCounts: number;
  
  // Even/odd classification counts
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
  primeVersesSum: number;
  nthPrimeSum: number;
  
  // Pattern 10 - Golden ratio
  goldenRatio: number;
  repetitiveSum: number;
  nonRepetitiveSum: number;
  repetitiveCount: number;
  nonRepetitiveCount: number;
}

// Detailed breakdown for Pattern 10
export interface GoldenRatioDetails {
  repetitiveValues: number[];  // List of Column C values (A+B) that appear more than once
  nonRepetitiveValues: number[];  // List of Column C values (A+B) that appear only once
  repetitiveSum: number;  // Sum of all repetitive Column C values
  nonRepetitiveSum: number;  // Sum of all non-repetitive Column C values
  repetitiveCount: number;  // Total count of repetitive occurrences
  nonRepetitiveCount: number;  // Count of non-repetitive Column C values
  goldenRatio: number;  // repetitiveSum / nonRepetitiveSum
  columnCFrequency: Map<number, number>;  // Map of Column C value to frequency
  repetitiveBreakdown: RepetitiveValueBreakdown[];  // Detailed breakdown of repetitive values
  nonRepetitiveBreakdown: NonRepetitiveValueBreakdown[];  // Detailed breakdown of non-repetitive values
}

// Detailed breakdown for each repetitive value
export interface RepetitiveValueBreakdown {
  columnCValue: number;  // The Column C value (A+B)
  frequency: number;     // How many times it appears
  surahs: number[];      // Which surahs have this value
}

// Detailed breakdown for each non-repetitive value
export interface NonRepetitiveValueBreakdown {
  columnCValue: number;  // The Column C value (A+B)
  surah: number;         // Which surah has this value
}

// Pattern validation results
export interface PatternValidation {
  pattern1: boolean; // 6555/6236 balance
  pattern2: boolean; // 57:57 distribution
  pattern3: boolean; // 3303 symmetry
  pattern4: boolean; // 30-27-27-30 parity
  pattern9: boolean; // Z+AA=6236
  pattern10: boolean; // φ ≈ 1.618424
}

// Questionable pattern results
export interface QuestionablePatternResults {
  // Pattern 5: Even verse split 27-33
  pattern5FirstGroup: number;
  pattern5SecondGroup: number;
  
  // Pattern 6: Complex symmetry with reverse order
  pattern6Group1: number;
  pattern6Group2: number;
  pattern6Group3: number;
  pattern6Group4: number;
  pattern6Reverse1: number;
  pattern6Reverse2: number;
  pattern6Reverse3: number;
  pattern6Reverse4: number;
  
  // Pattern 7: Prime vs non-prime verses
  pattern7PrimeSum: number;
  pattern7NonPrimeSum: number;
  
  // Pattern 8: Prime chapters vs multiples of 19
  pattern8PrimeChaptersSum: number;
  pattern8Multiple19Sum: number;
}

// Questionable pattern validation
export interface QuestionablePatternValidation {
  pattern5: boolean;
  pattern6: boolean; 
  pattern7: boolean;
  pattern8: boolean;
}

// Game state for challenge mode
export interface GameState {
  difficulty: 'beginner' | 'intermediate' | 'expert';
  surahCount: number;
  verseCounts: number[];
  attempts: number;
  successes: number;
  currentResults: PatternResults | null;
  validation: PatternValidation;
}

// Pattern information for UI
export interface PatternInfo {
  id: string;
  name: string;
  description: string;
  formula: string;
  expectedValue: number | string;
  category: 'natural' | 'questionable' | 'suspicious';
  riskLevel: 'low' | 'medium' | 'high';
}