// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Layout from '../components/Layout'
import Login from '../Pages/Login'

// Import page components
import Home from '../Pages/Home'
import TrackBaggage from '../Pages/TrackBaggage'
import LostAndFound from '../Pages/LostAndFound'
import Alerts from '../Pages/Alerts'
import Reports from '../Pages/Reports'
import Profile from '../Pages/Profile'
import Settings from '../Pages/Settings'
import TransferHub from '../Pages/TransferHub'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default function AppRouter() {
  const { user } = useAuth()

  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={user ? <Navigate to="/home" replace /> : <Login />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="track-baggage" element={<TrackBaggage />} />
        <Route path="transfer-hub" element={<TransferHub />} />
        <Route path="lost-and-found" element={<LostAndFound />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="reports" element={<Reports />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />

        {/* Redirect to home if no match found */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  )
}