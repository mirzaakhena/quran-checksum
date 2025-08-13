import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import NaturalPatterns from './pages/NaturalPatterns'
import ChallengeGame from './pages/ChallengeGame'

function App() {
  return (
    <Router basename="/quran-checksum">
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/natural-patterns" replace />} />
          <Route path="/natural-patterns" element={<NaturalPatterns />} />
          <Route path="/challenge-game" element={<ChallengeGame />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
