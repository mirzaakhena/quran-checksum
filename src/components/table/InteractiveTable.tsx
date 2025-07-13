import { useState, useMemo } from 'react'
import { QuranSurah, ChecksumResults, PatternValidation } from '../../types'
import { quranData } from '../../data/quran'
import { calculatePatterns, validatePatterns, isPrime, getNthPrime, calculateGoldenRatioDetails, isRepetitiveColumnCValue, calculatePattern3Values, calculatePattern4Counts, calculatePattern9Values } from '../../utils/calculations'
import PatternModal from './PatternModal'
import CellTooltip from './CellTooltip'
import GoldenRatioCard from '../pattern10/GoldenRatioCard'

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
  const [showAllRows, setShowAllRows] = useState(false)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  // Calculate Pattern 3 values (F and G) using centralized function
  const pattern3Values = useMemo(() => calculatePattern3Values(), [])

  // Calculate all patterns for the complete Quran
  const results = useMemo(() => calculatePatterns(quranData), [])
  
  // Calculate golden ratio details for Pattern 10
  const goldenRatioDetails = useMemo(() => calculateGoldenRatioDetails(quranData), [])
  
  // Calculate Pattern 4 counts and Pattern 9 values using centralized functions
  const pattern4Counts = useMemo(() => calculatePattern4Counts(), [])
  const pattern9Values = useMemo(() => calculatePattern9Values(), [])
  
  // Use centralized validation function for consistency across components
  const validation: PatternValidation = useMemo(() => validatePatterns(results), [results])

  // Define table columns with optimized widths
  const columns: TableColumn[] = [
    { id: 'A', label: 'A', description: 'Surah Number', formula: 'Surah index (1-114)', className: 'bg-gray-50 w-12' },
    { id: 'B', label: 'B', description: 'Verse Count', formula: 'Number of verses in surah', className: 'bg-gray-50 w-16' },
    { id: 'C', label: 'C', description: 'A + B', formula: 'Surah number + verse count', className: 'bg-blue-50 w-16' },
    { id: 'D', label: 'D', description: 'Even (A+B)', formula: 'IF(A+B is even, A+B, "")', className: 'bg-pattern-1-even/20 w-16' },
    { id: 'E', label: 'E', description: 'Odd (A+B)', formula: 'IF(A+B is odd, A+B, "")', className: 'bg-pattern-1-odd/20 w-16' },
    { id: 'F', label: 'F', description: 'Chapter if Even', formula: 'IF(A+B is even, A, "")', className: 'bg-green-50 w-12' },
    { id: 'G', label: 'G', description: 'Verses if Odd', formula: 'IF(A+B is odd, B, "")', className: 'bg-yellow-50 w-12' },
    { id: 'H', label: 'H', description: 'Even-Even', formula: 'IF(A even AND B even, ✓, "")', className: 'bg-pattern-4-combo1/20 w-10' },
    { id: 'I', label: 'I', description: 'Even-Odd', formula: 'IF(A even AND B odd, ✓, "")', className: 'bg-pattern-4-combo2/20 w-10' },
    { id: 'J', label: 'J', description: 'Odd-Even', formula: 'IF(A odd AND B even, ✓, "")', className: 'bg-pattern-4-combo3/20 w-10' },
    { id: 'K', label: 'K', description: 'Odd-Odd', formula: 'IF(A odd AND B odd, ✓, "")', className: 'bg-pattern-4-combo4/20 w-10' },
    { id: 'Z', label: 'Z', description: 'Prime Verses', formula: 'IF(B is prime, B, "")', className: 'bg-pattern-9-prime/20 w-16' },
    { id: 'AA', label: 'AA', description: 'Nth Prime', formula: 'IF(B is prime, nth_prime(B), "")', className: 'bg-pattern-9-nth/20 w-20' }
  ]

  // Calculate cell value for each column
  const getCellValue = (surah: QuranSurah, columnId: string): number | string => {
    const A = surah.number
    const B = surah.verseCount
    const C = A + B
    const isAEven = A % 2 === 0
    const isBEven = B % 2 === 0
    const isCEven = C % 2 === 0
    const isBPrime = isPrime(B)

    switch (columnId) {
      case 'A': return A
      case 'B': return B
      case 'C': return C
      case 'D': return isCEven ? C : ''
      case 'E': return !isCEven ? C : ''
      case 'F': return isCEven ? A : ''
      case 'G': return !isCEven ? B : ''
      case 'H': return isAEven && isBEven ? '✓' : ''
      case 'I': return isAEven && !isBEven ? '✓' : ''
      case 'J': return !isAEven && isBEven ? '✓' : ''
      case 'K': return !isAEven && !isBEven ? '✓' : ''
      case 'Z': return isBPrime ? B : ''
      case 'AA': return isBPrime ? getNthPrime(B) : ''
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

  // Calculate column counts (non-empty values)
  const getColumnCount = (columnId: string): number => {
    return quranData.reduce((count, surah) => {
      const value = getCellValue(surah, columnId)
      return count + (value !== '' ? 1 : 0)
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
  const handleCellHover = (row: number, col: string, event: React.MouseEvent) => {
    setHoveredCell({ row, col })
    setMousePosition({ x: event.clientX, y: event.clientY })
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

      {/* Pattern Summary Bar - Sticky */}
      <div className="bg-gray-50 p-3 border-b sticky top-0 z-50 shadow-md backdrop-blur-sm bg-gray-50/95">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-2 text-xs">
          <div className="bg-blue-100 p-2 rounded text-center">
            <div className="font-semibold">Pattern 1</div>
            <div className={validation.pattern1 ? 'text-green-600' : 'text-red-600'}>
              {results.sumSurahNumbers}/{results.sumVerseCounts} {validation.pattern1 ? '✅' : '❌'}
            </div>
          </div>
          <div className="bg-cyan-100 p-2 rounded text-center">
            <div className="font-semibold">Pattern 2</div>
            <div className={validation.pattern2 ? 'text-cyan-600' : 'text-red-600'}>
              {getColumnCount('D')}:{getColumnCount('E')} {validation.pattern2 ? '✅' : '❌'}
            </div>
          </div>
          <div className="bg-yellow-100 p-2 rounded text-center">
            <div className="font-semibold">Pattern 3</div>
            <div className={validation.pattern3 ? 'text-green-600' : 'text-red-600'}>
              {pattern3Values.F === pattern3Values.G ? pattern3Values.F : `${pattern3Values.F}/${pattern3Values.G}`} {validation.pattern3 ? '✅' : '❌'}
            </div>
          </div>
          <div className="bg-purple-100 p-2 rounded text-center">
            <div className="font-semibold">Pattern 4</div>
            <div className={validation.pattern4 ? 'text-green-600' : 'text-red-600'}>
              {pattern4Counts.H}-{pattern4Counts.I}-{pattern4Counts.J}-{pattern4Counts.K} {validation.pattern4 ? '✅' : '❌'}
            </div>
          </div>
          <div className="bg-green-100 p-2 rounded text-center">
            <div className="font-semibold">Pattern 9</div>
            <div className={validation.pattern9 ? 'text-green-600' : 'text-red-600'}>
              {pattern9Values.Z + pattern9Values.AA} {validation.pattern9 ? '✅' : '❌'}
            </div>
          </div>
          <div className="bg-pink-100 p-2 rounded text-center">
            <div className="font-semibold">Pattern 10</div>
            <div className={validation.pattern10 ? 'text-green-600' : 'text-red-600'}>
              φ={results.goldenRatio.toFixed(6)} {validation.pattern10 ? '✅' : '❌'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Table - No Horizontal Scroll */}
      <div className="w-full">
        <table className="w-full text-sm table-fixed">
          {/* Header Row - Sticky */}
          <thead className="bg-gray-100 border-b-2 sticky top-[88px] z-40 shadow-md backdrop-blur-sm bg-gray-100/95">
            <tr>
              <th className="p-1 text-left font-semibold sticky left-0 bg-gray-100/95 z-50 backdrop-blur-sm shadow-sm w-12">
                #
              </th>
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={`
                    p-1 text-center font-semibold cursor-pointer transition-all duration-200
                    hover:bg-gray-200 active:bg-gray-300 bg-gray-100/95 backdrop-blur-sm
                    ${col.className}
                    ${getPatternHighlight(col.id)}
                  `}
                  onClick={() => handleHeaderClick(col.id)}
                  title={`${col.description}\nFormula: ${col.formula}\nClick for details`}
                >
                  <div className="font-bold text-xs">{col.label}</div>
                  <div className="text-xs text-gray-600 font-normal hidden sm:block">{col.description}</div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Data Rows */}
          <tbody>
            {(showAllRows ? quranData : quranData.slice(0, 20)).map((surah, index) => (
              <tr key={surah.number} className="border-b hover:bg-gray-50">
                <td className="p-1 font-medium sticky left-0 bg-white/95 z-30 border-r backdrop-blur-sm text-xs">
                  {/* {surah.number} */}
                </td>
                {columns.map((col) => {
                  const value = getCellValue(surah, col.id)
                  const isEmpty = value === ''
                  
                  // Special styling for Column C (Pattern 10 - Golden Ratio)
                  const isColumnC = col.id === 'C'
                  const columnCValue = surah.number + surah.verseCount  // A + B
                  const isRepetitive = isColumnC && isRepetitiveColumnCValue(columnCValue, goldenRatioDetails)
                  return (
                    <td
                      key={col.id}
                      className={`
                        p-1 text-center cursor-pointer transition-all duration-200
                        hover:bg-blue-50 active:bg-blue-100 relative text-xs
                        ${col.className}
                        ${getPatternHighlight(col.id)}
                        ${isEmpty ? 'text-gray-300' : (
                          isColumnC ? (
                            isRepetitive 
                              ? 'text-orange-700 font-bold bg-orange-100/50 border border-orange-200' 
                              : 'text-blue-700 font-normal bg-blue-100/30'
                          ) : 'text-gray-900'
                        )}
                        ${selectedCell?.row === index && selectedCell?.col === col.id ? 'ring-2 ring-blue-500' : ''}
                      `}
                      onMouseEnter={(e) => handleCellHover(index, col.id, e)}
                      onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
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
            {!showAllRows && (
              <tr className="bg-yellow-50">
                <td colSpan={columns.length + 1} className="p-2 text-center text-gray-600">
                  <div className="text-xs">
                    📊 Showing first 20 rows of 114 total surahs
                    <button 
                      className="ml-2 text-blue-600 hover:text-blue-800 underline font-medium"
                      onClick={() => setShowAllRows(true)}
                    >
                      Show all 114 rows
                    </button>
                  </div>
                </td>
              </tr>
            )}
            
            {/* Show collapse notice when all rows are shown */}
            {showAllRows && (
              <tr className="bg-green-50">
                <td colSpan={columns.length + 1} className="p-2 text-center text-gray-600">
                  <div className="text-xs">
                    📊 Showing all 114 surahs
                    <button 
                      className="ml-2 text-blue-600 hover:text-blue-800 underline font-medium"
                      onClick={() => setShowAllRows(false)}
                    >
                      Show only first 20 rows
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>

          {/* Footer with totals and counts */}
          <tfoot className="bg-gray-100 border-t-2">
            {/* First row: TOTAL (SUM) */}
            <tr className="font-bold">
              <td className="p-1 sticky left-0 bg-gray-100/95 z-50 backdrop-blur-sm text-xs font-bold">
                TOTAL
              </td>
              {columns.map((col) => {
                const total = getColumnTotal(col.id)
                
                // Get color coding based on pattern relationships
                const getFooterColorClass = (columnId: string): string => {
                  switch (columnId) {
                    case 'A':
                    case 'E':
                      return 'text-lg font-bold text-blue-600 bg-blue-100' // Both = 6555
                    case 'B':
                    case 'D':
                    case 'Z':
                    case 'AA':
                      return 'text-lg font-bold text-green-600 bg-green-100' // B=D=6236, Z+AA=6236
                    case 'F':
                    case 'G':
                      return 'text-lg font-bold text-yellow-600 bg-yellow-100' // Both = 3303
                    case 'H':
                    case 'I':
                    case 'J':
                    case 'K':
                      return 'text-gray-400' // Moved to COUNT row
                    case 'C':
                      return 'text-gray-400' // Hidden/dimmed
                    default:
                      return ''
                  }
                }
                
                // Hide Column C and H/I/J/K values (moved to COUNT)
                const displayValue = ['C', 'H', 'I', 'J', 'K'].includes(col.id) ? '—' : (total > 0 ? total.toLocaleString() : '—')
                
                return (
                  <td
                    key={col.id}
                    className={`
                      p-1 text-center cursor-pointer transition-all duration-200
                      hover:bg-gray-200 active:bg-gray-300 text-xs
                      ${getFooterColorClass(col.id)}
                      ${getPatternHighlight(col.id)}
                    `}
                    onClick={() => setSelectedPattern(`total-${col.id}`)}
                    title={`
                      ${['C', 'H', 'I', 'J', 'K'].includes(col.id) 
                        ? (col.id === 'C' 
                            ? 'Sum not displayed (derived value)' 
                            : 'Count values moved to COUNT row below'
                          ) 
                        : `Total for column ${col.id}: ${total}`
                      }
                      \nClick for pattern significance
                    `}
                  >
                    {displayValue}
                  </td>
                )
              })}
            </tr>

            {/* Second row: COUNT (Pattern 2: D,E distribution + Pattern 4: H,I,J,K parity counts) */}
            <tr className="font-bold border-t">
              <td className="p-1 sticky left-0 bg-gray-100/95 z-50 backdrop-blur-sm text-xs font-bold">
                COUNT
              </td>
              {columns.map((col) => {
                const count = getColumnCount(col.id)
                
                // Only show count for columns D, E (Pattern 2) and H, I, J, K (Pattern 4)
                const isCountRelevant = ['D', 'E', 'H', 'I', 'J', 'K'].includes(col.id)
                
                // Get color coding for count row (Pattern 2 + Pattern 4)
                const getCountColorClass = (columnId: string): string => {
                  if (columnId === 'D' || columnId === 'E') {
                    return 'text-lg font-bold text-cyan-600 bg-cyan-100' // Pattern 2: 57:57 equality (different from green)
                  }
                  if (columnId === 'H' || columnId === 'J') {
                    return 'text-lg font-bold text-purple-600 bg-purple-100' // H & J = same pattern
                  }
                  if (columnId === 'I' || columnId === 'K') {
                    return 'text-lg font-bold text-pink-600 bg-pink-100' // I & K = same pattern
                  }
                  return 'text-gray-300' // Dimmed for non-relevant columns
                }
                
                const displayCount = isCountRelevant ? count : '—'
                
                return (
                  <td
                    key={`count-${col.id}`}
                    className={`
                      p-1 text-center cursor-pointer transition-all duration-200
                      hover:bg-gray-200 active:bg-gray-300 text-xs
                      ${getCountColorClass(col.id)}
                      ${getPatternHighlight(col.id)}
                    `}
                    onClick={() => {
                      if (col.id === 'D' || col.id === 'E') {
                        setSelectedPattern('pattern2')
                      } else if (['H', 'I', 'J', 'K'].includes(col.id)) {
                        setSelectedPattern('pattern4')
                      }
                    }}
                    title={`
                      ${isCountRelevant 
                        ? `Count of non-empty values in column ${col.id}: ${count}\n${
                            ['D', 'E'].includes(col.id) 
                              ? 'Part of Pattern 2: 57:57 Distribution' 
                              : 'Part of Pattern 4: 30-27-27-30 Parity Matrix'
                          }` 
                        : 'Count not relevant for this column'
                      }
                    `}
                  >
                    {displayCount}
                  </td>
                )
              })}
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Golden Ratio Pattern 10 Details Card */}
      <div className="mt-6">
        <GoldenRatioCard />
      </div>

      {/* Interactive tooltips and modals */}
      {hoveredCell && (
        <CellTooltip
          row={hoveredCell.row}
          column={hoveredCell.col}
          surah={quranData[hoveredCell.row]}
          value={getCellValue(quranData[hoveredCell.row], hoveredCell.col)}
          formula={columns.find(c => c.id === hoveredCell.col)?.formula || ''}
          mousePosition={mousePosition}
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
