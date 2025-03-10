import React, { useState, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { ChevronDown, SortAsc } from 'lucide-react';

const LibrarySort = ({ sortBy, onSortChange, totalResources }) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'latest', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'title-asc', label: 'Title (A-Z)' },
    { value: 'title-desc', label: 'Title (Z-A)' }
  ];

  const handleSortChange = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  const getSortLabel = () => {
    const option = sortOptions.find(option => option.value === sortBy);
    return option ? option.label : 'Most Recent';
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <p className="text-sm mb-2 sm:mb-0">
        Showing <span className="font-medium">{totalResources}</span> resources
      </p>
      
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center space-x-2 px-4 py-2 rounded-md border"
          style={{ borderColor: theme.borderColor, backgroundColor: theme.background }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <SortAsc className="w-4 h-4" />
          <span>{getSortLabel()}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div 
            className="absolute right-0 mt-1 w-48 rounded-md shadow-lg z-10 py-1 animate-menuEnter"
            style={{ backgroundColor: theme.background, borderColor: theme.borderColor }}
          >
            {sortOptions.map((option) => (
              <button
                key={option.value}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-altPrimary"
                onClick={() => handleSortChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LibrarySort;
