import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, MessageCircle } from 'lucide-react'
import { useDating } from '@/context/DatingContext'
import { useScrollToBottom } from '@/hooks/useScrollToBottom'
import { MessageBubble } from '@/components/chat/MessageBubble'
import { ChatInput } from '@/components/chat/ChatInput'
import { EmptyState } from '@/components/ui/EmptyState'

export function ChatPage() {
  const { matchId } = useParams()
  const navigate = useNavigate()
  const { matches, messagesByMatchId, sendMessage } = useDating()

  const match = useMemo(() => matches.find((m) => m.id === matchId), [matches, matchId])
  const messages = matchId ? messagesByMatchId[matchId] ?? [] : []

  const scrollRef = useScrollToBottom(messages)

  if (!matchId || !match) {
    return (
      <div className="px-4 pt-8">
        <EmptyState
          icon={MessageCircle}
          title="Conversation not found"
          description="This chat doesn’t exist (or you haven’t matched yet)."
        />
        <div className="mt-6 text-center">
          <Link to="/matches" className="text-sm font-semibold text-fuchsia-300 hover:text-fuchsia-200">
            Back to matches
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-md items-center gap-3 px-3 py-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
            aria-label="Back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-2xl ring-1 ring-white/10">
              <img src={match.user.image} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold text-white">
                {match.user.name}, {match.user.age}
              </p>
              <p className="truncate text-xs text-zinc-500">Active now · mock</p>
            </div>
          </div>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="scroll-smooth-touch flex-1 space-y-3 overflow-y-auto px-4 py-4"
      >
        {messages.length === 0 ? (
          <EmptyState
            icon={MessageCircle}
            title="No messages yet"
            description="Send a first message — keep it light, kind, and specific to their profile."
          />
        ) : (
          messages.map((m) => <MessageBubble key={m.id} message={m} />)
        )}
      </div>

      <div className="sticky bottom-0">
        <ChatInput onSend={(text) => sendMessage(match.id, text)} />
      </div>
    </div>
  )
}
