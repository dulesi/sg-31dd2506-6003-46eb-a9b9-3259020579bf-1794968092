import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sparkles } from 'lucide-react'

interface AuthScreenProps {
  onAuth: (name: string, email?: string) => void
}

export default function AuthScreen({ onAuth }: AuthScreenProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSignIn, setIsSignIn] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onAuth(name.trim(), email.trim() || undefined)
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
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground">
              {isSignIn ? 'Name or Email' : 'Your Name'}
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12"
              required
            />
          </div>

          {!isSignIn && (
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email (optional)
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base"
          >
            {isSignIn ? 'Sign In' : 'Get Started'}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-sm text-muted hover:text-primary transition-colors"
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