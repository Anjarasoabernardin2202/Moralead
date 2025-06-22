import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export default function LoadingSpinner({ size = 'md', text }) {
  const { isDark } = useTheme();
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className={`${sizeClasses[size]} border-4 border-blue-500 border-t-transparent rounded-full animate-spin`}></div>
      {text && (
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {text}
        </p>
      )}
    </div>
  );
}