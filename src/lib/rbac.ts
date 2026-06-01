import type { User } from '@/types';
import type React from 'react';
import {
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Building2,
  CheckSquare,
  CreditCard,
  FileChartColumn,
  FileCode,
  Filter,
  Globe,
  LayoutDashboard,
  Megaphone,
  Settings,
  Shield,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react';

export type UserRole = User['role'];

export interface RoleNavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
  badge?: string | number;
}

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Admin',
  business_owner: 'Business Owner',
  agency: 'Digital Marketing Agency',
  sales: 'Sales Team Member',
};

const ALL_ROLES: UserRole[] = ['admin', 'business_owner', 'agency', 'sales'];
const OWNER_AGENCY_ADMIN: UserRole[] = ['admin', 'business_owner', 'agency'];
const OWNER_ADMIN: UserRole[] = ['admin', 'business_owner'];
const AGENCY_ADMIN: UserRole[] = ['admin', 'agency'];

export const ROLE_NAV_ITEMS: RoleNavItem[] = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard, roles: ALL_ROLES },
  { label: 'Admin Panel', href: '/admin-dashboard', icon: Shield, roles: ['admin'] },
  { label: 'Workspace', href: '/user-dashboard', icon: Building2, roles: AGENCY_ADMIN },
  { label: 'Funnel Builder', href: '/funnel-builder', icon: Filter, roles: OWNER_AGENCY_ADMIN },
  { label: 'CRM Leads', href: '/crm', icon: Users, roles: ALL_ROLES },
  { label: 'Pipeline', href: '/crm', icon: UserCheck, roles: ['sales'] },
  { label: 'Campaigns', href: '/campaigns', icon: Megaphone, roles: OWNER_AGENCY_ADMIN },
  { label: 'Analytics', href: '/analytics', icon: BarChart3, roles: OWNER_AGENCY_ADMIN },
  { label: 'Client Reports', href: '/client-reports', icon: FileChartColumn, roles: AGENCY_ADMIN },
  { label: 'Payments', href: '/payment', icon: CreditCard, roles: OWNER_ADMIN },
  { label: 'Notifications', href: '/notifications', icon: Bell, roles: ALL_ROLES },
  { label: 'Assigned Tasks', href: '/notifications', icon: CheckSquare, roles: ['sales'] },
  { label: 'Affiliate Tools', href: '/affiliate', icon: TrendingUp, roles: OWNER_ADMIN },
  { label: 'Landing Builder', href: '/landing-builder', icon: FileCode, roles: OWNER_AGENCY_ADMIN },
  { label: 'Website Builder', href: '/website-builder', icon: Globe, roles: OWNER_AGENCY_ADMIN },
  { label: 'Settings', href: '/settings', icon: Settings, roles: ALL_ROLES },
];

export const PROTECTED_ROUTES: Record<string, UserRole[]> = {
  '/dashboard': ALL_ROLES,
  '/admin-dashboard': ['admin'],
  '/user-dashboard': AGENCY_ADMIN,
  '/funnel-builder': OWNER_AGENCY_ADMIN,
  '/crm': ALL_ROLES,
  '/analytics': OWNER_AGENCY_ADMIN,
  '/client-reports': AGENCY_ADMIN,
  '/campaigns': OWNER_AGENCY_ADMIN,
  '/payment': OWNER_ADMIN,
  '/notifications': ALL_ROLES,
  '/affiliate': OWNER_ADMIN,
  '/settings': ALL_ROLES,
  '/landing-builder': OWNER_AGENCY_ADMIN,
  '/website-builder': OWNER_AGENCY_ADMIN,
};

export function getRoleNavItems(role?: UserRole | null) {
  if (!role) return [];
  return ROLE_NAV_ITEMS.filter(item => item.roles.includes(role));
}

export function getDefaultDashboardPath(role?: UserRole | null) {
  return role === 'admin' ? '/admin-dashboard' : '/dashboard';
}

export function getTrialDestination(role?: UserRole | null) {
  if (!role) return '/login';
  return hasRouteAccess(role, '/payment') ? '/payment' : getDefaultDashboardPath(role);
}

export function hasRouteAccess(role: UserRole | undefined | null, pathname: string) {
  if (!role) return false;
  if (role === 'admin') return true;

  const match = Object.entries(PROTECTED_ROUTES)
    .sort(([a], [b]) => b.length - a.length)
    .find(([route]) => pathname === route || pathname.startsWith(`${route}/`));

  return match ? match[1].includes(role) : true;
}

export function isProtectedPath(pathname: string) {
  return Object.keys(PROTECTED_ROUTES).some(route => pathname === route || pathname.startsWith(`${route}/`));
}
