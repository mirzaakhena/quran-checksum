import { PatternResults, PatternValidation } from '../../v2/types';
import { CORE_FACTS, EXPECTED_LABELS, formatPattern1, formatPattern2, formatPattern4 } from '../../v2/core';

interface CoreFactsProps {
  results: PatternResults;
  validation: PatternValidation;
}

interface PatternCard {
  name: string;
  value: string;
  expected: string;
  formula: string;
  valid: boolean;
  borderClass: string;
}

export function CoreFacts({ results, validation }: CoreFactsProps) {
  const F = results.chapterSumIfEvenTotal;
  const G = results.verseSumIfOddTotal;

  const groups: { title: string; cards: PatternCard[] }[] = [
    {
      title: CORE_FACTS.sumBalance.title,
      cards: [
        {
          name: 'Pattern 1',
          value: formatPattern1(results.evenTotalSum, results.oddTotalSum).replace('/', ' / '),
          expected: EXPECTED_LABELS.pattern1,
          formula: 'Σ(A+B even) = Σ verses, Σ(A+B odd) = Σ surah numbers',
          valid: validation.pattern1,
          borderClass: 'border-pattern-1-even'
        },
        {
          name: 'Pattern 3',
          value: F === G ? String(F) : `${F} / ${G}`,
          expected: EXPECTED_LABELS.pattern3,
          formula: 'F = Σ(A where A+B even), G = Σ(B where A+B odd)',
          valid: validation.pattern3,
          borderClass: 'border-pattern-3-highlight'
        }
      ]
    },
    {
      title: CORE_FACTS.parityBalance.title,
      cards: [
        {
          name: 'Pattern 2',
          value: formatPattern2(results.evenTotalCount, results.oddTotalCount).replace(':', ' : '),
          expected: EXPECTED_LABELS.pattern2,
          formula: 'Surahs with even (A+B) : odd (A+B)',
          valid: validation.pattern2,
          borderClass: 'border-pattern-1-odd'
        },
        {
          name: 'Pattern 4',
          value: formatPattern4(results.evenSurahEvenVerses, results.evenSurahOddVerses, results.oddSurahEvenVerses, results.oddSurahOddVerses),
          expected: EXPECTED_LABELS.pattern4,
          formula: 'COUNT of H (even-even), I (even-odd), J (odd-even), K (odd-odd)',
          valid: validation.pattern4,
          borderClass: 'border-pattern-4-combo1'
        }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {groups.map((group) => (
        <section key={group.title} className="bg-white/60 rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">{group.title}</h2>
          <div className="space-y-3 mt-3">
            {group.cards.map((card) => (
              <div key={card.name} className={`bg-white rounded-lg shadow-md px-4 py-3 border-l-4 ${card.borderClass}`}>
                <h3 className="font-bold text-lg text-gray-900">
                  {card.name}: <span className="tabular-nums">{card.value}</span>
                </h3>
                {/* Kept on one line on wide screens; allowed to wrap on narrow ones */}
                <p className="text-gray-600 text-sm mt-1 md:whitespace-nowrap">{card.formula}</p>
                {!card.valid && (
                  <p className="text-sm font-semibold text-red-600 mt-1">❌ Expected {card.expected}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
