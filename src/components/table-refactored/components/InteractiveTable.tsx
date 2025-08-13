import { useState, useMemo } from 'react'
import { PatternValidation } from '../../../v2/types'
import { quranData } from '../../../v2/data'
import { calculateNaturalPatterns, validateNaturalPatterns, calculateGoldenRatioDetails, calculatePattern3Values, calculatePattern4Counts, calculatePattern9Values } from '../../../v2/core'
import PatternModal from '../../table/PatternModal'
import CellTooltip from '../../table/CellTooltip'
import GoldenRatioCard from '../../pattern10/GoldenRatioCard'

import TableHeader from './TableHeader'
import TableColumnHeaders from './TableColumnHeaders'
import TableRow from './TableRow'
import TableFooter from './TableFooter'
import TableControls from './TableControls'

import { InteractiveTableProps, TableState } from '../types'
import { createTableColumns, getCellValue, getColumnTotal, getColumnCount, getPatternHighlight, getPatternFromColumnId } from '../utils'

export default function InteractiveTable({ className = '' }: InteractiveTableProps) {
  const [tableState, setTableState] = useState<TableState>({
    selectedPattern: null,
    hoveredCell: null,
    selectedCell: null,
    showAllRows: false,
    mousePosition: { x: 0, y: 0 }
  })

  const columns = useMemo(() => createTableColumns(), [])
  const results = useMemo(() => calculateNaturalPatterns(quranData), [])
  const validation: PatternValidation = useMemo(() => validateNaturalPatterns(results), [results])

  const wrappedGetColumnTotal = (columnId: string) => getColumnTotal(quranData, columnId)
  const wrappedGetColumnCount = (columnId: string) => getColumnCount(quranData, columnId)
  const wrappedGetPatternHighlight = (columnId: string) => getPatternHighlight(columnId, tableState.selectedPattern)

  const handleHeaderClick = (columnId: string) => {
    const pattern = getPatternFromColumnId(columnId)
    setTableState(prev => ({ ...prev, selectedPattern: pattern }))
  }

  const handleCellHover = (row: number, col: string, event: React.MouseEvent) => {
    setTableState(prev => ({
      ...prev,
      hoveredCell: { row, col },
      mousePosition: { x: event.clientX, y: event.clientY }
    }))
  }

  const handleCellClick = (row: number, col: string) => {
    setTableState(prev => ({
      ...prev,
      selectedCell: prev.selectedCell?.row === row && prev.selectedCell?.col === col 
        ? null 
        : { row, col }
    }))
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    setTableState(prev => ({
      ...prev,
      mousePosition: { x: event.clientX, y: event.clientY }
    }))
  }

  const handleMouseLeave = () => {
    setTableState(prev => ({ ...prev, hoveredCell: null }))
  }

  const handleToggleRows = () => {
    setTableState(prev => ({ ...prev, showAllRows: !prev.showAllRows }))
  }

  const handlePatternSelect = (pattern: string) => {
    setTableState(prev => ({ ...prev, selectedPattern: pattern }))
  }

  const displayedData = tableState.showAllRows ? quranData : quranData.slice(0, 20)

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <TableHeader
        validation={validation}
        results={results}
        pattern3Values={calculatePattern3Values(quranData)}
        pattern4Counts={calculatePattern4Counts(quranData)}
        pattern9Values={calculatePattern9Values(quranData)}
        getColumnCount={wrappedGetColumnCount}
      />

      <div className="w-full overflow-x-auto md:overflow-x-visible">
        <table className="w-full text-sm table-fixed min-w-[800px] md:min-w-full">
          <TableColumnHeaders
            columns={columns}
            onHeaderClick={handleHeaderClick}
            getPatternHighlight={wrappedGetPatternHighlight}
          />

          <tbody>
            {displayedData.map((surah, index) => (
              <TableRow
                key={surah.number}
                surah={surah}
                index={index}
                columns={columns}
                selectedCell={tableState.selectedCell}
                selectedPattern={tableState.selectedPattern}
                getCellValue={getCellValue}
                getPatternHighlight={wrappedGetPatternHighlight}
                goldenRatioDetails={calculateGoldenRatioDetails([surah])}
                onCellHover={handleCellHover}
                onCellClick={handleCellClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            ))}
            
            <TableControls
              showAllRows={tableState.showAllRows}
              onToggleRows={handleToggleRows}
              totalRows={114}
              currentRows={20}
            />
          </tbody>

          <TableFooter
            columns={columns}
            selectedPattern={tableState.selectedPattern}
            getColumnTotal={wrappedGetColumnTotal}
            getColumnCount={wrappedGetColumnCount}
            getPatternHighlight={wrappedGetPatternHighlight}
            onPatternSelect={handlePatternSelect}
          />
        </table>
      </div>

      <div className="mt-6">
        <GoldenRatioCard />
      </div>

      {tableState.hoveredCell && (
        <CellTooltip
          row={tableState.hoveredCell.row}
          column={tableState.hoveredCell.col}
          surah={quranData[tableState.hoveredCell.row]}
          value={getCellValue(quranData[tableState.hoveredCell.row], tableState.hoveredCell.col)}
          formula={columns.find(c => c.id === tableState.hoveredCell!.col)?.formula || ''}
          mousePosition={tableState.mousePosition}
        />
      )}

      {tableState.selectedPattern && (
        <PatternModal
          patternId={tableState.selectedPattern}
          results={results}
          validation={validation}
          onClose={() => setTableState(prev => ({ ...prev, selectedPattern: null }))}
        />
      )}
    </div>
  )
}