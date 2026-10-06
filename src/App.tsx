/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { DashboardView } from './components/views/DashboardView';
import { CountersView } from './components/views/CountersView';
import { WalletView } from './components/views/WalletView';
import { ReferralsView } from './components/views/ReferralsView';
import { SettingsView } from './components/views/SettingsView';

const AppContent: React.FC = () => {
  const { activeTab } = useAppContext();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'counters':
        return <CountersView />;
      case 'wallet':
        return <WalletView />;
      case 'referrals':
        return <ReferralsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return <Layout>{renderActiveView()}</Layout>;
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
