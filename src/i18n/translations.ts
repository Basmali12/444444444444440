export type Language = 'en' | 'ar';

export interface Translations {
  // Navigation
  dashboard: string;
  counters: string;
  wallet: string;
  referrals: string;
  settings: string;
  corePlatform: string;
  active: string;
  liveSession: string;

  // Sidebar info
  networkSynced: string;
  epoch: string;
  ping: string;

  // Topbar
  availableBalance: string;
  rewardBox: string;
  rewardBoxBalance: string;
  refCode: string;
  notifications: string;
  markAllAsRead: string;
  noNotifications: string;
  close: string;
  newCount: string;

  // Wallet
  mainWallet: string;
  withdrawable: string;
  lifetimeEarnings: string;
  totalWithdrawn: string;
  instantLiquidity: string;
  referralProgram: string;
  pendingCommission: string;
  accruedFromInvites: string;
  readyToTransfer: string;
  noPendingRewards: string;
  transferToWallet: string;
  transferSuccess: string;
  financialHub: string;
  treasuryTitle: string;
  treasurySubtitle: string;
  gasSubsidy: string;
  free: string;
  recentTransactions: string;
  realtimeFeed: string;

  // Ledger Table
  txId: string;
  type: string;
  description: string;
  dateTime: string;
  status: string;
  amount: string;
  searchPlaceholder: string;
  filterAll: string;
  filterRewards: string;
  filterReferrals: string;
  filterPurchases: string;
  filterTransfers: string;
  showingEvents: string;
  auditSynced: string;
  noTxFound: string;
  completed: string;
  pending: string;
  failed: string;

  // Counter Card
  running: string;
  waiting: string;
  expired: string;
  current24hReward: string;
  dailyTarget: string;
  unitPrice: string;
  cycleProgress: string;
  daysLeft: string;
  cycles: string;
  startCycle: string;
  startCycleClicked: string;
  miningActive: string;
  cycleCompletedAll: string;
  highPrecision: string;

  // Dev Tools Time Control
  devToolsTitle: string;
  devToolsSandbox: string;
  devToolsSubtitle: string;
  fastForward12h: string;
  complete24h: string;
  runningNodes: string;
  waitingNodes: string;
  ffApplied: string;
  cycleSimulated: string;

  // Counters Page
  counterPortfolio: string;
  counterSubtitle: string;
  activeDailyYield: string;
  hardwareUnits: string;

  // Referrals Page
  referralHeroTag: string;
  referralHeroTitle: string;
  referralHeroSubtitle: string;
  yourCode: string;
  copyCode: string;
  copied: string;
  totalDownline: string;
  unclaimed: string;
  allTimeOutput: string;
  downlineActiveUnits: string;
  devToolsReferralTitle: string;
  simulateReferral: string;
  simulateNotice: string;
  treeTitle: string;
  treeSubtitle: string;
  hierarchicalTree: string;
  tierBreakdown: string;
  level1Title: string;
  level2Title: string;
  level3Title: string;
  members: string;
  earned: string;
  nodesActive: string;
  vol: string;
  commGenerated: string;
  subRef: string;
  youRoot: string;
  rootSponsor: string;
  totalDownlineYield: string;

  // Settings
  settingsTitle: string;
  settingsSubtitle: string;
  languageSelect: string;
  languageSelectDesc: string;
  english: string;
  arabic: string;
  activeLanguage: string;
  numbersRemainEnglishNote: string;
  validatorProfile: string;
  userId: string;
  fullName: string;
  emailAddress: string;
  networkTier: string;
  prototypeMode: string;
  prototypeDesc: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    dashboard: 'Dashboard',
    counters: 'My Counters',
    wallet: 'Wallet',
    referrals: 'Referrals',
    settings: 'Settings',
    corePlatform: 'Core Platform',
    active: 'Active',
    liveSession: 'Live Session',

    networkSynced: 'Network Synced',
    epoch: 'Epoch: #8,421',
    ping: '24ms ping',

    availableBalance: 'Available Balance',
    rewardBox: 'Reward Box',
    rewardBoxBalance: 'Reward Box',
    refCode: 'Ref:',
    notifications: 'Notifications',
    markAllAsRead: 'Mark all as read',
    noNotifications: 'No notifications yet.',
    close: 'Close',
    newCount: 'new',

