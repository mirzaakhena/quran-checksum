import { useState } from 'react';
import { MAX_SURAHS, MIN_SURAHS } from '../v2/core';
import { quranData } from '../v2/data';

const STORAGE_KEY = 'mini-quran-book-v3';

export interface MiniQuranBook {
  surahCount: number;
  // What the user typed for each surah's verse count, kept as text so invalid input stays visible
  entries: string[];
}

const emptyBook = (surahCount: number): MiniQuranBook => ({ surahCount, entries: Array(surahCount).fill('') });

// Storage can be unavailable (private windows, blocked site data); the page still works without it
function loadBook(): MiniQuranBook | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const book = JSON.parse(raw) as MiniQuranBook;
    const valid = Number.isInteger(book?.surahCount) && book.surahCount >= MIN_SURAHS && book.surahCount <= MAX_SURAHS &&
      Array.isArray(book.entries) && book.entries.length === book.surahCount &&
      book.entries.every((e) => typeof e === 'string');
    return valid ? book : null;
  } catch {
    return null;
  }
}

function saveBook(book: MiniQuranBook) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(book));
  } catch {
    // The book is simply not kept across reloads
  }
}

export function useMiniQuranBook() {
  const [book, setBook] = useState<MiniQuranBook>(() => loadBook() ?? emptyBook(quranData.length));

  const update = (next: MiniQuranBook) => {
    setBook(next);
    saveBook(next);
  };

  // Keeps the verse counts already entered for surahs that remain
  const setSurahCount = (surahCount: number) => {
    const entries = Array.from({ length: surahCount }, (_, i) => book.entries[i] ?? '');
    update({ surahCount, entries });
  };

  const setEntry = (index: number, value: string) => {
    const entries = [...book.entries];
    entries[index] = value;
    update({ ...book, entries });
  };

  const fillWithQuran = () =>
    update({ surahCount: quranData.length, entries: quranData.map((s) => String(s.verseCount)) });

  const clear = () => update(emptyBook(book.surahCount));

  return { book, setSurahCount, setEntry, fillWithQuran, clear };
}
