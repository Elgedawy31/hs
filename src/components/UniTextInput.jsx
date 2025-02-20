import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const UniTextInput = ({
  type = 'text',
  label,
  value,
  onChange,
  placeholder,
  error,
  options = [],
  rows = 4,
  required = false,
  disabled = false,
  className = '',
  multiple = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const { currentTheme } = useTheme();
  const isDarkMode = currentTheme === 'dark';

  // Handle click outside for select dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const baseInputClasses = `
    w-full px-4 py-2.5 rounded-lg border text-sm
    ${isDarkMode 
      ? 'bg-[#151515] border-[#2d2d2d] text-[#e6e6e6] placeholder-[#a0a0a1]' 
      : 'bg-white border-[#E4E5E7] text-[#101010] placeholder-[#525253]'
    }
    ${error 
      ? 'border-red-500 focus:border-red-500' 
      : isDarkMode 
        ? 'focus:border-[#4f6bcc]'
        : 'focus:border-[#264699]'
    } 
    ${disabled 
      ? 'opacity-50 cursor-not-allowed' 
      : 'focus:outline-none focus:ring-0 focus:ring-opacity-25'
    }
    transition-all duration-200 ease-in-out
  `;

  const renderInput = () => {
    switch (type) {
      case 'password':
        return (
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              disabled={disabled}
              required={required}
              className={`${baseInputClasses} pr-10 ${className}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 
                ${isDarkMode 
                  ? 'text-gray-400 hover:text-gray-300' 
                  : 'text-gray-500 hover:text-gray-700'
                } 
                focus:outline-none transition-colors duration-200`}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              )}
            </button>
          </div>
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            required={required}
            className={`${baseInputClasses} resize-none ${className}`}
          />
        );

      case 'select':
        return (
          <div ref={selectRef} className="relative">
            <div
              onClick={() => !disabled && setIsOpen(!isOpen)}
              className={`${baseInputClasses} cursor-pointer flex items-center justify-between ${className}`}
            >
              <div className="flex flex-wrap gap-2 min-h-[23px]">
                {type === 'select' && multiple && Array.isArray(value) ? (
                  value.length > 0 ? (
                    value.map(v => {
                      const option = options.find(opt => opt.value === v);
                      return option ? (
                        <div
                          key={v}
                          className={`
                            flex items-center gap-2 px-3 py-1 rounded-full text-sm
                            ${isDarkMode ? 'bg-[#1a1a2e]' : 'bg-[#ECEDFF]'}
                          `}
                        >
                          <span>{option.label}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              const newValue = value.filter(val => val !== v);
                              onChange(newValue);
                            }}
                            className="hover:text-red-500 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : null;
                    })
                  ) : (
                    <span className="text-gray-400">{placeholder}</span>
                  )
                ) : (
                  <span className={value ? '' : 'text-gray-400'}>
                    {value ? options.find(opt => opt.value === value)?.label : placeholder}
                  </span>
                )}
              </div>
              <svg
                className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {isOpen && (
              <div className={`
                absolute z-50 w-full mt-1 rounded-lg shadow-lg overflow-hidden
                ${isDarkMode 
                  ? 'bg-[#151515] border-[#2d2d2d] text-[#e6e6e6]' 
                  : 'bg-white border-[#E4E5E7] text-[#101010]'
                }
                border animate-menuEnter origin-top backdrop-blur-sm
              `}>
                {options.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      if (type === 'select' && multiple) {
                        const newValue = Array.isArray(value) ? value : [];
                        const index = newValue.indexOf(option.value);
                        if (index === -1) {
                          onChange([...newValue, option.value]);
                        } else {
                          onChange(newValue.filter((v) => v !== option.value));
                        }
                      } else {
                        onChange(option.value);
                        setIsOpen(false);
                      }
                    }}
                    className={`
                      px-4 py-2 cursor-pointer first:rounded-t-lg last:rounded-b-lg
                      ${isDarkMode 
                        ? 'hover:bg-[#1a1a2e]'
                        : 'hover:bg-[#ECEDFF]'
                      }
                      transition-colors duration-150 ease-in-out flex items-center justify-between
                    `}
                  >
                    <span>{option.label}</span>
                    {((type === 'select' && multiple && Array.isArray(value) && value.includes(option.value)) ||
                      (!multiple && value === option.value)) && (
                      <svg 
                        className="w-5 h-5 text-primary" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={`${baseInputClasses} ${className}`}
          />
        );
    }
  };

  return (
    <div className="space-y-1">
      {label && (
        <label className={`block text-sm font-medium mb-1.5
          ${isDarkMode ? 'text-[#e6e6e6]' : 'text-[#101010]'}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderInput()}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default UniTextInput;
