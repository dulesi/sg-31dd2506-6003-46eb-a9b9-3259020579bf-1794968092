import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Database, Trophy, RotateCcw, Shield, CheckCircle } from 'lucide-react'
import { useState } from 'react'

interface AccountTabProps {
  data: any
  onUpdate: (updates: any) => void
  onReset: () => void
}

export default function AccountTab({ data, onReset }: AccountTabProps) {
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleResetConfirm = () => {
    onReset()
    setShowResetConfirm(false)
  }

  return (
    <div className="p-4 space-y-6">
      <div className="pt-2 pb-4">
        <h1 className="text-2xl font-bold text-foreground">Account</h1>
        <p className="text-sm text-muted">Manage your program</p>
      </div>

      <Card className="p-6 shadow-md rounded-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Your Profile</h2>
            <Badge variant="outline" className="mt-1 bg-primary/10 text-primary border-primary/20">
              Active Member
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/5">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-muted" />
              <span className="text-sm font-medium text-foreground">Data Storage</span>
            </div>
            <Badge variant="outline" className="text-xs">
              Local Mode
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/5">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Program Status</span>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
              30-Day Active
            </Badge>
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-md rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="w-6 h-6 text-accent" />
          <h3 className="text-lg font-bold text-foreground">Your Progress</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="text-3xl font-bold text-primary mb-1">{data.currentDay}</div>
            <div className="text-xs text-muted font-medium">Current Day</div>
          </div>

          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="text-3xl font-bold text-primary mb-1">{data.currentStreak}</div>
            <div className="text-xs text-muted font-medium">Current Streak</div>
          </div>

          <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
            <div className="text-3xl font-bold text-accent mb-1">{data.bestStreak}</div>
            <div className="text-xs text-muted font-medium">Best Streak</div>
          </div>

          <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
            <div className="text-3xl font-bold text-accent mb-1">{data.totalYesCheckins}</div>
            <div className="text-xs text-muted font-medium">Total Wins</div>
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-md rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Our Commitment to You</h3>
            <p className="text-xs text-muted">FREE RESTART GUARANTEE</p>
          </div>
        </div>

        <p className="text-sm text-muted leading-relaxed mb-6">
          We believe in your transformation. If you need to start over, you can reset your 30-day journey anytime, completely free. No penalties, no questions asked.
        </p>

        <Button
          onClick={() => setShowResetConfirm(true)}
          variant="outline"
          size="lg"
          className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          RESTART MY 30 DAYS FOR FREE
        </Button>
      </Card>

      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="p-6 max-w-sm shadow-2xl rounded-2xl space-y-4">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <RotateCcw className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Reset Your Journey?</h3>
              <p className="text-sm text-muted leading-relaxed">
                This will reset your current day and streak back to Day 1. Your best streak record and shopping list will be preserved.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  onClick={() => setShowResetConfirm(false)}
                  variant="outline"
                  className="font-bold"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleResetConfirm}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                >
                  Yes, Reset
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}