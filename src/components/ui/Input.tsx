import { forwardRef, type InputHTMLAttributes } from 'react'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className = '', ...props }, ref) {
    return (
      <input
        ref={ref}
        className={`w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-100 outline-none ring-0 transition placeholder:text-zinc-500 focus:border-fuchsia-400/50 focus:bg-black/30 ${className}`}
        {...props}
      />
    )
  },
)
