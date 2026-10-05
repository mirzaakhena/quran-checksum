// The project's markdown documents, shown on the site exactly as written in the repository.
// Each file is loaded on demand, so editing the .md file is all it takes to update its page.
// Every document has an English original and an Indonesian translation (<name>.id.md).

import type { Lang } from '../i18n/LanguageContext'

interface DocVersion {
  file: string
  load: () => Promise<{ default: string }>
}

export interface DocEntry {
  slug: string
  versions: Record<Lang, DocVersion>
}

export const DOCS: DocEntry[] = [
  {
    slug: 'formulas',
    versions: {
      en: { file: 'pattern_formula.md', load: () => import('../../pattern_formula.md?raw') },
      id: { file: 'pattern_formula.id.md', load: () => import('../../pattern_formula.id.md?raw') }
    }
  },
  {
    slug: 'analysis',
    versions: {
      en: { file: 'pattern_analysis.md', load: () => import('../../pattern_analysis.md?raw') },
      id: { file: 'pattern_analysis.id.md', load: () => import('../../pattern_analysis.id.md?raw') }
    }
  },
  {
    slug: 'critiques',
    versions: {
      en: { file: 'critique_analysis.md', load: () => import('../../critique_analysis.md?raw') },
      id: { file: 'critique_analysis.id.md', load: () => import('../../critique_analysis.id.md?raw') }
    }
  }
]

export const REPO_URL = 'https://github.com/mirzaakhena/quran-checksum'

// A link to either language version of a document leads to that document's page
export const findDocByFile = (file: string) =>
  DOCS.find((doc) => Object.values(doc.versions).some((version) => version.file === file))
