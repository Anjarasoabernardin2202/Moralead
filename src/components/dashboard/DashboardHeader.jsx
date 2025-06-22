import React from 'react';
import { Activity } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import RealTimeIndicator from '../ui/RealTimeIndicator.jsx';

export default function DashboardHeader({ title, subtitle, showRealTime = true }) {
  const { isDark } = useTheme();

  return (
    <div className={`rounded-xl shadow-sm border p-6 ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {subtitle}
          </p>
        </div>
        {showRealTime && (
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-green-500" />
            <span className="text-sm text-green-600 font-medium">Données en temps réel</span>
          </div>
        )}
      </div>
    </div>
  );
}