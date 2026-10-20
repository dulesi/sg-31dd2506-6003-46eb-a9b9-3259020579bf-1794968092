type ProgressData = {
  currentDay: number
  currentStreak: number
  bestStreak: number
  lastCheckIn: string
  totalYesCheckins: number
  panicClicksToday: number
  panicClickDate: string
  hackRefreshesToday: number
  hackRefreshDate: string
}

type CoachData = {
  currentCoachStep: number
  selectedTrigger: string | null
  selectedIntensity: number | null
}

type ShoppingList = {
  [key: string]: boolean
}

const STORAGE_KEYS = {
  PROGRESS: 'adiosugar_progress',
  COACH: 'adiosugar_coach',
  SHOPPING: 'adiosugar_shopping'
}

const DEFAULT_PROGRESS: ProgressData = {
  currentDay: 1,
  currentStreak: 0,
  bestStreak: 0,
  lastCheckIn: '',
  totalYesCheckins: 0,
  panicClicksToday: 0,
  panicClickDate: '',
  hackRefreshesToday: 0,
  hackRefreshDate: ''
}

const DEFAULT_COACH: CoachData = {
  currentCoachStep: 0,
  selectedTrigger: null,
  selectedIntensity: null
}

export function getProgressData(): ProgressData {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS
  const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS)
  if (!stored) return DEFAULT_PROGRESS
  
  const data = JSON.parse(stored)
  const today = new Date().toISOString().split('T')[0]
  
  if (data.panicClickDate !== today) {
    data.panicClicksToday = 0
    data.panicClickDate = today
  }
  
  if (data.hackRefreshDate !== today) {
    data.hackRefreshesToday = 0
    data.hackRefreshDate = today
  }
  
  return data
}

export function updateProgressData(updates: Partial<ProgressData>): void {
  if (typeof window === 'undefined') return
  const current = getProgressData()
  const updated = { ...current, ...updates }
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(updated))
}

export function incrementPanicClick(): { count: number; limitReached: boolean } {
  if (typeof window === 'undefined') return { count: 0, limitReached: false }
  
  const data = getProgressData()
  const today = new Date().toISOString().split('T')[0]
  
  if (data.panicClickDate !== today) {
    data.panicClicksToday = 1
    data.panicClickDate = today
  } else {
    data.panicClicksToday += 1
  }
  
  updateProgressData(data)
  
  return {
    count: data.panicClicksToday,
    limitReached: data.panicClicksToday > 10
  }
}

export function incrementHackRefresh(): { count: number; limitReached: boolean } {
  if (typeof window === 'undefined') return { count: 0, limitReached: false }
  
  const data = getProgressData()
  const today = new Date().toISOString().split('T')[0]
  
  if (data.hackRefreshDate !== today) {
    data.hackRefreshesToday = 1
    data.hackRefreshDate = today
  } else {
    data.hackRefreshesToday += 1
  }
  
  updateProgressData(data)
  
  return {
    count: data.hackRefreshesToday,
    limitReached: data.hackRefreshesToday > 10
  }
}

export function getCoachData(): CoachData {
  if (typeof window === 'undefined') return DEFAULT_COACH
  const stored = localStorage.getItem(STORAGE_KEYS.COACH)
  return stored ? JSON.parse(stored) : DEFAULT_COACH
}

export function updateCoachData(updates: Partial<CoachData>): void {
  if (typeof window === 'undefined') return
  const current = getCoachData()
  const updated = { ...current, ...updates }
  localStorage.setItem(STORAGE_KEYS.COACH, JSON.stringify(updated))
}

export function getShoppingList(): ShoppingList {
  if (typeof window === 'undefined') return {}
  const stored = localStorage.getItem(STORAGE_KEYS.SHOPPING)
  return stored ? JSON.parse(stored) : {}
}

export function updateShoppingList(updates: ShoppingList): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.SHOPPING, JSON.stringify(updates))
}