import { X, User, Mail, Phone, Building2, MapPin, Camera,
         CreditCard, DollarSign, Calendar, CheckCircle2, Download,
         Key, Copy, RefreshCw, Eye, EyeOff, Plus, Shield,
         Clock, AlertTriangle, LogIn, Settings, Trash2, FileText } from 'lucide-react'
import { useState } from 'react'

/* ─── Shared overlay wrapper ─────────────────────────────────────── */
function Modal({ title, subtitle, icon: Icon, iconBg, onClose, children, wide }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col
          w-full ${wide ? 'max-w-2xl' : 'max-w-lg'} max-h-[90vh] animate-[fadeUp_0.2s_ease]`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">{title}</h2>
              {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {children}
        </div>
      </div>
    </div>
  )
}

/* ─── Field helper ────────────────────────────────────────────────── */
function Field({ label, value, editable, type = 'text' }) {
  const [val, setVal] = useState(value)
  const [editing, setEditing] = useState(false)
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{label}</label>
      {editing ? (
        <div className="flex gap-2">
          <input
            type={type}
            value={val}
            onChange={e => setVal(e.target.value)}
            className="flex-1 text-sm border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50/30"
            autoFocus
          />
          <button
            onClick={() => setEditing(false)}
            className="px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5">
          <span className="text-sm text-slate-700">{val}</span>
          {editable && (
            <button
              onClick={() => setEditing(true)}
              className="text-xs text-blue-500 hover:text-blue-700 font-medium ml-2"
            >Edit</button>
          )}
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   1. PROFILE SETTINGS MODAL
══════════════════════════════════════════════════════════════════ */
export function ProfileSettingsModal({ onClose }) {
  const [saved, setSaved] = useState(false)

  return (
    <Modal
      title="Profile Settings"
      subtitle="Manage your personal account details"
      icon={User}
      iconBg="bg-gradient-to-br from-blue-500 to-indigo-600"
      onClose={onClose}
    >
      {/* Avatar */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
            AN
          </div>
          <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center">
            <Camera className="w-3 h-3 text-white" />
          </button>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">Arooba Naveed</p>
          <p className="text-xs text-slate-500">CFO / Administrator</p>
          <span className="inline-flex items-center gap-1 mt-1 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" /> Verified Account
          </span>
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="First Name"  value="Arooba"         editable />
          <Field label="Last Name"   value="Naveed"         editable />
        </div>
        <Field label="Work Email"    value="arooba@subguard.io" editable type="email" />
        <Field label="Phone Number"  value="+1 (415) 555-0182"  editable type="tel" />
        <Field label="Job Title"     value="Chief Financial Officer" editable />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Department"  value="Finance & Operations" editable />
          <Field label="Location"    value="San Francisco, CA"    editable />
        </div>
        <Field label="Organisation"  value="SubGuard Enterprise Inc." editable />
      </div>

      {/* 2FA */}
      <div className="mt-5 p-4 bg-indigo-50 border border-indigo-200 rounded-xl flex items-start gap-3">
        <Shield className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-indigo-800">Two-Factor Authentication</p>
          <p className="text-xs text-indigo-600 mt-0.5">Authenticator app enabled (TOTP)</p>
        </div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">ON</span>
      </div>

      {/* Save */}
      <button
        onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }}
        className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold transition shadow-md"
      >
        {saved ? '✓ Changes Saved' : 'Save Changes'}
      </button>
    </Modal>
  )
}

/* ══════════════════════════════════════════════════════════════════
   2. BILLING MODAL
══════════════════════════════════════════════════════════════════ */
const invoices = [
  { id: 'INV-2025-007', date: 'Jul 1, 2025',  amount: 499.00, status: 'Paid' },
  { id: 'INV-2025-006', date: 'Jun 1, 2025',  amount: 499.00, status: 'Paid' },
  { id: 'INV-2025-005', date: 'May 1, 2025',  amount: 499.00, status: 'Paid' },
  { id: 'INV-2025-004', date: 'Apr 1, 2025',  amount: 399.00, status: 'Paid' },
  { id: 'INV-2025-003', date: 'Mar 1, 2025',  amount: 399.00, status: 'Paid' },
]

export function BillingModal({ onClose }) {
  return (
    <Modal
      title="Billing & Subscription"
      subtitle="Manage your SubGuard plan and invoices"
      icon={CreditCard}
      iconBg="bg-gradient-to-br from-violet-500 to-purple-600"
      onClose={onClose}
      wide
    >
      {/* Current Plan */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-xl p-5 text-white mb-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-200">Current Plan</p>
            <p className="text-xl font-bold mt-1">Enterprise Pro</p>
            <p className="text-sm text-blue-200 mt-0.5">Unlimited subscriptions · SSO · SOC 2 reports</p>
          </div>
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">Active</span>
        </div>
        <div className="mt-4 flex items-end gap-1">
          <span className="text-3xl font-extrabold">$499</span>
          <span className="text-blue-200 mb-1">/month</span>
          <span className="ml-3 text-xs text-blue-200">· billed monthly · next charge Aug 1, 2025</span>
        </div>
      </div>

      {/* Payment method */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Payment Method</p>
        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 rounded bg-gradient-to-r from-blue-700 to-blue-900 flex items-center justify-center">
              <span className="text-white text-xs font-bold">VISA</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Visa ending 4242</p>
              <p className="text-xs text-slate-400">Expires 09/2027 · Arooba Naveed</p>
            </div>
          </div>
          <button className="text-xs text-blue-600 hover:underline font-medium">Update</button>
        </div>
      </div>

      {/* Usage stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Active Subs',    value: '8',     icon: CheckCircle2, color: 'text-blue-600',    bg: 'bg-blue-50' },
          { label: 'Savings MTD',   value: '$415',   icon: DollarSign,   color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Next Invoice',  value: 'Aug 1',  icon: Calendar,     color: 'text-violet-600',  bg: 'bg-violet-50' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-xl border border-slate-200 p-3 text-center`}>
            <s.icon className={`w-4 h-4 ${s.color} mx-auto mb-1`} />
            <p className={`text-base font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Invoice history */}
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Invoice History</p>
        <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
          {invoices.map(inv => (
            <div key={inv.id} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-800">{inv.id}</p>
                  <p className="text-xs text-slate-400">{inv.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-800">${inv.amount.toFixed(2)}</span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  {inv.status}
                </span>
                <button className="text-slate-400 hover:text-blue-600 transition">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="mt-5 w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition">
        Upgrade / Change Plan
      </button>
    </Modal>
  )
}

/* ══════════════════════════════════════════════════════════════════
   3. API KEYS MODAL
══════════════════════════════════════════════════════════════════ */
const mockKeys = [
  { id: 1, name: 'Production API Key',    key: 'sg_live_k9xR2mTq8vLpN3jW7oBsY1eH',  created: 'Jan 15, 2025', lastUsed: '2 min ago',   scope: 'Full Access', active: true },
  { id: 2, name: 'Analytics Read Key',    key: 'sg_read_a4nP6cQz0wKuD8fX2mBrL5tJ',  created: 'Mar 3, 2025',  lastUsed: '1 hr ago',    scope: 'Read Only',   active: true },
  { id: 3, name: 'Webhook Integration',   key: 'sg_whk_h7gV1sEy3bNj9kTr4oMcX6qP',   created: 'May 20, 2025', lastUsed: '3 days ago',  scope: 'Webhooks',    active: true },
  { id: 4, name: 'Legacy Staging Key',    key: 'sg_test_m2dC5fWu8pRn1sGy6hXjQ0lA',  created: 'Nov 1, 2024',  lastUsed: '62 days ago', scope: 'Test Only',   active: false },
]

function ApiKeyRow({ k }) {
  const [visible, setVisible] = useState(false)
  const [copied, setCopied]   = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText(k.key).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const masked = k.key.slice(0, 10) + '••••••••••••••••' + k.key.slice(-4)

  return (
    <div className={`rounded-xl border p-4 transition ${k.active ? 'border-slate-200 bg-white' : 'border-slate-200 bg-slate-50 opacity-60'}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <p className="text-sm font-semibold text-slate-800">{k.name}</p>
          <p className="text-xs text-slate-400">Created {k.created} · Last used {k.lastUsed}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
            k.scope === 'Full Access'
              ? 'bg-blue-50 text-blue-600 border-blue-200'
              : k.scope === 'Read Only'
              ? 'bg-slate-100 text-slate-600 border-slate-200'
              : k.scope === 'Webhooks'
              ? 'bg-purple-50 text-purple-600 border-purple-200'
              : 'bg-amber-50 text-amber-600 border-amber-200'
          }`}>{k.scope}</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
            k.active ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-red-50 text-red-500 border-red-200'
          }`}>{k.active ? 'Active' : 'Revoked'}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-slate-950 rounded-lg px-3 py-2">
        <code className="flex-1 text-xs text-emerald-400 font-mono truncate">
          {visible ? k.key : masked}
        </code>
        <button onClick={() => setVisible(v => !v)} className="text-slate-500 hover:text-slate-300 transition flex-shrink-0">
          {visible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        </button>
        <button onClick={handleCopy} className="text-slate-500 hover:text-emerald-400 transition flex-shrink-0">
          {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  )
}

