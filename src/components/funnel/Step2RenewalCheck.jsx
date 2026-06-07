import { CreditCard, Calendar, AlertCircle, Clock, CheckCircle2 } from 'lucide-react'

const cardBrands = {
  Visa:       { bg: 'from-blue-700 to-blue-900',   dots: '•••• •••• ••••' },
  Mastercard: { bg: 'from-slate-700 to-slate-900',  dots: '•••• •••• ••••' },
  Amex:       { bg: 'from-indigo-700 to-indigo-900',dots: '•••• •••••' },
}

function daysUntil(dateStr) {
  const diff = new Date(dateStr) - new Date()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function RenewalBadge({ days }) {
  if (days <= 3)  return <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full"><AlertCircle className="w-3 h-3" />Due in {days}d</span>
  if (days <= 10) return <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full"><Clock className="w-3 h-3" />Due in {days}d</span>
  return <span className="flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full"><CheckCircle2 className="w-3 h-3 text-slate-400" />Due in {days}d</span>
}

export default function Step2RenewalCheck({ subscriptions }) {
  const active = subscriptions.filter(s => !s.cancelled)

  // Group by card
  const byCard = active.reduce((acc, s) => {
    const key = `${s.cardType} ****${s.cardLast4}`
    if (!acc[key]) acc[key] = { type: s.cardType, last4: s.cardLast4, items: [] }
    acc[key].items.push(s)
    return acc
  }, {})

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">Step 2 — Renewal Check</h3>
            <p className="text-xs text-slate-500">Credit card links & upcoming billing dates</p>
          </div>
        </div>
        <span className="text-xs font-medium text-purple-600 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
          {active.length} active billing
        </span>
      </div>

      <div className="p-6 space-y-6">
        {Object.entries(byCard).map(([cardKey, card]) => {
          const brand = cardBrands[card.type] || cardBrands.Visa
          const totalBilling = card.items.reduce((s, i) => s + i.monthlyAmount, 0)

          return (
            <div key={cardKey}>
              {/* Card Visual */}
              <div className="flex items-center gap-4 mb-3">
                <div className={`bg-gradient-to-r ${brand.bg} rounded-xl px-5 py-3 text-white shadow-md min-w-56 flex items-center justify-between`}>
                  <div>
                    <p className="text-xs opacity-70 font-medium">{card.type}</p>
                    <p className="text-sm font-bold tracking-wider mt-0.5">{brand.dots} {card.last4}</p>
                  </div>
                  <CreditCard className="w-5 h-5 opacity-50" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">{card.items.length} subscriptions billed</p>
                  <p className="text-sm font-bold text-slate-800">${totalBilling.toFixed(2)}/mo total</p>
                </div>
              </div>

              {/* Renewal rows */}
              <div className="border border-slate-100 rounded-lg divide-y divide-slate-50 overflow-hidden">
                {card.items
                  .sort((a, b) => new Date(a.nextRenewal) - new Date(b.nextRenewal))
                  .map(sub => {
                    const days = daysUntil(sub.nextRenewal)
                    const isUrgent = days <= 10 && sub.status !== 'healthy'
                    return (
                      <div
                        key={sub.id}
                        className={`flex flex-wrap items-center justify-between gap-3 px-4 py-3 ${isUrgent ? 'bg-red-50/40' : 'bg-white hover:bg-slate-50'} transition`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{sub.icon}</span>
                          <div>
                            <p className="text-sm font-medium text-slate-800">{sub.name}</p>
                            <p className="text-xs text-slate-400">{sub.billingCycle} · {sub.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="flex items-center gap-1.5 text-xs text-slate-600">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            {sub.nextRenewal}
                          </div>
                          <span className="text-sm font-bold text-slate-800">
                            ${sub.monthlyAmount.toFixed(2)}
                          </span>
                          <RenewalBadge days={days} />
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
