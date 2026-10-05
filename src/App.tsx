import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout'
import NaturalPatterns from './pages/NaturalPatterns'
import MiniQuran from './pages/MiniQuran'
import { DOCS } from './docs'
import { useT } from './i18n/LanguageContext'

// The markdown renderer is only downloaded when a document page is opened
const DocPage = lazy(() => import('./pages/DocPage'))

function Loading() {
  return <p className="text-gray-500">{useT().docs.loading}</p>
}

function App() {
  return (
    <Router basename="/quran-checksum">
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/natural-patterns" replace />} />
          <Route path="/natural-patterns" element={<NaturalPatterns />} />
          <Route path="/mini-quran" element={<MiniQuran />} />
          {DOCS.map((doc) => (
            <Route
              key={doc.slug}
              path={`/${doc.slug}`}
              element={
                <Suspense fallback={<Loading />}>
                  <DocPage doc={doc} />
                </Suspense>
              }
            />
          ))}
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
