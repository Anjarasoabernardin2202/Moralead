import React from 'react';
import { Calendar, Users, FileText, Clock, CheckCircle, AlertTriangle, TrendingUp, BarChart3 } from 'lucide-react';
import StatsCard from '../../components/StatsCard.jsx';
import StatisticsChart from '../../components/charts/StatisticsChart.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';

export default function CoordinateurProjetDashboard() {
  const { isDark } = useTheme();

  const stats = {
    activeProjects: 15,
    totalTasks: 89,
    completedTasks: 67,
    upcomingDeadlines: 8,
    teamMembers: 24,
    projectsOnTrack: 12
  };

  const projectTimeline = [
    { project: 'Lot A - Analakely', progress: 85, deadline: '2024-02-15', status: 'on-track', team: 6 },
    { project: 'Lot B - Tsaralalana', progress: 60, deadline: '2024-02-20', status: 'at-risk', team: 4 },
    { project: 'Lot C - Antaninarenina', progress: 95, deadline: '2024-02-10', status: 'ahead', team: 5 },
    { project: 'Lot D - Isotry', progress: 40, deadline: '2024-02-25', status: 'delayed', team: 3 }
  ];

  const weeklyProgress = [
    { week: 'S1', planned: 25, completed: 23, efficiency: 92 },
    { week: 'S2', planned: 30, completed: 28, efficiency: 93 },
    { week: 'S3', planned: 28, completed: 26, efficiency: 93 },
    { week: 'S4', planned: 32, completed: 31, efficiency: 97 }
  ];

  const resourceAllocation = [
    { resource: 'Équipes Terrain', allocated: 18, available: 6, utilization: 75 },
    { resource: 'Véhicules', allocated: 12, available: 3, utilization: 80 },
    { resource: 'Équipements', allocated: 45, available: 15, utilization: 75 },
    { resource: 'Matériel', allocated: 890, available: 210, utilization: 81 }
  ];

  const upcomingMilestones = [
    { milestone: 'Validation Lot A', date: '2024-01-22', project: 'Analakely', priority: 'high' },
    { milestone: 'Livraison matériel Lot B', date: '2024-01-23', project: 'Tsaralalana', priority: 'medium' },
    { milestone: 'Inspection finale Lot C', date: '2024-01-25', project: 'Antaninarenina', priority: 'high' },
    { milestone: 'Démarrage Lot E', date: '2024-01-28', project: 'Nouveau secteur', priority: 'low' }
  ];

  const teamWorkload = [
    { team: 'Équipe Alpha', workload: 95, projects: 3, efficiency: 94, status: 'overloaded' },
    { team: 'Équipe Beta', workload: 78, projects: 2, efficiency: 96, status: 'optimal' },
    { team: 'Équipe Gamma', workload: 85, projects: 3, efficiency: 92, status: 'optimal' },
    { team: 'Équipe Delta', workload: 60, projects: 2, efficiency: 88, status: 'underutilized' }
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
          Dashboard Coordinateur de Projet
        </h2>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Coordination et suivi global des projets
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
        <StatsCard
          title="Projets Actifs"
          value={stats.activeProjects.toString()}
          icon={FileText}
          trend={{ value: 2, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Tâches Totales"
          value={stats.totalTasks.toString()}
          icon={BarChart3}
          trend={{ value: 12, isPositive: true }}
          color="purple"
        />
        <StatsCard
          title="Tâches Terminées"
          value={stats.completedTasks.toString()}
          icon={CheckCircle}
          trend={{ value: 8, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Échéances Proches"
          value={stats.upcomingDeadlines.toString()}
          icon={Clock}
          trend={{ value: 3, isPositive: false }}
          color="orange"
        />
        <StatsCard
          title="Membres d'Équipe"
          value={stats.teamMembers.toString()}
          icon={Users}
          trend={{ value: 1, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Projets dans les Temps"
          value={stats.projectsOnTrack.toString()}
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
          color="green"
        />
      </div>

      {/* Project Timeline & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timeline des projets */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Timeline des Projets
          </h3>
          <div className="space-y-4">
            {projectTimeline.map((project, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {project.project}
                  </h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    project.status === 'on-track' ? 'bg-green-100 text-green-800' :
                    project.status === 'ahead' ? 'bg-blue-100 text-blue-800' :
                    project.status === 'at-risk' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {project.status === 'on-track' ? 'Dans les temps' :
                     project.status === 'ahead' ? 'En avance' :
                     project.status === 'at-risk' ? 'À risque' : 'En retard'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    Échéance: {project.deadline}
                  </span>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    {project.team} membres
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        project.status === 'on-track' || project.status === 'ahead' ? 'bg-green-500' :
                        project.status === 'at-risk' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {project.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progression hebdomadaire */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Progression Hebdomadaire
          </h3>
          <div className="space-y-4">
            {weeklyProgress.map((week, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {week.week}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {week.completed}/{week.planned}
                    </span>
                    <span className={`text-sm font-bold ${
                      week.efficiency >= 95 ? 'text-green-600' : 
                      week.efficiency >= 90 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {week.efficiency}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      week.efficiency >= 95 ? 'bg-green-500' : 
                      week.efficiency >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(week.completed / week.planned) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Allocation & Team Workload */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Allocation des ressources */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Allocation des Ressources
          </h3>
          <div className="space-y-4">
            {resourceAllocation.map((resource, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {resource.resource}
                  </span>
                  <span className={`text-sm font-bold ${
                    resource.utilization >= 80 ? 'text-red-600' :
                    resource.utilization >= 70 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {resource.utilization}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    Alloué: {resource.allocated}
                  </span>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    Disponible: {resource.available}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      resource.utilization >= 80 ? 'bg-red-500' :
                      resource.utilization >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${resource.utilization}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charge de travail des équipes */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Charge de Travail des Équipes
          </h3>
          <div className="space-y-4">
            {teamWorkload.map((team, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {team.team}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    team.status === 'overloaded' ? 'bg-red-100 text-red-800' :
                    team.status === 'optimal' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {team.status === 'overloaded' ? 'Surchargé' :
                     team.status === 'optimal' ? 'Optimal' : 'Sous-utilisé'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    {team.projects} projets
                  </span>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    Efficacité: {team.efficiency}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      team.status === 'overloaded' ? 'bg-red-500' :
                      team.status === 'optimal' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${team.workload}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Milestones */}
      <div className={`rounded-xl shadow-sm border p-6 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Jalons à Venir
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingMilestones.map((milestone, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {milestone.milestone}
                </h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  milestone.priority === 'high' ? 'bg-red-100 text-red-800' :
                  milestone.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {milestone.priority === 'high' ? 'Urgent' :
                   milestone.priority === 'medium' ? 'Moyen' : 'Faible'}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  {milestone.date}
                </span>
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>•</span>
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  {milestone.project}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}