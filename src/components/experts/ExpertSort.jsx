import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { SortDesc } from 'lucide-react';

const ExpertSort = ({ sortBy, onSortChange, totalExperts }) => {
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
      data-aos="fade-down"
      data-aos-duration="800"
    >
      <div className="flex items-center" data-aos="fade-right" data-aos-delay="100">
        <SortDesc className="w-5 h-5 mr-2" style={{ color: theme.primary }} />
        <span className="text-sm font-medium">Sort by :</span>
        <select 
          className="ml-2 text-sm focus:outline-none cursor-pointer"
          value={sortBy || 'recommended'}
          onChange={handleSortChange}
          style={{ 
            backgroundColor: theme.background,
            color: theme.text,
            borderColor: theme.borderColor
          }}
        >
          <option value="recommended">Recommended</option>
          <option value="experience-high">Experience: High to Low</option>
          <option value="experience-low">Experience: Low to High</option>
          <option value="rating">Rating: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>
      <div 
        className="text-sm" 
        style={{ color: theme.placeholderText }}
        data-aos="fade-left" 
        data-aos-delay="200"
      >
        Showing {totalExperts || 0} Experts
      </div>
    </div>
  );
};

export default ExpertSort;
