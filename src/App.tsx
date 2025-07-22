import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { UserManagement } from './components/UserManagement';
import { CorrespondenceSystem } from './components/CorrespondenceSystem';
import { AttendanceTracking } from './components/AttendanceTracking';
import { BillingPayment } from './components/BillingPayment';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'correspondence':
        return <CorrespondenceSystem />;
      case 'attendance':
        return <AttendanceTracking />;
      case 'billing':
        return <BillingPayment />;
      case 'meetings':
        return <div className="bg-white rounded-xl p-8 shadow-sm text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">مدیریت جلسات</h2>
          <p className="text-gray-500">در حال توسعه...</p>
        </div>;
      case 'projects':
        return <div className="bg-white rounded-xl p-8 shadow-sm text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">مدیریت پروژه‌ها</h2>
          <p className="text-gray-500">در حال توسعه...</p>
        </div>;
      case 'customers':
        return <div className="bg-white rounded-xl p-8 shadow-sm text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">مدیریت مشتریان</h2>
          <p className="text-gray-500">در حال توسعه...</p>
        </div>;
      case 'messages':
        return <div className="bg-white rounded-xl p-8 shadow-sm text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">پیام‌های داخلی</h2>
          <p className="text-gray-500">در حال توسعه...</p>
        </div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderActiveComponent()}
      </Layout>
    </div>
  );
}

export default App;