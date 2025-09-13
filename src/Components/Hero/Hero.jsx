import React from "react";
import ModelCanvas from "../Three/ModelCanvas";

const Hero = () => {
  return (
    <>
      <div className="py-12 sm:py-0 dark:bg-dark dark:text-white duration-300 overflow-hidden">
        <div className="container min-h-[700px] flex relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center relative z-10">
            {/* hero text section */}
            <div className="order-2 sm:order-1 space-y-5 lg:pr-20 relative z-30">
              <h1 data-aos="fade-up" data className="text-4xl font-semibold">
                Master Your Revenue
                <span className="bg-clip-text text-transparent brand-gradient ml-2">
                  With Smart Subscriptions
                </span>
              </h1>
              <p data-aos="fade-up" data-aos-delay="300" className="text-neutral-600 dark:text-neutral-300">
                Powerful subscription management platform with 3D analytics, automated billing, and real-time insights—designed to scale your business effortlessly.
              </p>
              <div className="flex gap-6">
                <button
                  data-aos="fade-up"
                  data-aos-delay="500"
                  className="primary-btn"
                >
                  Start Free Trial
                </button>
              </div>
            </div>
            {/* image section */}
            <div
              data-aos="fade-up"
              data-aos-offset="0"
              className="order-1 sm:order-2 w-full max-w-[520px]"
            >
              <ModelCanvas />
            </div>
          </div>

          {/* Animated Blob */}
          <div className="h-[300px] w-[300px] brand-gradient rounded-full absolute top-0 left-0 blur-3xl animated-wrapper"></div>
        </div>
      </div>
    </>
  );
};

export default Hero;
