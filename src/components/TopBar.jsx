import { useState } from 'react'
import { Bell, Menu, DollarSign, TrendingUp, ChevronDown, X, CheckCircle, AlertTriangle, Info, ShieldCheck } from 'lucide-react'
import { ProfileSettingsModal, BillingModal, ApiKeysModal, AuditLogModal } from './ProfileModals'

const typeStyles = {
  warning: { bg: 'bg-amber-50', border: 'border-amber-200', icon: AlertTriangle, iconColor: 'text-amber-500', dot: 'bg-amber-400' },
  danger:  { bg: 'bg-red-50',   border: 'border-red-200',   icon: AlertTriangle,  iconColor: 'text-red-500',   dot: 'bg-red-500' },
  info:    { bg: 'bg-blue-50',  border: 'border-blue-200',  icon: Info,           iconColor: 'text-blue-500',  dot: 'bg-blue-400' },
  success: { bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle,    iconColor: 'text-green-500', dot: 'bg-green-400' },
}

export default function TopBar({ moneySaved, notifications, onToggleSidebar, onMarkRead }) {
  const [notifOpen,   setNotifOpen]   = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [activeModal, setActiveModal] = useState(null) // 'profile' | 'billing' | 'apikeys' | 'auditlog'

  const openModal = (key) => { setActiveModal(key); setProfileOpen(false) }
  const closeModal = () => setActiveModal(null)

  const unread = notifications.filter(n => !n.read).length

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 gap-4 relative z-20">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="hidden sm:block">
          <h2 className="text-sm font-semibold text-slate-800">Smart Subscription Guard</h2>
          <p className="text-xs text-slate-400">Financial Operations Dashboard</p>
        </div>
      </div>

      {/* Center – Money Saved */}
      <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl px-4 py-2">
        <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
          <DollarSign className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <p className="text-xs text-emerald-700 font-medium">Total Money Saved</p>
          <p className="text-base font-bold text-emerald-800 leading-none">
            ${moneySaved.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <TrendingUp className="w-4 h-4 text-emerald-500 ml-1" />
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(v => !v); setProfileOpen(false) }}
            className="relative w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
          >
            <Bell className="w-4 h-4" />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
            )}
          </button>

          {/* Notification Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-800">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unread > 0 && (
                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">{unread} new</span>
                  )}
                  <button onClick={() => setNotifOpen(false)}>
                    <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                  </button>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                {notifications.map(n => {
                  const s = typeStyles[n.type]
                  const Icon = s.icon
                  return (
                    <div
                      key={n.id}
                      onClick={() => onMarkRead(n.id)}
                      className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition hover:bg-slate-50 ${!n.read ? 'bg-blue-50/30' : ''}`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${s.bg} border ${s.border}`}>
                        <Icon className={`w-3.5 h-3.5 ${s.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-700 leading-snug">{n.message}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                      </div>
                      {!n.read && <span className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${s.dot}`} />}
                    </div>
                  )
                })}
              </div>
              <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50">
                <button
                  onClick={() => { notifications.forEach(n => onMarkRead(n.id)); }}
                  className="text-xs text-blue-600 hover:underline font-medium"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setProfileOpen(v => !v); setNotifOpen(false) }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              AN
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-800 leading-none">Arooba Naveed</p>
              <p className="text-xs text-slate-400 leading-none mt-0.5">CFO / Admin</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 w-52 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                <p className="text-sm font-semibold text-slate-800">Arooba Naveed</p>
                <p className="text-xs text-slate-400">arooba@subguard.io</p>
              </div>
              <div className="py-1.5">
                {[
                  { label: 'Profile Settings', key: 'profile'  },
                  { label: 'Billing',           key: 'billing'  },
                  { label: 'API Keys',          key: 'apikeys'  },
                  { label: 'Audit Log',         key: 'auditlog' },
                ].map(({ label, key }) => (
                  <button
                    key={key}
                    onClick={() => openModal(key)}
                    className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition"
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="border-t border-slate-100 py-1.5">
                <div className="px-4 py-2 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-xs text-emerald-600 font-medium">SOC 2 Verified Session</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Modals */}
      {activeModal === 'profile'  && <ProfileSettingsModal onClose={closeModal} />}
      {activeModal === 'billing'  && <BillingModal         onClose={closeModal} />}
      {activeModal === 'apikeys'  && <ApiKeysModal         onClose={closeModal} />}
      {activeModal === 'auditlog' && <AuditLogModal        onClose={closeModal} />}
    </header>
  )
}
