# Quran Checksum Explorer v2

Refactored version of the Quran Checksum Explorer with improved organization and maintainability.

## Structure

```
src/v2/
├── data/           # Quran data and constants
├── types/          # TypeScript interfaces and types
├── core/           # Core calculation and validation logic
├── utils/          # Utility functions
└── index.ts        # Main entry point
```

## Improvements

1. **Better Organization**: Clear separation of concerns between data, types, core logic, and utilities
2. **Reduced Redundancy**: Eliminated duplicate functions
3. **Consistent Naming**: Improved function and variable names
4. **Modular Design**: Each module has a single responsibility
5. **Type Safety**: Comprehensive TypeScript interfaces
6. **Correct Imports**: Fixed all import paths
7. **Cleaner Code**: Removed unused variables and functions
8. **Removed Questionable Patterns**: Removed patterns 5, 6, 7, and 8 as requested

## Usage

```typescript
import { quranData, calculateNaturalPatterns, validateNaturalPatterns } from './v2'

// Calculate patterns
const results = calculateNaturalPatterns(quranData)

// Validate patterns
const validation = validateNaturalPatterns(results)

console.log('Pattern calculation results:', results)
console.log('Pattern validation results:', validation)
```

## Key Functions

### Core Calculations
- `calculateNaturalPatterns(surahs: QuranSurah[]): PatternResults` - Calculates all natural patterns
- `calculateGoldenRatioDetails(surahs: QuranSurah[]): GoldenRatioDetails` - Detailed Golden Ratio analysis

### Validation
- `validateNaturalPatterns(results: PatternResults, surahs = quranData): PatternValidation` - Validates natural patterns

### Utilities
- `isPrime(n: number): boolean` - Checks if a number is prime
- `getNthPrime(n: number): number` - Gets the nth prime number
- `calculatePattern3Values(surahs: QuranSurah[])` - Helper for Pattern 3 validation
- `calculatePattern4Counts(surahs: QuranSurah[])` - Helper for Pattern 4 validation
- `calculatePattern9Values(surahs: QuranSurah[])` - Helper for Pattern 9 validation

## Test Results

All patterns validate correctly:
- Pattern 1 (6555/6236 balance): ✅ Valid
- Pattern 2 (57:57 distribution): ✅ Valid
- Pattern 3 (3303 symmetry): ✅ Valid
- Pattern 4 (30-27-27-30 parity): ✅ Valid
- Pattern 9 (6236 prime sum): ✅ Valid
- Pattern 10 (Golden Ratio φ): ✅ Valid

The refactored code maintains full compatibility with the original functionality while providing a cleaner, more maintainable structure. Questionable patterns 5, 6, 7, and 8 have been removed as requested.