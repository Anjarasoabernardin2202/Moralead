import React, { useState } from 'react';
import { Truck, Package, MapPin, Clock, CheckCircle, Plus, Search, Filter } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

export default function LivraisonsPage() {
  const { isDark } = useTheme();
  const [livraisons, setLivraisons] = useState([
    {
      id: 1,
      numero: 'LIV-2024-001',
      destinataire: 'Équipe Alpha',
      adresse: 'Chantier Analakely',
      materiels: [
        { nom: 'Compteurs électriques', quantite: 15 },
        { nom: 'Câbles 2.5mm²', quantite: 100 }
      ],
      statut: 'en_cours',
      date_prevue: '2024-01-20',
      heure_prevue: '14:00',
      chauffeur: 'Rakoto Paul'
    },
    {
      id: 2,
      numero: 'LIV-2024-002',
      destinataire: 'Équipe Beta',
      adresse: 'Chantier Tsaralalana',
      materiels: [
        { nom: 'Disjoncteurs 20A', quantite: 8 },
        { nom: 'Coffrets électriques', quantite: 5 }
      ],
      statut: 'livre',
      date_prevue: '2024-01-19',
      heure_prevue: '10:30',
      chauffeur: 'Razafy Jean'
    }
  ]);

  const getStatusColor = (status) => {
    const colors = {
      'planifie': 'bg-blue-100 text-blue-800',
      'en_cours': 'bg-yellow-100 text-yellow-800',
      'livre': 'bg-green-100 text-green-800',
      'retarde': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Gestion des Livraisons
          </h2>
          <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Suivez les livraisons de matériel sur les chantiers
          </p>
        </div>
        <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle Livraison
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`rounded-xl shadow-sm border p-4 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Livraisons Aujourd'hui
              </p>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                8
              </p>
            </div>
          </div>
        </div>
        
        <div className={`rounded-xl shadow-sm border p-4 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                En Cours
              </p>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                3
              </p>
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-4 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Livrées
              </p>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                45
              </p>
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-4 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Articles Livrés
              </p>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                1,234
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className={`rounded-xl shadow-sm border p-6 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              isDark ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Rechercher une livraison..."
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
          
          <select className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}>
            <option value="">Tous les statuts</option>
            <option value="planifie">Planifié</option>
            <option value="en_cours">En Cours</option>
            <option value="livre">Livré</option>
            <option value="retarde">Retardé</option>
          </select>

          <input
            type="date"
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />

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

      {/* Liste des livraisons */}
      <div className="space-y-4">
        {livraisons.map((livraison) => (
          <div key={livraison.id} className={`rounded-xl shadow-sm border p-6 ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {livraison.numero}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Chauffeur: {livraison.chauffeur}
                  </p>
                </div>
              </div>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(livraison.statut)}`}>
                {livraison.statut === 'planifie' ? 'Planifié' :
                 livraison.statut === 'en_cours' ? 'En Cours' :
                 livraison.statut === 'livre' ? 'Livré' : 'Retardé'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Destinataire
                </p>
                <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {livraison.destinataire}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {livraison.adresse}
                  </p>
                </div>
              </div>
              
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Date et heure prévues
                </p>
                <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {new Date(livraison.date_prevue).toLocaleDateString('fr-FR')}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {livraison.heure_prevue}
                </p>
              </div>
              
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Matériels
                </p>
                {livraison.materiels.map((materiel, index) => (
                  <p key={index} className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {materiel.nom} x{materiel.quantite}
                  </p>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-3">
              {livraison.statut === 'planifie' && (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Démarrer Livraison
                </button>
              )}
              {livraison.statut === 'en_cours' && (
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Marquer comme Livré
                </button>
              )}
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Voir Détails
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Modifier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}