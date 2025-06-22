import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Download, Edit, Trash2, Eye } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { getStatusDisplayName } from '../data/navigation.js';

export default function ClientsPage() {
  const { isDark } = useTheme();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchClients();
  }, [currentPage, searchTerm, statusFilter]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      // Simuler des données clients
      setTimeout(() => {
        const mockClients = [
          {
            id: '1',
            numero_dossier: 'DOS-2024-001',
            numero_compteur: 'CPT-001-2024',
            code_region: 'ANT',
            nom_client: 'RAKOTO Jean',
            region: 'Antananarivo',
            commune: 'Antananarivo I',
            quartier: 'Analakely',
            adresse: 'Lot 123 Analakely',
            bt_numero: 'BT-001',
            statut_client: 'Actif',
            telephone: '0341234567',
            date_reception: '2024-01-15',
            statut_installation: 'en_attente',
            lot: 'Lot A',
            livraison: false,
            created_at: '2024-01-15T10:00:00Z',
            updated_at: '2024-01-15T10:00:00Z'
          },
          {
            id: '2',
            numero_dossier: 'DOS-2024-002',
            numero_compteur: 'CPT-002-2024',
            code_region: 'ANT',
            nom_client: 'RAZAFY Marie',
            region: 'Antananarivo',
            commune: 'Antananarivo II',
            quartier: 'Tsaralalana',
            adresse: 'Lot 456 Tsaralalana',
            bt_numero: 'BT-002',
            statut_client: 'Actif',
            telephone: '0347654321',
            date_reception: '2024-01-16',
            statut_installation: 'valide',
            lot: 'Lot A',
            livraison: true,
            created_at: '2024-01-16T10:00:00Z',
            updated_at: '2024-01-16T10:00:00Z'
          }
        ];
        
        setClients(mockClients);
        setTotalPages(1);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Erreur chargement clients:', error);
      setLoading(false);
    }
  };

  const exportToExcel = async () => {
    try {
      alert('Export Excel en cours de développement');
    } catch (error) {
      console.error('Erreur export:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'en_attente': 'bg-yellow-100 text-yellow-800',
      'valide': 'bg-green-100 text-green-800',
      'en_cours_cdc': 'bg-blue-100 text-blue-800',
      'non_conforme': 'bg-red-100 text-red-800',
      'livre': 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Gestion des Clients
          </h2>
          <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Gérez les dossiers clients et leurs installations
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={exportToExcel}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Exporter Excel
          </button>
          <button
            onClick={() => alert('Nouveau client en cours de développement')}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Client
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className={`rounded-xl shadow-sm border p-6 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              isDark ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Rechercher par nom, dossier, compteur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="">Tous les statuts</option>
            <option value="en_attente">En Attente</option>
            <option value="valide">Validé</option>
            <option value="en_cours_cdc">En Cours (CDC)</option>
            <option value="non_conforme">Non Conforme</option>
            <option value="livre">Livré</option>
          </select>

          <button className={`inline-flex items-center px-4 py-2 border rounded-lg transition-colors ${
            isDark 
              ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}>
            <Filter className="w-4 h-4 mr-2" />
            Plus de filtres
          </button>
        </div>
      </div>

      {/* Tableau des clients */}
      <div className={`rounded-xl shadow-sm border overflow-hidden ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Client
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Dossier/Compteur
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Localisation
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Statut
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Lot
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {clients.map((client) => (
                <tr key={client.id} className={isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {client.nom_client}
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {client.telephone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {client.numero_dossier}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {client.numero_compteur || 'Non assigné'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {client.commune}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {client.quartier}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(client.statut_installation)}`}>
                      {getStatusDisplayName(client.statut_installation)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {client.lot || 'Non assigné'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={`px-6 py-3 border-t ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
          <div className="flex items-center justify-between">
            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Page {currentPage} sur {totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded border ${
                  currentPage === 1
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-gray-100'
                } ${isDark ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}
              >
                Précédent
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded border ${
                  currentPage === totalPages
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-gray-100'
                } ${isDark ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}