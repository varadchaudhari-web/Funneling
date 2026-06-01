import { Cookie } from 'lucide-react';

export default function Cookies() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
            <Cookie className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>This Cookie Policy explains how Funneling uses cookies and similar technologies to recognize you when you visit our website.</p>
            <h2>1. What are cookies?</h2>
            <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
            <h2>2. Why do we use cookies?</h2>
            <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies.</p>
            <h2>3. How can I control cookies?</h2>
            <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager.</p>
            <h2>4. Contact Us</h2>
            <p>If you have any questions about our use of cookies or other technologies, please email us at privacy@funneling.io.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
