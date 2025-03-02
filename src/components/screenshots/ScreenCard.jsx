import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Avatar } from "@heroui/react";
import { LaptopMinimalCheck } from 'lucide-react';

function ScreenCard({ screenshot, user, timestamp, type , showName=true}) {
  const { theme } = useTheme();

  return (
    <div 
      className="w-full rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-sm group"
      style={{ borderColor: theme.borderColor, backgroundColor: theme.background }}
    >
      <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img 
          src={screenshot} 
          alt="Screenshot" 
          className={`w-full h-full object-cover transition-all duration-300 transform group-hover:scale-105`}
        />
      </div>
      
      <div className="p-3 space-y-3">
        {
          showName && <div className="flex items-center gap-3">
          <Avatar
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 "
          />
          <h3 
            className="font-semibold text-base truncate" 
            style={{ color: theme.placeholderText }}
          >
            {user.name}
          </h3>
        </div>
        }
        <div className="flex items-center justify-between">
          <div className="flex items-center  gap-2">
            <LaptopMinimalCheck  size={16} className='text-primary' />
            <span 
              className="text-sm truncate text-placeholderText" 
              
            >
              {type}
            </span>
          </div>
          <span 
            className="text-sm truncate font-semibold" 
            style={{ color: theme.primary }}
          >
            {timestamp}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ScreenCard;
