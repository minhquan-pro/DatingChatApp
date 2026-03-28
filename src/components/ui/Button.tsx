import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'danger'

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-fuchsia-500 via-rose-500 to-orange-400 text-white shadow-lg shadow-fuchsia-500/25 hover:brightness-105 active:scale-[0.99]',
  ghost:
    'bg-white/5 text-zinc-100 border border-white/10 hover:bg-white/10 active:scale-[0.99]',
  danger: 'bg-rose-500/90 text-white hover:bg-rose-500 active:scale-[0.99]',
}

export function Button({
  className = '',
  variant = 'primary',
  type = 'button',
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  children: ReactNode
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
