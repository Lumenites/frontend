import React from "react";
const BANNER_3D_2 = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop";
const BANNER_3D_2_FALLBACK = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop";
import { BiPlayCircle } from "react-icons/bi";

const Banner2 = ({ togglePlay }) => {
  return (
    <div className="py-12 sm:py-0 relative">
      <div className="container min-h-[620px] flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center">
          {/* text content section */}
          <div className="order-2 sm:order-1  lg:pr-20 relative">
            <div className="relative z-10 space-y-5">
              <h1
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-4xl font-semibold"
              >
                Automated Billing
                <span className="bg-clip-text text-transparent brand-gradient ml-2">
                  Smart, Secure, Scalable
                </span>
              </h1>
              <p data-aos="fade-up" data-aos-delay="500" className="text-neutral-600 dark:text-neutral-300">
                Seamless payment processing, automated invoicing, and intelligent dunning management—so you can focus on growing your business.
              </p>
              <div className="flex gap-6">
                <button
                  data-aos="fade-up"
                  data-aos-delay="700"
                  className="primary-btn"
                >
                  Setup Billing
                </button>
                <button
                  data-aos="fade-up"
                  data-aos-delay="900"
                  onClick={togglePlay}
                  className="flex items-center gap-2 secondary-btn"
                >
                  {" "}
                  <BiPlayCircle className="text-3xl" />
                  Watch Demo
                </button>
              </div>
            </div>
            {/* backgrond color blob */}
            <div className="h-[300px] w-[300px] brand-gradient rounded-full absolute bottom-[-200px] left-[300px] blur-3xl opacity-50 "></div>
          </div>

          {/* image section */}
          <div data-aos="fade-up" className="order-1 sm:order-2">
            <img
              src={BANNER_3D_2}
              alt="Subscription billing dashboard"
              className="w-full max-w-[460px] rounded-2xl shadow-xl"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = BANNER_3D_2_FALLBACK; }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner2;
