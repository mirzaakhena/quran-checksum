import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import NaturalPatterns from './pages/NaturalPatterns'

function App() {
  return (
    <Router basename="/quran-checksum">
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/natural-patterns" replace />} />
          <Route path="/natural-patterns" element={<NaturalPatterns />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
