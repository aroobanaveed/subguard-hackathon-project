import { DollarSign, AlertTriangle, CheckCircle, Activity, TrendingDown } from 'lucide-react'

export default function StatsBar({ subscriptions, moneySaved }) {
  const active   = subscriptions.filter(s => !s.cancelled)
  const ghost    = active.filter(s => s.status === 'ghost').length
  const underused = active.filter(s => s.status === 'underutilized').length
  const healthy  = active.filter(s => s.status === 'healthy').length
  const totalMonthly = active.reduce((sum, s) => sum + s.monthlyAmount, 0)
  const wasteMonthly = active
    .filter(s => s.status !== 'healthy')
    .reduce((sum, s) => sum + s.monthlyAmount, 0)

  const cards = [
    {
      label: 'Monthly Spend',
      value: `$${totalMonthly.toLocaleString('en-US', { minimumFractionDigits: 0 })}`,
      sub: 'Active subscriptions',
      icon: DollarSign,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
    },
    {
      label: 'Estimated Waste',
      value: `$${wasteMonthly.toLocaleString('en-US', { minimumFractionDigits: 0 })}/mo`,
      sub: `${ghost + underused} flagged apps`,
      icon: TrendingDown,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-100',
    },
    {
      label: 'Ghost Apps',
      value: ghost,
      sub: 'Zero / minimal usage',
      icon: AlertTriangle,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
    },
    {
      label: 'Healthy Apps',
      value: healthy,
      sub: 'Above 70% utilization',
      icon: CheckCircle,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
    },
    {
      label: 'Total Saved',
      value: `$${moneySaved.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      sub: 'Cancelled to date',
      icon: Activity,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      border: 'border-indigo-100',
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
      {cards.map(card => (
        <div
          key={card.label}
          className={`bg-white rounded-xl border ${card.border} shadow-sm p-4 flex flex-col gap-2`}
        >
          <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center`}>
            <card.icon className={`w-4 h-4 ${card.color}`} />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-800 leading-tight">{card.value}</p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">{card.label}</p>
            <p className="text-xs text-slate-400">{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
