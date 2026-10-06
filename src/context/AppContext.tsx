import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  Wallet,
  Counter,
  LedgerTransaction,
  NotificationItem,
  ReferralTreeData,
} from '../types';
import {
  mockCurrentUser,
  mockWallet,
  mockCounters,
  mockLedger,
  mockNotifications,
  mockReferrals,
} from '../mockData';
import { Language, Translations, translations } from '../i18n/translations';

export interface AppContextType {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  wallet: Wallet;
  setWallet: React.Dispatch<React.SetStateAction<Wallet>>;
  counters: Counter[];
  setCounters: React.Dispatch<React.SetStateAction<Counter[]>>;
  ledger: LedgerTransaction[];
  setLedger: React.Dispatch<React.SetStateAction<LedgerTransaction[]>>;
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  unreadNotificationsCount: number;
  referrals: ReferralTreeData;
  setReferrals: React.Dispatch<React.SetStateAction<ReferralTreeData>>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  // Language & i18n
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  // State operations & developer time controls
  transferRewardToWallet: () => void;
  claimRewardBox: () => void; // alias for transferRewardToWallet
  simulateReferralCommission: () => void;
  activateCounter: (counterId: string) => void;
  startCounterCycle: (counterId: string) => void;
  fastForward12Hours: () => void;
  complete24hCycle: () => void;
  addTransaction: (tx: Omit<LedgerTransaction, 'id'>) => void;
  markNotificationsAsRead: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(mockCurrentUser);
  const [wallet, setWallet] = useState<Wallet>(mockWallet);
  const [counters, setCounters] = useState<Counter[]>(mockCounters);
  const [ledger, setLedger] = useState<LedgerTransaction[]>(mockLedger);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [referrals, setReferrals] = useState<ReferralTreeData>(mockReferrals);
  const [activeTab, setActiveTab] = useState<string>('settings');
  const [language, setLanguage] = useState<Language>('ar'); // Default to Arabic or switchable to demonstrate immediately

