import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Zap } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-purple opacity-30" />
      <div className="text-center relative z-10 max-w-lg">
        <div className="text-8xl font-display font-black gradient-text mb-4 inline-block">404</div>
        <h1 className="text-3xl font-display font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-white/60 text-lg mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary">
            <Home className="w-4 h-4" /> Back to Home
          </Link>
          <Link to="/dashboard" className="btn-outline border-white/40 text-white hover:bg-white/10">
            <Zap className="w-4 h-4" /> Go to Dashboard
          </Link>
        </div>
        <div className="mt-12 text-center">
          <p className="text-white/40 text-sm mb-3">Popular pages:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: 'Features', href: '/features' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Contact', href: '/contact' },
              { label: 'Login', href: '/login' },
            ].map(({ label, href }) => (
              <Link key={href} to={href} className="text-white/60 hover:text-white text-sm underline transition-colors">{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
