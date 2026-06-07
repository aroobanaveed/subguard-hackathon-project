import { Bell, AlertTriangle, Ghost, TrendingDown, DollarSign, Calendar } from 'lucide-react'

function daysUntil(dateStr) {
  const diff = new Date(dateStr) - new Date()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

const severityConfig = {
  critical: {
    bg: 'bg-red-50',
    border: 'border-red-300',
    headerBg: 'bg-red-500',
    icon: Ghost,
    iconColor: 'text-white',
    badge: 'bg-red-500 text-white',
    label: 'CRITICAL — Ghost App',
    pulse: true,
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    headerBg: 'bg-amber-500',
    icon: TrendingDown,
    iconColor: 'text-white',
    badge: 'bg-amber-500 text-white',
    label: 'WARNING — Underutilized',
    pulse: false,
  },
}

function AlertCard({ sub }) {
  const days = daysUntil(sub.nextRenewal)
  const sev  = sub.status === 'ghost' ? severityConfig.critical : severityConfig.warning
  const SevIcon = sev.icon

  return (
    <div className={`rounded-xl border-2 ${sev.border} ${sev.bg} overflow-hidden shadow-sm`}>
      {/* Top band */}
      <div className={`${sev.headerBg} px-4 py-2 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          {sev.pulse && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
          <SevIcon className={`w-4 h-4 ${sev.iconColor}`} />
          <span className="text-xs font-bold text-white tracking-wide uppercase">{sev.label}</span>
        </div>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-white/20 text-white`}>
          {sub.usagePercent}% usage
        </span>
      </div>

      {/* Body */}
      <div className="px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{sub.icon}</span>
            <div>
              <p className="font-semibold text-slate-800 text-sm">{sub.name}</p>
              <p className="text-xs text-slate-500">{sub.category} · Last active: {sub.lastActivity}</p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-lg font-bold text-slate-800">${sub.monthlyAmount.toFixed(2)}</p>
            <p className="text-xs text-slate-400">per month</p>
          </div>
        </div>

        {/* Alert details */}
        <div className="mt-3 flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 bg-white rounded-lg px-3 py-1.5 border border-slate-200 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-600">Renews {sub.nextRenewal}</span>
            <span className={`text-xs font-bold ml-1 ${days <= 5 ? 'text-red-600' : 'text-amber-600'}`}>
              ({days} days)
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-white rounded-lg px-3 py-1.5 border border-slate-200 shadow-xs">
            <DollarSign className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-600">Annual waste:</span>
            <span className="text-xs font-bold text-red-600 ml-1">${(sub.monthlyAmount * 12).toFixed(0)}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white rounded-lg px-3 py-1.5 border border-slate-200 shadow-xs">
            <Bell className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs text-slate-600">Alert triggered automatically</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Step3SmartAlert({ subscriptions }) {
  const flagged = subscriptions.filter(s => !s.cancelled && s.alertTriggered)

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">Step 3 — Smart Alerts</h3>
            <p className="text-xs text-slate-500">Automated billing warnings for ghost &amp; low-usage apps</p>
          </div>
        </div>
        {flagged.length > 0 && (
          <div className="flex items-center gap-1.5 bg-red-500 text-white rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span className="text-xs font-bold">{flagged.length} alerts active</span>
          </div>
        )}
      </div>

      <div className="p-6">
        {flagged.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Bell className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm font-medium">All clear — no active alerts</p>
            <p className="text-xs mt-1">Subscriptions are either healthy or have been cancelled</p>
          </div>
        ) : (
          <div className="space-y-3">
            {flagged
              .sort((a, b) => a.usagePercent - b.usagePercent)
              .map(sub => (
                <AlertCard key={sub.id} sub={sub} />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
