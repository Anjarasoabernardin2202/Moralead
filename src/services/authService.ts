export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: any;
  token?: string;
  error?: string;
}

export class AuthService {
  private static instance: AuthService;
  
  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1500));

    const { email, password } = credentials;

    // Validation des credentials
    if (!email || !password) {
      return {
        success: false,
        error: 'Email et mot de passe requis'
      };
    }

    if (!email.includes('@')) {
      return {
        success: false,
        error: 'Format d\'email invalide'
      };
    }

    // Comptes de démonstration
    const validAccounts = [
      'admin@moralead.com',
      'chef.projet@moralead.com',
      'directeur.logistique@moralead.com',
      'responsable.logistique@moralead.com',
      'magasinier@moralead.com',
      'conducteur.travaux@moralead.com',
      'chef.chantier@moralead.com',
      'coordinateur@moralead.com',
      'agent.transmission@moralead.com',
      'responsable.sig@moralead.com',
      'agent.saisie@moralead.com'
    ];

    if (!validAccounts.includes(email)) {
      return {
        success: false,
        error: 'Compte utilisateur non trouvé'
      };
    }

    if (password !== 'admin') {
      return {
        success: false,
        error: 'Mot de passe incorrect'
      };
    }

    // Succès de l'authentification
    const user = {
      id: Date.now().toString(),
      name: this.getNameFromEmail(email),
      email: email,
      role: this.getRoleFromEmail(email),
      avatar: `https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150`,
      department: this.getDepartmentFromEmail(email),
      permissions: this.getPermissionsFromRole(this.getRoleFromEmail(email))
    };

    const token = `jwt-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    return {
      success: true,
      user,
      token
    };
  }

  private getNameFromEmail(email: string): string {
    const names: { [key: string]: string } = {
      'admin@moralead.com': 'Admin Système',
      'chef.projet@moralead.com': 'Jean Rakoto',
      'directeur.logistique@moralead.com': 'Marie Razafy',
      'responsable.logistique@moralead.com': 'Paul Andry',
      'magasinier@moralead.com': 'Hery Rabe',
      'conducteur.travaux@moralead.com': 'Nivo Randria',
      'chef.chantier@moralead.com': 'Koto Rasolofo',
      'coordinateur@moralead.com': 'Lala Andriana',
      'agent.transmission@moralead.com': 'Fidy Rakoto',
      'responsable.sig@moralead.com': 'Tiana Ratsimba',
      'agent.saisie@moralead.com': 'Ravo Andriamana'
    };
    return names[email] || 'Utilisateur';
  }

  private getRoleFromEmail(email: string) {
    if (email.includes('admin')) return 'admin';
    if (email.includes('chef.projet')) return 'chef_projet';
    if (email.includes('directeur.logistique')) return 'directeur_logistique';
    if (email.includes('responsable.logistique')) return 'responsable_logistique';
    if (email.includes('magasinier')) return 'magasinier';
    if (email.includes('conducteur.travaux')) return 'conducteur_travaux';
    if (email.includes('chef.chantier')) return 'chef_chantier';
    if (email.includes('coordinateur')) return 'coordinateur_projet';
    if (email.includes('agent.transmission')) return 'agent_transmission';
    if (email.includes('responsable.sig')) return 'responsable_sig';
    if (email.includes('agent.saisie')) return 'agent_saisie';
    return 'admin';
  }

  private getDepartmentFromEmail(email: string): string {
    if (email.includes('admin')) return 'Administration';
    if (email.includes('projet')) return 'Gestion de Projet';
    if (email.includes('logistique')) return 'Logistique';
    if (email.includes('travaux') || email.includes('chantier')) return 'Travaux';
    if (email.includes('transmission')) return 'Transmission';
    if (email.includes('sig')) return 'SIG';
    if (email.includes('saisie')) return 'Saisie';
    return 'Général';
  }

  private getPermissionsFromRole(role: string): string[] {
    const permissions: { [key: string]: string[] } = {
      admin: ['all'],
      chef_projet: ['view_dashboard', 'manage_clients', 'validate_projects', 'view_reports'],
      conducteur_travaux: ['view_dashboard', 'manage_installations', 'request_materials'],
      directeur_logistique: ['view_dashboard', 'manage_inventory', 'approve_requests'],
      // ... autres rôles
    };
    return permissions[role] || ['view_dashboard'];
  }
}