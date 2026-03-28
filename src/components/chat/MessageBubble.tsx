import type { Message } from '@/types'

function formatTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}

export function MessageBubble({ message }: { message: Message }) {
  const mine = message.fromMe
  return (
    <div className={`flex w-full ${mine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm ${
          mine
            ? 'rounded-br-md bg-gradient-to-br from-fuchsia-500 to-rose-500 text-white'
            : 'rounded-bl-md border border-white/10 bg-white/5 text-zinc-100'
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
        <p className={`mt-1 text-[11px] ${mine ? 'text-white/70' : 'text-zinc-500'}`}>
          {formatTime(message.sentAt)}
        </p>
      </div>
    </div>
  )
}
