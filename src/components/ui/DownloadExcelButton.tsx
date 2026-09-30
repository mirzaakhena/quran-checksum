// The spreadsheet is generated ahead of time (npm run generate:excel) and served from public/
const WORKBOOK_URL = `${import.meta.env.BASE_URL}quran-checksum.xlsx`;

interface DownloadExcelButtonProps {
  className?: string;
}

export function DownloadExcelButton({ className = '' }: DownloadExcelButtonProps) {
  return (
    <a
      href={WORKBOOK_URL}
      download
      className={`inline-block font-medium rounded-lg px-3 py-1.5 text-sm bg-quran-green text-white hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-quran-green ${className}`}
    >
      ⬇ Download Excel
    </a>
  );
}
