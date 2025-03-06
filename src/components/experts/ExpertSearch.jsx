import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Search } from 'lucide-react';

const ExpertSearch = ({ searchQuery, onSearchChange }) => {
  const { theme } = useTheme();

  const handleSearchChange = (e) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search for experts"
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full pl-10 pr-4 py-2 border rounded-md"
        style={{ 
          borderColor: theme.borderColor,
          backgroundColor: theme.background,
          color: theme.text
        }}
      />
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
        style={{ color: theme.placeholderText }} 
      />
    </div>
  );
};

export default ExpertSearch;
