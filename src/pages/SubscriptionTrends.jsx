import React, { useState } from "react";

const SubscriptionDetails = () => {
  const [darkMode, setDarkMode] = useState(false);

  const subscriptionTrendData = [
    { month: "Jan", active: 2200, cancelled: 180, new: 450 },
    { month: "Feb", active: 2350, cancelled: 165, new: 380 },
    { month: "Mar", active: 2480, cancelled: 142, new: 420 },
    { month: "Apr", active: 2650, cancelled: 158, new: 485 },
    { month: "May", active: 2720, cancelled: 134, new: 390 },
    { month: "Jun", active: 2847, cancelled: 129, new: 467 },
  ];

  return (
    <div
      className={`min-h-screen p-6 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900"
      }`}
    >
      {/* Toggle Dark Mode */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mb-6 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all"
      >
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      <div
        className={`${
          darkMode
            ? "bg-gray-800"
            : "bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50/80 backdrop-blur-sm"
        } rounded-2xl p-6 shadow-lg border ${
          darkMode ? "border-gray-700" : "border-white/30"
        }`}
      >
        <h3 className="text-lg font-semibold mb-6">Subscription Details</h3>

        <div className="overflow-x-auto">
          <table
            className={`w-full border-collapse ${
              darkMode ? "text-gray-200" : "text-gray-900"
            }`}
          >
            <thead>
              <tr
                className={`${
                  darkMode ? "bg-gray-700" : "bg-blue-100"
                } text-left`}
              >
                <th className="px-4 py-2">Month</th>
                <th className="px-4 py-2">Active Subscriptions</th>
                <th className="px-4 py-2">New Subscriptions</th>
                <th className="px-4 py-2">Cancelled</th>
              </tr>
            </thead>
            <tbody>
              {subscriptionTrendData.map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0
                      ? darkMode
                        ? "bg-gray-800"
                        : "bg-white"
                      : darkMode
                      ? "bg-gray-700"
                      : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-2">{row.month}</td>
                  <td className="px-4 py-2">{row.active}</td>
                  <td className="px-4 py-2">{row.new}</td>
                  <td className="px-4 py-2">{row.cancelled}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetails;
