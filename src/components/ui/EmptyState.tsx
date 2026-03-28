import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/5">
        <Icon className="h-7 w-7 text-fuchsia-300" />
      </div>
      <h3 className="text-lg font-semibold text-zinc-100">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-400">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
