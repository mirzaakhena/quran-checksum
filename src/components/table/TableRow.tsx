import { TableRowProps } from './types'
import { getCellStyling } from './utils'

export default function TableRow({
  surah,
  index,
  columns,
  selectedCell,
  getCellValue,
  getPatternHighlight,
  onCellHover,
  onCellClick,
  onMouseMove,
  onMouseLeave
}: TableRowProps) {
  return (
    <tr key={surah.number} className="border-b hover:bg-gray-50">
      <td className="p-1 pl-2 truncate text-gray-700 md:sticky md:left-0 md:bg-white/95 md:z-30 border-r md:backdrop-blur-sm text-xs md:shadow-sm">
        {surah.name}
      </td>
      {columns.map((col) => {
        const value = getCellValue(surah, col.id)
        const isEmpty = value === ''
        
        return (
          <td
            key={col.id}
            className={getCellStyling(
              col.id,
              value,
              getPatternHighlight,
              index,
              selectedCell,
              col.className || ''
            )}
            onMouseEnter={(e) => onCellHover(index, col.id, e)}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onClick={() => onCellClick(index, col.id)}
          >
            {isEmpty ? '—' : value}
          </td>
        )
      })}
    </tr>
  )
}