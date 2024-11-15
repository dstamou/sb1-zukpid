export interface Transaction {
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

export interface Category {
  id: string;
  name: string;
  color: string;
  budget?: number;
}

export interface ChartData {
  name: string;
  value: number;
}