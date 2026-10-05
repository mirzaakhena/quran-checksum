import { DownloadExcelButton } from '../ui'

export default function TableHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-b">
      <div>
        <h2 className="text-xl font-bold text-gray-900">All 114 Surahs</h2>
        <p className="text-sm text-gray-600 mt-1">
          Click a column header or a total to see its pattern. Hover a cell to see how it is calculated.
        </p>
      </div>
      <DownloadExcelButton className="self-start sm:self-auto whitespace-nowrap" />
    </div>
  )
}
