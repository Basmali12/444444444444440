import React, { useState } from 'react';
import {
  Users,
  CornerDownRight,
  GitFork,
  Cpu,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { ReferralMember } from '../../types';

export const ReferralTree: React.FC = () => {
  const { referrals, currentUser, t, language } = useAppContext();
  const [activeTierTab, setActiveTierTab] = useState<'tree' | 'tiers'>('tree');
  const [expandedL1, setExpandedL1] = useState<Record<string, boolean>>({
    ref_l1_01: true,
    ref_l1_02: true,
    ref_l1_03: false,
    ref_l1_04: false,
  });

  const toggleExpand = (id: string) => {
    setExpandedL1((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getL2Children = (l1Id: string) => {
    return referrals.level2.filter((m) => m.parentId === l1Id);
  };

  const getL3Children = (l2Id: string) => {
    return referrals.level3.filter((m) => m.parentId === l2Id);
  };

  const l1TotalCommission = referrals.level1.reduce((acc, m) => acc + m.commissionEarned, 0);
  const l2TotalCommission = referrals.level2.reduce((acc, m) => acc + m.commissionEarned, 0);
  const l3TotalCommission = referrals.level3.reduce((acc, m) => acc + m.commissionEarned, 0);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Header & Level Rates Bar */}
      <div className="p-5 sm:p-6 border-b border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
              <GitFork className="w-4 h-4 text-amber-400" />
              {language === 'ar' ? 'هيكل العمولات ثلاثي المستويات' : '3-Level Commission Architecture'}
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {t.treeTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.treeSubtitle}
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveTierTab('tree')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTierTab === 'tree'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.hierarchicalTree}
            </button>
            <button
              onClick={() => setActiveTierTab('tiers')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTierTab === 'tiers'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.tierBreakdown}
            </button>
          </div>
        </div>

        {/* 3 Tier Summary Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-5 border-t border-slate-800/80">
          {/* Level 1 */}
          <div className="p-3.5 bg-slate-950/70 border border-amber-500/20 rounded-xl">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-amber-400">{t.level1Title}</span>
              <span dir="ltr" className="text-[11px] font-mono text-slate-400">
                {referrals.level1.length} {t.members}
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span dir="ltr" className="text-base font-bold text-white font-mono">
                ${l1TotalCommission.toFixed(2)}
              </span>
              <span className="text-[11px] text-emerald-400 font-medium">{t.earned}</span>
            </div>
          </div>

          {/* Level 2 */}
          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-cyan-400">{t.level2Title}</span>
              <span dir="ltr" className="text-[11px] font-mono text-slate-400">
                {referrals.level2.length} {t.members}
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span dir="ltr" className="text-base font-bold text-white font-mono">
                ${l2TotalCommission.toFixed(2)}
              </span>
              <span className="text-[11px] text-emerald-400 font-medium">{t.earned}</span>
            </div>
          </div>

          {/* Level 3 */}
          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-indigo-400">{t.level3Title}</span>
              <span dir="ltr" className="text-[11px] font-mono text-slate-400">
                {referrals.level3.length} {t.members}
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span dir="ltr" className="text-base font-bold text-white font-mono">
                ${l3TotalCommission.toFixed(2)}
              </span>
              <span className="text-[11px] text-emerald-400 font-medium">{t.earned}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT: HIERARCHICAL TREE VIEW */}
      {activeTierTab === 'tree' ? (
        <div className="p-5 sm:p-6 space-y-4">
          {/* ROOT USER NODE */}
          <div className="p-4 bg-slate-950/90 border border-emerald-500/30 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono">
                {t.youRoot}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{currentUser.name}</span>
                  <span dir="ltr" className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                    Ref: {currentUser.referralCode}
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  {t.rootSponsor} · {language === 'ar' ? 'إجمالي الفريق:' : 'Downline total:'}{' '}
                  <strong dir="ltr" className="font-mono text-slate-200">
                    {referrals.level1.length + referrals.level2.length + referrals.level3.length}
                  </strong>{' '}
                  {t.members}
                </span>
              </div>
            </div>

            <div className="text-right hidden sm:block">
              <span className="text-[11px] text-slate-400 block">{t.totalDownlineYield}</span>
              <span dir="ltr" className="text-sm font-bold text-emerald-400 font-mono">
                +${(l1TotalCommission + l2TotalCommission + l3TotalCommission).toFixed(2)} USDT
              </span>
            </div>
          </div>

          {/* LEVEL 1 LIST */}
          <div className="space-y-3 pt-2">
            {referrals.level1.map((l1Member) => {
              const l2Children = getL2Children(l1Member.id);
              const isExpanded = expandedL1[l1Member.id];

              return (
                <div
                  key={l1Member.id}
                  className="bg-slate-950/40 border border-slate-800/80 rounded-xl overflow-hidden"
                >
                  {/* L1 Card Row */}
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-850/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <CornerDownRight className={`w-4 h-4 text-amber-400 shrink-0 ${language === 'ar' ? 'rotate-90' : ''}`} />

                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                        L1
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">
                            {l1Member.name}
                          </span>
                          <span dir="ltr" className="text-xs font-mono text-slate-400">
                            {l1Member.username}
                          </span>
                          <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 font-medium">
                            {language === 'ar' ? 'مباشر (5%)' : 'Direct (5%)'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Cpu className="w-3 h-3 text-emerald-400" />
                            <strong dir="ltr" className="font-mono">{l1Member.activeCounters}</strong> {t.nodesActive}
                          </span>
                          <span>·</span>
                          <span dir="ltr" className="font-mono">Vol: ${l1Member.totalVolume.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 pl-7 sm:pl-0">
                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 block">{t.commGenerated}</span>
                        <span dir="ltr" className="text-sm font-mono font-bold text-emerald-400">
                          +${l1Member.commissionEarned.toFixed(2)}
                        </span>
                      </div>

                      {l2Children.length > 0 && (
                        <button
                          onClick={() => toggleExpand(l1Member.id)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition-colors"
                        >
                          <span dir="ltr" className="font-mono">{l2Children.length}</span>
                          <span>{t.subRef}</span>
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                          ) : (
                            <ChevronRight className={`w-3.5 h-3.5 text-slate-400 ${language === 'ar' ? 'rotate-180' : ''}`} />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* L2 (INDIRECT) CHILDREN ACCORDION */}
                  {isExpanded && l2Children.length > 0 && (
                    <div className={`border-t border-slate-800/80 bg-slate-900/30 ${language === 'ar' ? 'pr-6 sm:pr-10 pl-4' : 'pl-6 sm:pl-10 pr-4'} py-3 space-y-3`}>
                      {l2Children.map((l2Member) => {
                        const l3Children = getL3Children(l2Member.id);

                        return (
                          <div key={l2Member.id} className="space-y-2">
                            {/* L2 Row */}
                            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <CornerDownRight className={`w-3.5 h-3.5 text-cyan-400 shrink-0 ${language === 'ar' ? 'rotate-90' : ''}`} />
                                <div className="w-6 h-6 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px] shrink-0 font-mono">
                                  L2
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold text-slate-200">
                                      {l2Member.name}
                                    </span>
                                    <span dir="ltr" className="text-[11px] font-mono text-slate-400">
                                      {l2Member.username}
                                    </span>
                                    <span className="text-[10px] text-cyan-400 font-medium">
                                      (2.5%)
                                    </span>
                                  </div>
                                  <span className="text-[11px] text-slate-400">
                                    <strong dir="ltr" className="font-mono">{l2Member.activeCounters}</strong> {t.nodesActive} · Vol: ${l2Member.totalVolume.toFixed(2)}
                                  </span>
                                </div>
                              </div>

                              <div className="text-right">
                                <span dir="ltr" className="text-xs font-mono font-bold text-emerald-400">
                                  +${l2Member.commissionEarned.toFixed(2)}
                                </span>
                              </div>
                            </div>

                            {/* L3 (NETWORK) CHILDREN */}
                            {l3Children.length > 0 && (
                              <div className={`${language === 'ar' ? 'pr-6 sm:pr-8' : 'pl-6 sm:pl-8'} space-y-1.5`}>
                                {l3Children.map((l3Member) => (
                                  <div
                                    key={l3Member.id}
                                    className="p-2.5 bg-slate-950/40 border border-slate-800/60 rounded-md flex items-center justify-between text-xs"
                                  >
                                    <div className="flex items-center gap-2">
                                      <CornerDownRight className={`w-3 h-3 text-indigo-400 shrink-0 ${language === 'ar' ? 'rotate-90' : ''}`} />
                                      <div className="w-5 h-5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[9px] shrink-0 font-mono">
                                        L3
                                      </div>
                                      <span className="font-medium text-slate-300">
                                        {l3Member.name}
                                      </span>
                                      <span dir="ltr" className="font-mono text-slate-400 text-[11px]">
                                        {l3Member.username}
                                      </span>
                                      <span className="text-[10px] text-indigo-400">
                                        (1%)
                                      </span>
                                    </div>

                                    <span dir="ltr" className="font-mono text-xs font-bold text-emerald-400">
                                      +${l3Member.commissionEarned.toFixed(2)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* TIER BREAKDOWN VIEW */
        <div className="p-5 sm:p-6 space-y-6">
          {/* LEVEL 1 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                {t.level1Title}
              </h4>
              <span dir="ltr" className="text-xs font-mono text-slate-400">
                {referrals.level1.length} {t.members}
              </span>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2.5 px-4 font-medium">{language === 'ar' ? 'الاسم' : 'User'}</th>
                    <th className="py-2.5 px-4 font-medium">{language === 'ar' ? 'المعرف' : 'Handle'}</th>
                    <th className="py-2.5 px-4 font-medium">{language === 'ar' ? 'العدادات' : 'Nodes'}</th>
                    <th className="py-2.5 px-4 font-medium">{t.vol}</th>
                    <th className="py-2.5 px-4 font-medium text-right">{t.earned}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {referrals.level1.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-900/40">
                      <td className="py-2.5 px-4 font-semibold text-white">{m.name}</td>
                      <td dir="ltr" className="py-2.5 px-4 font-mono text-slate-400">{m.username}</td>
                      <td dir="ltr" className="py-2.5 px-4 font-mono text-slate-300">{m.activeCounters} Active</td>
                      <td dir="ltr" className="py-2.5 px-4 font-mono text-slate-300">${m.totalVolume.toFixed(2)}</td>
                      <td dir="ltr" className="py-2.5 px-4 font-mono font-bold text-emerald-400 text-right">
                        +${m.commissionEarned.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* LEVEL 2 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                {t.level2Title}
              </h4>
              <span dir="ltr" className="text-xs font-mono text-slate-400">
                {referrals.level2.length} {t.members}
              </span>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2.5 px-4 font-medium">{language === 'ar' ? 'الاسم' : 'User'}</th>
                    <th className="py-2.5 px-4 font-medium">{language === 'ar' ? 'المعرف' : 'Handle'}</th>
                    <th className="py-2.5 px-4 font-medium">{language === 'ar' ? 'العدادات' : 'Nodes'}</th>
                    <th className="py-2.5 px-4 font-medium">{t.vol}</th>
                    <th className="py-2.5 px-4 font-medium text-right">{t.earned}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {referrals.level2.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-900/40">
                      <td className="py-2.5 px-4 font-semibold text-white">{m.name}</td>
                      <td dir="ltr" className="py-2.5 px-4 font-mono text-slate-400">{m.username}</td>
                      <td dir="ltr" className="py-2.5 px-4 font-mono text-slate-300">{m.activeCounters} Active</td>
                      <td dir="ltr" className="py-2.5 px-4 font-mono text-slate-300">${m.totalVolume.toFixed(2)}</td>
                      <td dir="ltr" className="py-2.5 px-4 font-mono font-bold text-emerald-400 text-right">
                        +${m.commissionEarned.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* LEVEL 3 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                {t.level3Title}
              </h4>
              <span dir="ltr" className="text-xs font-mono text-slate-400">
                {referrals.level3.length} {t.members}
              </span>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2.5 px-4 font-medium">{language === 'ar' ? 'الاسم' : 'User'}</th>
                    <th className="py-2.5 px-4 font-medium">{language === 'ar' ? 'المعرف' : 'Handle'}</th>
                    <th className="py-2.5 px-4 font-medium">{language === 'ar' ? 'العدادات' : 'Nodes'}</th>
                    <th className="py-2.5 px-4 font-medium">{t.vol}</th>
                    <th className="py-2.5 px-4 font-medium text-right">{t.earned}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {referrals.level3.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-900/40">
                      <td className="py-2.5 px-4 font-semibold text-white">{m.name}</td>
                      <td dir="ltr" className="py-2.5 px-4 font-mono text-slate-400">{m.username}</td>
                      <td dir="ltr" className="py-2.5 px-4 font-mono text-slate-300">{m.activeCounters} Active</td>
                      <td dir="ltr" className="py-2.5 px-4 font-mono text-slate-300">${m.totalVolume.toFixed(2)}</td>
                      <td dir="ltr" className="py-2.5 px-4 font-mono font-bold text-emerald-400 text-right">
                        +${m.commissionEarned.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralTree;
