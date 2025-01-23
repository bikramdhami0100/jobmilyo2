import React from 'react';
import Head from 'next/head';

const cookiesData = [
  {
    section: "Introduction",
    content: "JobMilyo uses cookies to improve the user experience and ensure that our website functions correctly. This Cookies Policy explains what cookies are, how we use them, and how you can manage your cookie preferences."
  },
  {
    section: "What Are Cookies?",
    content: "Cookies are small text files that are stored on your device when you visit a website. They are used to remember your preferences, login details, and browsing activities. Cookies can be 'persistent' or 'session' cookies. Persistent cookies remain on your device for a set period or until you delete them, while session cookies are deleted once you close your browser."
  },
  {
    section: "How We Use Cookies",
    content: `
      We use cookies for the following purposes:
      <ul class="list-disc pl-5">
        <li><strong>Essential Cookies:</strong> These cookies are necessary for the proper functioning of our website. They enable you to navigate our site and use its features, such as accessing secure areas.</li>
        <li><strong>Performance Cookies:</strong> These cookies collect information about how visitors use our website. They help us understand which pages are the most and least popular, and how visitors move around the site.</li>
        <li><strong>Functionality Cookies:</strong> These cookies allow our website to remember your preferences and provide enhanced functionality and personalization, such as remembering your login details.</li>
        <li><strong>Advertising Cookies:</strong> These cookies are used to deliver advertisements that are relevant to you and your interests. They also help us measure the effectiveness of our advertising campaigns.</li>
      </ul>
    `
  },
  {
    section: "Managing Cookies",
    content: "You can manage your cookie preferences through your browser settings. Most browsers allow you to refuse cookies, delete cookies, or alert you when a cookie is being sent. Please note that if you disable cookies, some features of our website may not function properly."
  },
  {
    section: "Changes to This Cookies Policy",
    content: "We may update this Cookies Policy from time to time to reflect changes in our practices or legal requirements. We encourage you to review this policy periodically to stay informed about how we use cookies."
  },
  {
    section: "Contact Us",
    content: "If you have any questions about our use of cookies, please contact us at jobmilyo@gmail.com or visit our <a href='/user/Contact' class='text-blue-500 dark:text-blue-400 underline'>Contact</a> page."
  }
];

const Cookies: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
      <Head>
        <title>Cookies Policy - JobMilyo</title>
      </Head>
      <div className="container mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Cookies Policy</h1>
          <p className="text-center mb-8 text-gray-600 dark:text-gray-300">Learn about how JobMilyo uses cookies to improve your experience on our website.</p>
          
          <div className="space-y-6">
            {cookiesData.map((section, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{section.section}</h2>
                <p className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: section.content }}></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cookies;
