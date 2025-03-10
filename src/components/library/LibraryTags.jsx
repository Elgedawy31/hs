import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { X } from 'lucide-react';

const LibraryTags = ({ tags, onRemoveTag }) => {
  const { theme } = useTheme();
  
  if (!tags || tags.length === 0) return null;
  
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div 
            key={index}
            className="flex items-center px-3 py-1 rounded-full text-sm"
            style={{ 
              backgroundColor: theme.altPrimary,
              color: theme.text
            }}
          >
            <span>{tag}</span>
            <button 
              className="ml-2 focus:outline-none"
              onClick={() => onRemoveTag(tag)}
              aria-label={`Remove ${tag} filter`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryTags;
