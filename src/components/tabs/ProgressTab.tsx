import { useState, useEffect } from 'react'
import CircularProgress from '@/components/CircularProgress'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, AlertCircle, Lightbulb, Sparkles, RefreshCw, Loader2, Share2 } from 'lucide-react'
import Confetti from 'react-confetti'
import { useWindowSize } from '@/hooks/use-window-size'
import { useToast } from '@/hooks/use-toast'
import { incrementHackRefresh } from '@/lib/localStorage'
import { shareProgress } from '@/lib/share'

interface ProgressTabProps {
  data: any
  onUpdate: (updates: any) => void
  onPanicClick: () => void
}

export default function ProgressTab({ data, onUpdate, onPanicClick }: ProgressTabProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [showSlipOverlay, setShowSlipOverlay] = useState(false)
  const [dailyHack, setDailyHack] = useState<string>('')
  const [isLoadingHack, setIsLoadingHack] = useState(false)
  const { width, height } = useWindowSize()
  const { toast } = useToast()

  const hackRefreshCount = data.hackRefreshesToday || 0
  const hackLimitReached = hackRefreshCount >= 10

  useEffect(() => {
    fetchDailyHack()
  }, [])

  const fetchDailyHack = async () => {
    const { limitReached } = incrementHackRefresh()
    
    if (limitReached) {
      toast({
        title: "Daily limit reached",
        description: "You've reached your daily limit of 10 hacks. Pick one from today and put it into practice!",
        duration: 5000,
      })
      onUpdate({ hackRefreshesToday: 11, hackRefreshDate: new Date().toISOString().split('T')[0] })
      return
    }

    setIsLoadingHack(true)
    try {
      const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'daily-hack' })
      })

      if (response.ok) {
        const data = await response.json()
        setDailyHack(data.advice)
      }
    } catch (err) {
      setDailyHack('When a craving hits, drink a full glass of ice-cold water first. Cold water triggers your body\'s thermogenic response, temporarily suppressing appetite.')
    } finally {
      setIsLoadingHack(false)
    }
  }

  const handleYesClick = () => {
    const today = new Date().toISOString().split('T')[0]
    
    if (data.lastCheckIn === today) return

    const newStreak = data.currentStreak + 1
    const newDay = data.currentDay + 1
    const newBest = Math.max(newStreak, data.bestStreak)

    onUpdate({
      currentDay: newDay,
      currentStreak: newStreak,
      bestStreak: newBest,
      lastCheckIn: today,
      totalYesCheckins: data.totalYesCheckins + 1
    })

    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 4000)
  }

  const handleSlipClick = () => {
    setShowSlipOverlay(true)
  }

  const isCheckedInToday = data.lastCheckIn === new Date().toISOString().split('T')[0]

  return (
    <div className="p-4 space-y-4">
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={300} />}

      <div className="flex items-center justify-between pt-2 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AdioSugar</h1>
          <p className="text-sm text-muted">Your 30-Day Journey</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Active
          </Badge>
        </div>
      </div>

      <Card className="p-6 shadow-md rounded-2xl">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold text-foreground">30-Day Sugar-Free Challenge</h2>
          
          <div className="flex justify-center">
            <CircularProgress currentDay={data.currentStreak} totalDays={30} />
          </div>

          <div className="space-y-2">
            <p className="text-lg text-muted">
              Day <span className="font-bold text-foreground">{data.currentDay}</span> of 30
            </p>
            {data.bestStreak > 0 && (
              <div className="flex items-center justify-center gap-2 text-accent">
                <Trophy className="w-4 h-4" />
                <span className="text-sm font-medium">Best Streak: {data.bestStreak} days</span>
              </div>
            )}
          </div>

          {data.currentStreak > 0 && (
            <Button
              onClick={() => shareProgress(data.currentStreak)}
              variant="outline"
              size="sm"
              className="mt-3 border-primary/30 text-primary hover:bg-primary/5"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Progress
            </Button>
          )}
        </div>
      </Card>

      <Card className="p-6 shadow-md rounded-2xl bg-destructive/5 border-destructive/20">
        <div className="text-center space-y-3">
          <Button
            onClick={onPanicClick}
            size="lg"
            className="w-full h-16 text-lg font-bold bg-destructive hover:bg-destructive/90 text-destructive-foreground pulse-slow shadow-lg"
          >
            <AlertCircle className="w-6 h-6 mr-2" />
            PANIC! I WANT SUGAR
          </Button>
          <p className="text-sm text-muted">Click for instant help</p>
        </div>
      </Card>

      <Card className="p-6 shadow-md rounded-2xl">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Daily Check-in</h3>
              <p className="text-sm text-muted">8:00 PM</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-base font-medium text-foreground">
              Did you stay sugar-free today?
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleYesClick}
                disabled={isCheckedInToday}
                size="lg"
                className="h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
              >
                {isCheckedInToday ? '✓ Checked' : 'YES, I DID IT!'}
              </Button>
              <Button
                onClick={handleSlipClick}
                disabled={isCheckedInToday}
                size="lg"
                variant="outline"
                className="h-14 border-2 font-bold hover:bg-muted/10"
              >
                I SLIPPED UP
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-md rounded-2xl bg-accent/5 border-accent/20">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-accent" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="font-bold text-foreground">AI Daily Anti-Craving Hack</h3>
                {isLoadingHack ? (
                  <div className="flex items-center gap-2 text-muted">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Loading today's hack...</span>
                  </div>
                ) : (
                  <p className="text-sm text-muted leading-relaxed whitespace-pre-wrap">
                    {dailyHack}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={fetchDailyHack}
              disabled={isLoadingHack || hackLimitReached}
              className="p-2 rounded-lg hover:bg-accent/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              title={hackLimitReached ? `Daily limit reached (${hackRefreshCount}/10)` : "Get new hack"}
            >
              <RefreshCw className={`w-4 h-4 text-accent ${isLoadingHack ? 'animate-spin' : ''}`} />
            </button>
          </div>
          {hackLimitReached && (
            <p className="text-xs text-muted italic">
              Daily limit reached ({hackRefreshCount}/10) - Pick one and practice it!
            </p>
          )}
        </div>
      </Card>

      {showSlipOverlay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="p-6 max-w-sm shadow-2xl rounded-2xl space-y-4">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground">No Judgment Here</h3>
              <p className="text-sm text-muted leading-relaxed">
                Slipping is part of the process. What matters is getting back on track. Your streak resets, but your knowledge and progress remain. Tomorrow is a fresh start.
              </p>
              <Button
                onClick={() => {
                  onUpdate({ currentStreak: 0, lastCheckIn: new Date().toISOString().split('T')[0] })
                  setShowSlipOverlay(false)
                }}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
              >
                Reset & Continue
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}