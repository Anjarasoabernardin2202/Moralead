import React, { useState, useEffect } from 'react';
import { Shield, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { navigationItems, getRoleDisplayName } from '../../data/navigation.js';

export default function ResponsiveSidebar({ 
  currentPage, 
  onPageChange, 
  isCollapsed, 
  onToggleCollapse 
}) {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedItems, setExpandedItems] = useState(['gestion', 'logistique', 'operations']);

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      // Sur mobile, fermer automatiquement le menu overlay
      if (mobile) {
        setIsOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!user) return null;

  const userNavigation = navigationItems.filter(item => 
    item.roles.includes(user.role)
  );

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handlePageChange = (page) => {
    onPageChange(page);
    // Fermer le menu mobile après navigation
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleToggleCollapse = () => {
    if (!isMobile) {
      onToggleCollapse(!isCollapsed);
    }
  };

  const renderNavigationItem = (item, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isActive = currentPage === item.id;
    const hasActiveChild = item.children?.some((child) => currentPage === child.id);

    const filteredChildren = hasChildren 
      ? item.children.filter((child) => child.roles.includes(user.role))
      : [];

    if (filteredChildren.length === 0 && hasChildren) {
      return null;
    }

    // Déterminer le style selon le niveau - INVERSÉ
    const getItemStyle = () => {
      if (level === 0) {
        // Menu principal - couleur grise uniforme (INVERSÉ)
        if (isActive || hasActiveChild) {
          return 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg';
        }
        return 'text-gray-300 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 hover:text-white';
      } else {
        // Sous-menu - style bleu-violet (INVERSÉ)
        if (isActive) {
          return 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg';
        }
        return 'text-gray-300 hover:bg-gray-800 hover:text-white';
      }
    };

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else {
              handlePageChange(item.id);
            }
          }}
          className={`w-full group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
            level > 0 ? (isCollapsed && !isMobile ? 'ml-2' : 'ml-4 pl-6') : ''
          } ${getItemStyle()}`}
          title={isCollapsed && !isMobile ? item.name : ''}
        >
          <div className="flex items-center min-w-0">
            <item.icon className={`${
              isCollapsed && !isMobile ? 'w-6 h-6' : 'w-5 h-5 mr-3'
            } flex-shrink-0`} />
            {(!isCollapsed || isMobile) && (
              <span className="truncate">{item.name}</span>
            )}
          </div>
          {hasChildren && (!isCollapsed || isMobile) && (
            <div className="ml-2 flex-shrink-0">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
          )}
        </button>

        {hasChildren && isExpanded && (!isCollapsed || isMobile) && (
          <div className="mt-1 space-y-1">
            {filteredChildren.map((child) => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-lg transition-colors ${
          isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 bg-gray-900 transition-all duration-300 ease-in-out ${
        isMobile 
          ? // Mobile: overlay avec animation slide
            `w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
          : // Desktop: sidebar fixe avec largeur variable
            `${isCollapsed ? 'w-20' : 'w-64'}`
      }`}>
        <div className="flex flex-col h-full">
          {/* Header avec Logo et Toggle */}
          <div className={`flex items-center h-16 px-4 bg-gray-800 ${
            isCollapsed && !isMobile ? 'justify-center' : 'justify-between'
          }`}>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-white" />
              </div>
              {(!isCollapsed || isMobile) && (
                <span className="text-xl font-bold text-white truncate">Moralead V2</span>
              )}
            </div>
            
            {/* Toggle Button - Desktop seulement */}
            {!isMobile && (
              <button
                onClick={handleToggleCollapse}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* User Role Badge */}
          {(!isCollapsed || isMobile) && (
            <div className="px-4 py-3 bg-gray-800/50">
              <div className="text-center">
                <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full">
                  {getRoleDisplayName(user.role)}
                </span>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className={`flex-1 py-6 space-y-2 overflow-y-auto ${
            isCollapsed && !isMobile ? 'px-2' : 'px-4'
          }`}>
            {userNavigation.map((item) => renderNavigationItem(item))}
          </nav>

          {/* User Profile */}
          <div className="p-4 bg-gray-800">
            <div className={`flex items-center ${
              isCollapsed && !isMobile ? 'justify-center' : 'space-x-3'
            }`}>
              <img
                className="w-10 h-10 rounded-full ring-2 ring-blue-500 flex-shrink-0"
                src={user?.avatar}
                alt="Profile"
                title={isCollapsed && !isMobile ? user?.name : ''}
              />
              {(!isCollapsed || isMobile) && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}