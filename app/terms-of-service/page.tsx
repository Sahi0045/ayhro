export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0A1621] text-white py-16">
      <div className="max-w-[800px] mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#00FF85] mb-8">Terms of Service</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-[#00FF85] mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-300">
              By accessing or using Ayhro's services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00FF85] mb-4">2. Services</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Ayhro provides the following services:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Web Design and Development</li>
                <li>Mobile App Development</li>
                <li>UI/UX Design</li>
                <li>Blockchain Development</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00FF85] mb-4">3. Project Terms</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">3.1 Project Initiation</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Projects begin upon receipt of the agreed-upon payment</li>
                <li>Project timelines are estimates and may vary based on complexity</li>
                <li>Changes to project scope may affect timeline and cost</li>
              </ul>

              <h3 className="text-lg font-medium text-white mt-4">3.2 Deliverables</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Final deliverables are provided upon project completion</li>
                <li>Source code and design files are included where applicable</li>
                <li>Documentation and training materials are provided</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00FF85] mb-4">4. Payment Terms</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>50% payment required to initiate the project</li>
              <li>Remaining 50% due upon project completion</li>
              <li>Additional work billed at agreed-upon rates</li>
              <li>Late payments subject to 2% monthly interest</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00FF85] mb-4">5. Intellectual Property</h2>
            <p className="text-gray-300">
              Upon full payment, clients receive:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
              <li>Full ownership of final deliverables</li>
              <li>License to use the work for intended purposes</li>
              <li>Right to modify and distribute the work</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00FF85] mb-4">6. Confidentiality</h2>
            <p className="text-gray-300">
              We maintain strict confidentiality regarding:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
              <li>Client information and data</li>
              <li>Project details and specifications</li>
              <li>Business strategies and plans</li>
              <li>Technical implementations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00FF85] mb-4">7. Warranties and Disclaimers</h2>
            <p className="text-gray-300">
              Our services are provided "as is" without warranties of any kind. We are not liable for:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
              <li>Indirect or consequential damages</li>
              <li>Loss of profits or data</li>
              <li>Service interruptions</li>
              <li>Third-party actions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00FF85] mb-4">8. Termination</h2>
            <p className="text-gray-300">
              Either party may terminate the agreement with written notice. Upon termination:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
              <li>Client pays for work completed</li>
              <li>Confidentiality obligations remain in effect</li>
              <li>Intellectual property rights are preserved</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00FF85] mb-4">9. Contact Information</h2>
            <p className="text-gray-300">
              For questions about these Terms, please contact us at:
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-gray-300">Email: sahi0045@hotmail.com</p>
              <p className="text-gray-300">Phone: +91 9392954474</p>
            </div>
          </section>
        </div>

        <div className="mt-12 text-sm text-gray-400">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
} 