import React from "react";
import { useNavigate } from "react-router-dom";
const BANNER_3D_1 = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="py-12 sm:py-0 relative">
      <div className="container min-h-[620px] flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center">
          {/* image section */}
          <div data-aos="fade-up" data-aos-once="false">
            <img src={BANNER_3D_1} alt="Subscription analytics dashboard" className="w-full max-w-[460px] rounded-2xl shadow-xl" />
          </div>
          {/* text content section */}
          <div className=" lg:pr-20 relative">
            <div className="relative z-10 space-y-5">
              <h1
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-4xl font-semibold"
              >
                Reduce Churn by
                <span className="bg-clip-text text-transparent brand-gradient ml-2">
                  60% with AI Insights
                </span>
              </h1>
              <p data-aos="fade-up" data-aos-delay="500" className="text-neutral-600 dark:text-neutral-300">
                Our AI-powered platform predicts customer behavior, identifies at-risk subscribers, and automatically triggers retention campaigns to keep your customers engaged and reduce churn.
              </p>
              <div className="flex gap-6">
                <button
                  data-aos="fade-up"
                  data-aos-delay="700"
                  onClick={() => navigate("/user-dashboard")}
                  className="primary-btn"
                >
                  See AI Insights
                </button>
              </div>
            </div>
            {/* backgrond color blob */}
            <div className="h-[300px] w-[300px] brand-gradient rounded-full absolute bottom-[-50px] left-[300px] blur-3xl opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
