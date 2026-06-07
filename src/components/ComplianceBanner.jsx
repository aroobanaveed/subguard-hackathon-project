import { ShieldCheck, Lock, Globe, FileCheck } from 'lucide-react'

const badges = [
  {
    icon: ShieldCheck,
    title: 'SOC 2 Type II',
    desc: 'Audited security controls',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    icon: Globe,
    title: 'GDPR',
    desc: 'EU data protection compliant',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
  },
  {
    icon: Lock,
    title: 'PCI-DSS',
    desc: 'Payment card security standard',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
  },
  {
    icon: FileCheck,
    title: 'CCPA',
    desc: 'California consumer privacy act',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
]

export default function ComplianceBanner() {
  return (
    <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-slate-500" />
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Regulatory Compliance</h3>
          <p className="text-xs text-slate-500">SubGuard is built on enterprise-grade compliance frameworks</p>
        </div>
      </div>

      <div className="px-6 py-5 flex flex-wrap gap-4">
        {badges.map(b => (
          <div
            key={b.title}
            className={`flex items-center gap-3 ${b.bg} border ${b.border} rounded-xl px-4 py-3 flex-1 min-w-44`}
          >
            <div className={`w-9 h-9 rounded-lg bg-white shadow-xs border ${b.border} flex items-center justify-center flex-shrink-0`}>
              <b.icon className={`w-4 h-4 ${b.color}`} />
            </div>
            <div>
              <p className={`text-sm font-bold ${b.color}`}>{b.title}</p>
              <p className="text-xs text-slate-500 leading-snug">{b.desc}</p>
            </div>
            <div className="ml-auto">
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                ✓ Active
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-400">
          SubGuard Enterprise · All data is encrypted at rest and in transit · AES-256 · TLS 1.3 · Zero-trust architecture
        </p>
      </div>
    </div>
  )
}
