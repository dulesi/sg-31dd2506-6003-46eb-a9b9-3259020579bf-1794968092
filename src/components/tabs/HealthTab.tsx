import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Circle } from 'lucide-react'

interface HealthTabProps {
  data: any
  shoppingList: { [key: string]: boolean }
  onShoppingUpdate: (updates: any) => void
}

export default function HealthTab({ data, shoppingList, onShoppingUpdate }: HealthTabProps) {
  const currentDay = data.currentDay

  const getPhaseStatus = (daysRange: string) => {
    const [start, end] = daysRange.split('-').map(Number)
    if (currentDay > end) return 'completed'
    if (currentDay >= start && currentDay <= end) return 'active'
    return 'upcoming'
  }

  const toggleShoppingItem = (item: string) => {
    const current = shoppingList || {}
    const updated = { ...current, [item]: !current[item] }
    onShoppingUpdate(updated)
  }

  const isItemChecked = (item: string) => {
    return shoppingList?.[item] || false
  }

  const timelineData = [
    {
      days: '1-3',
      title: 'Withdrawal Phase',
      description: 'Initial cravings, mood swings, headaches. Your body is clearing sugar toxins.',
      symptoms: ['Irritability', 'Brain fog', 'Fatigue']
    },
    {
      days: '4-7',
      title: 'Energy Stabilization',
      description: 'Blood sugar levels start to normalize. Energy crashes reduce.',
      symptoms: ['Better sleep', 'Reduced cravings', 'Clearer mind']
    },
    {
      days: '8-14',
      title: 'Metabolic Reset',
      description: 'Your cells become more insulin-sensitive. Fat burning increases.',
      symptoms: ['Weight loss begins', 'Skin clears up', 'Stable energy']
    },
    {
      days: '15-21',
      title: 'Habit Formation',
      description: 'New neural pathways form. Sugar doesn\'t dominate your thoughts.',
      symptoms: ['Confident choices', 'Taste sensitivity returns', 'Mental clarity']
    },
    {
      days: '22-30',
      title: 'Full Adaptation',
      description: 'Your body runs efficiently on natural energy. Sugar-free becomes your new normal.',
      symptoms: ['Sustained energy', 'Emotional stability', 'Freedom from cravings']
    }
  ]

  const shoppingItems = {
    'Hydration Heroes': [
      'Sparkling Water',
      'Mint Tea',
      'Cucumber',
      'Green Tea'
    ],
    'Crunchy Alternatives': [
      'Raw Almonds',
      'Walnuts',
      'Pumpkin Seeds',
      'Carrot Sticks',
      'Celery'
    ],
    'Taste-Bud Resetters': [
      '85%+ Dark Chocolate',
      'Cinnamon Sticks',
      'Unsweetened Cocoa Powder'
    ],
    'Protein Stabilizers': [
      'Hard-Boiled Eggs',
      'Plain Greek Yogurt',
      'String Cheese',
      'Turkey Slices'
    ]
  }

  return (
    <div className="p-4 space-y-4">
      <div className="pt-2 pb-4">
        <h1 className="text-2xl font-bold text-foreground">Health Timeline</h1>
        <p className="text-sm text-muted">Your body's recovery journey</p>
      </div>

      <div className="space-y-3">
        {timelineData.map((phase, index) => {
          const status = getPhaseStatus(phase.days)
          return (
            <Card
              key={index}
              className={`p-5 shadow-md rounded-2xl border-2 transition-all ${
                status === 'active'
                  ? 'border-primary bg-primary/5'
                  : status === 'completed'
                  ? 'border-primary/30 bg-primary/5 opacity-60'
                  : 'border-border'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${
                  status === 'active'
                    ? 'bg-primary text-primary-foreground'
                    : status === 'completed'
                    ? 'bg-primary/30 text-primary'
                    : 'bg-muted/20 text-muted'
                }`}>
                  {phase.days.split('-')[0]}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-foreground">{phase.title}</h3>
                    {status === 'active' && (
                      <Badge className="bg-primary text-primary-foreground text-xs">
                        Current
                      </Badge>
                    )}
                    {status === 'completed' && (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted">{phase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {phase.symptoms.map((symptom, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className={`text-xs ${
                          status === 'active' || status === 'completed'
                            ? 'border-primary/50 text-primary'
                            : 'border-muted text-muted'
                        }`}
                      >
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="pt-4">
        <h2 className="text-xl font-bold text-foreground mb-4">Emergency Pantry Shopping List</h2>
        <p className="text-sm text-muted mb-4">
          Stock these items to handle cravings without breaking your streak
        </p>

        <div className="space-y-4">
          {Object.entries(shoppingItems).map(([category, items]) => (
            <Card key={category} className="p-5 shadow-md rounded-2xl">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                {category === 'Hydration Heroes' && '💧'}
                {category === 'Crunchy Alternatives' && '🥜'}
                {category === 'Taste-Bud Resetters' && '⚡'}
                {category === 'Protein Stabilizers' && '💪'}
                {category}
              </h3>
              <div className="space-y-2">
                {items.map((item) => {
                  const checked = isItemChecked(item)
                  return (
                    <button
                      key={item}
                      onClick={() => toggleShoppingItem(item)}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted/10 transition-colors text-left"
                    >
                      {checked ? (
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-primary flex-shrink-0" />
                      )}
                      <span className={`text-sm ${
                        checked 
                          ? 'line-through text-muted opacity-50' 
                          : 'text-foreground'
                      }`}>
                        {item}
                      </span>
                    </button>
                  )
                })}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}