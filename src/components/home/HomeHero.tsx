import Link from "next/link"
import { ArrowRight, Flame, Shield, TrendingUp, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              30-Day Structured Sugar Reset
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight mb-6">
              Break Free From Sugar Cravings in 30 Days — Without Extreme Diets.
            </h1>
            <p className="text-lg text-muted max-w-2xl mb-8 leading-relaxed">
              A clear, practical daily habit system that helps reset sugar cravings, stabilize everyday energy, and build lasting control on mobile and web.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Link href="/quiz">
                <Button size="lg" className="w-full sm:w-auto rounded-full bg-primary hover:bg-[#059669] text-primary-foreground font-semibold px-8 h-14 text-base">
                  Take the 60-Second Quiz
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/app" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full rounded-full border-border font-semibold px-8 h-14 text-base">
                  Already have an account? Sign In
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted">
              Free 60-second sugar intake check • Instant personalized summary
            </p>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="w-[280px] sm:w-[320px] rounded-[2.5rem] border-8 border-foreground/90 bg-foreground/90 shadow-2xl overflow-hidden">
              <div className="bg-card rounded-[2rem] overflow-hidden">
                <div className="bg-primary px-5 pt-8 pb-10 text-primary-foreground">
                  <p className="text-xs font-medium opacity-80 mb-1">Day 12 of 30</p>
                  <p className="text-2xl font-bold">Sugar-Free Streak</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Flame className="w-5 h-5" />
                    <span className="font-bold">12 days strong</span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="rounded-2xl border border-border p-4 flex items-center gap-3">
                    <Calendar className="w-9 h-9 text-primary bg-primary/10 rounded-full p-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Daily Craving Check-In</p>
                      <p className="text-xs text-muted">Completed today</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 flex items-center gap-3">
                    <Shield className="w-9 h-9 text-destructive bg-destructive/10 rounded-full p-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Panic Button Ready</p>
                      <p className="text-xs text-muted">Tap for instant help</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4 flex items-center gap-3">
                    <TrendingUp className="w-9 h-9 text-accent bg-accent/10 rounded-full p-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Energy Stability</p>
                      <p className="text-xs text-muted">Steady</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}