import { QuranSurah } from '../../types'
import { isPrime, getNthPrime } from '../../utils/calculations'
import { useState, useEffect } from 'react'

interface CellTooltipProps {
  row: number
  column: string
  surah: QuranSurah
  value: number | string
  formula: string
  mousePosition: { x: number; y: number }
}

export default function CellTooltip({ row, column, surah, value, formula, mousePosition }: CellTooltipProps) {
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, placement: 'bottom-right' })

  // Calculate optimal tooltip position
  useEffect(() => {
    const tooltipWidth = 320 // Approximate tooltip width
    const tooltipHeight = 300 // Approximate tooltip height
    const offset = 100 // Distance from cursor
    const screenPadding = 20 // Padding from screen edges

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let x = mousePosition.x
    let y = mousePosition.y
    let placement = 'bottom-right'

    // Check if tooltip would go off the right edge
    if (x + tooltipWidth + offset > viewportWidth - screenPadding) {
      x = mousePosition.x - tooltipWidth - offset
      placement = placement.replace('right', 'left')
    } else {
      x = mousePosition.x + offset
    }

    // Check if tooltip would go off the bottom edge
    if (y + tooltipHeight + offset > viewportHeight - screenPadding) {
      y = mousePosition.y - tooltipHeight - offset
      placement = placement.replace('bottom', 'top')
    } else {
      y = mousePosition.y + offset
    }

    // Ensure tooltip doesn't go off the left edge
    if (x < screenPadding) {
      x = screenPadding
    }

    // Ensure tooltip doesn't go off the top edge
    if (y < screenPadding) {
      y = screenPadding
    }

    setTooltipPosition({ x, y, placement })
  }, [mousePosition])
  const getCalculationBreakdown = (): string => {
    const A = surah.number
    const B = surah.verseCount
    const C = A + B
    const isAEven = A % 2 === 0
    const isBEven = B % 2 === 0
    const isCEven = C % 2 === 0
    const isBPrime = isPrime(B)

    switch (column) {
      case 'A':
        return `Surah number: ${A}`
      
      case 'B':
        return `Verse count: ${B}`
      
      case 'C':
        return `${A} + ${B} = ${C}`
      
      case 'D':
        return isCEven 
          ? `${A} + ${B} = ${C} (even) → ${C}` 
          : `${A} + ${B} = ${C} (odd) → empty`
      
      case 'E':
        return !isCEven 
          ? `${A} + ${B} = ${C} (odd) → ${C}` 
          : `${A} + ${B} = ${C} (even) → empty`
      
      case 'F':
        return isCEven 
          ? `${A} + ${B} = ${C} (even) → chapter ${A}` 
          : `${A} + ${B} = ${C} (odd) → empty`
      
      case 'G':
        return !isCEven 
          ? `${A} + ${B} = ${C} (odd) → verses ${B}` 
          : `${A} + ${B} = ${C} (even) → empty`
      
      case 'H':
        return isAEven && isBEven 
          ? `Surah ${A} (even) & ${B} verses (even) → ✓` 
          : `Not even-even combination → empty`
      
      case 'I':
        return isAEven && !isBEven 
          ? `Surah ${A} (even) & ${B} verses (odd) → ✓` 
          : `Not even-odd combination → empty`
      
      case 'J':
        return !isAEven && isBEven 
          ? `Surah ${A} (odd) & ${B} verses (even) → ✓` 
          : `Not odd-even combination → empty`
      
      case 'K':
        return !isAEven && !isBEven 
          ? `Surah ${A} (odd) & ${B} verses (odd) → ✓` 
          : `Not odd-odd combination → empty`
      
      case 'Z':
        return isBPrime 
          ? `${B} is prime → ${B}` 
          : `${B} is not prime → empty`
      
      case 'AA':
        if (isBPrime) {
          const nthPrime = getNthPrime(B)
          return `${B} is prime → nth_prime(${B}) = ${nthPrime}`
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
        return 'Part of Pattern 1: Even/Odd Distribution (6236/6555)'
      
      case 'F':
      case 'G':
        return 'Part of Pattern 3: Conditional Symmetry (3303/3303)'
      
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
    <div 
      className="fixed z-50 pointer-events-none transition-all duration-75 ease-out"
      style={{
        left: `${tooltipPosition.x}px`,
        top: `${tooltipPosition.y}px`,
        transform: 'translate(0, 0)' // Prevent any default transforms
      }}
    >
      <div className={`
        border-2 rounded-lg shadow-xl p-3 max-w-sm relative
        backdrop-blur-sm bg-white/95
        ${getColorClass()}
      `}>
        {/* Placement indicator */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-gray-400 rounded-full opacity-50 text-xs" 
             title={`Positioned: ${tooltipPosition.placement}`}>
        </div>

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
          <div className="text-sm font-mono bg-white/80 p-2 rounded border">
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
