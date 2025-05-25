'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/admin/Navigation';
import OrganizationOverview from '@/components/admin/OrganizationOverview';
import TabNavigation from '@/components/admin/TabNavigation';
import Dashboard from '@/components/admin/Dashboard';
import PassManagement from '@/components/admin/PassManagement';
import PassDetail from '@/components/admin/PassDetail';
import { TabType } from '@/types/admin';
import { 
  existingPasses, 
  passHolders, 
  activities, 
  organization, 
  analytics, 
  passTransactions 
} from '@/data/mockData';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedPassId, setSelectedPassId] = useState<string>('');

  const handlePassDetail = (passId: string) => {
    setSelectedPassId(passId);
    setActiveTab('pass-detail');
  };

  const handlePassStatus = (holderId: string, newStatus: 'active' | 'expired' | 'revoked') => {
    // TODO: Implement pass status update logic
    console.log('Updating pass status:', { holderId, newStatus });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation Bar */}
      <Navigation organization={organization} />

      {/* Main Content */}
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold mb-4">접근 관리 대시보드</h1>
              <p className="text-xl text-gray-200">액세스 패스 발급 및 관리</p>
            </motion.div>
          </div>
        </div>

        {/* Organization Overview */}
        <OrganizationOverview organization={organization} />

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tab Navigation */}
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <Dashboard 
              existingPasses={existingPasses}
              passHolders={passHolders}
              activities={activities}
              analytics={analytics}
              setActiveTab={setActiveTab}
            />
          )}

          {/* Pass Management Tab */}
          {activeTab === 'pass-management' && (
            <PassManagement 
              existingPasses={existingPasses}
              onPassDetail={handlePassDetail}
            />
          )}

                     {/* Pass Detail Tab */}
           {activeTab === 'pass-detail' && selectedPassId && (
             <PassDetail 
               selectedPassId={selectedPassId}
               existingPasses={existingPasses}
               passHolders={passHolders}
               passTransactions={passTransactions}
               setActiveTab={setActiveTab}
               onPassStatus={handlePassStatus}
             />
           )}
        </div>
      </div>
    </div>
  );
}