    mainWallet: 'Main Wallet',
    withdrawable: 'Withdrawable',
    lifetimeEarnings: 'Lifetime Earnings',
    totalWithdrawn: 'Total Withdrawn',
    instantLiquidity: 'Instant liquidity · Available for withdrawals and node purchases',
    referralProgram: 'Referral Program',
    pendingCommission: 'Pending Commission',
    accruedFromInvites: 'Accrued from network invitations and tier-1 referee mining cycles.',
    readyToTransfer: 'Ready to transfer to main withdrawable wallet',
    noPendingRewards: 'No pending referral rewards right now',
    transferToWallet: 'Transfer to Wallet',
    transferSuccess: 'transferred to Available Balance!',
    financialHub: 'Financial Management Hub',
    treasuryTitle: 'Wallet & Referral Treasury',
    treasurySubtitle: 'Real-time balance settlement across your primary withdrawable account and incoming referral reward allocations.',
    gasSubsidy: 'Gas Subsidy:',
    free: '100% Free',
    recentTransactions: 'Recent Transactions',
    realtimeFeed: 'Real-time Ledger Feed',

    txId: 'Transaction ID',
    type: 'Type',
    description: 'Description',
    dateTime: 'Date & Time',
    status: 'Status',
    amount: 'Amount',
    searchPlaceholder: 'Search by ID or description...',
    filterAll: 'All',
    filterRewards: 'Rewards',
    filterReferrals: 'Referrals',
    filterPurchases: 'Purchases',
    filterTransfers: 'Transfers',
    showingEvents: 'Showing recorded events',
    auditSynced: 'Audit Timestamp: Synced',
    noTxFound: 'No transactions found matching your criteria',
    completed: 'completed',
    pending: 'pending',
    failed: 'failed',

    running: 'Running',
    waiting: 'Waiting',
    expired: 'Expired',
    current24hReward: 'Current 24h Cycle Reward',
    dailyTarget: 'Daily Target:',
    unitPrice: 'Price:',
    cycleProgress: 'Cycle Progress',
    daysLeft: 'days left',
    cycles: 'Cycles:',
    startCycle: 'Start Cycle',
    startCycleClicked: 'Start cycle clicked',
    miningActive: 'Accumulating real-time yields',
    cycleCompletedAll: 'Cycle completed all 60 days',
    highPrecision: '50ms high-precision interval',

    devToolsTitle: 'Dev Tools: Time Control',
    devToolsSandbox: 'Simulation Sandbox',
    devToolsSubtitle: 'Manipulate 24-hour cycle progression: test Start → Fast Forward → Complete → Receive Balance.',
    fastForward12h: 'Fast Forward 12 Hours',
    complete24h: 'Complete 24h Cycle',
    runningNodes: 'Running',
    waitingNodes: 'Waiting',
    ffApplied: 'Fast-forwarded active nodes by 12 hours (-43,200,000 ms). Progress shifted +50%.',
    cycleSimulated: 'Simulated 24h completion: Nodes set to Waiting, cycles incremented, rewards credited to Wallet!',

    counterPortfolio: 'Cloud Counter Portfolio',
    counterSubtitle: 'Each active counter executes a continuous 24-hour cycle. Test the full lifecycle below: Start Cycle → Fast Forward 12h → Complete 24h → Collect Earnings.',
    activeDailyYield: 'Active Daily Yield',
    hardwareUnits: 'Active Hardware Units',

    referralHeroTag: 'Tier-3 Partner Ecosystem',
    referralHeroTitle: 'Referral Rewards & Downline',
    referralHeroSubtitle: 'Earn continuous passive bonuses whenever members across your 3 tiers deploy or run 24-hour cloud counters.',
    yourCode: 'Your Code:',
    copyCode: 'Copy Code',
    copied: 'Copied',
    totalDownline: 'Total Downline Invited',
    unclaimed: 'Unclaimed',
    allTimeOutput: 'All-time Referral Output',
    downlineActiveUnits: 'Downline Active Units',
    devToolsReferralTitle: 'Dev Tools: Downline Commission Simulator',
    simulateReferral: 'Dev Tools: Simulate Referral',
    simulateNotice: 'Downline cycle completed! +$0.375 USDT added to your Reward Box.',
    treeTitle: 'Network Referral Tree',
    treeSubtitle: 'Multi-tier downline structure distributing automated commission yields on every 24h cycle.',
    hierarchicalTree: 'Hierarchical Tree',
    tierBreakdown: 'Tier Breakdown',
    level1Title: 'Level 1 (Direct - 5%)',
    level2Title: 'Level 2 (Tier 2 - 2.5%)',
    level3Title: 'Level 3 (Tier 3 - 1%)',
    members: 'members',
    earned: 'Earned',
    nodesActive: 'Nodes Active',
    vol: 'Vol:',
    commGenerated: 'Comm. Generated',
    subRef: 'Sub-ref',
    youRoot: 'YOU',
    rootSponsor: 'Root Sponsor',
    totalDownlineYield: 'Total Downline Yield',

