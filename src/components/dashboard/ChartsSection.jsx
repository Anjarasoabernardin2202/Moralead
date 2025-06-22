import React from 'react';
import StatisticsChart from '../charts/StatisticsChart.jsx';
import SystemStatus from './SystemStatus.jsx';

export default function ChartsSection({ chartData }) {
  const defaultChartData = {
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
  };

  const charts = chartData || defaultChartData;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <StatisticsChart
        title="Évolution des Clients"
        data={charts.clientsOverTime}
        type="line"
        height={250}
      />
      
      <StatisticsChart
        title="Répartition par Statut"
        data={charts.statusDistribution}
        type="pie"
        height={250}
      />
      
      <SystemStatus />
    </div>
  );
}