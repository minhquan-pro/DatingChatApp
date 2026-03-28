import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { Flame, MessageCircle, UserRound } from 'lucide-react'

const nav = [
  { to: '/discover', label: 'Discover', icon: Flame },
  { to: '/matches', label: 'Matches', icon: MessageCircle },
  { to: '/profile', label: 'Profile', icon: UserRound },
]

export function MainLayout() {
  const location = useLocation()
  const hideNav = location.pathname.startsWith('/chat/')

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
      <main className={`flex-1 pb-24 ${hideNav ? 'pb-0' : ''}`}>
        <Outlet />
      </main>

      {!hideNav ? (
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="mx-auto flex max-w-md items-stretch justify-around px-2 py-2">
            {nav.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex flex-1 flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs font-semibold transition ${
                    isActive ? 'text-fuchsia-300' : 'text-zinc-500 hover:text-zinc-300'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      ) : null}
    </div>
  )
}
