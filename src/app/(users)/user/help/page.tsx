// pages/help.
"use client"
import { NextPage } from 'next';
import Head from 'next/head';

const Help: NextPage = () => {
  const helpContent = {
    navigation: {
      title: "Navigation Help 🚀",
      description: "Learn how to navigate through our website:",
      items: [
        "Home: Overview of our services and features.",
        "About: Information about our company.",
        "Jobs: View and search job listings.",
        "Contact: Reach out to us for any inquiries.",
        "Documentation: Detailed guides and resources."
      ]
    },
    account: {
      title: "Account Help 👤",
      description: "Manage your user account with these steps:",
      items: [
        "Create an Account: Sign up using the registration form.",
        "Log In: Use your credentials to log in.",
        "Manage Account: Update your profile and settings."
      ]
    },
    jobSearch: {
      title: "Job Search Help 🔍",
      description: "Find and apply for jobs easily:",
      items: [
        "Search Jobs: Use the search bar to find relevant jobs.",
        "Apply for Jobs: Click on the job listing and apply directly.",
        "Filter Jobs: Use filters to narrow down your search."
      ]
    },
    company: {
      title: "Company Information Help 🏢",
      description: "Get to know our company:",
      items: [
        "About Us: Learn more about our mission and values.",
        "Our Services: Discover the services we offer.",
        "Privacy Policy: Understand how we handle your data.",
        "Terms and Conditions: Read the terms of using our site."
      ]
    },
    contact: {
      title: "Contact Help 📞",
      description: "If you need further assistance, please contact us:",
      items: [
        "Email: jobmilyo@gmail.com",
        "Phone: 9800000000",
        "Address: Katan-18, Mahendranagar, Nepal"
      ]
    }
  };
  
  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <Head>
        <title>Help - Job मिल्यो</title>
      </Head>
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Help Center</h1>

        {Object.values(helpContent).map((section, index) => (
          <section key={index} className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
            <p>{section.description}</p>
            <ul className="list-disc list-inside ml-4">
              {section.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
        ))}

     
        
      </div>
    </div>
  );
};

export default Help;
