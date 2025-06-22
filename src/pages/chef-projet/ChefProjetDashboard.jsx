import React from 'react';
import { FolderOpen, CheckCircle, Users, Clock, AlertTriangle } from 'lucide-react';
import StatsCard from '../../components/StatsCard.jsx';
import StatisticsChart from '../../components/charts/StatisticsChart.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { useRealTimeData } from '../../hooks/useRealTimeApi.js';

export default function ChefProjetDashboard() {
  const { isDark } = useTheme();
  const { data: projectData, loading } = useRealTimeData('/chef-projet/dashboard', 20000);

  const defaultData = {
    stats: {
      assignedProjects: 12,
      pendingValidations: 45,
      completedThisMonth: 89,
      teamMembers: 8
    },
    charts: {
      projectProgress: [
        { label: 'Lot A', value: 85 },
        { label: 'Lot B', value: 67 },
        { label: 'Lot C', value: 92 },
        { label: 'Lot D', value: 34 }
      ],
      validationStatus: [
        { label: 'Approuvé', value: 234, color: '#10B981' },
        { label: 'En Attente', value: 45, color: '#F59E0B' },
        { label: 'Rejeté', value: 12, color: '#EF4444' }
      ]
    },
    pendingValidations: [
      { id: 'DOS-2024-001', client: 'RAKOTO Jean', priority: 'high', deadline: '2024-01-20' },
      { id: 'DOS-2024-002', client: 'RAZAFY Marie', priority: 'medium', deadline: '2024-01-22' },
      { id: 'DOS-2024-003', client: 'ANDRY Paul', priority: 'low', deadline: '2024-01-25' }
    ]
  };

  const data = projectData || defaultData;

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
          Dashboard Chef de Projet
        </h2>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Gestion et suivi de vos projets
        </p>
      </div>

      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatsCard
          title="Projets Assignés"
          value={data.stats.assignedProjects.toString()}
          icon={FolderOpen}
          trend={{ value: 2, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Validations en Attente"
          value={data.stats.pendingValidations.toString()}
          icon={Clock}
          trend={{ value: 5, isPositive: false }}
          color="orange"
        />
        <StatsCard
          title="Terminés ce Mois"
          value={data.stats.completedThisMonth.toString()}
          icon={CheckCircle}
          trend={{ value: 15, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Membres d'Équipe"
          value={data.stats.teamMembers.toString()}
          icon={Users}
          trend={{ value: 0, isPositive: true }}
          color="purple"
        />
      </div>

      {/* Charts Section - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatisticsChart
          title="Progression des Lots"
          data={data.charts.projectProgress}
          type="bar"
          height={300}
        />
        
        <StatisticsChart
          title="Statut des Validations"
          data={data.charts.validationStatus}
          type="pie"
          height={300}
        />
      </div>

      {/* Project Management Section - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Validations */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Validations Urgentes
            </h3>
            <AlertTriangle className="w-5 h-5 text-orange-500" />
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {data.pendingValidations.map((item, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {item.id}
                    </p>
                    <p className={`text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.client}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      Échéance: {item.deadline}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ml-2 ${
                    item.priority === 'high' ? 'bg-red-100 text-red-800' :
                    item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.priority === 'high' ? 'Urgent' :
                     item.priority === 'medium' ? 'Moyen' : 'Faible'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Activity */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Activité de l'Équipe
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {[
              { name: 'Nivo Randria', action: 'a terminé 5 installations', time: '2h', avatar: 'NR' },
              { name: 'Koto Rasolofo', action: 'a validé 3 dossiers', time: '4h', avatar: 'KR' },
              { name: 'Lala Andriana', action: 'a planifié 8 interventions', time: '6h', avatar: 'LA' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                  {activity.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                    <span className="font-medium">{activity.name}</span> {activity.action}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Il y a {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}