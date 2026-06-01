import { Link } from 'react-router-dom';
import { Zap, Twitter, Linkedin, Youtube, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  const links = {
    Product: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Funnel Builder', href: '/funnel-builder' },
      { label: 'CRM Dashboard', href: '/crm' },
      { label: 'Analytics', href: '/analytics' },
      { label: 'Campaign Manager', href: '/campaigns' },
    ],
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Affiliate Program', href: '/affiliate' },
      { label: 'Blog', href: '/about#story' },
      { label: 'Careers', href: '/about#team' },
    ],
    Tools: [
      { label: 'Landing Page Builder', href: '/landing-builder' },
      { label: 'Website Builder', href: '/website-builder' },
      { label: 'Payment Demo', href: '/payment' },
      { label: 'Notifications', href: '/notifications' },
      { label: 'Settings', href: '/settings' },
    ],
    Support: [
      { label: 'Documentation', href: '/contact#docs' },
      { label: 'Help Center', href: '/contact#help' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  };

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-brand rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="text-xl font-display font-bold text-white">Funneling</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              The all-in-one platform to build high-converting funnels, manage CRM pipelines, automate marketing, and scale with AI-powered optimization.
            </p>
            <div className="flex items-center gap-3 mb-6">
              {[Twitter, Linkedin, Youtube, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-white" />
                </a>
              ))}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary-400" /><span>hello@funneling.io</span></div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary-400" /><span>+1 (800) 123-4567</span></div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary-400" /><span>San Francisco, CA 94105</span></div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4 text-sm">{category}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.label}>
                    <Link to={item.href} className="text-sm hover:text-primary-400 transition-colors hover:translate-x-1 inline-block">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">&copy; {year} Funneling, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/privacy" className="hover:text-primary-400 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary-400 transition-colors">Terms</Link>
            <Link to="/cookies" className="hover:text-primary-400 transition-colors">Cookies</Link>
            <Link to="/gdpr" className="hover:text-primary-400 transition-colors">GDPR</Link>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
