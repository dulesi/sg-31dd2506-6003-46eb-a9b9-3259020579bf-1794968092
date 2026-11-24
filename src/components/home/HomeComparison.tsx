import { X, Check } from "lucide-react"

const crashPoints = [
  "Sudden extreme rules that are hard to sustain past week one",
  "Sharp energy drops and afternoon irritability",
  "No clear step when an unexpected craving hits",
  "All-or-nothing mindset after a single slip",
]

const systemPoints = [
  "Step-by-step daily pacing across 30 manageable days",
  "Practical habit swaps focused on steadier daily energy",
  "On-demand craving support right when urges appear",
  "Progress tracking that rewards consistency over perfection",
]

export function HomeComparison() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
            Why Structured Pacing Beats Crash Diets
          </h2>
          <p className="text-muted text-lg">
            Abrupt all-or-nothing rules often trigger rebound cravings. A steady 30-day reset builds habits you can keep.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl border border-border p-8">
            <h3 className="text-lg font-bold text-muted mb-6">Crash Restriction</h3>
            <ul className="space-y-4">
              {crashPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span className="text-muted">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card rounded-2xl border-2 border-primary shadow-md p-8">
            <h3 className="text-lg font-bold text-primary mb-6">The AdioSugar 30-Day System</h3>
            <ul className="space-y-4">
              {systemPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}