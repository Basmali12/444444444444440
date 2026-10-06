import React, { useState } from 'react';
import {
  LayoutDashboard,
  Cpu,
  Wallet as WalletIcon,
  Users,
  Settings,
  Bell,
  Menu,
  X,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  ChevronDown,
  Gift,
  CheckCircle2,
  Clock,
  Globe2,
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const {
    currentUser,
    wallet,
    counters,
    notifications,
    unreadNotificationsCount,
    activeTab,
    setActiveTab,
    language,
    setLanguage,
    t,
    markNotificationsAsRead,
  } = useAppContext();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Active counter count for badge
  const activeCountersCount = counters.filter((c) => c.status === 'running').length;

  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    {
      id: 'counters',
      label: t.counters,
      icon: Cpu,
      badge: activeCountersCount > 0 ? `${activeCountersCount} ${t.active}` : undefined,
    },
    { id: 'wallet', label: t.wallet, icon: WalletIcon },
    {
      id: 'referrals',
      label: t.referrals,
      icon: Users,
      badge: wallet.rewardBoxBalance > 0 ? `$${wallet.rewardBoxBalance.toFixed(2)}` : undefined,
    },
    { id: 'settings', label: t.settings, icon: Settings },
  ];

  const handleCopyReferral = () => {
    if (currentUser?.referralCode) {
      navigator.clipboard.writeText(currentUser.referralCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const getPageTitle = (tabId: string) => {
    switch (tabId) {
      case 'dashboard':
        return t.dashboard;
      case 'counters':
        return t.counters;
      case 'wallet':
        return t.wallet;
      case 'referrals':
        return t.referrals;
      case 'settings':
        return t.settings;
      default:
        return t.dashboard;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-emerald-500 selection:text-slate-950 font-sans">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-1 w-full min-h-screen">
        {/* MOBILE SIDEBAR BACKDROP */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* SIDEBAR (Desktop & Mobile) */}
        <aside
          className={`fixed inset-y-0 z-50 w-64 bg-slate-900/90 backdrop-blur-xl border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            language === 'ar'
              ? 'right-0 border-l lg:right-0'
              : 'left-0 border-r lg:left-0'
          } ${
            mobileMenuOpen
              ? 'translate-x-0'
              : language === 'ar'
              ? 'translate-x-full'
              : '-translate-x-full'
          }`}
        >
          {/* Logo / Brand Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Zap className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-base font-semibold tracking-tight text-white block leading-tight">
                  CloudCounter
                </span>
                <span className="text-[11px] font-medium text-emerald-400/90 uppercase tracking-wider block">
                  Reward Nodes
                </span>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
            <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              {t.corePlatform}
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-emerald-400' : 'text-slate-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      dir="ltr"
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-md font-mono ${
                        item.id === 'referrals'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : isActive
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Node Status & Network Health Info */}
          <div className="px-4 py-3 mx-3 mb-3 bg-slate-950/60 border border-slate-800/80 rounded-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {t.networkSynced}
              </span>
              <span className="text-slate-400 font-mono text-[11px] ltr" dir="ltr">
                99.98%
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
              <div className="bg-emerald-400 h-1 rounded-full w-[99%]" />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
              <span dir="ltr" className="font-mono">{t.epoch}</span>
              <span dir="ltr" className="font-mono">{t.ping}</span>
            </div>
          </div>

          {/* User Profile Mini Footer */}
          <div className="p-3 border-t border-slate-800/80 bg-slate-900/50">
            <div className="flex items-center gap-3 p-2 rounded-lg">
              <div className="relative">
                <img
                  src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                  alt={currentUser?.name}
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-700"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="text-sm font-semibold text-white truncate">
                  {currentUser?.name}
                </div>
                <div className="text-xs text-slate-400 truncate font-mono">
                  {currentUser?.email}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN WRAPPER (Topbar + Injected Children) */}
        <div
          className={`flex-1 flex flex-col min-w-0 ${
            language === 'ar' ? 'lg:pr-64' : 'lg:pl-64'
          }`}
        >
          {/* HEADER / TOPBAR */}
          <header className="sticky top-0 z-30 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            {/* Left: Mobile Toggle & Page Context */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-base sm:text-lg font-semibold text-white tracking-tight flex items-center gap-2">
                  <span>{getPageTitle(activeTab)}</span>
                  <span className="hidden sm:inline-block text-xs font-normal text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {t.liveSession}
                  </span>
                </h1>
              </div>
            </div>

            {/* Right: Quick Language Switcher, Balance Glance, Notifications & User Overview */}
            <div className="flex items-center gap-2.5 sm:gap-4">
              {/* Language Switcher Button (AR / EN) */}
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-semibold text-emerald-400 transition-all cursor-pointer shadow-sm active:scale-95"
                title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
              >
                <Globe2 className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono">{language === 'ar' ? 'EN' : 'العربية'}</span>
              </button>

              {/* Quick Glance Available Balance */}
              <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5 shadow-sm hover:border-slate-700 transition-colors">
                <div
                  className={`flex flex-col text-right ${
                    language === 'ar' ? 'pl-2.5 border-l' : 'pr-2.5 border-r'
                  } border-slate-800`}
                >
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 leading-none mb-0.5">
                    {t.availableBalance}
                  </span>
                  <span
                    dir="ltr"
                    className="text-sm sm:text-base font-bold text-emerald-400 font-mono tabular-nums tracking-tight leading-none"
                  >
                    ${wallet?.availableBalance?.toFixed(2) || '0.00'}
                    <span className="text-[10px] font-normal text-slate-400 ml-1">
                      {wallet?.currency || 'USDT'}
                    </span>
                  </span>
                </div>

                {/* Referral Reward Box Glance */}
                <div
                  className={`${
                    language === 'ar' ? 'pr-2.5' : 'pl-2.5'
                  } flex items-center gap-1.5 cursor-pointer group`}
                  onClick={() => setActiveTab('referrals')}
                  title={t.rewardBox}
                >
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
                    <Gift className="w-3.5 h-3.5" />
                  </div>
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-[10px] text-slate-400 leading-none">{t.rewardBox}</span>
                    <span
                      dir="ltr"
                      className="text-xs font-semibold text-amber-400 leading-none mt-0.5 font-mono tabular-nums"
                    >
                      ${wallet?.rewardBoxBalance?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Referral Code Quick-Copy Chip (Desktop) */}
              <button
                onClick={handleCopyReferral}
                className="hidden xl:flex items-center gap-2 px-2.5 py-1.5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-lg text-xs text-slate-300 transition-colors"
                title={t.copyCode}
              >
                <span className="text-slate-400 text-[11px]">{t.refCode}</span>
                <span dir="ltr" className="font-mono text-emerald-400 font-medium">
                  {currentUser?.referralCode}
                </span>
                {copiedCode ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              {/* Notification Bell with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 transition-colors"
                  aria-label={t.notifications}
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
                  )}
                </button>

                {/* Notifications Flyout */}
                {notificationsOpen && (
                  <div
                    className={`absolute ${
                      language === 'ar' ? 'left-0' : 'right-0'
                    } mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150`}
                  >
                    <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white">{t.notifications}</span>
                        {unreadNotificationsCount > 0 && (
                          <span className="bg-emerald-500/20 text-emerald-400 text-[11px] px-2 py-0.5 rounded-full font-medium">
                            {unreadNotificationsCount} {t.newCount}
                          </span>
                        )}
                      </div>
                      {unreadNotificationsCount > 0 && (
                        <button
                          onClick={markNotificationsAsRead}
                          className="text-xs text-slate-400 hover:text-emerald-400 transition-colors"
                        >
                          {t.markAllAsRead}
                        </button>
                      )}
                    </div>

                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-slate-400 text-xs">
                          {t.noNotifications}
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`p-3.5 hover:bg-slate-800/40 transition-colors ${
                              !notif.read ? 'bg-emerald-500/5' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-xs font-semibold text-slate-200">
                                {notif.title}
                              </span>
                              <span
                                dir="ltr"
                                className="text-[10px] text-slate-400 flex items-center gap-1 shrink-0 font-mono"
                              >
                                <Clock className="w-3 h-3" />
                                {new Date(notif.timestamp).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                              {notif.message}
                            </p>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="p-2 border-t border-slate-800 bg-slate-950/40 text-center">
                      <button
                        onClick={() => setNotificationsOpen(false)}
                        className="text-xs text-slate-400 hover:text-white py-1 block w-full transition-colors"
                      >
                        {t.close}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar & Name */}
              <div className="flex items-center gap-2 pl-1 sm:pl-2">
                <img
                  src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                  alt={currentUser?.name}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700"
                />
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-semibold text-white leading-tight">
                    {currentUser?.name}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-medium leading-none">
                    {currentUser?.tier || 'Validator'}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* MAIN CONTENT CONTAINER (Children injected here) */}
          <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
