import React from 'react';
import { WalletCards } from './WalletCards';
import { TransactionLedger } from './TransactionLedger';
import { Activity, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const WalletDashboard: React.FC = () => {
  const { wallet, ledger, t } = useAppContext();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Title & Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            {t.financialHub}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {t.treasuryTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            {t.treasurySubtitle}
          </p>
        </div>

        {/* Network & Gas Subsidy Info */}
        <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
          <div className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">{t.gasSubsidy}</span>
            <span className="text-emerald-400 font-mono font-medium">{t.free}</span>
          </div>
        </div>
      </div>

      {/* 1. WALLET CARDS (Available Balance & Reward Box) */}
      <section aria-labelledby="wallet-cards-heading">
        <h3 id="wallet-cards-heading" className="sr-only">
          {t.availableBalance}
        </h3>
        <WalletCards />
      </section>

      {/* SECTION DIVIDER & RECENT TRANSACTIONS HEADER */}
      <div className="relative pt-2">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-slate-800/80" />
        </div>
        <div className="relative flex items-center justify-between">
          <div className="bg-slate-950 px-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {t.recentTransactions}
            </h3>
          </div>
          <div className="bg-slate-950 px-4 text-xs text-slate-400 hidden sm:flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.realtimeFeed}</span>
          </div>
        </div>
      </div>

      {/* 2. TRANSACTION LEDGER */}
      <section aria-labelledby="ledger-heading">
        <h3 id="ledger-heading" className="sr-only">
          {t.recentTransactions}
        </h3>
        <TransactionLedger />
      </section>
    </div>
  );
};

export default WalletDashboard;
