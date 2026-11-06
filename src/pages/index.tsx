import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Sparkles, ChevronRight, CheckCircle, Zap, Brain, Heart, Shield, Loader2, ArrowRight, AlertTriangle, TrendingUp, Lock, Plus, Minus, Coffee, Apple, Candy, Cake, IceCream, Droplets } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/integrations/supabase/client'

type DrinkItem = {
  id: string
  label: string
  icon: React.ReactNode
  grams: number
}

type SweetItem = {
  id: string
  label: string
  icon: React.ReactNode
  grams: number
}

type QuizData = {
  gender?: string
  ageGroup?: string
  height?: string
  weight?: string
  primaryGoal?: string
  drinks: Record<string, number>
  sweets: Record<string, number>
  triggers?: string
}

const drinkItems: DrinkItem[] = [
  { id: 'soda', label: 'Carbonated Soda / Energy Drinks', icon: <Droplets className="w-5 h-5" />, grams: 35 },
  { id: 'juice', label: 'Store Juice / Fruit Yogurt', icon: <Apple className="w-5 h-5" />, grams: 25 },
  { id: 'coffee', label: 'Coffee with sugar / Syrups', icon: <Coffee className="w-5 h-5" />, grams: 15 },
  { id: 'water', label: 'Water / Unsweetened Tea', icon: <Droplets className="w-5 h-5" />, grams: 0 },
]

const sweetItems: SweetItem[] = [
  { id: 'chocolate', label: 'Chocolate / Cookies / Sweets', icon: <Candy className="w-5 h-5" />, grams: 40 },
  { id: 'bakery', label: 'Bakery / Croissants / White Bread', icon: <Cake className="w-5 h-5" />, grams: 25 },
  { id: 'icecream', label: 'Ice Cream / Sweet Desserts', icon: <IceCream className="w-5 h-5" />, grams: 30 },
  { id: 'none', label: 'Rarely consume sweets', icon: <CheckCircle className="w-5 h-5" />, grams: 0 },
]

