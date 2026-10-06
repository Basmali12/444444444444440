import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Clock,
  Play,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Zap,
} from 'lucide-react';
import { Counter } from '../../types';
import { useAppContext } from '../../context/AppContext';

export interface CounterCardProps {
  counter: Counter;
  onStartCycle?: (counterId: string) => void;
}

export const CounterCard: React.FC<CounterCardProps> = ({ counter, onStartCycle }) => {
  const { t, language } = useAppContext();
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  // Set up interval for live calculation (50ms)
  useEffect(() => {
    if (counter.status !== 'running' || !counter.cycleStartedAt) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 50);

    return () => clearInterval(interval);
  }, [counter.status, counter.cycleStartedAt]);

  // Live calculation logic:
  // - Total cycle duration is 24 hours (86,400 seconds)
  // - currentReward = dailyReward * (elapsedSeconds / 86400), capped at dailyReward
  // - progressPercentage = (elapsedSeconds / 86400) * 100, capped at 100%
  let elapsedSeconds = 0;
  let currentReward = 0;
  let progressPercentage = 0;

  if (counter.status === 'running' && counter.cycleStartedAt) {
    const rawElapsedSeconds = Math.max(0, (currentTime - counter.cycleStartedAt) / 1000);
    elapsedSeconds = rawElapsedSeconds > 86400 ? (rawElapsedSeconds % 86400) : rawElapsedSeconds;
    currentReward = Math.min(counter.dailyReward, counter.dailyReward * (elapsedSeconds / 86400));
    progressPercentage = Math.min(100, (elapsedSeconds / 86400) * 100);
  } else if (counter.status === 'expired') {
    currentReward = counter.dailyReward;
    progressPercentage = 100;
  } else {
    currentReward = 0;
    progressPercentage = 0;
  }

  // Calculate days left from expiresAt
  const msLeft = counter.expiresAt - currentTime;
  const daysLeft = Math.max(0, Math.ceil(msLeft / (1000 * 60 * 60 * 24)));

  const handleStartCycle = () => {
    console.log(t.startCycleClicked);
    if (onStartCycle) {
      onStartCycle(counter.id);
    }
  };

  // Format elapsed time in standard English numbers (HH:MM:SS)
  const formatCycleTimer = (sec: number) => {
    const hours = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = Math.floor(sec % 60);
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative overflow-hidden bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 shadow-xl transition-all duration-300 flex flex-col justify-between group">
      {/* Ambient Glow */}
      {counter.status === 'running' && (
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/15 transition-colors" />
      )}
      {counter.status === 'waiting_activation' && (
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/15 transition-colors" />
      )}

      <div>
        {/* Top Header: ID & Status Badge */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                counter.status === 'running'
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : counter.status === 'waiting_activation'
                  ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span dir="ltr" className="text-[11px] font-mono font-medium text-slate-400 block uppercase tracking-wider text-left">
                ID: {counter.id}
              </span>
              <h3 className="text-sm font-semibold text-white tracking-tight leading-tight">
                {counter.name || `Node ${counter.id.slice(0, 8)}`}
              </h3>
            </div>
          </div>

          {/* Status Badge */}
          {counter.status === 'running' && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>{t.running}</span>
            </div>
          )}

          {counter.status === 'waiting_activation' && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{t.waiting}</span>
            </div>
          )}

          {counter.status === 'expired' && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-slate-500" />
              <span>{t.expired}</span>
            </div>
          )}
        </div>

        {/* Live Number Display (NUMBERS STRICTLY IN ENGLISH/LATIN DIGITS) */}
        <div className="my-5 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              {t.current24hReward}
            </span>
            {counter.status === 'running' && (
              <span dir="ltr" className="font-mono text-[11px] text-slate-400">
                {formatCycleTimer(elapsedSeconds)} / 24h
              </span>
            )}
          </div>

          {/* Live 6-decimal Ticker in English Numerals */}
          <div dir="ltr" className="flex items-baseline gap-2 text-left">
            <span className="text-xs sm:text-sm font-semibold text-slate-400 font-mono">
              $
            </span>
            <span
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-mono tabular-nums ${
                counter.status === 'running'
                  ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.25)]'
                  : 'text-slate-400'
              }`}
            >
              {currentReward.toFixed(6)}
            </span>
            <span className="text-xs font-mono text-slate-400 uppercase">
              USDT
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800/60">
            <span>
              {t.dailyTarget}{' '}
              <strong dir="ltr" className="text-slate-200 font-mono">
                ${counter.dailyReward.toFixed(2)}
              </strong>
            </span>
            <span>
              {t.unitPrice}{' '}
              <strong dir="ltr" className="text-slate-200 font-mono">
                ${counter.price.toFixed(2)}
              </strong>
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 mb-5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">{t.cycleProgress}</span>
            <span dir="ltr" className="font-mono font-medium text-slate-300 tabular-nums">
              {progressPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800/80 p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-300 ease-out ${
                counter.status === 'running'
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-sm shadow-emerald-500/30'
                  : counter.status === 'waiting_activation'
                  ? 'bg-amber-500/50'
                  : 'bg-slate-600'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Specifications & Expiration Info */}
        <div className="grid grid-cols-2 gap-2 text-xs py-2 border-t border-slate-800/80 text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              {counter.status === 'expired' ? (
                <span className="text-slate-400">0 {t.daysLeft}</span>
              ) : (
                <span>
                  <strong dir="ltr" className="text-slate-200 font-mono">{daysLeft}</strong> {t.daysLeft}
                </span>
              )}
            </span>
          </div>

          <div className="text-right flex items-center justify-end gap-1">
            <span className="text-slate-400">{t.cycles}</span>
            <strong dir="ltr" className="text-slate-200 font-mono">
              {counter.completedCycles}/{counter.durationDays}
            </strong>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 mt-2 border-t border-slate-800/80">
        {counter.status === 'waiting_activation' ? (
          <button
            onClick={handleStartCycle}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{t.startCycle}</span>
          </button>
        ) : counter.status === 'running' ? (
          <div className="flex items-center justify-between text-xs">
            <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {t.miningActive}
            </span>
            <span dir="ltr" className="text-[11px] font-mono text-slate-400">50ms tick</span>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{t.cycleCompletedAll}</span>
            <span dir="ltr" className="font-mono text-slate-400 text-[11px]">Completed</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CounterCard;
