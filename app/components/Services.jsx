"use client";
import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaCar, FaHandshake, FaTools, FaCalculator } from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: FaCar,
      title: "Are You Looking For a Car?",
      description: "We are committed to providing our customers with exceptional service and helping you find the perfect vehicle that matches your needs and budget.",
      buttonText: "Browse Cars",
      href: "/car-for-sale",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: FaHandshake,
      title: "Do You Want to Sell a Car?",
      description: "Get the best value for your vehicle with our transparent pricing and hassle-free selling process. We make selling your car simple and rewarding.",
      buttonText: "Sell My Car",
      href: "/cars/sell-my-car",
      color: "bg-green-600",
      hoverColor: "hover:bg-green-700",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400"
    },
    {
      icon: FaTools,
      title: "Professional Car Service",
      description: "Expert maintenance and repair services to keep your vehicle running at peak performance. Certified technicians and quality parts guaranteed.",
      buttonText: "Book Service",
      href: "/service",
      color: "bg-orange-600",
      hoverColor: "hover:bg-orange-700",
      iconBg: "bg-orange-100 dark:bg-orange-900/30",
      iconColor: "text-orange-600 dark:text-orange-400"
    },
    {
      icon: FaCalculator,
      title: "Auto Financing Solutions",
      description: "Flexible financing options tailored to your budget. Get pre-approved quickly and drive away with confidence in your investment.",
      buttonText: "Get Financing",
      href: "/financing",
      color: "bg-purple-600",
      hoverColor: "hover:bg-purple-700",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400"
    }
  ];

  return (
    <section className="py-7 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full text-sm font-medium mb-3">
            <span>Our Services</span>
          </div>
          
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            How Can We Help You?
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-5">
            Whether you are buying or selling, we are here to make your automotive journey seamless and rewarding
          </p>
          
          <div className="w-12 h-1 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-gray-900/20 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className={`w-10 h-10 ${service.iconBg} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className={`w-5 h-5 ${service.iconColor}`} />
              </div>

              {/* Content */}
              <div className="space-y-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>

              {/* CTA Button */}
              <a href={service.href}>
                <button
                  className={`${service.color} ${service.hoverColor} text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center group-hover:shadow-md text-sm`}
                >
                  {service.buttonText}
                  <MdOutlineArrowOutward className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        {/* <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Need Help Deciding?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-5">
              Our expert team is here to guide you through every step of your automotive journey
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors duration-300">
                Contact Us Today
              </button>
              <button className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div> */}

        {/* Stats Section */}
        {/* <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">500+</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">Cars Available</div>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">2K+</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">Happy Customers</div>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">15+</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">Years Experience</div>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">24/7</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">Support Available</div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Services;