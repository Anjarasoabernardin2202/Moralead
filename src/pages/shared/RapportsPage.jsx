import React, { useState } from 'react';
import { BarChart3, Download, Calendar, Filter, TrendingUp, Users, Package, MapPin } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

export default function RapportsPage() {
  const { isDark } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('mois');
  const [selectedType, setSelectedType] = useState('general');

  const rapportsDisponibles = [
    {
      id: 'installations',
      nom: 'Rapport d\'Installations',
      description: 'Statistiques des installations par période',
      icone: MapPin,
      couleur: 'bg-blue-500'
    },
    {
      id: 'equipes',
      nom: 'Performance des Équipes',
      description: 'Analyse de la performance des équipes terrain',
      icone: Users,
      couleur: 'bg-green-500'
    },
    {
      id: 'stocks',
      nom: 'Rapport de Stock',
      description: 'État des stocks et mouvements',
      icone: Package,
      couleur: 'bg-purple-500'
    },
    {
      id: 'financier',
      nom: 'Rapport Financier',
      description: 'Analyse des coûts et revenus',
      icone: TrendingUp,
      couleur: 'bg-orange-500'
    }
  ];

  const statistiquesGenerales = {
    installations_mois: 234,
    croissance: 12.5,
    equipes_actives: 8,
    taux_reussite: 94.2
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Rapports et Analyses
          </h2>
          <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Consultez les rapports de performance et les analyses
          </p>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`rounded-xl shadow-sm border p-4 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Installations ce Mois
              </p>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {statistiquesGenerales.installations_mois}
              </p>
            </div>
          </div>
        </div>
        
        <div className={`rounded-xl shadow-sm border p-4 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Croissance
              </p>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                +{statistiquesGenerales.croissance}%
              </p>
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-4 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Équipes Actives
              </p>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {statistiquesGenerales.equipes_actives}
              </p>
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-4 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-orange-600" />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Taux de Réussite
              </p>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {statistiquesGenerales.taux_reussite}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres de période */}
      <div className={`rounded-xl shadow-sm border p-6 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Période
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="semaine">Cette Semaine</option>
              <option value="mois">Ce Mois</option>
              <option value="trimestre">Ce Trimestre</option>
              <option value="annee">Cette Année</option>
              <option value="personnalise">Période Personnalisée</option>
            </select>
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Type de Rapport
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="general">Rapport Général</option>
              <option value="detaille">Rapport Détaillé</option>
              <option value="executif">Résumé Exécutif</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Filter className="w-4 h-4 mr-2" />
              Appliquer Filtres
            </button>
          </div>
        </div>
      </div>

      {/* Rapports disponibles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rapportsDisponibles.map((rapport) => {
          const IconeRapport = rapport.icone;
          return (
            <div key={rapport.id} className={`rounded-xl shadow-sm border p-6 ${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${rapport.couleur}`}>
                  <IconeRapport className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {rapport.nom}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {rapport.description}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Voir le Rapport
                </button>
                
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </button>
                  <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    Excel
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Graphique de tendance */}
      <div className={`rounded-xl shadow-sm border p-6 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Tendance des Installations (6 derniers mois)
        </h3>
        
        <div className="h-64 flex items-end justify-between space-x-2">
          {[
            { mois: 'Août', valeur: 180 },
            { mois: 'Sept', valeur: 210 },
            { mois: 'Oct', valeur: 195 },
            { mois: 'Nov', valeur: 245 },
            { mois: 'Déc', valeur: 220 },
            { mois: 'Jan', valeur: 234 }
          ].map((donnee, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500 hover:opacity-80"
                style={{ 
                  height: `${(donnee.valeur / 250) * 200}px`,
                  minHeight: '20px'
                }}
              ></div>
              <span className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {donnee.mois}
              </span>
              <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {donnee.valeur}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}