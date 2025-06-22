export const adminDashboardData = {
  stats: {
    totalClients: 2847,
    validatedClients: 2234,
    pendingClients: 156,
    activeProjects: 23,
    totalRevenue: 1250000,
    monthlyGrowth: 12.5
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
    ],
    departmentActivity: [
      { label: 'Logistique', value: 89 },
      { label: 'Travaux', value: 76 },
      { label: 'SIG', value: 45 },
      { label: 'Transmission', value: 34 }
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

export const chefProjetDashboardData = {
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
  }
};

export const conducteurTravauxDashboardData = {
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
  }
};