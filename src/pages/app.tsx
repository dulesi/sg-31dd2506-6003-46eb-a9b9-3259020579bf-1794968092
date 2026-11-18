import { useEffect, useState } from 'react'
import { Trophy, MessageCircle, Heart, User as UserIcon } from 'lucide-react'
import MobileShell, { TabId } from '@/components/MobileShell'
import ProgressTab from '@/components/tabs/ProgressTab'
import CoachTab from '@/components/tabs/CoachTab'
import HealthTab from '@/components/tabs/HealthTab'
import AccountTab from '@/components/tabs/AccountTab'
import AuthScreen from '@/components/AuthScreen'
import { getProgressData, updateProgressData, getShoppingList, updateShoppingList, incrementPanicClick } from '@/lib/localStorage'
import { supabase } from '@/integrations/supabase/client'

export default function App() {
  const [session, setSession] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabId>('progress')
  const [progressData, setProgressData] = useState(getProgressData())
  const [shoppingList, setShoppingList] = useState(getShoppingList())
  const [triggerCoach, setTriggerCoach] = useState(false)
  const [showLimitModal, setShowLimitModal] = useState(false)
  const [aiContextSummary, setAiContextSummary] = useState<string>('')

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
        
        if (session?.user) {
          await fetchUserQuizAnswers(session.user.id)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id)
      
      if (event === 'PASSWORD_RECOVERY') {
        window.location.href = '/reset-password'
        return
      }
      
      setSession(session)
      
      if (event === 'SIGNED_IN' && session?.user) {
        try {
          await fetchUserQuizAnswers(session.user.id)
        } finally {
          setIsLoading(false)
        }
      } else if (event === 'SIGNED_OUT') {
        setAiContextSummary('')
        setIsLoading(false)
      }
    })

    setProgressData(getProgressData())
    setShoppingList(getShoppingList())

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserQuizAnswers = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_quiz_answers')
        .select('ai_context_summary')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (data?.ai_context_summary) {
        setAiContextSummary(data.ai_context_summary)
      } else {
        const pendingQuiz = localStorage.getItem('pending_quiz_answers')
        
        if (pendingQuiz) {
          try {
            const quizData = JSON.parse(pendingQuiz)
            console.log('Found pending quiz data, attempting to save for user:', userId)
            
            const { data: insertData, error: insertError } = await supabase
              .from('user_quiz_answers')
              .insert({
                user_id: userId,
                cravings_timing: (quizData.triggers || 'general') as string,
                primary_goal: (quizData.primaryGoal || 'wellness') as string,
                struggle_duration: (quizData.ageGroup || 'unknown') as string,
                support_style: (quizData.gender || 'unknown') as string,
                ai_context_summary: quizData.ai_context_summary as string
              })
              .select()

            if (!insertError && insertData) {
              console.log('Quiz data successfully saved on login:', insertData)
              localStorage.removeItem('pending_quiz_answers')
              if (insertData[0]?.ai_context_summary) {
                setAiContextSummary(insertData[0].ai_context_summary)
              }
            } else {
              console.error('Failed to insert pending quiz data:', insertError)
            }
          } catch (parseError) {
            console.error('Error parsing pending quiz data:', parseError)
          }
        }
      }
    } catch (err) {
      console.error('Error fetching quiz answers:', err)
    }
  }

  const handleProgressUpdate = (updates: any) => {
    const newData = { ...progressData, ...updates }
    setProgressData(newData)
    updateProgressData(updates)
  }

  const handleShoppingUpdate = (updates: any) => {
    const newList = { ...shoppingList, ...updates }
    setShoppingList(newList)
    updateShoppingList(newList)
  }

  const handlePanicClick = () => {
    const { count, limitReached } = incrementPanicClick()
    setProgressData(getProgressData())

    if (limitReached) {
      setShowLimitModal(true)
      return
    }

    setTriggerCoach(true)
    setActiveTab('coach')
  }

  const handleLimitModalDismiss = () => {
    setShowLimitModal(false)
    setActiveTab('progress')
  }

  const handleAuthSuccess = async () => {
    setIsLoading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        setSession(session)
        await fetchUserQuizAnswers(session.user.id)
      }
    } catch (error) {
      console.error('Error after auth success:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
      </div>
    )
  }

  if (!session) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />
  }

  return (
    <MobileShell activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'progress' && (
        <ProgressTab 
          data={progressData} 
          onUpdate={handleProgressUpdate}
          onPanicClick={handlePanicClick}
          aiContextSummary={aiContextSummary}
        />
      )}
      {activeTab === 'coach' && (
        <CoachTab 
          data={progressData}
          onUpdate={handleProgressUpdate}
          triggerStart={triggerCoach}
          onTriggerClear={() => setTriggerCoach(false)}
          onComplete={() => setActiveTab('progress')}
          aiContextSummary={aiContextSummary}
        />
      )}
      {activeTab === 'health' && (
        <HealthTab 
          data={progressData}
          shoppingList={shoppingList}
          onShoppingUpdate={handleShoppingUpdate}
        />
      )}
      {activeTab === 'account' && (
        <AccountTab 
          data={progressData}
          onUpdate={handleProgressUpdate}
          onReset={() => {
            const today = new Date().toISOString().split('T')[0]
            handleProgressUpdate({
              currentDay: 1,
              currentStreak: 0,
              lastCheckIn: today,
              panicClicksToday: 0,
              panicClickDate: today
            })
            setActiveTab('progress')
          }}
        />
      )}

      {showLimitModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-card p-6 max-w-sm shadow-2xl rounded-2xl space-y-4">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground">Daily Limit Reached</h3>
              <p className="text-sm text-muted leading-relaxed">
                You've reached your daily limit for panic support. Let's work on building your self-control.
              </p>
              <button
                onClick={handleLimitModalDismiss}
                className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-colors"
              >
                View Daily Hack
              </button>
            </div>
          </div>
        </div>
      )}
    </MobileShell>
  )
}