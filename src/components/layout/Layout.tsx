import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b-2 border-quran-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Quran Checksum
          </h1>
          <p className="text-gray-600 mt-1">
            Two facts hidden in the surah numbers and verse counts of the Quran, which you can check yourself.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-gray-800 text-gray-300 text-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          Data: 114 surahs, 6236 verses (Kufan count) • Educational purposes only
        </div>
      </footer>
    </div>
  )
}
