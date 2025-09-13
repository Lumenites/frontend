import React from "react";
import { useNavigate } from "react-router-dom";

const AppStore = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container py-10 sm:min-h-[400px] sm:grid sm:place-items-center">
        <div className="space-y-6 max-w-xl mx-auto">
          <h1
            data-aos="fade-up"
            className="text-2xl text-center sm:text-4xl font-semibold "
          >
            Ready to Scale Your Business?
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-center sm:px-20"
          >
            Join thousands of businesses already growing their recurring revenue with our comprehensive subscription management platform. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
            <button
              data-aos="fade-up"
              data-aos-delay="500"
              onClick={() => navigate("/user-dashboard")}
              className="primary-btn px-8 py-4 text-lg"
            >
              Start Free Trial
            </button>
            <button
              data-aos="fade-up"
              data-aos-delay="700"
              onClick={() => navigate("/plans")}
              className="secondary-btn px-8 py-4 text-lg"
            >
              View Pricing Plans
            </button>
          </div>
          
          <div className="mt-8 text-center">
            <p
              data-aos="fade-up"
              data-aos-delay="900"
              className="text-sm text-neutral-600 dark:text-neutral-400"
            >
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppStore;
