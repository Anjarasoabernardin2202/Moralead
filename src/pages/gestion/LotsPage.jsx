import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, MapPin, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LotsPage() {
  const { isDark } = useTheme();
  const [lots, setLots] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [zoneFilter, setZoneFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentLot, setCurrentLot] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    code: '',
    zone_geographique: '',
    couleur: '#000000',
    statut: 'actif',
    capacite_max: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  // Charger les lots depuis le backend
  useEffect(() => {
    fetchLots();
  }, []);

  const fetchLots = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/lots`);
      setLots(response.data);
    } catch (error) {
      toast.error('Erreur lors de la récupération des lots');
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer la recherche et les filtres
  const filteredLots = lots.filter(lot =>
    (lot.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
     lot.code.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter ? lot.statut === statusFilter : true) &&
    (zoneFilter ? lot.zone_geographique.toLowerCase().includes(zoneFilter.toLowerCase()) : true)
  );

  // Gérer le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (currentLot) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/lots/${currentLot.id}`, formData);
        toast.success('Lot mis à jour avec succès');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/lots`, formData);
        toast.success('Lot créé avec succès');
      }
      setShowModal(false);
      setCurrentLot(null);
      setFormData({ nom: '', code: '', zone_geographique: '', couleur: '#000000', statut: 'actif', capacite_max: 0 });
      fetchLots();
    } catch (error) {
      toast.error(`Erreur lors de la ${currentLot ? 'mise à jour' : 'création'} du lot`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (lot) => {
    setCurrentLot(lot);
    setFormData(lot);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce lot ?')) {
      setIsLoading(true);
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/lots/${id}`);
        toast.success('Lot supprimé avec succès');
        fetchLots();
      } catch (error) {
        toast.error('Erreur lors de la suppression du lot');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'actif': 'bg-green-100 text-green-800',
      'inactif': 'bg-red-100 text-red-800',
      'maintenance': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDark ? 'dark' : 'light'}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
         
          
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: 'Total Lots', value: lots.length, color: 'blue', icon: MapPin },
          { label: 'Lots Actifs', value: lots.filter(lot => lot.statut === 'actif').length, color: 'green', icon: MapPin },
          { label: 'Capacité Moyenne', value: lots.length ? Math.round(lots.reduce((sum, lot) => sum + lot.capacite_max, 0) / lots.length) : 0, color: 'yellow', icon: MapPin }
        ].map((stat, index) => (
          <div
            key={index}
            className={`rounded-2xl shadow-lg border transition-transform transform hover:scale-105 p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
          >
            <div className="flex items-center">
              <div className={`p-3 bg-${stat.color}-100 rounded-xl`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="ml-4">
                <p className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          disabled={isLoading}
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouveau Lot
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-2xl shadow-xl w-full max-w-2xl p-8 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} relative transform transition-all animate-fade-in`}>
            <button
              onClick={() => {
                setShowModal(false);
                setCurrentLot(null);
                setFormData({ nom: '', code: '', zone_geographique: '', couleur: '#000000', statut: 'actif', capacite_max: 0 });
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold mb-6">
              {currentLot ? 'Modifier le Lot' : 'Créer un Nouveau Lot'}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  className={`mt-2 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  required
                  placeholder="Entrez le nom du lot"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Code</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  className={`mt-2 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  required
                  placeholder="Entrez le code du lot"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Zone Géographique</label>
                <input
                  type="text"
                  name="zone_geographique"
                  value={formData.zone_geographique}
                  onChange={handleInputChange}
                  className={`mt-2 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  required
                  placeholder="Entrez la zone géographique"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Couleur</label>
                <input
                  type="color"
                  name="couleur"
                  value={formData.couleur}
                  onChange={handleInputChange}
                  className={`mt-2 w-full p-3 border rounded-xl ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Statut</label>
                <select
                  name="statut"
                  value={formData.statut}
                  onChange={handleInputChange}
                  className={`mt-2 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  required
                >
                  <option value="actif">Actif</option>
                  <option value="inactif">Inactif</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Capacité Max</label>
                <input
                  type="number"
                  name="capacite_max"
                  value={formData.capacite_max}
                  onChange={handleInputChange}
                  className={`mt-2 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  required
                  placeholder="Entrez la capacité maximale"
                  min="0"
                />
              </div>
              <div className="md:col-span-2 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setCurrentLot(null);
                    setFormData({ nom: '', code: '', zone_geographique: '', couleur: '#000000', statut: 'actif', capacite_max: 0 });
                  }}
                  className={`px-6 py-3 border rounded-xl transition-colors ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  disabled={isLoading}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all flex items-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : null}
                  {currentLot ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filtres */}
      <div className={`rounded-2xl shadow-lg border p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Rechercher par nom, code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
          >
            <option value="">Tous les statuts</option>
            <option value="actif">Actif</option>
            <option value="inactif">Inactif</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <select
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
            className={`px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
          >
            <option value="">Toutes les zones</option>
            <option value="analakely">Analakely</option>
            <option value="tsaralalana">Tsaralalana</option>
            <option value="antaninarenina">Antaninarenina</option>
          </select>
          <button className={`inline-flex items-center px-4 py-3 border rounded-xl transition-colors ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
            <Filter className="w-4 h-4 mr-2" />
            Plus de filtres
          </button>
        </div>
      </div>

      {/* Tableau */}
      <div className={`rounded-2xl shadow-lg border overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        {isLoading && (
          <div className="flex justify-center py-4">
            <svg className="animate-spin h-6 w-6 text-blue-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  Lot
                </th>
                <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  Zone Géographique
                </th>
                <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  Capacité Max
                </th>
                <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  Statut
                </th>
                <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {filteredLots.map((lot) => (
                <tr key={lot.id} className={`transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: lot.couleur }}></div>
                      <div>
                        <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {lot.nom}
                        </div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {lot.code}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {lot.zone_geographique}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {lot.capacite_max}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(lot.statut)}`}>
                      {lot.statut === 'actif' ? 'Actif' : lot.statut === 'inactif' ? 'Inactif' : 'Maintenance'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-4">
                    
                      <button onClick={() => handleEdit(lot)} className="text-green-600 hover:text-green-800 transition-colors" title="Modifier">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(lot.id)} className="text-red-600 hover:text-red-800 transition-colors" title="Supprimer">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}