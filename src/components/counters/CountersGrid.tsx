import React from 'react';
import { CounterCard } from './CounterCard';
import { useAppContext } from '../../context/AppContext';
import { Counter } from '../../types';
import { Cpu, AlertCircle } from 'lucide-react';

export interface CountersGridProps {
  countersList?: Counter[];
}

export const CountersGrid: React.FC<CountersGridProps> = ({ countersList }) => {
  const { counters, startCounterCycle } = useAppContext();

  const items = countersList || counters;

  if (items.length === 0) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center">
        <Cpu className="w-10 h-10 text-slate-500 mx-auto mb-3" />
        <h3 className="text-base font-semibold text-white">No Counters Found</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          There are currently no cloud counter nodes matching this view.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((counter) => (
        <CounterCard
          key={counter.id}
          counter={counter}
          onStartCycle={startCounterCycle}
        />
      ))}
    </div>
  );
};

export default CountersGrid;
