import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, ChevronRight, CheckCircle, Zap, Brain, Heart, Shield, Loader2, ArrowRight, AlertTriangle, TrendingUp, X, Lock } from 'lucide-react'
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

const detectOSAndRedirect = () => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera

  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    window.location.href = 'https://apps.apple.com/app/adiosugar'
    return
  }

  if (/android/i.test(userAgent)) {
    window.location.href = 'https://play.google.com/store/apps/details?id=com.adiosugar'
    return
  }

  window.location.href = '/app'
}

export default function LandingPage() {
  const [currentScreen, setCurrentScreen] = useState<'hero' | 'quiz' | 'loading' | 'results'>('hero')
  const [quizStep, setQuizStep] = useState(1)
  const [answers, setAnswers] = useState<QuizAnswer>({})

  const handleAnswer = (step: number, value: string) => {
    const key = `step${step}` as keyof QuizAnswer
    setAnswers({ ...answers, [key]: value })

    if (step < 4) {
      setQuizStep(step + 1)
    } else {
      setCurrentScreen('loading')
      setTimeout(() => {
        setCurrentScreen('results')
      }, 2000)
    }
  }

  const startQuiz = () => {
    setCurrentScreen('quiz')
    setQuizStep(1)
  }

  const getCustomToolkit = () => {
    const triggers = answers.step1
    const style = answers.step4

    if (triggers === 'stress') {
      return {
        icon: <Zap className="w-6 h-6 text-accent" />,
        title: 'Your Emergency Shield',
        desc: 'Instant 15-second SOS support via Panic Button for stress-triggered cravings.'
      }
    }
    
    if (style === 'science') {
      return {
        icon: <Brain className="w-6 h-6 text-primary" />,
        title: 'Your Mindset Rewire',
        desc: 'Science-based behavioral coaching via Craving Coach to rebuild your habits.'
      }
    }

    if (style === 'sos') {
      return {
        icon: <Shield className="w-6 h-6 text-destructive" />,
        title: 'Your 15s Emergency System',
        desc: 'Fast tactical interventions via Panic Button when cravings strike hard.'
      }
    }

    return {
      icon: <Heart className="w-6 h-6 text-primary" />,
      title: 'Your Smart Substitutes',
      desc: 'Instant access to low-glycemic crunch alternatives via Emergency Pantry.'
    }
  }

  const toolkit = getCustomToolkit()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[420px]">
        <div className="space-y-4">
          {currentScreen === 'hero' && (
            <div className="animate-in fade-in duration-500">
              <div className="text-center space-y-6 py-8">
                <Badge className="mx-auto bg-primary/10 text-primary border-primary/20 px-4 py-1">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Powered Habit Coach
                </Badge>

                <div className="space-y-3">
                  <h1 className="text-3xl font-bold text-foreground leading-tight">
                    Break Free from Sugar Cravings — Without Restrictive Diets or Endless Willpower
                  </h1>
                  <p className="text-sm text-muted leading-relaxed">
                    A lightweight, AI-powered behavioral coach that helps you regain control, boost your energy, and rebuild healthy habits in 15 seconds a day.
                  </p>
                </div>

                <Button 
                  onClick={startQuiz}
                  size="lg" 
                  className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg rounded-xl mt-6"
                >
                  Take the 60-Second Sugar Dependency Quiz
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>

                <p className="text-xs text-muted pt-2">
                  Already have an account?{' '}
                  <Link href="/app" className="text-primary hover:underline font-semibold">
                    Sign In to App
                  </Link>
                </p>
              </div>
            </div>
          )}

          {currentScreen === 'quiz' && (
            <div className="animate-in fade-in duration-500">
              <Card className="p-6 shadow-lg rounded-2xl border-2 border-border">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      Step {quizStep} of 4
                    </Badge>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((step) => (
                        <div 
                          key={step}
                          className={`h-1 w-8 rounded-full ${step <= quizStep ? 'bg-primary' : 'bg-border'}`}
                        />
                      ))}
                    </div>
                  </div>

                  {quizStep === 1 && (
                    <div className="space-y-4">
                      <h2 className="text-lg font-bold text-foreground">
                        When do you feel sugar cravings hitting you hardest?
                      </h2>
                      <div className="space-y-2">
                        {[
                          { value: 'afternoon', label: 'Mid-afternoon crash' },
                          { value: 'aftermeal', label: 'After meals/dinner' },
                          { value: 'stress', label: 'During stressful moments' },
                          { value: 'night', label: 'Late night snacks' }
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleAnswer(1, option.value)}
                            className="w-full p-4 text-left rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all font-medium text-foreground"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {quizStep === 2 && (
                    <div className="space-y-4">
                      <h2 className="text-lg font-bold text-foreground">
                        What is your primary goal for reducing sugar?
                      </h2>
                      <div className="space-y-2">
                        {[
                          { value: 'energy', label: 'Consistent daily energy' },
                          { value: 'weight', label: 'Reduced bloating & fat loss' },
                          { value: 'clarity', label: 'Better mental clarity & sleep' },
                          { value: 'health', label: 'Long-term health control' }
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleAnswer(2, option.value)}
                            className="w-full p-4 text-left rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all font-medium text-foreground"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {quizStep === 3 && (
                    <div className="space-y-4">
                      <h2 className="text-lg font-bold text-foreground">
                        How long have you been struggling with sugar reliance?
                      </h2>
                      <div className="space-y-2">
                        {[
                          { value: 'recent', label: 'Just recently' },
                          { value: 'months', label: 'A few months' },
                          { value: 'years', label: 'Off and on for years' },
                          { value: 'always', label: 'As long as I can remember' }
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleAnswer(3, option.value)}
                            className="w-full p-4 text-left rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all font-medium text-foreground"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {quizStep === 4 && (
                    <div className="space-y-4">
                      <h2 className="text-lg font-bold text-foreground">
                        What support style works best for you?
                      </h2>
                      <div className="space-y-2">
                        {[
                          { value: 'sos', label: 'Fast 15-second emergency SOS' },
                          { value: 'science', label: 'Science-based biology explanations' },
                          { value: 'mindset', label: 'Gentle mindset guidance' }
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleAnswer(4, option.value)}
                            className="w-full p-4 text-left rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all font-medium text-foreground"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )}

          {currentScreen === 'loading' && (
            <div className="animate-in fade-in duration-500">
              <Card className="p-8 shadow-lg rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground">
                      Analyzing Your Profile...
                    </h3>
                    <p className="text-sm text-muted">
                      Building your custom 30-day recovery strategy
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {currentScreen === 'results' && (
            <div className="animate-in fade-in duration-500 space-y-4">
              <Card className="p-6 shadow-lg rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Analysis Complete
                    </Badge>
                    <h2 className="text-xl font-bold text-foreground">
                      Your Sugar Dependency Profile is Ready
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border-2 border-destructive/30">
                        <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-destructive">Current State</p>
                            <Badge variant="destructive" className="text-xs">CRITICAL ZONE</Badge>
                          </div>
                          <p className="text-xs text-foreground">
                            High risk of {answers.step1 && timingLabels[answers.step1]} glucose spikes & active sugar dependency
                          </p>
                          <div className="w-full h-2 rounded-full bg-destructive/20 overflow-hidden">
                            <div className="h-full w-[85%] bg-gradient-to-r from-yellow-500 to-destructive"></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/10 border-2 border-primary/30">
                        <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-primary">30-Day Projected Stability</p>
                            <Badge className="text-xs bg-primary/10 text-primary border-primary/20">GREEN ZONE</Badge>
                          </div>
                          <p className="text-xs text-foreground">
                            100% stable glucose levels & calm dopamine baselines after program completion
                          </p>
                          <div className="w-full h-2 rounded-full bg-primary/20 overflow-hidden">
                            <div className="h-full w-full bg-primary"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-accent/10 border-2 border-accent/30">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                          {toolkit.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-foreground">{toolkit.title}</p>
                          <p className="text-xs text-muted mt-1">{toolkit.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-lg rounded-2xl border-2 border-primary/30">
                <div className="space-y-4">
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-bold text-foreground">
                      Start Your 30-Day Journey Today
                    </h3>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-3xl font-bold text-primary">$19.99</span>
                      <span className="text-sm text-muted">One-Time Payment</span>
                    </div>
                    <p className="text-xs font-semibold text-accent">
                      Lifetime Access • Pay Once, Own Forever
                    </p>
                  </div>

                  <div className="space-y-2 py-2">
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <X className="w-4 h-4 text-destructive flex-shrink-0" />
                      <span>Typical SaaS Apps: <span className="font-semibold">$12.99/mo</span> (Draining subscriptions)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <X className="w-4 h-4 text-destructive flex-shrink-0" />
                      <span>Private Nutritionists: <span className="font-semibold">$150+/mo</span> (Too expensive & slow)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground font-medium">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>AdioSugar: <span className="font-bold text-primary">$19.99 One-Time</span> (Your private AI coach forever)</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="font-medium">Zero Subscriptions — No recurring fees or hidden charges</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="font-medium">30-Day Guided Transformation — Physiological & mindset reset</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="font-medium">Your Lifetime Ally — Unlimited Panic Button & Coach forever</span>
                    </div>
                  </div>

                  <Button 
                    onClick={detectOSAndRedirect}
                    size="lg" 
                    className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md rounded-xl mt-4"
                  >
                    Claim Your Custom Plan & Open App
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-muted pt-2">
                    <Lock className="w-3 h-3" />
                    <span>Instant Access • 100% Secure • No Recurring Fees</span>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-muted text-center">
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
  )
}