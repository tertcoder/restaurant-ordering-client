import React from 'react';
import { toast } from 'react-hot-toast';
import { MenuItem } from '../../types';
import { useCartStore } from '../../store/useCartStore';
import { api } from '../../imagesrc';

interface Props {
  item: MenuItem;
}

const MenuItemCard: React.FC<Props> = ({ item }) => {
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1
    });
    toast.success(`Added ${item.name} to cart`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={item.imageUrl ? `${api}${item.imageUrl}` : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-4">{item.category}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">${item.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            disabled={!item.available}
            className={`px-4 py-2 rounded-full ${item.available
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 cursor-not-allowed'
              }`}
          >
            {item.available ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;