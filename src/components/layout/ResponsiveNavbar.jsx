import React, { useState } from 'react';
import { Bell, Search, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { getRoleDisplayName } from '../../data/navigation.js';

export default function ResponsiveNavbar({ 
  currentPage, 
  sidebarCollapsed, 
  isMobile 
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuth();
  const { isDark } = useTheme();

  const getPageTitle = (page) => {
    const titles = {
      dashboard: 'Dashboard',
      clients: 'Gestion des Clients',
      lots: 'Gestion des Lots',
      planification: 'Planification',
      stocks: 'Gestion des Stocks',
      kits: 'Gestion des Kits',
      demandes_compteurs: 'Demandes de Compteurs',
      livraisons: 'Livraisons',
      transmissions: 'Transmissions',
      cartographie: 'Cartographie',
      validation: 'Validation des Dossiers',
      rapports: 'Rapports',
      utilisateurs: 'Gestion des Utilisateurs',
      parametres: 'Paramètres',
      saisie: 'Saisie PV/OE'
    };
    return titles[page] || 'Dashboard';
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
  };

  return (
    <header className={`shadow-sm border-b fixed top-0 right-0 z-30 transition-all duration-300 ease-in-out ${
      isMobile 
        ? 'left-0' // Sur mobile, la navbar prend toute la largeur
        : sidebarCollapsed 
          ? 'left-20' // Sidebar repliée
          : 'left-64' // Sidebar ouverte
    } ${
      isDark 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className={`px-4 lg:px-6 py-4 ${isMobile ? 'pl-16' : ''}`}>
        <div className="flex items-center justify-between">
          {/* Page Title - Responsive */}
          <div className="flex items-center space-x-4">
            <h1 className={`text-xl lg:text-2xl font-bold truncate ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {getPageTitle(currentPage)}
            </h1>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Search - Hidden on mobile */}
            <div className="hidden md:block relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                className={`block w-48 lg:w-64 pl-10 pr-3 py-2 border rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            {/* Search Button - Mobile only */}
            <button className={`md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              isDark 
                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}>
              <Search className="h-6 w-6" />
            </button>

            {/* Notifications */}
            <button className={`relative p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              isDark 
                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}>
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 animate-pulse"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className={`flex items-center space-x-2 lg:space-x-3 p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}
              >
                <img
                  className="h-8 w-8 rounded-full ring-2 ring-gray-200 object-cover"
                  src={user?.avatar}
                  alt="Profile"
                />
                <div className="hidden lg:block text-left">
                  <p className={`text-sm font-medium truncate max-w-32 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {user?.name}
                  </p>
                  <p className={`text-xs truncate max-w-32 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {user ? getRoleDisplayName(user.role) : ''}
                  </p>
                </div>
              </button>

              {/* Dropdown Menu - Couleurs corrigées */}
              {showProfileMenu && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border py-1 z-50 transition-all duration-200 ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 shadow-gray-900/50' 
                    : 'bg-white border-gray-200 shadow-gray-500/20'
                }`}>
                  {/* Header du dropdown */}
                  <div className={`px-4 py-3 border-b ${
                    isDark ? 'border-gray-700' : 'border-gray-100'
                  }`}>
                    <p className={`text-sm font-medium truncate ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {user?.name}
                    </p>
                    <p className={`text-xs truncate ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {user?.email}
                    </p>
                    <p className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${
                      isDark 
                        ? 'bg-blue-900/30 text-blue-400' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user ? getRoleDisplayName(user.role) : ''}
                    </p>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="py-1">
                    <button className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
                      isDark 
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}>
                      <User className="w-4 h-4 mr-3" />
                      Mon Profil
                    </button>
                    
                    <button className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
                      isDark 
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}>
                      <Settings className="w-4 h-4 mr-3" />
                      Paramètres
                    </button>
                  </div>
                  
                  {/* Séparateur et Déconnexion */}
                  <div className={`border-t ${
                    isDark ? 'border-gray-700' : 'border-gray-100'
                  }`}>
                    <button
                      onClick={handleLogout}
                      className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
                        isDark 
                          ? 'text-red-400 hover:bg-red-900/20 hover:text-red-300' 
                          : 'text-red-600 hover:bg-red-50 hover:text-red-700'
                      }`}
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Se déconnecter
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {showProfileMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileMenu(false)}
        ></div>
      )}
    </header>
  );
}