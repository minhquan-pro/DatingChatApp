import { motion, useMotionValue, useTransform } from 'framer-motion'
import type { CSSProperties } from 'react'
import { MapPin } from 'lucide-react'
import type { User } from '@/types'
import { GlassCard } from '@/components/ui/GlassCard'

type Props = {
  user: User
  onSwipe: (dir: 'left' | 'right') => void
  style?: CSSProperties
}

/**
 * Tinder-style draggable card with rotation tied to horizontal drag.
 */
export function SwipeCard({ user, onSwipe, style }: Props) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-220, 220], [-14, 14])
  const likeOpacity = useTransform(x, [40, 140], [0, 1])
  const nopeOpacity = useTransform(x, [-140, -40], [1, 0])

  return (
    <motion.div
      style={{ x, rotate, ...style }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={(_, info) => {
        const threshold = 110
        if (info.offset.x > threshold) onSwipe('right')
        else if (info.offset.x < -threshold) onSwipe('left')
      }}
      className="absolute inset-x-0 top-0 cursor-grab active:cursor-grabbing"
    >
      <GlassCard className="relative overflow-hidden">
        <div className="relative aspect-[3/4] w-full">
          <img
            src={user.image}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          <motion.div
            style={{ opacity: likeOpacity }}
            className="pointer-events-none absolute left-6 top-6 rounded-2xl border-4 border-emerald-400/80 px-3 py-1 text-lg font-black tracking-widest text-emerald-200/90 rotate-[-10deg]"
          >
            LIKE
          </motion.div>
          <motion.div
            style={{ opacity: nopeOpacity }}
            className="pointer-events-none absolute right-6 top-6 rounded-2xl border-4 border-rose-400/80 px-3 py-1 text-lg font-black tracking-widest text-rose-200/90 rotate-[10deg]"
          >
            NOPE
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
            <div className="flex items-end justify-between gap-3">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  {user.name}, {user.age}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-200/90">
                  {user.bio}
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {user.interests.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-zinc-300">
              <MapPin className="h-4 w-4" />
              Nearby · Mock location
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
