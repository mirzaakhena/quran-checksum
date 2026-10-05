// Every piece of interface text, in English and Indonesian.
// The Indonesian object is typed as Strings, so a key missing from it is a compile error.
// Longer narrative passages live next to their page as JSX (see pages/NaturalPatterns.tsx).

export type ColumnId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K'

interface PatternInfoText {
  title: string
  description: string
  formula: string
}

interface ModalValues {
  F: number
  G: number
  H: number
  J: number
}

const en = {
  layout: {
    subtitle: 'Two facts hidden in the surah numbers and verse counts of the Quran, which you can check yourself.',
    navChecksum: 'The Checksum',
    navMiniQuran: 'Mini Quran Challenge',
    githubLabel: 'Source code on GitHub',
    languageLabel: 'Language',
    footerData: 'Data: 114 surahs, 6236 verses (Kufan count)',
    footerMadeBy: 'Made by',
    footerPurpose: 'Educational purposes only'
  },
  docs: {
    labels: { formulas: 'Formulas', analysis: 'Analysis', critiques: 'Critiques' } as Record<string, string>,
    source: 'Source:',
    onGithub: 'on GitHub',
    loading: 'Loading…'
  },
  coreFacts: {
    sumBalance: 'Sum Balance',
    parityBalance: 'Parity Balance',
    pattern: (n: number) => `Pattern ${n}`,
    formula1: 'Σ(A+B even) = Σ verses, Σ(A+B odd) = Σ surah numbers',
    formula2: 'Surahs with even (A+B) : odd (A+B)',
    formula3: 'F = Σ(A where A+B even), G = Σ(B where A+B odd)',
    formula4: 'COUNT of H (even-even), I (even-odd), J (odd-even), K (odd-odd)',
    expected: (value: string) => `❌ Expected ${value}`
  },
  table: {
    title: 'All 114 Surahs',
    hint: 'Click a column header or a total to see its pattern. Hover a cell to see how it is calculated.',
    download: '⬇ Download Excel',
    surahName: 'Surah Name',
    surah: 'Surah',
    surahN: (n: number) => `Surah ${n}`,
    formulaPrefix: 'Formula:',
    clickForDetails: 'Click for details',
    total: 'TOTAL',
    count: 'COUNT',
    sumNotShown: 'Sum not displayed (derived value)',
    countBelow: 'Count values moved to COUNT row below',
    totalFor: (col: string, total: number) => `Total for column ${col}: ${total}`,
    clickForPattern: 'Click for pattern significance',
    countOf: (col: string, count: number) => `Count of non-empty values in column ${col}: ${count}`,
    partOfPattern2: 'Part of Pattern 2: 57:57 Distribution',
    partOfPattern4: 'Part of Pattern 4: 30-27-30-27 Parity Matrix',
    countNotRelevant: 'Count not relevant for this column',
    showingFirst: (shown: number, total: number) => `📊 Showing first ${shown} rows of ${total} total surahs`,
    showAll: (total: number) => `Show all ${total} rows`,
    showingAll: (total: number) => `📊 Showing all ${total} surahs`,
    showFirst: (shown: number) => `Show only first ${shown} rows`
  },
  columns: {
    A: { description: 'Surah Number', formula: 'Surah index (1-114)' },
    B: { description: 'Verse Count', formula: 'Number of verses in surah' },
    C: { description: 'A + B', formula: 'Surah number + verse count' },
    D: { description: 'Even (A+B)', formula: 'IF(A+B is even, A+B, "")' },
    E: { description: 'Odd (A+B)', formula: 'IF(A+B is odd, A+B, "")' },
    F: { description: 'Surah if Even', formula: 'IF(A+B is even, A, "")' },
    G: { description: 'Verses if Odd', formula: 'IF(A+B is odd, B, "")' },
    H: { description: 'Even-Even', formula: 'IF(A even AND B even, ✓, "")' },
    I: { description: 'Even-Odd', formula: 'IF(A even AND B odd, ✓, "")' },
    J: { description: 'Odd-Even', formula: 'IF(A odd AND B even, ✓, "")' },
    K: { description: 'Odd-Odd', formula: 'IF(A odd AND B odd, ✓, "")' }
  } as Record<ColumnId, { description: string; formula: string }>,
  tooltip: {
    column: (col: string) => `Column ${col}`,
    calculation: 'Calculation:',
    formula: 'Formula:',
    even: 'even',
    odd: 'odd',
    empty: 'empty',
    surahNumber: (a: number) => `Surah number: ${a}`,
    verseCount: (b: number) => `Verse count: ${b}`,
    toSurah: (a: number) => `surah ${a}`,
    toVerses: (b: number) => `verses ${b}`,
    combo: (a: number, aParity: string, b: number, bParity: string) => `Surah ${a} (${aParity}) & ${b} verses (${bParity}) → ✓`,
    notCombo: (combo: string) => `Not ${combo} combination → empty`,
    combos: { H: 'even-even', I: 'even-odd', J: 'odd-even', K: 'odd-odd' } as Record<string, string>,
    unknown: 'Unknown calculation',
    contextAB: 'Pattern 1 reference totals (ΣA = 6555, ΣB = 6236)',
    contextDE: 'Patterns 1 & 2: Even/Odd A+B (6236/6555, 57:57)',
    contextFG: 'Pattern 3: Conditional Symmetry (3303/3303), same fact as Pattern 1',
    contextHK: 'Pattern 4: 30-27-30-27 Parity Matrix, same fact as Pattern 2',
    contextDefault: 'Mathematical relationship in Quran structure'
  },
  modal: {
    close: 'Close modal',
    holds: '✓ Holds',
    expected: (value: string | number) => `✗ Expected ${value}`,
    formula: 'Formula',
    explanation: 'Explanation',
    sum: (value: number) => `Sum = ${value}`,
    pattern1: {
      title: 'Pattern 1: Perfect Balance',
      description: 'Splitting A+B by parity: the even group sums to the total verse count (6236) and the odd group sums to the sum of surah numbers (6555)',
      formula: 'Σ(A+B where even) = Σ(Verse Counts), Σ(A+B where odd) = Σ(Surah Numbers)'
    } as PatternInfoText,
    pattern1Explanation: (fact: string, v: ModalValues) =>
      `Core fact "${fact}": Pattern 1 holds exactly when Pattern 3 does. The even group of A+B is Σ(A where even) + Σ(B where even), and the total verse count is Σ(B where even) + Σ(B where odd), so the two are equal exactly when F = G (currently F = ${v.F}, G = ${v.G}). The odd group then equals 6555, because the two groups together always add up to 6555 + 6236.`,
    pattern2: {
      title: 'Pattern 2: 57:57 Distribution',
      description: 'Perfect split between surahs whose A+B is even and surahs whose A+B is odd',
      formula: 'COUNT(A+B even) : COUNT(A+B odd)'
    } as PatternInfoText,
    pattern2Explanation: (fact: string, v: ModalValues) =>
      `Core fact "${fact}": Pattern 2 holds exactly when Pattern 4 does. A+B is even exactly when A and B are both even (H) or both odd (K). Since there are always 57 even and 57 odd surah numbers, the 57:57 split holds exactly when H = J (currently H = ${v.H}, J = ${v.J}), and then I = K as well.`,
    pattern3: {
      title: 'Pattern 3: 3303 Symmetry',
      description: 'Surah numbers where A+B is even add up to the same total as verse counts where A+B is odd',
      formula: 'F = Σ(A where A+B even), G = Σ(B where A+B odd), F = G'
    } as PatternInfoText,
    pattern3Explanation: (fact: string) =>
      `Core fact "${fact}": Pattern 3 holds exactly when Pattern 1 does. F = G means the even group of A+B (F plus Σ(B where even)) equals the total verse count (G plus Σ(B where even)), which is Pattern 1. Here both sides come to 3303.`,
    pattern4: {
      title: 'Pattern 4: Parity Matrix',
      description: 'Four-way classification of surahs by the parity of the surah number and of the verse count',
      formula: 'COUNT of H (even-even) - I (even-odd) - J (odd-even) - K (odd-odd)'
    } as PatternInfoText,
    pattern4Explanation: (fact: string) =>
      `Core fact "${fact}": Pattern 4 holds exactly when Pattern 2 does. There are always 57 even and 57 odd surah numbers, so H + I = 57 and J + K = 57. The surahs with an even A+B are H + K and those with an odd A+B are I + J, so H = J (and I = K) is the same as the 57:57 split of Pattern 2. Here H = J = 30 and I = K = 27.`,
    surahNumbers: {
      title: 'Column A: Surah Numbers',
      description: 'Sequential numbering from 1 to 114',
      formula: 'Surah index position'
    } as PatternInfoText,
    surahNumbersExplanation:
      'The sum of consecutive integers from 1 to 114 always equals 6555. In Pattern 1, this is exactly the sum of A+B over the surahs whose A+B is odd.',
    verseCounts: {
      title: 'Column B: Verse Counts',
      description: 'Number of verses in each surah',
      formula: 'Actual verse count per surah'
    } as PatternInfoText,
    verseCountsExplanation:
      'The total number of verses in the Quran is 6236 (Kufan count). In Pattern 1, this is exactly the sum of A+B over the surahs whose A+B is even.',
    fallback: {
      title: 'Pattern Information',
      description: 'Mathematical relationship in Quran structure',
      formula: 'Various calculations'
    } as PatternInfoText,
    fallbackValue: 'See table',
    fallbackExpected: 'Specific values',
    fallbackExplanation: 'Click a column header or a total to see the pattern it belongs to.'
  },
  miniQuran: {
    surahCount: 'Number of surahs',
    fillQuran: "Fill with the Quran's verse counts",
    fillRandom: 'Fill with random verse counts',
    clear: 'Clear all',
    oddWarning: 'With an odd number of surahs, Patterns 2 and 4 cannot hold: they need the surahs to split into two equal halves.',
    versesOf: (n: number) => `Verses of surah ${n}`,
    enterWhole: (min: number, max: number) => `Enter a whole number from ${min} to ${max}`,
    enterAll: (min: number, max: number) => `Enter a verse count (${min}–${max}) for every surah to check the 4 patterns:`,
    done: (filled: number, total: number) => `${filled} of ${total}`,
    doneSuffix: 'done.',
    allHold: 'All 4 patterns hold',
    someHold: (passed: number) => `${passed} of 4 patterns hold`,
    isQuran: " (these are the Quran's own verse counts)",
    cmp1a: 'Σ (A+B) where even = Σ verses',
    cmp1b: 'Σ (A+B) where odd = Σ surah numbers',
    cmp2: 'surahs with even A+B = surahs with odd A+B',
    cmp3: 'Σ A where A+B even = Σ B where A+B odd (F = G)',
    cmp4a: 'even-even = odd-even (H = J)',
    cmp4b: 'even-odd = odd-odd (I = K)'
  }
}

