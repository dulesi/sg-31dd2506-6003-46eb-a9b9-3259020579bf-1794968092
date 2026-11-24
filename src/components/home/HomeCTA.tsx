import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HomeCTA() {
  return (
    <section className="bg-primary py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-foreground mb-4">
          See Where Your Daily Sugar Habits Stand
        </h2>
        <p className="text-primary-foreground/90 text-lg mb-8">
          Complete the 60-second assessment to get your personalized sugar intake summary and 30-day reset overview.
        </p>
        <Link href="/quiz">
          <Button
            size="lg"
            className="rounded-full bg-background text-primary hover:bg-background/90 font-semibold px-8 h-14 text-base"
          >
            Start the 60-Second Quiz
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  )
}