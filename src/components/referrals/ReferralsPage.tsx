import React, { useState } from 'react';
import {
  Users,
  Gift,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Terminal,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import { ReferralTree } from './ReferralTree';
import { useAppContext } from '../../context/AppContext';

export const ReferralsPage: React.FC = () => {
  const {
    currentUser,
    wallet,
    referrals,
    transferRewardToWallet,
    simulateReferralCommission,
    t,
    language,
  } = useAppContext();

  const [copiedCode, setCopiedCode] = useState(false);
  const [simulationNotice, setSimulationNotice] = useState<string | null>(null);

  const totalInvited =
    referrals.level1.length + referrals.level2.length + referrals.level3.length;

  const totalCommissionGenerated =
    referrals.level1.reduce((acc, m) => acc + m.commissionEarned, 0) +
    referrals.level2.reduce((acc, m) => acc + m.commissionEarned, 0) +
    referrals.level3.reduce((acc, m) => acc + m.commissionEarned, 0);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentUser.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSimulate = () => {
    simulateReferralCommission();
    setSimulationNotice(t.simulateNotice);
    setTimeout(() => setSimulationNotice(null), 3500);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Title & Context Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <Gift className="w-4 h-4 text-amber-400" />
            {t.referralHeroTag}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {t.referralHeroTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            {t.referralHeroSubtitle}
          </p>
        </div>

        {/* Quick Referral Code Copy Badge */}
        <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
          <div className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl">
            <span className="text-xs text-slate-400">{t.yourCode}</span>
            <span dir="ltr" className="font-mono text-sm font-bold text-amber-400">
              {currentUser.referralCode}
            </span>
            <button
              onClick={handleCopyCode}
              className="p-1 hover:text-white text-slate-400 rounded transition-colors"
              title={t.copyCode}
              aria-label="Copy code"
            >
              {copiedCode ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* SUMMARY CARDS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Total Referees Invited */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{t.totalDownline}</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white font-mono tracking-tight" dir="ltr">
            {totalInvited}
            <span className="text-xs font-normal text-slate-400 ml-1">users</span>
          </div>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
            <span>L1: <strong dir="ltr" className="text-slate-200 font-mono">{referrals.level1.length}</strong></span>
            <span>·</span>
            <span>L2: <strong dir="ltr" className="text-slate-200 font-mono">{referrals.level2.length}</strong></span>
            <span>·</span>
            <span>L3: <strong dir="ltr" className="text-slate-200 font-mono">{referrals.level3.length}</strong></span>
          </div>
        </div>

        {/* 2. Reward Box Balance */}
        <div className="bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-900 border border-amber-500/30 rounded-2xl p-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="text-amber-400 font-semibold">{t.rewardBoxBalance}</span>
            <Gift className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-amber-400 font-mono tracking-tight" dir="ltr">
            ${wallet.rewardBoxBalance.toFixed(2)}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-amber-500/20 text-xs">
            <span className="text-slate-400 text-[11px]">{t.unclaimed}</span>
            <button
              onClick={transferRewardToWallet}
              disabled={wallet.rewardBoxBalance <= 0}
              className={`font-semibold text-xs flex items-center gap-1 transition-colors ${
                wallet.rewardBoxBalance > 0
                  ? 'text-amber-400 hover:text-amber-300 underline underline-offset-2 cursor-pointer'
                  : 'text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>{t.transferToWallet}</span>
              <ArrowRight className={`w-3 h-3 ${language === 'ar' ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* 3. Total Generated Commissions */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{t.allTimeOutput}</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold text-emerald-400 font-mono tracking-tight" dir="ltr">
            +${totalCommissionGenerated.toFixed(2)}
            <span className="text-xs font-normal text-slate-400 ml-1">USDT</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
            {language === 'ar' ? 'نظام تسوية العمولات التلقائي' : 'Automated tier settlement protocol'}
          </div>
        </div>

        {/* 4. Active Hardware in Downline */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{t.downlineActiveUnits}</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-white font-mono tracking-tight" dir="ltr">
            {referrals.level1.reduce((acc, m) => acc + m.activeCounters, 0) +
              referrals.level2.reduce((acc, m) => acc + m.activeCounters, 0) +
              referrals.level3.reduce((acc, m) => acc + m.activeCounters, 0)}
            <span className="text-xs font-normal text-slate-400 ml-1">nodes</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
            {language === 'ar' ? 'توليد أرباح دورات الـ 24 ساعة' : 'Generating 24-hour cycle yields'}
          </div>
        </div>
      </div>

      {/* DEV TOOLS: SIMULATE REFERRAL COMMISSION CARD */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white tracking-tight">
                {t.devToolsReferralTitle}
              </h4>
              <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                {language === 'ar' ? 'بيئة تجريبية' : 'Testing Sandbox'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {language === 'ar'
                ? 'محاكاة اكتمال دورة تعدين لعضو في الشبكة ← زيادة رصيد صندوق المكافآت بمقدار +$0.375 USDT.'
                : 'Simulate a referee completing their 24h cycle → increments Reward Box balance by +$0.375 USDT.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleSimulate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>{t.simulateReferral}</span>
          </button>
        </div>
      </div>

      {/* Simulation Feedback Alert */}
      {simulationNotice && (
        <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-xl flex items-center gap-2 text-xs animate-in fade-in slide-in-from-top-1">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{simulationNotice}</span>
        </div>
      )}

      {/* 3-LEVEL REFERRAL TREE VISUAL COMPONENT */}
      <section aria-labelledby="referral-tree-heading">
        <h3 id="referral-tree-heading" className="sr-only">
          {t.treeTitle}
        </h3>
        <ReferralTree />
      </section>
    </div>
  );
};

export default ReferralsPage;
