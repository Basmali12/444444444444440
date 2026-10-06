import React, { useState } from 'react';
import { CountersGrid } from './CountersGrid';
import { DevTimeControlPanel } from './DevTimeControlPanel';
import { useAppContext } from '../../context/AppContext';
import { CounterStatus } from '../../types';
import {
  Activity,
  Layers,
} from 'lucide-react';

export const CountersPage: React.FC = () => {
  const { counters, wallet, t, language } = useAppContext();
  const [statusFilter, setStatusFilter] = useState<'all' | CounterStatus>('all');

  const runningCounters = counters.filter((c) => c.status === 'running');
  const waitingCounters = counters.filter((c) => c.status === 'waiting_activation');
  const expiredCounters = counters.filter((c) => c.status === 'expired');

  const dailyOutput = runningCounters.reduce((acc, c) => acc + c.dailyReward, 0);

  const filteredList = counters.filter((c) => {
    if (statusFilter === 'all') return true;
    return c.status === statusFilter;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Title & Context Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
            <Activity className="w-4 h-4 text-emerald-400" />
            24-Hour Automated Cycle Protocol
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {t.counterPortfolio}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            {t.counterSubtitle}
          </p>
        </div>

        {/* Live Aggregates Header Pill */}
        <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
          <div className="px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3 text-xs">
            <div>
              <span className="text-slate-400 text-[10px] uppercase tracking-wider block">
                {t.activeDailyYield}
              </span>
              <span dir="ltr" className="text-sm font-bold text-emerald-400 font-mono">
                +${dailyOutput.toFixed(2)} / day
              </span>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="text-slate-400 text-[10px] uppercase tracking-wider block">
                {t.availableBalance}
              </span>
              <span dir="ltr" className="text-sm font-bold text-white font-mono">
                ${wallet.availableBalance.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DEVELOPER "TIME TRAVEL" TESTING PANEL */}
      <section aria-labelledby="dev-tools-heading">
        <h3 id="dev-tools-heading" className="sr-only">
          Developer Time Control Tools
        </h3>
        <DevTimeControlPanel />
      </section>

      {/* FILTER CONTROLS & GRID HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <h3 className="text-base font-bold text-white tracking-tight">
            {t.hardwareUnits}
          </h3>
          <span dir="ltr" className="text-xs text-slate-400 font-mono">
            ({filteredList.length} / {counters.length})
          </span>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start sm:self-auto">
          {(
            [
              { id: 'all', label: `${t.filterAll} (${counters.length})` },
              { id: 'running', label: `${t.running} (${runningCounters.length})` },
              { id: 'waiting_activation', label: `${t.waiting} (${waitingCounters.length})` },
              { id: 'expired', label: `${t.expired} (${expiredCounters.length})` },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as 'all' | CounterStatus)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                statusFilter === tab.id
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* RESPONSIVE COUNTERS GRID */}
      <section aria-labelledby="counters-grid-heading">
        <h3 id="counters-grid-heading" className="sr-only">
          Counters Grid
        </h3>
        <CountersGrid countersList={filteredList} />
      </section>
    </div>
  );
};

export default CountersPage;
