import { useState, useEffect, useRef, useCallback } from 'react'
import { useSettings } from '../context/SettingsContext'

const BASE = 'https://api.coingecko.com/api/v3'

export function useMarkets() {
  const { currency } = useSettings()
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const prevPrices = useRef({})

  const fetch_data = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `${BASE}/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h`
      )
      if (!res.ok) throw new Error(`API error: ${res.status}`)
      const data = await res.json()

      // track price direction
      const enriched = data.map(coin => {
        const prev = prevPrices.current[coin.id]
        const direction = prev == null ? null : coin.current_price > prev ? 'up' : coin.current_price < prev ? 'down' : null
        prevPrices.current[coin.id] = coin.current_price
        return { ...coin, _direction: direction }
      })

      setCoins(enriched)
      setLastUpdated(new Date())
    } catch (e) {
      setError(e.message.includes('429') ? 'Rate limited by CoinGecko. Please wait a moment.' : e.message)
    } finally {
      setLoading(false)
    }
  }, [currency])

  useEffect(() => {
    fetch_data()
    const interval = setInterval(() => fetch_data(true), 60000)
    return () => clearInterval(interval)
  }, [fetch_data])

  return { coins, loading, error, lastUpdated, refresh: () => fetch_data() }
}

export function useCoinDetail(id) {
  const { currency } = useSettings()
  const [coin, setCoin] = useState(null)
  const [chart, setChart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    setCoin(null)
    setChart(null)

    Promise.all([
      fetch(`${BASE}/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`).then(r => {
        if (!r.ok) throw new Error(`API error: ${r.status}`)
        return r.json()
      }),
      fetch(`${BASE}/coins/${id}/market_chart?vs_currency=${currency.toLowerCase()}&days=7`).then(r => {
        if (!r.ok) throw new Error(`API error: ${r.status}`)
        return r.json()
      })
    ])
      .then(([coinData, chartData]) => {
        setCoin(coinData)
        setChart(chartData)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [id, currency])

  return { coin, chart, loading, error }
}

export function useSearch(coins) {
  const [query, setQuery] = useState('')
  const filtered = coins.filter(c =>
    !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.symbol.toLowerCase().includes(query.toLowerCase())
  )
  return { query, setQuery, filtered }
}
