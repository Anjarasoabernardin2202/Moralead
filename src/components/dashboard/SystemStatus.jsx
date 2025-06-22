import React from 'react';
import { Database, Activity } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

export default function SystemStatus() {
  const { isDark } = useTheme();

  return (
    <div className={`rounded-xl shadow-sm border p-6 ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center mb-4">
        <Database className="w-5 h-5 mr-2 text-blue-500" />
        <h3 className={`text-lg font-semibold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          État du Système
        </h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Serveur Principal
          </span>
          <span className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600">En ligne</span>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Base de Données
          </span>
          <span className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600">Opérationnelle</span>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Utilisateurs Connectés
          </span>
          <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            24
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Dernière Sauvegarde
          </span>
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Il y a 2h
          </span>
        </div>
      </div>
    </div>
  );
}