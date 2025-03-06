import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { X } from 'lucide-react';

const ExpertTag = ({ label, onRemove }) => {
  const { theme } = useTheme();
  
  return (
    <div 
      className="flex items-center rounded-full px-3 py-1 mr-2 mb-2 border"
      style={{ 
        backgroundColor: 'transparent',
        borderColor: theme.primary,
        color: theme.text
      }}
    >
      <span className="text-sm font-medium">{label}</span>
      <button 
        onClick={onRemove} 
        className="ml-1 focus:outline-none"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const ExpertTags = ({ tags = [], onRemoveTag }) => {
  if (!tags || tags.length === 0) return null;
  
  return (
    <div className="flex flex-wrap mb-4">
      {tags.map((tag, index) => (
        <ExpertTag 
          key={index} 
          label={tag} 
          onRemove={() => onRemoveTag(tag)} 
        />
      ))}
    </div>
  );
};

export default ExpertTags;
