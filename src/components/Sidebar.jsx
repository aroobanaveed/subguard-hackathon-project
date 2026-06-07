import { Shield, LayoutDashboard, CreditCard, BarChart2, Settings, LogOut, ChevronRight } from 'lucide-react'

const navItems = [
  { id: 'dashboard',    icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'subscriptions',icon: CreditCard,      label: 'Subscriptions' },
  { id: 'analytics',    icon: BarChart2,        label: 'Analytics' },
  { id: 'compliance',   icon: Settings,         label: 'Compliance Settings' },
]

export default function Sidebar({ activeNav, setActiveNav, onLogout, sidebarOpen }) {
  return (
    <aside
      className={`
        fixed top-0 left-0 h-full z-30 bg-white border-r border-slate-200 shadow-sm
        flex flex-col transition-all duration-300
        ${sidebarOpen ? 'w-60' : 'w-16'}
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-slate-100 gap-3 overflow-hidden">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
          <Shield className="w-4 h-4 text-white" />
        </div>
        {sidebarOpen && (
          <div>
            <p className="text-sm font-bold text-slate-800 leading-tight">SubGuard</p>
            <p className="text-xs text-slate-400">Enterprise</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-hidden">
        {sidebarOpen && (
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-3 mb-3">Main Menu</p>
        )}
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveNav(id)}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
              ${activeNav === id
                ? 'bg-blue-50 text-blue-700 border border-blue-100'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }
            `}
          >
            <Icon className={`w-4 h-4 flex-shrink-0 ${activeNav === id ? 'text-blue-600' : 'text-slate-400'}`} />
            {sidebarOpen && <span className="truncate">{label}</span>}
            {sidebarOpen && activeNav === id && (
              <ChevronRight className="w-3 h-3 ml-auto text-blue-400" />
            )}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-2 border-t border-slate-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {sidebarOpen && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  )
}
