import { TableColumnHeadersProps } from './types'
import { useT } from '../../i18n/LanguageContext'

export default function TableColumnHeaders({
  columns,
  onHeaderClick,
  getPatternHighlight,
  firstColumnLabel,
  firstColumnClassName = 'w-28'
}: TableColumnHeadersProps) {
  const t = useT()
  return (
    <thead className="bg-gray-100 border-b-2 md:sticky md:top-0 md:z-40 md:shadow-md md:backdrop-blur-sm md:bg-gray-100/95">
      <tr>
        <th className={`p-1 pl-2 text-left text-xs font-semibold md:sticky md:left-0 md:bg-gray-100/95 md:z-50 md:backdrop-blur-sm md:shadow-sm ${firstColumnClassName}`}>
          {firstColumnLabel ?? t.table.surah}
        </th>
        {columns.map((col) => (
          <th
            key={col.id}
            className={`
              p-1 text-center font-semibold transition-all duration-200
              ${onHeaderClick ? 'cursor-pointer hover:bg-gray-200 active:bg-gray-300' : ''}
              bg-gray-100 md:bg-gray-100/95 md:backdrop-blur-sm
              ${col.className}
              ${getPatternHighlight(col.id)}
            `}
            onClick={onHeaderClick ? () => onHeaderClick(col.id) : undefined}
            title={`${col.description}\n${t.table.formulaPrefix} ${col.formula}${onHeaderClick ? `\n${t.table.clickForDetails}` : ''}`}
          >
            <div className="font-bold text-xs">{col.label}</div>
            <div className="text-xs text-gray-600 font-normal hidden sm:block">{col.description}</div>
          </th>
        ))}
      </tr>
    </thead>
  )
}