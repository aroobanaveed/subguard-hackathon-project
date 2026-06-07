import { Activity, Clock, Users, Zap, TrendingDown } from 'lucide-react'

function UsageBar({ percent, status }) {
  const color = status === 'healthy'
    ? 'bg-emerald-500'
    : status === 'ghost'
    ? 'bg-red-500'
    : 'bg-amber-400'

  return (
    <div className="w-full bg-slate-100 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-700 ${color}`}
        style={{ width: `${Math.max(percent, 2)}%` }}
      />
    </div>
  )
}

const statusConfig = {
  healthy:      { label: 'Healthy',             bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
  ghost:        { label: 'Ghost App',            bg: 'bg-red-100',     text: 'text-red-700',     border: 'border-red-200' },
  underutilized:{ label: 'Underutilized',        bg: 'bg-amber-100',   text: 'text-amber-700',   border: 'border-amber-200' },
}

export default function Step1AnalyzeUsage({ subscriptions }) {
  const active = subscriptions.filter(s => !s.cancelled)

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">Step 1 — Analyze Usage</h3>
            <p className="text-xs text-slate-500">Real-time software utilization tracking</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs font-medium text-blue-600">Live</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Application</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Category</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide w-40">Usage</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Users</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Last Activity</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {active.map(sub => {
              const cfg = statusConfig[sub.status]
              return (
                <tr key={sub.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{sub.icon}</span>
                      <div>
                        <p className="font-medium text-slate-800 text-sm">{sub.name}</p>
                        <p className="text-xs text-slate-400">${sub.monthlyAmount.toFixed(2)}/mo</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">{sub.category}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <UsageBar percent={sub.usagePercent} status={sub.status} />
                      </div>
                      <span className={`text-xs font-bold w-10 text-right ${
                        sub.status === 'healthy' ? 'text-emerald-600' :
                        sub.status === 'ghost'   ? 'text-red-600' : 'text-amber-600'
                      }`}>
                        {sub.usagePercent}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-sm text-slate-700">{sub.activeUsers}</span>
                      <span className="text-xs text-slate-400">/ {sub.totalSeats}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs text-slate-600">{sub.lastActivity}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                      {sub.status !== 'healthy' && <TrendingDown className="w-3 h-3" />}
                      {cfg.label}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {active.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <Zap className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm">All subscriptions have been cancelled</p>
        </div>
      )}
    </div>
  )
}
