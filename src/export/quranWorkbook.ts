// Builds a downloadable Excel workbook so anyone can verify the patterns themselves.
// Columns C-K and every total/check are live formulas (not pasted values), using the
// same column letters as the table on the site.
import type { Workbook, Worksheet } from 'exceljs'
import { quranData } from '../v2/data'
import { calculateNaturalPatterns } from '../v2/core'

export const WORKBOOK_FILENAME = 'quran-checksum.xlsx'

const FIRST_ROW = 2
const LAST_ROW = FIRST_ROW + quranData.length - 1  // 115
const TOTAL_ROW = LAST_ROW + 1                     // 116
const COUNT_ROW = LAST_ROW + 2                     // 117

const isEven = (n: number) => n % 2 === 0

// Column definitions: formula for data row r, and the cached result for that surah
const COLUMNS: {
  key: string
  header: string
  width: number
  fill: string
  formula?: (r: number) => string
  result: (A: number, B: number) => number | string
}[] = [
  { key: 'A', header: 'A: Surah Number', width: 10, fill: 'F3F4F6', result: (A) => A },
  { key: 'B', header: 'B: Verse Count', width: 10, fill: 'F3F4F6', result: (_, B) => B },
  { key: 'C', header: 'C: A + B', width: 9, fill: 'DBEAFE',
    formula: r => `A${r}+B${r}`, result: (A, B) => A + B },
  { key: 'D', header: 'D: Even (A+B)', width: 11, fill: 'DBEAFE',
    formula: r => `IF(MOD(C${r},2)=0,C${r},"")`, result: (A, B) => isEven(A + B) ? A + B : '' },
  { key: 'E', header: 'E: Odd (A+B)', width: 11, fill: 'D1FAE5',
    formula: r => `IF(MOD(C${r},2)=1,C${r},"")`, result: (A, B) => !isEven(A + B) ? A + B : '' },
  { key: 'F', header: 'F: Chapter if Even', width: 11, fill: 'ECFDF5',
    formula: r => `IF(MOD(C${r},2)=0,A${r},"")`, result: (A, B) => isEven(A + B) ? A : '' },
  { key: 'G', header: 'G: Verses if Odd', width: 11, fill: 'FEF9C3',
    formula: r => `IF(MOD(C${r},2)=1,B${r},"")`, result: (A, B) => !isEven(A + B) ? B : '' },
  { key: 'H', header: 'H: Even-Even', width: 9, fill: 'FEE2E2',
    formula: r => `IF(AND(MOD(A${r},2)=0,MOD(B${r},2)=0),1,"")`, result: (A, B) => isEven(A) && isEven(B) ? 1 : '' },
  { key: 'I', header: 'I: Even-Odd', width: 9, fill: 'EDE9FE',
    formula: r => `IF(AND(MOD(A${r},2)=0,MOD(B${r},2)=1),1,"")`, result: (A, B) => isEven(A) && !isEven(B) ? 1 : '' },
  { key: 'J', header: 'J: Odd-Even', width: 9, fill: 'CFFAFE',
    formula: r => `IF(AND(MOD(A${r},2)=1,MOD(B${r},2)=0),1,"")`, result: (A, B) => !isEven(A) && isEven(B) ? 1 : '' },
  { key: 'K', header: 'K: Odd-Odd', width: 9, fill: 'FFEDD5',
    formula: r => `IF(AND(MOD(A${r},2)=1,MOD(B${r},2)=1),1,"")`, result: (A, B) => !isEven(A) && !isEven(B) ? 1 : '' }
]

const SUM_COLUMNS = ['A', 'B', 'D', 'E', 'F', 'G']
const COUNT_COLUMNS = ['D', 'E', 'H', 'I', 'J', 'K']

const range = (col: string) => `${col}${FIRST_ROW}:${col}${LAST_ROW}`

const solidFill = (argb: string) => ({ type: 'pattern' as const, pattern: 'solid' as const, fgColor: { argb } })