  // Update HTML dir and lang attributes when language changes
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // transferRewardToWallet:
  const transferRewardToWallet = () => {
    if (wallet.rewardBoxBalance <= 0) return;

    const transferAmount = wallet.rewardBoxBalance;
    const now = Date.now();

    setWallet((prev) => ({
      ...prev,
      availableBalance: +(prev.availableBalance + transferAmount).toFixed(2),
      rewardBoxBalance: 0,
      totalEarned: +((prev.totalEarned || 0) + transferAmount).toFixed(2),
    }));

    // Add to ledger
    const newTx: LedgerTransaction = {
      id: `tx_${Date.now()}`,
      type: 'reward_box_release',
      amount: transferAmount,
      date: now,
      status: 'completed',
      description:
        language === 'ar'
          ? `تحويل $${transferAmount.toFixed(2)} USDT من صندوق المكافآت إلى المحفظة الرئيسية`
          : `Released $${transferAmount.toFixed(2)} USDT from Reward Box into Main Wallet`,
    };
    setLedger((prev) => [newTx, ...prev]);

    // Push notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: language === 'ar' ? 'تم تحويل مكافآت الإحالات' : 'Reward Box Transferred',
      message:
        language === 'ar'
          ? `تمت إضافة +$${transferAmount.toFixed(2)} USDT إلى رصيدك المتاح بنجاح.`
          : `+$${transferAmount.toFixed(2)} USDT has been successfully credited to your Available Balance.`,
      timestamp: now,
      read: false,
      type: 'reward',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const claimRewardBox = () => {
    transferRewardToWallet();
  };

  // simulateReferralCommission:
  const simulateReferralCommission = () => {
    const commissionAmount = 0.375;
    const now = Date.now();

    setWallet((prev) => ({
      ...prev,
      rewardBoxBalance: +(prev.rewardBoxBalance + commissionAmount).toFixed(4),
      totalEarned: +((prev.totalEarned || 0) + commissionAmount).toFixed(4),
    }));

    const randomReferees = ['@crypto_dave', '@marcus_k', '@sarah_node', '@zack_web3'];
    const chosenReferee = randomReferees[Math.floor(Math.random() * randomReferees.length)];

    const newTx: LedgerTransaction = {
      id: `tx_${Date.now()}`,
      type: 'referral_reward',
      amount: commissionAmount,
      date: now,
      status: 'completed',
      description:
        language === 'ar'
          ? `عائد دورة إحالة: +$${commissionAmount.toFixed(3)} من ${chosenReferee}`
          : `Downline cycle reward: +$${commissionAmount.toFixed(3)} from ${chosenReferee}`,
    };
    setLedger((prev) => [newTx, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: language === 'ar' ? 'تم استلام عمولة إحالة جديدة' : 'Referral Commission Accrued',
      message:
        language === 'ar'
          ? `+$${commissionAmount.toFixed(3)} USDT تمت إضافتها لصندوق المكافآت من ${chosenReferee}.`
          : `+$${commissionAmount.toFixed(3)} USDT added to Reward Box from downline cycle (${chosenReferee}).`,
      timestamp: now,
      read: false,
      type: 'referral',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Start counter cycle
  const startCounterCycle = (counterId: string) => {
    const now = Date.now();
    setCounters((prev) =>
      prev.map((c) => {
        if (c.id === counterId) {
          return {
            ...c,
            status: 'running',
            cycleStartedAt: now,
            expiresAt: c.expiresAt ? c.expiresAt : now + c.durationDays * 24 * 60 * 60 * 1000,
          };
        }
        return c;
      })
    );

    const newTx: LedgerTransaction = {
      id: `tx_${Date.now()}`,
      type: 'cycle_activation',
      amount: 0,
      date: now,
      status: 'completed',
      description:
        language === 'ar'
          ? `بدء دورة 24 ساعة جديدة للعداد: ${counterId}`
          : `Started new 24h cycle for node: ${counterId}`,
      referenceId: counterId,
    };
    setLedger((prev) => [newTx, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: language === 'ar' ? 'بدأت دورة التعدين السحابي' : 'Mining Cycle Started',
      message:
        language === 'ar'
          ? `العداد ${counterId} يعمل الآن بنشاط في دورة الـ 24 ساعة.`
          : `Node ${counterId} is now actively running its 24h reward cycle.`,
      timestamp: now,
      read: false,
      type: 'cycle',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const activateCounter = (counterId: string) => {
    startCounterCycle(counterId);
  };

  // Dev Tool: Fast Forward 12 Hours
  const fastForward12Hours = () => {
    const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;
    const now = Date.now();

    setCounters((prev) =>
      prev.map((c) => {
        if (c.status === 'running') {
          const currentStart = c.cycleStartedAt || now;
          return {
            ...c,
            cycleStartedAt: currentStart - TWELVE_HOURS_MS,
          };
        }
        return c;
      })
    );

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: language === 'ar' ? 'أدوات المطور: تقديم 12 ساعة' : 'Dev Time Travel: +12 Hours',
      message:
        language === 'ar'
          ? 'تم تقديم وقت العدادات النشطة 12 ساعة (تقدم المؤشر 50%).'
          : 'Fast forwarded active cycles by 12 hours (progress advanced ~50%).',
      timestamp: now,
      read: false,
      type: 'system',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Dev Tool: Complete 24h Cycle
  const complete24hCycle = () => {
    const now = Date.now();
    let totalCreditedReward = 0;
    const creditedUnits: string[] = [];

    setCounters((prev) =>
      prev.map((c) => {
        if (c.status === 'running') {
          totalCreditedReward += c.dailyReward;
          creditedUnits.push(c.name || c.id);
          const nextCompleted = c.completedCycles + 1;
          const isExpired = nextCompleted >= c.durationDays;

          return {
            ...c,
            status: isExpired ? 'expired' : 'waiting_activation',
            completedCycles: nextCompleted,
            cycleStartedAt: null,
          };
        }
        return c;
      })
    );

    if (totalCreditedReward > 0) {
      setWallet((prev) => ({
        ...prev,
        availableBalance: +(prev.availableBalance + totalCreditedReward).toFixed(2),
        totalEarned: +((prev.totalEarned || 0) + totalCreditedReward).toFixed(2),
      }));

      const newTx: LedgerTransaction = {
        id: `tx_${Date.now()}`,
        type: 'daily_reward',
        amount: +totalCreditedReward.toFixed(2),
        date: now,
        status: 'completed',
        description:
          language === 'ar'
            ? `اكتمال دورة 24 ساعة: إضافة أرباح لـ ${creditedUnits.length} عداد(ات)`
            : `24h cycle completed: Payout for ${creditedUnits.length} node(s) (${creditedUnits.join(', ')})`,
      };
      setLedger((prev) => [newTx, ...prev]);

      const newNotif: NotificationItem = {
        id: `notif_${Date.now()}`,
        title:
          language === 'ar'
            ? 'اكتملت دورة 24 ساعة: تم إيداع الأرباح'
            : '24h Cycle Complete: Rewards Credited',
        message:
          language === 'ar'
            ? `تمت إضافة +$${totalCreditedReward.toFixed(2)} USDT إلى رصيدك المتاح.`
            : `+$${totalCreditedReward.toFixed(2)} USDT added to Available Balance from ${creditedUnits.length} counter(s).`,
        timestamp: now,
        read: false,
        type: 'reward',
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }
  };

  const addTransaction = (tx: Omit<LedgerTransaction, 'id'>) => {
    const newTx: LedgerTransaction = {
      ...tx,
      id: `tx_${Date.now()}`,
    };
    setLedger((prev) => [newTx, ...prev]);
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const value: AppContextType = {
    currentUser,
    setCurrentUser,
    wallet,
    setWallet,
    counters,
    setCounters,
    ledger,
    setLedger,
    notifications,
    setNotifications,
    unreadNotificationsCount,
    referrals,
    setReferrals,
    activeTab,
    setActiveTab,
    language,
    setLanguage,
    t,
    transferRewardToWallet,
    claimRewardBox,
    simulateReferralCommission,
    activateCounter,
    startCounterCycle,
    fastForward12Hours,
    complete24hCycle,
    addTransaction,
    markNotificationsAsRead,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
