"use client"
import { useEffect } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/router";

const EnhancedAlertDialog = ({ openPopUp, setOpenPopUp,seekerGoogleLogin }:any) => {
  const router = useRouter();

  useEffect(() => {
    if (openPopUp) {
      gsap.fromTo(
        ".dialog-content",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [openPopUp]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all ${
        openPopUp ? "visible" : "invisible"
      }`}
      aria-hidden={!openPopUp}
    >
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={() => setOpenPopUp(false)}
      ></div>

      {/* Dialog Box */}
      <div
        className="dialog-content relative z-10 w-[90%] max-w-md bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-200 rounded-lg shadow-lg p-6"
      >
        <div className="text-center">
          {/* Header */}
          <h2 className="text-xl font-semibold text-red-500">
            Are you absolutely sure?
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Please confirm your choice. You can choose from the options below.
          </p>

          {/* Image */}
          <div className="my-4 flex justify-center">
            <img
              src="/images/social/alert-image.png"
              alt="Alert"
              className="h-20 w-20 rounded-full border-4 border-gray-600"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
            <button
              onClick={() => {
                seekerGoogleLogin();
              }}
              className="flex items-center justify-center gap-2 bg-white text-gray-800 dark:bg-gray-700 dark:text-white px-4 py-2 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              <img
                src="/images/social/google.png"
                alt="Google"
                className="h-6 w-6"
              />
              Sign in with Google
            </button>
            <button
              onClick={() => {
                router.push("/user/login");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500 transition"
            >
              Log in
            </button>
            <button
              onClick={() => {
                router.push("/user/signup");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500 transition"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setOpenPopUp(false)}
            className="text-gray-300 hover:text-gray-400 underline text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAlertDialog;
