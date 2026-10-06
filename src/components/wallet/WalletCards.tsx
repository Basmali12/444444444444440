import React, { useState } from 'react';
import {
  Wallet as WalletIcon,
  Gift,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export interface WalletCardsProps {
  onTransferRequested?: (amount: number) => void;
}

export const WalletCards: React.FC<WalletCardsProps> = ({ onTransferRequested }) => {
  const { wallet, transferRewardToWallet, t, language } = useAppContext();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isTransferring, setIsTransferring] = useState(false);

  const handleTransfer = () => {
    console.log('Transfer requested');

    if (wallet.rewardBoxBalance <= 0) {
      setToastMessage(t.noPendingRewards);
      setTimeout(() => setToastMessage(null), 3500);
      return;
    }

    setIsTransferring(true);
    const amountToTransfer = wallet.rewardBoxBalance;

    if (onTransferRequested) {
      onTransferRequested(amountToTransfer);
    }

    transferRewardToWallet();

    setToastMessage(`+$${amountToTransfer.toFixed(2)} USDT ${t.transferSuccess}`);
    setIsTransferring(false);

    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  return (
    <div className="relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-20 ${
            language === 'ar' ? 'left-4 sm:left-8' : 'right-4 sm:right-8'
          } z-50 max-w-md bg-slate-900 border border-emerald-500/30 text-white p-4 rounded-xl shadow-2xl shadow-emerald-950/50 flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-200`}
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              {language === 'ar' ? 'نجاح' : 'Success'}
            </p>
            <p className="text-xs sm:text-sm text-slate-200 mt-0.5 leading-relaxed">
              {toastMessage}
            </p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Side-by-side cards (stacked on mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* CARD 1: AVAILABLE BALANCE (Main Wallet) */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl hover:border-slate-700/80 transition-all flex flex-col justify-between group">
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />

          <div>
            {/* Header / Subtitle */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-inner">
                  <WalletIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                    {t.mainWallet}
                  </h3>
                  <div className="text-sm font-semibold text-white">
                    {t.availableBalance}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t.withdrawable}
              </div>
            </div>

            {/* Prominent Amount in English Digits */}
            <div className="my-3">
              <div dir="ltr" className="flex items-baseline gap-2 text-left">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight tabular-nums">
                  ${wallet.availableBalance.toFixed(2)}
                </span>
                <span className="text-sm sm:text-base font-semibold text-slate-400 font-mono">
                  {wallet.currency || 'USDT'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t.instantLiquidity}</span>
              </p>
            </div>
          </div>

          {/* Quick Balance Metrics & Action Bar */}
          <div className="pt-5 mt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4 text-slate-400">
              <div>
                <span className="block text-[11px]">{t.lifetimeEarnings}</span>
                <span dir="ltr" className="font-mono text-emerald-400 font-semibold text-sm">
                  ${(wallet.totalEarned || 0).toFixed(2)}
                </span>
              </div>
              <div className="h-6 w-px bg-slate-800" />
              <div>
                <span className="block text-[11px]">{t.totalWithdrawn}</span>
                <span dir="ltr" className="font-mono text-slate-300 font-semibold text-sm">
                  ${(wallet.totalWithdrawn || 0).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span dir="ltr" className="text-[11px] text-slate-400 font-mono">TRC-20 / Polygon</span>
            </div>
          </div>
        </div>

        {/* CARD 2: REWARD BOX (Referral Rewards) */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-950 border border-amber-500/30 rounded-2xl p-6 sm:p-7 shadow-xl shadow-amber-950/10 hover:border-amber-500/50 transition-all flex flex-col justify-between group">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/15 transition-colors" />

          <div>
            {/* Header / Subtitle */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-inner">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-amber-400/90">
                    {t.referralProgram}
                  </h3>
                  <div className="text-sm font-semibold text-amber-100">
                    {t.rewardBox}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-medium text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/25">
                <Sparkles className="w-3 h-3 text-amber-400" />
                {t.pendingCommission}
              </div>
            </div>

            {/* Prominent Amount in English Digits */}
            <div className="my-3">
              <div dir="ltr" className="flex items-baseline gap-2 text-left">
                <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono tracking-tight tabular-nums">
                  ${wallet.rewardBoxBalance.toFixed(2)}
                </span>
                <span className="text-sm sm:text-base font-semibold text-amber-300/70 font-mono">
                  {wallet.currency || 'USDT'}
                </span>
              </div>
              <p className="text-xs text-amber-200/70 mt-1.5">
                {t.accruedFromInvites}
              </p>
            </div>
          </div>

          {/* Transfer Button & Status */}
          <div className="pt-5 mt-5 border-t border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs text-amber-300/80">
              {wallet.rewardBoxBalance > 0
                ? t.readyToTransfer
                : t.noPendingRewards}
            </div>

            <button
              onClick={handleTransfer}
              disabled={isTransferring || wallet.rewardBoxBalance <= 0}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-md ${
                wallet.rewardBoxBalance > 0
                  ? 'bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-amber-500/20 cursor-pointer font-bold'
                  : 'bg-slate-800 text-slate-400 cursor-not-allowed opacity-60'
              }`}
            >
              <span>{t.transferToWallet}</span>
              <ArrowRight className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCards;
