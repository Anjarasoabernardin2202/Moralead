import React from 'react';
import StatsCard from '../StatsCard.jsx';
import { Users, CheckCircle, Clock, Building, DollarSign, TrendingUp } from 'lucide-react';

export default function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
      <StatsCard
        title="Total Clients"
        value={stats?.clients_total?.toLocaleString() || '0'}
        icon={Users}
        trend={{ value: 12, isPositive: true }}
        color="blue"
      />
      <StatsCard
        title="Clients Validés"
        value={stats?.clients_valides?.toLocaleString() || '0'}
        icon={CheckCircle}
        trend={{ value: 8, isPositive: true }}
        color="green"
      />
      <StatsCard
        title="En Attente"
        value={stats?.clients_en_attente?.toLocaleString() || '0'}
        icon={Clock}
        trend={{ value: 5, isPositive: false }}
        color="orange"
      />
      <StatsCard
        title="Projets Actifs"
        value="23"
        icon={Building}
        trend={{ value: 15, isPositive: true }}
        color="purple"
      />
      <StatsCard
        title="Chiffre d'Affaires"
        value="1.25M Ar"
        icon={DollarSign}
        trend={{ value: 12.5, isPositive: true }}
        color="green"
      />
      <StatsCard
        title="Croissance"
        value="12.5%"
        icon={TrendingUp}
        trend={{ value: 3, isPositive: true }}
        color="blue"
      />
    </div>
  );
}