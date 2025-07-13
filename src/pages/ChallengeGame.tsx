import { useState, useMemo, useCallback } from 'react'
import { QuranSurah } from '../types'
import { calculatePatterns, validatePatterns } from '../utils/calculations'
import { quranData } from '../data/quran'

interface GameState {
  surahCount: number
  verseCounts: number[]
  attempts: number
  successes: number
  isPlaying: boolean
  currentSession: number
}

interface ValidationCard {
  id: string
  title: string
  description: string
  currentValue: string
  expectedValue: string
  isValid: boolean
  formula: string
}

export default function ChallengeGame() {
  const [gameState, setGameState] = useState<GameState>({
    surahCount: 10,
    verseCounts: Array(10).fill(10),
    attempts: 0,
    successes: 0,
    isPlaying: false,
    currentSession: 0
  })

  const [selectedDifficulty, setSelectedDifficulty] = useState<'beginner' | 'intermediate' | 'expert' | 'historical'>('beginner')

  // Create synthetic Quran data for current game
  const gameData: QuranSurah[] = useMemo(() => {
    return Array.from({ length: gameState.surahCount }, (_, index) => ({
      number: index + 1,
      verseCount: gameState.verseCounts[index] || 1,
      name: `Test Surah ${index + 1}`
    }))
  }, [gameState.surahCount, gameState.verseCounts])

  // Calculate patterns for current game data
  const gameResults = useMemo(() => calculatePatterns(gameData), [gameData])
  const gameValidation = useMemo(() => validatePatterns(gameResults), [gameResults])

  // Expected values based on surah count
  const expectedValues = useMemo(() => {
    const n = gameState.surahCount
    const expectedSurahSum = (n * (n + 1)) / 2
    return {
      surahSum: expectedSurahSum,
      evenSurahs: Math.floor(n / 2),
      oddSurahs: Math.ceil(n / 2)
    }
  }, [gameState.surahCount])

  // Validation cards for the 4 natural patterns
  const validationCards: ValidationCard[] = useMemo(() => [
    {
      id: 'pattern1',
      title: 'Pattern 1: Balance',
      description: 'Sum of surah numbers vs sum of verse counts',
      currentValue: `${gameResults.sumSurahNumbers} / ${gameResults.sumVerseCounts}`,
      expectedValue: 'Perfect balance',
      isValid: gameValidation.pattern1,
      formula: 'Σ(surah_numbers) ⟷ Σ(verse_counts)'
    },
    {
      id: 'pattern2', 
      title: 'Pattern 2: Distribution',
      description: 'Even vs odd surah count balance',
      currentValue: `${gameResults.evenSurahs} : ${gameResults.oddSurahs}`,
      expectedValue: `${expectedValues.evenSurahs}:${expectedValues.oddSurahs}`,
      isValid: gameValidation.pattern2,
      formula: 'COUNT(even_surahs) = COUNT(odd_surahs)'
    },
    {
      id: 'pattern3',
      title: 'Pattern 3: Symmetry', 
      description: 'Conditional symmetry pattern',
      currentValue: gameValidation.pattern3 ? '✓ Valid' : '✗ Invalid',
      expectedValue: 'Symmetric relationship',
      isValid: gameValidation.pattern3,
      formula: 'Conditional sums based on parity'
    },
    {
      id: 'pattern4',
      title: 'Pattern 4: Parity Matrix',
      description: 'Four-way parity combinations',
      currentValue: `${gameResults.evenSurahEvenVerses}-${gameResults.evenSurahOddVerses}-${gameResults.oddSurahEvenVerses}-${gameResults.oddSurahOddVerses}`,
      expectedValue: 'Symmetric pattern',
      isValid: gameValidation.pattern4,
      formula: 'Even-Even, Even-Odd, Odd-Even, Odd-Odd'
    }
  ], [gameResults, gameValidation, expectedValues])

  const allPatternsValid = validationCards.every(card => card.isValid)
  
  // Get difficulty settings
  const getDifficultySettings = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return { surahs: 10, description: 'Easier to achieve patterns with fewer variables' }
      case 'intermediate': return { surahs: 50, description: 'Medium complexity with more constraints' }
      case 'expert': return { surahs: 114, description: 'Full challenge - match original Quran structure' }
      case 'historical': return { surahs: 114, description: 'Sequential mode: no rollbacks, simulate 23-year revelation' }
      default: return { surahs: 10, description: 'Custom difficulty' }
    }
  }

  // Handle difficulty change
  const handleDifficultyChange = (difficulty: 'beginner' | 'intermediate' | 'expert' | 'historical') => {
    const settings = getDifficultySettings(difficulty)
    setSelectedDifficulty(difficulty)
    setGameState(prev => ({
      ...prev,
      surahCount: settings.surahs,
      verseCounts: Array(settings.surahs).fill(10),
      isPlaying: false
    }))
  }

  // Handle verse count changes
  const handleVerseCountChange = (index: number, value: string) => {
    const numValue = Math.max(1, Math.min(286, parseInt(value) || 1))
    setGameState(prev => ({
      ...prev,
      verseCounts: prev.verseCounts.map((count, i) => i === index ? numValue : count)
    }))
  }

  // Randomize verse counts
  const randomizeVerseCounts = useCallback(() => {
    const newVerseCounts = Array.from({ length: gameState.surahCount }, () => 
      Math.floor(Math.random() * 286) + 1
    )
    setGameState(prev => ({
      ...prev,
      verseCounts: newVerseCounts
    }))
  }, [gameState.surahCount])

  // Reset to original Quran values
  const resetToQuran = () => {
    const quranVerseCounts = quranData.slice(0, gameState.surahCount).map(surah => surah.verseCount)
    setGameState(prev => ({
      ...prev,
      verseCounts: quranVerseCounts
    }))
  }

  // Start/stop playing
  const togglePlaying = () => {
    if (!gameState.isPlaying) {
      setGameState(prev => ({
        ...prev,
        isPlaying: true,
        currentSession: prev.currentSession + 1
      }))
    } else {
      setGameState(prev => ({
        ...prev,
        isPlaying: false,
        attempts: prev.attempts + 1,
        successes: allPatternsValid ? prev.successes + 1 : prev.successes
      }))
    }
  }

  // Clear all data
  const clearAll = () => {
    setGameState(prev => ({
      ...prev,
      verseCounts: Array(prev.surahCount).fill(1),
      isPlaying: false
    }))
  }

  const successRate = gameState.attempts > 0 ? (gameState.successes / gameState.attempts * 100).toFixed(1) : '0.0'

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Random Creation Challenge
        </h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          Can you recreate the Quran's mathematical patterns by randomly assigning verse counts? 
          Try to achieve the same patterns under historical constraints - no planning, no rollbacks!
        </p>
      </div>

      {/* Challenge Statistics */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <span className="text-2xl mr-2">📊</span>
          Challenge Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{gameState.attempts}</div>
            <div className="text-sm text-gray-600">Attempts</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{gameState.successes}</div>
            <div className="text-sm text-gray-600">Successes</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{successRate}%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">{gameState.currentSession}</div>
            <div className="text-sm text-gray-600">Session #</div>
          </div>
        </div>
      </div>

      {/* Difficulty Selector */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Select Difficulty Level</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(['beginner', 'intermediate', 'expert', 'historical'] as const).map((difficulty) => {
            const settings = getDifficultySettings(difficulty)
            const isSelected = selectedDifficulty === difficulty
            return (
              <button
                key={difficulty}
                onClick={() => handleDifficultyChange(difficulty)}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-200
                  ${isSelected 
                    ? 'border-blue-500 bg-blue-50 text-blue-900' 
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }
                `}
              >
                <div className="font-bold capitalize mb-2">{difficulty}</div>
                <div className="text-sm text-gray-600 mb-2">{settings.surahs} Surahs</div>
                <div className="text-xs text-gray-500">{settings.description}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Game Controls */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Game Controls</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={randomizeVerseCounts}
            disabled={gameState.isPlaying}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            🎲 Randomize All
          </button>
          <button
            onClick={resetToQuran}
            disabled={gameState.isPlaying}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
          >
            📖 Load Quran Values
          </button>
          <button
            onClick={clearAll}
            disabled={gameState.isPlaying}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:bg-gray-400 transition-colors"
          >
            🗑️ Clear All
          </button>
          <button
            onClick={togglePlaying}
            className={`px-6 py-2 rounded-lg font-bold transition-colors ${
              gameState.isPlaying 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {gameState.isPlaying ? '⏹️ Submit Attempt' : '▶️ Start Challenge'}
          </button>
        </div>
      </div>

      {/* Editable Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4">
          <h3 className="text-xl font-bold">
            Verse Count Editor ({gameState.surahCount} Surahs)
          </h3>
          <p className="text-purple-100 text-sm">
            Edit verse counts to try achieving the patterns. Range: 1-286 verses per surah.
          </p>
        </div>
        
        <div className="p-4 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {gameState.verseCounts.slice(0, gameState.surahCount).map((count, index) => (
              <div key={index} className="flex flex-col">
                <label className="text-xs text-gray-600 mb-1">
                  Surah {index + 1}
                </label>
                <input
                  type="number"
                  min="1"
                  max="286"
                  value={count}
                  onChange={(e) => handleVerseCountChange(index, e.target.value)}
                  disabled={gameState.isPlaying}
                  className={`
                    w-full p-2 border rounded text-center font-mono text-sm
                    ${gameState.isPlaying 
                      ? 'bg-gray-100 border-gray-300' 
                      : 'bg-white border-gray-300 hover:border-blue-400 focus:border-blue-500'
                    }
                  `}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pattern Validation Cards */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <span className="text-2xl mr-2">🎯</span>
          Pattern Validation Results
        </h3>
        
        {/* Overall Status */}
        <div className={`
          p-4 rounded-lg mb-6 text-center
          ${allPatternsValid 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
          }
        `}>
          <div className="text-3xl mb-2">
            {allPatternsValid ? '🎉' : '❌'}
          </div>
          <div className={`font-bold text-xl ${
            allPatternsValid ? 'text-green-800' : 'text-red-800'
          }`}>
            {allPatternsValid 
              ? 'ALL PATTERNS ACHIEVED!' 
              : 'Patterns Not Yet Matched'
            }
          </div>
          <div className={`text-sm mt-1 ${
            allPatternsValid ? 'text-green-600' : 'text-red-600'
          }`}>
            {allPatternsValid 
              ? 'Congratulations! You have recreated the mathematical patterns.' 
              : `${validationCards.filter(c => c.isValid).length}/${validationCards.length} patterns validated`
            }
          </div>
        </div>

        {/* Individual Pattern Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {validationCards.map((card) => (
            <div 
              key={card.id}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200
                ${card.isValid 
                  ? 'border-green-400 bg-green-50' 
                  : 'border-red-400 bg-red-50'
                }
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold">{card.title}</h4>
                <span className="text-2xl">
                  {card.isValid ? '✅' : '❌'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{card.description}</p>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-white p-2 rounded text-center">
                  <div className="text-xs text-gray-600">Current</div>
                  <div className="font-mono text-sm">{card.currentValue}</div>
                </div>
                <div className="bg-white p-2 rounded text-center">
                  <div className="text-xs text-gray-600">Target</div>
                  <div className="font-mono text-sm">{card.expectedValue}</div>
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                Formula: {card.formula}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Context */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <span className="text-2xl mr-2">📜</span>
          Historical Challenge Context
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">The Original Constraints</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>23 years</strong> of gradual revelation</li>
              <li>• <strong>Sequential order</strong> - no rearrangement allowed</li>
              <li>• <strong>No rollbacks</strong> - cannot change previous chapters</li>
              <li>• <strong>No planning</strong> - responsive to immediate circumstances</li>
              <li>• <strong>No modern mathematics</strong> - pre-calculator era</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Your Challenge Advantages</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>Instant feedback</strong> - see patterns immediately</li>
              <li>• <strong>Unlimited attempts</strong> - try as many times as needed</li>
              <li>• <strong>Full visibility</strong> - see all requirements upfront</li>
              <li>• <strong>Modern tools</strong> - calculators and computers</li>
              <li>• <strong>Global perspective</strong> - edit any value anytime</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-amber-100 rounded border border-amber-300">
          <p className="text-sm text-amber-800">
            <strong>Question:</strong> Even with all these advantages, how many attempts did it take you 
            to achieve all patterns? The original achievement happened under far more restrictive conditions 
            over 23 years without any foreknowledge of the mathematical requirements.
          </p>
        </div>
      </div>
    </div>
  )
}
