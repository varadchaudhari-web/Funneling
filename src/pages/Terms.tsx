import { FileText } from 'lucide-react';

export default function Terms() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>Welcome to Funneling. By accessing or using our website and services, you agree to be bound by these Terms of Service.</p>
            <h2>1. Acceptance of Terms</h2>
            <p>By registering for and/or using the Services in any manner, including but not limited to visiting or browsing the Site, you agree to these Terms of Service and all other operating rules, policies, and procedures.</p>
            <h2>2. User Accounts</h2>
            <p>You must provide accurate and complete information when creating an account. You are solely responsible for the activity that occurs on your account, and you must keep your account password secure.</p>
            <h2>3. Service Modifications</h2>
            <p>We reserve the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice at any time.</p>
            <h2>4. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at legal@funneling.io.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
