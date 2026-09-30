import { TableHeaderProps } from './types'
import { formatPattern1, formatPattern2, formatPattern4 } from '../../v2/core'

export default function TableHeader({
  validation,
  results
}: TableHeaderProps) {
  const F = results.chapterSumIfEvenTotal
  const G = results.verseSumIfOddTotal

  return (
    <>
      {/* Table Header */}
      <div className="bg-gradient-to-r from-quran-blue to-indigo-600 text-white p-4">
        <h3 className="text-xl font-bold text-center">Interactive Pattern Explorer</h3>
        <p className="text-center text-blue-100 mt-1">Click headers for formulas • Click cells for calculations • Hover for details</p>
      </div>

      {/* Pattern Summary Bar - Sticky */}
      <div className="bg-gray-50 p-3 border-b sticky top-0 z-50 shadow-md backdrop-blur-sm bg-gray-50/95">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
          <div className="bg-blue-100 p-2 rounded text-center">
            <div className="font-semibold">Pattern 1</div>
            <div className={validation.pattern1 ? 'text-green-600' : 'text-red-600'}>
              {formatPattern1(results.evenTotalSum, results.oddTotalSum)} {validation.pattern1 ? '✅' : '❌'}
            </div>
          </div>
          <div className="bg-cyan-100 p-2 rounded text-center">
            <div className="font-semibold">Pattern 2</div>
            <div className={validation.pattern2 ? 'text-cyan-600' : 'text-red-600'}>
              {formatPattern2(results.evenTotalCount, results.oddTotalCount)} {validation.pattern2 ? '✅' : '❌'}
            </div>
          </div>
          <div className="bg-yellow-100 p-2 rounded text-center">
            <div className="font-semibold">Pattern 3</div>
            <div className={validation.pattern3 ? 'text-green-600' : 'text-red-600'}>
              {F === G ? F : `${F}/${G}`} {validation.pattern3 ? '✅' : '❌'}
            </div>
          </div>
          <div className="bg-purple-100 p-2 rounded text-center">
            <div className="font-semibold">Pattern 4</div>
            <div className={validation.pattern4 ? 'text-green-600' : 'text-red-600'}>
              {formatPattern4(results.evenSurahEvenVerses, results.evenSurahOddVerses, results.oddSurahEvenVerses, results.oddSurahOddVerses)} {validation.pattern4 ? '✅' : '❌'}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}