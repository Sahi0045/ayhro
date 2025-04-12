export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0A1621] text-white py-16">
      <div className="max-w-[800px] mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#00FF85] mb-8">Privacy Policy</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-[#00FF85] mb-4">1. Introduction</h2>
            <p className="text-gray-300">
              At Ayhro, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00FF85] mb-4">2. Information We Collect</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">2.1 Personal Information</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Name and contact information</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company information</li>
                <li>Project requirements and specifications</li>
              </ul>

              <h3 className="text-lg font-medium text-white mt-4">2.2 Automatically Collected Information</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Usage data and analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00FF85] mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>To provide and maintain our services</li>
              <li>To communicate with you about your projects</li>
              <li>To improve our services and user experience</li>
              <li>To send you marketing communications (with your consent)</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00FF85] mb-4">4. Information Sharing</h2>
            <p className="text-gray-300">
              We do not sell or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
              <li>Service providers who assist in our operations</li>
              <li>Professional advisors and consultants</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00FF85] mb-4">5. Data Security</h2>
            <p className="text-gray-300">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00FF85] mb-4">6. Your Rights</h2>
            <p className="text-gray-300">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Withdraw consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00FF85] mb-4">7. Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-gray-300">Email: sahi0045@hotmail.com</p>
              <p className="text-gray-300">Phone: +91 9392954474</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00FF85] mb-4">8. Updates to This Policy</h2>
            <p className="text-gray-300">
              We may update this Privacy Policy from time to time. The latest version will be posted on this page with the effective date.
            </p>
          </section>
        </div>

        <div className="mt-12 text-sm text-gray-400">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
} 