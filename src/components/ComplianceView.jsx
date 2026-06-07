import { ShieldCheck, Lock, Globe, FileCheck, CheckCircle2, AlertCircle, Clock } from 'lucide-react'

const frameworks = [
  {
    icon: ShieldCheck,
    title: 'SOC 2 Type II',
    status: 'Certified',
    statusColor: 'text-emerald-600',
    statusBg: 'bg-emerald-50',
    statusBorder: 'border-emerald-200',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    lastAudit: 'March 15, 2025',
    nextAudit: 'March 15, 2026',
    controls: ['CC6.1 Logical access', 'CC7.2 System monitoring', 'CC8.1 Change management', 'A1.1 Availability commitment'],
    desc: 'SubGuard maintains SOC 2 Type II certification through annual independent audits covering Security, Availability, and Confidentiality trust service criteria.'
  },
  {
    icon: Globe,
    title: 'GDPR',
    status: 'Compliant',
    statusColor: 'text-emerald-600',
    statusBg: 'bg-emerald-50',
    statusBorder: 'border-emerald-200',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    lastAudit: 'January 10, 2025',
    nextAudit: 'January 10, 2026',
    controls: ['Right to erasure', 'Data portability', 'Breach notification (72h)', 'DPO appointed'],
    desc: 'Full compliance with EU General Data Protection Regulation. Data processing agreements available, cross-border transfers governed by Standard Contractual Clauses.'
  },
  {
    icon: Lock,
    title: 'PCI-DSS',
    status: 'Level 1',
    statusColor: 'text-emerald-600',
    statusBg: 'bg-emerald-50',
    statusBorder: 'border-emerald-200',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    lastAudit: 'February 28, 2025',
    nextAudit: 'February 28, 2026',
    controls: ['Network security controls', 'Cardholder data protection', 'Vulnerability management', 'Access control measures'],
    desc: 'Payment Card Industry Data Security Standard Level 1 compliance. All payment data is tokenized. No raw card data stored on SubGuard infrastructure.'
  },
  {
    icon: FileCheck,
    title: 'CCPA',
    status: 'Compliant',
    statusColor: 'text-emerald-600',
    statusBg: 'bg-emerald-50',
    statusBorder: 'border-emerald-200',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    lastAudit: 'April 5, 2025',
    nextAudit: 'April 5, 2026',
    controls: ['Right to know', 'Right to delete', 'Right to opt-out', 'Non-discrimination policy'],
    desc: 'California Consumer Privacy Act compliance. Residents can request data disclosure, deletion, and opt out of sale of personal information at any time.'
  },
]

const auditLog = [
  { event: 'SOC 2 Type II annual report issued', date: 'Mar 15, 2025', status: 'pass' },
  { event: 'PCI-DSS quarterly ASV scan completed', date: 'Jun 1, 2025', status: 'pass' },
  { event: 'GDPR DPA review — no findings', date: 'Jan 10, 2025', status: 'pass' },
  { event: 'Penetration test — 0 critical findings', date: 'May 20, 2025', status: 'pass' },
  { event: 'CCPA privacy notice updated', date: 'Apr 5, 2025', status: 'pass' },
  { event: 'Next SOC 2 audit window opens', date: 'Jan 15, 2026', status: 'upcoming' },
]

export default function ComplianceView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {frameworks.map(f => (
          <div key={f.title} className={`bg-white rounded-xl border ${f.border} shadow-sm overflow-hidden`}>
            <div className={`flex items-center justify-between px-5 py-4 ${f.bg} border-b ${f.border}`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white shadow-xs flex items-center justify-center">
                  <f.icon className={`w-4 h-4 ${f.color}`} />
                </div>
                <h3 className={`text-sm font-bold ${f.color}`}>{f.title}</h3>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${f.statusBg} ${f.statusColor} border ${f.statusBorder}`}>
                ✓ {f.status}
              </span>
            </div>
            <div className="px-5 py-4 space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
              <div className="flex gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" /><span>Last: {f.lastAudit}</span></div>
                <div className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-amber-400" /><span>Next: {f.nextAudit}</span></div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1.5">Key Controls</p>
                <div className="grid grid-cols-2 gap-1">
                  {f.controls.map(c => (
                    <div key={c} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                      <span className="text-xs text-slate-600 truncate">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Audit Log */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100">
          <FileCheck className="w-4 h-4 text-slate-500" />
          <h3 className="text-sm font-semibold text-slate-800">Compliance Audit Log</h3>
        </div>
        <div className="divide-y divide-slate-50">
          {auditLog.map((entry, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-3 hover:bg-slate-50 transition">
              <div className="flex items-center gap-3">
                {entry.status === 'pass'
                  ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  : <AlertCircle className="w-4 h-4 text-amber-500" />
                }
                <p className="text-sm text-slate-700">{entry.event}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">{entry.date}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  entry.status === 'pass'
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'bg-amber-50 text-amber-600 border border-amber-200'
                }`}>
                  {entry.status === 'pass' ? 'Passed' : 'Upcoming'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
