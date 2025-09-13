import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white duration-300">
      <Navbar />
      {/* spacer for fixed navbar height */}
      <div className="h-16" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Dashboard Page
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Welcome to your dashboard
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* User Dashboard Section */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                User Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Manage your personal settings, view your activity, and customize your experience.
              </p>
              <button 
                onClick={() => navigate("/user-dashboard")}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
              >
                Access User Dashboard
              </button>
            </div>
          </div>

          {/* Admin Dashboard Section */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Admin Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Access administrative controls, manage users, and monitor system performance.
              </p>
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300">
                Access Admin Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
