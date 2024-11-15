import React from 'react';
import { BarChart3, TrendingUp, Wallet } from 'lucide-react';
import { Transaction } from '../types/finance';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, trend, trendUp }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-indigo-50 rounded-lg">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
      </div>
      {trend && (
        <span className={`text-sm ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
          {trend}
        </span>
      )}
    </div>
  </div>
);

interface Props {
  transactions: Transaction[];
}

export const DashboardMetrics: React.FC<Props> = ({ transactions }) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Total Balance"
        value={`$${balance.toLocaleString()}`}
        icon={<Wallet className="w-6 h-6 text-indigo-600" />}
        trend="+2.5%"
        trendUp={true}
      />
      <MetricCard
        title="Monthly Income"
        value={`$${totalIncome.toLocaleString()}`}
        icon={<TrendingUp className="w-6 h-6 text-green-600" />}
        trend="+4.3%"
        trendUp={true}
      />
      <MetricCard
        title="Monthly Expenses"
        value={`$${totalExpenses.toLocaleString()}`}
        icon={<BarChart3 className="w-6 h-6 text-red-600" />}
        trend="-1.2%"
        trendUp={false}
      />
    </div>
  );
};