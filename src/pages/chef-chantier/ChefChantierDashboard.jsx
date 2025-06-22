import React from 'react';
import { Users, MapPin, CheckCircle, Clock, AlertTriangle, Wrench, Calendar, TrendingUp } from 'lucide-react';
import StatsCard from '../../components/StatsCard.jsx';
import StatisticsChart from '../../components/charts/StatisticsChart.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';

export default function ChefChantierDashboard() {
  const { isDark } = useTheme();

  const stats = {
    activeTeams: 6,
    todayInstallations: 18,
    completedInstallations: 145,
    pendingIssues: 4,
    equipmentStatus: 95,
    teamEfficiency: 92
  };

  const teamPerformance = [
    { team: 'Équipe Alpha', leader: 'Rakoto Jean', installations: 8, efficiency: 95, status: 'active' },
    { team: 'Équipe Beta', leader: 'Razafy Paul', installations: 6, efficiency: 88, status: 'active' },
    { team: 'Équipe Gamma', leader: 'Andry Marie', installations: 4, efficiency: 92, status: 'break' },
    { team: 'Équipe Delta', leader: 'Rabe Hery', installations: 7, efficiency: 90, status: 'active' }
  ];

  const installationProgress = [
    { site: 'Analakely Zone A', progress: 85, team: 'Alpha', deadline: '16:00', issues: 0 },
    { site: 'Tsaralalana Lot B', progress: 60, team: 'Beta', deadline: '17:30', issues: 1 },
    { site: 'Antaninarenina', progress: 95, team: 'Gamma', deadline: '15:00', issues: 0 },
    { site: 'Isotry Centre', progress: 40, team: 'Delta', deadline: '18:00', issues: 2 }
  ];

  const weeklyStats = [
    { day: 'Lun', planned: 20, completed: 18, efficiency: 90 },
    { day: 'Mar', planned: 22, completed: 21, efficiency: 95 },
    { day: 'Mer', planned: 18, completed: 17, efficiency: 94 },
    { day: 'Jeu', planned: 25, completed: 23, efficiency: 92 },
    { day: 'Ven', planned: 20, completed: 19, efficiency: 95 },
    { day: 'Sam', planned: 15, completed: 14, efficiency: 93 }
  ];

  const equipmentStatus = [
    { equipment: 'Véhicules', total: 8, available: 7, maintenance: 1, status: 'good' },
    { equipment: 'Outils électriques', total: 24, available: 22, maintenance: 2, status: 'good' },
    { equipment: 'Équipements sécurité', total: 30, available: 28, maintenance: 2, status: 'good' },
    { equipment: 'Matériel mesure', total: 12, available: 10, maintenance: 2, status: 'warning' }
  ];

  const urgentIssues = [
    { issue: 'Problème réseau Analakely', severity: 'high', team: 'Alpha', eta: '30 min', type: 'technical' },
    { issue: 'Matériel manquant Tsaralalana', severity: 'medium', team: 'Beta', eta: '1h', type: 'logistics' },
    { issue: 'Accès difficile Isotry', severity: 'low', team: 'Delta', eta: '2h', type: 'access' }
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
          Dashboard Chef de Chantier
        </h2>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Supervision des équipes terrain et des installations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
        <StatsCard
          title="Équipes Actives"
          value={stats.activeTeams.toString()}
          icon={Users}
          trend={{ value: 0, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Installations Aujourd'hui"
          value={stats.todayInstallations.toString()}
          icon={MapPin}
          trend={{ value: 12, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Total Terminées"
          value={stats.completedInstallations.toString()}
          icon={CheckCircle}
          trend={{ value: 8, isPositive: true }}
          color="purple"
        />
        <StatsCard
          title="Problèmes en Cours"
          value={stats.pendingIssues.toString()}
          icon={AlertTriangle}
          trend={{ value: 1, isPositive: false }}
          color="red"
        />
        <StatsCard
          title="État Équipements"
          value={`${stats.equipmentStatus}%`}
          icon={Wrench}
          trend={{ value: 2, isPositive: true }}
          color="orange"
        />
        <StatsCard
          title="Efficacité Équipes"
          value={`${stats.teamEfficiency}%`}
          icon={TrendingUp}
          trend={{ value: 3, isPositive: true }}
          color="green"
        />
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance hebdomadaire */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Performance Hebdomadaire
          </h3>
          <div className="space-y-4">
            {weeklyStats.map((day, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {day.day}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {day.completed}/{day.planned}
                    </span>
                    <span className={`text-sm font-bold ${
                      day.efficiency >= 95 ? 'text-green-600' : 
                      day.efficiency >= 90 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {day.efficiency}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      day.efficiency >= 95 ? 'bg-green-500' : 
                      day.efficiency >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(day.completed / day.planned) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* État des équipements */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            État des Équipements
          </h3>
          <div className="space-y-4">
            {equipmentStatus.map((equipment, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {equipment.equipment}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    equipment.status === 'good' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {equipment.status === 'good' ? 'Bon' : 'Attention'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Disponible: {equipment.available}/{equipment.total}
                  </span>
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Maintenance: {equipment.maintenance}
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      equipment.status === 'good' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${(equipment.available / equipment.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teams and Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance des équipes */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Performance des Équipes
          </h3>
          <div className="space-y-4">
            {teamPerformance.map((team, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      team.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'
                    }`}></div>
                    <div>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {team.team}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Chef: {team.leader}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${
                      team.efficiency >= 90 ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {team.efficiency}%
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {team.installations} installations
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Problèmes urgents */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Problèmes Urgents
          </h3>
          <div className="space-y-4">
            {urgentIssues.map((issue, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                      issue.severity === 'high' ? 'text-red-500' :
                      issue.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {issue.issue}
                      </p>
                      <div className="flex items-center space-x-2 text-sm mt-1">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                          Équipe {issue.team}
                        </span>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>•</span>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                          ETA: {issue.eta}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    issue.severity === 'high' ? 'bg-red-100 text-red-800' :
                    issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {issue.severity === 'high' ? 'Urgent' :
                     issue.severity === 'medium' ? 'Moyen' : 'Faible'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress des installations */}
      <div className={`rounded-xl shadow-sm border p-6 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Progression des Installations en Cours
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {installationProgress.map((installation, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {installation.site}
                </h4>
                <span className={`text-sm font-bold ${
                  installation.progress >= 80 ? 'text-green-600' :
                  installation.progress >= 50 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {installation.progress}%
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  Équipe {installation.team}
                </span>
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  Fin prévue: {installation.deadline}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    installation.progress >= 80 ? 'bg-green-500' :
                    installation.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${installation.progress}%` }}
                ></div>
              </div>
              {installation.issues > 0 && (
                <div className="flex items-center space-x-1 text-xs text-red-600">
                  <AlertTriangle className="w-3 h-3" />
                  <span>{installation.issues} problème(s) signalé(s)</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}