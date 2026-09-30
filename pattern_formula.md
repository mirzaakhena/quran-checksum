# Quran Checksum: Spreadsheet Formulas for the 4 Patterns

## Introduction

This document shows how to rebuild the **4 patterns** of the Quran Checksum in any spreadsheet (Excel, Google Sheets, LibreOffice, Numbers), using only each surah's number and its verse count.

The layout below is exactly the one used in the site's table and in the ready-made file:
**[Download quran-checksum.xlsx](https://mirzaakhena.github.io/quran-checksum/quran-checksum.xlsx)** (also in this repository at [`public/quran-checksum.xlsx`](public/quran-checksum.xlsx)).

In that file, only columns A and B are typed in; every other value is a live formula. Change any verse count and you will see which patterns break.

The four patterns are not independent. They reduce to **two core facts** (see [The Two Core Facts](#the-two-core-facts)).

---

## Basic Setup

Create a sheet with a header in row 1 and one row per surah in rows 2 to 115:

| Column | Header | Content (row 2, then fill down to row 115) |
|---|---|---|
| **A** | Surah Number | 1, 2, 3, …, 114 |
| **B** | Verse Count | 7, 286, 200, 176, …, 6 (Kufan count, 6236 verses in total) |
| **C** | A + B | `=A2+B2` |

Row 116 holds column totals (`SUM`) and row 117 holds column counts (`COUNT`).

---

## Pattern 1: 6236 / 6555

**Splitting A + B by parity gives back the total verse count and the sum of surah numbers.**

### Extra columns

| Column | Header | Formula (row 2) | Meaning |
|---|---|---|---|
| **D** | Even (A+B) | `=IF(MOD(C2,2)=0,C2,"")` | A + B, if it is even |
| **E** | Odd (A+B) | `=IF(MOD(C2,2)=1,C2,"")` | A + B, if it is odd |

### Totals

| Cell | Formula | Result |
|---|---|---|
| **A116** | `=SUM(A2:A115)` | **6555** (sum of surah numbers, 1 + 2 + … + 114) |
| **B116** | `=SUM(B2:B115)` | **6236** (total verse count) |
| **D116** | `=SUM(D2:D115)` | **6236** |
| **E116** | `=SUM(E2:E115)` | **6555** |

### The pattern

- **D116 = B116 = 6236**: the even values of A + B add up to the total verse count.
- **E116 = A116 = 6555**: the odd values of A + B add up to the sum of the surah numbers.

---

## Pattern 2: 57 : 57

**Exactly half of the surahs have an even A + B.**

### Counts

| Cell | Formula | Result |
|---|---|---|
| **D117** | `=COUNT(D2:D115)` | **57** (surahs where A + B is even) |
| **E117** | `=COUNT(E2:E115)` | **57** (surahs where A + B is odd) |

### The pattern

- **D117 = E117 = 57**, and 57 + 57 = 114.

Note: this is about the parity of **A + B**. The number of even and odd *surah numbers* is always 57 : 57 for any numbering from 1 to 114, so that split says nothing about the Quran.

---

## Pattern 3: 3303

**Surah numbers where A + B is even add up to the same total as verse counts where A + B is odd.**

### Extra columns

| Column | Header | Formula (row 2) | Meaning |
|---|---|---|---|
| **F** | Chapter if Even | `=IF(MOD(C2,2)=0,A2,"")` | the surah number, if A + B is even |
| **G** | Verses if Odd | `=IF(MOD(C2,2)=1,B2,"")` | the verse count, if A + B is odd |

### Totals

| Cell | Formula | Result |
|---|---|---|
| **F116** | `=SUM(F2:F115)` | **3303** |
| **G116** | `=SUM(G2:G115)` | **3303** |

### The pattern

- **F116 = G116 = 3303**.

---

## Pattern 4: 30-27-30-27

**Classifying surahs by the parity of the surah number and of the verse count.**

### Extra columns

Each column holds `1` when the surah falls in that category, so the column can be counted.

| Column | Header | Formula (row 2) | Meaning |
|---|---|---|---|
| **H** | Even-Even | `=IF(AND(MOD(A2,2)=0,MOD(B2,2)=0),1,"")` | even surah number, even verse count |
| **I** | Even-Odd | `=IF(AND(MOD(A2,2)=0,MOD(B2,2)=1),1,"")` | even surah number, odd verse count |
| **J** | Odd-Even | `=IF(AND(MOD(A2,2)=1,MOD(B2,2)=0),1,"")` | odd surah number, even verse count |
| **K** | Odd-Odd | `=IF(AND(MOD(A2,2)=1,MOD(B2,2)=1),1,"")` | odd surah number, odd verse count |

### Counts

| Cell | Formula | Result |
|---|---|---|
| **H117** | `=COUNT(H2:H115)` | **30** |
| **I117** | `=COUNT(I2:I115)` | **27** |
| **J117** | `=COUNT(J2:J115)` | **30** |
| **K117** | `=COUNT(K2:K115)` | **27** |

### The pattern

- **H = J = 30** and **I = K = 27**.

---

## The Two Core Facts

The four patterns can be derived from two facts.

### Core Fact 1: Sum Balance (Patterns 1 & 3)

**F = G**: Σ(A where A + B is even) = Σ(B where A + B is odd).

- D116 = Σ(A where even) + Σ(B where even) = F + Σ(B where even).
- So D116 = B116 (all verses) exactly when F = Σ(B where odd) = G.
- E116 = A116 then follows automatically, because D116 + E116 = A116 + B116 always.

Pattern 1 is therefore the same statement as F = G; Pattern 3 adds the specific value 3303.

### Core Fact 2: Parity Balance (Patterns 2 & 4)

**H = J**: as many even-numbered surahs have an even verse count as odd-numbered surahs do.

- A + B is even exactly when A and B have the same parity, so COUNT(A + B even) = H + K.
- There are always 57 odd surah numbers, so J + K = 57.
- Hence the 57 : 57 split (H + K = 57) holds exactly when H = J.
- There are also always 57 even surah numbers, so H + I = 57, and I = K follows as well.

Pattern 2 is therefore the same statement as H = J; Pattern 4 adds the specific value H = 30 (equivalently, 60 surahs have an even verse count).

---

## Summary

| Pattern | Value | Columns | Check | Core fact |
|---|---|---|---|---|
| **1** | **6236 / 6555** | D, E vs B, A | D116 = B116, E116 = A116 | Sum Balance |
| **2** | **57 : 57** | D, E | D117 = E117 | Parity Balance |
| **3** | **3303** | F, G | F116 = G116 | Sum Balance |
| **4** | **30-27-30-27** | H, I, J, K | H117 = J117, I117 = K117 | Parity Balance |

All four checks are also on the **Checks** sheet of the downloadable file, each with a TRUE/FALSE result.
