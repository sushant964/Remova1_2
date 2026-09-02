import React from 'react';

export function PrivacyPolicy() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8 min-h-screen">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: August 25, 2026</p>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p>
              When you use Remova, we collect the images you upload solely for the purpose of providing the background removal service. We may also collect standard technical information automatically, such as your IP address, browser type, and usage patterns on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p>
              The images you upload are processed by our automated systems to remove the background. We do not use your uploaded images to train our AI models, and we do not use them for any marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Retention</h2>
            <p>
              We prioritize your privacy and data security. Images uploaded to Remova are stored temporarily in memory to perform the background removal process. Once the processed image is returned to you, the original and processed files are deleted from our servers. We do not maintain a permanent database of user images.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Services</h2>
            <p>
              We utilize third-party API providers to execute the background removal algorithm. These providers are bound by strict confidentiality agreements and are permitted to process your images only for the duration necessary to provide the service. They are prohibited from retaining or using your images for their own purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us through our website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
