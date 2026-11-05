const AUTH_KEY = 'adiosugar_user_logged_in'
const USER_KEY = 'adiosugar_user_profile'

export type UserProfile = {
  name: string
  email?: string
  createdAt: string
}

export function isUserLoggedIn(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(AUTH_KEY) === 'true'
}

export function getUserProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(USER_KEY)
  return stored ? JSON.parse(stored) : null
}

export function createUserProfile(name: string, email?: string): void {
  if (typeof window === 'undefined') return
  
  const profile: UserProfile = {
    name,
    email,
    createdAt: new Date().toISOString()
  }
  
  localStorage.setItem(AUTH_KEY, 'true')
  localStorage.setItem(USER_KEY, JSON.stringify(profile))
}

export function logoutUser(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(AUTH_KEY)
  localStorage.removeItem(USER_KEY)
}

export function deleteUserAccount(): void {
  if (typeof window === 'undefined') return
  
  localStorage.clear()
  
  if (typeof window !== 'undefined') {
    window.location.href = '/'
  }
}