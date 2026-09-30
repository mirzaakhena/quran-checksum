import { useEffect } from 'react'
import { PatternResults, PatternValidation } from '../../v2/types'
import { CORE_FACTS, EXPECTED, EXPECTED_LABELS, formatPattern1, formatPattern2, formatPattern4 } from '../../v2/core'

interface PatternModalProps {
  patternId: string
  results: PatternResults
  validation: PatternValidation
  onClose: () => void
}

interface PatternInfo {
  title: string
  description: string
  formula: string
  currentValue: string | number
  expectedValue: string | number
  isValid: boolean
  explanation: string
}

export default function PatternModal({ patternId, results, validation, onClose }: PatternModalProps) {
  const F = results.chapterSumIfEvenTotal
  const G = results.verseSumIfOddTotal
  const H = results.evenSurahEvenVerses
  const J = results.oddSurahEvenVerses

  const getPatternInfo = (): PatternInfo => {
    switch (patternId) {
      case 'pattern1':
        return {
          title: 'Pattern 1: Perfect Balance',
          description: 'Splitting A+B by parity: the even group sums to the total verse count (6236) and the odd group sums to the sum of surah numbers (6555)',
          formula: 'Σ(A+B where even) = Σ(Verse Counts), Σ(A+B where odd) = Σ(Surah Numbers)',
          currentValue: formatPattern1(results.evenTotalSum, results.oddTotalSum),
          expectedValue: EXPECTED_LABELS.pattern1,
          isValid: validation.pattern1,
          explanation: `Core fact "${CORE_FACTS.sumBalance.title}". Σ(A+B where even) is Σ(A where even) + Σ(B where even), so it equals the total verse count exactly when Σ(A where A+B even) = Σ(B where A+B odd), which is F = G in Pattern 3 (currently F = ${F}, G = ${G}). The odd group then equals 6555 automatically, because the two groups together always add up to 6555 + 6236.`
        }

      case 'pattern2':
        return {
          title: 'Pattern 2: 57:57 Distribution', 
          description: 'Perfect split between surahs whose A+B is even and surahs whose A+B is odd',
          formula: 'COUNT(A+B even) : COUNT(A+B odd)',
          currentValue: formatPattern2(results.evenTotalCount, results.oddTotalCount),
          expectedValue: EXPECTED_LABELS.pattern2,
          isValid: validation.pattern2,
          explanation: `Core fact "${CORE_FACTS.parityBalance.title}". A+B is even exactly when A and B are both even (H) or both odd (K). Since there are always 57 odd surah numbers (J + K = 57), the 57:57 split holds exactly when H = J (currently H = ${H}, J = ${J}).`
        }

      case 'pattern3':
        return {
          title: 'Pattern 3: 3303 Symmetry',
          description: 'Surah numbers where A+B is even add up to the same total as verse counts where A+B is odd',
          formula: 'F = Σ(A where A+B even), G = Σ(B where A+B odd), F = G',
          currentValue: F === G ? String(F) : `${F}/${G}`,
          expectedValue: EXPECTED_LABELS.pattern3,
          isValid: validation.pattern3,
          explanation: `Core fact "${CORE_FACTS.sumBalance.title}". F = G is the same statement as Pattern 1; this pattern adds only the specific value 3303.`
        }

      case 'pattern4':
        return {
          title: `Pattern 4: Parity Matrix ${EXPECTED_LABELS.pattern4}`,
          description: 'Four-way classification of surahs by the parity of the surah number and of the verse count',
          formula: 'COUNT of H (even-even) - I (even-odd) - J (odd-even) - K (odd-odd)',
          currentValue: formatPattern4(H, results.evenSurahOddVerses, J, results.oddSurahOddVerses),
          expectedValue: EXPECTED_LABELS.pattern4,
          isValid: validation.pattern4,
          explanation: `Core fact "${CORE_FACTS.parityBalance.title}". There are always 57 even and 57 odd surah numbers, so H + I = 57 and J + K = 57: once H and J are known, I and K follow. The symmetry H = J is the same statement as Pattern 2; this pattern adds only the specific value H = J = 30 (60 surahs with an even verse count).`
        }

      case 'surah-numbers':
        return {
          title: 'Column A: Surah Numbers',
          description: 'Sequential numbering from 1 to 114',
          formula: 'Surah index position',
          currentValue: `Sum = ${results.sumSurahNumbers}`,
          expectedValue: String(EXPECTED.sumSurahNumbers),
          isValid: results.sumSurahNumbers === EXPECTED.sumSurahNumbers,
          explanation: 'The sum of consecutive integers from 1 to 114 always equals 6555. In Pattern 1, this is exactly the sum of A+B over the surahs whose A+B is odd.'
        }

      case 'verse-counts':
        return {
          title: 'Column B: Verse Counts',
          description: 'Number of verses in each surah',
          formula: 'Actual verse count per surah',
          currentValue: `Sum = ${results.sumVerseCounts}`,
          expectedValue: String(EXPECTED.sumVerseCounts),
          isValid: results.sumVerseCounts === EXPECTED.sumVerseCounts,
          explanation: 'The total number of verses in the Quran is 6236 (Kufan count). In Pattern 1, this is exactly the sum of A+B over the surahs whose A+B is even.'
        }

      default:
        return {
          title: 'Pattern Information',
          description: 'Mathematical relationship in Quran structure',
          formula: 'Various calculations',
          currentValue: 'See table',
          expectedValue: 'Specific values',
          isValid: true,
          explanation: 'Click a column header or a total to see the pattern it belongs to.'
        }
    }
  }

  const patternInfo = getPatternInfo()

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-quran-blue to-indigo-600 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold mb-2">{patternInfo.title}</h3>
              <p className="text-blue-100">{patternInfo.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold ml-4"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Value and status */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="text-3xl font-bold text-gray-900 tabular-nums">{patternInfo.currentValue}</div>
            <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${
              patternInfo.isValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {patternInfo.isValid ? '✓ Holds' : `✗ Expected ${patternInfo.expectedValue}`}
            </span>
          </div>

          {/* Formula */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-2">Formula</h4>
            <code className="bg-gray-100 p-3 rounded-lg block font-mono text-sm">
              {patternInfo.formula}
            </code>
          </div>

          {/* Explanation */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Explanation</h4>
            <p className="text-gray-600 leading-relaxed">{patternInfo.explanation}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
