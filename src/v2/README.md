# Quran Checksum Explorer v2

Refactored version of the Quran Checksum Explorer with improved organization and maintainability.

## Structure

```
src/v2/
├── data/           # Quran data and constants
├── types/          # TypeScript interfaces and types
├── core/           # Core calculation and validation logic
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
8. **Removed Questionable Patterns**: Removed patterns 5, 6, 7, 8, 9 (arbitrary prime formula) and 10 (golden ratio with a loose tolerance)
9. **Frontend Integration**: Updated frontend components to use v2 code
10. **Code Cleanup**: Removed all legacy code dependencies

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

### Validation
- `validateNaturalPatterns(results: PatternResults): PatternValidation` - Validates natural patterns using only `results`
- `EXPECTED` / `EXPECTED_LABELS` - Target values for every pattern, shared by validators and UI
- `CORE_FACTS` / `checkCoreFacts(results)` - The two independent facts the four patterns reduce to

### Helpers
- `calculatePattern1Values(surahs: QuranSurah[])` - Helper for Pattern 1 & 2 (Columns D/E)
- `calculatePattern3Values(surahs: QuranSurah[])` - Helper for Pattern 3 validation
- `calculatePattern4Counts(surahs: QuranSurah[])` - Helper for Pattern 4 validation

## Test Results

All patterns validate correctly:
- Pattern 1 (Σ even A+B = 6236 = ΣB, Σ odd A+B = 6555 = ΣA): ✅ Valid
- Pattern 2 (57:57 split of even/odd A+B): ✅ Valid
- Pattern 3 (3303 symmetry): ✅ Valid
- Pattern 4 (30-27-30-27 parity, H-I-J-K): ✅ Valid

## Two Core Facts

The four patterns are not independent. They reduce to two facts (A = surah number, B = verse count, C = A+B):

- **Sum balance (Patterns 1 & 3): F = G**, where F = Σ(A where C is even) and G = Σ(B where C is odd).
  Σ(C where even) = Σ(A where C even) + Σ(B where C even), so it equals ΣB exactly when F = G.
  Σ(C where odd) = ΣA then follows, since both groups together always add up to ΣA + ΣB.
- **Parity balance (Patterns 2 & 4): H = J**, where H = COUNT(A even, B even) and J = COUNT(A odd, B even).
  C is even exactly when A and B share parity, so COUNT(C even) = H + K. With 57 odd surah numbers, J + K = 57,
  so the 57:57 split holds exactly when H = J. Pattern 4 adds the value H = 30; I and K follow from it.

`checkCoreFacts(results)` checks both facts directly.