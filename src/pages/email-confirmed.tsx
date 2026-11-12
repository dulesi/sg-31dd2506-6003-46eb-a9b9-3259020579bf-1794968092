import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'

export default function EmailConfirmed() {
  const [isConfirmed, setIsConfirmed] = useState(false)

  useEffect(() => {
    const checkConfirmation = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user?.email_confirmed_at) {
        setIsConfirmed(true)
      }
    }
    checkConfirmation()
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[420px]">
        <Card className="p-8 shadow-lg rounded-2xl border-2 border-primary/30 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Email Successfully Confirmed</h2>
            <p className="text-sm text-muted">
              Your email has been verified. You can now close this page and return to the app.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}