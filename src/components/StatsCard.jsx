import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function StatsCard({ title, value, icon: Icon, trend, color }) {
  const { isDark } = useTheme();

  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
      light: isDark ? 'bg-blue-900/20' : 'bg-blue-50',
      text: isDark ? 'text-blue-400' : 'text-blue-600'
    },
    green: {
      bg: 'bg-green-500',
      gradient: 'from-green-500 to-green-600',
      light: isDark ? 'bg-green-900/20' : 'bg-green-50',
      text: isDark ? 'text-green-400' : 'text-green-600'
    },
    purple: {
      bg: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600',
      light: isDark ? 'bg-purple-900/20' : 'bg-purple-50',
      text: isDark ? 'text-purple-400' : 'text-purple-600'
    },
    orange: {
      bg: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600',
      light: isDark ? 'bg-orange-900/20' : 'bg-orange-50',
      text: isDark ? 'text-orange-400' : 'text-orange-600'
    },
    red: {
      bg: 'bg-red-500',
      gradient: 'from-red-500 to-red-600',
      light: isDark ? 'bg-red-900/20' : 'bg-red-50',
      text: isDark ? 'text-red-400' : 'text-red-600'
    }
  };

  const colors = colorClasses[color];

  return (
    <div className={`rounded-xl shadow-sm border p-6 hover:shadow-lg transition-all duration-300 ${
      isDark 
        ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium mb-1 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {title}
          </p>
          <p className={`text-3xl font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {value}
          </p>
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className={`text-sm ml-1 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                vs mois dernier
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colors.light}`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
      </div>
    </div>
  );
}