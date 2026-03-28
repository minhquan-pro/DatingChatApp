import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

/** Match Vite `base` so routes work under https://<user>.github.io/<repo>/ */
const routerBasename =
  import.meta.env.BASE_URL.replace(/\/$/, '') === ''
    ? undefined
    : import.meta.env.BASE_URL.replace(/\/$/, '')
import { AuthProvider } from '@/context/AuthContext'
import { DatingProvider } from '@/context/DatingContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { AuthLayout } from '@/layouts/AuthLayout'
import { MainLayout } from '@/layouts/MainLayout'
import { ChatPage } from '@/pages/ChatPage'
import { DiscoverPage } from '@/pages/DiscoverPage'
import { LoginPage } from '@/pages/LoginPage'
import { MatchesPage } from '@/pages/MatchesPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { RegisterPage } from '@/pages/RegisterPage'

export default function App() {
  return (
    <AuthProvider>
      <DatingProvider>
        <BrowserRouter basename={routerBasename}>
          <Routes>
            <Route path="/" element={<Navigate to="/discover" replace />} />

            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/matches" element={<MatchesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/chat/:matchId" element={<ChatPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/discover" replace />} />
          </Routes>
        </BrowserRouter>
      </DatingProvider>
    </AuthProvider>
  )
}
