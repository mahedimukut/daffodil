"use client";
import React, { useState, useEffect } from "react";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

const CookieSettings = () => {
  const [analyticalCookies, setAnalyticalCookies] = useState(false);
  const [marketingCookies, setMarketingCookies] = useState(false);

  // Load saved preferences when the component mounts
  useEffect(() => {
    const savedPreferences = localStorage.getItem("cookiePreferences");
    if (savedPreferences) {
      const { analyticalCookies, marketingCookies } =
        JSON.parse(savedPreferences);
      setAnalyticalCookies(analyticalCookies);
      setMarketingCookies(marketingCookies);
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const preferences = {
      essentialCookies: true,
      analyticalCookies,
      marketingCookies,
    };

    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    toast.success("Cookie preferences updated successfully!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="bg-gray-50 py-20">
      <MaxWidthWrapper>
        <h1 className="text-4xl font-extrabold text-charcoalGray mb-6 text-center">
          Cookie Settings
        </h1>
        <p className="text-gray-600 mb-6 text-lg text-center">
          Manage your cookie preferences for a personalized experience on our
          website.
        </p>

        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoalGray mb-4">
            Your Cookie Preferences
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Essential Cookies (always enabled) */}
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">
                Essential Cookies
              </label>
              <input
                type="checkbox"
                checked
                disabled
                className="form-checkbox h-5 w-5 text-daffodilYellow"
              />
            </div>

            {/* Analytical Cookies */}
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">
                Analytical Cookies
              </label>
              <input
                type="checkbox"
                checked={analyticalCookies}
                onChange={(e) => setAnalyticalCookies(e.target.checked)}
                className="form-checkbox h-5 w-5 text-daffodilYellow"
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">
                Marketing Cookies
              </label>
              <input
                type="checkbox"
                checked={marketingCookies}
                onChange={(e) => setMarketingCookies(e.target.checked)}
                className="form-checkbox h-5 w-5 text-daffodilYellow"
              />
            </div>

            {/* Save Preferences Button */}
            <button
              type="submit"
              className="w-full bg-daffodilYellow text-charcoalGray py-3 rounded-lg font-semibold shadow-md hover:bg-daffodilYellow/80 transition"
            >
              Save Preferences
            </button>
          </form>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default CookieSettings;
