import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { UtensilsCrossed, Brain, Zap, Smartphone, Coffee, ChevronRight, RotateCcw } from 'lucide-react'

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

const protocols: Record<string, Record<number, { primary: string, backup: string }>> = {
  hunger: {
    1: { primary: 'Eat a handful of raw almonds with a glass of water', backup: 'Do 10 slow deep breaths, then eat any protein-rich snack' },
    2: { primary: 'Prepare a quick protein snack: Greek yogurt or hard-boiled egg', backup: 'Drink 2 glasses of cold water, wait 5 minutes, reassess' },
    3: { primary: 'Make a proper meal immediately - scrambled eggs or avocado toast', backup: 'Eat any available protein, then do 20 jumping jacks to reset' },
    4: { primary: 'Emergency meal: any protein + fat combo NOW', backup: 'Splash cold water on face, do 30 jump squats, then eat protein' }
  },
  stress: {
    1: { primary: 'Step outside for 2 minutes of fresh air and deep breathing', backup: '60-second box breathing: inhale 4, hold 4, exhale 4, hold 4' },
    2: { primary: 'Do 5 minutes of stretching or a quick walk around the block', backup: 'Close eyes, tense all muscles for 5 seconds, release completely. Repeat 5 times.' },
    3: { primary: 'Take a 10-minute power walk or do 20 burpees to clear cortisol', backup: 'Cold shower for 2 minutes OR ice on wrists for 30 seconds' },
    4: { primary: 'Intense 5-minute workout: burpees, squats, push-ups until exhausted', backup: 'Scream into a pillow for 30 seconds, then cold water face splash' }
  },
  fatigue: {
    1: { primary: 'Drink a large glass of ice-cold water and chew mint gum', backup: 'Splash cold water on face and do 10 arm circles' },
    2: { primary: 'Quick power nap (10 minutes) or cold shower', backup: 'Run in place for 60 seconds, then stretch' },
    3: { primary: 'Take a 15-minute power nap, set alarm', backup: 'Do 20 jumping jacks followed by cold water on wrists' },
    4: { primary: 'Emergency caffeine: black coffee or green tea + 20-minute nap', backup: 'Cold shower, then 50 high knees to spike energy' }
  },
  boredom: {
    1: { primary: 'Call a friend or text someone you haven\'t talked to in a while', backup: 'Write down 3 things you\'re grateful for right now' },
    2: { primary: 'Start a 5-minute engaging task: organize drawer, quick cleaning', backup: 'Do a crossword puzzle OR scroll social media for exactly 3 minutes' },
    3: { primary: 'Leave your location: go for a walk or drive somewhere new', backup: 'Dance to your favorite song at full volume for 3 minutes' },
    4: { primary: 'Change environment completely: go outside, visit a store, drive', backup: 'Call someone and have a real conversation for 10 minutes' }
  },
  habit: {
    1: { primary: 'Replace with new habit: herbal tea or sparkling water', backup: 'Chew gum and do a different activity than usual' },
    2: { primary: 'Break the pattern: brush teeth immediately after meal', backup: 'Go for a 5-minute walk right after eating' },
    3: { primary: 'Change routine completely: eat in different location, different order', backup: 'Set a 10-minute timer and do any non-food activity' },
    4: { primary: 'Emergency pattern interrupt: leave house immediately after eating', backup: 'Take a cold shower right after your meal' }
  }
}

export default function CoachTab({ data, onUpdate, triggerStart, onTriggerClear }: CoachTabProps) {
  const [step, setStep] = useState(0)
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null)
  const [selectedIntensity, setSelectedIntensity] = useState<number | null>(null)
  const [showBackup, setShowBackup] = useState(false)

  useEffect(() => {
    if (triggerStart) {
      setStep(1)
      onTriggerClear()
    }
  }, [triggerStart, onTriggerClear])

  const handleTriggerSelect = (triggerId: string) => {
    setSelectedTrigger(triggerId)
    setStep(2)
  }

  const handleIntensitySelect = (intensity: number) => {
    setSelectedIntensity(intensity)
    setStep(3)
    setShowBackup(false)
  }

  const handleReset = () => {
    setStep(1)
    setSelectedTrigger(null)
    setSelectedIntensity(null)
    setShowBackup(false)
  }

  const protocol = selectedTrigger && selectedIntensity 
    ? protocols[selectedTrigger]?.[selectedIntensity]
    : null

  return (
    <div className="p-4 space-y-4">
      <div className="pt-2 pb-4">
        <h1 className="text-2xl font-bold text-foreground">Craving Coach</h1>
        <p className="text-sm text-muted">Your emergency support system</p>
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
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${intensity.color}`}
                >
                  <div className="font-bold mb-1">Level {intensity.id}: {intensity.label}</div>
                  <div className="text-sm opacity-75">{intensity.subtitle}</div>
                </button>
              ))}
            </div>
          </Card>

          <Button onClick={() => setStep(1)} variant="outline" className="w-full">
            ← Back
          </Button>
        </div>
      )}

      {step === 3 && protocol && (
        <div className="space-y-4">
          <Card className="p-6 shadow-md rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Your Action Plan</h2>
              <Badge variant="outline" className="text-primary border-primary">
                Step 3 of 3
              </Badge>
            </div>

            <div className="p-6 rounded-xl bg-primary/10 border-2 border-primary/20">
              <p className="text-base font-medium text-foreground leading-relaxed">
                {showBackup ? protocol.backup : protocol.primary}
              </p>
            </div>

            <Button
              onClick={() => setShowBackup(!showBackup)}
              variant="outline"
              size="lg"
              className="w-full border-2 font-medium"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {showBackup ? 'Show Original Plan' : 'I Don\'t Have This At Home'}
            </Button>

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