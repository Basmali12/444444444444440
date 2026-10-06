import React, { useState } from 'react';
import { CounterCard } from './CounterCard';
import { Counter } from '../../types';
import { Sparkles, Activity, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const CounterCardShowcase: React.FC = () => {
  const { activateCounter } = useAppContext();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const now = Date.now();
  const DAY_MS = 24 * 60 * 60 * 1000;

  // Initial state with the 3 distinct states
  const [showcaseCounters, setShowcaseCounters] = useState<Counter[]>([
    {
      id: 'cnt_showcase_running',
      name: 'Nimbus Core Turbo (Active)',
      price: 45.00,
      dailyReward: 1.65,
      durationDays: 60,
      createdAt: now - 6 * DAY_MS,
      expiresAt: now + 54 * DAY_MS,
      // 3.8 hours into current 24h cycle for live visual progress & continuous ticking
      cycleStartedAt: now - 3.8 * 3600 * 1000,
      status: 'running',
      completedCycles: 6,
    },
    {
      id: 'cnt_showcase_waiting',
      name: 'Cumulus Pro Unit (Pending)',
      price: 30.00,
      dailyReward: 1.10,
      durationDays: 60,
      createdAt: now - 1 * DAY_MS,
      expiresAt: now + 59 * DAY_MS,
      cycleStartedAt: null,
      status: 'waiting_activation',
      completedCycles: 0,
    },
    {
      id: 'cnt_showcase_expired',
      name: 'Cirrus Starter Pod (Archived)',
      price: 15.00,
      dailyReward: 0.50,
      durationDays: 60,
      createdAt: now - 75 * DAY_MS,
      expiresAt: now - 15 * DAY_MS,
      cycleStartedAt: now - 75 * DAY_MS,
      status: 'expired',
      completedCycles: 60,
    },
  ]);

  const handleStartCycle = (counterId: string) => {
    console.log('Start cycle clicked');

    // Update local showcase state so the user sees the waiting card transition to running
    setShowcaseCounters((prev) =>
      prev.map((c) => {
        if (c.id === counterId) {
          return {
            ...c,
            status: 'running',
            cycleStartedAt: Date.now(),
          };
        }
        return c;
      })
    );

    // Also activate in global context if present
    activateCounter(counterId);

    setToastMessage(`Cycle activated for ${counterId}! Real-time mining ticker started.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl flex items-center gap-2 text-xs animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
            <Activity className="w-4 h-4 text-emerald-400" />
            Live Counter Nodes
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Cloud Counter Lifecycle Preview
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Demonstrating all 3 counter states: <strong>Running</strong> (50ms live calculation), <strong>Waiting Activation</strong>, and <strong>Expired</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-emerald-400">50ms high-precision interval</span>
        </div>
      </div>

      {/* 3 Instances Rendered Side-by-Side (or stacked on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {showcaseCounters.map((counter) => (
          <CounterCard
            key={counter.id}
            counter={counter}
            onStartCycle={handleStartCycle}
          />
        ))}
      </div>
    </div>
  );
};

export default CounterCardShowcase;
