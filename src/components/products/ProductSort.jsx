import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { SortDesc } from 'lucide-react';

const ProductSort = ({ sortBy, onSortChange, totalProducts }) => {
  const { theme } = useTheme();

  const handleSortChange = (e) => {
    if (onSortChange) {
      onSortChange(e.target.value);
    }
  };

  return (
    <div 
      className="flex items-center justify-between rounded-lg shadow-sm p-3 mb-4"
      style={{ 
        backgroundColor: theme.background,
        borderColor: theme.borderColor,
        color: theme.text
      }}
    >
      <div className="flex items-center">
        <SortDesc className="w-5 h-5 mr-2" style={{ color: theme.primary }} />
        <span className="text-sm font-medium">Sort by :</span>
        <select 
          className="ml-2 text-sm focus:outline-none cursor-pointer"
          value={sortBy || 'latest'}
          onChange={handleSortChange}
          style={{ 
            backgroundColor: theme.background,
            color: theme.text,
            borderColor: theme.borderColor
          }}
        >
          <option value="latest">Latest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>
      <div className="text-sm" style={{ color: theme.placeholderText }}>
        Showing {totalProducts || 0} Products
      </div>
    </div>
  );
};

export default ProductSort;
