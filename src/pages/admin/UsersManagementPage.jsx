import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, UserPlus, Shield, Mail, Phone, Calendar, MoreVertical, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Hook personnalisé pour la gestion des données statiques
const useStaticData = () => {
  const [roles, setRoles] = useState([]);
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const loadStaticData = async () => {
      try {
        setLoading(true);
        const [rolesResponse, lotsResponse] = await Promise.all([
          axios.get(`${API_URL}/api/roles`),
          axios.get(`${API_URL}/api/lots`)
        ]);

        setRoles(rolesResponse.data);
        const transformedLots = lotsResponse.data.map(lot => ({
          id: lot.id,
          name: lot.nom,
          description: lot.zone_geographique
        }));
        setLots(transformedLots);
      } catch (error) {
        console.error('Erreur lors du chargement des données statiques:', error);
        toast.error('Erreur lors du chargement des données de base');
      } finally {
        setLoading(false);
      }
    };

    loadStaticData();
  }, [API_URL]);

  return { roles, lots, loading };
};

// Hook personnalisé pour la gestion des utilisateurs
const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchUsers = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/users`, { params: filters });
      setUsers(response.data.users || response.data);
      setPagination(prev => ({
        ...prev,
        totalUsers: response.data.total || response.data.length,
        totalPages: response.data.totalPages || 1
      }));
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
      toast.error('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  const addUser = useCallback((newUser) => {
    setUsers(prev => [...prev, newUser]);
    setPagination(prev => ({ ...prev, totalUsers: prev.totalUsers + 1 }));
  }, []);

  const updateUser = useCallback((updatedUser) => {
    setUsers(prev => prev.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
  }, []);

  const removeUser = useCallback((userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    setPagination(prev => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
  }, []);

  return {
    users,
    loading,
    pagination,
    fetchUsers,
    addUser,
    updateUser,
    removeUser
  };
};

// Hook personnalisé pour le debouncing
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function UsersManagementPage() {
  const { isDark } = useTheme();
  const { roles, lots, loading: staticDataLoading } = useStaticData();
  const { 
    users, 
    loading: usersLoading, 
    pagination,
    fetchUsers, 
    addUser, 
    updateUser, 
    removeUser 
  } = useUsers();

  // États des filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [lotFilter, setLotFilter] = useState('');
  
  // États des modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  
  // États du formulaire
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    roleId: '',
    lots: '',
    status: 'active',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // Debounce de la recherche
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Chargement initial et filtrage avec debounce
  useEffect(() => {
    if (!staticDataLoading) {
      const filters = {
        search: debouncedSearchTerm,
        role: roleFilter,
        status: statusFilter,
        lot: lotFilter,
        page: pagination.currentPage
      };
      fetchUsers(filters);
    }
  }, [debouncedSearchTerm, roleFilter, statusFilter, lotFilter, pagination.currentPage, fetchUsers, staticDataLoading]);

  // Fonctions memoized pour optimiser les performances
  const getDefaultLotForRole = useCallback((roleId) => {
    if (!roles.length || !lots.length) return '';
    
    const role = roles.find(r => r.id === parseInt(roleId));
    if (!role) return '';

    // Rôles qui peuvent avoir un lot vide
    const rolesWithoutLotRequired = [
      'Magasinier',
      'Administrateur', 
      'Responsable SIG',
      'Responsable Logistique',
      'Agent de transmission'
    ];

    // Si le rôle peut avoir un lot vide, on retourne vide par défaut
    if (rolesWithoutLotRequired.includes(role.name)) {
      return '';
    }

    // Rôles qui nécessitent obligatoirement un lot
    const defaultLots = {
      'Chef de Projet': lots.find(l => l.name === 'Supervision')?.id || '',
      'Conducteur de Travaux': lots.find(l => l.name === 'Lot A')?.id || '',
      'Chef de Chantier': lots.find(l => l.name === 'Lot A')?.id || '',
      'Chef Magasinier': lots.find(l => l.name === 'Support')?.id || ''
    };
    
    return defaultLots[role.name] || '';
  }, [roles, lots]);

  // Fonction pour vérifier si un rôle nécessite obligatoirement un lot
  const isLotRequiredForRole = useCallback((roleId) => {
    if (!roles.length) return false;
    
    const role = roles.find(r => r.id === parseInt(roleId));
    if (!role) return false;

    const rolesRequiringLot = [
      'Chef de Chantier',
      'Chef de Projet', 
      'Chef Magasinier',
      'Conducteur de Travaux'
    ];

    return rolesRequiringLot.includes(role.name);
  }, [roles]);

  const displayHelpers = useMemo(() => ({
    getLotDisplayName: (lotId) => {
      if (!lotId) return null;
      const lot = lots.find(l => l.id === parseInt(lotId));
      return lot ? lot.name : lotId;
    },
    getLotDescription: (lotId) => {
      if (!lotId) return null;
      const lot = lots.find(l => l.id === parseInt(lotId));
      return lot ? lot.description : '';
    },
    getRoleDisplayName: (roleId) => {
      const role = roles.find(r => r.id === parseInt(roleId));
      return role ? role.display_name : roleId;
    }
  }), [lots, roles]);

  const styleHelpers = useMemo(() => ({
    getStatusColor: (status) => {
      const colors = {
        'active': 'bg-green-100 text-green-800',
        'inactive': 'bg-red-100 text-red-800',
        'pending': 'bg-yellow-100 text-yellow-800'
      };
      return colors[status] || 'bg-gray-100 text-gray-800';
    },
    getRoleColor: (roleId) => {
      const role = roles.find(r => r.id === parseInt(roleId));
      const colors = {
        'Administrateur': 'bg-red-100 text-red-800',
        'Chef de Projet': 'bg-blue-100 text-blue-800',
        'Responsable Logistique': 'bg-purple-100 text-purple-800',
        'Conducteur de Travaux': 'bg-green-100 text-green-800',
        'Chef de Chantier': 'bg-yellow-100 text-yellow-800',
        'Responsable SIG': 'bg-indigo-100 text-indigo-800',
        'Chef Magasinier': 'bg-pink-100 text-pink-800',
        'Magasinier': 'bg-gray-100 text-gray-800'
      };
      return colors[role?.name] || 'bg-gray-100 text-gray-800';
    },
    getLotColor: (lotId) => {
      if (!lotId) return 'bg-gray-100 text-gray-600';
      const lot = lots.find(l => l.id === parseInt(lotId));
      const colors = {
        'Lot A': 'bg-blue-100 text-blue-800',
        'Lot B': 'bg-green-100 text-green-800',
        'Lot C': 'bg-yellow-100 text-yellow-800',
        'Lot D': 'bg-purple-100 text-purple-800',
        'Lot E': 'bg-pink-100 text-pink-800',
        'Lot F': 'bg-indigo-100 text-indigo-800',
        'Supervision': 'bg-red-100 text-red-800',
        'Support': 'bg-gray-100 text-gray-800'
      };
      return colors[lot?.name] || 'bg-gray-100 text-gray-800';
    }
  }), [roles, lots]);

  // Statistiques calculées de manière optimisée
  const statistics = useMemo(() => ({
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    admins: users.filter(u => u.role_name === 'Administrateur').length,
    connectedToday: users.filter(u => 
      u.last_login?.includes(new Date().toISOString().slice(0, 10))
    ).length
  }), [users]);

  // Gestionnaires d'événements optimisés
  const resetForm = useCallback(() => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      roleId: '',
      lots: '',
      status: 'active',
      password: ''
    });
    setFormErrors({});
  }, []);

  const validateForm = useCallback(() => {
    const errors = {};

    if (!formData.fullName.trim()) errors.fullName = 'Le nom est requis';
    if (!formData.email.trim()) {
      errors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Format d\'email invalide';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Le numéro de téléphone est requis';
    } else if (!/^\+261\s?\d{2}\s?\d{2}\s?\d{3}\s?\d{2}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Format de téléphone invalide (ex: +261 34 12 345 67)';
    }
    if (!formData.roleId) errors.roleId = 'Le rôle est requis';
    
    // Vérifier si le lot est requis pour ce rôle spécifique
    if (formData.roleId && isLotRequiredForRole(formData.roleId) && !formData.lots) {
      errors.lots = 'Le lot est requis pour ce rôle';
    }
    
    if (!selectedUser && !formData.password.trim()) {
      errors.password = 'Le mot de passe est requis';
    } else if (!selectedUser && formData.password.length < 6) {
      errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, selectedUser, isLotRequiredForRole]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'roleId' && { lots: getDefaultLotForRole(value) })
    }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [formErrors, getDefaultLotForRole]);

  const handleCreateUser = useCallback(() => {
    resetForm();
    setSelectedUser(null);
    setShowCreateModal(true);
  }, [resetForm]);

  const handleEditUser = useCallback((user) => {
    setFormData({
      fullName: user.fullName || '',
      email: user.email || '',
      phone: user.phone || '',
      roleId: user.roleId?.toString() || '',
      lots: user.lots?.toString() || '', // Si null, devient une chaîne vide
      status: user.status || 'active',
      password: ''
    });
    setSelectedUser(user);
    setShowCreateModal(true);
  }, []);

  const handleViewUser = useCallback((user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  }, []);

  const handleDeleteUser = useCallback(async (user) => {
    if (user.role_name === 'Administrateur') {
      toast.error('Impossible de supprimer un compte administrateur');
      return;
    }
    
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.fullName} ?`)) {
      try {
        await axios.delete(`${API_URL}/api/users/${user.id}`);
        removeUser(user.id);
        toast.success('Utilisateur supprimé avec succès');
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        toast.error('Erreur lors de la suppression de l\'utilisateur');
      }
    }
  }, [API_URL, removeUser]);

  const handleSubmitForm = useCallback(async () => {
    if (!validateForm() || submitting) return;

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        roleId: parseInt(formData.roleId),
        // Envoyer explicitement null si le lot est vide ou non requis
        lots: formData.lots ? parseInt(formData.lots) : null
      };

      if (selectedUser) {
        const response = await axios.put(`${API_URL}/api/users/${selectedUser.id}`, payload);
        updateUser(response.data);
        toast.success('Utilisateur modifié avec succès');
      } else {
        const response = await axios.post(`${API_URL}/api/users`, payload);
        addUser(response.data);
        toast.success('Utilisateur créé avec succès');
      }
      
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      toast.error(`Erreur lors de la ${selectedUser ? 'mise à jour' : 'création'} de l'utilisateur`);
    } finally {
      setSubmitting(false);
    }
  }, [validateForm, submitting, formData, selectedUser, API_URL, updateUser, addUser]);

  const closeModal = useCallback(() => {
    setShowCreateModal(false);
    setSelectedUser(null);
    resetForm();
  }, [resetForm]);

  // Gestionnaires de filtres optimisés
  const handlePageChange = useCallback((newPage) => {
    if (newPage !== pagination.currentPage) {
      fetchUsers({
        search: debouncedSearchTerm,
        role: roleFilter,
        status: statusFilter,
        lot: lotFilter,
        page: newPage
      });
    }
  }, [pagination.currentPage, debouncedSearchTerm, roleFilter, statusFilter, lotFilter, fetchUsers]);

  const handleExport = useCallback(() => {
    toast.info('Export en cours de développement');
  }, []);

  const handleRefresh = useCallback(() => {
    const filters = {
      search: debouncedSearchTerm,
      role: roleFilter,
      status: statusFilter,
      lot: lotFilter,
      page: pagination.currentPage
    };
    fetchUsers(filters);
  }, [debouncedSearchTerm, roleFilter, statusFilter, lotFilter, pagination.currentPage, fetchUsers]);

  if (staticDataLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDark ? 'dark' : 'light'}
      />

      {/* Header avec actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Gestion des Utilisateurs
          </h1>
          <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Gérez les utilisateurs, leurs rôles et leurs permissions
          </p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={handleRefresh}
            className="inline-flex items-center justify-center px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
            disabled={usersLoading}
          >
            <Shield className="w-4 h-4 mr-2" />
            {usersLoading ? 'Actualisation...' : 'Actualiser'}
          </button>
          <button
            onClick={handleExport}
            className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            <Shield className="w-4 h-4 mr-2" />
            Exporter
          </button>
        </div>
      </div>

      {/* Statistiques optimisées */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Utilisateurs', value: statistics.total, color: 'blue', icon: Shield },
          { label: 'Actifs', value: statistics.active, color: 'green', icon: UserPlus },
          { label: 'Administrateurs', value: statistics.admins, color: 'red', icon: Shield },
          { label: 'Connectés Aujourd\'hui', value: statistics.connectedToday, color: 'yellow', icon: Calendar }
        ].map((stat, index) => (
          <div
            key={index}
            className={`rounded-2xl shadow-lg border transition-transform transform hover:scale-105 p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
          >
            <div className="flex items-center">
              <div className={`p-3 bg-${stat.color}-100 rounded-xl`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="ml-4">
                <p className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bouton Nouvel Utilisateur */}
      <div className="flex justify-end">
        <button
          onClick={handleCreateUser}
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Nouvel Utilisateur
        </button>
      </div>

      {/* Filtres avec recherche debouncée */}
      <div className={`rounded-2xl shadow-lg border p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className={`px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
          >
            <option value="">Tous les rôles</option>
            {roles.map(role => (
              <option key={role.id} value={role.id}>{role.display_name}</option>
            ))}
          </select>
          <select
            value={lotFilter}
            onChange={(e) => setLotFilter(e.target.value)}
            className={`px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
          >
            <option value="">Tous les lots</option>
            {lots.map(lot => (
              <option key={lot.id} value={lot.id}>{lot.name} - {lot.description}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
          >
            <option value="">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
            <option value="pending">En attente</option>
          </select>
          <button className={`inline-flex items-center px-4 py-3 border rounded-xl transition-colors ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
            <Filter className="w-4 h-4 mr-2" />
            Plus de filtres
          </button>
        </div>
      </div>

      {/* Tableau des utilisateurs */}
      <div className={`rounded-2xl shadow-lg border overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        {usersLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      Utilisateur
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      Rôle
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      Lot Assigné
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      Statut
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      Dernière Connexion
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {users.map((user) => (
                    <tr key={user.id} className={`transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={user.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'}
                            alt={user.fullName}
                          />
                          <div className="ml-4">
                            <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {user.fullName}
                            </div>
                            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {user.email}
                            </div>
                            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              {user.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${styleHelpers.getRoleColor(user.roleId)}`}>
                          {displayHelpers.getRoleDisplayName(user.roleId)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.lots ? (
                          <>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${styleHelpers.getLotColor(user.lots)}`}>
                              {displayHelpers.getLotDisplayName(user.lots)}
                            </span>
                            <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {displayHelpers.getLotDescription(user.lots)}
                            </div>
                          </>
                        ) : (
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600 ${isDark ? 'bg-gray-600 text-gray-300' : ''}`}>
                            Aucun lot assigné
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${styleHelpers.getStatusColor(user.status)}`}>
                          {user.status === 'active' ? 'Actif' : user.status === 'inactive' ? 'Inactif' : 'En attente'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {user.last_login ? new Date(user.last_login).toLocaleDateString('fr-FR') : 'Jamais'}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {user.last_login ? new Date(user.last_login).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-4">
                          <button onClick={() => handleViewUser(user)} className="text-blue-600 hover:text-blue-800 transition-colors" title="Voir les détails">
                            <Eye className="w-5 h-5" />
                          </button>
                          <button onClick={() => handleEditUser(user)} className="text-green-600 hover:text-green-800 transition-colors" title="Modifier">
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className={`transition-colors ${user.role_name === 'Administrateur' ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:text-red-800'}`}
                            title={user.role_name === 'Administrateur' ? 'Impossible de supprimer un admin' : 'Supprimer'}
                            disabled={user.role_name === 'Administrateur'}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600 transition-colors" title="Plus d'options">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination optimisée */}
            <div className={`px-6 py-3 border-t ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex items-center justify-between">
                <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Affichage de {users.length} utilisateur(s) sur {pagination.totalUsers}
                </div>
                <div className="flex space-x-2">
                  <button
                    disabled={pagination.currentPage === 1}
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    className={`px-3 py-1 rounded border text-sm ${pagination.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} ${isDark ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}
                  >
                    Précédent
                  </button>
                  <span className={`px-3 py-1 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Page {pagination.currentPage} sur {pagination.totalPages}
                  </span>
                  <button
                    disabled={pagination.currentPage >= pagination.totalPages}
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    className={`px-3 py-1 rounded border text-sm ${pagination.currentPage >= pagination.totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} ${isDark ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}
                  >
                    Suivant
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal de création/édition optimisée */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedUser ? 'Modifier l\'utilisateur' : 'Créer un nouvel utilisateur'}
                </h3>
                <button
                  onClick={closeModal}
                  className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSubmitForm(); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.fullName ? 'border-red-500' : ''} ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      placeholder="Nom complet de l'utilisateur"
                    />
                    {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.email ? 'border-red-500' : ''} ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      placeholder="email@exemple.com"
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Numéro de téléphone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.phone ? 'border-red-500' : ''} ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      placeholder="+261 34 12 345 67"
                    />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Rôle <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.roleId}
                      onChange={(e) => handleInputChange('roleId', e.target.value)}
                      className={`w-full px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.roleId ? 'border-red-500' : ''} ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    >
                      <option value="">Sélectionner un rôle</option>
                      {roles.map(role => (
                        <option key={role.id} value={role.id}>{role.display_name}</option>
                      ))}
                    </select>
                    {formErrors.roleId && <p className="text-red-500 text-xs mt-1">{formErrors.roleId}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Lot assigné {isLotRequiredForRole(formData.roleId) && <span className="text-red-500">*</span>}
                      {!isLotRequiredForRole(formData.roleId) && <span className="text-gray-500 text-xs">(optionnel)</span>}
                    </label>
                    <select
                      value={formData.lots}
                      onChange={(e) => handleInputChange('lots', e.target.value)}
                      className={`w-full px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.lots ? 'border-red-500' : ''} ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      disabled={!isLotRequiredForRole(formData.roleId) && !formData.roleId}
                    >
                      <option value="">
                        {isLotRequiredForRole(formData.roleId) ? 'Sélectionner un lot' : 'Aucun lot assigné'}
                      </option>
                      {lots.map(lot => (
                        <option key={lot.id} value={lot.id}>{lot.name} - {lot.description}</option>
                      ))}
                    </select>
                    {formErrors.lots && <p className="text-red-500 text-xs mt-1">{formErrors.lots}</p>}
                    {formData.roleId && !isLotRequiredForRole(formData.roleId) && (
                      <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Ce rôle ne nécessite pas d'assignation à un lot spécifique
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Statut
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className={`w-full px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    >
                      <option value="active">Actif</option>
                      <option value="inactive">Inactif</option>
                      <option value="pending">En attente</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedUser ? 'Nouveau mot de passe (laisser vide pour ne pas changer)' : 'Mot de passe'} 
                    {!selectedUser && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.password ? 'border-red-500' : ''} ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    placeholder={selectedUser ? 'Nouveau mot de passe (optionnel)' : 'Mot de passe (min. 6 caractères)'}
                  />
                  {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
                </div>
                <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                  <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                    <strong>Note :</strong> Les lots sont requis uniquement pour les rôles : Chef de Chantier, Chef de Projet, Chef Magasinier et Conducteur de Travaux. 
                    Pour les autres rôles (Magasinier, Administrateur, Responsable SIG, Responsable Logistique, Agent de transmission), 
                    l'assignation à un lot est optionnelle.
                  </p>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={submitting}
                    className={`px-6 py-3 border rounded-xl transition-colors ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {submitting ? 'Traitement...' : (selectedUser ? 'Modifier' : 'Créer l\'utilisateur')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de détails utilisateur optimisée */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Détails de l'utilisateur
                </h3>
                <button
                  onClick={() => {
                    setShowUserDetails(false);
                    setSelectedUser(null);
                  }}
                  className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <img
                    className="h-16 w-16 rounded-full object-cover"
                    src={selectedUser.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'}
                    alt={selectedUser.fullName}
                  />
                  <div>
                    <h4 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {selectedUser.fullName}
                    </h4>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {selectedUser.email}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${styleHelpers.getRoleColor(selectedUser.roleId)}`}>
                        {displayHelpers.getRoleDisplayName(selectedUser.roleId)}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${styleHelpers.getStatusColor(selectedUser.status)}`}>
                        {selectedUser.status === 'active' ? 'Actif' : selectedUser.status === 'inactive' ? 'Inactif' : 'En attente'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Phone className="w-4 h-4 text-blue-500" />
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Téléphone
                      </span>
                    </div>
                    <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {selectedUser.phone}
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-4 h-4 text-purple-500" />
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Lot Assigné
                      </span>
                    </div>
                    <div>
                      {selectedUser.lots ? (
                        <>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${styleHelpers.getLotColor(selectedUser.lots)}`}>
                            {displayHelpers.getLotDisplayName(selectedUser.lots)}
                          </span>
                          <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {displayHelpers.getLotDescription(selectedUser.lots)}
                          </p>
                        </>
                      ) : (
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600 ${isDark ? 'bg-gray-600 text-gray-300' : ''}`}>
                          Aucun lot assigné
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-green-500" />
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Dernière connexion
                      </span>
                    </div>
                    <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {selectedUser.last_login ? new Date(selectedUser.last_login).toLocaleString('fr-FR') : 'Jamais'}
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Créé le
                      </span>
                    </div>
                    <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {new Date(selectedUser.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}