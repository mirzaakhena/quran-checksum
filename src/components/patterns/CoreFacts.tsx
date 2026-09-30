import { PatternResults, PatternValidation } from '../../v2/types';
import { CORE_FACTS, checkCoreFacts } from '../../v2/core';

interface CoreFactsProps {
  results: PatternResults;
  validation: PatternValidation;
}

interface FactRow {
  pattern: string;
  claim: string;
  value: string;
  valid: boolean;
}

interface Fact {
  title: string;
  statement: string;
  holds: boolean;
  headline: string;
  headlineLabel: string;
  rows: FactRow[];
  why: string;
}

const Check = ({ ok }: { ok: boolean }) => (
  <span className={ok ? 'text-green-600' : 'text-red-600'} aria-label={ok ? 'holds' : 'does not hold'}>
    {ok ? '✓' : '✗'}
  </span>
);

export function CoreFacts({ results, validation }: CoreFactsProps) {
  const holds = checkCoreFacts(results);
  const F = results.chapterSumIfEvenTotal;
  const G = results.verseSumIfOddTotal;
  const H = results.evenSurahEvenVerses;
  const I = results.evenSurahOddVerses;
  const J = results.oddSurahEvenVerses;
  const K = results.oddSurahOddVerses;

  const facts: Fact[] = [
    {
      title: CORE_FACTS.sumBalance.title,
      statement: 'Surah numbers where A+B is even add up to the same total as verse counts where A+B is odd.',
      holds: holds.sumBalance,
      headline: `${F} = ${G}`,
      headlineLabel: 'Pattern 3 · Σ column F = Σ column G',
      rows: [
        {
          pattern: 'Pattern 1',
          claim: 'Σ even A+B = all verses (D = B)',
          value: `${results.evenTotalSum} = ${results.sumVerseCounts}`,
          valid: validation.pattern1
        },
        {
          pattern: 'Pattern 1',
          claim: 'Σ odd A+B = Σ surah numbers (E = A)',
          value: `${results.oddTotalSum} = ${results.sumSurahNumbers}`,
          valid: validation.pattern1
        }
      ],
      why: 'Σ(A+B where even) is Σ(A where even) + Σ(B where even). That equals all verses exactly when Σ(A where even) = Σ(B where odd), which is F = G. The odd group then equals the sum of surah numbers automatically, because both groups together always add up to Σ A + Σ B.'
    },
    {
      title: CORE_FACTS.parityBalance.title,
      statement: 'As many even-numbered surahs have an even verse count as odd-numbered surahs do.',
      holds: holds.parityBalance,
      headline: `${H} = ${J}`,
      headlineLabel: 'Pattern 4 · count of column H = count of column J',
      rows: [
        {
          pattern: 'Pattern 4',
          claim: 'even-odd = odd-odd (I = K)',
          value: `${I} = ${K}`,
          valid: validation.pattern4
        },
        {
          pattern: 'Pattern 2',
          claim: 'surahs with even A+B : odd A+B',
          value: `${results.evenTotalCount} : ${results.oddTotalCount}`,
          valid: validation.pattern2
        }
      ],
      why: 'A+B is even exactly when A and B are both even (H) or both odd (K). There are always 57 odd surah numbers, so J + K = 57, and the 57 : 57 split holds exactly when H = J. With 57 even surah numbers as well, I = K follows too.'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {facts.map((fact) => (
        <section key={fact.title} className="bg-white rounded-lg shadow-md p-5 flex flex-col">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-gray-900">{fact.title}</h2>
            <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${
              fact.holds ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {fact.holds ? '✓ Holds' : '✗ Does not hold'}
            </span>
          </div>
          <p className="text-gray-600 mt-2">{fact.statement}</p>

          <div className="my-5 text-center">
            <div className="text-4xl font-bold text-gray-900 tabular-nums">{fact.headline}</div>
            <div className="text-sm text-gray-500 mt-1">{fact.headlineLabel}</div>
          </div>

          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Which also gives</div>
          <ul className="divide-y border rounded-md text-sm">
            {fact.rows.map((row) => (
              <li key={row.claim} className="flex flex-wrap items-center gap-x-3 gap-y-0.5 px-3 py-2">
                <span className="font-semibold text-gray-700 whitespace-nowrap">{row.pattern}</span>
                {/* On narrow screens the claim drops to its own line below the value */}
                <span className="text-gray-600 order-last basis-full sm:order-none sm:basis-auto sm:flex-1">{row.claim}</span>
                <span className="font-mono tabular-nums text-gray-900 whitespace-nowrap ml-auto sm:ml-0">{row.value}</span>
                <Check ok={row.valid} />
              </li>
            ))}
          </ul>

          <details className="mt-4 text-sm text-gray-600">
            <summary className="cursor-pointer text-quran-blue font-medium">Why is this one fact, not several?</summary>
            <p className="mt-2 leading-relaxed">{fact.why}</p>
          </details>
        </section>
      ))}
    </div>
  );
}
