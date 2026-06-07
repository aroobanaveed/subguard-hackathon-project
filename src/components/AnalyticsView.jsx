import { BarChart2, TrendingDown, PieChart, DollarSign, ArrowUpRight } from 'lucide-react'

function MiniBar({ label, value, max, color, prefix = '' }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className="flex items-center gap-3">
      <p className="text-xs text-slate-600 w-36 truncate flex-shrink-0">{label}</p>
      <div className="flex-1 bg-slate-100 rounded-full h-2">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs font-semibold text-slate-700 w-20 text-right flex-shrink-0">
        {prefix}${value.toFixed(2)}
      </p>
    </div>
  )
}

export default function AnalyticsView({ subscriptions, moneySaved }) {
  const active = subscriptions.filter(s => !s.cancelled)
  const totalSpend = active.reduce((s, sub) => s + sub.monthlyAmount, 0)
  const wasteSpend = active.filter(s => s.status !== 'healthy').reduce((s, sub) => s + sub.monthlyAmount, 0)
  const healthySpend = active.filter(s => s.status === 'healthy').reduce((s, sub) => s + sub.monthlyAmount, 0)

  const byCategory = active.reduce((acc, sub) => {
    acc[sub.category] = (acc[sub.category] || 0) + sub.monthlyAmount
    return acc
  }, {})

  const maxCat = Math.max(...Object.values(byCategory))

  const savings6m = [
    { month: 'Feb', saved: 0 },
    { month: 'Mar', saved: 0 },
    { month: 'Apr', saved: 82.49 },
    { month: 'May', saved: 82.49 },
    { month: 'Jun', saved: 82.49 },
    { month: 'Jul', saved: moneySaved },
  ]
  const maxSaved = Math.max(...savings6m.map(s => s.saved), 1)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Monthly Spend',   value: `$${totalSpend.toFixed(2)}`,    sub: `${active.length} subscriptions`,  color: 'text-blue-600',    bg: 'bg-blue-50',    icon: DollarSign },
          { label: 'Monthly Waste',   value: `$${wasteSpend.toFixed(2)}`,    sub: 'Ghost & underused apps',           color: 'text-red-600',     bg: 'bg-red-50',     icon: TrendingDown },
          { label: 'Total Savings',   value: `$${moneySaved.toFixed(2)}`,    sub: 'Cancellations to date',            color: 'text-emerald-600', bg: 'bg-emerald-50', icon: ArrowUpRight },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center`}>
                <c.icon className={`w-4 h-4 ${c.color}`} />
              </div>
              <p className="text-sm font-semibold text-slate-700">{c.label}</p>
            </div>
            <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
            <p className="text-xs text-slate-400 mt-1">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spend by Category */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <PieChart className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-800">Monthly Spend by Category</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(byCategory)
              .sort(([, a], [, b]) => b - a)
              .map(([cat, val]) => (
                <MiniBar
                  key={cat}
                  label={cat}
                  value={val}
                  max={maxCat}
                  color={val === maxCat ? 'bg-blue-500' : val > maxCat * 0.5 ? 'bg-indigo-400' : 'bg-slate-300'}
                />
              ))}
          </div>
        </div>

        {/* 6-Month Savings Trend */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <BarChart2 className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-800">6-Month Savings Trend</h3>
          </div>
          <div className="flex items-end gap-2 h-32">
            {savings6m.map(({ month, saved }) => {
              const heightPct = (saved / maxSaved) * 100
              return (
                <div key={month} className="flex-1 flex flex-col items-center gap-1">
                  <p className="text-xs font-bold text-emerald-600">{saved > 0 ? `$${saved.toFixed(0)}` : ''}</p>
                  <div className="w-full flex items-end" style={{ height: '80px' }}>
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-emerald-500 to-emerald-400 transition-all duration-700"
                      style={{ height: `${Math.max(heightPct, saved > 0 ? 8 : 4)}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500">{month}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Utilization breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <BarChart2 className="w-4 h-4 text-slate-500" />
          <h3 className="text-sm font-semibold text-slate-800">Subscription Utilization Breakdown</h3>
        </div>
        <div className="space-y-3">
          {active
            .sort((a, b) => a.usagePercent - b.usagePercent)
            .map(sub => (
              <div key={sub.id} className="flex items-center gap-3">
                <span className="text-base">{sub.icon}</span>
                <p className="text-xs text-slate-600 w-44 truncate flex-shrink-0">{sub.name}</p>
                <div className="flex-1 bg-slate-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-700 ${
                      sub.usagePercent >= 70 ? 'bg-emerald-500' :
                      sub.usagePercent >= 20 ? 'bg-amber-400' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.max(sub.usagePercent, 2)}%` }}
                  />
                </div>
                <p className="text-xs font-bold text-slate-600 w-10 text-right">{sub.usagePercent}%</p>
                <p className="text-xs text-slate-400 w-24 text-right">${sub.monthlyAmount.toFixed(2)}/mo</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
