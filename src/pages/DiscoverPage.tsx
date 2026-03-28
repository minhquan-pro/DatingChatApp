import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Undo2, X } from 'lucide-react'
import { useDating } from '@/context/DatingContext'
import { SwipeCard } from '@/components/swipe/SwipeCard'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Skeleton } from '@/components/ui/Skeleton'

export function DiscoverPage() {
  const { swipeQueue, swipe } = useDating()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 750)
    return () => window.clearTimeout(t)
  }, [])

  const top = swipeQueue[0]
  const next = swipeQueue[1]

  const stackKey = useMemo(() => top?.id ?? 'empty', [top?.id])

  if (loading) {
    return (
      <div className="px-4 pt-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-40" />
            <Skeleton className="mt-2 h-4 w-56" />
          </div>
          <Skeleton className="h-10 w-10 rounded-2xl" />
        </div>
        <Skeleton className="aspect-[3/4] w-full" />
        <div className="mt-6 grid grid-cols-3 gap-3">
          <Skeleton className="h-14 rounded-2xl" />
          <Skeleton className="h-14 rounded-2xl" />
          <Skeleton className="h-14 rounded-2xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 pt-8">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Discover</h1>
          <p className="mt-1 text-sm text-zinc-400">Swipe right if they give you butterflies.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-300">
          {swipeQueue.length} nearby
        </div>
      </header>

      <div className="relative mx-auto aspect-[3/4] w-full max-w-md">
        {!top ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-2 py-10">
            <EmptyState
              icon={Heart}
              title="No profiles left"
              description="You’ve seen everyone nearby — for now. Come back later or refresh the mock data in code."
              action={
                <Button
                  variant="ghost"
                  onClick={() => window.location.reload()}
                  className="w-full"
                >
                  Reload demo
                </Button>
              }
            />
          </div>
        ) : (
          <>
            {/* Background card for depth */}
            {next ? (
              <div className="pointer-events-none absolute inset-x-6 top-6 opacity-60">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl">
                  <div className="aspect-[3/4] w-full">
                    <img src={next.image} alt="" className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            ) : null}

            <AnimatePresence mode="popLayout">
              <motion.div
                key={stackKey}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.22 }}
                className="relative"
              >
                <SwipeCard user={top} onSwipe={swipe} />
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>

      <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3">
        <Button
          variant="ghost"
          className="h-14 rounded-2xl"
          onClick={() => swipe('left')}
          disabled={!top}
          aria-label="Pass"
        >
          <X className="h-7 w-7 text-rose-300" />
        </Button>
        <Button
          variant="ghost"
          className="h-14 rounded-2xl"
          onClick={() => {
            // Undo is mock-only: show a hint
            window.alert('Undo is not implemented in this demo — keep swiping!')
          }}
          aria-label="Undo"
        >
          <Undo2 className="h-6 w-6 text-zinc-300" />
        </Button>
        <Button className="h-14 rounded-2xl" onClick={() => swipe('right')} disabled={!top} aria-label="Like">
          <Heart className="h-7 w-7 text-white" />
        </Button>
      </div>
    </div>
  )
}
