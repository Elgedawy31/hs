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
    <div 
      className="relative w-full max-w-md"
      data-aos="fade-right"
      data-aos-duration="800"
    >
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
        data-aos="fade-in"
        data-aos-delay="100"
      />
      <Search 
        className="absolute left-3 top-[10px] transform -translate-y-1/2 w-5 h-5" 
        style={{ color: theme.placeholderText }} 
        data-aos="zoom-in"
        data-aos-delay="200"
      />
    </div>
  );
};

export default ExpertSearch;
