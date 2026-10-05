import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { MiniQuranControls } from '../components/miniQuran/MiniQuranControls'
import { MiniQuranTable } from '../components/miniQuran/MiniQuranTable'
import { PatternStatus } from '../components/miniQuran/PatternStatus'
import { useMiniQuranBook } from '../hooks/useMiniQuranBook'
import { Lang, useLanguage } from '../i18n/LanguageContext'

const h3 = 'text-lg font-semibold text-gray-900'
const checksumLink = 'text-quran-blue font-semibold underline'

const NARRATIVE: Record<Lang, ReactNode> = {
  en: (
    <>
      <h3 className={h3}>Imagine you are in the place of the Prophet Muhammad ﷺ</h3>
      <p>
        It is the 7th century. Over the next 23 years, the Quran will reach you piece by piece: a few verses at a
        time, in response to events, questions and crises, and not in the order of the book we hold today. The
        first verses you receive will become part of surah 96; some surahs will be completed only years after they
        were begun.
      </p>
      <p>
        You cannot read or write. There are no computers and no calculators: the verses are memorized by your
        companions and written on parchment, palm stalks and bones. At the same time you are teaching, leading a
        community through war and peace, and caring for a family.
      </p>
      <p>
        You do not design a structure, and there is no time to. You never number the surahs or the verses: early
        copies of the Quran marked where verses ended but did not number them, and the verse totals used today
        (6236 in the Kufan count) were recorded later by the scholars of the counting schools. There is no report
        of you or your companions adding surah numbers to verse counts, or doing any calculation of this kind.
      </p>
      <p>
        Yet the result, under the Kufan count, satisfies the patterns on the{' '}
        <Link to="/natural-patterns" className={checksumLink}>checksum page</Link>.
      </p>
      <p>
        <strong>Now it is your turn.</strong> Choose how many surahs your book has and give each one a verse
        count. You do not even have to write the content of a single surah: you only choose the numbers. And
        unlike the Prophet, you see every total as you type and can change any number as often as you like. Can
        you make all 4 patterns hold?
      </p>
    </>
  ),
  id: (
    <>
      <h3 className={h3}>Bayangkan Anda berada di posisi Nabi Muhammad SAW</h3>
      <p>
        Saat itu abad ke-7. Selama 23 tahun ke depan, Al-Qur'an akan sampai kepada Anda sedikit demi sedikit:
        beberapa ayat setiap kali, sebagai tanggapan atas peristiwa, pertanyaan, dan krisis, dan tidak dalam urutan
        kitab yang kita pegang sekarang. Ayat-ayat pertama yang Anda terima kelak menjadi bagian dari surah 96;
        sebagian surah baru lengkap bertahun-tahun setelah dimulai.
      </p>
      <p>
        Anda tidak bisa membaca atau menulis. Tidak ada komputer dan tidak ada kalkulator: ayat-ayat dihafal oleh
        para sahabat dan ditulis di atas kulit, pelepah kurma, dan tulang. Pada saat yang sama Anda mengajar,
        memimpin sebuah komunitas melewati masa perang dan damai, serta mengurus keluarga.
      </p>
      <p>
        Anda tidak merancang sebuah struktur, dan memang tidak ada waktu untuk itu. Anda tidak pernah memberi nomor
        pada surah ataupun ayat: mushaf-mushaf awal menandai akhir setiap ayat tetapi tidak menomorinya, dan jumlah
        ayat yang dipakai sekarang (6236 menurut hitungan Kufah) baru dicatat belakangan oleh para ulama mazhab
        penghitungan ayat. Tidak ada riwayat bahwa Anda atau para sahabat menjumlahkan nomor surah dengan jumlah
        ayat, atau melakukan perhitungan semacam itu.
      </p>
      <p>
        Namun hasilnya, menurut hitungan Kufah, memenuhi pola-pola di{' '}
        <Link to="/natural-patterns" className={checksumLink}>halaman checksum</Link>.
      </p>
      <p>
        <strong>Sekarang giliran Anda.</strong> Tentukan berapa surah yang ada di kitab Anda dan beri setiap surah
        jumlah ayatnya. Anda bahkan tidak perlu menulis isi satu surah pun: Anda hanya memilih angka. Dan tidak
        seperti Nabi, Anda melihat setiap total saat mengetik dan bisa mengubah angka mana pun sesering yang Anda
        mau. Bisakah Anda membuat keempat pola terpenuhi?
      </p>
    </>
  )
}

export default function MiniQuran() {
  const { book, setSurahCount, setEntry, fillWithQuran, fillRandom, clear } = useMiniQuranBook()
  const { lang } = useLanguage()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mini Quran Challenge</h2>
        <section className="text-gray-700 leading-relaxed mt-3 space-y-3">{NARRATIVE[lang]}</section>
      </div>

      <MiniQuranControls
        surahCount={book.surahCount}
        onSurahCountChange={setSurahCount}
        onFillWithQuran={fillWithQuran}
        onFillRandom={fillRandom}
        onClear={clear}
      />

      <PatternStatus entries={book.entries} />

      <MiniQuranTable entries={book.entries} onEntryChange={setEntry} />
    </div>
  )
}