const sugarWeights: Record<string, number> = {
  soda: 35,
  juice: 25,
  coffee: 15,
  chocolate: 40,
  bakery: 30,
  bread: 3.5,
  icecream: 30
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
  const [quizData, setQuizData] = useState<QuizData>({ drinks: {}, sweets: {} })
  const [hasSession, setHasSession] = useState(false)
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [calculatedResults, setCalculatedResults] = useState({
    dailyGrams: 0,
    annualKg: 0,
    zone: '',
    zoneColor: '',
    zoneMessage: ''
  })

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setHasSession(!!session)
      setIsCheckingSession(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSession(!!session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const calculateResults = () => {
    let totalGrams = 0

    Object.entries(quizData.drinks).forEach(([id, count]) => {
      const item = drinkItems.find(d => d.id === id)
      if (item) totalGrams += item.grams * count
    })

    Object.entries(quizData.sweets).forEach(([id, count]) => {
      const item = sweetItems.find(s => s.id === id)
      if (item) totalGrams += item.grams * count
    })

    const annualKg = (totalGrams * 365) / 1000

    let zone = ''
    let zoneColor = ''
    let zoneMessage = ''

    if (totalGrams < 25) {
      zone = 'GREEN ZONE'
      zoneColor = 'bg-primary'
      zoneMessage = 'Great! Your intake is within healthy limits.'
    } else if (totalGrams < 50) {
      zone = 'YELLOW ZONE'
      zoneColor = 'bg-yellow-500'
      zoneMessage = 'Moderate excess. Mild energy crashes.'
    } else if (totalGrams < 80) {
      zone = 'ORANGE ZONE'
      zoneColor = 'bg-orange-500'
      zoneMessage = 'High excess! Your taste receptors are under stress.'
    } else if (totalGrams < 120) {
      zone = 'RED ZONE'
      zoneColor = 'bg-destructive'
      zoneMessage = `Shock Zone! Over ${annualKg.toFixed(1)}kg of sugar yearly. Urgent 30-day reset needed!`
    } else {
      zone = 'CRITICAL ZONE'
      zoneColor = 'bg-red-900'
      zoneMessage = 'Critical Sugar Reliance! Severe risk of sugar crashes and constant fatigue.'
    }

    setCalculatedResults({ dailyGrams: totalGrams, annualKg, zone, zoneColor, zoneMessage })

    const summary = `Daily sugar: ${totalGrams}g | Zone: ${zone} | Primary goal: ${quizData.primaryGoal || 'wellness'} | Triggers: ${quizData.triggers || 'general'}`
    
    localStorage.setItem('pending_quiz_answers', JSON.stringify({
      ...quizData,
      dailyGrams: totalGrams,
      annualKg,
      zone,
      ai_context_summary: summary
    }))
  }

  const updateDrinkCount = (id: string, delta: number) => {
    const current = quizData.drinks[id] || 0
    const newCount = Math.max(0, Math.min(10, current + delta))
    setQuizData({ ...quizData, drinks: { ...quizData.drinks, [id]: newCount } })
  }

  const updateSweetCount = (id: string, delta: number) => {
    const current = quizData.sweets[id] || 0
    const newCount = Math.max(0, Math.min(10, current + delta))
    setQuizData({ ...quizData, sweets: { ...quizData.sweets, [id]: newCount } })
  }

  const handleStep1Submit = (field: string, value: string) => {
    setQuizData({ ...quizData, [field]: value })
  }

  const nextStep = () => {
    if (quizStep === 4) {
      calculateResults()
      setCurrentScreen('loading')
      setTimeout(() => {
        setCurrentScreen('results')
      }, 2000)
    } else {
      setQuizStep(quizStep + 1)
    }
  }

  const startQuiz = () => {
    setCurrentScreen('quiz')
    setQuizStep(1)
  }

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    )
  }

  if (hasSession) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-[420px]">
          <Card className="p-8 shadow-lg rounded-2xl border-2 border-primary/30 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Welcome Back!</h2>
              <p className="text-sm text-muted">You're already signed in. Continue to your dashboard.</p>
            </div>
            <Button 
              onClick={() => window.location.href = '/app'}
              size="lg" 
              className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md rounded-xl"
            >
              Go to My Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[420px]">
        <div className="space-y-4">
          {currentScreen === 'hero' && (
            <div className="animate-in fade-in duration-500">
              <div className="text-center space-y-6 py-8">
                <Badge className="mx-auto bg-primary/10 text-primary border-primary/20 px-4 py-1">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Sugar Shock Calculator
                </Badge>

                <div className="space-y-3">
                  <h1 className="text-3xl font-bold text-foreground leading-tight">
                    Discover Your Real Daily Sugar Intake
                  </h1>
                  <p className="text-sm text-muted leading-relaxed">
                    Take the 60-second quiz to see exactly how much hidden sugar you consume daily — and get your personalized 30-day reset plan.
                  </p>
                </div>

                <Button 
                  onClick={startQuiz}
                  size="lg" 
                  className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg rounded-xl mt-6"
                >
                  Calculate My Sugar Dependency
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
                    <Badge variant="outline" className="text-xs">Step {quizStep} of 4</Badge>
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
                      <h2 className="text-lg font-bold text-foreground">Basic Parameters</h2>
                      
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Gender</label>
                          <div className="grid grid-cols-2 gap-2">
                            {['Male', 'Female'].map((option) => (
                              <button
                                key={option}
                                onClick={() => handleStep1Submit('gender', option)}
                                className={`p-3 text-sm rounded-xl border-2 transition-all font-medium ${
                                  quizData.gender === option
                                    ? 'border-primary bg-primary/5 text-foreground'
                                    : 'border-border hover:border-primary/50 text-foreground'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Age Group</label>
                          <div className="grid grid-cols-2 gap-2">
                            {['18-30', '31-45', '46-60', '60+'].map((option) => (
                              <button
                                key={option}
                                onClick={() => handleStep1Submit('ageGroup', option)}
                                className={`p-3 text-sm rounded-xl border-2 transition-all font-medium ${
                                  quizData.ageGroup === option
                                    ? 'border-primary bg-primary/5 text-foreground'
                                    : 'border-border hover:border-primary/50 text-foreground'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Primary Goal</label>
                          <div className="space-y-2">
                            {['Weight Loss', 'More Energy', 'Better Sleep', 'Overall Health'].map((option) => (
                              <button
                                key={option}
                                onClick={() => handleStep1Submit('primaryGoal', option)}
                                className={`w-full p-3 text-left text-sm rounded-xl border-2 transition-all font-medium ${
                                  quizData.primaryGoal === option
                                    ? 'border-primary bg-primary/5 text-foreground'
                                    : 'border-border hover:border-primary/50 text-foreground'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>

                        <Button 
                          onClick={nextStep}
                          disabled={!quizData.gender || !quizData.ageGroup || !quizData.primaryGoal}
                          className="w-full mt-4"
                        >
                          Continue
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {quizStep === 2 && (
                    <div className="space-y-4">
                      <h2 className="text-lg font-bold text-foreground">Daily Drinks</h2>
                      <p className="text-xs text-muted">Select what you drink and how many per day</p>
                      
                      <div className="space-y-3">
                        {drinkItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border-2 border-border">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                {item.icon}
                              </div>
                              <span className="text-sm font-medium text-foreground">{item.label}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateDrinkCount(item.id, -1)}
                                className="w-8 h-8 rounded-lg bg-border hover:bg-primary/20 flex items-center justify-center transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-bold text-foreground">{quizData.drinks[item.id] || 0}</span>
                              <button
                                onClick={() => updateDrinkCount(item.id, 1)}
                                className="w-8 h-8 rounded-lg bg-border hover:bg-primary/20 flex items-center justify-center transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button onClick={nextStep} className="w-full mt-4">
                        Continue
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}

                  {quizStep === 3 && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="text-center space-y-2 mb-6">
                        <h2 className="text-xl font-bold text-foreground">
                          Step 3: Sweets & Baked Goods
                        </h2>
                        <p className="text-sm text-muted">
                          Select items and set daily frequency
                        </p>
                      </div>

                      <div className="space-y-3">
                        <Card 
                          className={`p-4 cursor-pointer transition-all ${
                            selections.chocolate > 0 ? 'border-primary border-2 bg-primary/5' : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => selections.chocolate === 0 && handleFrequencyChange('chocolate', 1)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                🍫
                              </div>
                              <span className="text-sm font-medium">Chocolate / Cookies / Sweets</span>
                            </div>
                            {selections.chocolate > 0 && (
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 w-7 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleFrequencyChange('chocolate', selections.chocolate - 1)
                                  }}
                                >
                                  -
                                </Button>
                                <span className="text-sm font-bold w-8 text-center">{selections.chocolate}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 w-7 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleFrequencyChange('chocolate', selections.chocolate + 1)
                                  }}
                                >
                                  +
                                </Button>
                              </div>
                            )}
                          </div>
                        </Card>

                        <Card 
                          className={`p-4 cursor-pointer transition-all ${
                            selections.bakery > 0 ? 'border-primary border-2 bg-primary/5' : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => selections.bakery === 0 && handleFrequencyChange('bakery', 1)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                🥐
                              </div>
                              <span className="text-sm font-medium">Bakery / Croissants / Sweet Pastries</span>
                            </div>
                            {selections.bakery > 0 && (
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 w-7 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleFrequencyChange('bakery', selections.bakery - 1)
                                  }}
                                >
                                  -
                                </Button>
                                <span className="text-sm font-bold w-8 text-center">{selections.bakery}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 w-7 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleFrequencyChange('bakery', selections.bakery + 1)
                                  }}
                                >
                                  +
                                </Button>
                              </div>
                            )}
                          </div>
                        </Card>

                        <Card 
                          className={`p-4 cursor-pointer transition-all ${
                            selections.bread > 0 ? 'border-primary border-2 bg-primary/5' : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => selections.bread === 0 && handleFrequencyChange('bread', 1)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                🍞
                              </div>
                              <span className="text-sm font-medium">White Bread (Per Slice)</span>
                            </div>
                            {selections.bread > 0 && (
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 w-7 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleFrequencyChange('bread', selections.bread - 1)
                                  }}
                                >
                                  -
                                </Button>
                                <span className="text-sm font-bold w-8 text-center">{selections.bread}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 w-7 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleFrequencyChange('bread', selections.bread + 1)
                                  }}
                                >
                                  +
                                </Button>
                              </div>
                            )}
                          </div>
                        </Card>

                        <Card 
                          className={`p-4 cursor-pointer transition-all ${
                            selections.icecream > 0 ? 'border-primary border-2 bg-primary/5' : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => selections.icecream === 0 && handleFrequencyChange('icecream', 1)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                🍨
                              </div>
                              <span className="text-sm font-medium">Ice Cream / Sweet Desserts</span>
                            </div>
                            {selections.icecream > 0 && (
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 w-7 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleFrequencyChange('icecream', selections.icecream - 1)
                                  }}
                                >
                                  -
                                </Button>
                                <span className="text-sm font-bold w-8 text-center">{selections.icecream}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 w-7 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleFrequencyChange('icecream', selections.icecream + 1)
                                  }}
                                >
                                  +
                                </Button>
                              </div>
                            )}
                          </div>
                        </Card>
                      </div>

                      <Button 
                        onClick={() => setQuizStep(4)}
                        size="lg" 
                        className="w-full h-12 text-base font-bold mt-6"
                        disabled={Object.values(selections).every(v => v === 0)}
                      >
                        Continue
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}

                  {quizStep === 4 && (
                    <div className="space-y-4">
                      <h2 className="text-lg font-bold text-foreground">When do cravings hit hardest?</h2>
                      <div className="space-y-2">
                        {[
                          { value: 'aftermeal', label: 'After meals' },
                          { value: 'stress', label: 'Stress / Fatigue' },
                          { value: 'night', label: 'Late night TV' },
                          { value: 'constant', label: 'Constant snacking' }
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setQuizData({ ...quizData, triggers: option.value })
                              setTimeout(nextStep, 300)
                            }}
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
                    <h3 className="text-lg font-bold text-foreground">Calculating Your Profile...</h3>
                    <p className="text-sm text-muted">Analyzing your sugar intake & building recovery strategy</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {currentScreen === 'results' && (
            <div className="animate-in fade-in duration-500 space-y-4">
              <Card className="p-6 shadow-lg rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
                <div className="space-y-6">
                  <div className="text-center space-y-3">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Analysis Complete
                    </Badge>
                    <h2 className="text-xl font-bold text-foreground">Your Sugar Shock Results</h2>
                  </div>

                  <div className="space-y-4">
                    <div className={`p-5 rounded-xl ${calculatedResults.zoneColor} bg-opacity-20 border-2`}>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold">Daily Sugar Intake</p>
                          <Badge className={`${calculatedResults.zoneColor} text-white`}>
                            {calculatedResults.zone}
                          </Badge>
                        </div>
                        <div className="text-center space-y-1">
                          <p className="text-4xl font-bold text-foreground">{calculatedResults.dailyGrams}g</p>
                          <p className="text-xs text-muted">vs 25g max recommended</p>
                        </div>
                        <p className="text-sm text-foreground font-medium">{calculatedResults.zoneMessage}</p>
                        
                        {calculatedResults.dailyGrams > 25 && (
                          <div className="pt-3 border-t border-foreground/20">
                            <p className="text-xs text-foreground">
                              <span className="font-bold">Annual Balance:</span> ~{calculatedResults.annualKg.toFixed(1)}kg of sugar per year
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {calculatedResults.dailyGrams >= 50 && (
                      <div className="p-4 rounded-xl bg-accent/10 border-2 border-accent/30">
                        <div className="flex items-start gap-3">
                          <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                          <div>
                            <p className="text-sm font-bold text-foreground">Emergency 30-Day Reset Recommended</p>
                            <p className="text-xs text-muted mt-1">
                              Your intake requires immediate intervention to prevent long-term metabolic damage.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-lg rounded-2xl border-2 border-primary/30">
                <div className="space-y-4">
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-bold text-foreground">Start Your 30-Day Journey Today</h3>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-primary uppercase tracking-wide">No Subscription</p>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-3xl font-bold text-primary">$19.99</span>
                        <span className="text-sm text-muted">One-Time Payment</span>
                      </div>
                      <p className="text-xs font-semibold text-accent">Lifetime Access • Pay Once, Own Forever</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="font-medium">30-Day Guided Transformation — Physiological & mindset reset</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="font-medium">Unlimited Panic Button & Coach</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="font-medium">Available on iOS and Android</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="font-medium">Your 100% Free Lifetime Ally (after 30-day program)</span>
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