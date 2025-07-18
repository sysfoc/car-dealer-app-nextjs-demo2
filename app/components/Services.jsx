"use client"
import { ArrowUpRight, Car, Handshake, Wrench, Calculator } from "lucide-react"

const Services = () => {
  const services = [
    {
      icon: Car, // Lucide icon
      title: "Are You Looking For a Car?",
      description:
        "We are committed to providing our customers with exceptional service and helping you find the perfect vehicle that matches your needs and budget.",
      buttonText: "Browse Cars",
      href: "/car-for-sale",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Handshake, // Lucide icon
      title: "Do You Want to valuate a Car?",
      description:
        "Get the best value for your vehicle with our transparent pricing and hassle-free selling process. We make selling car simple and rewarding.",
      buttonText: "Car Valuation",
      href: "/cars/valuation",
      color: "bg-green-600",
      hoverColor: "hover:bg-green-700",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      icon: Wrench, // Lucide icon
      title: "Professional Car Service",
      description:
        "Expert maintenance and repair services to keep your vehicle running at peak performance. Certified technicians and quality parts guaranteed.",
      buttonText: "Book Service",
      href: "/contact",
      color: "bg-orange-600",
      hoverColor: "hover:bg-orange-700",
      iconBg: "bg-orange-100 dark:bg-orange-900/30",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
    {
      icon: Calculator, // Lucide icon
      title: "Add-Ons Solutions",
      description:
        "Flexible add-on options tailored to your budget. Get pre-approved quickly and drive away with confidence in your investment.",
      buttonText: "Check Add-ons",
      href: "/add-ons",
      color: "bg-purple-600",
      hoverColor: "hover:bg-purple-700",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ]
  return (
    <section className="py-12 bg-gray-50 border border-gray-200 rounded-2xl shadow-lg mx-4 my-6 dark:bg-gray-950 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center bg-blue-100/20 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-3">
            <span>Our Services</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">How Can We Help You?</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-5 text-base">
            Whether you are buying or selling, we are here to make your automotive journey seamless and rewarding
          </p>
          <div className="w-16 h-1.5 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full"></div>
        </div>
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-900/20 hover:border-blue-500/60 dark:hover:border-blue-600/60 transition-all duration-300 group"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 ${service.iconBg} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className={`w-6 h-6 ${service.iconColor}`} />
              </div>
              {/* Content */}
              <div className="space-y-3 mb-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">{service.description}</p>
              </div>
              {/* CTA Button */}
              <a href={service.href}>
                <button
                  className={`${service.color} ${service.hoverColor} text-white font-medium px-5 py-2.5 rounded-lg transition-all duration-300 flex items-center group-hover:shadow-lg text-sm`}
                >
                  {service.buttonText}
                  <ArrowUpRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
