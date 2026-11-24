const steps = [
  {
    badge: "01",
    title: "Take the 60-Second Quiz",
    copy: "Answer short questions about your daily habits, sweet cravings, and energy dips to see your estimated sugar load.",
  },
  {
    badge: "02",
    title: "Follow Your 30-Day Plan",
    copy: "Move through a structured 30-day progression with practical food swaps, daily check-ins, and clear milestones.",
  },
  {
    badge: "03",
    title: "Track & Handle Cravings Daily",
    copy: "Use your daily progress view and instant craving-rescue tools whenever urges spike at work, home, or on the go.",
  },
]

export function HomeHowItWorks() {
  return (
    <section id="how-it-works" className="bg-background py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-bold text-primary tracking-wider">HOW IT WORKS</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mt-3 mb-4">
            Three Simple Steps to Reset Your Routine
          </h2>
          <p className="text-muted text-lg">
            Start with a quick baseline check and follow a clear day-by-day structure built for real life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => (
            <div key={step.badge} className="bg-card rounded-2xl shadow-md border border-border p-8">
              <span className="text-4xl font-serif font-bold text-primary/30">{step.badge}</span>
              <h3 className="text-xl font-bold text-foreground mt-4 mb-3">{step.title}</h3>
              <p className="text-muted leading-relaxed">{step.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}