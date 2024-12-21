import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Order } from '../../types';
import { orders } from '../../api';
import ModifyOrderModal from './ModifyOrderModal';

interface Props {
  order: Order;
  onUpdate: () => void;
}

const OrderActions: React.FC<Props> = ({ order, onUpdate }) => {
  const [isModifying, setIsModifying] = useState(false);
  const canModify = order.status === 'PENDING';

  const handleCancel = async () => {
    try {
      await orders.cancelOrder(order.id);
      toast.success('Order cancelled successfully');
      onUpdate();
    } catch (error) {
      toast.error('Failed to cancel order');
    }
  };

  const handleModify = async (updatedItems: any[]) => {
    try {
      await orders.updateOrderItems(order.id, updatedItems);
      toast.success('Order updated successfully');
      setIsModifying(false);
      onUpdate();
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  return (
    <>
      <div className="mt-4 flex gap-4">
        {canModify ? (
          <>
            <button
              onClick={() => setIsModifying(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Modify Order
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Cancel Order
            </button>
          </>
        ) : (
          <p className="text-sm text-gray-500">
            Order can only be modified when pending
          </p>
        )}
      </div>

      <ModifyOrderModal
        order={order}
        isOpen={isModifying}
        onClose={() => setIsModifying(false)}
        onSubmit={handleModify}
      />
    </>
  );
};

export default OrderActions;