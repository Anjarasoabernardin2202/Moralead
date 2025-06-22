import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function ErrorMessage({ message, onClose, type = 'error' }) {
  const { isDark } = useTheme();

  const typeStyles = {
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const darkTypeStyles = {
    error: 'bg-red-900/20 border-red-800 text-red-300',
    warning: 'bg-yellow-900/20 border-yellow-800 text-yellow-300',
    info: 'bg-blue-900/20 border-blue-800 text-blue-300'
  };

  return (
    <div className={`border rounded-lg p-4 flex items-start space-x-3 animate-shake ${
      isDark ? darkTypeStyles[type] : typeStyles[type]
    }`}>
      <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-black/10 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}