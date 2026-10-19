type ProgressData = {
  currentDay: number
  currentStreak: number
  bestStreak: number
  lastCheckIn: string | null
  totalYesCheckins: number
  cravingCoachStep: number
  selectedTrigger: string | null
  selectedIntensity: string | null
  shoppingList: Record<string, boolean>
}

const STORAGE_KEY = 'adiosugar_progress'

export const getProgressData = (): ProgressData => {
  if (typeof window === 'undefined') {
    return getDefaultData()
  }

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    return getDefaultData()
  }

  try {
    return JSON.parse(stored)
  } catch {
    return getDefaultData()
  }
}

export const saveProgressData = (data: Partial<ProgressData>) => {
  if (typeof window === 'undefined') return

  const current = getProgressData()
  const updated = { ...current, ...data }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export const resetProgress = () => {
  if (typeof window === 'undefined') return

  const current = getProgressData()
  const reset: ProgressData = {
    ...getDefaultData(),
    bestStreak: current.bestStreak,
    shoppingList: current.shoppingList
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reset))
}

function getDefaultData(): ProgressData {
  return {
    currentDay: 1,
    currentStreak: 0,
    bestStreak: 0,
    lastCheckIn: null,
    totalYesCheckins: 0,
    cravingCoachStep: 0,
    selectedTrigger: null,
    selectedIntensity: null,
    shoppingList: {}
  }
}