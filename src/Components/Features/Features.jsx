import React from "react";
import { FaChartLine, FaCreditCard, FaCog, FaUsers, FaShieldAlt, FaRocket } from "react-icons/fa";

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
    name: "Customer Lifecycle Management",
    icon: (
      <FaUsers className="text-5xl text-primary group-hover:text-black duration-500" />
    ),
    link: "#",
    description: "Track customer journeys, predict churn, and implement retention strategies with AI-powered customer insights.",
    aosDelay: "700",
  },
  {
    name: "Revenue Optimization",
    icon: (
      <FaRocket className="text-5xl text-primary group-hover:text-black duration-300" />
    ),
    link: "#",
    description: "Maximize recurring revenue with dynamic pricing, upselling automation, and conversion rate optimization tools.",
    aosDelay: "900",
  },
  {
    name: "Security & Compliance",
    icon: (
      <FaShieldAlt className="text-5xl text-primary group-hover:text-black duration-500" />
    ),
    link: "#",
    description: "Enterprise-grade security with PCI DSS compliance, data encryption, and advanced fraud protection.",
    aosDelay: "1100",
  },
  {
    name: "Advanced Automation",
    icon: (
      <FaCog className="text-5xl text-primary group-hover:text-black duration-500" />
    ),
    link: "#",
    description: "AI-powered subscription management with automated workflows, pricing optimization, and customer lifecycle management.",
    aosDelay: "1300",
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
            Everything You Need to Scale
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-center text-neutral-600 dark:text-neutral-300 mb-16 max-w-3xl mx-auto"
          >
            From startups to enterprises, our comprehensive subscription management platform provides all the tools you need to build, grow, and optimize your recurring revenue business.
          </p>

          {/* card section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
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