function addSurahSheet(workbook: Workbook): Worksheet {
  const results = calculateNaturalPatterns(quranData)
  const sheet = workbook.addWorksheet('Surahs', { views: [{ state: 'frozen', ySplit: 1 }] })

  // Header row
  COLUMNS.forEach((col, i) => {
    const cell = sheet.getCell(1, i + 1)
    cell.value = col.header
    cell.font = { bold: true }
    cell.fill = solidFill(col.fill)
    cell.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' }
    sheet.getColumn(i + 1).width = col.width
  })
  const nameCol = COLUMNS.length + 1
  sheet.getCell(1, nameCol).value = 'Surah Name'
  sheet.getCell(1, nameCol).font = { bold: true }
  sheet.getColumn(nameCol).width = 16
  sheet.getRow(1).height = 32

  // One row per surah: A and B are the only typed-in values, everything else is a formula
  quranData.forEach((surah, i) => {
    const r = FIRST_ROW + i
    COLUMNS.forEach((col, c) => {
      const result = col.result(surah.number, surah.verseCount)
      sheet.getCell(r, c + 1).value = col.formula
        ? { formula: col.formula(r), result }
        : result
    })
    sheet.getCell(r, nameCol).value = surah.name ?? ''
  })

  // TOTAL and COUNT rows, cached with the same values the site shows
  const cachedTotals: Record<string, number> = {
    A: results.sumSurahNumbers,
    B: results.sumVerseCounts,
    D: results.evenTotalSum,
    E: results.oddTotalSum,
    F: results.chapterSumIfEvenTotal,
    G: results.verseSumIfOddTotal
  }
  const cachedCounts: Record<string, number> = {
    D: results.evenTotalCount,
    E: results.oddTotalCount,
    H: results.evenSurahEvenVerses,
    I: results.evenSurahOddVerses,
    J: results.oddSurahEvenVerses,
    K: results.oddSurahOddVerses
  }

  sheet.getCell(`L${TOTAL_ROW}`).value = '← TOTAL (SUM)'
  sheet.getCell(`L${COUNT_ROW}`).value = '← COUNT'
  SUM_COLUMNS.forEach(col => {
    sheet.getCell(`${col}${TOTAL_ROW}`).value = { formula: `SUM(${range(col)})`, result: cachedTotals[col] }
  })
  COUNT_COLUMNS.forEach(col => {
    sheet.getCell(`${col}${COUNT_ROW}`).value = { formula: `COUNT(${range(col)})`, result: cachedCounts[col] }
  })
  ;[TOTAL_ROW, COUNT_ROW].forEach(r => {
    const row = sheet.getRow(r)
    row.font = { bold: true }
    row.eachCell({ includeEmpty: true }, cell => {
      cell.fill = solidFill('E5E7EB')
      cell.border = { top: { style: 'thin' } }
    })
  })

  return sheet
}

