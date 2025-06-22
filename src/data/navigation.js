import { 
  LayoutDashboard, 
  Users, 
  FolderOpen, 
  Settings, 
  Calendar,
  FileText,
  Package,
  Truck,
  MapPin,
  ClipboardList,
  Send,
  UserCheck,
  Building,
  Archive,
  BarChart3,
  Warehouse,
  ShoppingCart,
  FileEdit,
  Map
} from 'lucide-react';

export const navigationItems = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    roles: ['admin', 'chef_projet', 'directeur_logistique', 'responsable_logistique', 'magasinier', 'conducteur_travaux', 'chef_chantier', 'coordinateur_projet', 'agent_transmission', 'responsable_sig', 'agent_saisie']
  },
  {
    id: 'gestion',
    name: 'Gestion',
    icon: Building,
    href: '#',
    roles: ['admin', 'chef_projet', 'conducteur_travaux', 'chef_chantier', 'coordinateur_projet'],
    children: [
      {
        id: 'clients',
        name: 'Clients',
        icon: Users,
        href: '/clients',
        roles: ['admin', 'chef_projet', 'conducteur_travaux', 'chef_chantier', 'coordinateur_projet']
      },
      {
        id: 'lots',
        name: 'Lots',
        icon: Map,
        href: '/lots',
        roles: ['admin']
      },
      {
        id: 'planification',
        name: 'Planification',
        icon: Calendar,
        href: '/planification',
        roles: ['admin', 'chef_projet', 'conducteur_travaux', 'chef_chantier']
      }
    ]
  },
  {
    id: 'logistique',
    name: 'Logistique',
    icon: Package,
    href: '#',
    roles: ['admin', 'directeur_logistique', 'responsable_logistique', 'magasinier', 'conducteur_travaux'],
    children: [
      {
        id: 'stocks',
        name: 'Stocks',
        icon: Warehouse,
        href: '/stocks',
        roles: ['admin', 'directeur_logistique', 'responsable_logistique', 'magasinier']
      },
      {
        id: 'kits',
        name: 'Kits',
        icon: Archive,
        href: '/kits',
        roles: ['admin', 'directeur_logistique', 'responsable_logistique']
      },
      {
        id: 'demandes_compteurs',
        name: 'Demandes Compteurs',
        icon: ShoppingCart,
        href: '/demandes-compteurs',
        roles: ['admin', 'directeur_logistique', 'responsable_logistique', 'conducteur_travaux']
      },
      {
        id: 'livraisons',
        name: 'Livraisons',
        icon: Truck,
        href: '/livraisons',
        roles: ['admin', 'coordinateur_projet', 'magasinier']
      }
    ]
  },
  {
    id: 'operations',
    name: 'Opérations',
    icon: ClipboardList,
    href: '#',
    roles: ['admin', 'agent_transmission', 'responsable_sig', 'chef_projet', 'conducteur_travaux', 'agent_saisie'],
    children: [
      {
        id: 'saisie',
        name: 'Saisie PV/OE',
        icon: FileEdit,
        href: '/saisie',
        roles: ['admin', 'agent_saisie']
      },
      {
        id: 'transmissions',
        name: 'Transmissions',
        icon: Send,
        href: '/transmissions',
        roles: ['admin', 'agent_transmission']
      },
      {
        id: 'cartographie',
        name: 'Cartographie',
        icon: MapPin,
        href: '/cartographie',
        roles: ['admin', 'responsable_sig']
      },
      {
        id: 'validation',
        name: 'Validation',
        icon: UserCheck,
        href: '/validation',
        roles: ['admin', 'chef_projet', 'conducteur_travaux']
      }
    ]
  },
  {
    id: 'rapports',
    name: 'Rapports',
    icon: BarChart3,
    href: '/rapports',
    roles: ['admin', 'chef_projet', 'directeur_logistique', 'coordinateur_projet']
  },
  {
    id: 'profil',
    name: 'Mon Profil',
    icon: Users,
    href: '/profil',
    roles: ['admin', 'chef_projet', 'directeur_logistique', 'responsable_logistique', 'magasinier', 'conducteur_travaux', 'chef_chantier', 'coordinateur_projet', 'agent_transmission', 'responsable_sig', 'agent_saisie']
  },
  {
    id: 'administration',
    name: 'Administration',
    icon: Settings,
    href: '#',
    roles: ['admin'],
    children: [
      {
        id: 'utilisateurs',
        name: 'Utilisateurs',
        icon: Users,
        href: '/utilisateurs',
        roles: ['admin']
      },
      {
        id: 'parametres',
        name: 'Paramètres',
        icon: Settings,
        href: '/parametres',
        roles: ['admin']
      }
    ]
  }
];

export const getRoleDisplayName = (role) => {
  const roleNames = {
    admin: 'Administrateur',
    chef_projet: 'Chef de Projet',
    directeur_logistique: 'Directeur Logistique',
    responsable_logistique: 'Responsable Logistique',
    magasinier: 'Magasinier',
    conducteur_travaux: 'Conducteur de Travaux',
    chef_chantier: 'Chef de Chantier',
    coordinateur_projet: 'Coordinateur de Projet',
    agent_transmission: 'Agent de Transmission',
    responsable_sig: 'Responsable SIG',
    agent_saisie: 'Agent de Saisie'
  };
  return roleNames[role];
};

export const getStatusDisplayName = (status) => {
  const statusNames = {
    en_attente: 'En Attente',
    non_partage: 'Non Partagé',
    en_cours_cdc: 'En Cours (CDC)',
    non_conforme: 'Non Conforme',
    en_cours_validation_cdt: 'En Cours de Validation (CDT)',
    en_cours_validation_cdp: 'En Cours de Validation (CDP)',
    valide: 'Validé',
    en_transmission: 'En Transmission',
    livre: 'Livré',
    non_livre: 'Non Livré',
    delaisse: 'Délaissé'
  };
  return statusNames[status] || status;
};