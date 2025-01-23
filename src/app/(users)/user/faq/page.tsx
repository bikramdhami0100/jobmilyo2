import React from 'react';
import Head from 'next/head';

const faqData = [
    {
        section: "General",
        items: [
            {
                question: "What is JobMilyo?",
                answer: "JobMilyo is a job portal where job seekers can find and apply for jobs that match their interests and qualifications."
            },
            {
                question: "How do I create an account?",
                answer: "To create an account, click on the \"Sign Up\" button on the homepage and fill in the required information."
            }
        ]
    },
    {
        section: "Account",
        items: [
            {
                question: "How do I reset my password?",
                answer: "If you forget your password, click on the \"Forgot Password\" link on the login page and follow the instructions to reset it."
            },
            {
                question: "Can I delete my account?",
                answer: "Yes, you can delete your account by going to your account settings and selecting \"Delete Account.\""
            }
        ]
    },
    {
        section: "Job Applications",
        items: [
            {
                question: "How do I apply for a job?",
                answer: "To apply for a job, find the job listing that interests you and click on the \"Apply\" button. Follow the instructions to submit your application."
            },
            {
                question: "Can I track my application status?",
                answer: "Yes, you can track the status of your applications in the \"My Applications\" section of your account dashboard."
            }
        ]
    },
    {
        section: "Contact Us",
        items: [
            {
                question: "",
                answer: "If you have any other questions, please contact us at jobmilyo@gmail.com or visit our Contact page "
            }
        ]
    }
];

const FAQ: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
            <Head>
                <title>FAQ - JobMilyo</title>
            </Head>
            <div className="container mx-auto p-6">
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Frequently Asked Questions</h1>
                    <p className="text-center mb-8 text-gray-600 dark:text-gray-300">Here are some common questions and answers about JobMilyo. If you have any other questions, feel free to contact us.</p>

                    <div className="space-y-6">
                        {faqData.map((section, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">{section.section}</h2>
                                <div className="space-y-4">
                                    {section.items.map((item, index) => (
                                        <div key={index}>
                                            {/* {item.question && <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{item.question}</h3>}
                      <p className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: item.answer }}></p> */}
                                            <details
                                                className="group border-s-4 border-green-500 dark:text-gray-100 p-6 [&_summary::-webkit-details-marker]:hidden"
                                            >
                                                <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                                                    <h2 className="text-lg font-medium dark:text-gray-100">
                                                        {item.question}
                                                    </h2>

                                                    <span className="shrink-0 rounded-full darK:bg-white p-1.5 dark:text-gray-100 sm:p-3">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </span>
                                                </summary>

                                                <p className="mt-4 leading-relaxed dark:text-gray-100">
                                                    { item.answer}
                                                </p>
                                            </details>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FAQ;
