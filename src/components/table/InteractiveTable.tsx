import { useState, useMemo } from 'react'
import { QuranSurah, ChecksumResults, PatternValidation } from '../../types'
import { quranData } from '../../data/quran'
import { calculatePatterns, validatePatterns, isPrime, getNthPrime } from '../../utils/calculations'
import PatternModal from './PatternModal'
import CellTooltip from './CellTooltip'

interface TableColumn {
  id: string
  label: string
  description: string
  formula: string
  className?: string
}

interface InteractiveTableProps {
  className?: string
}

export default function InteractiveTable({ className = '' }: InteractiveTableProps) {
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null)
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: string } | null>(null)
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: string } | null>(null)

  // Calculate all patterns for the complete Quran
  const results = useMemo(() => calculatePatterns(quranData), [])
  const validation = useMemo(() => validatePatterns(results), [results])

  // Define table columns based on pattern requirements
  const columns: TableColumn[] = [
    { id: 'A', label: 'A', description: 'Surah Number', formula: 'Surah index (1-114)', className: 'bg-gray-50' },
    { id: 'B', label: 'B', description: 'Verse Count', formula: 'Number of verses in surah', className: 'bg-gray-50' },
    { id: 'C', label: 'C', description: 'A + B', formula: 'Surah number + verse count', className: 'bg-blue-50' },
    { id: 'D', label: 'D', description: 'Even (A)', formula: 'IF(A is even, A, "")', className: 'bg-pattern-1-even/20' },
    { id: 'E', label: 'E', description: 'Odd (A)', formula: 'IF(A is odd, A, "")', className: 'bg-pattern-1-odd/20' },
    { id: 'F', label: 'F', description: 'Even Surah', formula: 'IF(A is even, B, "")', className: 'bg-green-50' },
    { id: 'G', label: 'G', description: 'Odd Verses', formula: 'IF(B is odd, B, "")', className: 'bg-yellow-50' },
    { id: 'H', label: 'H', description: 'Even-Even', formula: 'IF(A even AND B even, B, "")', className: 'bg-pattern-4-combo1/20' },
    { id: 'I', label: 'I', description: 'Even-Odd', formula: 'IF(A even AND B odd, B, "")', className: 'bg-pattern-4-combo2/20' },
    { id: 'J', label: 'J', description: 'Odd-Even', formula: 'IF(A odd AND B even, B, "")', className: 'bg-pattern-4-combo3/20' },
    { id: 'K', label: 'K', description: 'Odd-Odd', formula: 'IF(A odd AND B odd, B, "")', className: 'bg-pattern-4-combo4/20' },
    { id: 'Z', label: 'Z', description: 'Prime Verses', formula: 'IF(B is prime, B, "")', className: 'bg-pattern-9-prime/20' },
    { id: 'AA', label: 'AA', description: 'Nth Prime', formula: 'IF(B is prime, nth_prime(A), "")', className: 'bg-pattern-9-nth/20' }
  ]

  // Calculate cell value for each column
  const getCellValue = (surah: QuranSurah, columnId: string): number | string => {
    const A = surah.number
    const B = surah.verseCount
    const isAEven = A % 2 === 0
    const isBEven = B % 2 === 0
    const isBPrime = isPrime(B)

    switch (columnId) {
      case 'A': return A
      case 'B': return B
      case 'C': return A + B
      case 'D': return isAEven ? A : ''
      case 'E': return !isAEven ? A : ''
      case 'F': return isAEven ? B : ''
      case 'G': return !isBEven ? B : ''
      case 'H': return isAEven && isBEven ? B : ''
      case 'I': return isAEven && !isBEven ? B : ''
      case 'J': return !isAEven && isBEven ? B : ''
      case 'K': return !isAEven && !isBEven ? B : ''
      case 'Z': return isBPrime ? B : ''
      case 'AA': return isBPrime ? getNthPrime(A) : ''
      default: return ''
    }
  }

  // Calculate column totals
  const getColumnTotal = (columnId: string): number => {
    return quranData.reduce((sum, surah) => {
      const value = getCellValue(surah, columnId)
      return sum + (typeof value === 'number' ? value : 0)
    }, 0)
  }

  // Get pattern highlighting class
  const getPatternHighlight = (columnId: string): string => {
    if (!selectedPattern) return ''
    
    switch (selectedPattern) {
      case 'pattern1':
        return columnId === 'A' || columnId === 'B' ? 'ring-2 ring-blue-400 bg-blue-100' : ''
      case 'pattern2':
        return columnId === 'D' || columnId === 'E' ? 'ring-2 ring-green-400 bg-green-100' : ''
      case 'pattern4':
        return ['H', 'I', 'J', 'K'].includes(columnId) ? 'ring-2 ring-purple-400 bg-purple-100' : ''
      case 'pattern9':
        return columnId === 'Z' || columnId === 'AA' ? 'ring-2 ring-orange-400 bg-orange-100' : ''
      default:
        return ''
    }
  }

  // Handle header click to show pattern explanation
  const handleHeaderClick = (columnId: string) => {
    const patternMap: { [key: string]: string } = {
      'A': 'surah-numbers',
      'B': 'verse-counts', 
      'D': 'pattern2',
      'E': 'pattern2',
      'H': 'pattern4',
      'I': 'pattern4', 
      'J': 'pattern4',
      'K': 'pattern4',
      'Z': 'pattern9',
      'AA': 'pattern9'
    }
    setSelectedPattern(patternMap[columnId] || null)
  }

  // Handle cell interaction
  const handleCellHover = (row: number, col: string) => {
    setHoveredCell({ row, col })
  }

  const handleCellClick = (row: number, col: string) => {
    setSelectedCell(selectedCell?.row === row && selectedCell?.col === col ? null : { row, col })
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {/* Table Header */}
      <div className="bg-gradient-to-r from-quran-blue to-indigo-600 text-white p-4">
        <h3 className="text-xl font-bold text-center">Interactive Pattern Explorer</h3>
        <p className="text-center text-blue-100 mt-1">Click headers for formulas • Click cells for calculations • Hover for details</p>
      </div>

      {/* Pattern Summary Bar */}
      <div className="bg-gray-50 p-3 border-b">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-2 text-xs">
          <div className="bg-blue-100 p-2 rounded text-center">
            <div className="font-semibold">Pattern 1</div>
            <div className={validation.pattern1 ? 'text-green-600' : 'text-red-600'}>
              {results.sumSurahNumbers}/{results.sumVerseCounts}
            </div>
          </div>
          <div className="bg-green-100 p-2 rounded text-center">
            <div className="font-semibold">Pattern 2</div>
            <div className={validation.pattern2 ? 'text-green-600' : 'text-red-600'}>
              {results.evenSurahs}:{results.oddSurahs}
            </div>
          </div>
          <div className="bg-yellow-100 p-2 rounded text-center">
            <div className="font-semibold">Pattern 3</div>
            <div className={validation.pattern3 ? 'text-green-600' : 'text-red-600'}>
              3303 {validation.pattern3 ? '✅' : '❌'}
            </div>
          </div>
          <div className="bg-purple-100 p-2 rounded text-center">
            <div className="font-semibold">Pattern 4</div>
            <div className={validation.pattern4 ? 'text-green-600' : 'text-red-600'}>
              {results.evenSurahEvenVerses}-{results.evenSurahOddVerses}-{results.oddSurahEvenVerses}-{results.oddSurahOddVerses}
            </div>
          </div>
          <div className="bg-orange-100 p-2 rounded text-center">
            <div className="font-semibold">Pattern 9</div>
            <div className={validation.pattern9 ? 'text-green-600' : 'text-red-600'}>
              {results.primeVerses + results.nthPrimeSum}
            </div>
          </div>
          <div className="bg-pink-100 p-2 rounded text-center">
            <div className="font-semibold">Pattern 10</div>
            <div className={validation.pattern10 ? 'text-green-600' : 'text-red-600'}>
              φ={results.goldenRatio.toFixed(6)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* Header Row */}
          <thead className="bg-gray-100 border-b-2">
            <tr>
              <th className="p-2 text-left font-semibold sticky left-0 bg-gray-100 z-10">
                #
              </th>
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={`
                    p-2 text-center font-semibold cursor-pointer transition-all duration-200
                    hover:bg-gray-200 active:bg-gray-300 min-w-16
                    ${col.className}
                    ${getPatternHighlight(col.id)}
                  `}
                  onClick={() => handleHeaderClick(col.id)}
                  title={`${col.description}\nFormula: ${col.formula}\nClick for details`}
                >
                  <div className="font-bold">{col.label}</div>
                  <div className="text-xs text-gray-600 font-normal">{col.description}</div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Data Rows */}
          <tbody>
            {quranData.slice(0, 20).map((surah, index) => (
              <tr key={surah.number} className="border-b hover:bg-gray-50">
                <td className="p-2 font-medium sticky left-0 bg-white z-10 border-r">
                  {surah.number}
                </td>
                {columns.map((col) => {
                  const value = getCellValue(surah, col.id)
                  const isEmpty = value === ''
                  return (
                    <td
                      key={col.id}
                      className={`
                        p-2 text-center cursor-pointer transition-all duration-200
                        hover:bg-blue-50 active:bg-blue-100 relative
                        ${col.className}
                        ${getPatternHighlight(col.id)}
                        ${isEmpty ? 'text-gray-300' : 'text-gray-900'}
                        ${selectedCell?.row === index && selectedCell?.col === col.id ? 'ring-2 ring-blue-500' : ''}
                      `}
                      onMouseEnter={() => handleCellHover(index, col.id)}
                      onMouseLeave={() => setHoveredCell(null)}
                      onClick={() => handleCellClick(index, col.id)}
                    >
                      {isEmpty ? '—' : value}
                    </td>
                  )
                })}
              </tr>
            ))}
            
            {/* Show truncation notice */}
            <tr className="bg-yellow-50">
              <td colSpan={columns.length + 1} className="p-4 text-center text-gray-600">
                <div className="text-sm">
                  📊 Showing first 20 rows of 114 total surahs
                  <button 
                    className="ml-2 text-blue-600 hover:text-blue-800 underline"
                    onClick={() => {
                      // TODO: Implement show all functionality
                      alert('Show all rows functionality coming in next update!')
                    }}
                  >
                    Show all 114 rows
                  </button>
                </div>
              </td>
            </tr>
          </tbody>

          {/* Footer with totals */}
          <tfoot className="bg-gray-100 border-t-2">
            <tr className="font-bold">
              <td className="p-2 sticky left-0 bg-gray-100 z-10">
                TOTAL
              </td>
              {columns.map((col) => {
                const total = getColumnTotal(col.id)
                const isImportant = ['A', 'B', 'Z', 'AA'].includes(col.id)
                return (
                  <td
                    key={col.id}
                    className={`
                      p-2 text-center cursor-pointer transition-all duration-200
                      hover:bg-gray-200 active:bg-gray-300
                      ${col.className}
                      ${isImportant ? 'text-lg font-bold text-blue-600' : ''}
                      ${getPatternHighlight(col.id)}
                    `}
                    onClick={() => setSelectedPattern(`total-${col.id}`)}
                    title={`Total for column ${col.id}: ${total}\nClick for pattern significance`}
                  >
                    {total > 0 ? total.toLocaleString() : '—'}
                  </td>
                )
              })}
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Interactive tooltips and modals */}
      {hoveredCell && (
        <CellTooltip
          row={hoveredCell.row}
          column={hoveredCell.col}
          surah={quranData[hoveredCell.row]}
          value={getCellValue(quranData[hoveredCell.row], hoveredCell.col)}
          formula={columns.find(c => c.id === hoveredCell.col)?.formula || ''}
        />
      )}

      {selectedPattern && (
        <PatternModal
          patternId={selectedPattern}
          results={results}
          validation={validation}
          onClose={() => setSelectedPattern(null)}
        />
      )}
    </div>
  )
}
