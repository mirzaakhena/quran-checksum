import { quranData, REVELATION_ORDER } from '../../v2/data'
import {
  startGame,
  revealSurah,
  nextSurah,
  isComplete,
  toSurahs,
  scoreMiniQuran,
  MiniQuranGame
} from '../../v2/core'

const fill = (game: MiniQuranGame, verseCountFor: (surah: number) => number) => {
  let g = game
  while (!isComplete(g)) {
    const surah = nextSurah(g) ?? g.verseCounts.findIndex(v => v === null) + 1
    g = revealSurah(g, surah, verseCountFor(surah))
  }
  return g
}

describe('Mini Quran challenge', () => {
  describe('starting a game', () => {
    test('accepts only an even number of surahs from 10 to 114', () => {
      expect(() => startGame(8, 'free')).toThrow()
      expect(() => startGame(11, 'free')).toThrow()
      expect(() => startGame(116, 'free')).toThrow()
      expect(startGame(10, 'free').verseCounts).toHaveLength(10)
      expect(startGame(114, 'free').verseCounts).toHaveLength(114)
    })

    test('random mode fixes a shuffled order of every surah up front', () => {
      const game = startGame(20, 'random')
      expect([...game.order!].sort((a, b) => a - b)).toEqual(Array.from({ length: 20 }, (_, i) => i + 1))
    })

    test('historical mode follows the order of revelation and needs 114 surahs', () => {
      expect(() => startGame(20, 'historical')).toThrow()
      const game = startGame(114, 'historical')
      expect(nextSurah(game)).toBe(96)
      expect(game.order).toEqual(REVELATION_ORDER.map(step => step.surah))
    })

    test('the revelation order data is a complete permutation of the 114 surahs', () => {
      expect(REVELATION_ORDER.map(s => s.surah).sort((a, b) => a - b)).toEqual(quranData.map(s => s.number))
      expect(REVELATION_ORDER.filter(s => s.place === 'meccan')).toHaveLength(86)
    })
  })

  describe('revealing surahs', () => {
    test('a revealed surah can never be changed', () => {
      const game = revealSurah(startGame(10, 'free'), 3, 12)
      expect(() => revealSurah(game, 3, 13)).toThrow(/cannot be changed/)
    })

    test('does not modify the previous game state', () => {
      const before = startGame(10, 'free')
      revealSurah(before, 1, 7)
      expect(before.verseCounts[0]).toBeNull()
      expect(before.revealed).toEqual([])
    })

    test('free mode allows any order; random and historical modes do not', () => {
      expect(() => revealSurah(startGame(10, 'free'), 7, 5)).not.toThrow()

      const historical = startGame(114, 'historical')
      expect(() => revealSurah(historical, 1, 7)).toThrow(/Surah 96 must be revealed next/)
      expect(nextSurah(revealSurah(historical, 96, 19))).toBe(68)
    })

    test('rejects verse counts outside 1 to 300 and non-existent surahs', () => {
      const game = startGame(10, 'free')
      expect(() => revealSurah(game, 1, 0)).toThrow()
      expect(() => revealSurah(game, 1, 301)).toThrow()
      expect(() => revealSurah(game, 1, 2.5)).toThrow()
      expect(() => revealSurah(game, 11, 5)).toThrow()
    })
  })

  describe('scoring', () => {
    test('the Quran itself passes all 4 patterns, in any revelation mode', () => {
      const verses = (surah: number) => quranData[surah - 1].verseCount
      ;(['free', 'random', 'historical'] as const).forEach(mode => {
        const score = scoreMiniQuran(toSurahs(fill(startGame(114, mode), verses)))
        expect(score.allPass).toBe(true)
        expect(score.facts).toEqual({ sumBalance: true, parityBalance: true })
      })
    })

    test('a book with every surah at 10 verses fails', () => {
      const score = scoreMiniQuran(toSurahs(fill(startGame(10, 'free'), () => 10)))
      expect(score.allPass).toBe(false)
    })

    test('patterns 1 & 3 and patterns 2 & 4 always agree for an even number of surahs', () => {
      let seed = 7
      const random = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
      for (let trial = 0; trial < 500; trial++) {
        const n = 10 + 2 * Math.floor(random() * 53)
        const score = scoreMiniQuran(toSurahs(fill(startGame(n, 'free'), () => 1 + Math.floor(random() * 300))))
        expect(score.patterns.pattern1).toBe(score.patterns.pattern3)
        expect(score.patterns.pattern2).toBe(score.patterns.pattern4)
      }
    })
  })
})
