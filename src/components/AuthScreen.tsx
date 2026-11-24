import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Loader2, CheckCircle, Eye, EyeOff } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

interface AuthScreenProps {
  onAuthSuccess: () => void
}

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showVerificationMessage, setShowVerificationMessage] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetSent, setResetSent] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        onAuthSuccess()
      } else if (event === 'PASSWORD_RECOVERY') {
        window.location.href = '/reset-password'
      }
    })

    return () => subscription.unsubscribe()
  }, [onAuthSuccess])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

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
          const pendingQuiz = localStorage.getItem('pending_quiz_answers')
          
          if (pendingQuiz) {
            try {
              const quizData = JSON.parse(pendingQuiz)
              console.log('Attempting to insert quiz data for user:', data.user.id, quizData)
              
              const { data: insertData, error: insertError } = await supabase
                .from('user_quiz_answers')
                .insert({
                  user_id: data.user.id,
                  cravings_timing: (quizData.triggers || 'general') as string,
                  primary_goal: (quizData.primaryGoal || 'wellness') as string,
                  struggle_duration: (quizData.ageGroup || 'unknown') as string,
                  support_style: (quizData.gender || 'unknown') as string,
                  ai_context_summary: quizData.ai_context_summary as string
                })
                .select()

              if (insertError) {
                console.error('Failed to insert quiz answers:', insertError)
                toast({
                  title: "Note",
                  description: "Your quiz data will be saved when you verify your email.",
                  variant: "default",
                })
              } else {
                console.log('Quiz data successfully inserted:', insertData)
                localStorage.removeItem('pending_quiz_answers')
              }
            } catch (parseError) {
              console.error('Error parsing quiz data:', parseError)
            }
          } else {
            console.log('No pending quiz data found in localStorage')
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

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error

      setResetSent(true)
      toast({
        title: "Reset link sent!",
        description: "Check your email for the password reset link.",
        duration: 6000,
      })
    } catch (err: any) {
      setError(err.message || 'Failed to send reset link')
      toast({
        title: "Error",
        description: err.message || 'Failed to send reset link',
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
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">AdioSugar</h1>
            <p className="text-sm text-muted">Your daily habit coach</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Account Created!
            </h2>
            <p className="text-sm text-muted">
              Please check your email to verify your email address.
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

  if (showForgotPassword) {
    if (resetSent) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-8 shadow-lg text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">AdioSugar</h1>
              <p className="text-sm text-muted">Your daily habit coach</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">
                Reset Link Sent!
              </h2>
              <p className="text-sm text-muted">
                Check your email for the password reset link.
              </p>
            </div>
            <Button
              onClick={() => {
                setShowForgotPassword(false)
                setResetSent(false)
                setResetEmail('')
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
        <Card className="w-full max-w-md p-8 shadow-lg">
          <form onSubmit={handlePasswordReset} className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-foreground">AdioSugar</h1>
              <p className="text-sm text-muted">Your daily habit coach</p>
              <h2 className="text-xl font-semibold text-foreground pt-2">
                Reset Password
              </h2>
              <p className="text-xs text-muted">
                Enter your email to receive a password reset link
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="reset-email" className="text-sm font-medium text-foreground">
                Email Address
              </label>
              <Input
                id="reset-email"
                type="email"
                placeholder="your@email.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
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
              ) : (
                'Send Reset Link'
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false)
                  setResetEmail('')
                }}
                className="text-sm text-muted hover:text-primary transition-colors font-medium"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-foreground">AdioSugar</h1>
            <p className="text-sm text-muted">Your daily habit coach</p>
            <h2 className="text-xl font-semibold text-foreground pt-2">
              {isLogin ? 'Welcome Back' : 'Create Profile'}
            </h2>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
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
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {isLogin && (
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-xs text-primary hover:underline font-medium"
              >
                Forgot password?
              </button>
            )}
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="text-sm font-medium text-foreground">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}

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

        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
              setConfirmPassword('')
            }}
            className="text-sm text-muted hover:text-primary transition-colors font-medium"
          >
            {isLogin ? "New here? Create your profile" : "Already have an account? Sign In"}
          </button>
        </div>

        <div className="pt-4 border-t border-border text-center space-y-2">
          <p className="text-xs text-muted">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}