export type Strings = typeof en

const id: Strings = {
  layout: {
    subtitle: 'Dua fakta tersembunyi dalam nomor surah dan jumlah ayat Al-Qur\'an, yang bisa Anda periksa sendiri.',
    navChecksum: 'Checksum',
    navMiniQuran: 'Mini Quran Challenge',
    githubLabel: 'Kode sumber di GitHub',
    languageLabel: 'Bahasa',
    footerData: 'Data: 114 surah, 6236 ayat (hitungan Kufah)',
    footerMadeBy: 'Dibuat oleh',
    footerPurpose: 'Hanya untuk tujuan edukasi'
  },
  docs: {
    labels: { formulas: 'Rumus', analysis: 'Analisis', critiques: 'Kritik' },
    source: 'Sumber:',
    onGithub: 'di GitHub',
    loading: 'Memuat…'
  },
  coreFacts: {
    sumBalance: 'Keseimbangan Jumlah',
    parityBalance: 'Keseimbangan Paritas',
    pattern: (n) => `Pola ${n}`,
    formula1: 'Σ(A+B genap) = Σ ayat, Σ(A+B ganjil) = Σ nomor surah',
    formula2: 'Surah dengan (A+B) genap : (A+B) ganjil',
    formula3: 'F = Σ(A jika A+B genap), G = Σ(B jika A+B ganjil)',
    formula4: 'BANYAK H (genap-genap), I (genap-ganjil), J (ganjil-genap), K (ganjil-ganjil)',
    expected: (value) => `❌ Seharusnya ${value}`
  },
  table: {
    title: 'Seluruh 114 Surah',
    hint: 'Klik judul kolom atau angka total untuk melihat polanya. Arahkan kursor ke sel untuk melihat cara menghitungnya.',
    download: '⬇ Unduh Excel',
    surahName: 'Nama Surah',
    surah: 'Surah',
    surahN: (n) => `Surah ${n}`,
    formulaPrefix: 'Rumus:',
    clickForDetails: 'Klik untuk detail',
    total: 'TOTAL',
    count: 'BANYAK SURAH',
    sumNotShown: 'Total tidak ditampilkan (nilai turunan)',
    countBelow: 'Hitungannya ada di baris BANYAK SURAH di bawah',
    totalFor: (col, total) => `Total kolom ${col}: ${total}`,
    clickForPattern: 'Klik untuk melihat arti polanya',
    countOf: (col, count) => `Banyaknya sel terisi di kolom ${col}: ${count}`,
    partOfPattern2: 'Bagian dari Pola 2: Pembagian 57:57',
    partOfPattern4: 'Bagian dari Pola 4: Matriks Paritas 30-27-30-27',
    countNotRelevant: 'Hitungan tidak relevan untuk kolom ini',
    showingFirst: (shown, total) => `📊 Menampilkan ${shown} baris pertama dari ${total} surah`,
    showAll: (total) => `Tampilkan semua ${total} baris`,
    showingAll: (total) => `📊 Menampilkan semua ${total} surah`,
    showFirst: (shown) => `Tampilkan ${shown} baris pertama saja`
  },
  columns: {
    A: { description: 'Nomor Surah', formula: 'Nomor urut surah (1-114)' },
    B: { description: 'Jumlah Ayat', formula: 'Banyaknya ayat dalam surah' },
    C: { description: 'A + B', formula: 'Nomor surah + jumlah ayat' },
    D: { description: 'Genap (A+B)', formula: 'IF(A+B genap, A+B, "")' },
    E: { description: 'Ganjil (A+B)', formula: 'IF(A+B ganjil, A+B, "")' },
    F: { description: 'Surah jika Genap', formula: 'IF(A+B genap, A, "")' },
    G: { description: 'Ayat jika Ganjil', formula: 'IF(A+B ganjil, B, "")' },
    H: { description: 'Genap-Genap', formula: 'IF(A genap AND B genap, ✓, "")' },
    I: { description: 'Genap-Ganjil', formula: 'IF(A genap AND B ganjil, ✓, "")' },
    J: { description: 'Ganjil-Genap', formula: 'IF(A ganjil AND B genap, ✓, "")' },
    K: { description: 'Ganjil-Ganjil', formula: 'IF(A ganjil AND B ganjil, ✓, "")' }
  },
  tooltip: {
    column: (col) => `Kolom ${col}`,
    calculation: 'Perhitungan:',
    formula: 'Rumus:',
    even: 'genap',
    odd: 'ganjil',
    empty: 'kosong',
    surahNumber: (a) => `Nomor surah: ${a}`,
    verseCount: (b) => `Jumlah ayat: ${b}`,
    toSurah: (a) => `surah ${a}`,
    toVerses: (b) => `ayat ${b}`,
    combo: (a, aParity, b, bParity) => `Surah ${a} (${aParity}) & ${b} ayat (${bParity}) → ✓`,
    notCombo: (combo) => `Bukan kombinasi ${combo} → kosong`,
    combos: { H: 'genap-genap', I: 'genap-ganjil', J: 'ganjil-genap', K: 'ganjil-ganjil' },
    unknown: 'Perhitungan tidak dikenal',
    contextAB: 'Total acuan Pola 1 (ΣA = 6555, ΣB = 6236)',
    contextDE: 'Pola 1 & 2: A+B genap/ganjil (6236/6555, 57:57)',
    contextFG: 'Pola 3: Simetri Bersyarat (3303/3303), fakta yang sama dengan Pola 1',
    contextHK: 'Pola 4: Matriks Paritas 30-27-30-27, fakta yang sama dengan Pola 2',
    contextDefault: 'Hubungan matematis dalam struktur Al-Qur\'an'
  },
  modal: {
    close: 'Tutup',
    holds: '✓ Terpenuhi',
    expected: (value) => `✗ Seharusnya ${value}`,
    formula: 'Rumus',
    explanation: 'Penjelasan',
    sum: (value) => `Total = ${value}`,
    pattern1: {
      title: 'Pola 1: Keseimbangan Sempurna',
      description: 'Membagi A+B berdasarkan genap/ganjil: kelompok genap berjumlah sama dengan total ayat (6236) dan kelompok ganjil berjumlah sama dengan jumlah nomor surah (6555)',
      formula: 'Σ(A+B yang genap) = Σ(Jumlah Ayat), Σ(A+B yang ganjil) = Σ(Nomor Surah)'
    },
    pattern1Explanation: (fact, v) =>
      `Fakta inti "${fact}": Pola 1 terpenuhi tepat ketika Pola 3 terpenuhi. Kelompok A+B genap sama dengan Σ(A yang genap) + Σ(B yang genap), sedangkan total ayat sama dengan Σ(B yang genap) + Σ(B yang ganjil), sehingga keduanya sama tepat ketika F = G (saat ini F = ${v.F}, G = ${v.G}). Kelompok ganjil lalu otomatis bernilai 6555, karena kedua kelompok selalu berjumlah 6555 + 6236.`,
    pattern2: {
      title: 'Pola 2: Pembagian 57:57',
      description: 'Pembagian sama rata antara surah yang A+B-nya genap dan surah yang A+B-nya ganjil',
      formula: 'BANYAK(A+B genap) : BANYAK(A+B ganjil)'
    },
    pattern2Explanation: (fact, v) =>
      `Fakta inti "${fact}": Pola 2 terpenuhi tepat ketika Pola 4 terpenuhi. A+B genap tepat ketika A dan B sama-sama genap (H) atau sama-sama ganjil (K). Karena selalu ada 57 nomor surah genap dan 57 nomor surah ganjil, pembagian 57:57 terpenuhi tepat ketika H = J (saat ini H = ${v.H}, J = ${v.J}), dan dengan begitu I = K juga.`,
    pattern3: {
      title: 'Pola 3: Simetri 3303',
      description: 'Nomor surah yang A+B-nya genap berjumlah sama dengan jumlah ayat yang A+B-nya ganjil',
      formula: 'F = Σ(A jika A+B genap), G = Σ(B jika A+B ganjil), F = G'
    },
    pattern3Explanation: (fact) =>
      `Fakta inti "${fact}": Pola 3 terpenuhi tepat ketika Pola 1 terpenuhi. F = G berarti kelompok A+B genap (F ditambah Σ(B yang genap)) sama dengan total ayat (G ditambah Σ(B yang genap)), dan itulah Pola 1. Di sini kedua sisi bernilai 3303.`,
    pattern4: {
      title: 'Pola 4: Matriks Paritas',
      description: 'Pengelompokan surah menjadi empat menurut genap/ganjilnya nomor surah dan jumlah ayat',
      formula: 'BANYAK H (genap-genap) - I (genap-ganjil) - J (ganjil-genap) - K (ganjil-ganjil)'
    },
    pattern4Explanation: (fact) =>
      `Fakta inti "${fact}": Pola 4 terpenuhi tepat ketika Pola 2 terpenuhi. Selalu ada 57 nomor surah genap dan 57 nomor surah ganjil, sehingga H + I = 57 dan J + K = 57. Surah dengan A+B genap adalah H + K, dan yang A+B-nya ganjil adalah I + J, sehingga H = J (dan I = K) sama artinya dengan pembagian 57:57 pada Pola 2. Di sini H = J = 30 dan I = K = 27.`,
    surahNumbers: {
      title: 'Kolom A: Nomor Surah',
      description: 'Penomoran berurutan dari 1 sampai 114',
      formula: 'Posisi urutan surah'
    },
    surahNumbersExplanation:
      'Jumlah bilangan bulat berurutan dari 1 sampai 114 selalu 6555. Pada Pola 1, angka ini persis sama dengan jumlah A+B dari surah-surah yang A+B-nya ganjil.',
    verseCounts: {
      title: 'Kolom B: Jumlah Ayat',
      description: 'Banyaknya ayat dalam setiap surah',
      formula: 'Jumlah ayat sebenarnya per surah'
    },
    verseCountsExplanation:
      'Total ayat Al-Qur\'an adalah 6236 (hitungan Kufah). Pada Pola 1, angka ini persis sama dengan jumlah A+B dari surah-surah yang A+B-nya genap.',
    fallback: {
      title: 'Informasi Pola',
      description: 'Hubungan matematis dalam struktur Al-Qur\'an',
      formula: 'Berbagai perhitungan'
    },
    fallbackValue: 'Lihat tabel',
    fallbackExpected: 'Nilai tertentu',
    fallbackExplanation: 'Klik judul kolom atau angka total untuk melihat pola yang terkait.'
  },
  miniQuran: {
    surahCount: 'Jumlah surah',
    fillQuran: 'Isi dengan jumlah ayat Al-Qur\'an',
    fillRandom: 'Isi dengan jumlah ayat acak',
    clear: 'Kosongkan semua',
    oddWarning: 'Jika jumlah surah ganjil, Pola 2 dan 4 tidak mungkin terpenuhi: keduanya membutuhkan surah terbagi menjadi dua bagian yang sama besar.',
    versesOf: (n) => `Jumlah ayat surah ${n}`,
    enterWhole: (min, max) => `Masukkan bilangan bulat dari ${min} sampai ${max}`,
    enterAll: (min, max) => `Isi jumlah ayat (${min}–${max}) untuk setiap surah agar 4 pola bisa diperiksa:`,
    done: (filled, total) => `${filled} dari ${total}`,
    doneSuffix: 'sudah diisi.',
    allHold: 'Keempat pola terpenuhi',
    someHold: (passed) => `${passed} dari 4 pola terpenuhi`,
    isQuran: ' (ini jumlah ayat Al-Qur\'an yang sebenarnya)',
    cmp1a: 'Σ (A+B) yang genap = Σ ayat',
    cmp1b: 'Σ (A+B) yang ganjil = Σ nomor surah',
    cmp2: 'surah dengan A+B genap = surah dengan A+B ganjil',
    cmp3: 'Σ A jika A+B genap = Σ B jika A+B ganjil (F = G)',
    cmp4a: 'genap-genap = ganjil-genap (H = J)',
    cmp4b: 'genap-ganjil = ganjil-ganjil (I = K)'
  }
}

export const STRINGS: Record<'en' | 'id', Strings> = { en, id }
