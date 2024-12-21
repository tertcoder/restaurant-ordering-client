import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { menu, orders } from '../api';
import AdminOrders from '../components/admin/AdminOrders';
import MenuManager from '../components/admin/MenuManager';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'menu'>('orders');

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'menu'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Menu Management
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'orders' ? <AdminOrders /> : <MenuManager />}
    </div>
  );
};

export default AdminDashboard;