import React, { useState } from 'react';
import { Settings, Moon, Sun, User, Bell, Shield, Database, Save } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';

export default function ParametresPage() {
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    notifications_email: true,
    notifications_validation: true,
    notifications_rappels: true,
    auto_backup: true,
    backup_frequency: 'daily',
    session_timeout: 60,
    max_file_size: 10
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = () => {
    // Ici vous pouvez implémenter la sauvegarde des paramètres
    alert('Paramètres sauvegardés avec succès !');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Paramètres Système
        </h2>
        <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Gérez les paramètres et préférences du système
        </p>
      </div>

      {/* Apparence */}
      <div className={`rounded-xl shadow-sm border p-6 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center mb-4">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
            {isDark ? (
              <Moon className="w-5 h-5 text-blue-400" />
            ) : (
              <Sun className="w-5 h-5 text-blue-600" />
            )}
          </div>
          <div className="ml-3">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Apparence
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Personnalisez l'apparence de l'interface
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Mode sombre
              </label>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Activez le mode sombre pour réduire la fatigue oculaire
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isDark ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDark ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className={`rounded-xl shadow-sm border p-6 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center mb-4">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
            <Bell className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="ml-3">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Notifications
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Gérez vos préférences de notification
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Notifications par email
              </label>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Recevez des notifications importantes par email
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications_email}
              onChange={(e) => handleSettingChange('notifications_email', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Notifications de validation
              </label>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Notifications lors de la validation des dossiers
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications_validation}
              onChange={(e) => handleSettingChange('notifications_validation', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Rappels de planification
              </label>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Rappels pour les installations planifiées
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications_rappels}
              onChange={(e) => handleSettingChange('notifications_rappels', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* Sécurité */}
      <div className={`rounded-xl shadow-sm border p-6 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center mb-4">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-red-900/20' : 'bg-red-50'}`}>
            <Shield className="w-5 h-5 text-red-600" />
          </div>
          <div className="ml-3">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Sécurité
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Paramètres de sécurité du système
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Délai d'expiration de session (minutes)
            </label>
            <input
              type="number"
              value={settings.session_timeout}
              onChange={(e) => handleSettingChange('session_timeout', parseInt(e.target.value))}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Taille maximale des fichiers (MB)
            </label>
            <input
              type="number"
              value={settings.max_file_size}
              onChange={(e) => handleSettingChange('max_file_size', parseInt(e.target.value))}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Sauvegarde */}
      <div className={`rounded-xl shadow-sm border p-6 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center mb-4">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-green-900/20' : 'bg-green-50'}`}>
            <Database className="w-5 h-5 text-green-600" />
          </div>
          <div className="ml-3">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Sauvegarde
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Configuration des sauvegardes automatiques
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Sauvegarde automatique
              </label>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Activer les sauvegardes automatiques de la base de données
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.auto_backup}
              onChange={(e) => handleSettingChange('auto_backup', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Fréquence de sauvegarde
            </label>
            <select
              value={settings.backup_frequency}
              onChange={(e) => handleSettingChange('backup_frequency', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="hourly">Toutes les heures</option>
              <option value="daily">Quotidienne</option>
              <option value="weekly">Hebdomadaire</option>
              <option value="monthly">Mensuelle</option>
            </select>
          </div>

          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Sauvegarder Maintenant
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Télécharger Sauvegarde
            </button>
          </div>
        </div>
      </div>

      {/* Bouton de sauvegarde */}
      <div className="flex justify-end">
        <button
          onClick={saveSettings}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <Save className="w-5 h-5 mr-2" />
          Sauvegarder les Paramètres
        </button>
      </div>
    </div>
  );
}