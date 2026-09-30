import { PatternResults, PatternValidation } from '../../v2/types';
import { CORE_FACTS, EXPECTED_LABELS, checkCoreFacts, formatPattern1, formatPattern2, formatPattern4 } from '../../v2/core';

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

interface FactGroup {
  title: string;
  statement: string;
  holds: boolean;
  why: string;
  cards: PatternCard[];
}

export function CoreFacts({ results, validation }: CoreFactsProps) {
  const holds = checkCoreFacts(results);
  const F = results.chapterSumIfEvenTotal;
  const G = results.verseSumIfOddTotal;

  const groups: FactGroup[] = [
    {
      title: CORE_FACTS.sumBalance.title,
      statement: CORE_FACTS.sumBalance.statement,
      holds: holds.sumBalance,
      why: 'Pattern 1 and Pattern 3 are two views of this one fact. Σ(A+B where even) equals the total verse count exactly when F = G; the odd group then equals the sum of surah numbers automatically.',
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
      statement: CORE_FACTS.parityBalance.statement,
      holds: holds.parityBalance,
      why: 'Pattern 2 and Pattern 4 are two views of this one fact. A+B is even when A and B share parity, so the 57:57 split holds exactly when H = J; Pattern 4 adds the specific value H = 30, and I and K follow from it.',
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {groups.map((group) => (
        <section key={group.title} className="bg-white/60 rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Core Fact: {group.title} {group.holds ? '✅' : '❌'}
          </h2>
          <code className="block text-sm bg-gray-100 rounded px-2 py-1 mt-2">{group.statement}</code>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">{group.why}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {group.cards.map((card) => (
              <div key={card.name} className={`bg-white rounded-lg shadow-md p-4 border-l-4 flex flex-col ${card.borderClass}`}>
                <h3 className="font-bold text-lg text-gray-900">
                  {card.name}: <span className="tabular-nums">{card.value}</span>
                </h3>
                <p className="text-gray-600 text-sm mt-2">{card.formula}</p>
                <p className={`text-sm font-semibold mt-auto pt-3 ${card.valid ? 'text-green-600' : 'text-red-600'}`}>
                  {card.valid ? '✅ Validated' : `❌ Expected ${card.expected}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
