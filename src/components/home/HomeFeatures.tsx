import { Calendar, ShieldAlert, BarChart3, Infinity } from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "30-Day Guided Progression",
    copy: "Day-by-day guidance from Day 1 to Day 30 so you always know what to focus on next without guesswork.",
  },
  {
    icon: ShieldAlert,
    title: "Instant Craving Panic Button",
    copy: "Quick, actionable steps you can open in seconds when a sudden craving hits, helping you ride out the urge.",
  },
  {
    icon: BarChart3,
    title: "Daily Streak & Habit Tracker",
    copy: "Keep a clear visual record of your completed days, steady energy notes, and consistency over the full month.",
  },
  {
    icon: Infinity,
    title: "Ongoing Post-Reset Access",
    copy: "Continue using core tracking and craving-support tools after your 30-day reset to maintain your new baseline.",
  },
]

export function HomeFeatures() {
  return (
    <section id="features" className="bg-card py-16 md:py-24 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-bold text-primary tracking-wider">WHAT&apos;S INSIDE</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mt-3 mb-4">
            Practical Tools Designed for Consistency
          </h2>
          <p className="text-muted text-lg">
            Everything is organized around simple daily actions rather than complicated rules or restriction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-background rounded-2xl shadow-md border border-border p-8 flex gap-5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted leading-relaxed">{feature.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}