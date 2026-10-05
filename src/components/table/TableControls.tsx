import { TableControlsProps } from './types'
import { useT } from '../../i18n/LanguageContext'

export default function TableControls({
  colSpan,
  showAllRows,
  onToggleRows,
  totalRows,
  currentRows
}: TableControlsProps) {
  const t = useT()
  if (!showAllRows && currentRows < totalRows) {
    return (
      <tr className="bg-yellow-50">
        <td colSpan={colSpan} className="p-2 text-center text-gray-600">
          <div className="text-xs">
            {t.table.showingFirst(currentRows, totalRows)}
            <button 
              className="ml-2 text-blue-600 hover:text-blue-800 underline font-medium"
              onClick={onToggleRows}
            >
              {t.table.showAll(totalRows)}
            </button>
          </div>
        </td>
      </tr>
    )
  }

  if (showAllRows) {
    return (
      <tr className="bg-green-50">
        <td colSpan={colSpan} className="p-2 text-center text-gray-600">
          <div className="text-xs">
            {t.table.showingAll(totalRows)}
            <button 
              className="ml-2 text-blue-600 hover:text-blue-800 underline font-medium"
              onClick={onToggleRows}
            >
              {t.table.showFirst(currentRows)}
            </button>
          </div>
        </td>
      </tr>
    )
  }

  return null
}