import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Plus, Filter, Search, ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

export default function PlanificationPage() {
  const { isDark } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day'
  const [showModal, setShowModal] = useState(false);
  const [selectedInstallation, setSelectedInstallation] = useState(null);
  
  // Données d'exemple des installations
  const [installations, setInstallations] = useState([
    {
      id: 1,
      client: 'RAKOTO Jean',
      adresse: 'Analakely, Antananarivo',
      date: '2024-01-22',
      heure_debut: '08:00',
      heure_fin: '10:00',
      equipe: 'Équipe Alpha',
      statut: 'planifie',
      priorite: 'normale',
      type: 'installation',
      coordonnees: '-18.8792, 47.5079',
      materiel_requis: ['Compteur électrique', 'Câbles 10m'],
      notes: 'Installation standard'
    },
    {
      id: 2,
      client: 'RAZAFY Marie',
      adresse: 'Tsaralalana, Antananarivo',
      date: '2024-01-22',
      heure_debut: '14:00',
      heure_fin: '16:30',
      equipe: 'Équipe Beta',
      statut: 'en_cours',
      priorite: 'urgente',
      type: 'reparation',
      coordonnees: '-18.8656, 47.5267',
      materiel_requis: ['Disjoncteur 20A'],
      notes: 'Réparation urgente'
    },
    {
      id: 3,
      client: 'ANDRY Paul',
      adresse: 'Antaninarenina, Antananarivo',
      date: '2024-01-23',
      heure_debut: '09:00',
      heure_fin: '11:00',
      equipe: 'Équipe Gamma',
      statut: 'planifie',
      priorite: 'haute',
      type: 'maintenance',
      coordonnees: '-18.8845, 47.5234',
      materiel_requis: ['Kit maintenance'],
      notes: 'Maintenance préventive'
    }
  ]);

  const [formData, setFormData] = useState({
    client: '',
    adresse: '',
    date: '',
    heure_debut: '',
    heure_fin: '',
    equipe: '',
    type: 'installation',
    priorite: 'normale',
    materiel_requis: '',
    notes: ''
  });

  const equipes = [
    'Équipe Alpha',
    'Équipe Beta', 
    'Équipe Gamma',
    'Équipe Delta'
  ];

  const getStatusColor = (status) => {
    const colors = {
      'planifie': 'bg-blue-500',
      'en_cours': 'bg-yellow-500',
      'termine': 'bg-green-500',
      'reporte': 'bg-red-500',
      'annule': 'bg-gray-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'urgente': 'border-l-red-500',
      'haute': 'border-l-orange-500',
      'normale': 'border-l-green-500',
      'basse': 'border-l-gray-500'
    };
    return colors[priority] || 'border-l-gray-500';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'installation': '🔧',
      'reparation': '⚡',
      'maintenance': '🛠️',
      'inspection': '🔍'
    };
    return icons[type] || '📋';
  };

  // Fonctions de navigation du calendrier
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const navigateDay = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction);
    setCurrentDate(newDate);
  };

  const navigate = (direction) => {
    switch (viewMode) {
      case 'month':
        navigateMonth(direction);
        break;
      case 'week':
        navigateWeek(direction);
        break;
      case 'day':
        navigateDay(direction);
        break;
    }
  };

  // Générer les jours du mois
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDateObj = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDateObj));
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }
    
    return days;
  };

  // Obtenir les installations pour une date donnée
  const getInstallationsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return installations.filter(inst => inst.date === dateStr);
  };

  // Gérer le clic sur une date
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      date: date.toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newInstallation = {
      id: Date.now(),
      client: formData.client,
      adresse: formData.adresse,
      date: formData.date,
      heure_debut: formData.heure_debut,
      heure_fin: formData.heure_fin,
      equipe: formData.equipe,
      type: formData.type,
      priorite: formData.priorite,
      statut: 'planifie',
      materiel_requis: formData.materiel_requis.split(',').map(item => item.trim()),
      notes: formData.notes,
      coordonnees: ''
    };

    if (selectedInstallation) {
      // Modification
      setInstallations(installations.map(inst => 
        inst.id === selectedInstallation.id ? { ...newInstallation, id: selectedInstallation.id } : inst
      ));
    } else {
      // Création
      setInstallations([...installations, newInstallation]);
    }

    setShowModal(false);
    setSelectedInstallation(null);
    setFormData({
      client: '',
      adresse: '',
      date: '',
      heure_debut: '',
      heure_fin: '',
      equipe: '',
      type: 'installation',
      priorite: 'normale',
      materiel_requis: '',
      notes: ''
    });
  };

  // Modifier une installation
  const handleEdit = (installation) => {
    setSelectedInstallation(installation);
    setFormData({
      client: installation.client,
      adresse: installation.adresse,
      date: installation.date,
      heure_debut: installation.heure_debut,
      heure_fin: installation.heure_fin,
      equipe: installation.equipe,
      type: installation.type,
      priorite: installation.priorite,
      materiel_requis: installation.materiel_requis.join(', '),
      notes: installation.notes
    });
    setShowModal(true);
  };

  // Supprimer une installation
  const handleDelete = (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette installation ?')) {
      setInstallations(installations.filter(inst => inst.id !== id));
    }
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Planification des Installations
          </h2>
          <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Gérez et planifiez les installations avec le calendrier interactif
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle Installation
        </button>
      </div>

      {/* Statistiques du jour */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`rounded-xl shadow-sm border p-4 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Planifiées Aujourd'hui
              </p>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {getInstallationsForDate(new Date()).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className={`rounded-xl shadow-sm border p-4 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                En Cours
              </p>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {installations.filter(inst => inst.statut === 'en_cours').length}
              </p>
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-4 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Équipes Actives
              </p>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {equipes.length}
              </p>
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-4 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Total Planifiées
              </p>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {installations.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contrôles du calendrier */}
      <div className={`rounded-xl shadow-sm border p-6 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            
            <button
              onClick={() => navigate(1)}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Aujourd'hui
            </button>
            
            <div className="flex bg-gray-100 rounded-lg p-1">
              {['month', 'week', 'day'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    viewMode === mode
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {mode === 'month' ? 'Mois' : mode === 'week' ? 'Semaine' : 'Jour'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Vue Mois */}
        {viewMode === 'month' && (
          <div className="grid grid-cols-7 gap-1">
            {/* En-têtes des jours */}
            {dayNames.map((day) => (
              <div key={day} className={`p-2 text-center text-sm font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {day}
              </div>
            ))}
            
            {/* Jours du calendrier */}
            {calendarDays.map((day, index) => {
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
              const isToday = day.toDateString() === new Date().toDateString();
              const dayInstallations = getInstallationsForDate(day);
              
              return (
                <div
                  key={index}
                  onClick={() => handleDateClick(day)}
                  className={`min-h-[100px] p-2 border cursor-pointer transition-colors ${
                    isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
                  } ${
                    !isCurrentMonth ? 'opacity-30' : ''
                  } ${
                    isToday ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    isToday ? 'text-blue-600' : isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {day.getDate()}
                  </div>
                  
                  {/* Installations du jour */}
                  <div className="space-y-1">
                    {dayInstallations.slice(0, 3).map((installation) => (
                      <div
                        key={installation.id}
                        className={`text-xs p-1 rounded border-l-2 ${getPriorityColor(installation.priorite)} ${
                          isDark ? 'bg-gray-600 text-gray-200' : 'bg-white text-gray-700'
                        } shadow-sm`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(installation);
                        }}
                      >
                        <div className="flex items-center space-x-1">
                          <span>{getTypeIcon(installation.type)}</span>
                          <span className="truncate">{installation.client}</span>
                        </div>
                        <div className="text-xs opacity-75">
                          {installation.heure_debut} - {installation.equipe}
                        </div>
                      </div>
                    ))}
                    
                    {dayInstallations.length > 3 && (
                      <div className={`text-xs text-center ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        +{dayInstallations.length - 3} autres
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal de création/modification */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedInstallation ? 'Modifier l\'installation' : 'Planifier une nouvelle installation'}
                </h3>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedInstallation(null);
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                  }`}
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Client
                    </label>
                    <input
                      type="text"
                      value={formData.client}
                      onChange={(e) => setFormData({...formData, client: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Type d'intervention
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="installation">Installation</option>
                      <option value="reparation">Réparation</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="inspection">Inspection</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Adresse
                  </label>
                  <input
                    type="text"
                    value={formData.adresse}
                    onChange={(e) => setFormData({...formData, adresse: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Heure début
                    </label>
                    <input
                      type="time"
                      value={formData.heure_debut}
                      onChange={(e) => setFormData({...formData, heure_debut: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Heure fin
                    </label>
                    <input
                      type="time"
                      value={formData.heure_fin}
                      onChange={(e) => setFormData({...formData, heure_fin: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Équipe assignée
                    </label>
                    <select
                      value={formData.equipe}
                      onChange={(e) => setFormData({...formData, equipe: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      required
                    >
                      <option value="">Sélectionner une équipe</option>
                      {equipes.map(equipe => (
                        <option key={equipe} value={equipe}>{equipe}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Priorité
                    </label>
                    <select
                      value={formData.priorite}
                      onChange={(e) => setFormData({...formData, priorite: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="basse">Basse</option>
                      <option value="normale">Normale</option>
                      <option value="haute">Haute</option>
                      <option value="urgente">Urgente</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Matériel requis (séparé par des virgules)
                  </label>
                  <input
                    type="text"
                    value={formData.materiel_requis}
                    onChange={(e) => setFormData({...formData, materiel_requis: e.target.value})}
                    placeholder="Compteur électrique, Câbles 10m, Disjoncteur 20A"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Notes additionnelles..."
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setSelectedInstallation(null);
                    }}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      isDark 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                  >
                    {selectedInstallation ? 'Modifier' : 'Planifier'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}