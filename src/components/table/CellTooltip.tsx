import { QuranSurah } from '../../types'
import { isPrime, getNthPrime } from '../../utils/calculations'

interface CellTooltipProps {
  row: number
  column: string
  surah: QuranSurah
  value: number | string
  formula: string
}

export default function CellTooltip({ row, column, surah, value, formula }: CellTooltipProps) {
  const getCalculationBreakdown = (): string => {
    const A = surah.number
    const B = surah.verseCount
    const isAEven = A % 2 === 0
    const isBEven = B % 2 === 0
    const isBPrime = isPrime(B)

    switch (column) {
      case 'A':
        return `Surah number: ${A}`
      
      case 'B':
        return `Verse count: ${B}`
      
      case 'C':
        return `${A} + ${B} = ${A + B}`
      
      case 'D':
        return isAEven 
          ? `${A} is even → ${A}` 
          : `${A} is odd → empty`
      
      case 'E':
        return !isAEven 
          ? `${A} is odd → ${A}` 
          : `${A} is even → empty`
      
      case 'F':
        return isAEven 
          ? `Surah ${A} is even → verse count ${B}` 
          : `Surah ${A} is odd → empty`
      
      case 'G':
        return !isBEven 
          ? `${B} verses is odd → ${B}` 
          : `${B} verses is even → empty`
      
      case 'H':
        return isAEven && isBEven 
          ? `Surah ${A} (even) & ${B} verses (even) → ${B}` 
          : `Not even-even combination → empty`
      
      case 'I':
        return isAEven && !isBEven 
          ? `Surah ${A} (even) & ${B} verses (odd) → ${B}` 
          : `Not even-odd combination → empty`
      
      case 'J':
        return !isAEven && isBEven 
          ? `Surah ${A} (odd) & ${B} verses (even) → ${B}` 
          : `Not odd-even combination → empty`
      
      case 'K':
        return !isAEven && !isBEven 
          ? `Surah ${A} (odd) & ${B} verses (odd) → ${B}` 
          : `Not odd-odd combination → empty`
      
      case 'Z':
        return isBPrime 
          ? `${B} is prime → ${B}` 
          : `${B} is not prime → empty`
      
      case 'AA':
        if (isBPrime) {
          const nthPrime = getNthPrime(A)
          return `${B} is prime → nth_prime(${A}) = ${nthPrime}`
        }
        return `${B} is not prime → empty`
      
      default:
        return 'Unknown calculation'
    }
  }

  const getPatternContext = (): string => {
    switch (column) {
      case 'A':
      case 'B':
        return 'Part of Pattern 1: Perfect Balance (6555/6236)'
      
      case 'D':
      case 'E':
        return 'Part of Pattern 2: 57:57 Distribution'
      
      case 'H':
      case 'I': 
      case 'J':
      case 'K':
        return 'Part of Pattern 4: 30-27-27-30 Parity Matrix'
      
      case 'Z':
      case 'AA':
        return 'Part of Pattern 9: Prime Sum Z+AA=6236'
      
      default:
        return 'Mathematical relationship in Quran structure'
    }
  }

  const getColorClass = (): string => {
    if (value === '' || value === '—') return 'border-gray-300 bg-gray-50'
    
    switch (column) {
      case 'A':
      case 'B':
        return 'border-blue-400 bg-blue-50'
      case 'D':
      case 'E':
        return 'border-green-400 bg-green-50'
      case 'H':
      case 'I':
      case 'J':
      case 'K':
        return 'border-purple-400 bg-purple-50'
      case 'Z':
      case 'AA':
        return 'border-orange-400 bg-orange-50'
      default:
        return 'border-gray-400 bg-gray-50'
    }
  }

  return (
    <div className="fixed top-4 left-4 z-50 pointer-events-none">
      <div className={`
        border-2 rounded-lg shadow-lg p-3 max-w-sm
        ${getColorClass()}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="font-bold text-gray-900">
            {surah.name || `Surah ${surah.number}`}
          </div>
          <div className="text-sm text-gray-600">
            Column {column}
          </div>
        </div>

        {/* Current Value */}
        <div className="mb-2">
          <div className="text-sm text-gray-600">Current Value:</div>
          <div className="text-lg font-bold text-gray-900">
            {value === '' || value === '—' ? 'Empty' : value}
          </div>
        </div>

        {/* Calculation */}
        <div className="mb-2">
          <div className="text-sm text-gray-600">Calculation:</div>
          <div className="text-sm font-mono bg-white p-2 rounded border">
            {getCalculationBreakdown()}
          </div>
        </div>

        {/* Formula */}
        <div className="mb-2">
          <div className="text-sm text-gray-600">Formula:</div>
          <div className="text-xs font-mono text-gray-700">
            {formula}
          </div>
        </div>

        {/* Pattern Context */}
        <div className="text-xs text-gray-600 border-t pt-2">
          {getPatternContext()}
        </div>

        {/* Position indicator */}
        <div className="text-xs text-gray-500 mt-1">
          Row {row + 1} of 114 • Click for details
        </div>
      </div>
    </div>
  )
}
