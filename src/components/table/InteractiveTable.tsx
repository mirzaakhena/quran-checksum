import { useMemo } from 'react'
import { PatternValidation } from '../../v2/types'
import { quranData } from '../../v2/data'
import { calculateNaturalPatterns, validateNaturalPatterns, calculateGoldenRatioDetails, calculatePattern3Values, calculatePattern4Counts, calculatePattern9Values } from '../../v2/core'
import PatternModal from '../modals/PatternModal'
import CellTooltip from '../modals/CellTooltip'
import GoldenRatioCard from '../patterns/GoldenRatioCard'
import { useTableState } from '../../hooks/useTableState'

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
  const results = useMemo(() => calculateNaturalPatterns(quranData), [])
  const validation: PatternValidation = useMemo(() => validateNaturalPatterns(results), [results])
  const goldenRatioDetails = useMemo(() => calculateGoldenRatioDetails(quranData), [])

  const wrappedGetColumnTotal = (columnId: string) => getColumnTotal(quranData, columnId)
  const wrappedGetColumnCount = (columnId: string) => getColumnCount(quranData, columnId)
  const wrappedGetPatternHighlight = (columnId: string) => getPatternHighlight(columnId, tableState.selectedPattern)

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
                goldenRatioDetails={goldenRatioDetails}
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
          onClose={() => handlePatternSelect('')}
        />
      )}
    </div>
  )
}