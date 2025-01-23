
import React, { useEffect } from 'react'

function OurService() {
   
    const services = [
        {
          title: 'Job Postings',
          description: 'Browse and apply to thousands of job postings from top companies.',
          icon: '📝',
        },
        {
          title: 'Resume Building',
          description: 'Create a professional resume using our easy-to-use resume builder.',
          icon: '📄',
        },
        {
          title: 'Job Alerts',
          description: 'Get notified about new job postings that match your criteria.',
          icon: '🔔',
        },
        {
          title: 'Employer Services',
          description: 'Access a wide pool of candidates and post job openings.',
          icon: '🏢',
        },
        {
          title: 'Job Deliverer Postings',
          description: 'Any type of job deliverer can post jobs directly on our website.',
          icon: '🚀',
        },
        {
          title: 'Local Area Job Submissions',
          description: 'Local job providers can send job details and we will post them on the website.',
          icon: '🏠',
        },
        {
          title: 'Local Area Job Provider Portal',
          description: 'Local job providers can sign up or log in to post job details directly.',
          icon: '🔑',
        },
      ];
    
    return (
        <div>
            <div className="min-h-screen  py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>
                    <p className="text-center mb-12 text-lg">
                        Explore the wide range of services we offer to help job seekers and employers.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className=" p-6 rounded-lg border  shadow-md text-center">
                                <div className="text-6xl mb-4">{service.icon}</div>
                                <h2 className="text-2xl font-semibold mb-2">{service.title}</h2>
                                <p>{service.description}</p>
                            </div>
                        ))}
                    </div>
   
                </div>
            </div>
        </div>
    )
}

export default OurService