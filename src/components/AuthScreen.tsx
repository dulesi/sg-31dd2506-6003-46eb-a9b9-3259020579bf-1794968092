import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sparkles, Loader2 } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface AuthScreenProps {
  onAuthSuccess: () => void
}

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignIn, setIsSignIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      toast({
        title: "Greška",
        description: "Molimo popunite sva polja.",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)

    try {
      if (isSignIn) {
        // Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim()
        })

        if (error) throw error

        toast({
          title: "Uspelo!",
          description: "Uspešno ste se prijavili.",
          variant: "default"
        })

        // On Sign In, check if we have pending quiz answers to save
        if (data.user) {
          await savePendingQuizAnswers(data.user.id)
        }

        onAuthSuccess()
      } else {
        // Sign Up
        if (!name.trim()) {
          toast({
            title: "Greška",
            description: "Molimo unesite vaše ime.",
            variant: "destructive"
          })
          setIsLoading(false)
          return
        }

        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
          options: {
            data: {
              full_name: name.trim()
            }
          }
        })

        if (error) throw error

        if (data.user) {
          // Explicitly insert profile row in profiles table
          const { error: profileError } = await supabase.from('profiles').insert({
            id: data.user.id,
            full_name: name.trim(),
            email: email.trim()
          })

          if (profileError) {
            console.error("Failed to insert profile row:", profileError)
          }

          // Save pending quiz answers under their user_id
          await savePendingQuizAnswers(data.user.id)
        }

        toast({
          title: "Profil kreiran!",
          description: "Uspešno ste kreirali profil i započeli AdioSugar program.",
          variant: "default"
        })

        onAuthSuccess()
      }
    } catch (err: any) {
      toast({
        title: "Greška pri autorizaciji",
        description: err.message || "Došlo je do greške.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const savePendingQuizAnswers = async (userId: string) => {
    try {
      if (typeof window === 'undefined') return
      const pending = localStorage.getItem('pending_quiz_answers')
      if (pending) {
        const parsed = JSON.parse(pending)
        const { error } = await supabase.from('user_quiz_answers').insert({
          user_id: userId,
          cravings_timing: parsed.cravings_timing || null,
          primary_goal: parsed.primary_goal || null,
          struggle_duration: parsed.struggle_duration || null,
          support_style: parsed.support_style || null,
          ai_context_summary: parsed.ai_context_summary || null
        })

        if (!error) {
          localStorage.removeItem('pending_quiz_answers')
        } else {
          console.error("Error inserting user_quiz_answers:", error)
        }
      }
    } catch (err) {
      console.error("Failed to save pending quiz answers:", err)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="p-8 max-w-md w-full shadow-2xl rounded-2xl space-y-6">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">AdioSugar</h1>
          <p className="text-base text-muted">Your daily AI habit coach</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isSignIn && (
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Your Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 animate-fade-in"
                required={!isSignIn}
              />
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : isSignIn ? (
              'Sign In'
            ) : (
              'Get Started'
            )}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-sm text-muted hover:text-primary transition-colors font-medium"
          >
            {isSignIn ? "New here? Create your profile" : "Already have an account? Sign In"}
          </button>
        </div>

        <div className="pt-4 border-t border-border text-center space-y-2">
          <p className="text-xs text-muted">
            By continuing, you agree to our{' '}
            <a href="https://adiosugar.com/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="https://adiosugar.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </Card>
    </div>
  )
}