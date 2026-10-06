import React from 'react';
import {
  User,
  Shield,
  Languages,
  CheckCircle2,
  Database,
  Globe2,
  Check,
  Sparkles,
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const SettingsView: React.FC = () => {
  const { currentUser, language, setLanguage, t } = useAppContext();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {t.settingsTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {t.settingsSubtitle}
        </p>
      </div>

      {/* 1. LANGUAGE SELECTOR CARD */}
      <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {t.languageSelect}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.languageSelectDesc}
              </p>
            </div>
          </div>

          <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/20 font-medium">
            {language === 'ar' ? 'العربية (RTL)' : 'English (LTR)'}
          </span>
        </div>

        {/* Language Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          {/* Option 1: Arabic */}
          <button
            type="button"
            onClick={() => setLanguage('ar')}
            className={`p-4 rounded-xl border text-right transition-all flex items-center justify-between gap-3 ${
              language === 'ar'
                ? 'bg-emerald-500/10 border-emerald-500/50 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/50'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇸🇦</span>
              <div>
                <span className="text-sm font-bold text-white block">العربية</span>
                <span className="text-xs text-slate-400 block mt-0.5">
                  تعريب كامل مع الحفاظ على أرقام العدادات الإنجليزية
                </span>
              </div>
            </div>

            {language === 'ar' ? (
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full border border-slate-700 shrink-0" />
            )}
          </button>

          {/* Option 2: English */}
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
              language === 'en'
                ? 'bg-emerald-500/10 border-emerald-500/50 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/50'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇺🇸</span>
              <div>
                <span className="text-sm font-bold text-white block">English</span>
                <span className="text-xs text-slate-400 block mt-0.5">
                  Standard platform interface in English
                </span>
              </div>
            </div>

            {language === 'en' ? (
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full border border-slate-700 shrink-0" />
            )}
          </button>
        </div>

        {/* Strict Constraint Notice: Numbers remain English digits */}
        <div className="p-3.5 bg-slate-950/80 border border-slate-800/80 rounded-xl text-xs text-slate-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{t.numbersRemainEnglishNote} (e.g. 0.123456 USDT, $142.50, 24h)</span>
        </div>
      </div>

      {/* 2. USER IDENTITY CARD */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-emerald-400" />
          {t.validatorProfile}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl">
            <span className="text-slate-400 block">{t.userId}</span>
            <span className="text-sm font-mono text-white font-medium mt-1 block">
              {currentUser.id}
            </span>
          </div>

          <div className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl">
            <span className="text-slate-400 block">{t.fullName}</span>
            <span className="text-sm text-white font-medium mt-1 block">
              {currentUser.name}
            </span>
          </div>

          <div className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl">
            <span className="text-slate-400 block">{t.emailAddress}</span>
            <span className="text-sm text-white font-medium mt-1 block">
              {currentUser.email}
            </span>
          </div>

          <div className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl">
            <span className="text-slate-400 block">{t.networkTier}</span>
            <span className="text-sm text-emerald-400 font-medium mt-1 block">
              {currentUser.tier || 'Standard Validator'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. PROTOTYPE STATUS CARD */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-400" />
          {t.prototypeMode}
        </h3>

        <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl text-xs space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>Frontend Prototype Active (In-Memory React Context)</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            {t.prototypeDesc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
