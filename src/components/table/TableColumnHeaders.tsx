import { TableColumnHeadersProps } from './types'

export default function TableColumnHeaders({
  columns,
  onHeaderClick,
  getPatternHighlight
}: TableColumnHeadersProps) {
  return (
    <thead className="bg-gray-100 border-b-2 md:sticky md:top-[88px] md:z-40 md:shadow-md md:backdrop-blur-sm md:bg-gray-100/95">
      <tr>
        <th className="p-1 text-left font-semibold md:sticky md:left-0 md:bg-gray-100/95 md:z-50 md:backdrop-blur-sm md:shadow-sm w-12">
          #
        </th>
        {columns.map((col) => (
          <th
            key={col.id}
            className={`
              p-1 text-center font-semibold cursor-pointer transition-all duration-200
              hover:bg-gray-200 active:bg-gray-300 bg-gray-100 md:bg-gray-100/95 md:backdrop-blur-sm
              ${col.className}
              ${getPatternHighlight(col.id)}
            `}
            onClick={() => onHeaderClick(col.id)}
            title={`${col.description}\nFormula: ${col.formula}\nClick for details`}
          >
            <div className="font-bold text-xs">{col.label}</div>
            <div className="text-xs text-gray-600 font-normal hidden sm:block">{col.description}</div>
          </th>
        ))}
      </tr>
    </thead>
  )
}