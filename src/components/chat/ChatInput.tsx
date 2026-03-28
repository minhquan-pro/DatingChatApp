import { Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'

export function ChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [value, setValue] = useState('')

  const submit = (e?: FormEvent) => {
    e?.preventDefault()
    if (!value.trim()) return
    onSend(value)
    setValue('')
  }

  return (
    <form
      onSubmit={submit}
      className="border-t border-white/10 bg-black/20 p-3 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-3xl items-end gap-2">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={1}
          placeholder="Say something nice…"
          className="max-h-32 min-h-[48px] flex-1 resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-fuchsia-400/50"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              submit()
            }
          }}
        />
        <Button
          type="submit"
          className="h-12 w-12 shrink-0 rounded-2xl px-0"
          aria-label="Send"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  )
}
