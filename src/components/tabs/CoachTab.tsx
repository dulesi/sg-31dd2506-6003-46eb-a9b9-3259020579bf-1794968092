import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, Loader2, CheckCircle, Sparkles, Share2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { incrementAssessment } from '@/lib/localStorage'
import { shareProgress } from '@/lib/share'

interface CoachTabProps {
  data: any
  onUpdate: (updates: any) => void
  triggerStart: boolean
  onTriggerClear: () => void
  onComplete?: () => void
}

type AssessmentAdvice = {
  biology: string
  community: string
  action: string
}

const feelings = [
  { id: 'great', label: 'Great & Happy', emoji: '🌟' },
  { id: 'good', label: 'Good & In Control', emoji: '👍' },
  { id: 'tired', label: 'Tired or Sleepy', emoji: '🥱' },
  { id: 'bored', label: 'Bored or Distracted', emoji: '📱' },
  { id: 'stressed', label: 'Stressed or Overwhelmed', emoji: '🤯' },
  { id: 'lowenergy', label: 'Low Energy or Unmotivated', emoji: '🔋' },
  { id: 'discomfort', label: 'Headache or Physical Discomfort', emoji: '🤕' },
  { id: 'craving', label: 'Craving Sugar Right Now', emoji: '🍫' }
]

const timings = [
  { id: 'morning', label: 'Since early morning', emoji: '🌅' },
  { id: 'breakfast', label: 'After breakfast', emoji: '🍳' },
  { id: 'midday', label: 'Mid-day / at work', emoji: '💼' },
  { id: 'lunch', label: 'After lunch', emoji: '🥗' },
  { id: 'afterwork', label: 'After work', emoji: '🏠' },
  { id: 'evening', label: 'Late evening', emoji: '🌙' },
  { id: 'sudden', label: 'Sudden moment (unrelated to time)', emoji: '⚡' }
]

const supportTypes = [
  { id: 'science', label: 'Science & Physiology', subtitle: 'Explain what my brain/body is doing', emoji: '🧠' },
  { id: 'community', label: 'Community Proof & Stories', subtitle: 'How others handle this state', emoji: '👥' },
  { id: 'mindset', label: 'Guided Mindset Shift', subtitle: 'A 2-minute perspective shift exercise', emoji: '🎯' }
]

