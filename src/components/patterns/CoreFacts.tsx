import { PatternResults, PatternValidation } from '../../v2/types';
import { EXPECTED_LABELS, formatPattern1, formatPattern2, formatPattern4 } from '../../v2/core';
import { useT } from '../../i18n/LanguageContext';

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
  const t = useT();
  const c = t.coreFacts;
  const F = results.chapterSumIfEvenTotal;
  const G = results.verseSumIfOddTotal;

  const groups: { title: string; cards: PatternCard[] }[] = [
    {
      title: c.sumBalance,
      cards: [
        {
          name: c.pattern(1),
          value: formatPattern1(results.evenTotalSum, results.oddTotalSum).replace('/', ' / '),
          expected: EXPECTED_LABELS.pattern1,
          formula: c.formula1,
          valid: validation.pattern1,
          borderClass: 'border-pattern-1-even'
        },
        {
          name: c.pattern(3),
          value: F === G ? String(F) : `${F} / ${G}`,
          expected: EXPECTED_LABELS.pattern3,
          formula: c.formula3,
          valid: validation.pattern3,
          borderClass: 'border-pattern-3-highlight'
        }
      ]
    },
    {
      title: c.parityBalance,
      cards: [
        {
          name: c.pattern(2),
          value: formatPattern2(results.evenTotalCount, results.oddTotalCount).replace(':', ' : '),
          expected: EXPECTED_LABELS.pattern2,
          formula: c.formula2,
          valid: validation.pattern2,
          borderClass: 'border-pattern-1-odd'
        },
        {
          name: c.pattern(4),
          value: formatPattern4(results.evenSurahEvenVerses, results.evenSurahOddVerses, results.oddSurahEvenVerses, results.oddSurahOddVerses),
          expected: EXPECTED_LABELS.pattern4,
          formula: c.formula4,
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
                  <p className="text-sm font-semibold text-red-600 mt-1">{c.expected(card.expected)}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
