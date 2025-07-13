import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  const tabs = [
    { 
      path: '/natural-patterns', 
      label: 'Natural Patterns', 
      description: 'Primary Focus - Bulletproof Patterns',
      status: '🟢'
    },
    { 
      path: '/questionable-patterns', 
      label: 'Questionable Patterns', 
      description: 'Academic Analysis - Risk Assessment',
      status: '🟡'
    },
    { 
      path: '/challenge-game', 
      label: 'Challenge Game', 
      description: 'Random Creation Challenge',
      status: '🎮'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-quran-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-6">
            <div className="text-center lg:text-left mb-4 lg:mb-0">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 text-shadow">
                Quran Checksum Explorer
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Interactive Mathematical Pattern Discovery
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-4 text-sm">
              <div className="bg-quran-blue text-white px-3 py-1 rounded-full">
                114 Surahs
              </div>
              <div className="bg-quran-green text-white px-3 py-1 rounded-full">
                6 Patterns
              </div>
              <div className="bg-quran-gold text-white px-3 py-1 rounded-full">
                1:10^50 Probability
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 py-4">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`
                    flex-1 px-4 py-3 rounded-lg text-center transition-all duration-200
                    ${isActive
                      ? 'bg-quran-blue text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                    }
                  `}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-lg">{tab.status}</span>
                    <div className="text-left">
                      <div className="font-semibold">{tab.label}</div>
                      <div className="text-xs opacity-75">{tab.description}</div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-300">
              Mathematical patterns in the Quran's structure • Educational purposes only
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Based on research into numerical relationships within the text structure
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
