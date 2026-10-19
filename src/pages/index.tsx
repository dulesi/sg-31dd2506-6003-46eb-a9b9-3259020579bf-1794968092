import { useState, useEffect } from 'react'
import MobileShell from '@/components/MobileShell'
import ProgressTab from '@/components/tabs/ProgressTab'
import CoachTab from '@/components/tabs/CoachTab'
import HealthTab from '@/components/tabs/HealthTab'
import AccountTab from '@/components/tabs/AccountTab'
import { getProgressData, saveProgressData } from '@/lib/localStorage'

type TabId = 'progress' | 'coach' | 'health' | 'account'

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('progress')
  const [progressData, setProgressData] = useState(getProgressData())
  const [triggerCoach, setTriggerCoach] = useState(false)

  useEffect(() => {
    setProgressData(getProgressData())
  }, [])

  const handlePanicClick = () => {
    setActiveTab('coach')
    setTriggerCoach(true)
  }

  const updateProgress = (updates: any) => {
    saveProgressData(updates)
    setProgressData(getProgressData())
  }

  return (
    <MobileShell activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'progress' && (
        <ProgressTab 
          data={progressData} 
          onUpdate={updateProgress}
          onPanicClick={handlePanicClick}
        />
      )}
      {activeTab === 'coach' && (
        <CoachTab 
          data={progressData}
          onUpdate={updateProgress}
          triggerStart={triggerCoach}
          onTriggerClear={() => setTriggerCoach(false)}
        />
      )}
      {activeTab === 'health' && (
        <HealthTab 
          data={progressData}
          onUpdate={updateProgress}
        />
      )}
      {activeTab === 'account' && (
        <AccountTab 
          data={progressData}
          onReset={() => {
            updateProgress({ currentDay: 1, currentStreak: 0, lastCheckIn: null })
            setActiveTab('progress')
          }}
        />
      )}
    </MobileShell>
  )
}