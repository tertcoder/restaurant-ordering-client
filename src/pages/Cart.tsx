import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { orders } from '../api';
import CartItem from '../components/cart/CartItem';

const Cart = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();
  const { user } = useAuthStore();

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }

    try {
      await orders.create({
        userId: user.id,
        items: items
      });
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error('Failed to place order');
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate('/menu')}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {items.map((item) => (
          <CartItem key={item.menuItemId} item={item} />
        ))}
        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between text-xl font-semibold">
            <span>Total:</span>
            <span>BIF {total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;