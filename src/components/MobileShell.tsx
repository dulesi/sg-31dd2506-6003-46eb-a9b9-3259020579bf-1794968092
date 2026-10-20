import { ReactNode } from 'react'
import { Home, HeartPulse, ShoppingBag, User } from 'lucide-react'

export type TabId = 'progress' | 'coach' | 'health' | 'account'

interface MobileShellProps {
  children: ReactNode
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

const tabs = [
  { id: 'progress' as TabId, label: 'Progress', icon: Home },
  { id: 'coach' as TabId, label: 'Coach', icon: HeartPulse },
  { id: 'health' as TabId, label: 'Health', icon: ShoppingBag },
  { id: 'account' as TabId, label: 'Account', icon: User }
]

export default function MobileShell({ children, activeTab, onTabChange }: MobileShellProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 pb-20 overflow-auto">
        {children}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-around py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                <tab.icon className="w-6 h-6" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}