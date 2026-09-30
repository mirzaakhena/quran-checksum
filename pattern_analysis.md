# Quran Checksum: An Objective Review of the Patterns

## Introduction

To keep the work scientifically honest, the 4 patterns of the Quran Checksum are reviewed critically here. This document explains:

1. the criteria used to judge a pattern,
2. how each of the 4 patterns meets them,
3. how the 4 patterns relate to each other, and
4. what is still unknown.

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

- A + B is even exactly when A and B have the same parity, so COUNT(A+B even) = H + K.
- There are always 57 odd surah numbers, so J + K = 57.
- Therefore the 57 : 57 split holds **if and only if H = J**.
- There are always 57 even surah numbers too (H + I = 57), so once H = J, I = K follows.

So **Pattern 2 holds if and only if H = J**. Pattern 4 adds only the specific value H = 30.

### Why this matters

Presenting four patterns as four independent coincidences, and multiplying their probabilities, would overstate the result. The honest count is **two facts**:

1. F = G (with the value 3303), and
2. H = J (with the value 30).

---

## What Is Still Unknown

1. **How rare the two facts are.** No sound probability has been computed yet. A meaningful estimate needs a realistic model of how verse counts could have been distributed (for example, long surahs early and short surahs late, as in the actual Quran). A naive model with uniformly random verse counts is not realistic:
   - under such a model, H = J holds in roughly 7% of trials, so the parity balance on its own is not rare;
   - F = G almost never holds, but only because uniformly random verse counts make G far larger than F, so that model says little about the real Quran.
2. **Other verse-numbering traditions.** 6236 is the Kufan count. Other traditional counts exist (for example Basran, Medinan and Damascene). Whether the two facts also hold under those counts is a testable question that has not been checked yet.
3. **Post-hoc selection.** The two facts were found by exploring the data. Even simple patterns carry some risk of having been selected from many that were tried.

---

## Conclusion

- The **4 patterns** rest on **2 independent facts**: F = G (3303) and H = J (30).
- Both facts use only addition, counting and parity over all 114 surahs, with exact equality and no tolerance. They can be checked by anyone with a spreadsheet.
- How unlikely these facts are by chance is an open question that needs a careful, realistic analysis before any probability is claimed.

**Key insight:** stating openly that the 4 patterns reduce to 2 facts keeps the claim honest and easy to verify.
