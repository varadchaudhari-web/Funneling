import { Shield } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>At Funneling, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.</p>
            <h2>1. Information We Collect</h2>
            <p>We collect information that you provide directly to us when you register for an account, create or modify your profile, make a purchase, or communicate with us.</p>
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, to process transactions, and to send you related information.</p>
            <h2>3. Information Sharing</h2>
            <p>We do not share your personal information with third parties except as described in this privacy policy.</p>
            <h2>4. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@funneling.io.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
