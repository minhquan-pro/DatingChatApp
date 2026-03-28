import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="min-h-dvh px-4 py-10">
      <div className="mx-auto w-full max-w-md">
        <Outlet />
      </div>
    </div>
  )
}
