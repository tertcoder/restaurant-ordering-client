import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Order } from '../types';
import { orders } from '../api';
import { useAuthStore } from '../store/useAuthStore';
import OrderCard from '../components/orders/OrderCard';

const Orders = () => {
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  const fetchOrders = async () => {
    try {
      const data = await orders.getUserOrders(user!.id);
      setUserOrders(data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      <div className="space-y-6">
        {userOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onUpdate={fetchOrders}
          />
        ))}
        {userOrders.length === 0 && (
          <p className="text-center text-gray-600">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;