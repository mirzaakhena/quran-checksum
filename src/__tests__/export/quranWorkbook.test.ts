import { buildQuranWorkbook } from '../../export/quranWorkbook'
import { quranData } from '../../v2/data'

type FormulaValue = { formula: string; result: unknown }

const asFormula = (value: unknown) => value as FormulaValue

describe('Quran Checksum Excel export', () => {
  test('Surahs sheet keeps A and B as values and derives C-K with formulas', async () => {
    const workbook = await buildQuranWorkbook()
    const sheet = workbook.getWorksheet('Surahs')!

    // Row 2 is Al-Fatihah: 1 + 7 = 8 (even) -> D, F and K filled
    expect(sheet.getCell('A2').value).toBe(1)
    expect(sheet.getCell('B2').value).toBe(7)
    expect(asFormula(sheet.getCell('C2').value)).toEqual({ formula: 'A2+B2', result: 8 })
    expect(asFormula(sheet.getCell('D2').value)).toEqual({ formula: 'IF(MOD(C2,2)=0,C2,"")', result: 8 })
    // exceljs stores an empty-string result as undefined; both show as a blank cell
    expect(['', undefined]).toContain(asFormula(sheet.getCell('E2').value).result)
    expect(asFormula(sheet.getCell('F2').value).result).toBe(1)
    expect(asFormula(sheet.getCell('K2').value).result).toBe(1)

    // Every surah has a row with formulas in C-K
    const lastRow = 1 + quranData.length
    expect(sheet.getCell(`A${lastRow}`).value).toBe(114)
    ;['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].forEach(col => {
      expect(asFormula(sheet.getCell(`${col}${lastRow}`).value).formula).toBeDefined()
    })
  })

  test('TOTAL and COUNT rows are formulas matching the site values', async () => {
    const workbook = await buildQuranWorkbook()
    const sheet = workbook.getWorksheet('Surahs')!

    const totals = { A: 6555, B: 6236, D: 6236, E: 6555, F: 3303, G: 3303 }
    Object.entries(totals).forEach(([col, value]) => {
      expect(asFormula(sheet.getCell(`${col}116`).value)).toEqual({ formula: `SUM(${col}2:${col}115)`, result: value })
    })

    const counts = { D: 57, E: 57, H: 30, I: 27, J: 30, K: 27 }
    Object.entries(counts).forEach(([col, value]) => {
      expect(asFormula(sheet.getCell(`${col}117`).value)).toEqual({ formula: `COUNT(${col}2:${col}115)`, result: value })
    })
  })

  test('Checks sheet compares both sides of every claim with formulas', async () => {
    const workbook = await buildQuranWorkbook()
    const sheet = workbook.getWorksheet('Checks')!

    const checks: FormulaValue[] = []
    sheet.eachRow(row => {
      const equal = row.getCell(5).value
      if (equal && typeof equal === 'object' && 'formula' in equal) checks.push(equal as FormulaValue)
    })

    // 6 claims + the "All checks pass" summary
    expect(checks).toHaveLength(7)
    checks.forEach(check => expect(check.result).toBe(true))
    expect(checks[checks.length - 1].formula).toMatch(/^AND\(/)
  })
})
