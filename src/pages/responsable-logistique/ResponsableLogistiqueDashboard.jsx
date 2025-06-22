import React from 'react';
import { Package, Truck, Users, Clock, CheckCircle, AlertCircle, TrendingUp, BarChart3 } from 'lucide-react';
import StatsCard from '../../components/StatsCard.jsx';
import StatisticsChart from '../../components/charts/StatisticsChart.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';

export default function ResponsableLogistiqueDashboard() {
  const { isDark } = useTheme();

  const stats = {
    dailyDeliveries: 28,
    pendingOrders: 15,
    teamEfficiency: 94,
    completedTasks: 156,
    activeVehicles: 8,
    warehouseCapacity: 78
  };

  const deliveryTrends = [
    { label: 'Sem 1', planned: 120, completed: 115, efficiency: 96 },
    { label: 'Sem 2', planned: 135, completed: 128, efficiency: 95 },
    { label: 'Sem 3', planned: 140, completed: 138, efficiency: 99 },
    { label: 'Sem 4', planned: 125, completed: 122, efficiency: 98 }
  ];

  const warehouseZones = [
    { zone: 'Zone A', capacity: 85, items: 450, status: 'optimal' },
    { zone: 'Zone B', capacity: 92, items: 380, status: 'high' },
    { zone: 'Zone C', capacity: 67, items: 290, status: 'optimal' },
    { zone: 'Zone D', capacity: 45, items: 180, status: 'low' }
  ];

  const teamPerformance = [
    { member: 'Hery Rabe', tasks: 45, efficiency: 98, speciality: 'Magasinier' },
    { member: 'Faly Rakoto', tasks: 38, efficiency: 95, speciality: 'Préparateur' },
    { member: 'Naina Razafy', tasks: 42, efficiency: 97, speciality: 'Contrôleur' },
    { member: 'Koto Andry', tasks: 35, efficiency: 92, speciality: 'Expéditeur' }
  ];

  const urgentTasks = [
    { task: 'Livraison Lot A - Analakely', deadline: '14:00', priority: 'high', progress: 75 },
    { task: 'Réception matériel urgent', deadline: '16:30', priority: 'high', progress: 30 },
    { task: 'Inventaire Zone B', deadline: 'Demain', priority: 'medium', progress: 60 },
    { task: 'Préparation commande spéciale', deadline: 'Demain', priority: 'medium', progress: 85 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`rounded-xl shadow-sm border p-6 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-2xl font-bold mb-2 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Dashboard Responsable Logistique
        </h2>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Gestion opérationnelle des stocks et livraisons
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
        <StatsCard
          title="Livraisons Aujourd'hui"
          value={stats.dailyDeliveries.toString()}
          icon={Truck}
          trend={{ value: 15, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Commandes en Attente"
          value={stats.pendingOrders.toString()}
          icon={Clock}
          trend={{ value: 8, isPositive: false }}
          color="orange"
        />
        <StatsCard
          title="Efficacité Équipe"
          value={`${stats.teamEfficiency}%`}
          icon={Users}
          trend={{ value: 3, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Tâches Terminées"
          value={stats.completedTasks.toString()}
          icon={CheckCircle}
          trend={{ value: 22, isPositive: true }}
          color="purple"
        />
        <StatsCard
          title="Véhicules Actifs"
          value={stats.activeVehicles.toString()}
          icon={Truck}
          trend={{ value: 0, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Capacité Entrepôt"
          value={`${stats.warehouseCapacity}%`}
          icon={Package}
          trend={{ value: 5, isPositive: true }}
          color="red"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tendances de livraison */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Performance Livraisons (4 dernières semaines)
          </h3>
          <div className="space-y-4">
            {deliveryTrends.map((week, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {week.label}
                  </span>
                  <span className={`text-sm font-bold ${
                    week.efficiency >= 95 ? 'text-green-600' : 
                    week.efficiency >= 90 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {week.efficiency}%
                  </span>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        Planifié: {week.planned}
                      </span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        Réalisé: {week.completed}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(week.completed / week.planned) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zones d'entrepôt */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Occupation des Zones d'Entrepôt
          </h3>
          <div className="space-y-4">
            {warehouseZones.map((zone, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {zone.zone}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {zone.items} articles
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      zone.status === 'high' ? 'bg-red-100 text-red-800' :
                      zone.status === 'optimal' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {zone.capacity}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      zone.status === 'high' ? 'bg-red-500' :
                      zone.status === 'optimal' ? 'bg-green-500' :
                      'bg-yellow-500'
                    }`}
                    style={{ width: `${zone.capacity}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Performance & Urgent Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance équipe */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Performance de l'Équipe
          </h3>
          <div className="space-y-4">
            {teamPerformance.map((member, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {member.member.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {member.member}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {member.speciality}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${
                      member.efficiency >= 95 ? 'text-green-600' : 
                      member.efficiency >= 90 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {member.efficiency}%
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {member.tasks} tâches
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tâches urgentes */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Tâches Urgentes
          </h3>
          <div className="space-y-4">
            {urgentTasks.map((task, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {task.task}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Échéance: {task.deadline}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.priority === 'high' ? 'Urgent' : 'Moyen'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        task.progress >= 80 ? 'bg-green-500' :
                        task.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {task.progress}%
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