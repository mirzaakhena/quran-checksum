// The traditional chronological order in which the 114 surahs were revealed,
// following the Egyptian standard chronological order (Robinson, "Discovering the Qur'an", 2003).
// Taken from Quran.com (API v4, chapters.revelation_order / revelation_place) and checked
// against the "Egyptian Standard Chronological Order" column of Wikipedia's
// "List of chapters in the Quran": both sources agree on every surah.

export type RevelationPlace = 'meccan' | 'medinan'

export interface RevelationStep {
  surah: number
  place: RevelationPlace
}

export const REVELATION_ORDER: RevelationStep[] = [
  { surah: 96, place: 'meccan' }, { surah: 68, place: 'meccan' }, { surah: 73, place: 'meccan' }, { surah: 74, place: 'meccan' }, { surah: 1, place: 'meccan' }, { surah: 111, place: 'meccan' },
  { surah: 81, place: 'meccan' }, { surah: 87, place: 'meccan' }, { surah: 92, place: 'meccan' }, { surah: 89, place: 'meccan' }, { surah: 93, place: 'meccan' }, { surah: 94, place: 'meccan' },
  { surah: 103, place: 'meccan' }, { surah: 100, place: 'meccan' }, { surah: 108, place: 'meccan' }, { surah: 102, place: 'meccan' }, { surah: 107, place: 'meccan' }, { surah: 109, place: 'meccan' },
  { surah: 105, place: 'meccan' }, { surah: 113, place: 'meccan' }, { surah: 114, place: 'meccan' }, { surah: 112, place: 'meccan' }, { surah: 53, place: 'meccan' }, { surah: 80, place: 'meccan' },
  { surah: 97, place: 'meccan' }, { surah: 91, place: 'meccan' }, { surah: 85, place: 'meccan' }, { surah: 95, place: 'meccan' }, { surah: 106, place: 'meccan' }, { surah: 101, place: 'meccan' },
  { surah: 75, place: 'meccan' }, { surah: 104, place: 'meccan' }, { surah: 77, place: 'meccan' }, { surah: 50, place: 'meccan' }, { surah: 90, place: 'meccan' }, { surah: 86, place: 'meccan' },
  { surah: 54, place: 'meccan' }, { surah: 38, place: 'meccan' }, { surah: 7, place: 'meccan' }, { surah: 72, place: 'meccan' }, { surah: 36, place: 'meccan' }, { surah: 25, place: 'meccan' },
  { surah: 35, place: 'meccan' }, { surah: 19, place: 'meccan' }, { surah: 20, place: 'meccan' }, { surah: 56, place: 'meccan' }, { surah: 26, place: 'meccan' }, { surah: 27, place: 'meccan' },
  { surah: 28, place: 'meccan' }, { surah: 17, place: 'meccan' }, { surah: 10, place: 'meccan' }, { surah: 11, place: 'meccan' }, { surah: 12, place: 'meccan' }, { surah: 15, place: 'meccan' },
  { surah: 6, place: 'meccan' }, { surah: 37, place: 'meccan' }, { surah: 31, place: 'meccan' }, { surah: 34, place: 'meccan' }, { surah: 39, place: 'meccan' }, { surah: 40, place: 'meccan' },
  { surah: 41, place: 'meccan' }, { surah: 42, place: 'meccan' }, { surah: 43, place: 'meccan' }, { surah: 44, place: 'meccan' }, { surah: 45, place: 'meccan' }, { surah: 46, place: 'meccan' },
  { surah: 51, place: 'meccan' }, { surah: 88, place: 'meccan' }, { surah: 18, place: 'meccan' }, { surah: 16, place: 'meccan' }, { surah: 71, place: 'meccan' }, { surah: 14, place: 'meccan' },
  { surah: 21, place: 'meccan' }, { surah: 23, place: 'meccan' }, { surah: 32, place: 'meccan' }, { surah: 52, place: 'meccan' }, { surah: 67, place: 'meccan' }, { surah: 69, place: 'meccan' },
  { surah: 70, place: 'meccan' }, { surah: 78, place: 'meccan' }, { surah: 79, place: 'meccan' }, { surah: 82, place: 'meccan' }, { surah: 84, place: 'meccan' }, { surah: 30, place: 'meccan' },
  { surah: 29, place: 'meccan' }, { surah: 83, place: 'meccan' }, { surah: 2, place: 'medinan' }, { surah: 8, place: 'medinan' }, { surah: 3, place: 'medinan' }, { surah: 33, place: 'medinan' },
  { surah: 60, place: 'medinan' }, { surah: 4, place: 'medinan' }, { surah: 99, place: 'medinan' }, { surah: 57, place: 'medinan' }, { surah: 47, place: 'medinan' }, { surah: 13, place: 'medinan' },
  { surah: 55, place: 'medinan' }, { surah: 76, place: 'medinan' }, { surah: 65, place: 'medinan' }, { surah: 98, place: 'medinan' }, { surah: 59, place: 'medinan' }, { surah: 24, place: 'medinan' },
  { surah: 22, place: 'medinan' }, { surah: 63, place: 'medinan' }, { surah: 58, place: 'medinan' }, { surah: 49, place: 'medinan' }, { surah: 66, place: 'medinan' }, { surah: 64, place: 'medinan' },
  { surah: 61, place: 'medinan' }, { surah: 62, place: 'medinan' }, { surah: 48, place: 'medinan' }, { surah: 5, place: 'medinan' }, { surah: 9, place: 'medinan' }, { surah: 110, place: 'medinan' },
]
