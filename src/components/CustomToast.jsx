import React, { createContext, useContext, useState, useCallback } from 'react';
import { XCircleIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

// Create Toast Context
const ToastContext = createContext(null);

// Toast Provider Component
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  
  const showToast = useCallback((message, type = 'error', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration);
  }, []);
  
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Toast Component
function Toast({ message, type }) {
  const bgColor = {
    error: 'bg-red-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500'
  }[type];
  
  const Icon = {
    error: XCircleIcon,
    success: CheckCircleIcon,
    warning: ExclamationCircleIcon
  }[type];
  
  return (
    <div className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in`}>
      <Icon className="w-5 h-5" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

// Custom hook to use toast
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export default ToastProvider;