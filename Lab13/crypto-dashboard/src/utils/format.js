export function formatPrice(price, symbol = '$', decimals = null) {
  if (price == null) return 'N/A'
  const d = decimals ?? (price >= 1 ? 2 : price >= 0.01 ? 4 : 6)
  return `${symbol}${price.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })}`
}

export function formatMarketCap(value, symbol = '$') {
  if (!value) return 'N/A'
  if (value >= 1e12) return `${symbol}${(value / 1e12).toFixed(2)}T`
  if (value >= 1e9) return `${symbol}${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `${symbol}${(value / 1e6).toFixed(2)}M`
  return `${symbol}${value.toLocaleString()}`
}

export function formatPercent(value) {
  if (value == null) return 'N/A'
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`
}

export function formatSupply(value) {
  if (!value) return 'N/A'
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`
  if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`
  return value.toLocaleString()
}

export function timeAgo(date) {
  if (!date) return ''
  const diff = (Date.now() - date.getTime()) / 1000
  if (diff < 60) return `${Math.floor(diff)}s ago`
  return `${Math.floor(diff / 60)}m ago`
}
