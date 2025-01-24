'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function NotFound() {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      '.error-message',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    )
      .fromTo(
        '.return-home',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        '.logo',
        { opacity: 0, rotate: -45 },
        { opacity: 1, rotate: 0, duration: 0.6 },
        '-=0.5'
      );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100">
      <div className="text-center px-4">
        <div className="mb-6">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="logo mx-auto w-24 h-24"
          />
        </div>
        <h1 className="error-message text-5xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="error-message text-lg mb-6">
          Sorry, the page you are looking for might have been removed, or the URL might be incorrect.
        </p>
       
          <Link href={"/user"} className="return-home inline-block px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all">
            Return to Home
          </Link>
     
      </div>
    </div>
  );
}
