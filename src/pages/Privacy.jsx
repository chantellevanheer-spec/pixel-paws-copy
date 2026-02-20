import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto funky-card p-8 md:p-12 space-y-6">
      <header className="text-center">
        <h1 className="header-font text-4xl md:text-5xl text-gray-800">Privacy Policy</h1>
        <p className="body-font-light text-gray-500 mt-2">Last updated: August 2, 2024</p>
      </header>

      <div className="body-font-light text-gray-700 space-y-4 prose lg:prose-xl">
        <p>
          Welcome to Pixel Paws. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.
        </p>

        <h2 className="header-font text-2xl text-gray-800">1. Information We Collect</h2>
        <p>
          We may collect information about you in a variety of ways. The information we may collect includes:
        </p>
        <ul>
          <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, that you voluntarily give to us when you register with the application.</li>
          <li><strong>Uploaded Content:</strong> We collect the photos of your pets that you upload for transformation. These images are used solely for the purpose of generating the AI artwork.</li>
          <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the app, such as your IP address, browser type, and the dates and times of access.</li>
        </ul>

        <h2 className="header-font text-2xl text-gray-800">2. Use of Your Information</h2>
        <p>
          Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:
        </p>
        <ul>
          <li>Create and manage your account.</li>
          <li>Generate AI-powered transformations of your pet photos.</li>
          <li>Email you regarding your account or order.</li>
          <li>Improve our application and services.</li>
        </ul>

        <h2 className="header-font text-2xl text-gray-800">3. Disclosure of Your Information</h2>
        <p>
          We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. Your uploaded pet photos and the resulting transformations are stored securely and are not shared publicly without your consent.
        </p>

        <h2 className="header-font text-2xl text-gray-800">4. Security of Your Information</h2>
        <p>
          We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
        </p>
        
        <h2 className="header-font text-2xl text-gray-800">5. Contact Us</h2>
        <p>
          If you have questions or comments about this Privacy Policy, please contact us at: privacy@pixelpaws.app
        </p>
      </div>
    </div>
  );
}