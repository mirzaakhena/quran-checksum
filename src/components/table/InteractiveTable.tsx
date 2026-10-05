import { useMemo } from 'react'
import { quranData } from '../../v2/data'
import PatternModal from '../modals/PatternModal'
import CellTooltip from '../modals/CellTooltip'
import { useTableState } from '../../hooks/useTableState'
import { useQuranPatterns } from '../../hooks/useQuranPatterns'

import TableHeader from './TableHeader'
import TableColumnHeaders from './TableColumnHeaders'
import TableRow from './TableRow'
import TableFooter from './TableFooter'
import TableControls from './TableControls'

import { InteractiveTableProps } from './types'
import { createTableColumns, getCellValue, getColumnTotal, getColumnCount, getPatternHighlight } from './utils'

export default function InteractiveTable({ className = '' }: InteractiveTableProps) {
  const { tableState, handleHeaderClick, handleCellHover, handleCellClick, handleMouseMove, handleMouseLeave, handleToggleRows, handlePatternSelect } = useTableState();

  const columns = useMemo(() => createTableColumns(), [])
  const { results, validation } = useQuranPatterns()

  const wrappedGetColumnTotal = (columnId: string) => getColumnTotal(quranData, columnId)
  const wrappedGetColumnCount = (columnId: string) => getColumnCount(quranData, columnId)
  const wrappedGetPatternHighlight = (columnId: string) => getPatternHighlight(columnId, tableState.selectedPattern)

  const displayedData = tableState.showAllRows ? quranData : quranData.slice(0, 20)

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <TableHeader />

      <div className="w-full overflow-x-auto md:overflow-x-visible">
        <table className="w-full text-sm table-fixed min-w-[800px] md:min-w-full">
          <TableColumnHeaders
            columns={columns}
            onHeaderClick={handleHeaderClick}
            getPatternHighlight={wrappedGetPatternHighlight}
            firstColumnLabel="Surah Name"
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
                onCellHover={handleCellHover}
                onCellClick={handleCellClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            ))}
            
            <TableControls
              colSpan={columns.length + 1}
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

      {tableState.hoveredCell && (
        <CellTooltip
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
          onClose={() => handlePatternSelect('')}
        />
      )}
    </div>
  )
}