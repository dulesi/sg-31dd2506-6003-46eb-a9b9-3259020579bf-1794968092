import { ReactNode } from 'react'
import { Home, HeartPulse, ShoppingBag, User } from 'lucide-react'

type TabId = 'progress' | 'coach' | 'health' | 'account'

interface MobileShellProps {
  children: ReactNode
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

export default function MobileShell({ children, activeTab, onTabChange }: MobileShellProps) {
  const tabs = [
    { id: 'progress' as TabId, label: 'Progress', icon: Home },
    { id: 'coach' as TabId, label: 'Coach', icon: HeartPulse },
    { id: 'health' as TabId, label: 'Health', icon: ShoppingBag },
    { id: 'account' as TabId, label: 'Account', icon: User }
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-md">
        {children}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
        <div className="mx-auto max-w-md">
          <div className="flex items-center justify-around px-2 py-3">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  activeTab === id
                    ? 'text-primary bg-primary/10'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}