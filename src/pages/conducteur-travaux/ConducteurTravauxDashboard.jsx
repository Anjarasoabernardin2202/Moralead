import React from 'react';
import { Users, Calendar, CheckCircle, Package, MapPin, Clock } from 'lucide-react';
import StatsCard from '../../components/StatsCard.jsx';
import StatisticsChart from '../../components/charts/StatisticsChart.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { useRealTimeData } from '../../hooks/useRealTimeApi.js';

export default function ConducteurTravauxDashboard() {
  const { isDark } = useTheme();
  const { data: workData, loading } = useRealTimeData('/conducteur-travaux/dashboard', 15000);

  const defaultData = {
    stats: {
      assignedClients: 89,
      scheduledInstallations: 34,
      completedToday: 12,
      pendingMaterials: 5
    },
    charts: {
      installationProgress: [
        { label: 'Lun', value: 12 },
        { label: 'Mar', value: 8 },
        { label: 'Mer', value: 15 },
        { label: 'Jeu', value: 10 },
        { label: 'Ven', value: 18 },
        { label: 'Sam', value: 6 },
        { label: 'Dim', value: 3 }
      ],
      clientStatus: [
        { label: 'Terminé', value: 67, color: '#10B981' },
        { label: 'En Cours', value: 22, color: '#F59E0B' },
        { label: 'Planifié', value: 34, color: '#3B82F6' }
      ]
    },
    todaySchedule: [
      { time: '08:00', client: 'RAKOTO Jean', address: 'Analakely', status: 'completed', coords: '-18.8792, 47.5079' },
      { time: '10:30', client: 'RAZAFY Marie', address: 'Tsaralalana', status: 'in-progress', coords: '-18.8656, 47.5267' },
      { time: '14:00', client: 'ANDRY Paul', address: 'Antaninarenina', status: 'scheduled', coords: '-18.8845, 47.5234' },
      { time: '16:30', client: 'RABE Hery', address: 'Isotry', status: 'scheduled', coords: '-18.8923, 47.5156' }
    ],
    materialRequests: [
      { item: 'Compteurs électriques', quantity: 15, status: 'approved', requestDate: '2024-01-15' },
      { item: 'Câbles 2.5mm²', quantity: 100, status: 'pending', requestDate: '2024-01-16' },
      { item: 'Disjoncteurs 20A', quantity: 8, status: 'delivered', requestDate: '2024-01-14' }
    ]
  };

  const data = workData || defaultData;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className={`rounded-xl shadow-sm border p-6 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-2xl font-bold mb-2 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Dashboard Conducteur de Travaux
        </h2>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Suivi des installations et gestion terrain
        </p>
      </div>

      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatsCard
          title="Clients Assignés"
          value={data.stats.assignedClients.toString()}
          icon={Users}
          trend={{ value: 5, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Installations Planifiées"
          value={data.stats.scheduledInstallations.toString()}
          icon={Calendar}
          trend={{ value: 8, isPositive: true }}
          color="orange"
        />
        <StatsCard
          title="Terminées Aujourd'hui"
          value={data.stats.completedToday.toString()}
          icon={CheckCircle}
          trend={{ value: 20, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Matériel en Attente"
          value={data.stats.pendingMaterials.toString()}
          icon={Package}
          trend={{ value: 2, isPositive: false }}
          color="red"
        />
      </div>

      {/* Charts Section - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatisticsChart
          title="Installations par Jour"
          data={data.charts.installationProgress}
          type="bar"
          height={300}
        />
        
        <StatisticsChart
          title="Statut des Clients"
          data={data.charts.clientStatus}
          type="pie"
          height={300}
        />
      </div>

      {/* Today's Schedule & Material Requests - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Planning d'Aujourd'hui
            </h3>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {data.todaySchedule.map((appointment, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <span className={`text-sm font-medium flex-shrink-0 ${
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {appointment.time}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {appointment.client}
                      </p>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <p className={`text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {appointment.address}
                        </p>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {appointment.coords}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ml-2 ${
                    appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {appointment.status === 'completed' ? 'Terminé' :
                     appointment.status === 'in-progress' ? 'En cours' : 'Planifié'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Material Requests */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Demandes de Matériel
            </h3>
            <Package className="w-5 h-5 text-purple-500" />
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {data.materialRequests.map((request, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {request.item}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Quantité: {request.quantity}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      Demandé le: {request.requestDate}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ml-2 ${
                    request.status === 'approved' ? 'bg-green-100 text-green-800' :
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {request.status === 'approved' ? 'Approuvé' :
                     request.status === 'pending' ? 'En attente' : 'Livré'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 text-sm font-medium">
            Nouvelle Demande
          </button>
        </div>
      </div>
    </div>
  );
}