import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trophy, Calendar, Zap, RotateCcw, Trash2, LogOut, CheckCircle, Share2, Instagram, ExternalLink, Shield, FileText } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { shareProgress } from '@/lib/share'
import { deleteUserAccount } from '@/lib/auth'

interface AccountTabProps {
  data: any
  onUpdate: (updates: any) => void
  onReset: () => void
}

export default function AccountTab({ data, onUpdate, onReset }: AccountTabProps) {
  const { toast } = useToast()

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) throw error
      
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      })
      
      window.location.href = '/'
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || 'Failed to sign out',
        variant: "destructive",
      })
    }
  }

  const confirmReset = () => {
  }

  return (
    <div className="p-4 space-y-4">
      <div className="pt-2 pb-4">
        <h1 className="text-2xl font-bold text-foreground">Account</h1>
        <p className="text-sm text-muted">Your profile & settings</p>
      </div>

      <Card className="p-6 shadow-md rounded-2xl space-y-4">
        <h2 className="text-lg font-bold text-foreground">Progress Summary</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted">Current Day</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{data.currentDay}</p>
          </div>

          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-muted">Best Streak</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{data.bestStreak}</p>
          </div>

          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted">Current Streak</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{data.currentStreak}</p>
          </div>

          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted">Total Check-ins</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{data.totalYesCheckins}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-md rounded-2xl space-y-4">
        <h2 className="text-lg font-bold text-foreground">Share & Connect</h2>
        
        <button
          onClick={() => shareProgress(data.currentStreak || 0)}
          className="w-full p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Share2 className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-foreground">Share AdioSugar with a Friend</div>
            <div className="text-sm text-muted">Help a friend beat sugar cravings</div>
          </div>
        </button>
      </Card>

      <Card className="p-6 shadow-md rounded-2xl space-y-4">
        <h2 className="text-lg font-bold text-foreground">Join Our Community</h2>
        
        <div className="space-y-3">
          <a
            href="https://instagram.com/adiosugar"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center flex-shrink-0">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-foreground">Instagram</div>
              <div className="text-sm text-muted">@adiosugar</div>
            </div>
            <ExternalLink className="w-5 h-5 text-muted group-hover:text-primary" />
          </a>

          <a
            href="https://tiktok.com/@adiosugar"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-bold text-foreground">TikTok</div>
              <div className="text-sm text-muted">@adiosugar</div>
            </div>
            <ExternalLink className="w-5 h-5 text-muted group-hover:text-primary" />
          </a>

          <a
            href="https://adiosugar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <ExternalLink className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-foreground">Official Website</div>
              <div className="text-sm text-muted">adiosugar.com</div>
            </div>
            <ExternalLink className="w-5 h-5 text-muted group-hover:text-primary" />
          </a>
        </div>
      </Card>

      <Card className="p-6 shadow-md rounded-2xl space-y-4">
        <h2 className="text-lg font-bold text-foreground">Legal & Information</h2>
        
        <div className="space-y-3">
          <a
            href="https://adiosugar.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-muted/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-muted group-hover:text-primary" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-foreground">Privacy Policy</div>
              <div className="text-sm text-muted">How we protect your data</div>
            </div>
            <ExternalLink className="w-5 h-5 text-muted group-hover:text-primary" />
          </a>

          <a
            href="https://adiosugar.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-muted/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-muted group-hover:text-primary" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-foreground">Terms of Service</div>
              <div className="text-sm text-muted">User agreement & guidelines</div>
            </div>
            <ExternalLink className="w-5 h-5 text-muted group-hover:text-primary" />
          </a>
        </div>
      </Card>

      <Card className="p-6 shadow-md rounded-2xl space-y-4">
        <h2 className="text-lg font-bold text-foreground">Program Settings</h2>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full border-2 border-destructive/30 text-destructive hover:bg-destructive/10">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Progress & Start Over
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Start Fresh Journey?</AlertDialogTitle>
              <AlertDialogDescription>
                This will reset your current progress, streak, and stats. Your knowledge and experience remain with you. This is a chance to begin again with everything you've learned.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onReset} className="bg-destructive hover:bg-destructive/90">
                Yes, Reset Everything
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>

      <Card className="p-6 shadow-md rounded-2xl space-y-4 border-destructive/20">
        <h2 className="text-lg font-bold text-foreground">Account Management</h2>
        
        <div className="space-y-3">
          <button
            onClick={handleSignOut}
            className="w-full p-4 rounded-xl border-2 border-border hover:border-primary/50 transition-all bg-card text-left group"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                <LogOut className="w-5 h-5 text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm">Sign Out</p>
                <p className="text-xs text-muted mt-0.5">Log out of your account on this device</p>
              </div>
            </div>
          </button>

          <button
            onClick={handleReset}
            className="w-full p-4 rounded-xl border-2 border-border hover:border-primary/50 transition-all bg-card text-left group"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <RotateCcw className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm">Free Restart</p>
                <p className="text-xs text-muted mt-0.5">Reset program & restart Day 1 (unlimited)</p>
              </div>
            </div>
          </button>
        </div>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="w-full p-4 rounded-xl border-2 border-destructive/30 hover:bg-destructive/5 transition-all flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-6 h-6 text-destructive" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold text-destructive">Delete Account</div>
                <div className="text-sm text-muted">Permanently erase all your data</div>
              </div>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete your account?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently erase all your local data, streaks, and history. This action cannot be undone and you will be redirected to the home page.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deleteUserAccount} className="bg-destructive hover:bg-destructive/90">
                Permanently Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    </div>
  )
}