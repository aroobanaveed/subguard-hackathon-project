import { useState, useEffect, useCallback } from 'react'
import LoginGateway from './components/LoginGateway'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import DashboardView from './components/DashboardView'
import AnalyticsView from './components/AnalyticsView'
import ComplianceView from './components/ComplianceView'
import { initialSubscriptions, initialNotifications } from './data/subscriptions'

export default function App() {
  const [isLoggedIn,     setIsLoggedIn]     = useState(false)
  const [activeNav,      setActiveNav]      = useState('dashboard')
  const [sidebarOpen,    setSidebarOpen]    = useState(true)
  const [subscriptions,  setSubscriptions]  = useState(initialSubscriptions)
  const [moneySaved,     setMoneySaved]     = useState(0)
  const [cancelLog,      setCancelLog]      = useState([])
  const [notifications,  setNotifications]  = useState(initialNotifications)
  const [fadingIn,       setFadingIn]       = useState(false)

  // Login transition
  const handleLogin = () => {
    setFadingIn(true)
    setTimeout(() => {
      setIsLoggedIn(true)
      setFadingIn(false)
    }, 300)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setActiveNav('dashboard')
  }

  // Cancel subscription handler
  const handleCancel = useCallback((id) => {
    const sub = subscriptions.find(s => s.id === id)
    if (!sub) return

    setSubscriptions(prev =>
      prev.map(s => s.id === id ? { ...s, cancelled: true, alertTriggered: false } : s)
    )

    setMoneySaved(prev => prev + sub.monthlyAmount)

    const now = new Date()
    const timeStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`
    setCancelLog(prev => [
      { time: timeStr, name: sub.name, amount: sub.monthlyAmount.toFixed(2), card: `${sub.cardType} ****${sub.cardLast4}` },
      ...prev,
    ])

    // Add notification
    setNotifications(prev => [
      {
        id: Date.now(),
        type: 'success',
        message: `${sub.name} successfully cancelled — saving $${sub.monthlyAmount.toFixed(2)}/mo`,
        time: 'Just now',
        read: false,
      },
      ...prev,
    ])
  }, [subscriptions])

  const handleMarkRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }, [])

  // Simulate live "last activity" ticks
  useEffect(() => {
    if (!isLoggedIn) return
    const iv = setInterval(() => {
      // Small random "pulse" on active subscriptions — cosmetic only
      setSubscriptions(prev => prev.map(s =>
        s.status === 'healthy' && !s.cancelled
          ? { ...s, activeUsers: Math.max(1, s.activeUsers + (Math.random() > 0.5 ? 1 : -1)) }
          : s
      ))
    }, 8000)
    return () => clearInterval(iv)
  }, [isLoggedIn])

  // Sidebar auto-collapse on small screens
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth < 768) setSidebarOpen(false)
      else setSidebarOpen(true)
    }
    handler()
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  if (!isLoggedIn) {
    return (
      <div className={`transition-opacity duration-300 ${fadingIn ? 'opacity-0' : 'opacity-100'}`}>
        <LoginGateway onLogin={handleLogin} />
      </div>
    )
  }

  const sideWidth = sidebarOpen ? 'ml-60' : 'ml-16'

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onLogout={handleLogout}
        sidebarOpen={sidebarOpen}
      />

      <div className={`transition-all duration-300 ${sideWidth} flex flex-col min-h-screen`}>
        <TopBar
          moneySaved={moneySaved}
          notifications={notifications}
          onToggleSidebar={() => setSidebarOpen(v => !v)}
          onMarkRead={handleMarkRead}
        />

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {/* Page heading */}
          <div className="mb-5">
            <h1 className="text-xl font-bold text-slate-900 capitalize">
              {activeNav === 'dashboard'      ? 'Dashboard Overview' :
               activeNav === 'subscriptions' ? 'All Subscriptions' :
               activeNav === 'analytics'     ? 'Analytics & Insights' :
               'Compliance Settings'}
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {activeNav === 'dashboard'      ? 'Monitor, analyze, and optimize your software subscriptions' :
               activeNav === 'subscriptions' ? 'Full subscription inventory with usage and billing data' :
               activeNav === 'analytics'     ? 'Spending trends, utilization metrics, and savings projections' :
               'Regulatory frameworks, audit logs, and data governance'}
            </p>
          </div>

          {activeNav === 'dashboard' && (
            <DashboardView
              subscriptions={subscriptions}
              moneySaved={moneySaved}
              onCancel={handleCancel}
              cancelLog={cancelLog}
            />
          )}

          {activeNav === 'subscriptions' && (
            <DashboardView
              subscriptions={subscriptions}
              moneySaved={moneySaved}
              onCancel={handleCancel}
              cancelLog={cancelLog}
            />
          )}

          {activeNav === 'analytics' && (
            <AnalyticsView subscriptions={subscriptions} moneySaved={moneySaved} />
          )}

          {activeNav === 'compliance' && (
            <ComplianceView />
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white px-6 py-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-slate-400">© 2025 SubGuard Enterprise · All rights reserved</p>
          <div className="flex gap-3 text-xs text-slate-400">
            <span>SOC 2 Type II</span><span>·</span>
            <span>GDPR</span><span>·</span>
            <span>PCI-DSS</span><span>·</span>
            <span>CCPA</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
