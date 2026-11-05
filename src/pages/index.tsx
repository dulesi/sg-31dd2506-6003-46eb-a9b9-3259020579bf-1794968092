import { useState, useEffect } from 'react'
import MobileShell, { TabId } from '@/components/MobileShell'
import ProgressTab from '@/components/tabs/ProgressTab'
import CoachTab from '@/components/tabs/CoachTab'
import HealthTab from '@/components/tabs/HealthTab'
import AccountTab from '@/components/tabs/AccountTab'
import AuthScreen from '@/components/AuthScreen'
import { getProgressData, updateProgressData, getShoppingList, updateShoppingList, incrementPanicClick } from '@/lib/localStorage'
import { isUserLoggedIn, createUserProfile } from '@/lib/auth'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabId>('progress')
  const [progressData, setProgressData] = useState(getProgressData())
  const [shoppingList, setShoppingList] = useState(getShoppingList())
  const [triggerCoach, setTriggerCoach] = useState(false)
  const [showLimitModal, setShowLimitModal] = useState(false)

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn())
    setProgressData(getProgressData())
    setShoppingList(getShoppingList())
    setIsLoading(false)
  }, [])

  const handleAuth = (name: string, email?: string) => {
    createUserProfile(name, email)
    setIsLoggedIn(true)
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

  if (isLoading) {
    return null
  }

  if (!isLoggedIn) {
    return <AuthScreen onAuth={handleAuth} />
  }

  return (
    <MobileShell activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'progress' && (
        <ProgressTab 
          data={progressData} 
          onUpdate={handleProgressUpdate}
          onPanicClick={handlePanicClick}
        />
      )}
      {activeTab === 'coach' && (
        <CoachTab 
          data={progressData}
          onUpdate={handleProgressUpdate}
          triggerStart={triggerCoach}
          onTriggerClear={() => setTriggerCoach(false)}
          onComplete={() => setActiveTab('progress')}
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