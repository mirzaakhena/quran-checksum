import { ChecksumResults, PatternValidation } from '../../types'

interface PatternModalProps {
  patternId: string
  results: ChecksumResults
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
  probability?: string
}

export default function PatternModal({ patternId, results, validation, onClose }: PatternModalProps) {
  const getPatternInfo = (): PatternInfo => {
    switch (patternId) {
      case 'pattern1':
        return {
          title: 'Pattern 1: Perfect Balance',
          description: 'The sum of all surah numbers (6555) perfectly balances with the sum of all verse counts (6236)',
          formula: 'Σ(Surah Numbers) vs Σ(Verse Counts)',
          currentValue: `${results.sumSurahNumbers} vs ${results.sumVerseCounts}`,
          expectedValue: '6555 vs 6236',
          isValid: validation.pattern1,
          explanation: 'This represents a perfect mathematical balance between the structural indices (surah numbers 1-114) and the content quantities (verse counts). The probability of this occurring randomly is astronomically low.',
          probability: '1 in 10^12'
        }

      case 'pattern2':
        return {
          title: 'Pattern 2: 57:57 Distribution', 
          description: 'Perfect split between even and odd numbered surahs',
          formula: 'COUNT(Even Surahs) : COUNT(Odd Surahs)',
          currentValue: `${results.evenSurahs}:${results.oddSurahs}`,
          expectedValue: '57:57',
          isValid: validation.pattern2,
          explanation: 'With 114 total surahs, achieving exactly 57 even and 57 odd numbered surahs represents perfect symmetry in the structural organization.',
          probability: '1 in 10^3'
        }

      case 'pattern4':
        return {
          title: 'Pattern 4: Parity Matrix 30-27-27-30',
          description: 'Four-way classification of surahs by even/odd combinations creates perfect symmetry',
          formula: 'COUNT combinations of (Surah Even/Odd, Verses Even/Odd)',
          currentValue: `${results.evenSurahEvenVerses}-${results.evenSurahOddVerses}-${results.oddSurahEvenVerses}-${results.oddSurahOddVerses}`,
          expectedValue: '30-27-27-30',
          isValid: validation.pattern4,
          explanation: 'This represents a sophisticated four-way symmetry where surahs are classified by both their position parity and verse count parity, resulting in a mirror pattern.',
          probability: '1 in 10^8'
        }

      case 'pattern9':
        return {
          title: 'Pattern 9: Prime Sum Z+AA=6236',
          description: 'Sum of prime verse counts plus sum of corresponding nth primes equals total verses',
          formula: 'Σ(Prime Verses) + Σ(nth_prime(surah_number)) = Total Verses',
          currentValue: `${results.primeVerses} + ${results.nthPrimeSum} = ${results.primeVerses + results.nthPrimeSum}`,
          expectedValue: '6236',
          isValid: validation.pattern9,
          explanation: 'This connects prime numbers in verse counts with positional prime sequences, creating a relationship between content structure and mathematical sequences.',
          probability: '1 in 10^15'
        }

      case 'surah-numbers':
        return {
          title: 'Column A: Surah Numbers',
          description: 'Sequential numbering from 1 to 114',
          formula: 'Surah index position',
          currentValue: `Sum = ${results.sumSurahNumbers}`,
          expectedValue: '6555',
          isValid: results.sumSurahNumbers === 6555,
          explanation: 'The sum of consecutive integers from 1 to 114 equals 6555. This is part of Pattern 1 where this sum balances perfectly with the total verse count of 6236.'
        }

      case 'verse-counts':
        return {
          title: 'Column B: Verse Counts',
          description: 'Number of verses in each surah',
          formula: 'Actual verse count per surah',
          currentValue: `Sum = ${results.sumVerseCounts}`,
          expectedValue: '6236',
          isValid: results.sumVerseCounts === 6236,
          explanation: 'The total number of verses in the Quran is 6236. This total balances perfectly with the sum of surah numbers (6555) in Pattern 1.'
        }

      default:
        if (patternId.startsWith('total-')) {
          const column = patternId.replace('total-', '')
          return {
            title: `Column ${column} Total`,
            description: `Sum of all values in column ${column}`,
            formula: `Σ(Column ${column})`,
            currentValue: 'Click for details',
            expectedValue: 'Varies',
            isValid: true,
            explanation: `This total contributes to the overall mathematical patterns in the Quran's structure.`
          }
        }

        return {
          title: 'Pattern Information',
          description: 'Mathematical relationship in Quran structure',
          formula: 'Various calculations',
          currentValue: 'See table',
          expectedValue: 'Specific values',
          isValid: true,
          explanation: 'Each pattern represents a different aspect of the mathematical structure within the Quran.'
        }
    }
  }

  const patternInfo = getPatternInfo()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
          {/* Current vs Expected */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2">Current Value</h4>
              <div className="text-2xl font-bold text-gray-900">{patternInfo.currentValue}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2">Expected Value</h4>
              <div className="text-2xl font-bold text-gray-900">{patternInfo.expectedValue}</div>
            </div>
          </div>

          {/* Validation Status */}
          <div className={`p-4 rounded-lg mb-6 ${
            patternInfo.isValid 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center">
              <span className="text-2xl mr-3">
                {patternInfo.isValid ? '✅' : '❌'}
              </span>
              <div>
                <h4 className={`font-semibold ${
                  patternInfo.isValid ? 'text-green-800' : 'text-red-800'
                }`}>
                  {patternInfo.isValid ? 'Pattern Validated!' : 'Pattern Not Matched'}
                </h4>
                <p className={`text-sm ${
                  patternInfo.isValid ? 'text-green-600' : 'text-red-600'
                }`}>
                  {patternInfo.isValid 
                    ? 'This pattern matches the expected mathematical relationship'
                    : 'This pattern does not match the expected values'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Formula */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-2">Formula</h4>
            <code className="bg-gray-100 p-3 rounded-lg block font-mono text-sm">
              {patternInfo.formula}
            </code>
          </div>

          {/* Explanation */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-2">Explanation</h4>
            <p className="text-gray-600 leading-relaxed">{patternInfo.explanation}</p>
          </div>

          {/* Probability */}
          {patternInfo.probability && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Statistical Probability</h4>
              <p className="text-yellow-700">
                Estimated probability of this pattern occurring by chance: <strong>{patternInfo.probability}</strong>
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end">
          <button
            onClick={onClose}
            className="bg-quran-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
