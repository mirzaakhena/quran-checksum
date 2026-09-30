import { useMemo } from 'react';
import { MAX_VERSES, MIN_VERSES, parseVerseCount } from '../../v2/core';
import { QuranSurah } from '../../v2/types';
import TableColumnHeaders from '../table/TableColumnHeaders';
import TableFooter from '../table/TableFooter';
import { createTableColumns, getCellStyling, getCellValue, getColumnCount, getColumnTotal } from '../table/utils';

interface MiniQuranTableProps {
  entries: string[];
  onEntryChange: (index: number, value: string) => void;
}

const noHighlight = () => '';

// Same columns (A-K), cell styling, totals and counts as the checksum table; column B is editable
export function MiniQuranTable({ entries, onEntryChange }: MiniQuranTableProps) {
  const columns = useMemo(() => createTableColumns(), []);
  const verseCounts = entries.map(parseVerseCount);
  const filled: QuranSurah[] = verseCounts.flatMap((verseCount, i) =>
    verseCount === null ? [] : [{ number: i + 1, verseCount }]
  );

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="w-full overflow-x-auto md:overflow-x-visible">
        <table className="w-full text-sm table-fixed min-w-[800px] md:min-w-full">
          <TableColumnHeaders
            columns={columns}
            getPatternHighlight={noHighlight}
          />
          <tbody>
            {entries.map((entry, i) => {
              const surahNumber = i + 1;
              const verseCount = verseCounts[i];
              const surah = { number: surahNumber, verseCount: verseCount ?? 0 };
              const invalid = entry.trim() !== '' && verseCount === null;
              return (
                <tr key={surahNumber} className="border-b hover:bg-gray-50">
                  <td className="p-1 pl-2 truncate text-gray-700 md:sticky md:left-0 md:bg-white/95 md:z-30 border-r md:backdrop-blur-sm text-xs md:shadow-sm">
                    Surah {surahNumber}
                  </td>
                  {columns.map((col) => {
                    if (col.id === 'B') {
                      return (
                        <td key={col.id} className={`p-0.5 ${col.className ?? ''}`}>
                          <input
                            type="number"
                            inputMode="numeric"
                            min={MIN_VERSES}
                            max={MAX_VERSES}
                            value={entry}
                            onChange={(e) => onEntryChange(i, e.target.value)}
                            aria-label={`Verses of surah ${surahNumber}`}
                            title={invalid ? `Enter a whole number from ${MIN_VERSES} to ${MAX_VERSES}` : undefined}
                            className={`w-full text-center text-xs tabular-nums rounded border px-1 py-0.5 ${
                              invalid ? 'border-red-400 bg-red-50 text-red-700' : 'border-gray-300'
                            }`}
                          />
                        </td>
                      );
                    }
                    const value = col.id === 'A' ? surahNumber : verseCount === null ? '' : getCellValue(surah, col.id);
                    return (
                      <td
                        key={col.id}
                        className={getCellStyling(col.id, value, noHighlight, i, null, col.className ?? '')}
                      >
                        {value === '' ? '—' : value}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <TableFooter
            columns={columns}
            selectedPattern={null}
            getColumnTotal={(id) => getColumnTotal(filled, id)}
            getColumnCount={(id) => getColumnCount(filled, id)}
            getPatternHighlight={noHighlight}
          />
        </table>
      </div>
    </div>
  );
}