    settingsTitle: 'Platform & Node Settings',
    settingsSubtitle: 'Configure system language, validator identity, connected credentials, and simulation tools.',
    languageSelect: 'Interface Language',
    languageSelectDesc: 'Choose your preferred platform language. Numbers and counters remain in standard digits.',
    english: 'English',
    arabic: 'العربية (Arabic)',
    activeLanguage: 'Active',
    numbersRemainEnglishNote: 'ملاحظة: تبقى جميع أرقام العدادات والمبالغ بالصيغة الإنجليزية للأرقام.',
    validatorProfile: 'Validator Profile (Mock User)',
    userId: 'User Identifier (ID)',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    networkTier: 'Network Tier',
    prototypeMode: 'Prototype Infrastructure Mode',
    prototypeDesc: 'All state transitions (claiming rewards, activating counter cycles, balance updates, ledger records) are managed dynamically through the global AppContext.',
  },
  ar: {
    dashboard: 'لوحة التحكم',
    counters: 'عداداتي السحابية',
    wallet: 'المحفظة والسجل',
    referrals: 'نظام الإحالات',
    settings: 'الإعدادات',
    corePlatform: 'النظام الأساسي',
    active: 'نشط',
    liveSession: 'جلسة مباشرة',

    networkSynced: 'متصل بالشبكة',
    epoch: 'الحقبة: #8,421',
    ping: 'استجابة 24ms',

    availableBalance: 'الرصيد المتاح للسحب',
    rewardBox: 'صندوق المكافآت',
    rewardBoxBalance: 'صندوق المكافآت',
    refCode: 'كود الإحالة:',
    notifications: 'الإشعارات',
    markAllAsRead: 'تعيين الكل كمقروء',
    noNotifications: 'لا توجد إشعارات حالياً.',
    close: 'إغلاق',
    newCount: 'جديد',

    mainWallet: 'المحفظة الرئيسية',
    withdrawable: 'قابل للسحب الفوري',
    lifetimeEarnings: 'إجمالي الأرباح التاريخية',
    totalWithdrawn: 'إجمالي المسحوبات',
    instantLiquidity: 'سيولة فورية · متاح للسحب وشراء العدادات السحابية',
    referralProgram: 'برنامج الإحالات',
    pendingCommission: 'عمولة معلقة جاهزة للتحويل',
    accruedFromInvites: 'مستحقة من دورات تعدين أعضاء شبكة الإحالات التابعة لك.',
    readyToTransfer: 'جاهز للتحويل الفوري إلى رصيد المحفظة المتاح',
    noPendingRewards: 'لا توجد مكافآت إحالة معلقة حالياً',
    transferToWallet: 'تحويل إلى المحفظة',
    transferSuccess: 'تم التحويل إلى الرصيد المتاح بنجاح!',
    financialHub: 'مركز الإدارة المالية والمحفظة',
    treasuryTitle: 'خزينة المحفظة ومكافآت الإحالات',
    treasurySubtitle: 'تسوية فورية للأرصدة بين حسابك القابل للسحب ومخصصات مكافآت الإحالات التراكمية.',
    gasSubsidy: 'دعم رسوم المعاملات:',
    free: 'مجاني بالكامل 100%',
    recentTransactions: 'سجل المعاملات المالية الحديثة',
    realtimeFeed: 'سجل تدقيق حي ومباشر',

    txId: 'معرف المعاملة',
    type: 'النوع',
    description: 'الوصف والبيان',
    dateTime: 'التاريخ والوقت',
    status: 'الحالة',
    amount: 'المبلغ',
    searchPlaceholder: 'البحث بالمعرف أو الوصف...',
    filterAll: 'الكل',
    filterRewards: 'المكافآت',
    filterReferrals: 'الإحالات',
    filterPurchases: 'المشتريات',
    filterTransfers: 'التحويلات',
    showingEvents: 'عرض الأحداث المسجلة في السجل',
    auditSynced: 'وقت التدقيق: متزامن',
    noTxFound: 'لم يتم العثور على معاملات مطابقة لمعايير البحث',
    completed: 'مكتمل',
    pending: 'قيد الانتظار',
    failed: 'فشل',

    running: 'يعمل الآن',
    waiting: 'قيد التفعيل',
    expired: 'منتهي الصلاحية',
    current24hReward: 'عائد دورة 24 ساعة الحالية',
    dailyTarget: 'الهدف اليومي:',
    unitPrice: 'السعر:',
    cycleProgress: 'تقدم الدورة',
    daysLeft: 'يوم متبقي',
    cycles: 'الدورات:',
    startCycle: 'بدء الدورة',
    startCycleClicked: 'تم النقر على بدء الدورة',
    miningActive: 'توليد أرباح لحظية ومستمرة',
    cycleCompletedAll: 'أكمل العداد جميع دورات الـ 60 يوماً',
    highPrecision: 'دقة حساب كل 50ms',

    devToolsTitle: 'أدوات المطور: التحكم في الزمن',
    devToolsSandbox: 'بيئة الاختبار التجريبية',
    devToolsSubtitle: 'محاكاة تقدم دورة الـ 24 ساعة: اختبر البدء ← تقديم 12 ساعة ← إتمام الدورة ← استلام الرصيد.',
    fastForward12h: 'تقديم 12 ساعة سريعة',
    complete24h: 'إتمام دورة 24 ساعة بالكامل',
    runningNodes: 'تعمل',
    waitingNodes: 'تنتظر',
    ffApplied: 'تم تقديم العدادات النشطة 12 ساعة (-43,200,000 ms). تقدم المؤشر بنسبة 50%.',
    cycleSimulated: 'تمت محاكاة إتمام دورة 24 ساعة: العدادات في وضع الانتظار، وتمت إضافة الأرباح للمحفظة!',

    counterPortfolio: 'محفظة العدادات السحابية',
    counterSubtitle: 'يقوم كل عداد نشط بتشغيل دورة مستمرة مدتها 24 ساعة. اختبر دورة الحياة الكاملة: بدء الدورة ← تقديم 12 ساعة ← إتمام 24 ساعة ← جني الأرباح.',
    activeDailyYield: 'العائد اليومي النشط',
    hardwareUnits: 'وحدات التعدين السحابي',

    referralHeroTag: 'منظومة شركاء الشبكة ثلاثية المستويات',
    referralHeroTitle: 'مكافآت الإحالات وشبكة الفريق',
    referralHeroSubtitle: 'اكسب عوائد سلبية مستمرة كلما قام أعضاء مستوياتك الثلاثة بتشغيل عداداتهم السحابية اليومية.',
    yourCode: 'كود الإحالة الخاص بك:',
    copyCode: 'نسخ الكود',
    copied: 'تم النسخ',
    totalDownline: 'إجمالي الأعضاء المدعوين',
    unclaimed: 'غير مطالب به',
    allTimeOutput: 'إجمالي أرباح الإحالات التاريخية',
    downlineActiveUnits: 'وحدات نشطة في الشبكة',
    devToolsReferralTitle: 'أدوات المطور: محاكي عمولة الإحالات',
    simulateReferral: 'محاكاة اكتمال دورة إحالة',
    simulateNotice: 'أكمل عضو في شبكتك دورة تعدين! تمت إضافة +$0.375 USDT إلى صندوق المكافآت.',
    treeTitle: 'شجرة شبكة الإحالات الهرمية',
    treeSubtitle: 'هيكل متعدد المستويات يوزع عمولات دورات التعدين تلقائياً على كل دورة 24 ساعة.',
    hierarchicalTree: 'الشجرة الهرمية',
    tierBreakdown: 'تفصيل المستويات',
    level1Title: 'المستوى 1 (مباشر - 5%)',
    level2Title: 'المستوى 2 (الطبقة الثانية - 2.5%)',
    level3Title: 'المستوى 3 (الشبكة العامة - 1%)',
    members: 'أعضاء',
    earned: 'تم كسبه',
    nodesActive: 'عدادات نشطة',
    vol: 'الحجم:',
    commGenerated: 'العمولة المتولدة',
    subRef: 'إحالات فرعية',
    youRoot: 'أنت',
    rootSponsor: 'المشرف الرئيسي',
    totalDownlineYield: 'إجمالي عائدات الشبكة',

    settingsTitle: 'إعدادات النظام والمنصة',
    settingsSubtitle: 'اختيار لغة النظام، بيانات حساب المدقق، المفاتيح وأدوات الاختبار.',
    languageSelect: 'لغة واجهة النظام',
    languageSelectDesc: 'اختر لغة النظام المفضلة لديك. يتم تعريب الواجهة بالكامل مع بقاء أرقام العدادات والمبالغ بالإنجليزية.',
    english: 'English (الإنجليزية)',
    arabic: 'العربية (Arabic)',
    activeLanguage: 'اللغة الحالية',
    numbersRemainEnglishNote: 'ملاحظة: تبقى جميع أرقام العدادات والمبالغ بالصيغة الإنجليزية للأرقام.',
    validatorProfile: 'ملف المدقق الشخصي (بيانات تجريبية)',
    userId: 'معرف المستخدم (ID)',
    fullName: 'الاسم بالكامل',
    emailAddress: 'البريد الإلكتروني',
    networkTier: 'مستوى عقدة التحقق',
    prototypeMode: 'وضع النموذج الأولي للنظام',
    prototypeDesc: 'تتم إدارة جميع انتقالات الحالة (تحويل المكافآت، تشغيل دورات العدادات، تحديث الأرصدة، وسجل المعاملات) ديناميكياً عبر سياق AppContext.',
  },
};
