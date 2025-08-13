import { TableFooterProps } from './types'

export default function TableFooter({
  columns,
  getColumnTotal,
  getColumnCount,
  getPatternHighlight,
  onPatternSelect
}: TableFooterProps) {
  const getFooterColorClass = (columnId: string): string => {
    switch (columnId) {
      case 'A':
      case 'E':
        return 'text-lg font-bold text-blue-600 bg-blue-100'
      case 'B':
      case 'D':
      case 'Z':
      case 'AA':
        return 'text-lg font-bold text-green-600 bg-green-100'
      case 'F':
      case 'G':
        return 'text-lg font-bold text-yellow-600 bg-yellow-100'
      case 'H':
      case 'I':
      case 'J':
      case 'K':
        return 'text-gray-400'
      case 'C':
        return 'text-gray-400'
      default:
        return ''
    }
  }

  const getCountColorClass = (columnId: string): string => {
    if (columnId === 'D' || columnId === 'E') {
      return 'text-lg font-bold text-cyan-600 bg-cyan-100'
    }
    if (columnId === 'H' || columnId === 'J') {
      return 'text-lg font-bold text-purple-600 bg-purple-100'
    }
    if (columnId === 'I' || columnId === 'K') {
      return 'text-lg font-bold text-pink-600 bg-pink-100'
    }
    return 'text-gray-300'
  }

  return (
    <tfoot className="bg-gray-100 border-t-2">
      {/* First row: TOTAL (SUM) */}
      <tr className="font-bold">
        <td className="p-1 md:sticky md:left-0 md:bg-gray-100/95 md:z-50 md:backdrop-blur-sm text-xs font-bold md:shadow-sm">
          TOTAL
        </td>
        {columns.map((col) => {
          const total = getColumnTotal(col.id)
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
              onClick={() => onPatternSelect(`total-${col.id}`)}
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

      {/* Second row: COUNT */}
      <tr className="font-bold border-t">
        <td className="p-1 md:sticky md:left-0 md:bg-gray-100/95 md:z-50 md:backdrop-blur-sm text-xs font-bold md:shadow-sm">
          COUNT
        </td>
        {columns.map((col) => {
          const count = getColumnCount(col.id)
          const isCountRelevant = ['D', 'E', 'H', 'I', 'J', 'K'].includes(col.id)
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
                  onPatternSelect('pattern2')
                } else if (['H', 'I', 'J', 'K'].includes(col.id)) {
                  onPatternSelect('pattern4')
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
  )
}