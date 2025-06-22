import React from 'react';
import { Package, TrendingUp, AlertTriangle, CheckCircle, Truck, Users, BarChart3, Clock } from 'lucide-react';
import StatsCard from '../../components/StatsCard.jsx';
import StatisticsChart from '../../components/charts/StatisticsChart.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import RealTimeIndicator from '../../components/ui/RealTimeIndicator.jsx';

export default function DirecteurLogistiqueDashboard() {
  const { isDark } = useTheme();

  const stats = {
    totalStock: 15420,
    stockValue: 2850000,
    pendingRequests: 23,
    deliveredToday: 45,
    lowStockItems: 8,
    teamMembers: 12
  };

  const stockMovements = [
    { label: 'Lun', entrees: 120, sorties: 85, retours: 15 },
    { label: 'Mar', entrees: 95, sorties: 110, retours: 8 },
    { label: 'Mer', entrees: 140, sorties: 95, retours: 12 },
    { label: 'Jeu', entrees: 110, sorties: 125, retours: 20 },
    { label: 'Ven', entrees: 160, sorties: 140, retours: 10 },
    { label: 'Sam', entrees: 80, sorties: 60, retours: 5 },
    { label: 'Dim', entrees: 45, sorties: 30, retours: 3 }
  ];

  const stockDistribution = [
    { label: 'Compteurs', value: 450, color: '#3B82F6' },
    { label: 'Câbles', value: 1200, color: '#10B981' },
    { label: 'Disjoncteurs', value: 320, color: '#F59E0B' },
    { label: 'Coffrets', value: 180, color: '#8B5CF6' },
    { label: 'Accessoires', value: 890, color: '#EF4444' }
  ];

  const criticalItems = [
    { item: 'Compteurs 15-60A', current: 12, minimum: 20, status: 'critical' },
    { item: 'Disjoncteurs 32A', current: 8, minimum: 15, status: 'critical' },
    { item: 'Câble 4mm²', current: 45, minimum: 50, status: 'warning' },
    { item: 'Coffrets IP65', current: 18, minimum: 25, status: 'warning' }
  ];

  const recentRequests = [
    { id: 'REQ-001', requester: 'Nivo Randria', items: 'Compteurs x15', status: 'pending', priority: 'high', date: '2024-01-20' },
    { id: 'REQ-002', requester: 'Koto Rasolofo', items: 'Câbles x100m', status: 'approved', priority: 'medium', date: '2024-01-20' },
    { id: 'REQ-003', requester: 'Lala Andriana', items: 'Disjoncteurs x8', status: 'delivered', priority: 'low', date: '2024-01-19' }
  ];

  return (
    <div className="space-y-6">
      {/* Header avec indicateur temps réel */}
      <div className={`rounded-xl shadow-sm border p-6 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Dashboard Directeur Logistique
            </h2>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Supervision globale des stocks et de la logistique
            </p>
          </div>
          <RealTimeIndicator isActive={true} lastUpdate={new Date()} />
        </div>
      </div>

      {/* Stats principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
        <StatsCard
          title="Valeur Stock Total"
          value={`${(stats.stockValue / 1000000).toFixed(1)}M Ar`}
          icon={Package}
          trend={{ value: 8.5, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Articles en Stock"
          value={stats.totalStock.toLocaleString()}
          icon={BarChart3}
          trend={{ value: 12, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Demandes en Attente"
          value={stats.pendingRequests.toString()}
          icon={Clock}
          trend={{ value: 5, isPositive: false }}
          color="orange"
        />
        <StatsCard
          title="Livrés Aujourd'hui"
          value={stats.deliveredToday.toString()}
          icon={Truck}
          trend={{ value: 25, isPositive: true }}
          color="purple"
        />
        <StatsCard
          title="Stock Critique"
          value={stats.lowStockItems.toString()}
          icon={AlertTriangle}
          trend={{ value: 2, isPositive: false }}
          color="red"
        />
        <StatsCard
          title="Équipe Logistique"
          value={stats.teamMembers.toString()}
          icon={Users}
          trend={{ value: 0, isPositive: true }}
          color="blue"
        />
      </div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Mouvements de Stock (7 derniers jours)
          </h3>
          <div className="space-y-4">
            {stockMovements.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className={`text-sm font-medium w-12 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {day.label}
                </span>
                <div className="flex-1 mx-4">
                  <div className="flex space-x-2 h-6">
                    <div 
                      className="bg-green-500 rounded-sm flex items-center justify-center text-xs text-white font-medium"
                      style={{ width: `${(day.entrees / 200) * 100}%`, minWidth: '20px' }}
                    >
                      {day.entrees > 50 ? day.entrees : ''}
                    </div>
                    <div 
                      className="bg-red-500 rounded-sm flex items-center justify-center text-xs text-white font-medium"
                      style={{ width: `${(day.sorties / 200) * 100}%`, minWidth: '20px' }}
                    >
                      {day.sorties > 50 ? day.sorties : ''}
                    </div>
                    <div 
                      className="bg-blue-500 rounded-sm flex items-center justify-center text-xs text-white font-medium"
                      style={{ width: `${(day.retours / 200) * 100}%`, minWidth: '15px' }}
                    >
                      {day.retours > 10 ? day.retours : ''}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-green-600">+{day.entrees}</div>
                  <div className="text-xs text-red-600">-{day.sorties}</div>
                  <div className="text-xs text-blue-600">↩{day.retours}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Entrées</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Sorties</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Retours</span>
            </div>
          </div>
        </div>

        <StatisticsChart
          title="Répartition du Stock par Catégorie"
          data={stockDistribution}
          type="pie"
          height={300}
        />
      </div>

      {/* Alertes et demandes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock critique */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Stock Critique
            </h3>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div className="space-y-3">
            {criticalItems.map((item, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {item.item}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Stock: {item.current} / Min: {item.minimum}
                    </p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          item.status === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${(item.current / item.minimum) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ml-3 ${
                    item.status === 'critical' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status === 'critical' ? 'Critique' : 'Attention'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demandes récentes */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Demandes Récentes
          </h3>
          <div className="space-y-3">
            {recentRequests.map((request, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {request.id}
                      </p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        request.priority === 'high' ? 'bg-red-100 text-red-800' :
                        request.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {request.priority === 'high' ? 'Urgent' :
                         request.priority === 'medium' ? 'Moyen' : 'Faible'}
                      </span>
                    </div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {request.requester} - {request.items}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {request.date}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    request.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    request.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.status === 'delivered' ? 'Livré' :
                     request.status === 'approved' ? 'Approuvé' : 'En attente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}