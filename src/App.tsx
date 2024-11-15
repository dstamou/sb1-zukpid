import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { DashboardMetrics } from './components/DashboardMetrics';
import { Transaction } from './types/finance';
import { LayoutDashboard, Upload, PieChart, Settings } from 'lucide-react';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleUpload = (newTransactions: Transaction[]) => {
    setTransactions(prev => [...prev, ...newTransactions]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <PieChart className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">FinanceTracker</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'upload'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Upload className="w-5 h-5" />
              <span>Upload</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'settings'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            {activeTab === 'dashboard' && (
              <>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <DashboardMetrics transactions={transactions} />
                {/* Add more dashboard components here */}
              </>
            )}
            
            {activeTab === 'upload' && (
              <>
                <h1 className="text-2xl font-bold text-gray-900">Upload Transactions</h1>
                <FileUpload onUpload={handleUpload} />
              </>
            )}
            
            {activeTab === 'settings' && (
              <>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                {/* Add settings components here */}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;