import React from 'react';

export function TermsOfService() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8 min-h-screen">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: August 25, 2026</p>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Remova ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use of the Service</h2>
            <p>
              You may use the Service only for lawful purposes. You agree not to upload images that contain illegal, explicit, or copyright-infringing material. You must have the necessary rights and permissions for any images you upload for processing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Intellectual Property</h2>
            <p>
              You retain all ownership rights to the original images you upload to Remova. The processed images with backgrounds removed belong to you. We do not claim any copyright or ownership over your content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Disclaimer of Warranties</h2>
            <p>
              The Service is provided on an "as is" and "as available" basis. While we strive for high-quality background removal, we do not warrant that the results will be completely error-free or perfectly accurate for every image. We disclaim all warranties, express or implied, including merchantability and fitness for a particular purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
            <p>
              In no event shall Remova be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of your use or inability to use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. We will notify users of any significant changes by updating the date at the top of this page. Your continued use of the Service after changes constitutes acceptance of the new terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
