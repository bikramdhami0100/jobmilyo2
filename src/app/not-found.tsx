'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 px-4">
      <div className="text-center animate-fade-in">
        {/* Logo */}
        <div className="mb-6">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="mx-auto w-24 h-24 animate-fade-slide"
          />
        </div>

        {/* Error Message */}
        <h1 className="text-5xl font-bold mb-4 animate-fade-slide">
          404 - Page Not Found
        </h1>
        <p className="text-lg mb-6 animate-fade-slide">
          Sorry, the page you are looking for might have been removed, or the URL might be incorrect.
        </p>

        {/* Return Home Button */}
        <Link
          href="/user"
          className="inline-block px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-transform duration-300 ease-in-out transform hover:scale-105 animate-fade-slide"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
