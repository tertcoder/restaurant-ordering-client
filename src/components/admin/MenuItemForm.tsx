import React, { useState, useEffect } from 'react';
import { MenuItem } from '../../types';

interface Props {
  onSubmit: (formData: FormData) => Promise<void>;
  initialValues?: MenuItem;
}

const MenuItemForm: React.FC<Props> = ({ onSubmit, initialValues }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name);
      setPrice(initialValues.price.toString());
      setCategory(initialValues.category);
      setAvailable(initialValues.available);
    }
  }, [initialValues]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('available', available.toString());

    const imageInput = e.currentTarget.querySelector<HTMLInputElement>('input[type="file"]');
    if (imageInput?.files?.[0]) {
      formData.append('image', imageInput.files[0]);
    }

    try {
      await onSubmit(formData);
      if (!initialValues) {
        // Only reset form if we're adding a new item
        setName('');
        setPrice('');
        setCategory('');
        setAvailable(true);
        imageInput!.value = '';
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            required={!initialValues}
            className="mt-1 block w-full"
          />
          {initialValues && (
            <p className="mt-1 text-sm text-gray-500">
              Leave empty to keep current image
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">Available</span>
          </label>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {loading ? (
            initialValues ? 'Updating...' : 'Adding...'
          ) : (
            initialValues ? 'Update Menu Item' : 'Add Menu Item'
          )}
        </button>
      </div>
    </form>
  );
};

export default MenuItemForm;