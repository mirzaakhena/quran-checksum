# Quran Checksum: Rumus Spreadsheet untuk 4 Pola

## Pendahuluan

Dokumen ini menunjukkan cara menyusun ulang **4 pola** Quran Checksum di spreadsheet apa pun (Excel, Google Sheets, LibreOffice, Numbers), hanya dengan menggunakan nomor setiap surah dan jumlah ayatnya.

Tata letak di bawah ini persis sama dengan yang digunakan pada tabel di situs dan pada berkas siap pakai:
**[Unduh quran-checksum.xlsx](https://mirzaakhena.github.io/quran-checksum/quran-checksum.xlsx)** (juga tersedia di repositori ini di [`public/quran-checksum.xlsx`](public/quran-checksum.xlsx)).

Dalam berkas tersebut, hanya kolom A dan B yang diketik secara manual; semua nilai lainnya adalah rumus yang aktif. Ubah jumlah ayat mana pun dan Anda akan melihat pola mana yang tidak lagi berlaku.

Keempat pola tersebut tidak saling lepas. Semuanya dapat diturunkan menjadi **dua fakta inti** (lihat [Dua Fakta Inti](#dua-fakta-inti)).

---

## Pengaturan Dasar

Buat sebuah lembar kerja dengan judul kolom di baris 1 dan satu baris untuk setiap surah di baris 2 sampai 115:

| Kolom | Judul | Isi (baris 2, lalu salin ke bawah sampai baris 115) |
|---|---|---|
| **A** | Nomor Surah | 1, 2, 3, …, 114 |
| **B** | Jumlah Ayat | 7, 286, 200, 176, …, 6 (hitungan Kufah, total 6236 ayat) |
| **C** | A + B | `=A2+B2` |

Baris 116 berisi total setiap kolom (`SUM`) dan baris 117 berisi banyaknya nilai di setiap kolom (`COUNT`).

---

## Pola 1: 6236 / 6555

**Memisahkan A + B berdasarkan genap/ganjilnya menghasilkan kembali jumlah total ayat dan jumlah nomor surah.**

### Kolom tambahan

| Kolom | Judul | Rumus (baris 2) | Arti |
|---|---|---|---|
| **D** | Genap (A+B) | `=IF(MOD(C2,2)=0,C2,"")` | A + B, jika nilainya genap |
| **E** | Ganjil (A+B) | `=IF(MOD(C2,2)=1,C2,"")` | A + B, jika nilainya ganjil |

### Total

| Sel | Rumus | Hasil |
|---|---|---|
| **A116** | `=SUM(A2:A115)` | **6555** (jumlah nomor surah, 1 + 2 + … + 114) |
| **B116** | `=SUM(B2:B115)` | **6236** (jumlah total ayat) |
| **D116** | `=SUM(D2:D115)` | **6236** |
| **E116** | `=SUM(E2:E115)` | **6555** |

### Polanya

- **D116 = B116 = 6236**: nilai A + B yang genap berjumlah sama dengan jumlah total ayat.
- **E116 = A116 = 6555**: nilai A + B yang ganjil berjumlah sama dengan jumlah nomor surah.

---

## Pola 2: 57 : 57

**Tepat separuh dari seluruh surah memiliki A + B yang genap.**

### Hitungan

| Sel | Rumus | Hasil |
|---|---|---|
| **D117** | `=COUNT(D2:D115)` | **57** (surah dengan A + B genap) |
| **E117** | `=COUNT(E2:E115)` | **57** (surah dengan A + B ganjil) |

### Polanya

- **D117 = E117 = 57**, dan 57 + 57 = 114.

Catatan: pola ini menyangkut genap/ganjilnya **A + B**. Banyaknya *nomor surah* genap dan ganjil selalu 57 : 57 untuk penomoran apa pun dari 1 sampai 114, sehingga pembagian itu tidak mengatakan apa pun tentang Al-Qur'an.

---

## Pola 3: 3303

**Nomor surah yang A + B-nya genap berjumlah sama dengan jumlah ayat yang A + B-nya ganjil.**

### Kolom tambahan

| Kolom | Judul | Rumus (baris 2) | Arti |
|---|---|---|---|
| **F** | Surah jika Genap | `=IF(MOD(C2,2)=0,A2,"")` | nomor surah, jika A + B genap |
| **G** | Ayat jika Ganjil | `=IF(MOD(C2,2)=1,B2,"")` | jumlah ayat, jika A + B ganjil |

### Total

| Sel | Rumus | Hasil |
|---|---|---|
| **F116** | `=SUM(F2:F115)` | **3303** |
| **G116** | `=SUM(G2:G115)` | **3303** |

### Polanya

- **F116 = G116 = 3303**.

---

## Pola 4: 30-27-30-27

**Mengelompokkan surah berdasarkan genap/ganjilnya nomor surah dan jumlah ayat.**

### Kolom tambahan

Setiap kolom berisi `1` jika surah termasuk dalam kategori tersebut, sehingga isi kolom dapat dihitung.

| Kolom | Judul | Rumus (baris 2) | Arti |
|---|---|---|---|
| **H** | Genap-Genap | `=IF(AND(MOD(A2,2)=0,MOD(B2,2)=0),1,"")` | nomor surah genap, jumlah ayat genap |
| **I** | Genap-Ganjil | `=IF(AND(MOD(A2,2)=0,MOD(B2,2)=1),1,"")` | nomor surah genap, jumlah ayat ganjil |
| **J** | Ganjil-Genap | `=IF(AND(MOD(A2,2)=1,MOD(B2,2)=0),1,"")` | nomor surah ganjil, jumlah ayat genap |
| **K** | Ganjil-Ganjil | `=IF(AND(MOD(A2,2)=1,MOD(B2,2)=1),1,"")` | nomor surah ganjil, jumlah ayat ganjil |

### Hitungan

| Sel | Rumus | Hasil |
|---|---|---|
| **H117** | `=COUNT(H2:H115)` | **30** |
| **I117** | `=COUNT(I2:I115)` | **27** |
| **J117** | `=COUNT(J2:J115)` | **30** |
| **K117** | `=COUNT(K2:K115)` | **27** |

### Polanya

- **H = J = 30** dan **I = K = 27**.

---

## Dua Fakta Inti

Keempat pola tersebut dapat diturunkan dari dua fakta.

### Fakta Inti 1: Keseimbangan Jumlah (Pola 1 & 3)

**F = G**: Σ(A jika A + B genap) = Σ(B jika A + B ganjil).

- D116 = Σ(A jika genap) + Σ(B jika genap) = F + Σ(B jika genap).
- Jadi D116 = B116 (seluruh ayat) tepat ketika F = Σ(B jika ganjil) = G.
- E116 = A116 kemudian berlaku dengan sendirinya, karena D116 + E116 = A116 + B116 selalu berlaku.

Dengan demikian, Pola 1 adalah pernyataan yang sama dengan F = G; Pola 3 menambahkan nilai spesifik 3303.

### Fakta Inti 2: Keseimbangan Paritas (Pola 2 & 4)

**H = J**: banyaknya surah bernomor genap yang jumlah ayatnya genap sama dengan banyaknya surah bernomor ganjil yang jumlah ayatnya genap.

- A + B genap tepat ketika A dan B sama-sama genap atau sama-sama ganjil, sehingga COUNT(A + B genap) = H + K.
- Selalu ada 57 nomor surah ganjil, sehingga J + K = 57.
- Oleh karena itu, pembagian 57 : 57 (H + K = 57) berlaku tepat ketika H = J.
- Selalu ada pula 57 nomor surah genap, sehingga H + I = 57, dan I = K juga ikut berlaku.

Dengan demikian, Pola 2 adalah pernyataan yang sama dengan H = J; Pola 4 menambahkan nilai spesifik H = 30 (setara dengan: 60 surah memiliki jumlah ayat genap).

---

## Ringkasan

| Pola | Nilai | Kolom | Pemeriksaan | Fakta inti |
|---|---|---|---|---|
| **1** | **6236 / 6555** | D, E vs B, A | D116 = B116, E116 = A116 | Keseimbangan Jumlah |
| **2** | **57 : 57** | D, E | D117 = E117 | Keseimbangan Paritas |
| **3** | **3303** | F, G | F116 = G116 | Keseimbangan Jumlah |
| **4** | **30-27-30-27** | H, I, J, K | H117 = J117, I117 = K117 | Keseimbangan Paritas |

Keempat pemeriksaan tersebut juga tersedia di lembar **Checks** pada berkas yang dapat diunduh, masing-masing dengan hasil TRUE/FALSE.
