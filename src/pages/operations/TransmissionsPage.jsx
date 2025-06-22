import React, { useState } from 'react';
import { Send, Inbox, Archive, Clock, CheckCircle, AlertCircle, Search, Filter, Plus } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

export default function TransmissionsPage() {
  const { isDark } = useTheme();
  const [transmissions, setTransmissions] = useState([
    {
      id: 1,
      type: 'envoi',
      destinataire: 'JIRAMA - Service Technique',
      objet: 'Transmission dossiers validés - Lot A',
      nombre_dossiers: 15,
      date_transmission: '2024-01-20',
      statut: 'envoye',
      operateur: 'Agent Transmission 1'
    },
    {
      id: 2,
      type: 'reception',
      expediteur: 'JIRAMA - Service Commercial',
      objet: 'Retour validation dossiers',
      nombre_dossiers: 12,
      date_transmission: '2024-01-19',
      statut: 'recu',
      operateur: 'Agent Transmission 2'
    }
  ]);

  const getStatusColor = (status) => {
    const colors = {
      'envoye': 'bg-green-100 text-green-800',
      'recu': 'bg-blue-100 text-blue-800',
      'en_attente': 'bg-yellow-100 text-yellow-800',
      'erreur': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type) => {
    return type === 'envoi' ? Send : Inbox;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Gestion des Transmissions
          </h2>
          <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Gérez les envois et réceptions de dossiers
          </p>
        </div>
        <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle Transmission
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`rounded-xl shadow-sm border p-4 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Send className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Envoyés Aujourd'hui
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
            <div className="p-2 bg-blue-100 rounded-lg">
              <Inbox className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Reçus Aujourd'hui
              </p>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                5
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
                En Attente
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
            <div className="p-2 bg-purple-100 rounded-lg">
              <Archive className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Total Dossiers
              </p>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                234
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
              placeholder="Rechercher une transmission..."
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
            <option value="">Tous les types</option>
            <option value="envoi">Envoi</option>
            <option value="reception">Réception</option>
          </select>

          <select className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}>
            <option value="">Tous les statuts</option>
            <option value="envoye">Envoyé</option>
            <option value="recu">Reçu</option>
            <option value="en_attente">En Attente</option>
            <option value="erreur">Erreur</option>
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

      {/* Liste des transmissions */}
      <div className="space-y-4">
        {transmissions.map((transmission) => {
          const TypeIcon = getTypeIcon(transmission.type);
          return (
            <div key={transmission.id} className={`rounded-xl shadow-sm border p-6 ${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    transmission.type === 'envoi' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    <TypeIcon className={`w-6 h-6 ${
                      transmission.type === 'envoi' ? 'text-green-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {transmission.objet}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {transmission.type === 'envoi' ? 
                        `Vers: ${transmission.destinataire}` : 
                        `De: ${transmission.expediteur}`
                      }
                    </p>
                  </div>
                </div>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(transmission.statut)}`}>
                  {transmission.statut === 'envoye' ? 'Envoyé' :
                   transmission.statut === 'recu' ? 'Reçu' :
                   transmission.statut === 'en_attente' ? 'En Attente' : 'Erreur'}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Nombre de dossiers
                  </p>
                  <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {transmission.nombre_dossiers}
                  </p>
                </div>
                
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Date de transmission
                  </p>
                  <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {new Date(transmission.date_transmission).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Opérateur
                  </p>
                  <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {transmission.operateur}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Voir Détails
                </button>
                {transmission.statut === 'en_attente' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Confirmer Envoi
                  </button>
                )}
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Télécharger
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}