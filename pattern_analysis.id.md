# Quran Checksum: Tinjauan Objektif atas Pola-Polanya

## Pendahuluan

Agar kajian ini tetap jujur secara ilmiah, keempat pola Quran Checksum ditinjau secara kritis di sini. Dokumen ini menjelaskan:

1. kriteria yang digunakan untuk menilai sebuah pola,
2. bagaimana masing-masing dari keempat pola memenuhi kriteria tersebut,
3. bagaimana keempat pola saling berhubungan,
4. apakah pola-pola itu juga berlaku dalam tradisi penomoran ayat lainnya, dan
5. apa yang masih belum diketahui.

## Kriteria Evaluasi

Sebuah pola dinilai **🟢 ALAMI** (risiko *cherry-picking* rendah) apabila pola tersebut:
- menggunakan seluruh data, tanpa penyaringan, pembagian, atau pengecualian yang sewenang-wenang;
- hanya menggunakan operasi sederhana (penjumlahan, pencacahan, genap/ganjil);
- berupa kesamaan yang persis, tanpa toleransi;
- secara wajar dapat dirumuskan sebelum melihat datanya.

---

## 4 Pola

Keempat pola hanya menggunakan nomor surah (A), jumlah ayat (B), dan C = A + B, atas seluruh 114 surah.

### Pola 1: 6236 / 6555 🟢 ALAMI

**Operasi:** kelompokkan surah berdasarkan apakah A + B genap atau ganjil, lalu jumlahkan A + B di setiap kelompok.
- Kelompok genap: **6236** = jumlah seluruh ayat.
- Kelompok ganjil: **6555** = jumlah nomor surah (1 + 2 + … + 114).

**Mengapa alami:** seluruh data, hanya penjumlahan dan paritas, kesamaan yang persis.

**Catatan:** total 6555 untuk nomor surah sudah pasti karena penomoran 1 sampai 114. Yang menjadi pola adalah bahwa *kelompok genap* tepat sama dengan jumlah seluruh ayat.

### Pola 2: 57 : 57 🟢 ALAMI

**Operasi:** hitung banyaknya surah yang A + B-nya genap dan yang ganjil: **57** dan **57**.

**Mengapa alami:** pencacahan sederhana atas seluruh data.

**Catatan:** pola ini harus menyangkut paritas A + B. Pembagian *nomor surah* menjadi 57 genap dan 57 ganjil berlaku untuk penomoran apa pun dari 1 sampai 114 dan tidak bermakna apa-apa.

### Pola 3: 3303 🟢 ALAMI

**Operasi:** jumlahkan nomor surah yang A + B-nya genap (F), dan jumlah ayat yang A + B-nya ganjil (G): **F = G = 3303**.

**Mengapa alami:** seluruh data, hanya penjumlahan bersyarat berdasarkan paritas.

### Pola 4: 30-27-30-27 🟢 ALAMI

**Operasi:** klasifikasikan setiap surah berdasarkan paritas A dan paritas B:

| | jumlah ayat genap | jumlah ayat ganjil |
|---|---|---|
| **nomor surah genap** | H = **30** | I = **27** |
| **nomor surah ganjil** | J = **30** | K = **27** |

**Mengapa alami:** klasifikasi menyeluruh atas semua 114 surah, tanpa pilihan pengelompokan.

---

## Temuan Utama: 4 Pola, tetapi Hanya 2 Fakta Independen

Keempat pola saling terkait secara matematis. Semuanya dapat direduksi menjadi dua fakta, yang dapat dibuktikan dengan aljabar sederhana (dan juga telah dikonfirmasi pada ribuan himpunan data yang dibangkitkan secara acak, tanpa satu pun pengecualian):

### Fakta Inti 1, Keseimbangan Jumlah: F = G (Pola 1 dan 3)

- Σ(A+B yang genap) = Σ(A yang genap) + Σ(B yang genap).
- Nilai ini sama dengan jumlah seluruh ayat tepat ketika Σ(A yang genap) = Σ(B yang ganjil), yaitu ketika F = G.
- Kelompok ganjil kemudian otomatis bernilai 6555, karena kedua kelompok selalu berjumlah 6555 + 6236.

Jadi, **Pola 1 berlaku jika dan hanya jika F = G**. Pola 3 hanya menambahkan nilai spesifik 3303.

