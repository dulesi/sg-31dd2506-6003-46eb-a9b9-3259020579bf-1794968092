interface CircularProgressProps {
  currentDay: number
  totalDays?: number
}

export default function CircularProgress({ currentDay, totalDays = 30 }: CircularProgressProps) {
  const percentage = Math.min((currentDay / totalDays) * 100, 100)
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-muted/20"
        />
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          className="text-primary transition-all duration-700"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl font-bold text-foreground tabular-nums">{currentDay}</div>
        <div className="text-sm text-muted font-medium">Days Clean</div>
      </div>
    </div>
  )
}