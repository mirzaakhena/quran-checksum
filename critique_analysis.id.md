# Quran Checksum: Analisis Objektif atas Kritik

## Pendahuluan

Dua artikel yang telah diterbitkan mengkritik Quran Checksum:

- Martin Taverille, "Debunking the odd-even mathematical miracle in the Qur'an", *quranspotlight* [1]
- Abdullah Sameer, "Responding to the Odd/Even Math Miracle of the Quran", *FriendlyExMuslim*, 2017 [2]

Dokumen ini merangkum argumen-argumen keduanya sebagaimana tertulis dalam artikel tersebut dan menilai masing-masing. Jika suatu klaim dapat diperiksa secara numerik, klaim itu diperiksa dengan data Al-Qur'an yang digunakan dalam proyek ini.

Quran Checksum terdiri atas **4 pola** (6236/6555, 57:57, 3303, dan 30-27-30-27), yang dapat disederhanakan menjadi **2 fakta independen** (lihat [`pattern_analysis.id.md`](pattern_analysis.id.md)):

- **Keseimbangan Jumlah**: Pola 1 dan 3, yang selalu berlaku atau gagal bersamaan
- **Keseimbangan Paritas**: Pola 2 dan 4, yang selalu berlaku atau gagal bersamaan

---

## Artikel 1: Martin Taverille (quranspotlight)

### 1. "Satu kebetulan, bukan dua"

**Klaim:** kedua keseimbangan (kelompok ganjil = 6555, kelompok genap = 6236) hanyalah satu kebetulan, karena jumlah kedua kelompok itu selalu sama dengan total seluruh nomor surah ditambah seluruh ayat. Keduanya dapat disederhanakan menjadi satu kesamaan, "total ayat dalam kelompok s+a ganjil = total nomor surah dalam kelompok s+a genap", yang menurutnya bernilai 3303.

**Penilaian:**
- ✅ **Benar.** Inilah tepatnya kesetaraan Pola 1 dan 3 yang digunakan dalam proyek ini: ia sudah lebih dahulu menunjukkan bahwa Pola 1 dan keseimbangan 3303 adalah fakta yang sama.
- ⚠️ **Tidak mencakup semuanya:** pembagian 57 : 57 (Pola 2) dan matriks paritas (Pola 4) merupakan fakta tersendiri, yang tidak dibahas dalam artikel itu selain catatan bahwa pembagian tersebut "kebetulan tepat setengah".

**Kesimpulan:** diterima. Kedua jumlah itu adalah satu fakta, bukan dua (atau tiga).

### 2. "Penomoran ayat bukan bagian dari wahyu"

**Klaim:** pembagian ke dalam ayat-ayat tidak diwahyukan, tetapi disusun belakangan; mazhab-mazhab yang berbeda menghasilkan total yang berbeda (6204, 6226, dan lainnya), dan hitungan Kufah 6236 sekadar menjadi yang paling populer. Mushaf yang mengikuti riwayat Warsh memiliki 6214 ayat.

