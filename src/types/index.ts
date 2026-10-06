export type CounterStatus = 'running' | 'waiting_activation' | 'expired';

export type TransactionStatus = 'completed' | 'pending' | 'failed';

export type TransactionType =
  | 'daily_reward'
  | 'counter_purchase'
  | 'referral_bonus'
  | 'withdrawal'
  | 'deposit'
  | 'cycle_activation';

export interface User {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  avatarUrl?: string;
  joinedDate?: string;
  tier?: string;
}

export interface Wallet {
  availableBalance: number;
  rewardBoxBalance: number;
  currency?: string;
  totalWithdrawn?: number;
  totalEarned?: number;
}

export interface Counter {
  id: string;
  name?: string;
  price: number;
  dailyReward: number;
  durationDays: number;
  createdAt: number;
  expiresAt: number;
  cycleStartedAt: number | null;
  status: CounterStatus;
  completedCycles: number;
  hashRate?: string;
  efficiency?: number;
}

export interface LedgerTransaction {
  id: string;
  type: TransactionType | string;
  amount: number;
  date: number; // timestamp
  status: TransactionStatus;
  description?: string;
  referenceId?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  type: 'reward' | 'cycle' | 'referral' | 'system';
}

export interface ReferralMember {
  id: string;
  name: string;
  username: string;
  level: 1 | 2 | 3;
  joinedAt: number;
  activeCounters: number;
  totalVolume: number; // in USDT
  commissionEarned: number; // in USDT
  status: 'active' | 'inactive';
  parentId?: string;
  children?: ReferralMember[];
}

export interface ReferralTreeData {
  level1: ReferralMember[];
  level2: ReferralMember[];
  level3: ReferralMember[];
}

export interface AppState {
  currentUser: User;
  wallet: Wallet;
  counters: Counter[];
  ledger: LedgerTransaction[];
  referrals: ReferralTreeData;
}
