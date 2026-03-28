import type { HTMLAttributes, ReactNode } from 'react'

export function GlassCard({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.75)] backdrop-blur-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
