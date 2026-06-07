import { useState } from 'react'
import { XCircle, CheckCircle2, Loader2, Trash2, Shield, AlertTriangle, DollarSign, Zap } from 'lucide-react'

const statusStyles = {
  idle:       { label: 'Ready to Cancel', bg: 'bg-slate-100',   text: 'text-slate-600',  border: 'border-slate-200' },
  processing: { label: 'Processing...',   bg: 'bg-blue-50',     text: 'text-blue-600',   border: 'border-blue-200' },
  cancelled:  { label: 'Cancelled',       bg: 'bg-emerald-50',  text: 'text-emerald-700',border: 'border-emerald-200' },
}

function SubscriptionRow({ sub, onCancel, processingId }) {
  const isProcessing = processingId === sub.id
  const style = sub.cancelled
    ? statusStyles.cancelled
    : isProcessing
    ? statusStyles.processing
    : statusStyles.idle

  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 px-5 py-4 rounded-xl border transition-all duration-300 ${
      sub.cancelled ? 'bg-slate-50 opacity-60 border-slate-200' : 'bg-white border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300'
    }`}>
      <div className="flex items-center gap-3">
        <span className="text-xl">{sub.icon}</span>
        <div>
          <p className={`text-sm font-semibold ${sub.cancelled ? 'line-through text-slate-400' : 'text-slate-800'}`}>
            {sub.name}
          </p>
          <p className="text-xs text-slate-400">{sub.category} · {sub.cardType} ****{sub.cardLast4}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="text-right">
          <p className="text-sm font-bold text-slate-800">${sub.monthlyAmount.toFixed(2)}/mo</p>
          <p className="text-xs text-slate-400">Annual: ${(sub.monthlyAmount * 12).toFixed(0)}</p>
        </div>

        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${style.bg} ${style.text} ${style.border}`}>
          {isProcessing
            ? <span className="flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" /> Processing</span>
            : sub.cancelled
            ? <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Cancelled</span>
            : style.label
          }
        </span>

        {!sub.cancelled && (
          <button
            onClick={() => onCancel(sub.id)}
            disabled={isProcessing || !!processingId}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
          >
            {isProcessing
              ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Cancelling</>
              : <><XCircle className="w-3.5 h-3.5" /> Cancel</>
            }
          </button>
        )}

        {sub.cancelled && (
          <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            Saved ${sub.monthlyAmount.toFixed(2)}/mo
          </div>
        )}
      </div>
    </div>
  )
}

export default function Step4AutoCancel({ subscriptions, onCancel, moneySaved, cancelLog }) {
  const [processingId, setProcessingId] = useState(null)

  const handleCancel = (id) => {
    setProcessingId(id)
    // Simulate network call (1.5s)
    setTimeout(() => {
      onCancel(id)
      setProcessingId(null)
    }, 1500)
  }

  const flagged    = subscriptions.filter(s => s.status !== 'healthy')
  const stillActive = flagged.filter(s => !s.cancelled)
  const cancelled  = flagged.filter(s => s.cancelled)

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">Step 4 — Auto-Cancel</h3>
            <p className="text-xs text-slate-500">Safe cancellation panel with live log purging</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5">
          <DollarSign className="w-4 h-4 text-emerald-600" />
          <div>
            <p className="text-xs text-emerald-600 font-medium leading-none">Saved</p>
            <p className="text-sm font-bold text-emerald-800 leading-none">
              ${moneySaved.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Safety notice */}
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
          <Shield className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-700 leading-relaxed">
            <strong>Secure Cancellation Protocol:</strong> All cancellations are processed through verified API endpoints,
            logged to the audit trail, and are reversible within 30 days per your enterprise agreement.
          </p>
        </div>

        {/* Actionable rows */}
        {stillActive.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <p className="text-sm font-semibold text-slate-700">Flagged for Cancellation ({stillActive.length})</p>
            </div>
            <div className="space-y-2">
              {flagged.map(sub => (
                !sub.cancelled && (
                  <SubscriptionRow
                    key={sub.id}
                    sub={sub}
                    onCancel={handleCancel}
                    processingId={processingId}
                  />
                )
              ))}
            </div>
          </div>
        )}

        {/* Cancelled rows */}
        {cancelled.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <p className="text-sm font-semibold text-slate-700">Cancelled & Purged ({cancelled.length})</p>
            </div>
            <div className="space-y-2">
              {cancelled.map(sub => (
                <SubscriptionRow
                  key={sub.id}
                  sub={sub}
                  onCancel={handleCancel}
                  processingId={processingId}
                />
              ))}
            </div>
          </div>
        )}

        {flagged.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            <Zap className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm font-medium">No flagged subscriptions at this time</p>
          </div>
        )}

        {/* Cancellation Log */}
        {cancelLog.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Cancellation Log</p>
            <div className="bg-slate-950 rounded-xl p-4 font-mono text-xs space-y-1 max-h-44 overflow-y-auto">
              {cancelLog.map((entry, i) => (
                <p key={i} className="text-emerald-400">
                  <span className="text-slate-500">[{entry.time}]</span>{' '}
                  <span className="text-blue-400">CANCEL</span>{' '}
                  {entry.name}{' '}
                  <span className="text-emerald-300">→ saved ${entry.amount}/mo</span>{' '}
                  <span className="text-slate-400">· {entry.card}</span>
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
