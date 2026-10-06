import React from 'react';
import {
  Cpu,
  TrendingUp,
  Gift,
  ArrowUpRight,
  Play,
  Clock,
  Layers,
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const DashboardView: React.FC = () => {
  const {
    currentUser,
    wallet,
    counters,
    ledger,
    transferRewardToWallet,
    activateCounter,
    setActiveTab,
    t,
    language,
  } = useAppContext();

  // Calculations
  const runningCounters = counters.filter((c) => c.status === 'running');
  const waitingCounters = counters.filter((c) => c.status === 'waiting_activation');
  const dailyRewardTotal = runningCounters.reduce((acc, c) => acc + c.dailyReward, 0);
  const totalCompletedCycles = counters.reduce((acc, c) => acc + c.completedCycles, 0);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/40 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-emerald-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {language === 'ar' ? 'عقدة التعدين السحابي قيد التشغيل' : 'Cloud Mining Node Operational'}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {language === 'ar' ? `مرحباً بك، ${currentUser.name}` : `Welcome back, ${currentUser.name}`}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              {language === 'ar'
                ? 'تقوم عداداتك السحابية حالياً بتوليد عوائد يومية مستمرة. يمكنك تحويل رصيد صندوق الإحالات مباشرة إلى محفظتك.'
                : 'Your cloud counters are currently generating passive daily yields. Referral box rewards can be claimed directly into your available balance.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {waitingCounters.length > 0 && (
              <button
                onClick={() => activateCounter(waitingCounters[0].id)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                {t.startCycle}
              </button>
            )}

            {wallet.rewardBoxBalance > 0 && (
              <button
                onClick={transferRewardToWallet}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold text-xs sm:text-sm rounded-xl transition-all active:scale-95"
              >
                <Gift className="w-4 h-4" />
                <span dir="ltr" className="font-mono">${wallet.rewardBoxBalance.toFixed(2)}</span>
                <span>{t.transferToWallet}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* METRIC OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Available Balance */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{t.availableBalance}</span>
            <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              {t.withdrawable}
            </span>
          </div>
          <div dir="ltr" className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight text-left">
            ${wallet.availableBalance.toFixed(2)}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
            <span>{t.totalWithdrawn}:</span>
            <span dir="ltr" className="font-mono text-slate-300 font-medium">
              ${(wallet.totalWithdrawn || 0).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Daily Yield */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{t.activeDailyYield}</span>
            <span className="text-[11px] font-medium text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">
              24h
            </span>
          </div>
          <div dir="ltr" className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono tracking-tight text-left">
            +${dailyRewardTotal.toFixed(2)}
            <span className="text-xs font-normal text-slate-400 ml-1">/ day</span>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
            <span>{language === 'ar' ? 'الوحدات النشطة:' : 'Active Nodes:'}</span>
            <span dir="ltr" className="font-mono text-slate-300 font-medium">
              {runningCounters.length} {t.running}
            </span>
          </div>
        </div>

        {/* Reward Box */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{t.rewardBox}</span>
            <Gift className="w-4 h-4 text-amber-400" />
          </div>
          <div dir="ltr" className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono tracking-tight text-left">
            ${wallet.rewardBoxBalance.toFixed(2)}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/80 text-xs">
            <span dir="ltr" className="text-slate-400 font-mono text-[11px]">
              {currentUser.referralCode}
            </span>
            {wallet.rewardBoxBalance > 0 ? (
              <button
                onClick={transferRewardToWallet}
                className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2"
              >
                {t.transferToWallet}
              </button>
            ) : (
              <span className="text-slate-400">{t.unclaimed}</span>
            )}
          </div>
        </div>

        {/* Completed Cycles */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{language === 'ar' ? 'الدورات المكتملة' : 'Completed Cycles'}</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div dir="ltr" className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight text-left">
            {totalCompletedCycles}
            <span className="text-xs font-normal text-slate-400 ml-1">cycles</span>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
            <span>{language === 'ar' ? 'إجمالي العدادات:' : 'Total Units:'}</span>
            <span dir="ltr" className="font-mono text-slate-300 font-medium">
              {counters.length}
            </span>
          </div>
        </div>
      </div>

      {/* TWO COLUMN GRID: ACTIVE COUNTERS & RECENT TRANSACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* COUNTERS PREVIEW */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                {t.counters}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.counterSubtitle}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('counters')}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
            >
              <span>{language === 'ar' ? 'عرض الكل' : 'View all'}</span>
              <span dir="ltr" className="font-mono">({counters.length})</span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${language === 'ar' ? 'rotate-[-90deg]' : ''}`} />
            </button>
          </div>

          <div className="space-y-3">
            {counters.map((counter) => {
              const progressPercent = Math.min(
                100,
                Math.round((counter.completedCycles / counter.durationDays) * 100)
              );

              return (
                <div
                  key={counter.id}
                  className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 hover:border-slate-700/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        counter.status === 'running'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : counter.status === 'waiting_activation'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Cpu className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">
                          {counter.name || `Node #${counter.id}`}
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            counter.status === 'running'
                              ? 'text-emerald-400'
                              : counter.status === 'waiting_activation'
                              ? 'text-amber-400'
                              : 'text-slate-400'
                          }`}
                        >
                          · {counter.status === 'running' ? t.running : counter.status === 'waiting_activation' ? t.waiting : t.expired}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-1">
                        <span>{t.unitPrice} <strong dir="ltr" className="text-slate-200 font-mono">${counter.price.toFixed(2)}</strong></span>
                        <span aria-hidden="true">·</span>
                        <span>{t.dailyTarget} <strong dir="ltr" className="text-emerald-400 font-mono">+${counter.dailyReward.toFixed(2)}/d</strong></span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {t.cycles} <strong dir="ltr" className="text-slate-200 font-mono">{counter.completedCycles}/{counter.durationDays}</strong>
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full sm:w-64 bg-slate-800 rounded-full h-1.5 mt-2.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            counter.status === 'running'
                              ? 'bg-emerald-400'
                              : counter.status === 'waiting_activation'
                              ? 'bg-amber-400'
                              : 'bg-slate-600'
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                    <div className="text-right">
                      <div className="text-xs text-slate-400">{language === 'ar' ? 'العائد التراكمي' : 'Total Return'}</div>
                      <div dir="ltr" className="text-sm font-semibold text-emerald-400 font-mono">
                        ${(counter.dailyReward * counter.completedCycles).toFixed(2)}
                      </div>
                    </div>

                    {counter.status === 'waiting_activation' && (
                      <button
                        onClick={() => activateCounter(counter.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        {t.startCycle}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RECENT LEDGER */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                {t.recentTransactions}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.realtimeFeed}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('wallet')}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
            >
              <span>{t.wallet}</span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${language === 'ar' ? 'rotate-[-90deg]' : ''}`} />
            </button>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl divide-y divide-slate-800/80 overflow-hidden">
            {ledger.slice(0, 5).map((item) => {
              const isPositive = item.amount > 0;
              const isNeutral = item.amount === 0;

              return (
                <div key={item.id} className="p-3.5 hover:bg-slate-800/40 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-200 truncate">
                        {item.description || item.type.replace(/_/g, ' ')}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        <span dir="ltr" className="font-mono">
                          {new Date(item.date).toLocaleDateString([], {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        <span>·</span>
                        <span className="capitalize">{item.status}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div
                        dir="ltr"
                        className={`text-xs font-bold font-mono ${
                          isPositive
                            ? 'text-emerald-400'
                            : isNeutral
                            ? 'text-slate-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {isPositive ? `+$${item.amount.toFixed(2)}` : isNeutral ? '$0.00' : `-$${Math.abs(item.amount).toFixed(2)}`}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono" dir="ltr">
                        {item.type.split('_')[0]}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
