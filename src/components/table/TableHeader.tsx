import { DownloadExcelButton } from '../ui'
import { useT } from '../../i18n/LanguageContext'

export default function TableHeader() {
  const t = useT()
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-b">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{t.table.title}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {t.table.hint}
        </p>
      </div>
      <DownloadExcelButton className="self-start sm:self-auto whitespace-nowrap" />
    </div>
  )
}
