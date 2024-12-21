import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { MenuItem } from '../types';
import { menu } from '../api';
import MenuItemCard from '../components/menu/MenuItemCard';
import CategoryFilter from '../components/menu/CategoryFilter';

const Menu = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchMenu();
  }, []);

  const categories = ['all', ...new Set(items.map(item => item.category))];
  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Our Menu</h1>
      <CategoryFilter 
        categories={categories} 
        selected={selectedCategory} 
        onChange={setSelectedCategory} 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredItems.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;