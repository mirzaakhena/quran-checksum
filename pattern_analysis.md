# Quran Checksum: An Objective Review of the Patterns

## Introduction

To keep the work scientifically honest, the 4 patterns of the Quran Checksum are reviewed critically here. This document explains:

1. the criteria used to judge a pattern,
2. how each of the 4 patterns meets them,
3. how the 4 patterns relate to each other,
4. whether they also hold under other verse-numbering traditions, and
5. what is still unknown.

## Evaluation Criteria

A pattern is rated **🟢 NATURAL** (low risk of cherry-picking) when it:
- uses the whole data set, with no arbitrary filter, split or exclusion;
- uses only simple operations (addition, counting, even/odd);
- is an exact equality, with no tolerance;
- could plausibly have been stated before looking at the data.

---

## The 4 Patterns

All four use only the surah number (A), the verse count (B) and C = A + B, over all 114 surahs.

### Pattern 1: 6236 / 6555 🟢 NATURAL

**Operation:** split the surahs by whether A + B is even or odd, and add up A + B in each group.
- Even group: **6236** = the total verse count.
- Odd group: **6555** = the sum of the surah numbers (1 + 2 + … + 114).

**Why natural:** whole data set, addition and parity only, exact equality.

**Caution:** the total of 6555 for surah numbers is fixed by the numbering 1 to 114. The pattern is that the *even group* lands exactly on the verse total.

### Pattern 2: 57 : 57 🟢 NATURAL

**Operation:** count the surahs whose A + B is even and odd: **57** and **57**.

**Why natural:** simple counting over the whole data set.

**Caution:** this must be about the parity of A + B. The split of *surah numbers* into 57 even and 57 odd is true for any numbering from 1 to 114 and means nothing.

### Pattern 3: 3303 🟢 NATURAL

**Operation:** add the surah numbers where A + B is even (F), and the verse counts where A + B is odd (G): **F = G = 3303**.

**Why natural:** whole data set, conditional sums on parity only.

### Pattern 4: 30-27-30-27 🟢 NATURAL

**Operation:** classify every surah by the parity of A and of B:

| | even verse count | odd verse count |
|---|---|---|
| **even surah number** | H = **30** | I = **27** |
| **odd surah number** | J = **30** | K = **27** |

**Why natural:** an exhaustive classification of all 114 surahs, no grouping choices.

---

## Key Finding: 4 Patterns, but Only 2 Independent Facts

The four patterns are mathematically linked. They reduce to two facts, which can be proved with simple algebra (and were also confirmed on thousands of randomly generated data sets, with no exception):

### Core Fact 1, Sum Balance: F = G (Patterns 1 and 3)

- Σ(A+B where even) = Σ(A where even) + Σ(B where even).
- This equals the total verse count exactly when Σ(A where even) = Σ(B where odd), that is, when F = G.
- The odd group then equals 6555 automatically, since both groups always add up to 6555 + 6236.

So **Pattern 1 holds if and only if F = G**. Pattern 3 adds only the specific value 3303.

### Core Fact 2, Parity Balance: H = J (Patterns 2 and 4)

Pattern 2 and Pattern 4 always hold or fail together. The proof works for any **even** number of surahs, N = 2m (for the Quran, N = 114 and m = 57).

**Setup.** Every surah falls into one of four cells, by the parity of its surah number A and its verse count B:

| | B even | B odd |
|---|---|---|
| **A even** | H | I |
| **A odd** | J | K |

Two facts hold whatever the verse counts are:

1. **The surah numbers 1 to N contain m even and m odd numbers**, so each row holds m surahs: H + I = m and J + K = m.
2. **A + B is even exactly when A and B have the same parity** (even + even or odd + odd), so the surahs with an even A + B are the diagonal cells, **H + K**, and those with an odd A + B are the other two, **I + J**.

**Pattern 2 ⇒ Pattern 4.** Pattern 2 says that as many surahs have an even A + B as an odd one:

- H + K = I + J
- Substituting I = m − H and K = m − J (fact 1): H + (m − J) = (m − H) + J, so 2H = 2J and **H = J**.
- Then I = m − H = m − J = **K**.

**Pattern 4 ⇒ Pattern 2.** If H = J and I = K, then H + K = J + I, which is Pattern 2.

**With the Quran's numbers** (m = 57): H = 30, I = 27, J = 30, K = 27. Each row adds up to 57, and the even A + B group has H + K = 30 + 27 = 57 surahs while the odd group has I + J = 27 + 30 = 57.

So **Pattern 2 holds if and only if H = J (and I = K)**. Pattern 4 adds only the specific value H = 30: Pattern 2 alone would also allow, for example, 31-26-31-26. Equivalently, it adds that exactly 60 surahs have an even verse count (H + J = 60).

**With an odd number of surahs** neither pattern can hold: an odd number of surahs cannot split into two equal halves (Pattern 2), and the bottom row has one more surah than the top row, so H = J and I = K cannot both be true (Pattern 4).

### Why this matters

Presenting four patterns as four independent coincidences, and multiplying their probabilities, would overstate the result. The honest count is **two facts**:

1. F = G (with the value 3303), and
2. H = J (with the value 30).

---

## Other Verse-Numbering Traditions

The 4 patterns use the **Kufan** verse count (6236 verses). The text of the Quran is the same across the traditional counting schools, but they place some verse boundaries differently, so the number of verses per surah differs. The patterns were tested on the other counts for which reliable per-surah data is available.

### The counting schools

The classical science of verse counting (*'ilm al-'adad*) records these totals [1][2]:

| School | Total verses | Note |
|---|---|---|
| **Kufan** | **6236** | Traced back to 'Ali ibn Abi Talib |
| First Medinan | 6217 | |
| Last Medinan | 6214 | |
| Meccan | 6210 | Traced back to Ubayy ibn Ka'b |
| Basran | 6204 | |
| Damascene | 6226 | Also reported as 6225 or 6227 |

### Data

The per-surah verse counts come from the digital mushaf texts published by the King Fahd Glorious Quran Printing Complex (KFGQPC) for 8 narrations [3][4]:

- Each pair of narrations from the same reader gives identical verse counts for all 114 surahs (Hafs = Shu'bah, Warsh = Qalun, Duri = Susi, Bazzi = Qunbul).
- The Hafs data is identical to the data used in this project, which was also checked against Quran.com [5] and Wikipedia [6].

### Which count is most used

| Narration | Verse count in the KFGQPC edition | Where it is used |
|---|---|---|
| **Hafs 'an 'Asim** | **6236 (Kufan)** | The great majority of the Muslim world [7] |
| Warsh 'an Nafi' | 6214 (Last Medinan) | The Maghreb (North Africa) [8][9] |
| Qalun 'an Nafi' | 6214 (Last Medinan) | Libya and parts of Tunisia [10] |
| Duri 'an Abi 'Amr | 6217 | Sudan, Somalia and Hadhramaut [8][11] |
| Bazzi and Qunbul (Ibn Kathir) | 6220 | Mostly studied by recitation specialists [4] |

Wikipedia's article on the readings cites "about 95%" of Muslims for Hafs, from a weak source [7]; more precise figures that circulate are not reliably sourced.

### Results

| Count | Total | Pattern 1 | Pattern 2 | Pattern 3 (F = G) | Pattern 4 (H-I-J-K) |
|---|---|---|---|---|---|
| **Kufan** (Hafs, Shu'bah) | 6236 | ✅ 6236 / 6555 | ✅ 57 : 57 | ✅ 3303 = 3303 | ✅ 30-27-30-27 |
| Last Medinan (Warsh, Qalun) | 6214 | ❌ even group 6610 ≠ 6214 | ❌ 61 : 53 | ❌ 3500 ≠ 3104 | ❌ 31-26-27-30 |
| Duri / Susi edition | 6217 | ❌ even group 6278 ≠ 6217 | ❌ 60 : 54 | ❌ 3470 ≠ 3409 | ❌ 34-23-31-26 |
| Bazzi / Qunbul edition (Meccan reader) | 6220 | ❌ even group 6136 ≠ 6220 | ✅ 57 : 57 | ❌ 3112 ≠ 3196 | ✅ 27-30-27-30 |

### What this shows

1. **The Sum Balance (Patterns 1 and 3) holds only under the Kufan count.** Under the other counts it misses by a wide margin (for example 3500 against 3104).
2. **The Parity Balance (Patterns 2 and 4) holds under the Kufan count and also under the Bazzi / Qunbul edition.** This fits the earlier observation that the parity balance on its own is not rare.
3. The patterns are therefore not a property of the Quranic text as such, but of the **Kufan division into verses**. The question of how they came about extends to that counting tradition.

### Limitations

- **The Duri edition does not use the Basran count.** Its total is 6217, while the Basran count is 6204 [1], and it has 285 verses in Al-Baqarah where the Basran count has 287. Its total equals that of the First Medinan count [1], but which count this edition follows could not be confirmed.
- **The Bazzi / Qunbul edition has 6220 verses, not the 6210 reported for the Meccan count** [1]. Which count this edition follows could not be confirmed either.
- **Two counts are still untested:** Basran (6204) and Damascene (6226). None of the 8 narrations in the KFGQPC data used here follows them.

## What Is Still Unknown

1. **How rare the two facts are.** No sound probability has been computed yet. A meaningful estimate needs a realistic model of how verse counts could have been distributed (for example, long surahs early and short surahs late, as in the actual Quran). A naive model with uniformly random verse counts is not realistic:
   - under such a model, H = J holds in roughly 7% of trials, so the parity balance on its own is not rare;
   - F = G almost never holds, but only because uniformly random verse counts make G far larger than F, so that model says little about the real Quran.
2. **The Basran and Damascene counts.** The Last Medinan count and two other editions have been tested (see above); the Basran (6204) and Damascene (6226) counts have not, for lack of reliable per-surah data.
3. **Post-hoc selection.** The two facts were found by exploring the data. Even simple patterns carry some risk of having been selected from many that were tried.

---

## Conclusion

- The **4 patterns** rest on **2 independent facts**: F = G (3303) and H = J (30).
- Both facts use only addition, counting and parity over all 114 surahs, with exact equality and no tolerance. They can be checked by anyone with a spreadsheet.
- Among the verse counts tested, both facts hold only under the Kufan count, the one used by the great majority of Muslims today. The other editions tested break the Sum Balance.
- How unlikely these facts are by chance is an open question that needs a careful, realistic analysis before any probability is claimed.

**Key insight:** stating openly that the 4 patterns reduce to 2 facts keeps the claim honest and easy to verify.

---

## References

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
