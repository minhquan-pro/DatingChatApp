import { useMemo, useState } from 'react'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { GlassCard } from '@/components/ui/GlassCard'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function ProfilePage() {
  const { user, logout, updateProfile } = useAuth()
  const profile = user?.profile

  const [name, setName] = useState(() => profile?.name ?? '')
  const [age, setAge] = useState(() => (profile ? String(profile.age) : ''))
  const [bio, setBio] = useState(() => profile?.bio ?? '')
  const [interests, setInterests] = useState(() => profile?.interests.join(', ') ?? '')

  const interestTags = useMemo(
    () =>
      interests
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    [interests],
  )

  if (!profile) return null

  const onSave = (e: React.FormEvent) => {
    e.preventDefault()
    const ageNum = Number.parseInt(age, 10)
    updateProfile({
      ...profile,
      name: name.trim() || profile.name,
      age: Number.isFinite(ageNum) ? ageNum : profile.age,
      bio: bio.trim(),
      interests: interestTags.length ? interestTags : profile.interests,
    })
  }

  return (
    <div className="px-4 pt-8">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Profile</h1>
          <p className="mt-1 text-sm text-zinc-400">Fine-tune how you show up.</p>
        </div>
        <Button
          variant="ghost"
          className="h-11 rounded-2xl px-3"
          onClick={() => logout()}
          aria-label="Log out"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </header>

      <GlassCard className="overflow-hidden">
        <div className="relative aspect-[16/10] w-full">
          <img src={profile.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-lg font-semibold text-white">
              {user.email} <span className="text-zinc-300">· demo</span>
            </p>
          </div>
        </div>

        <form onSubmit={onSave} className="space-y-4 p-5">
          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-400">Display name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-400">Age</label>
            <Input inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-400">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-fuchsia-400/50"
              placeholder="Tell people what you’re about…"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-400">
              Interests (comma separated)
            </label>
            <Input
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="Design, Coffee, Travel"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {interestTags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-200 ring-1 ring-white/10"
              >
                {t}
              </span>
            ))}
          </div>

          <Button type="submit" className="w-full">
            Save changes
          </Button>
          <p className="text-center text-xs text-zinc-500">
            Avatar is a mock URL for demo purposes — replace with uploads in a real app.
          </p>
        </form>
      </GlassCard>
    </div>
  )
}
