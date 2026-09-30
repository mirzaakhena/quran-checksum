import { quranData } from '../../v2/data'
import {
  startGame,
  revealSurah,
  isComplete,
  toSurahs,
  scoreMiniQuran,
  MiniQuranGame
} from '../../v2/core'

// Writes every open surah, in surah order unless an order is given
const fill = (game: MiniQuranGame, verseCountFor: (surah: number) => number, order?: number[]) => {
  const surahs = order ?? game.verseCounts.map((_, i) => i + 1)
  return surahs.reduce((g, surah) => revealSurah(g, surah, verseCountFor(surah)), game)
}

describe('Mini Quran challenge', () => {
  describe('starting a book', () => {
    test('accepts any whole number of surahs from 2 to 200', () => {
      expect(() => startGame(1)).toThrow()
      expect(() => startGame(201)).toThrow()
      expect(() => startGame(10.5)).toThrow()
      expect(startGame(2).verseCounts).toHaveLength(2)
      expect(startGame(115).verseCounts).toHaveLength(115)
      expect(startGame(200).verseCounts).toHaveLength(200)
    })
  })

  describe('writing surahs', () => {
    test('surahs can be written in any order', () => {
      const game = fill(startGame(5), () => 10, [4, 1, 5, 3, 2])
      expect(isComplete(game)).toBe(true)
      expect(game.revealed).toEqual([4, 1, 5, 3, 2])
    })

    test('a written surah is locked and can never be changed', () => {
      const game = revealSurah(startGame(10), 3, 12)
      expect(() => revealSurah(game, 3, 13)).toThrow(/cannot be changed/)
    })

    test('does not modify the previous book', () => {
      const before = startGame(10)
      revealSurah(before, 1, 7)
      expect(before.verseCounts[0]).toBeNull()
      expect(before.revealed).toEqual([])
    })

    test('accepts 2 to 300 verses and rejects anything else', () => {
      const game = startGame(10)
      expect(() => revealSurah(game, 1, 2)).not.toThrow()
      expect(() => revealSurah(game, 1, 300)).not.toThrow()
      expect(() => revealSurah(game, 1, 1)).toThrow()
      expect(() => revealSurah(game, 1, 301)).toThrow()
      expect(() => revealSurah(game, 1, 2.5)).toThrow()
      expect(() => revealSurah(game, 11, 5)).toThrow()
    })
  })

  describe('scoring', () => {
    test("the Quran's own verse counts pass all 4 patterns, whatever the writing order", () => {
      const verses = (surah: number) => quranData[surah - 1].verseCount
      const reversed = quranData.map(s => s.number).reverse()
      ;[undefined, reversed].forEach(order => {
        const score = scoreMiniQuran(toSurahs(fill(startGame(114), verses, order)))
        expect(score.allPass).toBe(true)
        expect(score.facts).toEqual({ sumBalance: true, parityBalance: true })
      })
    })

    test('a book with every surah at 10 verses fails', () => {
      expect(scoreMiniQuran(toSurahs(fill(startGame(10), () => 10))).allPass).toBe(false)
    })

    test('with an odd number of surahs, Patterns 2 and 4 never hold', () => {
      let seed = 3
      const random = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
      for (let trial = 0; trial < 300; trial++) {
        const n = 3 + 2 * Math.floor(random() * 99)
        const score = scoreMiniQuran(toSurahs(fill(startGame(n), () => 2 + Math.floor(random() * 299))))
        expect(score.patterns.pattern2).toBe(false)
        expect(score.patterns.pattern4).toBe(false)
      }
    })

    test('patterns 1 & 3 always agree, and so do 2 & 4 for an even number of surahs', () => {
      let seed = 7
      const random = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
      for (let trial = 0; trial < 500; trial++) {
        const n = 2 + Math.floor(random() * 199)
        const score = scoreMiniQuran(toSurahs(fill(startGame(n), () => 2 + Math.floor(random() * 299))))
        expect(score.patterns.pattern1).toBe(score.patterns.pattern3)
        if (n % 2 === 0) expect(score.patterns.pattern2).toBe(score.patterns.pattern4)
      }
    })

    test('small books can pass all 4 patterns', () => {
      // Surah 1 with 2 verses (A+B = 3, odd) and surah 2 with 4 verses (A+B = 6, even):
      // F = 2 = G, H = J = 1, I = K = 0, one even and one odd A+B
      const score = scoreMiniQuran([{ number: 1, verseCount: 2 }, { number: 2, verseCount: 4 }])
      expect(score.allPass).toBe(true)
    })
  })
})
