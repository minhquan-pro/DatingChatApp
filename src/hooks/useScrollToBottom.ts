import { useEffect, useRef } from 'react'
import type { Message } from '@/types'

/**
 * Keeps a scrollable container pinned to the bottom when content changes
 * (e.g. new chat messages).
 */
export function useScrollToBottom(messages: Message[]) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages])

  return ref
}
