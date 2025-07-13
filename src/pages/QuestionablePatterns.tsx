import { useMemo, useState } from 'react'
import { quranData } from '../data/quran'
import { calculateQuestionablePatterns, QuestionableResults } from '../utils/questionableCalculations'

interface PatternCard {
  id: string
  title: string
  description: string
  category: 'questionable' | 'suspicious'
  riskLevel: number
  concerns: string[]
  value: string | number
  expectedValue: string | number
  isValid: boolean
}

export default function QuestionablePatterns() {
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null)
  
  // Calculate questionable patterns
  const results = useMemo(() => calculateQuestionablePatterns(quranData), [])

  const patterns: PatternCard[] = [
    {
      id: 'pattern5',
      title: 'Pattern 5: 2690 Balance',
      description: 'Split 60 even-verse surahs at position 27/33',
      category: 'questionable',
      riskLevel: 2,
      concerns: [
        'Split point (27/33) appears arbitrary',
        'Why not 30/30 or 25/35?',
        'Result is too "convenient" (perfect balance)',
        'Needs justification for split at position 27'
      ],
      value: `${results.pattern5.firstGroup} / ${results.pattern5.secondGroup}`,
      expectedValue: '2690 / 2690',
      isValid: results.pattern5.firstGroup === 2690 && results.pattern5.secondGroup === 2690
    },
    {
      id: 'pattern6',
      title: 'Pattern 6: Complex Symmetry',
      description: 'Four-way symmetry with reverse order (114-n+1)',
      category: 'suspicious',
      riskLevel: 4,
      concerns: [
        'Extremely complex with multiple nested conditions',
        'Reverse order formula appears artificial',
        'Cherry picking specific combinations',
        'Too many conditions must be satisfied simultaneously',
        'Why use reverse order at all?'
      ],
      value: `${results.pattern6.values.join('-')}`,
      expectedValue: '1551-1554-1698-1752',
      isValid: results.pattern6.isValid
    },
    {
      id: 'pattern7',
      title: 'Pattern 7: 5160 Prime Balance',
      description: 'Prime vs non-prime verse counts with nth primes',
      category: 'questionable',
      riskLevel: 2,
      concerns: [
        'Depends on prime number definition',
        'Uses nth prime concept not immediately obvious',
        'Could be seen as sophisticated number manipulation',
        'Prime number approach needs peer review validation'
      ],
      value: `${results.pattern7.primeSum} / ${results.pattern7.nonPrimeSum}`,
      expectedValue: '5160 / 5160',
      isValid: results.pattern7.primeSum === 5160 && results.pattern7.nonPrimeSum === 5160
    },
    {
      id: 'pattern8',
      title: 'Pattern 8: 2000 with Exclusion',
      description: 'Prime chapters EXCLUDING 19 vs chapters divisible by 19',
      category: 'suspicious',
      riskLevel: 5,
      concerns: [
        '🚨 MAJOR RED FLAG: Arbitrary exclusion of 19',
        'No justification for excluding 19 from prime list',
        'Too convenient that result equals 2000 (round number)',
        'Very specific conditions chosen to work',
        'Classic example of cherry picking'
      ],
      value: `${results.pattern8.primeChaptersSum} / ${results.pattern8.divisibleBy19Sum}`,
      expectedValue: '2000 / 2000',
      isValid: results.pattern8.primeChaptersSum === 2000 && results.pattern8.divisibleBy19Sum === 2000
    },
    {
      id: 'pattern10',
      title: 'Pattern 10: Golden Ratio',
      description: 'φ from repetitive vs non-repetitive frequency',
      category: 'questionable',
      riskLevel: 2,
      concerns: [
        'Definition of "repetitive vs non-repetitive" needs clarity',
        'Golden ratio tolerance must be established',
        'Could be post-hoc pattern recognition',
        'Confirmation bias risk with universal constants'
      ],
      value: results.pattern10.ratio.toFixed(6),
      expectedValue: '1.618424',
      isValid: Math.abs(results.pattern10.ratio - 1.618424) < 0.001
    }
  ]

  const getRiskColor = (level: number): string => {
    if (level <= 2) return 'yellow'
    return 'red'
  }

  const getRiskText = (level: number): string => {
    if (level <= 2) return 'Medium Risk'
    return 'High Risk'
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Questionable Patterns - Academic Analysis
        </h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          These patterns require critical evaluation due to potential methodological concerns. 
          Academic honesty requires transparent assessment of pattern reliability and risk factors.
        </p>
      </div>

      {/* Risk Assessment Overview */}
      <div className="bg-gradient-to-r from-yellow-50 to-red-50 rounded-lg p-6 border border-yellow-200">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <span className="text-2xl mr-2">⚠️</span>
          Risk Assessment Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
            <h4 className="font-bold text-yellow-800 mb-2">🟡 QUESTIONABLE (Medium Risk)</h4>
            <p className="text-sm text-yellow-700">
              Requires specific conditions or filters. Some aspects could be considered cherry picking, 
              but still reasonable with additional justification.
            </p>
            <div className="mt-2 text-xs text-yellow-600">
              Patterns: 5, 7, 10 (3 patterns)
            </div>
          </div>
          <div className="bg-red-100 p-4 rounded-lg border border-red-300">
            <h4 className="font-bold text-red-800 mb-2">🔴 SUSPICIOUS (High Risk)</h4>
            <p className="text-sm text-red-700">
              Uses very specific conditions, arbitrary filters, or convenient exclusions. 
              Results appear too "neat" with excessive data manipulation.
            </p>
            <div className="mt-2 text-xs text-red-600">
              Patterns: 6, 8 (2 patterns)
            </div>
          </div>
        </div>
      </div>

      {/* Pattern Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {patterns.map((pattern) => (
          <div 
            key={pattern.id}
            className={`
              bg-white rounded-lg shadow-md border-l-4 p-6 cursor-pointer transition-all duration-200
              hover:shadow-lg hover:scale-[1.02]
              ${pattern.category === 'questionable' 
                ? 'border-yellow-400 hover:bg-yellow-50' 
                : 'border-red-400 hover:bg-red-50'
              }
              ${selectedPattern === pattern.id ? 'ring-2 ring-blue-400 shadow-lg' : ''}
            `}
            onClick={() => setSelectedPattern(selectedPattern === pattern.id ? null : pattern.id)}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg">{pattern.title}</h3>
              <div className={`
                px-2 py-1 rounded-full text-xs font-bold
                ${pattern.category === 'questionable' 
                  ? 'bg-yellow-200 text-yellow-800' 
                  : 'bg-red-200 text-red-800'
                }
              `}>
                {getRiskText(pattern.riskLevel)}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-3 text-sm">{pattern.description}</p>

            {/* Current vs Expected */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-xs text-gray-600">Current</div>
                <div className="font-bold">{pattern.value}</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-xs text-gray-600">Expected</div>
                <div className="font-bold">{pattern.expectedValue}</div>
              </div>
            </div>

            {/* Validation Status */}
            <div className={`
              flex items-center text-sm mb-3
              ${pattern.isValid ? 'text-green-600' : 'text-red-600'}
            `}>
              <span className="mr-2">{pattern.isValid ? '✅' : '❌'}</span>
              {pattern.isValid ? 'Pattern Matches' : 'Pattern Does Not Match'}
            </div>

            {/* Risk Indicators */}
            <div className="flex items-center mb-3">
              <span className="text-xs text-gray-600 mr-2">Risk Level:</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star}
                    className={`
                      text-lg
                      ${star <= pattern.riskLevel 
                        ? (pattern.riskLevel <= 2 ? 'text-yellow-400' : 'text-red-400')
                        : 'text-gray-300'
                      }
                    `}
                  >
                    ⭐
                  </span>
                ))}
              </div>
            </div>

            {/* Concerns Preview */}
            <div className="border-t pt-3">
              <div className="text-xs text-gray-600 mb-1">
                Primary Concerns ({pattern.concerns.length}):
              </div>
              <div className="text-sm text-gray-700">
                {pattern.concerns[0]}
                {pattern.concerns.length > 1 && (
                  <span className="text-blue-600 ml-1">
                    +{pattern.concerns.length - 1} more...
                  </span>
                )}
              </div>
            </div>

            {/* Expand indicator */}
            <div className="text-center mt-3 text-blue-600 text-sm">
              {selectedPattern === pattern.id ? '▲ Click to collapse' : '▼ Click to expand details'}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Analysis for Selected Pattern */}
      {selectedPattern && (
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-300">
          {(() => {
            const pattern = patterns.find(p => p.id === selectedPattern)!
            return (
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className={`
                    text-2xl mr-3
                    ${pattern.category === 'questionable' ? '🟡' : '🔴'}
                  `}>
                    {pattern.category === 'questionable' ? '🟡' : '🔴'}
                  </span>
                  Detailed Analysis: {pattern.title}
                </h3>

                {/* All Concerns */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Methodological Concerns:</h4>
                  <ul className="space-y-2">
                    {pattern.concerns.map((concern, index) => (
                      <li 
                        key={index}
                        className={`
                          flex items-start p-3 rounded-lg
                          ${concern.includes('🚨') 
                            ? 'bg-red-50 border border-red-200' 
                            : 'bg-yellow-50 border border-yellow-200'
                          }
                        `}
                      >
                        <span className="mr-2 mt-1">
                          {concern.includes('🚨') ? '🚨' : '⚠️'}
                        </span>
                        <span className="text-sm">{concern}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Calculation Details */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Calculation Breakdown:</h4>
                  <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                    {getCalculationDetails(pattern.id, results)}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Academic Recommendations:</h4>
                  <div className="text-sm text-blue-700">
                    {getRecommendations(pattern.category, pattern.id)}
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {/* Academic Honesty Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <span className="text-2xl mr-2">🎓</span>
          Academic Honesty & Methodology
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Why Show Questionable Patterns?</h4>
            <p className="text-sm text-gray-700 mb-4">
              Transparent scholarship requires acknowledging patterns that may have methodological 
              weaknesses. By openly discussing concerns, we maintain intellectual integrity and 
              allow for peer review and criticism.
            </p>
            
            <h4 className="font-semibold mb-2">Research Principle</h4>
            <p className="text-sm text-gray-700">
              <strong>Better to have fewer, bulletproof patterns than many patterns with questionable methodology.</strong> 
              The 5 natural patterns (Tab 1) already provide astronomical probability (&gt;10^40) without these concerns.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Critical Questions to Consider:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Could these patterns be achieved through different formulations?</li>
              <li>• Are the conditions genuinely natural or artificially constructed?</li>
              <li>• Would these patterns survive peer review scrutiny?</li>
              <li>• Do they add meaningful evidence or introduce doubt?</li>
            </ul>
            
            <div className="mt-4 p-3 bg-yellow-100 rounded border border-yellow-300">
              <p className="text-xs text-yellow-800">
                <strong>Note:</strong> These patterns are presented for completeness and academic 
                transparency. Their inclusion does not imply endorsement of their reliability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper functions
function getCalculationDetails(patternId: string, results: QuestionableResults): string {
  switch (patternId) {
    case 'pattern5':
      return `Even-verse surahs (60 total):\n- First 27: verse counts sum = ${results.pattern5.firstGroup}\n- Last 33: surah numbers sum = ${results.pattern5.secondGroup}\n\nSplit point chosen: 27/33 (why not 30/30?)`
    
    case 'pattern6':
      return `Complex conditions with reverse order (114-n+1):\n${results.pattern6.details}\n\nQuestion: Why use reverse order formula?`
    
    case 'pattern7':
      return `Prime verse counts: nth_prime transformation = ${results.pattern7.primeSum}\nNon-prime verse counts: original values = ${results.pattern7.nonPrimeSum}\n\nPrime dependency introduces complexity`
    
    case 'pattern8':
      return `Prime chapters (EXCLUDING 19): verse sum = ${results.pattern8.primeChaptersSum}\nChapters divisible by 19: nth_prime sum = ${results.pattern8.divisibleBy19Sum}\n\n🚨 Arbitrary exclusion of 19 from primes!`
    
    case 'pattern10':
      return `Repetitive values sum: ${results.pattern10.repetitiveSum}\nNon-repetitive values sum: ${results.pattern10.nonRepetitiveSum}\nRatio: ${results.pattern10.ratio.toFixed(6)}\n\nDefinition of "repetitive" may be subjective`
    
    default:
      return 'Calculation details not available'
  }
}

function getRecommendations(category: 'questionable' | 'suspicious', patternId: string): string {
  if (category === 'suspicious') {
    if (patternId === 'pattern8') {
      return 'RECOMMENDATION: Exclude from publication. Arbitrary exclusion of 19 is a major methodological flaw that undermines credibility. Consider alternative formulations without exclusions.'
    }
    return 'RECOMMENDATION: High caution required. Consider dropping or significantly simplifying. Over-engineered patterns risk undermining the credibility of natural patterns.'
  }
  
  switch (patternId) {
    case 'pattern5':
      return 'RECOMMENDATION: Find mathematical justification for 27/33 split. If no natural explanation exists, consider alternative groupings or acknowledge limitation.'
    
    case 'pattern7':
      return 'RECOMMENDATION: Validate prime number approach through peer review. Ensure prime definition is standard and methodology is clearly documented.'
    
    case 'pattern10':
      return 'RECOMMENDATION: Define clear criteria for golden ratio recognition and tolerance levels. Document the repetitive vs non-repetitive categorization method.'
    
    default:
      return 'RECOMMENDATION: Proceed with caution. Additional justification needed for publication in academic contexts.'
  }
}
