/* eslint-disable react-refresh/only-export-components -- context module exports provider + hook */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  INITIAL_MATCHES,
  INITIAL_MESSAGES,
  MOCK_DISCOVER_USERS,
} from '@/data/mockData'
import type { MatchItem, Message, User } from '@/types'

type DatingContextValue = {
  // Discover stack
  swipeQueue: User[]
  swipe: (direction: 'left' | 'right') => void
  // Matches & chat
  matches: MatchItem[]
  messagesByMatchId: Record<string, Message[]>
  sendMessage: (matchId: string, text: string) => void
}

const DatingContext = createContext<DatingContextValue | null>(null)

function uid() {
  return `msg_${Math.random().toString(36).slice(2, 10)}`
}

export function DatingProvider({ children }: { children: ReactNode }) {
  const [swipeQueue, setSwipeQueue] = useState<User[]>(() => [...MOCK_DISCOVER_USERS])
  const [matches, setMatches] = useState<MatchItem[]>(() => [...INITIAL_MATCHES])
  const [messagesByMatchId, setMessagesByMatchId] = useState<Record<string, Message[]>>(
    () => ({ ...INITIAL_MESSAGES }),
  )

  const swipe = useCallback((direction: 'left' | 'right') => {
    setSwipeQueue((q) => {
      if (q.length === 0) return q
      const [current, ...rest] = q
      if (direction === 'right') {
        const now = new Date().toISOString()
        const newMatch: MatchItem = {
          id: current.id,
          user: current,
          lastMessagePreview: 'You matched! Say hi 👋',
          lastMessageAt: now,
        }
        setMatches((m) => {
          if (m.some((x) => x.id === current.id)) return m
          return [newMatch, ...m]
        })
        setMessagesByMatchId((prev) => {
          if (prev[current.id]) return prev
          const welcome: Message = {
            id: uid(),
            matchId: current.id,
            text: 'You both liked each other — say hi first! 💬',
            sentAt: now,
            fromMe: true,
          }
          return { ...prev, [current.id]: [welcome] }
        })
      }
      return rest
    })
  }, [])

  const sendMessage = useCallback((matchId: string, text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const now = new Date().toISOString()
    const msg: Message = {
      id: uid(),
      matchId,
      text: trimmed,
      sentAt: now,
      fromMe: true,
    }
    setMessagesByMatchId((prev) => ({
      ...prev,
      [matchId]: [...(prev[matchId] ?? []), msg],
    }))
    setMatches((prev) =>
      prev.map((m) =>
        m.id === matchId
          ? { ...m, lastMessagePreview: trimmed, lastMessageAt: now }
          : m,
      ),
    )
  }, [])

  const value = useMemo(
    () => ({ swipeQueue, swipe, matches, messagesByMatchId, sendMessage }),
    [swipeQueue, swipe, matches, messagesByMatchId, sendMessage],
  )

  return <DatingContext.Provider value={value}>{children}</DatingContext.Provider>
}

export function useDating() {
  const ctx = useContext(DatingContext)
  if (!ctx) throw new Error('useDating must be used within DatingProvider')
  return ctx
}
