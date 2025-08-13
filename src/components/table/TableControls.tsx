import { TableControlsProps } from './types'

export default function TableControls({
  showAllRows,
  onToggleRows,
  totalRows,
  currentRows
}: TableControlsProps) {
  if (!showAllRows && currentRows < totalRows) {
    return (
      <tr className="bg-yellow-50">
        <td colSpan={14} className="p-2 text-center text-gray-600">
          <div className="text-xs">
            📊 Showing first {currentRows} rows of {totalRows} total surahs
            <button 
              className="ml-2 text-blue-600 hover:text-blue-800 underline font-medium"
              onClick={onToggleRows}
            >
              Show all {totalRows} rows
            </button>
          </div>
        </td>
      </tr>
    )
  }

  if (showAllRows) {
    return (
      <tr className="bg-green-50">
        <td colSpan={14} className="p-2 text-center text-gray-600">
          <div className="text-xs">
            📊 Showing all {totalRows} surahs
            <button 
              className="ml-2 text-blue-600 hover:text-blue-800 underline font-medium"
              onClick={onToggleRows}
            >
              Show only first {currentRows} rows
            </button>
          </div>
        </td>
      </tr>
    )
  }

  return null
}