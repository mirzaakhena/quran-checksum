import { SetupPanel } from '../components/miniQuran/SetupPanel'
import { PlayPanel } from '../components/miniQuran/PlayPanel'
import { ResultPanel } from '../components/miniQuran/ResultPanel'
import { useMiniQuranGame } from '../hooks/useMiniQuranGame'
import { isComplete } from '../v2/core'

export default function MiniQuran() {
  const { game, stats, start, reveal, reset } = useMiniQuranGame()

  return (
    <div className="space-y-6">
      <div className="max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900">Mini Quran Challenge</h2>
        <p className="text-gray-700 leading-relaxed mt-2">
          The Quran was revealed piece by piece over about 23 years, in response to events, in an order
          different from its final arrangement, and without any way to go back and adjust what had
          already been recited. Could a book built that way happen to satisfy the 4 patterns? Try it:
          build your own book of surahs under the same conditions.
        </p>
      </div>

      {!game && <SetupPanel stats={stats} onStart={start} />}
      {game && !isComplete(game) && <PlayPanel game={game} onReveal={reveal} onAbandon={reset} />}
      {game && isComplete(game) && <ResultPanel game={game} onRestart={reset} />}
    </div>
  )
}
