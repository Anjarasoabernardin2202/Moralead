import React, { useState } from 'react';
import { MapPin, Layers, Search, Filter, Navigation } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

export default function CartographiePage() {
  const { isDark } = useTheme();
  const [selectedLayer, setSelectedLayer] = useState('clients');
  const [searchTerm, setSearchTerm] = useState('');

  const mapLayers = [
    { id: 'clients', name: 'Clients', color: '#3B82F6', count: 2847 },
    { id: 'installations', name: 'Installations', color: '#10B981', count: 1234 },
    { id: 'reseaux', name: 'Réseaux', color: '#F59E0B', count: 156 },
    { id: 'zones', name: 'Zones de Couverture', color: '#8B5CF6', count: 23 }
  ];

  const recentLocations = [
    { id: 1, name: 'RAKOTO Jean', address: 'Analakely, Antananarivo', coords: '-18.8792, 47.5079', status: 'completed' },
    { id: 2, name: 'RAZAFY Marie', address: 'Tsaralalana, Antananarivo', coords: '-18.8656, 47.5267', status: 'in-progress' },
    { id: 3, name: 'ANDRY Paul', address: 'Antaninarenina, Antananarivo', coords: '-18.8845, 47.5234', status: 'scheduled' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`rounded-xl shadow-sm border p-6 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Cartographie SIG
            </h2>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Visualisation géographique des installations et du réseau
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Navigation className="w-4 h-4" />
              <span>Localiser</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filtres</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Controls */}
        <div className="space-y-6">
          {/* Search */}
          <div className={`rounded-xl shadow-sm border p-4 ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                isDark ? 'text-gray-400' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Rechercher une adresse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>

          {/* Layers */}
          <div className={`rounded-xl shadow-sm border p-4 ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center mb-3">
              <Layers className="w-5 h-5 mr-2 text-blue-500" />
              <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Couches
              </h3>
            </div>
            <div className="space-y-2">
              {mapLayers.map((layer) => (
                <label key={layer.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedLayer === layer.id}
                    onChange={() => setSelectedLayer(layer.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex items-center space-x-2 flex-1">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: layer.color }}
                    ></div>
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {layer.name}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {layer.count}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Recent Locations */}
          <div className={`rounded-xl shadow-sm border p-4 ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Localisations Récentes
            </h3>
            <div className="space-y-3">
              {recentLocations.map((location) => (
                <div key={location.id} className={`p-3 rounded-lg border cursor-pointer hover:bg-opacity-50 ${
                  isDark ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {location.name}
                      </p>
                      <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {location.address}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {location.coords}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
                      location.status === 'completed' ? 'bg-green-100 text-green-800' :
                      location.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {location.status === 'completed' ? 'OK' :
                       location.status === 'in-progress' ? 'En cours' : 'Planifié'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="lg:col-span-3">
          <div className={`rounded-xl shadow-sm border h-[600px] relative overflow-hidden ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            {/* Map Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Carte Interactive
                </h3>
                <p className="text-gray-600 mb-4">
                  Intégration avec OpenStreetMap ou Google Maps
                </p>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  {/* Simulated map markers */}
                  <div className="h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="h-20 bg-green-100 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="h-20 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="h-20 bg-purple-100 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="h-20 bg-red-100 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="h-20 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 space-y-2">
              <button className="w-10 h-10 bg-white shadow-lg rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                <span className="text-lg font-bold text-gray-600">+</span>
              </button>
              <button className="w-10 h-10 bg-white shadow-lg rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                <span className="text-lg font-bold text-gray-600">-</span>
              </button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Légende</h4>
              <div className="space-y-1">
                {mapLayers.map((layer) => (
                  <div key={layer.id} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: layer.color }}
                    ></div>
                    <span className="text-xs text-gray-600">{layer.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}