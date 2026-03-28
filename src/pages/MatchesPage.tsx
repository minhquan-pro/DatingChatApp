import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { useDating } from '@/context/DatingContext'
import { GlassCard } from '@/components/ui/GlassCard'
import { EmptyState } from '@/components/ui/EmptyState'

function formatRelative(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export function MatchesPage() {
  const { matches } = useDating()

  if (matches.length === 0) {
    return (
      <div className="px-4 pt-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-white">Matches</h1>
          <p className="mt-1 text-sm text-zinc-400">Your conversations live here.</p>
        </div>
        <GlassCard>
          <EmptyState
            icon={MessageCircle}
            title="No matches yet"
            description="Keep swiping on Discover — when you match, you’ll see them here."
          />
        </GlassCard>
      </div>
    )
  }

  return (
    <div className="px-4 pt-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white">Matches</h1>
        <p className="mt-1 text-sm text-zinc-400">{matches.length} people · mock inbox</p>
      </header>

      <div className="space-y-3">
        {matches.map((m) => (
          <Link key={m.id} to={`/chat/${m.id}`}>
            <GlassCard className="flex items-center gap-3 p-4 transition hover:bg-white/10">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10">
                <img src={m.user.image} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate font-semibold text-white">
                    {m.user.name}, {m.user.age}
                  </p>
                  <span className="shrink-0 text-[11px] text-zinc-500">
                    {formatRelative(m.lastMessageAt)}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-zinc-400">{m.lastMessagePreview}</p>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  )
}
