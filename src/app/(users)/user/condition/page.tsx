import React from 'react';
import Head from 'next/head';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
      <Head>
        <title>Terms and Conditions - JobMilyo</title>
      </Head>
      <div className="container mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Terms and Conditions</h1>
          <p className="mb-4 text-gray-600 dark:text-gray-300">Effective Date: [Effective Date]</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">1. Acceptance of Terms</h2>
            <p className="text-gray-700 dark:text-gray-300">
              By accessing and using JobMilyo, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">2. Changes to Terms</h2>
            <p className="text-gray-700 dark:text-gray-300">
              JobMilyo reserves the right to update and change the Terms and Conditions from time to time without notice. Any new features that augment or enhance the current website, including the release of new tools and resources, shall be subject to the Terms and Conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">3. Description of Service</h2>
            <p className="text-gray-700 dark:text-gray-300">
              JobMilyo provides job seekers with a platform to find and apply for jobs. Employers can post job openings and search for potential candidates. The services are provided "as is" and "as available" without any warranties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">4. User Responsibilities</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. Users agree to notify JobMilyo immediately of any unauthorized use of their account or any other breach of security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">5. Prohibited Activities</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Users agree not to engage in any of the following prohibited activities: (a) copying, distributing, or disclosing any part of the Service in any medium; (b) using any automated system to access the Service; (c) transmitting spam, chain letters, or other unsolicited email; (d) attempting to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">6. Termination</h2>
            <p className="text-gray-700 dark:text-gray-300">
              JobMilyo may terminate your access to the Service, without cause or notice, which may result in the forfeiture and destruction of all information associated with your account. All provisions of this Agreement that by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">7. Governing Law</h2>
            <p className="text-gray-700 dark:text-gray-300">
              This Agreement (and any further rules, policies, or guidelines incorporated by reference) shall be governed and construed in accordance with the laws of [Your Country], without giving effect to any principles of conflicts of law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">8. Contact Information</h2>
            <p className="text-gray-700 dark:text-gray-300">
              If you have any questions about these Terms, please contact us at [your contact information].
            </p>
          </section>

          <p className="text-gray-600 dark:text-gray-300">Last updated: [Last Updated Date]</p>
        </div>
      </div>
    </div>
  );
}

export default Terms;
