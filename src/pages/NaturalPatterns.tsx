import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import InteractiveTable from '../components/table/InteractiveTable'
import { CoreFacts } from '../components/patterns/CoreFacts'
import { useQuranPatterns } from '../hooks/useQuranPatterns'
import { Lang, useLanguage } from '../i18n/LanguageContext'

const h2 = 'text-2xl font-bold text-gray-900'
const miniQuranLink = 'text-quran-blue font-semibold underline'

interface PageText {
  intro: ReactNode
  method: ReactNode
  surprise: ReactNode
  caveatTitle: string
  caveat: ReactNode
}

const TEXT: Record<Lang, PageText> = {
  en: {
    intro: (
      <>
        <h2 className={h2}>What is the Quran?</h2>
        <p>
          The Quran is the holy book of Islam. Muslims believe it is the word of God, revealed in Arabic to the
          Prophet Muhammad over about 23 years, from 610 to 632 CE. It is recited in prayer every day and is
          memorized in full by millions of people.
        </p>
        <p>
          The book is divided into <strong>114 chapters</strong>, each called a <em>surah</em>, and every surah is
          divided into <em>verses</em> (<em>ayat</em>). The surahs vary greatly in length: the longest, Al-Baqarah,
          has 286 verses, while the shortest have only 3. They are not arranged in the order they were revealed:
          after the short opening surah, Al-Fatihah, the long surahs come first and the short ones last. In total
          the Quran has <strong>6236 verses</strong>, using the Kufan count found in most printed copies today
          (other early counting traditions divide a few verses differently).
        </p>
        <h2 className={`${h2} pt-2`}>What this page checks</h2>
        <p>
          This page does not look at the text of the Quran at all. It uses only two numbers per surah: its
          position in the book (1 to 114) and how many verses it has. These numbers turn out to follow a set of
          simple arithmetic patterns, called here the "Quran Checksum". Below you can verify those patterns
          yourself, see how they are calculated, and judge how meaningful they are.
        </p>
      </>
    ),
    method: (
      <>
        For every surah, take its number <strong>A</strong> and its verse count <strong>B</strong>, and
        add them: <strong>C = A + B</strong>. Splitting the surahs by whether C is even or odd reveals four
        patterns. They are not independent: they reduce to the two facts below. Everything is simple sums and
        counts, with no tolerances or extra constants.
      </>
    ),
    surprise: (
      <>
        <h2 className={h2}>Why is this surprising?</h2>
        <p>
          Now look at the bottom of the table, at the TOTAL row. Column B, the verse counts, adds up
          to <strong>6236</strong>, and column A, the surah numbers, adds up to <strong>6555</strong>. Next to
          them, columns D and E split the surahs by whether A + B is even or odd, and they add up
          to <strong>6236</strong> and <strong>6555</strong> as well. How can the even group come out at exactly
          the number of verses in the whole Quran, and the odd group at exactly the sum of all surah numbers?
          Nothing ties a surah's position in the book to its length: the verse counts run 7, 286, 200, 176, …
          with no visible rule. And that is not all. In the COUNT row, the even and odd groups hold
          exactly <strong>57</strong> surahs each, half of 114. Columns F and G, which take the surah number from
          one group and the verse count from the other, both add up to <strong>3303</strong>. Columns H to K,
          which sort the surahs by whether A and B are each even or odd, count <strong>30, 27, 30, 27</strong>.
          For a text revealed piece by piece over 23 years and numbered only later, this looks like a very
          strange coincidence. But is it? The note below looks at that question.
        </p>
      </>
    ),
    caveatTitle: 'Before you conclude: this is not a true checksum',
    caveat: (
      <>
        <p className="mt-2">
          A real checksum locks the data: changing any single value breaks it. These patterns do not work
          that way. For example, if Al-Fatihah had 9 verses instead of 7, all four patterns would still hold:
          column B and column D would both become 6238, while 57 : 57, 3303 and 30-27-30-27 would not change
          at all.
        </p>
        <p className="mt-2">
          In general, adding or removing an even number of verses in any of the 57 surahs whose A + B is even
          keeps every pattern. About 1 in 4 of all possible single-surah changes (to any count from 1 to 300)
          goes undetected. Changing one of the other 57 surahs, or changing a count by an odd number, does
          break the patterns.
        </p>
        <p className="mt-2">
          The patterns are also not hard to produce on purpose: with planning, a book of 114 surahs that
          satisfies all four can be designed with mental arithmetic. The real question is whether they could
          arise <em>without</em> planning. To see how each verse count affects the patterns, build your own
          book in the{' '}
          <Link to="/mini-quran" className={miniQuranLink}>
            Mini Quran Challenge
          </Link>.
        </p>
      </>
    )
  },
  id: {
    intro: (
      <>
        <h2 className={h2}>Apa itu Al-Qur'an?</h2>
        <p>
          Al-Qur'an adalah kitab suci agama Islam. Umat Islam meyakininya sebagai firman Allah yang diwahyukan
          dalam bahasa Arab kepada Nabi Muhammad selama sekitar 23 tahun, dari tahun 610 sampai 632 M. Al-Qur'an
          dibaca dalam salat setiap hari dan dihafal secara utuh oleh jutaan orang.
        </p>
        <p>
          Kitab ini terbagi menjadi <strong>114 bab</strong> yang masing-masing disebut <em>surah</em>, dan setiap
          surah terbagi lagi menjadi <em>ayat</em>. Panjang surah sangat beragam: yang terpanjang, Al-Baqarah,
          memiliki 286 ayat, sedangkan yang terpendek hanya 3 ayat. Urutannya tidak sama dengan urutan turunnya
          wahyu: setelah surah pembuka yang pendek, Al-Fatihah, surah-surah panjang diletakkan di depan dan yang
          pendek di belakang. Secara keseluruhan Al-Qur'an memiliki <strong>6236 ayat</strong> menurut hitungan
          Kufah, yang dipakai di sebagian besar mushaf cetak saat ini (tradisi penghitungan awal lainnya membagi
          beberapa ayat secara berbeda).
        </p>
        <h2 className={`${h2} pt-2`}>Apa yang diperiksa halaman ini</h2>
        <p>
          Halaman ini sama sekali tidak melihat teks Al-Qur'an. Yang dipakai hanya dua angka untuk setiap surah:
          posisinya di dalam kitab (1 sampai 114) dan banyaknya ayat. Ternyata angka-angka ini mengikuti
          sekumpulan pola aritmetika sederhana, yang di sini disebut "Quran Checksum". Di bawah ini Anda bisa
          memverifikasi sendiri pola-pola tersebut, melihat cara menghitungnya, dan menilai seberapa bermakna
          pola-pola itu.
        </p>
      </>
    ),
    method: (
      <>
        Untuk setiap surah, ambil nomornya <strong>A</strong> dan jumlah ayatnya <strong>B</strong>, lalu
        jumlahkan: <strong>C = A + B</strong>. Jika surah-surah dikelompokkan menurut genap atau ganjilnya C,
        muncul empat pola. Keempatnya tidak saling lepas: semuanya bermuara pada dua fakta di bawah ini. Semuanya
        hanya penjumlahan dan pencacahan sederhana, tanpa toleransi atau konstanta tambahan.
      </>
    ),
    surprise: (
      <>
        <h2 className={h2}>Mengapa ini mengejutkan?</h2>
        <p>
          Sekarang lihat bagian paling bawah tabel, pada baris TOTAL. Kolom B, yaitu jumlah ayat, berjumlah
          total <strong>6236</strong>, dan kolom A, yaitu nomor surah, berjumlah total <strong>6555</strong>. Di
          sebelahnya, kolom D dan E memisahkan surah menurut genap atau ganjilnya A + B, dan totalnya juga
          <strong> 6236</strong> dan <strong>6555</strong>. Bagaimana mungkin kelompok genap berjumlah persis sama
          dengan banyaknya ayat dalam seluruh Al-Qur'an, dan kelompok ganjil persis sama dengan jumlah semua nomor
          surah? Tidak ada yang mengaitkan posisi sebuah surah dengan panjangnya: jumlah ayatnya berurutan 7, 286,
          200, 176, … tanpa aturan yang terlihat. Dan bukan hanya itu. Pada baris BANYAK SURAH, kelompok genap dan
          ganjil masing-masing berisi tepat <strong>57</strong> surah, separuh dari 114. Kolom F dan G, yang
          mengambil nomor surah dari satu kelompok dan jumlah ayat dari kelompok lainnya, sama-sama berjumlah
          <strong> 3303</strong>. Kolom H sampai K, yang memilah surah menurut genap atau ganjilnya A dan B,
          berisi <strong>30, 27, 30, 27</strong>. Untuk teks yang diwahyukan sedikit demi sedikit selama 23 tahun
          dan baru diberi nomor belakangan, ini tampak seperti kebetulan yang sangat aneh. Tapi benarkah begitu?
          Catatan di bawah ini membahas pertanyaan tersebut.
        </p>
      </>
    ),
    caveatTitle: 'Sebelum menyimpulkan: ini bukan checksum sejati',
    caveat: (
      <>
        <p className="mt-2">
          Checksum yang sebenarnya mengunci data: mengubah satu nilai saja akan merusaknya. Pola-pola ini tidak
          bekerja seperti itu. Misalnya, jika Al-Fatihah memiliki 9 ayat dan bukan 7, keempat pola tetap
          terpenuhi: kolom B dan kolom D sama-sama menjadi 6238, sedangkan 57 : 57, 3303, dan 30-27-30-27 sama
          sekali tidak berubah.
        </p>
        <p className="mt-2">
          Secara umum, menambah atau mengurangi ayat dalam jumlah genap pada salah satu dari 57 surah yang A + B-nya
          genap akan tetap mempertahankan semua pola. Sekitar 1 dari 4 kemungkinan perubahan pada satu surah (ke
          jumlah berapa pun dari 1 sampai 300) tidak terdeteksi. Mengubah salah satu dari 57 surah lainnya, atau
          mengubah jumlah ayat sebanyak bilangan ganjil, barulah merusak pola-pola tersebut.
        </p>
        <p className="mt-2">
          Pola-pola ini juga tidak sulit dibuat dengan sengaja: dengan perencanaan, sebuah kitab berisi 114 surah
          yang memenuhi keempat pola bisa dirancang hanya dengan hitungan di kepala. Pertanyaan yang sebenarnya
          adalah apakah pola-pola ini bisa muncul <em>tanpa</em> perencanaan. Untuk melihat bagaimana setiap jumlah
          ayat memengaruhi pola-pola ini, susun kitab Anda sendiri di{' '}
          <Link to="/mini-quran" className={miniQuranLink}>
            Mini Quran Challenge
          </Link>.
        </p>
      </>
    )
  }
}

export default function NaturalPatterns() {
  const { results, validation } = useQuranPatterns()
  const text = TEXT[useLanguage().lang]

  return (
    <div className="space-y-8">
      <section className="text-gray-700 leading-relaxed space-y-3">{text.intro}</section>

      <p className="text-gray-700 leading-relaxed">{text.method}</p>

      <CoreFacts results={results} validation={validation} />

      <InteractiveTable />

      <section className="text-gray-700 leading-relaxed space-y-3">{text.surprise}</section>

      <section className="bg-amber-50 border border-amber-200 rounded-lg p-5 text-sm text-gray-700 leading-relaxed">
        <h2 className="font-bold text-gray-900 text-base">{text.caveatTitle}</h2>
        {text.caveat}
      </section>
    </div>
  )
}
