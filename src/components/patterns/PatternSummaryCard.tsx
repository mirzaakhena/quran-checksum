interface PatternSummaryCardProps {
  title: string;
  value: string | number;
  expected: string | number;
  isValid: boolean;
  formula?: string;
  className?: string;
}

export default function PatternSummaryCard({
  title,
  value,
  expected,
  isValid,
  formula,
  className = ''
}: PatternSummaryCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${isValid ? 'border-green-500' : 'border-red-500'} ${className}`}>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      {formula && (
        <p className="text-gray-600 text-sm mb-2">{formula}</p>
      )}
      <div className="text-2xl font-bold mb-2">
        {value}
      </div>
      <div className="text-sm text-gray-600 mb-2">
        Expected: {expected}
      </div>
      <div className="text-sm">
        {isValid ? (
          <span className="text-green-600 font-semibold">✅ Validated</span>
        ) : (
          <span className="text-red-600 font-semibold">❌ Not Matched</span>
        )}
      </div>
    </div>
  );
}