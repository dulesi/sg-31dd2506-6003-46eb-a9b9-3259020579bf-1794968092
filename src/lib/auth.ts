import { supabase } from '@/integrations/supabase/client'

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

export async function deleteUserAccount(): Promise<void> {
  if (typeof window === 'undefined') return
  
  try {
    // Call Supabase RPC to delete user from all tables + auth
    const { error } = await supabase.rpc('delete_user_account')
    
    if (error) {
      console.error('Failed to delete user account from Supabase:', error)
      throw error
    }
    
    // Clear all localStorage data
    localStorage.clear()
    
    // Sign out from Supabase session
    await supabase.auth.signOut()
    
    // Redirect to home page
    window.location.href = '/'
  } catch (err) {
    console.error('Error deleting account:', err)
    // Even if Supabase delete fails, clear local data and redirect
    localStorage.clear()
    await supabase.auth.signOut()
    window.location.href = '/'
  }
}