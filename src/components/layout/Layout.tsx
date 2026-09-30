import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

const GITHUB_PROFILE_URL = 'https://github.com/mirzaakhena'
const GITHUB_REPO_URL = `${GITHUB_PROFILE_URL}/quran-checksum`

const GitHubIcon = () => (
  <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
)

const NAV_ITEMS = [
  { to: '/natural-patterns', label: 'The Checksum' },
  { to: '/mini-quran', label: 'Mini Quran Challenge' }
]

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b-2 border-quran-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Quran Checksum
            </h1>
            <p className="text-gray-600 mt-1">
              Two facts hidden in the surah numbers and verse counts of the Quran, which you can check yourself.
            </p>
            <nav className="flex gap-4 mt-3 text-sm font-medium">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? 'text-quran-blue border-b-2 border-quran-blue pb-0.5' : 'text-gray-600 hover:text-gray-900 pb-0.5'
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50"
            aria-label="Source code on GitHub"
          >
            <GitHubIcon />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-gray-800 text-gray-300 text-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          Data: 114 surahs, 6236 verses (Kufan count) • Made by{' '}
          <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-gray-100">
            @mirzaakhena
          </a>{' '}
          • Educational purposes only
        </div>
      </footer>
    </div>
  )
}
