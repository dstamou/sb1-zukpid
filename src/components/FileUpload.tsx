import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import Papa from 'papaparse';
import { Transaction } from '../types/finance';

interface Props {
  onUpload: (transactions: Transaction[]) => void;
}

export const FileUpload: React.FC<Props> = ({ onUpload }) => {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, []);

  const handleFile = (file: File) => {
    Papa.parse(file, {
      complete: (results) => {
        const transactions = results.data.slice(1).map((row: any) => ({
          date: row[0],
          description: row[1],
          amount: parseFloat(row[2]),
          category: row[3] || 'Uncategorized',
          type: parseFloat(row[2]) >= 0 ? 'income' : 'expense'
        }));
        onUpload(transactions);
      },
      header: true
    });
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors cursor-pointer bg-white"
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="p-3 bg-indigo-50 rounded-full">
          <Upload className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Upload CSV File</h3>
          <p className="text-sm text-gray-500 mt-1">Drag and drop your transaction file here</p>
        </div>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          Select File
        </label>
      </div>
    </div>
  );
};