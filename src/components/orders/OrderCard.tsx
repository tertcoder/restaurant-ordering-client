import React from 'react';
import { Order } from '../../types';
import OrderActions from './OrderActions';

interface Props {
  order: Order;
  onUpdate: () => void;
}

const OrderCard: React.FC<Props> = ({ order, onUpdate }) => {
  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    PREPARING: 'bg-blue-100 text-blue-800',
    READY: 'bg-green-100 text-green-800',
    DELIVERED: 'bg-gray-100 text-gray-800',
    CANCELLED: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-600">Order ID: {order.id}</p>
          <p className="text-sm text-gray-600">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[order.status]}`}>
          {order.status}
        </span>
      </div>
      <div className="space-y-2">
        {order.items.map((item) => (
          <div key={item.menuItemId} className="flex justify-between">
            <span>
              {item.quantity}x {item.name}
            </span>
            <span>BIF {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>BIF {order.totalPrice.toFixed(2)}</span>
        </div>
      </div>
      <OrderActions order={order} onUpdate={onUpdate} />
    </div>
  );
};

export default OrderCard;