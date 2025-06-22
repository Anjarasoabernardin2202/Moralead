import React from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

export default function QuickActions() {
  const { isDark } = useTheme();

  const actions = [
    {
      title: 'Gérer les Utilisateurs',
      color: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      onClick: () => alert('Gestion des utilisateurs')
    },
    {
      title: 'Rapports Système',
      color: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      onClick: () => alert('Rapports système')
    },
    {
      title: 'Configuration',
      color: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      onClick: () => alert('Configuration système')
    },
    {
      title: 'Sauvegarde',
      color: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      onClick: () => alert('Sauvegarde des données')
    }
  ];

  return (
    <div className={`rounded-xl shadow-sm border p-6 ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        Actions Rapides
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`p-4 bg-gradient-to-r ${action.color} text-white rounded-lg transition-all transform hover:scale-105 text-sm font-medium shadow-lg`}
          >
            {action.title}
          </button>
        ))}
      </div>
    </div>
  );
}