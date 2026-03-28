/**
 * App state lives in React Context (`AuthProvider`, `DatingProvider`).
 * Re-exported here so imports can consistently use `@/store/*` if you later
 * migrate to Redux Toolkit or Zustand.
 */
export { AuthProvider, useAuth } from '@/context/AuthContext'
export { DatingProvider, useDating } from '@/context/DatingContext'
