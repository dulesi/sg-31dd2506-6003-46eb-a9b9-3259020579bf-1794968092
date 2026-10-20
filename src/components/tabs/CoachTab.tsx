import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { UtensilsCrossed, Brain, Zap, Smartphone, Coffee, ChevronRight, RotateCcw, Loader2 } from 'lucide-react'

interface CoachTabProps {
  data: any
  onUpdate: (updates: any) => void
  triggerStart: boolean
  onTriggerClear: () => void
}

const triggers = [
  { id: 'hunger', label: 'Genuine Hunger', subtitle: 'Skipped a meal', icon: UtensilsCrossed },
  { id: 'stress', label: 'Stress', subtitle: 'Work anxiety / Tension', icon: Brain },
  { id: 'fatigue', label: 'Fatigue', subtitle: 'Afternoon energy crash', icon: Zap },
  { id: 'boredom', label: 'Boredom', subtitle: 'Mindless scrolling', icon: Smartphone },
  { id: 'habit', label: 'Habit', subtitle: 'Right after lunch or dinner', icon: Coffee }
]

const intensities = [
  { id: 1, label: 'Mild Craving', subtitle: 'I can easily distract myself', color: 'bg-green-100 text-green-700 border-green-300' },
  { id: 2, label: 'Moderate Craving', subtitle: 'Noticeable urge, need action', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  { id: 3, label: 'Strong Craving', subtitle: 'Hard to resist right now', color: 'bg-orange-100 text-orange-700 border-orange-300' },
  { id: 4, label: 'EMERGENCY!', subtitle: 'Dying for sugar, about to break!', color: 'bg-red-100 text-red-700 border-red-300' }
]

export default function CoachTab({ data, onUpdate, triggerStart, onTriggerClear }: CoachTabProps) {
  const [step, setStep] = useState(0)
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null)
  const [selectedIntensity, setSelectedIntensity] = useState<number | null>(null)
  const [advice, setAdvice] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (triggerStart) {
      setStep(1)
      onTriggerClear()
    }
  }, [triggerStart, onTriggerClear])

  const fetchAdvice = async (trigger: string, intensity: number) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'craving', trigger, intensity })
      })

      if (!response.ok) throw new Error('Failed to get advice')

      const data = await response.json()
      setAdvice(data.advice)
      setStep(3)
    } catch (err) {
      setError('Unable to connect to AI Coach. Please check your internet connection.')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAlternative = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'alternative', currentAdvice: advice })
      })

      if (!response.ok) throw new Error('Failed to get alternative')

      const data = await response.json()
      setAdvice(data.advice)
    } catch (err) {
      setError('Unable to fetch alternative. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTriggerSelect = (triggerId: string) => {
    setSelectedTrigger(triggerId)
    setStep(2)
  }

  const handleIntensitySelect = async (intensity: number) => {
    setSelectedIntensity(intensity)
    if (selectedTrigger) {
      await fetchAdvice(selectedTrigger, intensity)
    }
  }

  const handleReset = () => {
    setStep(1)
    setSelectedTrigger(null)
    setSelectedIntensity(null)
    setAdvice('')
    setError(null)
  }

  return (
    <div className="p-4 space-y-4">
      <div className="pt-2 pb-4">
        <h1 className="text-2xl font-bold text-foreground">Craving Coach</h1>
        <p className="text-sm text-muted">AI-powered emergency support</p>
      </div>

      {step === 0 && (
        <Card className="p-8 shadow-md rounded-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Ready to Help</h2>
          <p className="text-muted">Tap the PANIC button when you need instant support, or start here.</p>
          <Button 
            onClick={() => setStep(1)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
            size="lg"
          >
            Start Coach Session
          </Button>
        </Card>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <Card className="p-6 shadow-md rounded-2xl">
            <h2 className="text-lg font-bold text-foreground mb-4">Step 1 of 3</h2>
            <p className="text-base font-medium text-foreground mb-6">
              What is triggering this craving right now?
            </p>
            
            <div className="space-y-3">
              {triggers.map((trigger) => (
                <button
                  key={trigger.id}
                  onClick={() => handleTriggerSelect(trigger.id)}
                  className="w-full p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-muted/20 group-hover:bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <trigger.icon className="w-6 h-6 text-muted group-hover:text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-foreground">{trigger.label}</div>
                    <div className="text-sm text-muted">{trigger.subtitle}</div>
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
            <h2 className="text-lg font-bold text-foreground mb-4">Step 2 of 3</h2>
            <p className="text-base font-medium text-foreground mb-6">
              How strong is the impulse?
            </p>
            
            <div className="space-y-3">
              {intensities.map((intensity) => (
                <button
                  key={intensity.id}
                  onClick={() => handleIntensitySelect(intensity.id)}
                  disabled={isLoading}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${intensity.color} disabled:opacity-50`}
                >
                  <div className="font-bold mb-1">Level {intensity.id}: {intensity.label}</div>
                  <div className="text-sm opacity-75">{intensity.subtitle}</div>
                </button>
              ))}
            </div>

            {isLoading && (
              <div className="flex items-center justify-center gap-2 text-primary mt-4">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm font-medium">AI Coach is analyzing...</span>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}
          </Card>

          <Button onClick={() => setStep(1)} variant="outline" className="w-full">
            ← Back
          </Button>
        </div>
      )}

      {step === 3 && advice && (
        <div className="space-y-4">
          <Card className="p-6 shadow-md rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Your AI Action Plan</h2>
              <Badge variant="outline" className="text-primary border-primary">
                Step 3 of 3
              </Badge>
            </div>

            <div className="p-6 rounded-xl bg-primary/10 border-2 border-primary/20">
              <p className="text-base font-medium text-foreground leading-relaxed whitespace-pre-wrap">
                {advice}
              </p>
            </div>

            <Button
              onClick={fetchAlternative}
              disabled={isLoading}
              variant="outline"
              size="lg"
              className="w-full border-2 font-medium"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Alternative...
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  I Don't Have This At Home
                </>
              )}
            </Button>

            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted mb-3">
                <strong className="text-foreground">Remember:</strong> The craving will pass within 10-15 minutes. This protocol gives your brain a pattern interrupt.
              </p>
              <Button onClick={handleReset} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                Done - Start New Session
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}