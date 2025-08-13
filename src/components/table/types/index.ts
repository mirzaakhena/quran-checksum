import { QuranSurah, PatternValidation } from '../../../v2/types'

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

export interface TableHeaderProps {
  validation: PatternValidation
  results: any
  pattern3Values: any
  pattern4Counts: any
  pattern9Values: any
  getColumnCount: (columnId: string) => number
}

export interface TableColumnHeadersProps {
  columns: TableColumn[]
  onHeaderClick: (columnId: string) => void
  getPatternHighlight: (columnId: string) => string
}

export interface TableRowProps {
  surah: QuranSurah
  index: number
  columns: TableColumn[]
  selectedCell: { row: number; col: string } | null
  selectedPattern: string | null
  getCellValue: (surah: QuranSurah, columnId: string) => number | string
  getPatternHighlight: (columnId: string) => string
  goldenRatioDetails: any
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
  onPatternSelect: (pattern: string) => void
}

export interface TableControlsProps {
  showAllRows: boolean
  onToggleRows: () => void
  totalRows: number
  currentRows: number
}