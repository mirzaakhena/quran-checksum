// Core data types for the Quran Checksum Explorer

export interface QuranSurah {
  number: number;
  verseCount: number;
  name?: string;
}

// Pattern calculation results
export interface PatternResults {
  // Basic sums (Σ Column A, Σ Column B)
  sumSurahNumbers: number;
  sumVerseCounts: number;

  // Pattern 1 & 2 - Column C (A+B) split by parity (Columns D and E)
  evenTotalSum: number;    // Σ D: sum of C where C is even
  oddTotalSum: number;     // Σ E: sum of C where C is odd
  evenTotalCount: number;  // count of surahs where C is even
  oddTotalCount: number;   // count of surahs where C is odd

  // Pattern 3 - Conditional sums (Columns F and G)
  chapterSumIfEvenTotal: number;  // Σ F: A where C is even
  verseSumIfOddTotal: number;     // Σ G: B where C is odd

  // Pattern 4 - Parity combinations (Columns H, I, J, K)
  evenSurahEvenVerses: number;
  evenSurahOddVerses: number;
  oddSurahEvenVerses: number;
  oddSurahOddVerses: number;
}

// Pattern validation results
// Patterns 1 & 3 express the same fact (F = G), as do patterns 2 & 4 (H = J);
// see CORE_FACTS in core/validators.ts.
export interface PatternValidation {
  pattern1: boolean; // Σ(C even)=6236=ΣB, Σ(C odd)=6555=ΣA
  pattern2: boolean; // 57:57 distribution of C parity
  pattern3: boolean; // 3303 symmetry
  pattern4: boolean; // 30-27-30-27 parity (H-I-J-K)
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