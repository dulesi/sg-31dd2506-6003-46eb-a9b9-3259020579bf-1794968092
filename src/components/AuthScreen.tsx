import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Loader2, CheckCircle, Sparkles } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface AuthScreenProps {
  onAuthSuccess: () => void
}

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showVerificationMessage, setShowVerificationMessage] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        onAuthSuccess()
      }
    })

    return () => subscription.unsubscribe()
  }, [onAuthSuccess])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        if (data.session) {
          toast({
            title: "Welcome back!",
            description: "Successfully signed in.",
          })
          onAuthSuccess()
        }
      } else {
        const pendingQuiz = localStorage.getItem('pending_quiz_answers')
        const quizData = pendingQuiz ? JSON.parse(pendingQuiz) : {}

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) throw error

        if (data.user) {
          if (quizData.ai_context_summary) {
            const { error: insertError } = await supabase
              .from('user_quiz_answers')
              .insert({
                user_id: data.user.id,
                step1: quizData.step1 as string,
                step2: quizData.step2 as string,
                step3: quizData.step3 as string,
                step4: quizData.step4 as string,
                ai_context_summary: quizData.ai_context_summary as string
              })

            if (!insertError) {
              localStorage.removeItem('pending_quiz_answers')
            }
          }

          setShowVerificationMessage(true)
          toast({
            title: "Account created!",
            description: "Please check your email to verify your account.",
            duration: 6000,
          })
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      toast({
        title: "Error",
        description: err.message || 'An error occurred',
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (showVerificationMessage) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Account Created!
            </h2>
            <p className="text-sm text-muted">
              Please check your email to verify your account.
            </p>
          </div>
          <Button
            onClick={() => {
              setShowVerificationMessage(false)
              setIsLogin(true)
            }}
            className="w-full"
          >
            Back to Sign In
          </Button>
        </Card>
      </div>
    )
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
          {!isLogin && (
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Your Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value=""
                onChange={(e) => {}}
                className="h-12 animate-fade-in"
                required={!isLogin}
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
            ) : isLogin ? (
              'Sign In'
            ) : (
              'Get Started'
            )}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-muted hover:text-primary transition-colors font-medium"
          >
            {isLogin ? "New here? Create your profile" : "Already have an account? Sign In"}
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