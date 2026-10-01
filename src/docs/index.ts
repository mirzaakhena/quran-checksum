// The project's markdown documents, shown on the site exactly as written in the repository.
// Each file is loaded on demand, so editing the .md file is all it takes to update its page.

export interface DocEntry {
  slug: string
  label: string
  file: string
  load: () => Promise<{ default: string }>
}

export const DOCS: DocEntry[] = [
  { slug: 'formulas', label: 'Formulas', file: 'pattern_formula.md', load: () => import('../../pattern_formula.md?raw') },
  { slug: 'analysis', label: 'Analysis', file: 'pattern_analysis.md', load: () => import('../../pattern_analysis.md?raw') },
  { slug: 'critiques', label: 'Critiques', file: 'critique_analysis.md', load: () => import('../../critique_analysis.md?raw') }
]

export const REPO_URL = 'https://github.com/mirzaakhena/quran-checksum'

export const findDocByFile = (file: string) => DOCS.find((doc) => doc.file === file)
