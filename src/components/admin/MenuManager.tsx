import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { MenuItem } from '../../types';
import { menu } from '../../api';
import MenuItemForm from './MenuItemForm';
import { api } from '../../imagesrc';

const MenuManager = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await menu.getItems();
      setItems(data);
    } catch (error) {
      toast.error('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (formData: FormData) => {
    try {
      await menu.createItem(formData);
      toast.success('Menu item added successfully');
      fetchMenu();
      setEditingItem(null);
    } catch (error) {
      toast.error('Failed to add menu item');
    }
  };

  const handleEditItem = async (formData: FormData) => {
    if (!editingItem) return;

    try {
      await menu.updateItem(editingItem.id, formData);
      toast.success('Menu item updated successfully');
      fetchMenu();
      setEditingItem(null);
    } catch (error) {
      toast.error('Failed to update menu item');
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await menu.deleteItem(id);
      toast.success('Menu item deleted successfully');
      fetchMenu();
    } catch (error) {
      toast.error('Failed to delete menu item');
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
        </h2>
        <MenuItemForm
          onSubmit={editingItem ? handleEditItem : handleAddItem}
          initialValues={editingItem || undefined}
        />
        {editingItem && (
          <button
            onClick={() => setEditingItem(null)}
            className="mt-2 text-gray-600 hover:text-gray-800"
          >
            Cancel Editing
          </button>
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Current Menu Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={`${api}${item.imageUrl}`}
              alt={item.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600">{item.category}</p>
            <p className="text-lg font-bold mt-2">BIF {item.price.toFixed(2)}</p>
            <p className={`text-sm ${item.available ? 'text-green-600' : 'text-red-600'}`}>
              {item.available ? 'Available' : 'Sold Out'}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setEditingItem(item)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManager;