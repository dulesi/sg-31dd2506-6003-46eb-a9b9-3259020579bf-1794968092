import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Activity, Droplets, Apple, CheckCircle, Circle } from 'lucide-react'

interface HealthTabProps {
  data: any
  onUpdate: (updates: any) => void
}

const timeline = [
  {
    days: '1-3',
    title: 'Blood Sugar Stabilization',
    description: 'Reduced appetite spikes and insulin sensitivity improvement',
    icon: Activity,
    color: 'text-primary'
  },
  {
    days: '4-7',
    title: 'Reduced Bloating & Better Sleep',
    description: 'Lower inflammation and deeper REM sleep cycles',
    icon: Activity,
    color: 'text-accent'
  },
  {
    days: '8-14',
    title: 'Taste Buds Reset',
    description: 'Natural foods taste sweeter, skin clarity boost',
    icon: Apple,
    color: 'text-primary'
  },
  {
    days: '15-30',
    title: 'Peak Focus & Energy',
    description: 'Complete elimination of energy crashes',
    icon: Activity,
    color: 'text-accent'
  }
]

const shoppingCategories = [
  {
    title: 'Hydration First-Aid',
    icon: Droplets,
    items: ['Lemons (fresh)', 'Sparkling Water', 'Mint Tea', 'Cucumber', 'Green Tea']
  },
  {
    title: 'Crunchy Alternatives',
    icon: Apple,
    items: ['Raw Almonds', 'Walnuts', 'Pumpkin Seeds', 'Carrot Sticks', 'Celery']
  },
  {
    title: 'Taste-Bud Resetters',
    icon: Activity,
    items: ['85%+ Dark Chocolate', 'Cinnamon', 'Greek Yogurt (Plain)', 'Berries', 'Vanilla Extract']
  }
]

export default function HealthTab({ data, onUpdate }: HealthTabProps) {
  const currentDay = data.currentDay

  const getPhaseStatus = (daysRange: string) => {
    const [start, end] = daysRange.split('-').map(Number)
    if (currentDay > end) return 'completed'
    if (currentDay >= start && currentDay <= end) return 'active'
    return 'upcoming'
  }

  const toggleShoppingItem = (item: string) => {
    const current = data.shoppingList || {}
    const updated = { ...current, [item]: !current[item] }
    onUpdate({ shoppingList: updated })
  }

  return (
    <div className="p-4 space-y-6">
      <div className="pt-2 pb-4">
        <h1 className="text-2xl font-bold text-foreground">Health & Energy</h1>
        <p className="text-sm text-muted">Track your body's transformation</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Timeline of Body Recovery</h2>
        </div>

        {timeline.map((phase, index) => {
          const status = getPhaseStatus(phase.days)
          const Icon = phase.icon

          return (
            <Card key={index} className={`p-5 shadow-md rounded-2xl ${
              status === 'active' ? 'border-2 border-primary bg-primary/5' : ''
            }`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  status === 'completed' ? 'bg-primary/20' :
                  status === 'active' ? 'bg-primary/20' :
                  'bg-muted/20'
                }`}>
                  {status === 'completed' ? (
                    <CheckCircle className="w-6 h-6 text-primary" />
                  ) : (
                    <Icon className={`w-6 h-6 ${status === 'active' ? 'text-primary' : 'text-muted'}`} />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={status === 'active' ? 'default' : 'outline'} 
                           className={status === 'active' ? 'bg-primary text-primary-foreground' : ''}>
                      Days {phase.days}
                    </Badge>
                    {status === 'active' && (
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                        Active Now
                      </Badge>
                    )}
                    {status === 'completed' && (
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        Completed
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-bold text-foreground mb-1">{phase.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{phase.description}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Apple className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-bold text-foreground">Emergency Pantry Shopping List</h2>
        </div>

        <p className="text-sm text-muted mb-4">
          Stock these items at home to be prepared for any craving emergency.
        </p>

        {shoppingCategories.map((category, catIndex) => {
          const Icon = category.icon

          return (
            <Card key={catIndex} className="p-5 shadow-md rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-bold text-foreground">{category.title}</h3>
              </div>

              <div className="space-y-3">
                {category.items.map((item, itemIndex) => {
                  const isChecked = data.shoppingList?.[item] || false

                  return (
                    <div key={itemIndex} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/10 transition-colors">
                      <Checkbox
                        id={`${catIndex}-${itemIndex}`}
                        checked={isChecked}
                        onCheckedChange={() => toggleShoppingItem(item)}
                        className="border-2"
                      />
                      <label
                        htmlFor={`${catIndex}-${itemIndex}`}
                        className={`flex-1 cursor-pointer text-sm ${
                          isChecked ? 'text-muted line-through' : 'text-foreground font-medium'
                        }`}
                      >
                        {item}
                      </label>
                    </div>
                  )
                })}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}