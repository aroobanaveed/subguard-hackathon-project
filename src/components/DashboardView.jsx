import { useState } from 'react'
import { ChevronRight, LayoutGrid } from 'lucide-react'
import Step1AnalyzeUsage from './funnel/Step1AnalyzeUsage'
import Step2RenewalCheck from './funnel/Step2RenewalCheck'
import Step3SmartAlert from './funnel/Step3SmartAlert'
import Step4AutoCancel from './funnel/Step4AutoCancel'
import StatsBar from './StatsBar'
import ComplianceBanner from './ComplianceBanner'

const steps = [
  { num: 1, label: 'Analyze Usage',  color: 'bg-blue-600',    lightBg: 'bg-blue-50',  border: 'border-blue-200',  text: 'text-blue-700' },
  { num: 2, label: 'Renewal Check',  color: 'bg-purple-600',  lightBg: 'bg-purple-50',border: 'border-purple-200',text: 'text-purple-700' },
  { num: 3, label: 'Smart Alert',    color: 'bg-red-600',     lightBg: 'bg-red-50',   border: 'border-red-200',   text: 'text-red-700' },
  { num: 4, label: 'Auto-Cancel',    color: 'bg-emerald-600', lightBg: 'bg-emerald-50',border: 'border-emerald-200',text: 'text-emerald-700' },
]

export default function DashboardView({ subscriptions, moneySaved, onCancel, cancelLog }) {
  const [activeStep, setActiveStep] = useState(null) // null = show all

  const visibleStep = activeStep

  return (
    <div>
      <StatsBar subscriptions={subscriptions} moneySaved={moneySaved} />

      {/* Funnel Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-slate-500" />
          <h2 className="text-sm font-semibold text-slate-700">Subscription Guard Funnel</h2>
        </div>
        {activeStep && (
          <button
            onClick={() => setActiveStep(null)}
            className="text-xs text-blue-600 hover:underline font-medium"
          >
            ← Show all steps
          </button>
        )}
      </div>

      {/* Step pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {steps.map(s => (
          <button
            key={s.num}
            onClick={() => setActiveStep(activeStep === s.num ? null : s.num)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all duration-200 ${
              activeStep === s.num || activeStep === null
                ? `${s.color} text-white border-transparent shadow-md scale-105`
                : `${s.lightBg} ${s.text} ${s.border} hover:scale-105`
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
              activeStep === s.num || activeStep === null ? 'bg-white/20' : s.color + ' text-white'
            }`}>
              {s.num}
            </span>
            {s.label}
            <ChevronRight className="w-3 h-3 opacity-60" />
          </button>
        ))}
      </div>

      {/* Step panels */}
      <div className="space-y-6">
        {(!visibleStep || visibleStep === 1) && (
          <Step1AnalyzeUsage subscriptions={subscriptions} />
        )}
        {(!visibleStep || visibleStep === 2) && (
          <Step2RenewalCheck subscriptions={subscriptions} />
        )}
        {(!visibleStep || visibleStep === 3) && (
          <Step3SmartAlert subscriptions={subscriptions} />
        )}
        {(!visibleStep || visibleStep === 4) && (
          <Step4AutoCancel
            subscriptions={subscriptions}
            onCancel={onCancel}
            moneySaved={moneySaved}
            cancelLog={cancelLog}
          />
        )}
      </div>

      <ComplianceBanner />
    </div>
  )
}