### Fakta Inti 2, Keseimbangan Paritas: H = J (Pola 2 dan 4)

Pola 2 dan Pola 4 selalu berlaku bersama atau gagal bersama. Pembuktiannya berlaku untuk banyak surah berapa pun yang **genap**, N = 2m (untuk Al-Qur'an, N = 114 dan m = 57).

**Susunan.** Setiap surah masuk ke salah satu dari empat sel, berdasarkan paritas nomor surahnya A dan jumlah ayatnya B:

| | B genap | B ganjil |
|---|---|---|
| **A genap** | H | I |
| **A ganjil** | J | K |

Dua fakta berlaku, berapa pun jumlah ayatnya:

1. **Nomor surah 1 sampai N memuat m bilangan genap dan m bilangan ganjil**, sehingga setiap baris berisi m surah: H + I = m dan J + K = m.
2. **A + B genap tepat ketika A dan B memiliki paritas yang sama** (genap + genap atau ganjil + ganjil), sehingga surah dengan A + B genap adalah sel-sel diagonal, **H + K**, dan surah dengan A + B ganjil adalah dua sel lainnya, **I + J**.

**Pola 2 ⇒ Pola 4.** Pola 2 menyatakan bahwa banyaknya surah dengan A + B genap sama dengan banyaknya surah dengan A + B ganjil:

- H + K = I + J
- Dengan menyubstitusikan I = m − H dan K = m − J (fakta 1): H + (m − J) = (m − H) + J, sehingga 2H = 2J dan **H = J**.
- Maka I = m − H = m − J = **K**.

**Pola 4 ⇒ Pola 2.** Jika H = J dan I = K, maka H + K = J + I, dan itulah Pola 2.

**Dengan angka-angka Al-Qur'an** (m = 57): H = 30, I = 27, J = 30, K = 27. Setiap baris berjumlah 57, dan kelompok A + B genap memiliki H + K = 30 + 27 = 57 surah, sedangkan kelompok ganjil memiliki I + J = 27 + 30 = 57.

Jadi, **Pola 2 berlaku jika dan hanya jika H = J (dan I = K)**. Pola 4 hanya menambahkan nilai spesifik H = 30: Pola 2 saja juga memungkinkan, misalnya, 31-26-31-26. Dengan kata lain, Pola 4 menambahkan fakta bahwa tepat 60 surah memiliki jumlah ayat genap (H + J = 60).

**Jika banyaknya surah ganjil**, tidak satu pun dari kedua pola dapat berlaku: banyak surah yang ganjil tidak dapat dibagi menjadi dua bagian yang sama besar (Pola 2), dan baris bawah memiliki satu surah lebih banyak daripada baris atas, sehingga H = J dan I = K tidak mungkin keduanya benar (Pola 4).

### Mengapa hal ini penting

Menyajikan empat pola sebagai empat kebetulan yang saling independen, lalu mengalikan peluangnya, akan membesar-besarkan hasilnya. Hitungan yang jujur adalah **dua fakta**:

1. F = G (dengan nilai 3303), dan
2. H = J (dengan nilai 30).

---

## Tradisi penomoran ayat lainnya

Keempat pola menggunakan jumlah ayat menurut **hitungan Kufah** (6236 ayat). Teks Al-Qur'an sama di seluruh mazhab penghitungan tradisional, tetapi mazhab-mazhab itu menempatkan sebagian batas ayat secara berbeda, sehingga jumlah ayat per surah pun berbeda. Pola-pola ini telah diuji pada hitungan lain yang data per surahnya tersedia secara andal.

### Mazhab-mazhab penghitungan

Ilmu klasik penghitungan ayat (*'ilm al-'adad*) mencatat total berikut [1][2]:

| Mazhab | Total ayat | Keterangan |
|---|---|---|
| **Kufah** | **6236** | Bersanad sampai 'Ali ibn Abi Talib |
| Madinah Awal | 6217 | |
| Madinah Akhir | 6214 | |
| Makkah | 6210 | Bersanad sampai Ubayy ibn Ka'b |
| Bashrah | 6204 | |
| Damaskus | 6226 | Juga diriwayatkan 6225 atau 6227 |

### Data

Jumlah ayat per surah diambil dari teks mushaf digital yang diterbitkan oleh King Fahd Glorious Quran Printing Complex (KFGQPC) untuk 8 riwayat [3][4]:

- Setiap pasangan riwayat dari imam qiraah yang sama memberikan jumlah ayat yang identik untuk seluruh 114 surah (Hafs = Shu'bah, Warsh = Qalun, Duri = Susi, Bazzi = Qunbul).
- Data Hafs identik dengan data yang digunakan dalam proyek ini, yang juga telah dicocokkan dengan Quran.com [5] dan Wikipedia [6].

### Hitungan mana yang paling banyak digunakan

| Riwayat | Jumlah ayat dalam edisi KFGQPC | Wilayah penggunaan |
|---|---|---|
| **Hafs 'an 'Asim** | **6236 (Kufah)** | Sebagian besar dunia Islam [7] |
| Warsh 'an Nafi' | 6214 (Madinah Akhir) | Maghrib (Afrika Utara) [8][9] |
| Qalun 'an Nafi' | 6214 (Madinah Akhir) | Libya dan sebagian Tunisia [10] |
| Duri 'an Abi 'Amr | 6217 | Sudan, Somalia, dan Hadhramaut [8][11] |
| Bazzi dan Qunbul (Ibn Kathir) | 6220 | Terutama dipelajari oleh para ahli qiraah [4] |

Artikel Wikipedia tentang qiraah menyebut "sekitar 95%" umat Islam menggunakan Hafs, berdasarkan sumber yang lemah [7]; angka-angka yang lebih rinci yang beredar tidak bersumber secara andal.

### Hasil

| Hitungan | Total | Pola 1 | Pola 2 | Pola 3 (F = G) | Pola 4 (H-I-J-K) |
|---|---|---|---|---|---|
| **Kufah** (Hafs, Shu'bah) | 6236 | ✅ 6236 / 6555 | ✅ 57 : 57 | ✅ 3303 = 3303 | ✅ 30-27-30-27 |
| Madinah Akhir (Warsh, Qalun) | 6214 | ❌ kelompok genap 6610 ≠ 6214 | ❌ 61 : 53 | ❌ 3500 ≠ 3104 | ❌ 31-26-27-30 |
| Edisi Duri / Susi | 6217 | ❌ kelompok genap 6278 ≠ 6217 | ❌ 60 : 54 | ❌ 3470 ≠ 3409 | ❌ 34-23-31-26 |
| Edisi Bazzi / Qunbul (imam qiraah Makkah) | 6220 | ❌ kelompok genap 6136 ≠ 6220 | ✅ 57 : 57 | ❌ 3112 ≠ 3196 | ✅ 27-30-27-30 |

### Apa yang ditunjukkan

1. **Keseimbangan Jumlah (Pola 1 dan 3) hanya berlaku pada hitungan Kufah.** Pada hitungan lain, selisihnya jauh (misalnya 3500 berbanding 3104).
2. **Keseimbangan Paritas (Pola 2 dan 4) berlaku pada hitungan Kufah dan juga pada edisi Bazzi / Qunbul.** Hal ini sejalan dengan pengamatan sebelumnya bahwa keseimbangan paritas saja tidaklah langka.
3. Dengan demikian, pola-pola ini bukanlah sifat teks Al-Qur'an itu sendiri, melainkan sifat **pembagian ayat menurut hitungan Kufah**. Pertanyaan tentang bagaimana pola-pola ini terbentuk juga mencakup tradisi penghitungan tersebut.

### Keterbatasan

- **Edisi Duri tidak menggunakan hitungan Bashrah.** Totalnya 6217, sedangkan hitungan Bashrah berjumlah 6204 [1], dan edisi ini memiliki 285 ayat pada Al-Baqarah, sedangkan hitungan Bashrah memiliki 287. Totalnya sama dengan total hitungan Madinah Awal [1], tetapi hitungan mana yang diikuti edisi ini belum dapat dipastikan.
- **Edisi Bazzi / Qunbul memiliki 6220 ayat, bukan 6210 sebagaimana yang dilaporkan untuk hitungan Makkah** [1]. Hitungan mana yang diikuti edisi ini juga belum dapat dipastikan.
- **Dua hitungan masih belum diuji:** Bashrah (6204) dan Damaskus (6226). Tidak satu pun dari 8 riwayat dalam data KFGQPC yang digunakan di sini mengikuti kedua hitungan tersebut.

## Hal yang Masih Belum Diketahui

1. **Seberapa langka kedua fakta tersebut.** Belum ada perhitungan peluang yang sahih. Perkiraan yang bermakna memerlukan model yang realistis tentang bagaimana jumlah ayat dapat terdistribusi (misalnya, surah panjang di awal dan surah pendek di akhir, seperti dalam Al-Qur'an yang sebenarnya). Model naif dengan jumlah ayat acak yang seragam tidaklah realistis:
   - dalam model seperti itu, H = J berlaku pada sekitar 7% percobaan, sehingga keseimbangan paritas saja tidaklah langka;
   - F = G hampir tidak pernah berlaku, tetapi hanya karena jumlah ayat acak yang seragam membuat G jauh lebih besar daripada F, sehingga model itu tidak banyak berbicara tentang Al-Qur'an yang sebenarnya.
2. **Hitungan Bashrah dan Damaskus.** Hitungan Madinah Akhir dan dua edisi lainnya telah diuji (lihat di atas); hitungan Bashrah (6204) dan Damaskus (6226) belum, karena tidak tersedia data per surah yang andal.
3. **Seleksi *post hoc*.** Kedua fakta ini ditemukan melalui penjelajahan data. Bahkan pola yang sederhana pun mengandung risiko telah terpilih dari banyak pola yang dicoba.

---

## Kesimpulan

- **Keempat pola** bertumpu pada **2 fakta independen**: F = G (3303) dan H = J (30).
- Kedua fakta hanya menggunakan penjumlahan, pencacahan, dan paritas atas seluruh 114 surah, dengan kesamaan yang persis dan tanpa toleransi. Siapa pun dapat memeriksanya dengan *spreadsheet*.
- Di antara hitungan ayat yang diuji, kedua fakta hanya berlaku pada hitungan Kufah, yaitu hitungan yang digunakan oleh sebagian besar umat Islam saat ini. Edisi-edisi lain yang diuji mematahkan Keseimbangan Jumlah.
- Seberapa kecil kemungkinan fakta-fakta ini terjadi secara kebetulan masih merupakan pertanyaan terbuka yang memerlukan analisis yang cermat dan realistis sebelum klaim peluang apa pun diajukan.

**Wawasan utama:** menyatakan secara terbuka bahwa keempat pola dapat direduksi menjadi 2 fakta membuat klaim ini tetap jujur dan mudah diverifikasi.

---

## Referensi

1. "مذاهب البلدان في عدّ آي القرآن" (The regional schools of verse counting), Jamharat al-'Ulum, compiling classical and modern works on *'ilm al-'adad*, including 'Abd al-Fattah al-Qadi (d. 1403 AH), *Nafa'is al-Bayan*. https://jamharah.net/showthread.php?t=22148
2. "العد المدني والعد الكوفي" (The Medinan and Kufan counts), Islamweb, fatwa no. 75878. https://www.islamweb.net/ar/fatwa/75878/
3. King Fahd Glorious Quran Printing Complex (KFGQPC), Quran text data for developers. https://qurancomplex.gov.sa/en/techquran/dev/
4. "Quran Data KFGQPC": the KFGQPC data for 8 narrations (Hafs, Shu'bah, Warsh, Qalun, Duri, Susi, Bazzi, Qunbul). https://github.com/thetruetruth/quran-data-kfgqpc
5. Quran.com API v4, chapters (verse counts and revelation order). https://api.quran.com/api/v4/chapters
6. "List of chapters in the Quran", Wikipedia. https://en.wikipedia.org/wiki/List_of_chapters_in_the_Quran
7. "Qira'at", Wikipedia. https://en.wikipedia.org/wiki/Qira%27at
8. "Ten recitations", Wikipedia. https://en.wikipedia.org/wiki/Ten_recitations
9. "Warsh recitation", Wikipedia. https://en.wikipedia.org/wiki/Warsh_recitation
10. "Qalun", Wikipedia. https://en.wikipedia.org/wiki/Qalun
11. "Al-Douri 'an Abi 'Amr recitation", Wikipedia. https://en.wikipedia.org/wiki/Al-Douri_%27an_Abi_%27Amr_recitation
