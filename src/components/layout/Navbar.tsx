import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, LayoutDashboard, LogOut, Settings, User, Zap, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { getDefaultDashboardPath, ROLE_LABELS } from '@/lib/rbac';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const { unreadCount } = useApp();
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const dashboardPath = getDefaultDashboardPath(user?.role);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center shadow-brand group-hover:shadow-brand-lg transition-shadow">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="text-xl font-display font-bold gradient-text-brand">Funneling</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.href} to={link.href} className="btn-ghost text-sm">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Area */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link to="/notifications" className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
                  <Bell className="w-5 h-5 text-gray-600" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Link>
                <Link to={dashboardPath} className="btn-primary text-sm py-2 px-4">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <img src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=7C3AED&color=fff`} alt={user?.name} className="w-8 h-8 rounded-lg object-cover" onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=7C3AED&color=fff`; }} />
                    <div className="text-left hidden lg:block">
                      <p className="text-sm font-semibold text-gray-800 leading-none">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.role ? ROLE_LABELS[user.role] : 'User'}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-glass-lg border border-gray-100 py-2 animate-scale-in">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-800 text-sm">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                        <span className="badge-purple mt-1 inline-block capitalize">{user?.plan} plan</span>
                      </div>
                      <Link to={dashboardPath} onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700 transition-colors">
                        <User className="w-4 h-4" /> My Dashboard
                      </Link>
                      <Link to="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700 transition-colors">
                        <Settings className="w-4 h-4" /> Settings
                      </Link>
                      {user?.role === 'admin' && (
                        <Link to="/admin-dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700 transition-colors">
                          <LayoutDashboard className="w-4 h-4" /> Admin Panel
                        </Link>
                      )}
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-sm text-red-600 transition-colors w-full text-left">
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost text-sm">Log In</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-5">
                  Get Started Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 animate-fade-in">
            <div className="flex flex-col gap-1 mb-4">
              {navLinks.map(link => (
                <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)} className="px-3 py-2.5 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl font-medium transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
            {isLoggedIn ? (
              <div className="flex flex-col gap-2 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-3 px-3 py-2">
                  <img src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=7C3AED&color=fff`} alt={user?.name} className="w-10 h-10 rounded-xl object-cover" onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=7C3AED&color=fff`; }} />
                  <div>
                    <p className="font-semibold text-gray-800">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.plan} plan</p>
                  </div>
                </div>
                <Link to={dashboardPath} onClick={() => setMenuOpen(false)} className="btn-primary justify-center">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="flex items-center justify-center gap-2 py-2.5 text-red-600 font-medium">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-3 border-t border-gray-100">
                <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-outline justify-center">Log In</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary justify-center">Get Started Free</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
