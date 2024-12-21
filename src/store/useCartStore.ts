import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { OrderItem } from '../types';

interface CartState {
  items: OrderItem[];
  addItem: (item: OrderItem) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find((i) => i.menuItemId === item.menuItemId);
        
        if (existingItem) {
          const updatedItems = items.map((i) =>
            i.menuItemId === item.menuItemId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
          set({ items: updatedItems, total: calculateTotal(updatedItems) });
        } else {
          const updatedItems = [...items, item];
          set({ items: updatedItems, total: calculateTotal(updatedItems) });
        }
      },
      removeItem: (menuItemId) => {
        const items = get().items.filter((i) => i.menuItemId !== menuItemId);
        set({ items, total: calculateTotal(items) });
      },
      updateQuantity: (menuItemId, quantity) => {
        const items = get().items.map((item) =>
          item.menuItemId === menuItemId ? { ...item, quantity } : item
        );
        set({ items, total: calculateTotal(items) });
      },
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
);

const calculateTotal = (items: OrderItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};