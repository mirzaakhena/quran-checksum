import { QuranSurah } from '../../v2/types'
import { useState, useEffect } from 'react'
import { useT } from '../../i18n/LanguageContext'

interface CellTooltipProps {
  column: string
  surah: QuranSurah
  value: number | string
  formula: string
  mousePosition: { x: number; y: number }
}

export default function CellTooltip({ column, surah, value, formula, mousePosition }: CellTooltipProps) {
  const t = useT()
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, placement: 'bottom-right' })

  // Calculate optimal tooltip position
  useEffect(() => {
    const tooltipWidth = 320 // Approximate tooltip width
    const tooltipHeight = 300 // Approximate tooltip height
    const offset = 50 // Distance from cursor
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
    const tt = t.tooltip
    const A = surah.number
    const B = surah.verseCount
    const C = A + B
    const parity = (n: number) => (n % 2 === 0 ? tt.even : tt.odd)
    const isCEven = C % 2 === 0
    const sum = `${A} + ${B} = ${C} (${parity(C)})`

    switch (column) {
      case 'A':
        return tt.surahNumber(A)
      case 'B':
        return tt.verseCount(B)
      case 'C':
        return `${A} + ${B} = ${C}`
      case 'D':
        return `${sum} → ${isCEven ? C : tt.empty}`
      case 'E':
        return `${sum} → ${!isCEven ? C : tt.empty}`
      case 'F':
        return `${sum} → ${isCEven ? tt.toSurah(A) : tt.empty}`
      case 'G':
        return `${sum} → ${!isCEven ? tt.toVerses(B) : tt.empty}`
      case 'H':
      case 'I':
      case 'J':
      case 'K': {
        const combo = `${parity(A)}-${parity(B)}`
        return combo === tt.combos[column]
          ? tt.combo(A, parity(A), B, parity(B))
          : tt.notCombo(tt.combos[column])
      }
      default:
        return tt.unknown
    }
  }

  const getPatternContext = (): string => {
    switch (column) {
      case 'A':
      case 'B':
        return t.tooltip.contextAB
      case 'D':
      case 'E':
        return t.tooltip.contextDE
      case 'F':
      case 'G':
        return t.tooltip.contextFG
      case 'H':
      case 'I':
      case 'J':
      case 'K':
        return t.tooltip.contextHK
      default:
        return t.tooltip.contextDefault
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
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="font-bold text-gray-900">
            {surah.name || t.table.surahN(surah.number)}
          </div>
          <div className="text-sm text-gray-600">
            {t.tooltip.column(column)}
          </div>
        </div>

        {/* Calculation */}
        <div className="mb-2">
          <div className="text-sm text-gray-600">{t.tooltip.calculation}</div>
          <div className="text-sm font-mono bg-white/80 p-2 rounded border">
            {getCalculationBreakdown()}
          </div>
        </div>

        {/* Formula */}
        <div className="mb-2">
          <div className="text-sm text-gray-600">{t.tooltip.formula}</div>
          <div className="text-xs font-mono text-gray-700">
            {formula}
          </div>
        </div>

        {/* Pattern Context */}
        <div className="text-xs text-gray-600 border-t pt-2">
          {getPatternContext()}
        </div>

      </div>
    </div>
  )
}
