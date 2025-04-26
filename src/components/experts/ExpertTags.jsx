import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { X } from 'lucide-react';

const ExpertTag = ({ label, onRemove, index }) => {
  const { theme } = useTheme();
  
  return (
    <div 
      className="flex items-center rounded-full px-3 py-1 mr-2 mb-2 border"
      style={{ 
        backgroundColor: 'transparent',
        borderColor: theme.primary,
        color: theme.text
      }}
      data-aos="zoom-in"
      data-aos-delay={100 + (index * 50)}
      data-aos-duration="600"
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
    <div className="flex flex-wrap mb-4" data-aos="fade-up" data-aos-duration="800">
      {tags.map((tag, index) => (
        <ExpertTag 
          key={index} 
          label={tag} 
          onRemove={() => onRemoveTag(tag)} 
          index={index}
        />
      ))}
    </div>
  );
};

export default ExpertTags;
