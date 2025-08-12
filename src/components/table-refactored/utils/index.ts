import { QuranSurah } from '../../../types'
import { isPrime, getNthPrime, isRepetitiveColumnCValue } from '../../../utils/calculations'
import { TableColumn } from '../types'

export const createTableColumns = (): TableColumn[] => [
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

export const getCellValue = (surah: QuranSurah, columnId: string): number | string => {
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

export const getColumnTotal = (quranData: QuranSurah[], columnId: string): number => {
  return quranData.reduce((sum, surah) => {
    const value = getCellValue(surah, columnId)
    return sum + (typeof value === 'number' ? value : 0)
  }, 0)
}

export const getColumnCount = (quranData: QuranSurah[], columnId: string): number => {
  return quranData.reduce((count, surah) => {
    const value = getCellValue(surah, columnId)
    return count + (value !== '' ? 1 : 0)
  }, 0)
}

export const getPatternHighlight = (columnId: string, selectedPattern: string | null): string => {
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

export const getPatternFromColumnId = (columnId: string): string | null => {
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
  return patternMap[columnId] || null
}

export const getCellStyling = (
  surah: QuranSurah,
  columnId: string,
  value: number | string,
  goldenRatioDetails: any,
  getPatternHighlightFn: (columnId: string) => string,
  index: number,
  selectedCell: { row: number; col: string } | null,
  baseClassName: string
): string => {
  const isEmpty = value === ''
  const isColumnC = columnId === 'C'
  const columnCValue = surah.number + surah.verseCount
  const isRepetitive = isColumnC && isRepetitiveColumnCValue(columnCValue, goldenRatioDetails)
  
  return `
    p-1 text-center cursor-pointer transition-all duration-200
    hover:bg-blue-50 active:bg-blue-100 relative text-xs
    ${baseClassName}
    ${getPatternHighlightFn(columnId)}
    ${isEmpty ? 'text-gray-300' : (
      isColumnC ? (
        isRepetitive 
          ? 'text-orange-700 font-bold bg-orange-100/50 border border-orange-200' 
          : 'text-blue-700 font-normal bg-blue-100/30'
      ) : 'text-gray-900'
    )}
    ${selectedCell?.row === index && selectedCell?.col === columnId ? 'ring-2 ring-blue-500' : ''}
  `.trim()
}