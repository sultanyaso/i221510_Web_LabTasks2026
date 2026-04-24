import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useSettings } from '../context/SettingsContext'
import { formatPrice } from '../utils/format'
import styles from './PriceChart.module.css'

function CustomTooltip({ active, payload, label, symbol }) {
  if (!active || !payload?.length) return null
  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipDate}>{label}</div>
      <div className={styles.tooltipPrice}>{formatPrice(payload[0].value, symbol)}</div>
    </div>
  )
}

export default function PriceChart({ data }) {
  const { currencySymbol } = useSettings()
  if (!data?.prices?.length) return null

  const chartData = data.prices.map(([ts, price]) => ({
    date: new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    price,
  }))

  const isUp = chartData[chartData.length - 1]?.price >= chartData[0]?.price
  const color = isUp ? 'var(--green)' : 'var(--red)'
  const gradId = isUp ? 'gradUp' : 'gradDown'

  return (
    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
          <YAxis hide domain={['auto', 'auto']} />
          <Tooltip content={<CustomTooltip symbol={currencySymbol} />} />
          <Area type="monotone" dataKey="price" stroke={color} strokeWidth={2} fill={`url(#${gradId})`} dot={false} activeDot={{ r: 4, fill: color }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
