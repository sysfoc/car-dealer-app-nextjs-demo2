"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  FaCheck, 
  FaCamera, 
  FaCar, 
  FaShieldAlt, 
  FaDollarSign,
  FaUsers,
  FaClock,
  FaStar,
  FaChevronDown,
  FaArrowRight,
  FaPlay
} from "react-icons/fa";
import { 
  MdLocalCarWash, 
  MdOutlinePayments, 
  MdOutlineVerifiedUser,
  MdSpeed,
  MdSecurity,
  MdSupport
} from "react-icons/md";
import { 
  BiSolidDetail, 
  BiTrendingUp 
} from "react-icons/bi";
import { 
  GoAlertFill 
} from "react-icons/go";

export default function SellMyCar() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const router = useRouter();

  const benefits = [
    {
      icon: <FaDollarSign className="text-2xl" />,
      title: "Best Market Price",
      description: "Get highest value for your vehicle with our AI-powered valuation"
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "Quick Sale",
      description: "Sell your car 2x faster than traditional methods"
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Secure Process",
      description: "Complete protection with verified buyers and secure payments"
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: "Million+ Buyers",
      description: "Access to the largest network of car buyers nationwide"
    }
  ];

  const howItWorks = [
    {
      step: "01",
      icon: <FaCamera className="text-3xl" />,
      title: "Capture Excellence",
      description: "Take stunning photos that showcase your car&apos;s best features. Our AI guides you through the perfect angles.",
      tip: "Pro tip: Clean your car and shoot during golden hour for maximum appeal"
    },
    {
      step: "02",
      icon: <BiSolidDetail className="text-3xl" />,
      title: "Craft Your Story",
      description: "Create a compelling description that highlights unique features and maintenance history.",
      tip: "Honesty builds trust - mention both strengths and any minor issues upfront"
    },
    {
      step: "03",
      icon: <MdOutlineVerifiedUser className="text-3xl" />,
      title: "Go Live",
      description: "Your listing goes live instantly, reaching millions of potential buyers across our platform.",
      tip: "Respond quickly to inquiries to maintain buyer interest and close faster"
    }
  ];

  const guides = [
    {
      icon: <MdLocalCarWash className="text-4xl text-blue-500" />,
      title: "Car Preparation",
      description: "Transform your vehicle into a buyer magnet with professional preparation techniques.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <BiTrendingUp className="text-4xl text-green-500" />,
      title: "Pricing Strategy",
      description: "Master the art of competitive pricing to sell faster while maximizing your profit.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <MdOutlinePayments className="text-4xl text-purple-500" />,
      title: "Payment Security",
      description: "Navigate payment methods safely with our comprehensive security protocols.",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: <GoAlertFill className="text-4xl text-red-500" />,
      title: "Scam Prevention",
      description: "Stay protected with our advanced fraud detection and prevention strategies.",
      color: "from-red-500 to-pink-500"
    }
  ];

  const features = [
    {
      icon: <MdSpeed className="text-3xl" />,
      title: "Lightning Fast",
      description: "List your car in under 5 minutes"
    },
    {
      icon: <MdSecurity className="text-3xl" />,
      title: "Bank-Level Security",
      description: "Your data is protected with enterprise-grade encryption"
    },
    {
      icon: <MdSupport className="text-3xl" />,
      title: "24/7 Expert Support",
      description: "Get help whenever you need it from our dedicated team"
    }
  ];

  const faqs = [
    {
      question: "Why choose Car Dealer over other platforms?",
      answer: "Car Dealer offers the largest buyer network, advanced AI valuation, and dedicated support. Our sellers are 2x more likely to sell within a week, and we provide comprehensive fraud protection throughout the entire process."
    },
    {
      question: "What documents do I need to sell my car?",
      answer: "You will need your vehicle title, registration, maintenance records, and if applicable, your loan payoff information. We&apos;ll guide you through exactly what&apos;s required in your state during the listing process."
    },
    {
      question: "How is my car value determined?",
      answer: "Our AI-powered valuation system analyzes thousands of data points including recent sales, market trends, vehicle condition, mileage, and location to provide the most accurate market value for your specific vehicle."
    },
    {
      question: "Is it safe to sell my car online?",
      answer: "Absolutely. We verify all buyers, provide secure payment processing, and offer comprehensive fraud protection. Our platform includes identity verification, secure messaging, and transaction monitoring for your complete safety."
    },
    {
      question: "How long does it typically take to sell?",
      answer: "Most vehicles sell within 7-14 days on our platform. Factors like pricing, photos, and description quality can significantly impact sale speed. Premium listings with professional photos typically sell 3x faster."
    }
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
return (
  <div className="min-h-screen bg-white dark:bg-gray-900">
    {/* Hero Section */}
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full bg-blue-500/10 px-4 py-2 backdrop-blur-sm">
              <FaStar className="mr-2 text-yellow-400" />
              <span className="text-sm font-medium text-blue-100">Trusted by 10k+ sellers</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight text-white lg:text-6xl">
                Sell Your Car
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Smarter</span>
              </h1>
              <p className="text-xl text-blue-100 lg:text-2xl">
                Join millions who've discovered the fastest, safest way to sell their vehicles. 
                Get your free valuation and list in minutes.
              </p>
               <button
                onClick={() => router.push("/login")}
                className="group relative inline-flex transform items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <span className="relative z-10 mr-3">Create your Ad</span>
                <FaArrowRight className="relative z-10 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 backdrop-blur-sm">
                    {benefit.icon}
                  </div>
                  <p className="text-sm font-medium text-white">{benefit.title}</p>
                  <p className="text-xs text-blue-200">{benefit.description}</p>
                </div>
              ))}
            </div>

          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-2xl"></div>
            <div className="relative overflow-hidden rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
              <Image
                src="/Luxury SUV.webp"
                alt="Luxury SUV for sale"
                width={600}
                height={400}
                className="w-full rounded-xl object-cover shadow-2xl"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* How It Works Section */}
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our streamlined process makes selling your car effortless. Follow these three simple steps to get your vehicle sold fast.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {howItWorks.map((step, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg">
                    {step.icon}
                  </div>
                  <div className="text-6xl font-bold text-gray-100 dark:text-gray-700">
                    {step.step}
                  </div>
                </div>

                <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
                
                <div className={`transform transition-all duration-500 ${
                  hoveredCard === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                      {step.tip}
                    </p>
                  </div>
                </div>
              </div>

              {index < howItWorks.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <FaArrowRight className="text-2xl text-blue-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-10 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Car Dealer?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Experience the difference with our premium selling platform
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="group text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                {feature.icon}
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get answers to the most common questions about selling your car
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all duration-300 hover:shadow-md">
              <button
                onClick={() => toggleFaq(index)}
                className="flex w-full items-center justify-between p-6 text-left transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <span className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <FaChevronDown 
                  className={`h-5 w-5 text-blue-500 transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
              <div className={`transition-all duration-500 ease-in-out ${
                activeIndex === index 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <div className="px-6 pb-6">
                  <div className="h-px bg-gradient-to-r from-blue-500 to-cyan-500 mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 py-20">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Sell Your Car?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied sellers who chose the smarter way to sell. 
          Get your free valuation and start selling today.
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="#"
            className="group flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-blue-600 shadow-lg transition-all duration-300 hover:bg-gray-100 hover:shadow-xl hover:-translate-y-1"
          >
            Get Free Valuation
            <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#"
            className="flex items-center justify-center rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  </div>
);
}