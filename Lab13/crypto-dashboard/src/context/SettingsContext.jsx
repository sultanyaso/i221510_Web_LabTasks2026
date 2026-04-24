import { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext()

const CURRENCY_SYMBOLS = { USD: '$', EUR: '€', GBP: '£', INR: '₹' }
const COUNTRY_CURRENCY = {
  IN: 'INR', GB: 'GBP', DE: 'EUR', FR: 'EUR', IT: 'EUR',
  ES: 'EUR', NL: 'EUR', PT: 'EUR', BE: 'EUR', AT: 'EUR',
}

export function SettingsProvider({ children }) {
  const [currency, setCurrency] = useState(() => localStorage.getItem('cv_currency') || 'USD')
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cv_favorites') || '[]') } catch { return [] }
  })
  const [theme, setTheme] = useState(() => localStorage.getItem('cv_theme') || 'dark')
  const [alertThreshold, setAlertThreshold] = useState(() => parseFloat(localStorage.getItem('cv_alert') || '5'))

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('cv_theme', theme)
  }, [theme])

  useEffect(() => { localStorage.setItem('cv_currency', currency) }, [currency])
  useEffect(() => { localStorage.setItem('cv_favorites', JSON.stringify(favorites)) }, [favorites])
  useEffect(() => { localStorage.setItem('cv_alert', alertThreshold) }, [alertThreshold])

  // Geolocation currency suggestion
  useEffect(() => {
    if (localStorage.getItem('cv_currency')) return // user already chose
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        const suggested = COUNTRY_CURRENCY[data.country_code]
        if (suggested) setCurrency(suggested)
      })
      .catch(() => {})
  }, [])

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const isFavorite = (id) => favorites.includes(id)
  const currencySymbol = CURRENCY_SYMBOLS[currency] || '$'

  return (
    <SettingsContext.Provider value={{
      currency, setCurrency,
      favorites, toggleFavorite, isFavorite,
      theme, setTheme,
      alertThreshold, setAlertThreshold,
      currencySymbol,
      CURRENCY_SYMBOLS
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)
