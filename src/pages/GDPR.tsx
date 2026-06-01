import { Globe } from 'lucide-react';

export default function GDPR() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
            <Globe className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">GDPR & Data Protection</h1>
          <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>At Funneling, we are committed to ensuring the security and protection of the personal information that we process, and to provide a compliant and consistent approach to data protection.</p>
            <h2>1. GDPR Compliance</h2>
            <p>We comply with the General Data Protection Regulation (GDPR) and are dedicated to safeguarding the personal information under our remit and developing a data protection regime that is effective, fit for purpose, and demonstrates an understanding of, and appreciation for, the new Regulation.</p>
            <h2>2. Your Rights</h2>
            <p>Under the GDPR, you have the right to access, rectify, port, and erase your data. You also have the right to object to and restrict certain processing of your data.</p>
            <h2>3. Data Security</h2>
            <p>We take the privacy and security of individuals and their personal information very seriously and take every reasonable measure to protect and secure the personal data that we process.</p>
            <h2>4. Contact Us</h2>
            <p>If you have any questions about our GDPR compliance or data protection practices, please contact our Data Protection Officer at dpo@funneling.io.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
