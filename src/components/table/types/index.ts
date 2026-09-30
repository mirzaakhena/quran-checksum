import { QuranSurah } from '../../../v2/types'

export interface TableColumn {
  id: string
  label: string
  description: string
  formula: string
  className?: string
}

export interface InteractiveTableProps {
  className?: string
}

export interface TableState {
  selectedPattern: string | null
  hoveredCell: { row: number; col: string } | null
  selectedCell: { row: number; col: string } | null
  showAllRows: boolean
  mousePosition: { x: number; y: number }
}

export interface TableColumnHeadersProps {
  columns: TableColumn[]
  // Omit to render the headers without click behaviour
  onHeaderClick?: (columnId: string) => void
  getPatternHighlight: (columnId: string) => string
  firstColumnLabel?: string
  firstColumnClassName?: string
}

export interface TableRowProps {
  surah: QuranSurah
  index: number
  columns: TableColumn[]
  selectedCell: { row: number; col: string } | null
  selectedPattern: string | null
  getCellValue: (surah: QuranSurah, columnId: string) => number | string
  getPatternHighlight: (columnId: string) => string
  onCellHover: (row: number, col: string, event: React.MouseEvent) => void
  onCellClick: (row: number, col: string) => void
  onMouseMove: (event: React.MouseEvent) => void
  onMouseLeave: () => void
}

export interface TableFooterProps {
  columns: TableColumn[]
  selectedPattern: string | null
  getColumnTotal: (columnId: string) => number
  getColumnCount: (columnId: string) => number
  getPatternHighlight: (columnId: string) => string
  // Omit to render the totals without click behaviour
  onPatternSelect?: (pattern: string) => void
}

export interface TableControlsProps {
  colSpan: number
  showAllRows: boolean
  onToggleRows: () => void
  totalRows: number
  currentRows: number
}