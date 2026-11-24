import { SEO } from "@/components/SEO"
import { HomeNav } from "@/components/home/HomeNav"
import { HomeHero } from "@/components/home/HomeHero"
import { HomeHowItWorks } from "@/components/home/HomeHowItWorks"
import { HomeFeatures } from "@/components/home/HomeFeatures"
import { HomeComparison } from "@/components/home/HomeComparison"
import { HomeFAQ } from "@/components/home/HomeFAQ"
import { HomeCTA } from "@/components/home/HomeCTA"
import { HomeFooter } from "@/components/home/HomeFooter"

export default function Home() {
  return (
    <>
      <SEO
        title="AdioSugar - 30-Day Sugar Detox"
        description="Break free from sugar cravings in 30 days without extreme diets. A practical daily habit system for steadier energy and lasting control."
      />
      <main className="bg-background min-h-screen">
        <HomeNav />
        <HomeHero />
        <HomeHowItWorks />
        <HomeFeatures />
        <HomeComparison />
        <HomeFAQ />
        <HomeCTA />
        <HomeFooter />
      </main>
    </>
  )
}