function addChecksSheet(workbook: Workbook) {
  const results = calculateNaturalPatterns(quranData)
  const sheet = workbook.addWorksheet('Checks')
  sheet.columns = [
    { width: 12 }, { width: 58 }, { width: 14 }, { width: 14 }, { width: 10 }
  ]

  sheet.getCell('A1').value = 'Quran Checksum: verify it yourself'
  sheet.getCell('A1').font = { bold: true, size: 14 }
  sheet.getCell('A2').value =
    'Every number below is a formula that reads the "Surahs" sheet. Columns C-K there are formulas too: ' +
    'only A (surah number) and B (verse count) are typed in. Change any verse count to see which checks break.'
  sheet.mergeCells('A2:E2')
  sheet.getCell('A2').alignment = { wrapText: true, vertical: 'top' }
  sheet.getRow(2).height = 45

  const S = (cell: string) => `Surahs!${cell}`
  const T = (col: string) => S(`${col}${TOTAL_ROW}`)
  const N = (col: string) => S(`${col}${COUNT_ROW}`)

  const groups = [
    {
      title: 'Core Fact 1: Sum Balance (Patterns 1 & 3)',
      rows: [
        ['Pattern 3', 'Σ surah numbers where A+B is even (F) = Σ verse counts where A+B is odd (G)',
          T('F'), T('G'), results.chapterSumIfEvenTotal, results.verseSumIfOddTotal],
        ['Pattern 1', 'Σ (A+B) where even (D) = total verse count (B)',
          T('D'), T('B'), results.evenTotalSum, results.sumVerseCounts],
        ['Pattern 1', 'Σ (A+B) where odd (E) = sum of surah numbers (A)',
          T('E'), T('A'), results.oddTotalSum, results.sumSurahNumbers]
      ]
    },
    {
      title: 'Core Fact 2: Parity Balance (Patterns 2 & 4)',
      rows: [
        ['Pattern 4', 'COUNT even surah & even verses (H) = COUNT odd surah & even verses (J)',
          N('H'), N('J'), results.evenSurahEvenVerses, results.oddSurahEvenVerses],
        ['Pattern 4', 'COUNT even surah & odd verses (I) = COUNT odd surah & odd verses (K)',
          N('I'), N('K'), results.evenSurahOddVerses, results.oddSurahOddVerses],
        ['Pattern 2', 'COUNT where A+B is even (D) = COUNT where A+B is odd (E)',
          N('D'), N('E'), results.evenTotalCount, results.oddTotalCount]
      ]
    }
  ] as const

  const headerRow = 4
  ;['Pattern', 'Claim', 'Left side', 'Right side', 'Equal?'].forEach((h, i) => {
    const cell = sheet.getCell(headerRow, i + 1)
    cell.value = h
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } }
    cell.fill = solidFill('1E40AF')
  })

  let r = headerRow + 1
  const matchCells: string[] = []
  groups.forEach(group => {
    const titleCell = sheet.getCell(r, 1)
    titleCell.value = group.title
    titleCell.font = { bold: true }
    sheet.mergeCells(r, 1, r, 5)
    sheet.getRow(r).eachCell({ includeEmpty: true }, cell => { cell.fill = solidFill('E0E7FF') })
    r++

    group.rows.forEach(([pattern, claim, left, right, leftResult, rightResult]) => {
      sheet.getCell(r, 1).value = pattern
      sheet.getCell(r, 2).value = claim
      sheet.getCell(r, 2).alignment = { wrapText: true }
      sheet.getCell(r, 3).value = { formula: left, result: leftResult }
      sheet.getCell(r, 4).value = { formula: right, result: rightResult }
      sheet.getCell(r, 5).value = { formula: `C${r}=D${r}`, result: leftResult === rightResult }
      matchCells.push(`E${r}`)
      r++
    })
    r++
  })

  // Green/red highlight for the Equal? column
  const firstMatch = headerRow + 1
  const lastMatch = r - 1
  sheet.addConditionalFormatting({
    ref: `E${firstMatch}:E${lastMatch}`,
    rules: [
      { type: 'cellIs', operator: 'equal', formulae: ['TRUE'], priority: 1,
        style: { fill: solidFill('D1FAE5'), font: { bold: true, color: { argb: 'FF047857' } } } },
      { type: 'cellIs', operator: 'equal', formulae: ['FALSE'], priority: 2,
        style: { fill: solidFill('FEE2E2'), font: { bold: true, color: { argb: 'FFB91C1C' } } } }
    ]
  })

  sheet.getCell(r, 2).value = 'All checks pass'
  sheet.getCell(r, 2).font = { bold: true }
  sheet.getCell(r, 5).value = { formula: `AND(${matchCells.join(',')})`, result: true }
  sheet.getCell(r, 5).font = { bold: true }
}

export async function buildQuranWorkbook(): Promise<Workbook> {
  // Loaded on demand so the spreadsheet library is only fetched when someone downloads
  const ExcelJS = (await import('exceljs')).default
  const workbook = new ExcelJS.Workbook()
  workbook.creator = 'Quran Checksum Explorer'
  workbook.created = new Date()
  addSurahSheet(workbook)
  addChecksSheet(workbook)
  return workbook
}

export async function downloadQuranWorkbook() {
  const workbook = await buildQuranWorkbook()
  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = WORKBOOK_FILENAME
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
