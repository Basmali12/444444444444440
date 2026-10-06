import React, { useState } from 'react';
import {
  FastForward,
  CheckCircle,
  Clock,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const DevTimeControlPanel: React.FC = () => {
  const { counters, fastForward12Hours, complete24hCycle, t } = useAppContext();
  const [lastAction, setLastAction] = useState<string | null>(null);

  const runningCount = counters.filter((c) => c.status === 'running').length;
  const waitingCount = counters.filter((c) => c.status === 'waiting_activation').length;

  const handleFastForward = () => {
    fastForward12Hours();
    setLastAction(t.ffApplied);
    setTimeout(() => setLastAction(null), 4000);
  };

  const handleCompleteCycle = () => {
    complete24hCycle();
    setLastAction(t.cycleSimulated);
    setTimeout(() => setLastAction(null), 4500);
  };

  return (
    <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Panel Header */}
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white tracking-tight">
                {t.devToolsTitle}
              </h4>
              <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                {t.devToolsSandbox}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.devToolsSubtitle}
            </p>
          </div>
        </div>

        {/* Node Status Summary */}
        <div className="flex items-center gap-3 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              <strong dir="ltr" className="text-white font-mono">{runningCount}</strong> {t.runningNodes}
            </span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>
              <strong dir="ltr" className="text-white font-mono">{waitingCount}</strong> {t.waitingNodes}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Button A: Fast Forward 12 Hours */}
          <button
            onClick={handleFastForward}
            disabled={runningCount === 0}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95 shadow-md ${
              runningCount > 0
                ? 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/50 cursor-pointer shadow-cyan-950/20'
                : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 cursor-not-allowed opacity-60'
            }`}
          >
            <FastForward className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.fastForward12h}</span>
          </button>

          {/* Button B: Complete 24h Cycle */}
          <button
            onClick={handleCompleteCycle}
            disabled={runningCount === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-lg ${
              runningCount > 0
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 shadow-emerald-500/20 cursor-pointer'
                : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 cursor-not-allowed opacity-60'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5 text-slate-950" />
            <span>{t.complete24h}</span>
          </button>
        </div>
      </div>

      {/* Visual Feedback Message */}
      {lastAction && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-emerald-400 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{lastAction}</span>
        </div>
      )}
    </div>
  );
};

export default DevTimeControlPanel;
