import { QuranSurah } from '../../../v2/types'
import { TableColumn } from '../types'
import { ColumnId, Strings } from '../../../i18n/strings'

// Colours per column; the description and formula text come from the current language
const COLUMN_STYLES: { id: ColumnId; className: string }[] = [
  { id: 'A', className: 'bg-gray-50 w-12' },
  { id: 'B', className: 'bg-gray-50 w-16' },
  { id: 'C', className: 'bg-blue-50 w-16' },
  { id: 'D', className: 'bg-pattern-1-even/20 w-16' },
  { id: 'E', className: 'bg-pattern-1-odd/20 w-16' },
  { id: 'F', className: 'bg-green-50 w-12' },
  { id: 'G', className: 'bg-yellow-50 w-12' },
  { id: 'H', className: 'bg-pattern-4-combo1/20 w-10' },
  { id: 'I', className: 'bg-pattern-4-combo2/20 w-10' },
  { id: 'J', className: 'bg-pattern-4-combo3/20 w-10' },
  { id: 'K', className: 'bg-pattern-4-combo4/20 w-10' }
]

export const createTableColumns = (text: Strings['columns']): TableColumn[] =>
  COLUMN_STYLES.map((col) => ({ ...col, label: col.id, ...text[col.id] }))

export const getCellValue = (surah: QuranSurah, columnId: string): number | string => {
  const A = surah.number
  const B = surah.verseCount
  const C = A + B
  const isAEven = A % 2 === 0
  const isBEven = B % 2 === 0
  const isCEven = C % 2 === 0

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
      return ['A', 'B', 'D', 'E'].includes(columnId) ? 'ring-2 ring-blue-400 bg-blue-100' : ''
    case 'pattern2':
      return columnId === 'D' || columnId === 'E' ? 'ring-2 ring-green-400 bg-green-100' : ''
    case 'pattern3':
      return columnId === 'F' || columnId === 'G' ? 'ring-2 ring-yellow-400 bg-yellow-100' : ''
    case 'pattern4':
      return ['H', 'I', 'J', 'K'].includes(columnId) ? 'ring-2 ring-purple-400 bg-purple-100' : ''
    default:
      return ''
  }
}

export const getPatternFromColumnId = (columnId: string): string | null => {
  const patternMap: { [key: string]: string } = {
    'A': 'surah-numbers',
    'B': 'verse-counts', 
    'D': 'pattern1',
    'E': 'pattern1',
    'F': 'pattern3',
    'G': 'pattern3',
    'H': 'pattern4',
    'I': 'pattern4', 
    'J': 'pattern4',
    'K': 'pattern4'
  }
  return patternMap[columnId] || null
}

export const getCellStyling = (
  columnId: string,
  value: number | string,
  getPatternHighlightFn: (columnId: string) => string,
  index: number,
  selectedCell: { row: number; col: string } | null,
  baseClassName: string
): string => {
  const isEmpty = value === ''
  const isColumnC = columnId === 'C'
  
  return `
    p-1 text-center cursor-pointer transition-all duration-200
    hover:bg-blue-50 active:bg-blue-100 relative text-xs
    ${baseClassName}
    ${getPatternHighlightFn(columnId)}
    ${isEmpty ? 'text-gray-300' : (isColumnC ? 'text-blue-700' : 'text-gray-900')}
    ${selectedCell?.row === index && selectedCell?.col === columnId ? 'ring-2 ring-blue-500' : ''}
  `.trim()
}