export function ApiKeysModal({ onClose }) {
  return (
    <Modal
      title="API Keys"
      subtitle="Manage programmatic access credentials"
      icon={Key}
      iconBg="bg-gradient-to-br from-slate-700 to-slate-900"
      onClose={onClose}
      wide
    >
      {/* Warning */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5">
        <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-700 leading-relaxed">
          <strong>Keep your API keys secret.</strong> Never expose them in client-side code or public repositories. Rotate keys immediately if compromised.
        </p>
      </div>

      {/* Keys list */}
      <div className="space-y-3 mb-5">
        {mockKeys.map(k => <ApiKeyRow key={k.id} k={k} />)}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold transition">
          <Plus className="w-4 h-4" /> Generate New Key
        </button>
        <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition">
          <RefreshCw className="w-4 h-4" /> Rotate All Keys
        </button>
      </div>

      {/* Docs link */}
      <p className="mt-4 text-center text-xs text-slate-400">
        View <span className="text-blue-500 cursor-pointer hover:underline">API documentation</span> · Rate limit: 1,000 req/min per key
      </p>
    </Modal>
  )
}

/* ══════════════════════════════════════════════════════════════════
   4. AUDIT LOG MODAL
══════════════════════════════════════════════════════════════════ */
const auditEntries = [
  { id: 1,  action: 'Login successful',              user: 'Arooba Naveed', ip: '192.168.1.42',   time: 'Today 09:14 AM', type: 'auth',    severity: 'info' },
  { id: 2,  action: 'Cancelled: Adobe Creative Cloud', user: 'Arooba Naveed', ip: '192.168.1.42', time: 'Today 09:08 AM', type: 'cancel',  severity: 'warning' },
  { id: 3,  action: 'API key generated (Analytics)', user: 'Arooba Naveed', ip: '10.0.0.5',      time: 'Jul 14 04:30 PM',type: 'security',severity: 'info' },
  { id: 4,  action: 'Billing plan upgraded to Enterprise Pro', user: 'Arooba Naveed', ip: '10.0.0.5', time: 'Jul 10 11:22 AM', type: 'billing', severity: 'info' },
  { id: 5,  action: 'Failed login attempt (3x)',    user: 'Unknown',       ip: '45.33.32.156',   time: 'Jul 9 02:17 AM', type: 'auth',    severity: 'danger' },
  { id: 6,  action: 'Subscription alert rules updated', user: 'Arooba Naveed', ip: '192.168.1.42', time: 'Jul 7 10:05 AM', type: 'settings',severity: 'info' },
  { id: 7,  action: 'Export: All subscriptions CSV', user: 'Arooba Naveed', ip: '192.168.1.42',  time: 'Jul 5 03:48 PM', type: 'data',    severity: 'info' },
  { id: 8,  action: 'Password changed',              user: 'Arooba Naveed', ip: '192.168.1.42',  time: 'Jul 1 08:30 AM', type: 'security',severity: 'warning' },
  { id: 9,  action: 'New user invited: ops@subguard.io', user: 'Arooba Naveed', ip: '192.168.1.42', time: 'Jun 28 02:10 PM', type: 'admin', severity: 'info' },
  { id: 10, action: 'SOC 2 report accessed',         user: 'Arooba Naveed', ip: '192.168.1.42',  time: 'Jun 25 11:55 AM',type: 'security',severity: 'info' },
]

const severityMap = {
  info:    { dot: 'bg-blue-400',  badge: 'bg-blue-50 text-blue-600 border-blue-200' },
  warning: { dot: 'bg-amber-400', badge: 'bg-amber-50 text-amber-600 border-amber-200' },
  danger:  { dot: 'bg-red-500',   badge: 'bg-red-50 text-red-600 border-red-200' },
}

const typeIcon = {
  auth:     LogIn,
  cancel:   Trash2,
  security: Shield,
  billing:  CreditCard,
  settings: Settings,
  data:     Download,
  admin:    User,
}

export function AuditLogModal({ onClose }) {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? auditEntries
    : auditEntries.filter(e => e.severity === filter || e.type === filter)

  return (
    <Modal
      title="Audit Log"
      subtitle="Complete record of account activity"
      icon={FileText}
      iconBg="bg-gradient-to-br from-emerald-500 to-teal-600"
      onClose={onClose}
      wide
    >
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['all', 'auth', 'security', 'cancel', 'billing'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition capitalize ${
              filter === f
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {f === 'all' ? 'All Events' : f}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="w-3 h-3" /> Last 30 days
        </div>
      </div>

      {/* Log entries */}
      <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
        {filtered.map(entry => {
          const sev = severityMap[entry.severity]
          const Icon = typeIcon[entry.type] || FileText
          return (
            <div key={entry.id} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                entry.severity === 'danger' ? 'bg-red-50' : entry.severity === 'warning' ? 'bg-amber-50' : 'bg-slate-100'
              }`}>
                <Icon className={`w-3.5 h-3.5 ${
                  entry.severity === 'danger' ? 'text-red-500' : entry.severity === 'warning' ? 'text-amber-500' : 'text-slate-500'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-800 font-medium leading-snug">{entry.action}</p>
                <div className="flex flex-wrap items-center gap-2 mt-0.5">
                  <span className="text-xs text-slate-400">{entry.user}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-400 font-mono">{entry.ip}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-400">{entry.time}</span>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 mt-0.5 ${sev.badge}`}>
                {entry.severity}
              </span>
            </div>
          )
        })}
      </div>

      <button className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition">
        <Download className="w-4 h-4" /> Export Full Audit Log (CSV)
      </button>
    </Modal>
  )
}
