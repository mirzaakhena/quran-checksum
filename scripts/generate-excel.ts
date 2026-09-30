// Regenerates public/quran-checksum.xlsx, the spreadsheet behind the "Download Excel" button.
// Run after changing the Quran data or the workbook layout: npm run generate:excel
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import JSZip from 'jszip'
import { buildQuranWorkbook, WORKBOOK_DATE, WORKBOOK_FILENAME } from '../src/export/quranWorkbook'

const outputPath = fileURLToPath(new URL(`../public/${WORKBOOK_FILENAME}`, import.meta.url))

const buffer = await buildQuranWorkbook().xlsx.writeBuffer()

// exceljs stamps every zip entry with the current time; pin it so the file only
// changes when its content does
const zip = await JSZip.loadAsync(buffer)
zip.forEach((_, entry) => { entry.date = WORKBOOK_DATE })
const stable = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' })

await writeFile(outputPath, stable)
console.log(`Wrote ${outputPath}`)
