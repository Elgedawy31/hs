import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function Checkbox({ checked = false, onChange, className = '' }) {
  return (
    <button
      onClick={() => onChange?.(!checked)}
      className={`
        relative w-5 h-5 border-2 rounded-sm 
        transition-all duration-200 ease-in-out
        focus:outline-none 
        ${checked 
          ? 'bg-primary border-primary' 
          : 'border-gray-300 hover:border-primary'
        }
        ${className}
      `}
    >
      <CheckIcon 
        className={`
          absolute inset-0 h-4 w-4 text-white 
          transition-transform duration-200 ease-in-out
          ${checked ? 'scale-100' : 'scale-0'}
        `}
      />
    </button>
  );
}
