import { quranData } from '../../v2/data'
import { isValidSurahCount, parseVerseCount, scoreMiniQuran } from '../../v2/core'

const book = (verseCounts: number[]) => verseCounts.map((verseCount, i) => ({ number: i + 1, verseCount }))

describe('Mini Quran challenge', () => {
  test('accepts any whole number of surahs from 2 to 200', () => {
    expect(isValidSurahCount(1)).toBe(false)
    expect(isValidSurahCount(201)).toBe(false)
    expect(isValidSurahCount(10.5)).toBe(false)
    expect(isValidSurahCount(2)).toBe(true)
    expect(isValidSurahCount(115)).toBe(true)
    expect(isValidSurahCount(200)).toBe(true)
  })

  test('reads verse counts from 2 to 300 and rejects anything else', () => {
    expect(parseVerseCount('2')).toBe(2)
    expect(parseVerseCount(' 300 ')).toBe(300)
    expect(parseVerseCount('')).toBeNull()
    expect(parseVerseCount('1')).toBeNull()
    expect(parseVerseCount('301')).toBeNull()
    expect(parseVerseCount('2.5')).toBeNull()
    expect(parseVerseCount('-7')).toBeNull()
    expect(parseVerseCount('abc')).toBeNull()
  })

  test("the Quran's own verse counts pass all 4 patterns", () => {
    const score = scoreMiniQuran(quranData)
    expect(score.allPass).toBe(true)
    expect(score.facts).toEqual({ sumBalance: true, parityBalance: true })
  })

  test('a book with every surah at 10 verses fails', () => {
    expect(scoreMiniQuran(book(Array(10).fill(10))).allPass).toBe(false)
  })

  test('small books can pass all 4 patterns', () => {
    // Surah 1 with 2 verses (A+B = 3, odd) and surah 2 with 4 verses (A+B = 6, even):
    // F = 2 = G, H = J = 1, I = K = 0, one even and one odd A+B
    expect(scoreMiniQuran(book([2, 4])).allPass).toBe(true)
  })

  test('with an odd number of surahs, Patterns 2 and 4 never hold', () => {
    let seed = 3
    const random = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
    for (let trial = 0; trial < 300; trial++) {
      const n = 3 + 2 * Math.floor(random() * 99)
      const score = scoreMiniQuran(book(Array.from({ length: n }, () => 2 + Math.floor(random() * 299))))
      expect(score.patterns.pattern2).toBe(false)
      expect(score.patterns.pattern4).toBe(false)
    }
  })

  test('patterns 1 & 3 always agree, and so do 2 & 4 for an even number of surahs', () => {
    let seed = 7
    const random = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
    for (let trial = 0; trial < 500; trial++) {
      const n = 2 + Math.floor(random() * 199)
      const score = scoreMiniQuran(book(Array.from({ length: n }, () => 2 + Math.floor(random() * 299))))
      expect(score.patterns.pattern1).toBe(score.patterns.pattern3)
      if (n % 2 === 0) expect(score.patterns.pattern2).toBe(score.patterns.pattern4)
    }
  })
})
