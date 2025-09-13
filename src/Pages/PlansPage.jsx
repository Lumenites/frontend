import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { plans } from "../utils/dummyData";

const PlansPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white duration-300">
      <Navbar />
      <div className="h-16" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Select the perfect plan for your needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-primary ring-2 ring-primary/20' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="text-center mb-4">
                  <span className="bg-primary text-white text-sm px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold text-primary mb-2">
                  {plan.price}
                  <span className="text-lg font-normal text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {plan.quota} storage included
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate("/user-dashboard")}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-300 ${
                  plan.popular
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {plan.popular ? 'Get Started' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/user-dashboard")}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </main>
  );
};

export default PlansPage;
