import { navigationItems } from '../data/navigation.js';

export class RoleGuard {
  static canAccessPage(userRole, pageId) {
    const findPageInNavigation = (items, targetId) => {
      for (const item of items) {
        if (item.id === targetId) {
          return item;
        }
        if (item.children) {
          const found = findPageInNavigation(item.children, targetId);
          if (found) return found;
        }
      }
      return null;
    };

    const page = findPageInNavigation(navigationItems, pageId);
    return page ? page.roles.includes(userRole) : false;
  }

  static getAccessiblePages(userRole) {
    const getPages = (items) => {
      const pages = [];
      for (const item of items) {
        if (item.roles.includes(userRole)) {
          pages.push(item.id);
          if (item.children) {
            pages.push(...getPages(item.children));
          }
        }
      }
      return pages;
    };

    return getPages(navigationItems);
  }

  static getDefaultPageForRole(userRole) {
    // Tous les rôles ont accès au dashboard
    return 'dashboard';
  }

  static redirectIfUnauthorized(userRole, currentPage, onRedirect) {
    if (!RoleGuard.canAccessPage(userRole, currentPage)) {
      const defaultPage = RoleGuard.getDefaultPageForRole(userRole);
      onRedirect(defaultPage);
      return true;
    }
    return false;
  }
}

export function useRoleGuard() {
  return {
    canAccess: RoleGuard.canAccessPage,
    getAccessiblePages: RoleGuard.getAccessiblePages,
    getDefaultPage: RoleGuard.getDefaultPageForRole,
    redirectIfUnauthorized: RoleGuard.redirectIfUnauthorized
  };
}