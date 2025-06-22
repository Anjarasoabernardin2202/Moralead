import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { ThemeProvider, useTheme } from './contexts/ThemeContext.jsx';
import LoginPage from './components/LoginPage.jsx';
import ResponsiveSidebar from './components/layout/ResponsiveSidebar.jsx';
import ResponsiveNavbar from './components/layout/ResponsiveNavbar.jsx';
import { useRoleGuard } from './utils/roleGuard.js';

// Import des dashboards spécifiques par rôle
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ChefProjetDashboard from './pages/chef-projet/ChefProjetDashboard.jsx';
import ConducteurTravauxDashboard from './pages/conducteur-travaux/ConducteurTravauxDashboard.jsx';
import DirecteurLogistiqueDashboard from './pages/directeur-logistique/DirecteurLogistiqueDashboard.jsx';
import ResponsableLogistiqueDashboard from './pages/responsable-logistique/ResponsableLogistiqueDashboard.jsx';
import MagasinierDashboard from './pages/magasinier/MagasinierDashboard.jsx';
import ChefChantierDashboard from './pages/chef-chantier/ChefChantierDashboard.jsx';
import CoordinateurProjetDashboard from './pages/coordinateur-projet/CoordinateurProjetDashboard.jsx';

// Import des pages de gestion
import ClientsPage from './pages/gestion/ClientsPage.jsx';
import LotsPage from './pages/gestion/LotsPage.jsx';
import PlanificationPage from './pages/gestion/PlanificationPage.jsx';

// Import des pages logistique
import StocksPage from './pages/logistique/StocksPage.jsx';
import KitsPage from './pages/logistique/KitsPage.jsx';
import DemandesCompteursPage from './pages/logistique/DemandesCompteursPage.jsx';
import LivraisonsPage from './pages/logistique/LivraisonsPage.jsx';

// Import des pages opérations
import SaisiePage from './pages/operations/SaisiePage.jsx';
import TransmissionsPage from './pages/operations/TransmissionsPage.jsx';
import CartographiePage from './pages/operations/CartographiePage.jsx';
import ValidationPage from './pages/operations/ValidationPage.jsx';

// Import des pages partagées
import RapportsPage from './pages/shared/RapportsPage.jsx';
import ProfilPage from './pages/shared/ProfilPage.jsx';

// Import des pages admin
import UsersManagementPage from './pages/admin/UsersManagementPage.jsx';
import ParametresPage from './pages/admin/ParametresPage.jsx';

// Import des composants UI
import LoadingSpinner from './components/ui/LoadingSpinner.jsx';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, isLoading, refreshUser } = useAuth();
  const { isDark } = useTheme();
  const { canAccess, redirectIfUnauthorized } = useRoleGuard();

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Vérifier l'utilisateur connecté au chargement
  useEffect(() => {
    if (user && !isLoading) {
      refreshUser();
    }
  }, [user, isLoading, refreshUser]);

  // Vérification des permissions lors du changement de page
  useEffect(() => {
    if (user && currentPage) {
      redirectIfUnauthorized(user.role, currentPage, (defaultPage) => {
        setCurrentPage(defaultPage);
      });
    }
  }, [user, currentPage, redirectIfUnauthorized]);

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <LoadingSpinner size="lg" text="Chargement de l'application..." />
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  const handlePageChange = (page) => {
    if (canAccess(user.role, page)) {
      setCurrentPage(page);
    } else {
      console.warn(`Accès refusé à la page ${page} pour le rôle ${user.role}`);
    }
  };

  const renderCurrentPage = () => {
    if (!canAccess(user.role, currentPage)) {
      return (
        <div className={`rounded-xl shadow-sm border p-8 text-center ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-2xl font-bold mb-4 text-red-600`}>
            Accès Refusé
          </h2>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retour au Dashboard
            </button>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case 'dashboard':
        switch (user.role) {
          case 'Administrateur':
            return <AdminDashboard />;
          case 'Chef de Projet':
            return <ChefProjetDashboard />;
          case 'Conducteur de Travaux':
            return <ConducteurTravauxDashboard />;
          case 'Directeur Logistique':
            return <DirecteurLogistiqueDashboard />;
          case 'Responsable Logistique':
            return <ResponsableLogistiqueDashboard />;
          case 'Magasinier':
            return <MagasinierDashboard />;
          case 'Chef de Chantier':
            return <ChefChantierDashboard />;
          case 'Coordinateur Projet':
            return <CoordinateurProjetDashboard />;
          case 'Agent Transmission':
            return <AdminDashboard />;
          case 'Responsable SIG':
            return <AdminDashboard />;
          case 'Agent Saisie':
            return <AdminDashboard />;
          default:
            return <AdminDashboard />;
        }
      
      case 'clients':
        return <ClientsPage />;
      case 'lots':
        return <LotsPage />;
      case 'planification':
        return <PlanificationPage />;
      
      case 'stocks':
        return <StocksPage />;
      case 'kits':
        return <KitsPage />;
      case 'demandes_compteurs':
        return <DemandesCompteursPage />;
      case 'livraisons':
        return <LivraisonsPage />;
      
      case 'saisie':
        return <SaisiePage />;
      case 'transmissions':
        return <TransmissionsPage />;
      case 'cartographie':
        return <CartographiePage />;
      case 'validation':
        return <ValidationPage />;
      
      case 'rapports':
        return <RapportsPage />;
      case 'profil':
        return <ProfilPage />;
      
      case 'utilisateurs':
        return <UsersManagementPage />;
      case 'parametres':
        return <ParametresPage />;
      
      default:
        return (
          <div className={`rounded-xl shadow-sm border p-8 text-center ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Module en cours de développement
            </h2>
            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              Cette fonctionnalité sera bientôt disponible.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retour au Dashboard
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ResponsiveSidebar 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={setSidebarCollapsed}
      />
      <div className={`transition-all duration-300 ease-in-out ${
        isMobile 
          ? 'ml-0'
          : sidebarCollapsed 
            ? 'ml-20'
            : 'ml-64'
      }`}>
        <ResponsiveNavbar 
          currentPage={currentPage} 
          sidebarCollapsed={sidebarCollapsed}
          isMobile={isMobile}
        />
        <main className="pt-20 p-4 lg:p-6">
          <div className="w-full max-w-none">
            {renderCurrentPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;