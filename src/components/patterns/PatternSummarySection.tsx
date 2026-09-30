import PatternSummaryCard from './PatternSummaryCard';
import { PatternResults, PatternValidation } from '../../v2/types';
import { CORE_FACTS, EXPECTED_LABELS, checkCoreFacts, formatPattern1, formatPattern2, formatPattern4 } from '../../v2/core';

interface PatternSummarySectionProps {
  results: PatternResults;
  validation: PatternValidation;
}

export function PatternSummarySection({ results, validation }: PatternSummarySectionProps) {
  const facts = checkCoreFacts(results);
  const F = results.chapterSumIfEvenTotal;
  const G = results.verseSumIfOddTotal;

  const factGroups = [
    {
      ...CORE_FACTS.sumBalance,
      holds: facts.sumBalance,
      current: `F = ${F}, G = ${G}`,
      why: 'Pattern 1 and Pattern 3 are two views of this one fact. Σ(A+B where even) equals the total verse count exactly when F = G; the odd group then equals the sum of surah numbers automatically.',
      cards: [
        {
          title: "Pattern 1: 6236 / 6555",
          formula: "Σ(A+B even) = Σ verses, Σ(A+B odd) = Σ surah numbers",
          value: formatPattern1(results.evenTotalSum, results.oddTotalSum),
          expected: EXPECTED_LABELS.pattern1,
          isValid: validation.pattern1,
          className: "border-l-4 border-pattern-1-even"
        },
        {
          title: "Pattern 3: 3303",
          formula: "F = Σ(A where A+B even), G = Σ(B where A+B odd)",
          value: F === G ? String(F) : `${F}/${G}`,
          expected: EXPECTED_LABELS.pattern3,
          isValid: validation.pattern3,
          className: "border-l-4 border-pattern-3-highlight"
        }
      ]
    },
    {
      ...CORE_FACTS.parityBalance,
      holds: facts.parityBalance,
      current: `H = ${results.evenSurahEvenVerses}, J = ${results.oddSurahEvenVerses}`,
      why: 'Pattern 2 and Pattern 4 are two views of this one fact. A+B is even when A and B share parity, so the 57:57 split holds exactly when H = J; Pattern 4 adds the specific value H = 30, and I and K follow from it.',
      cards: [
        {
          title: "Pattern 2: 57 : 57",
          formula: "Surahs with even (A+B) : odd (A+B)",
          value: formatPattern2(results.evenTotalCount, results.oddTotalCount),
          expected: EXPECTED_LABELS.pattern2,
          isValid: validation.pattern2,
          className: "border-l-4 border-pattern-1-odd"
        },
        {
          title: "Pattern 4: 30-27-30-27",
          formula: "COUNT of H (even-even), I (even-odd), J (odd-even), K (odd-odd)",
          value: formatPattern4(results.evenSurahEvenVerses, results.evenSurahOddVerses, results.oddSurahEvenVerses, results.oddSurahOddVerses),
          expected: EXPECTED_LABELS.pattern4,
          isValid: validation.pattern4,
          className: "border-l-4 border-pattern-4-combo1"
        }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {factGroups.map((group) => (
        <section key={group.title} className="bg-white/60 rounded-lg p-4 shadow-sm">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              Core Fact: {group.title} {group.holds ? '✅' : '❌'}
            </h3>
            <code className="block text-sm bg-gray-100 rounded px-2 py-1 mt-2">{group.statement}</code>
            <p className="text-sm text-gray-600 mt-2">{group.current}</p>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{group.why}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {group.cards.map((card) => (
              <PatternSummaryCard
                key={card.title}
                title={card.title}
                formula={card.formula}
                value={card.value}
                expected={card.expected}
                isValid={card.isValid}
                className={card.className}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
