import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, ChevronRight, CheckCircle, Zap, Brain, Heart, Shield, Loader2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

type QuizAnswer = {
  step1?: string
  step2?: string
  step3?: string
  step4?: string
}

const timingLabels: Record<string, string> = {
  afternoon: 'mid-afternoon crash',
  aftermeal: 'after meals/dinner',
  stress: 'stressful moments',
  night: 'late night snacks'
}

const goalLabels: Record<string, string> = {
  energy: 'consistent daily energy',
  weight: 'reduced bloating & fat loss',
  clarity: 'better mental clarity & sleep',
  health: 'long-term health control'
}

const struggleLabels: Record<string, string> = {
  recent: 'just recently',
  months: 'a few months',
  years: 'off and on for years',
  always: 'as long as I can remember'
}

const styleLabels: Record<string, string> = {
  sos: '15s emergency SOS',
  science: 'science explanations',
  mindset: 'gentle mindset guidance'
}

export default function LandingPage() {
  const [quizStep, setQuizStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer>({})
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (step: string, value: string) => {
    const updatedAnswers = { ...answers, [step]: value }
    setAnswers(updatedAnswers)
    
    if (step === 'step4') {
      setIsAnalyzing(true)
      
      const peakTiming = timingLabels[updatedAnswers.step1 || ''] || 'general'
      const primaryGoal = goalLabels[updatedAnswers.step2 || ''] || 'general'
      const supportStyle = styleLabels[updatedAnswers.step4 || ''] || 'general'
      const summary = `Peak craving: ${peakTiming} | Goal: ${primaryGoal} | Style: ${supportStyle}`
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('pending_quiz_answers', JSON.stringify({
          cravings_timing: updatedAnswers.step1,
          primary_goal: updatedAnswers.step2,
          struggle_duration: updatedAnswers.step3,
          support_style: updatedAnswers.step4,
          ai_context_summary: summary
        }))
      }

      setTimeout(() => {
        setIsAnalyzing(false)
        setShowResults(true)
      }, 2000)
    } else {
      const nextStep = parseInt(step.replace('step', '')) + 1
      setQuizStep(nextStep)
    }
  }

  const scrollToQuiz = () => {
    setQuizStep(1)
    setTimeout(() => {
      document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const step1Options = [
    { id: 'afternoon', label: 'Mid-afternoon crash', emoji: '☕' },
    { id: 'aftermeal', label: 'After meals/dinner', emoji: '🍽️' },
    { id: 'stress', label: 'During stressful moments', emoji: '😰' },
    { id: 'night', label: 'Late night snacks', emoji: '🌙' }
  ]

  const step2Options = [
    { id: 'energy', label: 'Consistent daily energy', emoji: '⚡' },
    { id: 'weight', label: 'Reduced bloating & fat loss', emoji: '💪' },
    { id: 'clarity', label: 'Better mental clarity & sleep', emoji: '🧠' },
    { id: 'health', label: 'Long-term health control', emoji: '❤️' }
  ]

  const step3Options = [
    { id: 'recent', label: 'Just recently', emoji: '🆕' },
    { id: 'months', label: 'A few months', emoji: '📅' },
    { id: 'years', label: 'Off and on for years', emoji: '🔄' },
    { id: 'always', label: 'As long as I can remember', emoji: '⏳' }
  ]

  const step4Options = [
    { id: 'sos', label: 'Fast 15-second emergency SOS', emoji: '🚨' },
    { id: 'science', label: 'Science-based biology explanations', emoji: '🧬' },
    { id: 'mindset', label: 'Gentle mindset guidance', emoji: '🧘' }
  ]

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="w-full max-w-[420px] mx-auto bg-background shadow-2xl min-h-screen">
        <div className="px-4 py-12 space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary">AI-Powered Coach</span>
            </div>
            
            <h1 className="text-2xl font-bold text-foreground leading-tight">
              Break Free from Sugar Cravings — Without Restrictive Diets or Endless Willpower
            </h1>
            
            <p className="text-sm text-muted leading-relaxed">
              A lightweight, AI-powered behavioral coach that helps you regain control, boost your energy, and rebuild healthy habits in 15 seconds a day.
            </p>

            <Button
              onClick={scrollToQuiz}
              size="lg"
              className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg rounded-xl mt-4"
            >
              Take the 60-Second Quiz →
            </Button>

            <p className="text-xs text-muted pt-2">
              Already have an account?{' '}
              <Link href="/app" className="text-primary hover:underline font-semibold">
                Sign In
              </Link>
            </p>
          </div>

          <div id="quiz-section" className="space-y-6">
            {quizStep === 0 && (
              <div className="text-center py-4 opacity-0"></div>
            )}

            {quizStep === 1 && (
              <Card className="p-6 shadow-lg rounded-2xl border-2 border-border">
                <div className="text-center space-y-3 mb-5">
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 text-xs font-semibold">
                    Step 1 of 4
                  </Badge>
                  <h2 className="text-lg font-bold text-foreground leading-snug">
                    When do you feel sugar cravings hitting you hardest?
                  </h2>
                </div>
                <div className="space-y-2.5">
                  {step1Options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer('step1', option.id)}
                      className="w-full p-3.5 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left flex items-center gap-3 group active:scale-[0.98]"
                    >
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="text-base font-medium text-foreground flex-1">{option.label}</span>
                      <ChevronRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                    </button>
                  ))}
                </div>
              </Card>
            )}

            {quizStep === 2 && (
              <Card className="p-6 shadow-lg rounded-2xl border-2 border-border">
                <div className="text-center space-y-3 mb-5">
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 text-xs font-semibold">
                    Step 2 of 4
                  </Badge>
                  <h2 className="text-lg font-bold text-foreground leading-snug">
                    What is your primary goal for reducing sugar?
                  </h2>
                </div>
                <div className="space-y-2.5">
                  {step2Options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer('step2', option.id)}
                      className="w-full p-3.5 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left flex items-center gap-3 group active:scale-[0.98]"
                    >
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="text-base font-medium text-foreground flex-1">{option.label}</span>
                      <ChevronRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                    </button>
                  ))}
                </div>
              </Card>
            )}

            {quizStep === 3 && (
              <Card className="p-6 shadow-lg rounded-2xl border-2 border-border">
                <div className="text-center space-y-3 mb-5">
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 text-xs font-semibold">
                    Step 3 of 4
                  </Badge>
                  <h2 className="text-lg font-bold text-foreground leading-snug">
                    How long have you been struggling with sugar reliance?
                  </h2>
                </div>
                <div className="space-y-2.5">
                  {step3Options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer('step3', option.id)}
                      className="w-full p-3.5 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left flex items-center gap-3 group active:scale-[0.98]"
                    >
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="text-base font-medium text-foreground flex-1">{option.label}</span>
                      <ChevronRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                    </button>
                  ))}
                </div>
              </Card>
            )}

            {quizStep === 4 && !isAnalyzing && !showResults && (
              <Card className="p-6 shadow-lg rounded-2xl border-2 border-border">
                <div className="text-center space-y-3 mb-5">
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 text-xs font-semibold">
                    Step 4 of 4
                  </Badge>
                  <h2 className="text-lg font-bold text-foreground leading-snug">
                    What support style works best for you?
                  </h2>
                </div>
                <div className="space-y-2.5">
                  {step4Options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer('step4', option.id)}
                      className="w-full p-3.5 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left flex items-center gap-3 group active:scale-[0.98]"
                    >
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="text-base font-medium text-foreground flex-1">{option.label}</span>
                      <ChevronRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                    </button>
                  ))}
                </div>
              </Card>
            )}

            {isAnalyzing && (
              <Card className="p-10 shadow-lg rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <div className="text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto ring-4 ring-primary/5">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                  <h3 className="text-base font-bold text-foreground leading-snug">
                    Analyzing your craving triggers & building your custom 30-day recovery strategy...
                  </h3>
                  <div className="flex items-center justify-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </Card>
            )}

            {showResults && (
              <div className="space-y-6">
                <Card className="p-6 shadow-lg rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
                  <div className="text-center space-y-3 mb-5">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto ring-4 ring-primary/10">
                      <CheckCircle className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">
                      Your Sugar Dependency Profile is Ready
                    </h2>
                    <p className="text-sm text-muted">
                      Based on your answers, here's how AdioSugar can help you break free
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="font-bold text-foreground text-sm mb-0.5">Panic Button - Instant SOS</h4>
                        <p className="text-xs text-muted leading-relaxed">Get 15-second emergency interventions when cravings hit hardest</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Brain className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="font-bold text-foreground text-sm mb-0.5">Craving Coach - Personalized Guidance</h4>
                        <p className="text-xs text-muted leading-relaxed">AI-powered insights matching your exact triggers and support style</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="font-bold text-foreground text-sm mb-0.5">30-Day Transformation</h4>
                        <p className="text-xs text-muted leading-relaxed">Daily assistant for habit reprogramming without restrictive diets</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="font-bold text-foreground text-sm mb-0.5">Your Lifetime Ally</h4>
                        <p className="text-xs text-muted leading-relaxed">Unlimited access forever, even after completing your initial 30 days</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 shadow-lg rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border-2 border-primary/30">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-bold text-foreground">
                      Start Your 30-Day Journey Today
                    </h3>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-medium">30-Day Transformation Program</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-medium">Unlimited Panic Button & Coach</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-medium">Available on iOS and Android</span>
                      </div>
                    </div>

                    <Link href="/app" className="block w-full">
                      <Button size="lg" className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md rounded-xl mt-4">
                        Claim Your Custom Plan & Open App
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>

                    <div className="flex flex-col gap-2.5 pt-4">
                      <a
                        href="https://apps.apple.com/app/adiosugar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-black hover:bg-black/90 text-white font-semibold transition-colors text-xs"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5M13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                        </svg>
                        Download on App Store
                      </a>
                      <a
                        href="https://play.google.com/store/apps/details?id=com.adiosugar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-black hover:bg-black/90 text-white font-semibold transition-colors text-xs"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                        </svg>
                        Get it on Google Play
                      </a>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-muted">
                        Already have an account?{' '}
                        <Link href="/app" className="text-primary hover:underline font-semibold">
                          Sign In to App
                        </Link>
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}