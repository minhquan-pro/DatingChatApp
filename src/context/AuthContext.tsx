/* eslint-disable react-refresh/only-export-components -- context module exports provider + hook */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { DEFAULT_ME } from '@/data/mockData'
import type { User } from '@/types'

type AuthUser = {
  email: string
  profile: User
}

type AuthContextValue = {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, confirm: string) => Promise<void>
  logout: () => void
  updateProfile: (profile: User) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

/** Simple client-side validation (mock auth — no real API). */
function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  const login = useCallback(async (email: string, password: string) => {
    const e = email.trim()
    if (!validateEmail(e)) throw new Error('Please enter a valid email.')
    if (password.length < 6) throw new Error('Password must be at least 6 characters.')
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 450))
    setUser({ email: e, profile: { ...DEFAULT_ME } })
  }, [])

  const register = useCallback(async (email: string, password: string, confirm: string) => {
    const e = email.trim()
    if (!validateEmail(e)) throw new Error('Please enter a valid email.')
    if (password.length < 6) throw new Error('Password must be at least 6 characters.')
    if (password !== confirm) throw new Error('Passwords do not match.')
    await new Promise((r) => setTimeout(r, 550))
    setUser({ email: e, profile: { ...DEFAULT_ME } })
  }, [])

  const logout = useCallback(() => setUser(null), [])

  const updateProfile = useCallback((profile: User) => {
    setUser((prev) => (prev ? { ...prev, profile } : null))
  }, [])

  const value = useMemo(
    () => ({ user, login, register, logout, updateProfile }),
    [user, login, register, logout, updateProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
