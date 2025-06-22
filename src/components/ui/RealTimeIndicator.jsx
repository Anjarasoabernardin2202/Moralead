import React from 'react';
import { Activity, Wifi, WifiOff } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

export default function RealTimeIndicator({ isActive, lastUpdate, error }) {
  const { isDark } = useTheme();

  if (error) {
    return (
      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs ${
        isDark ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-600'
      }`}>
        <WifiOff className="w-3 h-3" />
        <span>Connexion perdue</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs ${
      isActive 
        ? isDark ? 'bg-green-900/20 text-green-400' : 'bg-green-50 text-green-600'
        : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
    }`}>
      {isActive ? (
        <>
          <Activity className="w-3 h-3 animate-pulse" />
          <span>Temps réel</span>
        </>
      ) : (
        <>
          <Wifi className="w-3 h-3" />
          <span>Statique</span>
        </>
      )}
      {lastUpdate && (
        <span className="opacity-75">
          • {new Date(lastUpdate).toLocaleTimeString()}
        </span>
      )}
    </div>
  );
}