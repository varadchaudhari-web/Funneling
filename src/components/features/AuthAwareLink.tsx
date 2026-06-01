import { Link, type LinkProps } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getDefaultDashboardPath, getTrialDestination } from '@/lib/rbac';

type Intent = 'dashboard' | 'trial';

interface AuthAwareLinkProps extends Omit<LinkProps, 'to'> {
  guestTo?: string;
  intent?: Intent;
}

export default function AuthAwareLink({
  guestTo = '/register',
  intent = 'dashboard',
  children,
  ...props
}: AuthAwareLinkProps) {
  const { isLoggedIn, user } = useAuth();
  const to = isLoggedIn
    ? intent === 'trial'
      ? getTrialDestination(user?.role)
      : getDefaultDashboardPath(user?.role)
    : guestTo;

  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
}

