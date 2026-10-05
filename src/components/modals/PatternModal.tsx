import { useEffect } from 'react'
import { PatternResults, PatternValidation } from '../../v2/types'
import { EXPECTED, EXPECTED_LABELS, formatPattern1, formatPattern2, formatPattern4 } from '../../v2/core'
import { useT } from '../../i18n/LanguageContext'

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
  const t = useT()
  const F = results.chapterSumIfEvenTotal
  const G = results.verseSumIfOddTotal
  const H = results.evenSurahEvenVerses
  const J = results.oddSurahEvenVerses

  const getPatternInfo = (): PatternInfo => {
    const m = t.modal
    const values = { F, G, H, J }
    switch (patternId) {
      case 'pattern1':
        return {
          ...m.pattern1,
          currentValue: formatPattern1(results.evenTotalSum, results.oddTotalSum),
          expectedValue: EXPECTED_LABELS.pattern1,
          isValid: validation.pattern1,
          explanation: m.pattern1Explanation(t.coreFacts.sumBalance, values)
        }

      case 'pattern2':
        return {
          ...m.pattern2,
          currentValue: formatPattern2(results.evenTotalCount, results.oddTotalCount),
          expectedValue: EXPECTED_LABELS.pattern2,
          isValid: validation.pattern2,
          explanation: m.pattern2Explanation(t.coreFacts.parityBalance, values)
        }

      case 'pattern3':
        return {
          ...m.pattern3,
          currentValue: F === G ? String(F) : `${F}/${G}`,
          expectedValue: EXPECTED_LABELS.pattern3,
          isValid: validation.pattern3,
          explanation: m.pattern3Explanation(t.coreFacts.sumBalance)
        }

      case 'pattern4':
        return {
          ...m.pattern4,
          title: `${m.pattern4.title} ${EXPECTED_LABELS.pattern4}`,
          currentValue: formatPattern4(H, results.evenSurahOddVerses, J, results.oddSurahOddVerses),
          expectedValue: EXPECTED_LABELS.pattern4,
          isValid: validation.pattern4,
          explanation: m.pattern4Explanation(t.coreFacts.parityBalance)
        }

      case 'surah-numbers':
        return {
          ...m.surahNumbers,
          currentValue: m.sum(results.sumSurahNumbers),
          expectedValue: String(EXPECTED.sumSurahNumbers),
          isValid: results.sumSurahNumbers === EXPECTED.sumSurahNumbers,
          explanation: m.surahNumbersExplanation
        }

      case 'verse-counts':
        return {
          ...m.verseCounts,
          currentValue: m.sum(results.sumVerseCounts),
          expectedValue: String(EXPECTED.sumVerseCounts),
          isValid: results.sumVerseCounts === EXPECTED.sumVerseCounts,
          explanation: m.verseCountsExplanation
        }

      default:
        return {
          ...m.fallback,
          currentValue: m.fallbackValue,
          expectedValue: m.fallbackExpected,
          isValid: true,
          explanation: m.fallbackExplanation
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
              aria-label={t.modal.close}
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
              {patternInfo.isValid ? t.modal.holds : t.modal.expected(patternInfo.expectedValue)}
            </span>
          </div>

          {/* Formula */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-2">{t.modal.formula}</h4>
            <code className="bg-gray-100 p-3 rounded-lg block font-mono text-sm">
              {patternInfo.formula}
            </code>
          </div>

          {/* Explanation */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">{t.modal.explanation}</h4>
            <p className="text-gray-600 leading-relaxed">{patternInfo.explanation}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
