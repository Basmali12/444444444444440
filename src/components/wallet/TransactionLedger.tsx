import React, { useState } from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Gift,
  Cpu,
  Clock,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Copy,
  Check,
  Filter,
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { LedgerTransaction } from '../../types';

export interface TransactionLedgerProps {
  limit?: number;
  showFilters?: boolean;
}

export const TransactionLedger: React.FC<TransactionLedgerProps> = ({
  limit,
  showFilters = true,
}) => {
  const { ledger, t, language } = useAppContext();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCleanTypeName = (type: string) => {
    switch (type) {
      case 'daily_reward':
        return language === 'ar' ? 'عائد يومي' : 'Daily Reward';
      case 'referral_bonus':
      case 'referral_reward':
        return language === 'ar' ? 'عمولة إحالة' : 'Referral Bonus';
      case 'counter_purchase':
        return language === 'ar' ? 'شراء عداد' : 'Counter Purchase';
      case 'withdrawal':
        return language === 'ar' ? 'سحب رصيد' : 'Withdrawal';
      case 'deposit':
        return language === 'ar' ? 'إيداع رصيد' : 'Deposit';
      case 'cycle_activation':
        return language === 'ar' ? 'تفعيل دورة' : 'Cycle Activation';
      case 'reward_box_release':
        return language === 'ar' ? 'تحويل مكافأة' : 'Reward Box Release';
      default:
        return type.replace(/_/g, ' ');
    }
  };

  const getTypeIcon = (type: string, amount: number) => {
    if (type === 'daily_reward') {
      return <Cpu className="w-3.5 h-3.5 text-cyan-400" />;
    }
    if (type === 'referral_bonus' || type === 'referral_reward' || type === 'reward_box_release') {
      return <Gift className="w-3.5 h-3.5 text-amber-400" />;
    }
    if (amount < 0) {
      return <ArrowUpRight className="w-3.5 h-3.5 text-rose-400" />;
    }
    return <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-400" />;
  };

  // Filter & Search logic
  const filteredTransactions = ledger
    .filter((tx) => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'rewards') return tx.type === 'daily_reward';
      if (activeFilter === 'referrals') return tx.type === 'referral_bonus' || tx.type === 'referral_reward' || tx.type === 'reward_box_release';
      if (activeFilter === 'purchases') return tx.type === 'counter_purchase';
      if (activeFilter === 'transfers') return tx.type === 'withdrawal' || tx.type === 'deposit';
      return true;
    })
    .filter((tx) => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        tx.id.toLowerCase().includes(query) ||
        (tx.description && tx.description.toLowerCase().includes(query)) ||
        tx.type.toLowerCase().includes(query)
      );
    });

  const displayList = limit ? filteredTransactions.slice(0, limit) : filteredTransactions;

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Header and Filter Controls */}
      {showFilters && (
        <div className="p-5 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-white tracking-tight">
              {t.recentTransactions}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.realtimeFeed}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className={`w-3.5 h-3.5 absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-400`} />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${language === 'ar' ? 'pr-8 pl-3' : 'pl-8 pr-3'} py-1.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500/50 w-48 sm:w-56 transition-colors`}
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl">
              {[
                { id: 'all', label: t.filterAll },
                { id: 'rewards', label: t.filterRewards },
                { id: 'referrals', label: t.filterReferrals },
                { id: 'purchases', label: t.filterPurchases },
                { id: 'transfers', label: t.filterTransfers },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                    activeFilter === f.id
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800/80 bg-slate-950/40 text-slate-400 font-medium">
              <th className="py-3.5 px-4">{t.txId}</th>
              <th className="py-3.5 px-4">{t.type}</th>
              <th className="py-3.5 px-4">{t.description}</th>
              <th className="py-3.5 px-4">{t.dateTime}</th>
              <th className="py-3.5 px-4">{t.status}</th>
              <th className="py-3.5 px-4 text-right">{t.amount}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {displayList.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Filter className="w-6 h-6 text-slate-400" />
                    <span>{t.noTxFound}</span>
                  </div>
                </td>
              </tr>
            ) : (
              displayList.map((tx) => {
                const isPositive = tx.amount > 0;
                const isZero = tx.amount === 0;
                const formattedDate = new Date(tx.date).toLocaleDateString([], {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });
                const formattedTime = new Date(tx.date).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <tr
                    key={tx.id}
                    className="hover:bg-slate-800/40 transition-colors duration-150 group"
                  >
                    {/* Transaction ID in English Monospace */}
                    <td className="py-3.5 px-4 font-mono text-slate-300">
                      <div className="flex items-center gap-2" dir="ltr">
                        <span className="font-semibold">{tx.id}</span>
                        <button
                          onClick={() => handleCopyId(tx.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:text-white text-slate-400 rounded transition-opacity"
                          title="Copy Transaction ID"
                          aria-label={`Copy ID ${tx.id}`}
                        >
                          {copiedId === tx.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Type with clean styling */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                          {getTypeIcon(tx.type, tx.amount)}
                        </span>
                        <span className="font-medium text-slate-200 whitespace-nowrap">
                          {getCleanTypeName(tx.type)}
                        </span>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="py-3.5 px-4 text-slate-300 max-w-xs truncate">
                      {tx.description || 'System settlement'}
                    </td>

                    {/* Date in English numerals */}
                    <td className="py-3.5 px-4 text-slate-400 font-mono whitespace-nowrap" dir="ltr">
                      <span>{formattedDate}</span>
                      <span className="text-slate-400 ml-1.5 text-[11px]">{formattedTime}</span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            tx.status === 'completed'
                              ? 'bg-emerald-400'
                              : tx.status === 'pending'
                              ? 'bg-amber-400'
                              : 'bg-rose-400'
                          }`}
                        />
                        <span
                          className={`font-medium capitalize ${
                            tx.status === 'completed'
                              ? 'text-emerald-400'
                              : tx.status === 'pending'
                              ? 'text-amber-400'
                              : 'text-rose-400'
                          }`}
                        >
                          {tx.status === 'completed'
                            ? t.completed
                            : tx.status === 'pending'
                            ? t.pending
                            : t.failed}
                        </span>
                      </div>
                    </td>

                    {/* Amount Strictly in English Digits */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap" dir="ltr">
                      <span
                        className={`font-mono text-sm font-bold ${
                          isPositive
                            ? 'text-emerald-400'
                            : isZero
                            ? 'text-slate-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {isPositive
                          ? `+$${tx.amount.toFixed(2)}`
                          : isZero
                          ? '$0.00'
                          : `-$${Math.abs(tx.amount).toFixed(2)}`}
                      </span>
                      <span className="text-[10px] text-slate-400 ml-1 font-mono uppercase">
                        USDT
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="px-6 py-3 bg-slate-950/40 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span>
          {t.showingEvents} ({displayList.length})
        </span>
        <span dir="ltr" className="font-mono text-[11px]">
          {t.auditSynced}
        </span>
      </div>
    </div>
  );
};

export default TransactionLedger;
