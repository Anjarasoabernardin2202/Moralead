import React from 'react';
import { Package, TrendingDown, TrendingUp, Clock, CheckCircle, AlertTriangle, BarChart3, Truck } from 'lucide-react';
import StatsCard from '../../components/StatsCard.jsx';
import StatisticsChart from '../../components/charts/StatisticsChart.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';

export default function MagasinierDashboard() {
  const { isDark } = useTheme();

  const stats = {
    todayEntries: 45,
    todayExits: 38,
    todayReturns: 7,
    pendingTasks: 12,
    completedTasks: 28,
    stockAlerts: 5
  };

  const dailyMovements = [
    { hour: '08h', entries: 8, exits: 2, returns: 0 },
    { hour: '09h', entries: 12, exits: 5, returns: 1 },
    { hour: '10h', entries: 6, exits: 8, returns: 2 },
    { hour: '11h', entries: 4, exits: 12, returns: 1 },
    { hour: '12h', entries: 2, exits: 3, returns: 0 },
    { hour: '13h', entries: 3, exits: 1, returns: 0 },
    { hour: '14h', entries: 5, exits: 4, returns: 2 },
    { hour: '15h', entries: 5, exits: 3, returns: 1 }
  ];

  const stockCategories = [
    { category: 'Compteurs', stock: 156, movements: 23, trend: 'up' },
    { category: 'Câbles', stock: 890, movements: 45, trend: 'down' },
    { category: 'Disjoncteurs', stock: 234, movements: 18, trend: 'up' },
    { category: 'Coffrets', stock: 67, movements: 12, trend: 'stable' },
    { category: 'Accessoires', stock: 445, movements: 31, trend: 'up' }
  ];

  const pendingOperations = [
    { operation: 'Réception livraison fournisseur', type: 'entry', priority: 'high', time: '09:30', items: 45 },
    { operation: 'Préparation commande Lot A', type: 'exit', priority: 'high', time: '10:15', items: 23 },
    { operation: 'Contrôle retour matériel', type: 'return', priority: 'medium', time: '11:00', items: 8 },
    { operation: 'Inventaire Zone C', type: 'inventory', priority: 'low', time: '14:00', items: 120 }
  ];

  const recentAlerts = [
    { item: 'Compteurs 15-60A', level: 'critical', current: 8, minimum: 20, action: 'Commande urgente' },
    { item: 'Disjoncteurs 32A', level: 'warning', current: 15, minimum: 25, action: 'Réappro. prévue' },
    { item: 'Câble 6mm²', level: 'info', current: 45, minimum: 30, action: 'Stock optimal' }
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
          Dashboard Magasinier
        </h2>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Gestion quotidienne des mouvements de stock
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
        <StatsCard
          title="Entrées Aujourd'hui"
          value={stats.todayEntries.toString()}
          icon={TrendingUp}
          trend={{ value: 12, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Sorties Aujourd'hui"
          value={stats.todayExits.toString()}
          icon={TrendingDown}
          trend={{ value: 8, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Retours Aujourd'hui"
          value={stats.todayReturns.toString()}
          icon={Package}
          trend={{ value: 2, isPositive: false }}
          color="orange"
        />
        <StatsCard
          title="Tâches en Attente"
          value={stats.pendingTasks.toString()}
          icon={Clock}
          trend={{ value: 3, isPositive: false }}
          color="red"
        />
        <StatsCard
          title="Tâches Terminées"
          value={stats.completedTasks.toString()}
          icon={CheckCircle}
          trend={{ value: 15, isPositive: true }}
          color="purple"
        />
        <StatsCard
          title="Alertes Stock"
          value={stats.stockAlerts.toString()}
          icon={AlertTriangle}
          trend={{ value: 1, isPositive: false }}
          color="red"
        />
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mouvements par heure */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Mouvements par Heure (Aujourd'hui)
          </h3>
          <div className="space-y-3">
            {dailyMovements.map((movement, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className={`text-sm font-medium w-12 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {movement.hour}
                </span>
                <div className="flex-1 flex space-x-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                    <div 
                      className="bg-green-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(movement.entries / 15) * 100}%` }}
                    ></div>
                    {movement.entries > 0 && (
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                        +{movement.entries}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                    <div 
                      className="bg-red-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(movement.exits / 15) * 100}%` }}
                    ></div>
                    {movement.exits > 0 && (
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                        -{movement.exits}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                    <div 
                      className="bg-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(movement.returns / 5) * 100}%` }}
                    ></div>
                    {movement.returns > 0 && (
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                        ↩{movement.returns}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Entrées</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Sorties</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Retours</span>
            </div>
          </div>
        </div>

        {/* Stock par catégorie */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Stock par Catégorie
          </h3>
          <div className="space-y-4">
            {stockCategories.map((category, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      category.trend === 'up' ? 'bg-green-500' :
                      category.trend === 'down' ? 'bg-red-500' : 'bg-gray-500'
                    }`}></div>
                    <div>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {category.category}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {category.movements} mouvements aujourd'hui
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {category.stock}
                    </p>
                    <div className="flex items-center space-x-1">
                      {category.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      ) : category.trend === 'down' ? (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      ) : (
                        <BarChart3 className="w-3 h-3 text-gray-500" />
                      )}
                      <span className={`text-xs ${
                        category.trend === 'up' ? 'text-green-600' :
                        category.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                      }`}>
                        {category.trend === 'up' ? 'Hausse' :
                         category.trend === 'down' ? 'Baisse' : 'Stable'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Operations and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Opérations en attente */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Opérations en Attente
          </h3>
          <div className="space-y-3">
            {pendingOperations.map((operation, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      operation.type === 'entry' ? 'bg-green-100 text-green-600' :
                      operation.type === 'exit' ? 'bg-red-100 text-red-600' :
                      operation.type === 'return' ? 'bg-blue-100 text-blue-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {operation.type === 'entry' ? <TrendingUp className="w-4 h-4" /> :
                       operation.type === 'exit' ? <TrendingDown className="w-4 h-4" /> :
                       operation.type === 'return' ? <Package className="w-4 h-4" /> :
                       <BarChart3 className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {operation.operation}
                      </p>
                      <div className="flex items-center space-x-2 text-sm">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                          {operation.time}
                        </span>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>•</span>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                          {operation.items} articles
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    operation.priority === 'high' ? 'bg-red-100 text-red-800' :
                    operation.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {operation.priority === 'high' ? 'Urgent' :
                     operation.priority === 'medium' ? 'Moyen' : 'Faible'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alertes stock */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Alertes Stock
          </h3>
          <div className="space-y-4">
            {recentAlerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                      alert.level === 'critical' ? 'text-red-500' :
                      alert.level === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {alert.item}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Stock actuel: {alert.current} / Minimum: {alert.minimum}
                      </p>
                      <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {alert.action}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    alert.level === 'critical' ? 'bg-red-100 text-red-800' :
                    alert.level === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {alert.level === 'critical' ? 'Critique' :
                     alert.level === 'warning' ? 'Attention' : 'Info'}
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      alert.level === 'critical' ? 'bg-red-500' :
                      alert.level === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${(alert.current / alert.minimum) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}