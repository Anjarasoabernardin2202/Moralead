import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

// Import des composants modulaires
import DashboardHeader from '../../components/dashboard/DashboardHeader.jsx';
import StatsGrid from '../../components/dashboard/StatsGrid.jsx';
import ChartsSection from '../../components/dashboard/ChartsSection.jsx';
import RecentActivities from '../../components/dashboard/RecentActivities.jsx';
import QuickActions from '../../components/dashboard/QuickActions.jsx';

export default function AdminDashboard() {
  const { isDark } = useTheme();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Données par défaut (fallback)
  const defaultData = {
    totaux: {
      clients_total: 2847,
      clients_valides: 2234,
      clients_en_cours: 156,
      clients_en_attente: 457
    },
    charts: {
      clientsOverTime: [
        { label: 'Jan', value: 234 },
        { label: 'Fév', value: 189 },
        { label: 'Mar', value: 267 },
        { label: 'Avr', value: 298 },
        { label: 'Mai', value: 345 },
        { label: 'Jun', value: 389 }
      ],
      statusDistribution: [
        { label: 'Validé', value: 2234, color: '#10B981' },
        { label: 'En Cours', value: 156, color: '#F59E0B' },
        { label: 'En Attente', value: 457, color: '#EF4444' }
      ]
    },
    recentActivities: [
      {
        id: 1,
        user: 'Jean Rakoto',
        action: 'a validé 15 dossiers clients',
        time: 'Il y a 5 min',
        type: 'success'
      },
      {
        id: 2,
        user: 'Marie Razafy',
        action: 'a approuvé une demande de matériel',
        time: 'Il y a 12 min',
        type: 'info'
      },
      {
        id: 3,
        user: 'Nivo Randria',
        action: 'a planifié 8 installations',
        time: 'Il y a 25 min',
        type: 'calendar'
      }
    ]
  };

  // Simulation de chargement des données
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Utiliser les données par défaut
        setDashboardData(defaultData);
      } catch (err) {
        console.error('Erreur chargement dashboard:', err);
        setError('Erreur de chargement des données');
        // En cas d'erreur, utiliser quand même les données par défaut
        setDashboardData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Affichage du loading
  if (loading) {
    return (
      <div className="space-y-6">
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-center h-32">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Chargement du dashboard...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Utiliser les données chargées ou les données par défaut
  const data = dashboardData || defaultData;

  return (
    <div className="space-y-6">
      {/* Header du dashboard */}
      <DashboardHeader 
        title="Dashboard Administrateur"
        subtitle="Vue d'ensemble complète du système Moralead V2"
        showRealTime={true}
      />

      {/* Message d'erreur si nécessaire */}
      {error && (
        <div className={`rounded-xl shadow-sm border p-4 ${
          isDark ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
        }`}>
          <p className={`text-sm ${isDark ? 'text-red-300' : 'text-red-600'}`}>
            ⚠️ {error} - Affichage des données de démonstration
          </p>
        </div>
      )}

      {/* Grille des statistiques */}
      <StatsGrid stats={data.totaux} />

      {/* Section des graphiques */}
      <ChartsSection chartData={data.charts} />

      {/* Section activités et actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivities activities={data.recentActivities} />
        <QuickActions />
      </div>
    </div>
  );
}