import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { SortDesc } from 'lucide-react';

const ProductSort = () => {
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-2 mb-4">
      <div className="flex items-center">
        <SortDesc className="w-5 h-5 mr-2" />
        <span className="text-sm font-medium">Sort by :</span>
        <select 
          className="ml-2 text-sm border-none focus:ring-0 focus:outline-none"
          defaultValue="latest"
        >
          <option value="latest">Latest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className="text-sm text-gray-500">
        Showing Products
      </div>
    </div>
  );
};

export default ProductSort;