export default function CoachTab({ data, onUpdate, triggerStart, onTriggerClear, onComplete }: CoachTabProps) {
  const [step, setStep] = useState(0)
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null)
  const [selectedTiming, setSelectedTiming] = useState<string | null>(null)
  const [selectedSupport, setSelectedSupport] = useState<string | null>(null)
  const [advice, setAdvice] = useState<string | AssessmentAdvice | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const assessmentCount = data.assessmentsToday || 0
  const assessmentLimitReached = assessmentCount >= 10

  useEffect(() => {
    if (triggerStart) {
      setStep(1)
      onTriggerClear()
    }
  }, [triggerStart, onTriggerClear])

  const fetchAssessment = async (feeling: string, timing: string, supportType: string) => {
    const { limitReached } = incrementAssessment()
    
    if (limitReached) {
      toast({
        title: "Daily limit reached",
        description: "You've completed your 10 daily mindset check-ins! Focus on applying today's insights.",
        duration: 5000,
      })
      onUpdate({ assessmentsToday: 11, assessmentDate: new Date().toISOString().split('T')[0] })
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'mindset-assessment', feeling, timing, supportType })
      })

      if (!response.ok) throw new Error('Failed to get assessment')

      const data = await response.json()
      setAdvice(data.advice)
      setStep(4)
    } catch (err) {
      setError('Unable to connect to AI Coach. Please check your internet connection.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFeelingSelect = (feelingId: string) => {
    setSelectedFeeling(feelingId)
    setStep(2)
  }

  const handleTimingSelect = (timingId: string) => {
    setSelectedTiming(timingId)
    setStep(3)
  }

  const handleSupportSelect = async (supportId: string) => {
    setSelectedSupport(supportId)
    if (selectedFeeling && selectedTiming) {
      await fetchAssessment(selectedFeeling, selectedTiming, supportId)
    }
  }

  const handleReset = () => {
    setStep(0)
    setSelectedFeeling(null)
    setSelectedTiming(null)
    setSelectedSupport(null)
    setAdvice(null)
    setError(null)
  }

  const handleComplete = () => {
    handleReset()
    if (onComplete) {
      onComplete()
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="pt-2 pb-4">
        <h1 className="text-2xl font-bold text-foreground">Craving Coach</h1>
        <p className="text-sm text-muted">Your personal guide to understanding how sugar impacts your daily life</p>
      </div>

      {step === 0 && (
        <Card className="p-8 shadow-md rounded-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Daily Mindset Check-In</h2>
          <p className="text-muted">Take a moment to understand your current state and get personalized guidance.</p>
          <Button 
            onClick={() => setStep(1)}
            disabled={assessmentLimitReached}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
            size="lg"
          >
            {assessmentLimitReached ? `Daily Limit Reached (${assessmentCount}/10)` : 'Start Assessment'}
          </Button>
          {assessmentLimitReached && (
            <p className="text-xs text-muted italic">
              Focus on applying today's insights. Limit resets at midnight.
            </p>
          )}
        </Card>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <Card className="p-6 shadow-md rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Step 1 of 3</h2>
              <Badge variant="outline" className="text-primary border-primary/20">
                Feeling Check
              </Badge>
            </div>
            <p className="text-base font-medium text-foreground mb-6">
              How are you feeling right now?
            </p>
            
            <div className="space-y-3">
              {feelings.map((feeling) => (
                <button
                  key={feeling.id}
                  onClick={() => handleFeelingSelect(feeling.id)}
                  className="w-full p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left flex items-center gap-4 group"
                >
                  <div className="text-3xl flex-shrink-0">{feeling.emoji}</div>
                  <div className="flex-1">
                    <div className="font-bold text-foreground">{feeling.label}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted group-hover:text-primary" />
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <Card className="p-6 shadow-md rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Step 2 of 3</h2>
              <Badge variant="outline" className="text-primary border-primary/20">
                Timing
              </Badge>
            </div>
            <p className="text-base font-medium text-foreground mb-6">
              When did this feeling start?
            </p>
            
            <div className="space-y-3">
              {timings.map((timing) => (
                <button
                  key={timing.id}
                  onClick={() => handleTimingSelect(timing.id)}
                  className="w-full p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left flex items-center gap-4 group"
                >
                  <div className="text-3xl flex-shrink-0">{timing.emoji}</div>
                  <div className="flex-1">
                    <div className="font-bold text-foreground">{timing.label}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted group-hover:text-primary" />
                </button>
              ))}
            </div>
          </Card>

          <Button onClick={() => setStep(1)} variant="outline" className="w-full">
            ← Back
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <Card className="p-6 shadow-md rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Step 3 of 3</h2>
              <Badge variant="outline" className="text-primary border-primary/20">
                Support Type
              </Badge>
            </div>
            <p className="text-base font-medium text-foreground mb-6">
              What type of support or insight do you need?
            </p>
            
            <div className="space-y-3">
              {supportTypes.map((support) => (
                <button
                  key={support.id}
                  onClick={() => handleSupportSelect(support.id)}
                  disabled={isLoading}
                  className="w-full p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left flex items-center gap-4 group disabled:opacity-50"
                >
                  <div className="text-3xl flex-shrink-0">{support.emoji}</div>
                  <div className="flex-1">
                    <div className="font-bold text-foreground mb-1">{support.label}</div>
                    <div className="text-sm text-muted">{support.subtitle}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted group-hover:text-primary" />
                </button>
              ))}
            </div>

            {isLoading && (
              <div className="flex items-center justify-center gap-2 text-primary mt-4">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm font-medium">AI Coach is analyzing your check-in...</span>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}
          </Card>

          <Button onClick={() => setStep(2)} variant="outline" className="w-full">
            ← Back
          </Button>
        </div>
      )}

      {step === 4 && advice && (
        <div className="space-y-4">
          <Card className="p-6 shadow-md rounded-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Your Personal Insight</h2>
              <Badge variant="outline" className="text-primary border-primary">
                Complete
              </Badge>
            </div>

            {typeof advice === 'object' && advice.biology && advice.community && advice.action ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-foreground font-semibold">
                    <span className="text-xl">🧠</span>
                    <h3 className="text-base">What's Happening</h3>
                  </div>
                  <p className="text-sm text-muted leading-relaxed pl-7">
                    {advice.biology}
                  </p>
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-foreground font-semibold">
                    <span className="text-xl">👥</span>
                    <h3 className="text-base">Community Insight</h3>
                  </div>
                  <p className="text-sm text-muted leading-relaxed pl-7">
                    {advice.community}
                  </p>
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-foreground font-semibold">
                    <span className="text-xl">🎯</span>
                    <h3 className="text-base">Today's Action</h3>
                  </div>
                  <p className="text-sm text-muted leading-relaxed pl-7">
                    {advice.action}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-primary/10 border-2 border-primary/20">
                <p className="text-base font-medium text-foreground leading-relaxed whitespace-pre-wrap">
                  {typeof advice === 'string' ? advice : JSON.stringify(advice)}
                </p>
              </div>
            )}

            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="pt-4 border-t border-border space-y-3">
              <Button onClick={handleComplete} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                <CheckCircle className="w-4 h-4 mr-2" />
                Done - Back to Progress
              </Button>
              <Button
                onClick={() => shareProgress(data.currentStreak || 0)}
                variant="outline"
                className="w-full border-primary/30 text-primary hover:bg-primary/5"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Victory
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}