**Penilaian:**
- ✅ **Benar secara faktual:** terdapat beberapa hitungan ayat tradisional, dan hitungan Kufah adalah hitungan yang dipakai dalam bacaan Hafs yang diikuti sebagian besar umat Islam saat ini.
- ✅ **Kini telah diuji:** pola-pola tersebut diperiksa pada jumlah ayat menurut riwayat-riwayat lain (lihat [`pattern_analysis.id.md`](pattern_analysis.id.md#tradisi-penomoran-ayat-lainnya)). Keseimbangan Jumlah berlaku **hanya** pada hitungan Kufah; pada hitungan Warsh/Qalun (6214), keempat pola gagal.
- ⚠️ **Konteks:** hitungan Kufah tidak dipilih untuk analisis ini karena menghasilkan pola-pola tersebut; hitungan ini adalah hitungan dari bacaan yang paling luas digunakan.

**Kesimpulan:** poin yang sah, dan hasil pengujian mendukungnya: pola-pola ini adalah sifat dari pembagian ayat menurut hitungan Kufah, bukan sifat teks Al-Qur'an itu sendiri.

### 3. "Ini bukan checksum"

**Klaim:** berlawanan dengan klaim bahwa pola-pola ini melindungi penomoran teks, banyak perubahan yang tidak merusaknya: menambahkan atau mengurangkan kelipatan 2 berapa pun pada jumlah ayat surah mana pun dalam kelompok s+a genap, atau menukar jumlah ayat dua surah bernomor genap (atau dua surah bernomor ganjil) yang jumlah ayatnya sama-sama genap atau sama-sama ganjil. Sebuah lembar kerja (spreadsheet) disertakan.

**Penilaian:**
- ✅ **Benar, dan terkonfirmasi:** setiap kemungkinan perubahan pada satu surah telah diuji; 8.493 dari 34.086 (sekitar 1 dari 4) tetap memenuhi keempat pola, dan semuanya tepat berupa perubahan genap yang ia jelaskan. Contoh penukarannya (dua surah bernomor genap dengan jumlah ayat genap, seperti surah 2 dan 4) juga tetap memenuhi keempat pola.

**Kesimpulan:** diterima. Situs ini kini mencantumkan penafian bahwa ini bukan checksum yang sesungguhnya.

### 4. "Kecocokan ini jauh lebih mungkin terjadi daripada kelihatannya"

**Klaim:** total ayat (6236) dan total nomor surah (6555) berukuran serupa, sehingga tidak mengherankan bila pemilihan sekitar separuh surah menghasilkan jumlah yang cocok di sekitar 3303. Karena surah-surah diurutkan kurang lebih dari yang terpanjang ke yang terpendek, jumlah nomor surah yang terpilih dan jumlah ayat surah-surah lainnya saling berkorelasi, bukan independen.

**Penilaian:**
- ✅ **Poin statistik yang valid:** setiap perkiraan yang realistis harus memperhitungkan bentuk data yang sebenarnya (surah panjang di awal, surah pendek di akhir), bukan memperlakukan angka-angka itu sebagai independen.
- ❓ **Belum dikuantifikasi untuk data sebenarnya:** argumen ini menunjukkan mengapa suatu kecocokan masuk akal, tetapi probabilitas sebenarnya tetap bergantung pada model yang realistis.

**Kesimpulan:** valid, dan justru inilah alasan perkiraan probabilitas yang naif (baik yang mendukung maupun yang menentang) tidak boleh dipercaya.

### 5. "Simulasi komputer: sekitar 1 banding 170"

**Klaim:** dengan menggunakan daftar jumlah ayat sintetis yang distribusinya miring seperti distribusi Al-Qur'an, dan memilih 57 surah secara acak, kecocokan antara nomor surah yang terpilih dan ayat surah-surah lainnya terjadi sekitar 1 kali dalam 170 percobaan. Karena banyak cara lain untuk membagi surah-surah yang bisa saja dicoba, dan setiap pembagian memberi dua peluang untuk cocok, peluang menemukan suatu kecocokan jauh lebih tinggi: sekitar 1 banding 17 setelah mencoba 10 kriteria pemilihan.

**Penilaian:**
- ✅ **Metodenya sesuai dengan pertanyaan yang diajukan:** metode ini memperkirakan seberapa mungkin *suatu* cara membagi surah-surah menghasilkan kecocokan, dan itulah pertanyaan yang tepat untuk kekhawatiran *post hoc* (poin 6).
- ⚠️ **Keterbatasan:** jumlah ayatnya sintetis, bukan yang sebenarnya; aturan ganjil/genap bukanlah pemilihan 57 surah secara acak; dan simulasi ini hanya mencakup Keseimbangan Jumlah, tidak mencakup Keseimbangan Paritas.

**Kesimpulan:** perkiraan yang wajar berdasarkan asumsi-asumsinya; perkiraan ini belum direplikasi pada data sebenarnya.

### 6. "Kekeliruan penembak jitu Texas"

**Klaim:** banyak upaya telah dicurahkan untuk mencari pola numerik dalam kitab-kitab suci; mencoba ratusan calon pola membuat ditemukannya suatu kecocokan menjadi mungkin, dan para pencarinya tidak memiliki hipotesis awal yang meramalkan pola khusus ini.

**Penilaian:**
- ⚠️ **Sebagian valid:** keempat pola ditemukan dengan menjelajahi data, sehingga masih ada risiko seleksi.
- **Mitigasi:** pola-pola ini sangat sederhana (penjumlahan, pencacahan, dan paritas atas seluruh surah, kesamaan persis, tanpa toleransi), sehingga hanya menyisakan sedikit ruang untuk penyetelan.

**Kesimpulan:** kekhawatiran yang valid. Kesederhanaan menguranginya, tetapi tidak menghilangkannya.

### 7. Adendum: "pola ini juga bisa dibuat dengan sengaja"

**Klaim:** penulis menganggap sifat ini sebagai kebetulan yang tidak disengaja, tetapi dalam sebuah komentar ia mencatat bahwa sifat ini mudah dibuat dengan sengaja, yaitu dengan menyesuaikan cara membagi teks yang sudah jadi ke dalam ayat-ayat hingga satu-satunya pasangan jumlah itu (3303 = 3303) cocok.

**Penilaian:**
- ✅ **Sejalan dengan temuan proyek ini sendiri:** dengan perencanaan, sebuah kitab berisi 114 surah yang memenuhi keempat pola dapat dirancang hanya dengan berhitung di luar kepala.
- ⚠️ **Bukan klaim adanya rancangan:** penulis secara tegas tidak berpendapat bahwa ada orang yang melakukannya.

**Kesimpulan:** benar sebagai pernyataan tentang tingkat kesulitan; pernyataan ini tidak mengatakan apa pun tentang bagaimana penomoran yang sebenarnya terbentuk.

---

## Artikel 2: Abdullah Sameer (FriendlyExMuslim)

### 1. "Checksum yang lemah: rentan terhadap modifikasi berat"

**Klaim:** untuk setiap surah dari 57 surah yang totalnya genap, jumlah ayatnya dapat diubah sebesar bilangan genap (misalnya Al-Fatihah dari 7 menjadi 9, 11, 13, dan seterusnya, atau Al-Baqarah dari 286 menjadi 288, 300, dan seterusnya) tanpa merusak "checksum".

**Penilaian:**
- ✅ **Benar, dan terkonfirmasi:** Al-Fatihah dengan 9, 11, atau 13 ayat dan Al-Baqarah dengan 288, 300, 302, atau 306 ayat semuanya tetap memenuhi keempat pola. Ini adalah kelemahan yang sama dengan yang dijelaskan Taverille (Artikel 1, poin 3).

**Kesimpulan:** diterima.

### 2. "Miliaran demi miliaran kombinasi"

**Klaim:** jika surah-surah dibagi ke dalam empat kelompok (nomor surah ganjil atau genap, jumlah ayat ganjil atau genap), jumlah ayat dapat diacak di dalam setiap kelompok tanpa mengubah total 6555 dan 6236; menghitung banyaknya urutan menghasilkan angka seperti 10^24 hingga 10^32 per kelompok. Sebuah berkas Excel, sebuah program, dan 1000 contoh hasil disertakan.

**Penilaian:**
- ✅ **Aturannya benar:** seluruh 1.550 kemungkinan penukaran antara dua surah dalam kelompok yang sama tetap memenuhi keempat pola.
- ⚠️ **Satu contoh keliru:** contoh dalam artikel tersebut, yaitu menukar Al-Fatihah dengan Al-An'am, merusak Pola 1 dan 3, karena kedua surah itu berada dalam kelompok yang berbeda (Al-Fatihah bernomor surah ganjil, sedangkan Al-An'am bernomor genap).

**Kesimpulan:** diterima untuk aturannya; contoh tersebut sebaiknya diabaikan.

### 3. "57 : 57 tidak mengejutkan"

**Klaim:** total setiap surah (nomor surah + jumlah ayat) pasti ganjil atau genap, sehingga kira-kira separuh ganjil dan separuh genap memang sudah dapat diduga.

**Penilaian:**
- ✅ **Benar secara substansi:** jika setiap total memiliki peluang yang sama untuk ganjil atau genap, pembagian tepat 57 : 57 akan terjadi sekitar 7,5% dari waktu (1 banding 13). Angka yang sama (sekitar 7%) juga muncul dalam simulasi Keseimbangan Paritas yang dilakukan proyek ini sendiri.

**Kesimpulan:** diterima: Keseimbangan Paritas, jika berdiri sendiri, tidaklah istimewa.

### 4. "Operasi yang arbitrer: mengapa nomor surah + jumlah ayat?"

**Klaim:** tidak ada alasan yang jelas mengapa nomor surah harus ditambahkan pada jumlah ayat; hal ini lebih tampak seperti upaya mencari-cari sesuatu daripada maksud sang pengarang.

**Penilaian:**
- ⚠️ **Poin yang valid:** tidak ada alasan teologis yang diberikan untuk operasi ini.
- **Jawaban parsial:** penjumlahan dan genap/ganjil termasuk operasi paling sederhana yang mungkin dilakukan pada kedua angka ini, sehingga membatasi (tetapi tidak menghilangkan) ruang untuk memilihnya setelah kejadian.

**Kesimpulan:** kekhawatiran yang sah dan perlu diakui secara terbuka.

### 5. "Tidak ada pola bermakna dalam angka-angkanya"

**Klaim:** total-total tersebut (8, 288, 203, 180, 125, 171, …) tidak mengikuti pola apa pun; tanda yang bermakna seharusnya berupa sesuatu seperti barisan Fibonacci, rasio emas, atau bilangan prima.

**Penilaian:**
- ⚠️ **Tidak relevan dengan checksum:** keempat pola adalah jumlah dan cacahan yang eksak, bukan klaim tentang barisan semacam itu. Ketiadaan barisan seperti itu tidak mengatakan apa pun, baik mendukung maupun menentang, kedua fakta inti.

**Kesimpulan:** benar sebagai deskripsi angka-angkanya, tetapi tidak menyentuh pola-pola tersebut.

---

## Argumen Tandingan

### Terhadap Artikel 1

1. **Hitungan Kufah tidak dipilih demi pola:** hitungan ini adalah hitungan dari bacaan yang paling luas digunakan saat ini.
2. **Simulasinya menggunakan data sintetis:** angka 1 banding 170 sebaiknya direplikasi dengan jumlah ayat yang sebenarnya sebelum diterima sebagai probabilitas untuk Al-Qur'an.
3. **Dua fakta, bukan satu:** sekalipun "hanya satu kebetulan" diterima untuk jumlah-jumlahnya, keseimbangan paritas tetap merupakan fakta tersendiri (meskipun, sebagaimana dicatat Artikel 2, bukan fakta yang langka).

### Terhadap Artikel 2

1. **Pola-polanya sederhana dan eksak:** pola-pola ini hanya menggunakan penjumlahan, pencacahan, dan paritas atas seluruh 114 surah, tanpa toleransi.
2. **Dapat dimodifikasi tidak sama dengan probabilitas:** menunjukkan bahwa kumpulan data lain juga memenuhi pola-pola tersebut tidak menunjukkan seberapa besar kemungkinan munculnya kumpulan data yang asli.

---

## Kelemahan dalam Klaim Checksum

### Poin yang diajukan para kritikus dan valid

1. **Penghitungan ganda:** keempat pola hanyalah 2 fakta independen.
2. **Bukan checksum:** sekitar 1 dari 4 dari seluruh perubahan pada satu surah, dan setiap penukaran di dalam satu kelompok paritas, tidak merusak pola-pola tersebut.
3. **Keseimbangan Paritas tidak langka:** pembagian tepat 57 : 57 terjadi secara kebetulan sekitar 7,5% dari waktu.
4. **Pola-pola ini bergantung pada pembagian ayat menurut hitungan Kufah:** pola-pola ini tidak berlaku pada edisi-edisi lain yang diuji.
5. **Operasi yang arbitrer:** tidak ada alasan yang dinyatakan untuk menambahkan nomor surah pada jumlah ayat.
6. **Penemuan *post hoc*:** pola-pola ini ditemukan berabad-abad kemudian dengan menjelajahi data, dan banyak pembagian lain yang bisa saja dicoba.
7. **Mudah dibuat dengan sengaja:** dengan perencanaan, pola-pola ini dapat dirancang dengan aritmetika sederhana.

### Yang tetap bertahan

**Keseimbangan Jumlah** (3303 = 3303, atau setara dengan 6236 / 6555) pada hitungan Kufah: eksak, sederhana, dan dapat diverifikasi oleh siapa saja dengan sebuah spreadsheet. Seberapa kecil kemungkinannya terjadi secara kebetulan belum dapat dipastikan untuk data sebenarnya.

---

## Kesimpulan Objektif

### Poin kritikus yang valid
- ✅ Keseimbangan jumlah adalah satu fakta, bukan dua (Taverille).
- ✅ Pola-pola ini tidak berfungsi sebagai checksum (kedua artikel).
- ✅ Pembagian 57 : 57, jika berdiri sendiri, tidak mengejutkan (Sameer).
- ✅ Pola-pola ini bergantung pada pembagian ayat menurut hitungan Kufah (Taverille; dikonfirmasi melalui pengujian riwayat-riwayat lain).
- ✅ Penemuan *post hoc* menimbulkan risiko bias seleksi (Taverille).

### Poin kritikus yang belum tuntas
- ❓ Simulasi 1 banding 170 menggunakan jumlah ayat sintetis dan belum direplikasi pada data sebenarnya.
- ❓ "Dapat dimodifikasi" tidak menjawab seberapa besar kemungkinan susunan aslinya.

### Rekomendasi
1. **Sajikan keempat pola sebagai 2 fakta**, agar tidak dihitung sebagai 4 kebetulan yang independen.
2. **Uji hitungan ayat yang tersisa** (Basrah dan Damaskus).
3. **Bangun model probabilitas yang realistis** untuk Keseimbangan Jumlah berdasarkan data sebenarnya sebelum mengutip probabilitas apa pun.
4. **Akui keterbatasan secara terbuka**, sebagaimana dilakukan dokumen ini.

**Intinya:** para kritikus benar dalam sebagian besar poinnya. Yang tetap bertahan adalah satu fakta sederhana dan eksak pada pembagian ayat menurut hitungan Kufah, yaitu Keseimbangan Jumlah, yang tingkat kelangkaannya masih merupakan pertanyaan terbuka.

---

## Argumen Penulis: "Tantangan Penciptaan Acak"

Bagian ini menyajikan argumen penulis sendiri, diikuti keterbatasannya. Argumen ini berupa eksperimen pikiran; halaman [Mini Quran Challenge](https://mirzaakhena.github.io/quran-checksum/mini-quran) di situs ini adalah alat interaktif yang lebih sederhana, tempat jumlah ayat mana pun dapat diubah dengan bebas.

### Argumen 1: eksperimen pikiran "mini Quran"

**Skenario:** seseorang diminta membuat sebuah "mini Quran" dengan ketentuan berikut:
- ia boleh memilih jumlah surah (misalnya 114);
- ia boleh memilih jumlah ayat dalam setiap surah;
- ia **tidak boleh** merencanakan, menghitung, atau merancang;
- surah-surah ditentukan dalam **urutan acak** (seperti dalam pewahyuan);
- **tidak ada pembatalan**: keputusan yang sudah diambil tidak dapat direvisi;
- hasilnya tetap harus memenuhi pola-pola tersebut (6236 / 6555, 57 : 57, dan seterusnya).

#### Mengapa penulis menganggap argumen ini kuat

1. **Argumen ini mencerminkan kondisi pewahyuan yang sebenarnya**
   - Wahyu turun selama 23 tahun, secara berangsur-angsur.
   - Tidak mungkin ada perencanaan atau perhitungan.
   - Keputusan bersifat sekali jadi, tanpa revisi.
   - Urutannya tidak berurutan (periode Makkah dan Madinah).
2. **Argumen ini menghilangkan unsur "rancangan"**
   - Tanpa komputer atau kalkulator.
   - Tanpa spreadsheet untuk mencatat.
   - Tanpa kesempatan untuk menyetel.
3. **Ini adalah tantangan probabilistik**
   - Pembagian tepat 57 : 57 dan keseimbangan 6236 / 6555 harus tercapai tanpa diketahui sebelumnya.
   - Penulis memperkirakan tingkat keberhasilannya sangat rendah.

#### Tanggapan terhadap para kritikus, menurut pandangan penulis

**Simulasi 1 banding 170 dari Martin Taverille**, menurut pandangan penulis, tidak mencerminkan keputusan yang berurutan dan tidak dapat dibatalkan yang diambil tanpa mengetahui targetnya.

**Kombinasi-kombinasi Abdullah Sameer** ditemukan dengan menelusuri mundur dari rumus yang sudah diketahui, sesuatu yang tidak mungkin dilakukan dalam proses aslinya.

### Argumen 2: "manipulasi tidak membatalkan yang asli"

**Klaim para kritikus:** checksum ini mudah dimanipulasi, sehingga tidak mengesankan.

**Argumen tandingan penulis:**

1. **Kemunculan asli versus manipulasi *post hoc***
   - Yang penting adalah apakah susunan aslinya muncul tanpa rancangan.
   - Kemampuan untuk memanipulasinya setelah itu tidak mengubah probabilitas susunan aslinya.
   - Analogi: begitu hasil undian lotre diketahui, siapa pun dapat "mereproduksi" angka pemenangnya, tetapi hal itu tidak mengatakan apa pun tentang peluang kemenangan yang asli.
2. **Manipulasi memerlukan pola yang sudah ada**
   - Menunjukkan cara memanipulasi pola berarti mengakui bahwa pola itu ada.
3. **Konteks historis**
   - Pola ini ditemukan sekitar 1400 tahun setelah pewahyuan.
   - Tidak ada bukti historis tentang manipulasi yang disengaja.
   - Teksnya telah terpelihara secara konsisten.

#### Observasi eksperimental

**Uji:** menambahkan 2 ayat pada surah yang nomor surah + jumlah ayatnya genap membuat keempat pola tetap valid (sebagaimana ditunjukkan kedua artikel).

**Interpretasi:**
- ✅ Ini mengonfirmasi bahwa checksum dapat dipenuhi oleh data lain.
- ✅ Hal ini, dengan sendirinya, tidak mengatakan apa pun tentang probabilitas susunan aslinya.

### Keterbatasan argumen ini

- **Simulasi Taverille menjawab pertanyaan yang berbeda.** Simulasi itu tidak memodelkan bagaimana jumlah ayat ditentukan; simulasi itu memperkirakan seberapa sering suatu cara membagi surah-surah yang dipilih secara acak menghasilkan kecocokan, yang menjawab kekhawatiran *post hoc*. Karena itu, keberatan bahwa simulasi tersebut "tidak mencerminkan keputusan yang berurutan" meleset dari maksudnya.
- **Model acak untuk jumlah ayat adalah jenis model yang sama dengan eksperimen pikiran tersebut.** Membangkitkan jumlah ayat secara buta dan tanpa revisi, lalu memeriksa pola-polanya, tepat merupakan skenario "tanpa perencanaan, tanpa pembatalan". Perbedaan pendapat yang sebenarnya adalah **model jumlah ayat "acak" mana yang realistis**.
- **Jumlah ayat bergantung pada tradisi penghitungan.** Mazhab-mazhab tradisional membagi teks yang sama ke dalam ayat-ayat secara berbeda (hitungan Kufah dirunut hingga 'Ali ibn Abi Talib; lihat [`pattern_analysis.id.md`](pattern_analysis.id.md#tradisi-penomoran-ayat-lainnya)), dan pembagian-pembagian lainnya merusak pola-pola tersebut. Karena itu, skenario ini juga harus menjelaskan mengapa pola-pola itu muncul pada pembagian Kufah dan tidak pada pembagian lainnya.
- **Tingkat keberhasilan yang diharapkan belum dihitung.** Tanpa model yang realistis, pernyataan seperti "kecilnya luar biasa (astronomis)" belum didukung oleh angka.
- **Tantangan ini berlaku pada 2 fakta inti, bukan pada 4 pola independen,** dan Keseimbangan Paritas saja sudah terpenuhi secara kebetulan sekitar 7,5% dari waktu.

### Ringkasan

"Tantangan Penciptaan Acak" merumuskan sebuah pertanyaan nyata: *seberapa besar kemungkinan pilihan jumlah ayat yang buta dan tidak dapat dibatalkan menghasilkan fakta-fakta ini?* Menjawabnya memerlukan model probabilitas yang realistis, dan jawaban itu juga harus memperhitungkan kenyataan bahwa pola-pola tersebut hanya muncul pada pembagian ayat menurut hitungan Kufah. Sampai saat itu, eksperimen pikiran ini merupakan perumusan pertanyaan yang jelas, bukan bukti atas jawabannya.

---

## Referensi

1. Martin Taverille, "Debunking the odd-even mathematical miracle in the Qur'an", *quranspotlight* (termasuk komentar penulis tertanggal 17 Juni 2012 dan sesudahnya). https://quranspotlight.wordpress.com/articles/quran-odd-even-debunked/
2. Abdullah Sameer, "Responding to the Odd/Even Math Miracle of the Quran", *FriendlyExMuslim*, 17 Februari 2017 (diperbarui 29 November 2018). https://friendlyexmuslim.com/responding-to-the-oddeven-math-miracle-of-the-quran/
3. [`pattern_analysis.id.md`](pattern_analysis.id.md): keempat pola, kedua fakta inti, dan pengujian pada tradisi penomoran ayat lainnya, beserta referensinya sendiri.
