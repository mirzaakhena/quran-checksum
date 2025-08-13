import PatternSummaryCard from './PatternSummaryCard';
import { PatternResults, PatternValidation } from '../../v2/types';

interface PatternSummarySectionProps {
  results: PatternResults;
  validation: PatternValidation;
}

export function PatternSummarySection({ results, validation }: PatternSummarySectionProps) {
  const patternCards = [
    {
      title: "Pattern 6555-6236",
      formula: "perfect balance distribution",
      value: `${results.sumSurahNumbers} / ${results.sumVerseCounts}`,
      expected: "6555 / 6236",
      isValid: validation.pattern1,
      className: "border-l-4 border-pattern-1-even"
    },
    {
      title: "Pattern 57:57",
      formula: "Perfect even/odd split distribution",
      value: `${results.evenSurahs} : ${results.oddSurahs}`,
      expected: "57 : 57",
      isValid: validation.pattern2,
      className: "border-l-4 border-pattern-1-odd"
    },
    {
      title: "Pattern 3303",
      formula: "Conditional symmetry pattern",
      value: validation.pattern3 ? '3303' : 'Calculating...',
      expected: "3303",
      isValid: validation.pattern3,
      className: "border-l-4 border-pattern-3-highlight"
    },
    {
      title: "Pattern 30-27",
      formula: "Even Odd Parity Matrix combinations",
      value: `${results.evenSurahEvenVerses}-${results.evenSurahOddVerses}-${results.oddSurahEvenVerses}-${results.oddSurahOddVerses}`,
      expected: "30-27-27-30",
      isValid: validation.pattern4,
      className: "border-l-4 border-pattern-4-combo1"
    },
    {
      title: "Pattern Prime Sum",
      formula: "1076+5160=6236 relationship",
      value: results.primeVersesSum + results.nthPrimeSum,
      expected: "6236",
      isValid: validation.pattern9,
      className: "border-l-4 border-pattern-9-prime"
    },
    {
      title: "Pattern Golden Ratio",
      formula: "φ ≈ 1.618424 emergence",
      value: `φ = ${results.goldenRatio.toFixed(6)}`,
      expected: "1.618424",
      isValid: validation.pattern10,
      className: "border-l-4 border-pattern-10-repetitive"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {patternCards.map((card, index) => (
        <PatternSummaryCard
          key={index}
          title={card.title}
          formula={card.formula}
          value={card.value}
          expected={card.expected}
          isValid={card.isValid}
          className={card.className}
        />
      ))}
    </div>
  );
}