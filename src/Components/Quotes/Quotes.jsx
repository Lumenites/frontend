import React from "react";

const Quotes = () => {
  const testimonials = [
    {
      quote: "Sub Manager increased our MRR by 40% in just 3 months through better churn prediction and automated retention campaigns.",
      author: "Sarah Chen",
      role: "CEO, TechFlow",
      aosDelay: "300"
    },
    {
      quote: "The 3D analytics dashboard gave us insights we never had before. We can now predict customer behavior and optimize pricing in real-time.",
      author: "Michael Rodriguez",
      role: "Head of Growth, DataSync",
      aosDelay: "600"
    },
    {
      quote: "Finally, a platform that scales with us. From startup to enterprise, Sub Manager has been our growth partner every step of the way.",
      author: "Emily Watson",
      role: "Founder, CloudScale",
      aosDelay: "900"
    }
  ];

  return (
    <>
      <div className="container py-14 px-4">
        <div className="text-center mb-16">
          <h2
            data-aos="fade-up"
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Trusted by Growing Businesses
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto"
          >
            See how companies are scaling their subscription revenue with our platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={testimonial.aosDelay}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 italic">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.author}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Quotes;
