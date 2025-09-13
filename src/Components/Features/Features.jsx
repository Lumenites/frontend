import React from "react";
import { FaChartLine, FaCreditCard, FaCog } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { SlNote } from "react-icons/sl";

const FeaturesData = [
  {
    name: "3D Analytics Dashboard",
    icon: (
      <FaChartLine className="text-5xl text-primary group-hover:text-black duration-300" />
    ),
    link: "#",
    description: "Interactive 3D visualizations of your subscription metrics, revenue trends, and customer insights in real-time.",
    aosDelay: "300",
  },
  {
    name: "Smart Billing Engine",
    icon: (
      <FaCreditCard className="text-5xl text-primary group-hover:text-black duration-300" />
    ),
    link: "#",
    description: "Automated invoicing, payment processing, and dunning management with intelligent retry logic and fraud detection.",
    aosDelay: "500",
  },
  {
    name: "Advanced Automation",
    icon: (
      <FaCog className="text-5xl text-primary group-hover:text-black duration-500" />
    ),
    link: "#",
    description: "AI-powered subscription management with automated workflows, pricing optimization, and customer lifecycle management.",
    aosDelay: "700",
  },
];

const Features = () => {
  return (
    <>
      <div className="container py-14 sm:min-h-[600px]">
        <div>
          <h1
            data-aos="fade-up"
            className="text-3xl font-semibold text-center sm:text-4xl mb-12"
          >
            Why Choose Our Platform
          </h1>

          {/* card section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {FeaturesData.map((data, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                className="text-center group space-y-3 sm:space-y-6 p-4 sm:py-10 bg-neutral-900 dark:bg-neutral-900 hover:brand-gradient hover:shadow-[0_0_40px_#7C3AED70] text-white rounded-lg duration-300"
              >
                <div className="grid place-items-center"> {data.icon}</div>
                <h1 className="text-2xl">{data.name}</h1>
                <p className="text-neutral-300">{data.description}</p>
                <a
                  href={data.link}
                  className="inline-block text-lg font-semibold py-3 text-white/90"
                >
                  Learn More
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
