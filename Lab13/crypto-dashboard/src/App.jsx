import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SettingsProvider } from './context/SettingsContext'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import CoinDetail from './pages/CoinDetail'
import Favorites from './pages/Favorites'
import Settings from './pages/Settings'

export default function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/coin/:id" element={<CoinDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  )
}
