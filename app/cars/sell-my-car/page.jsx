"use client";
import ChooseUs from "@/app/components/ChooseUs";
import Image from "next/image";
import Link from "next/link";
import { FaCheck } from "react-icons/fa6";
import { MdLocalCarWash } from "react-icons/md";
import { FcAdvertising } from "react-icons/fc";
import { MdOutlinePayments } from "react-icons/md";
import { GoAlertFill } from "react-icons/go";
import { FaCamera } from "react-icons/fa";
import { BiSolidDetail } from "react-icons/bi";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { useState } from "react";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Why sell my car with Auto Trader?",
      answer:
        "With Auto Trader, youre twice as likely to sell your car within a week. We also have more options than anywhere else to sell your car, so you are in control. Part Exchange, The easy way to part exchange your old car for new one. 2. Create an advert, You are in full control with your own sale. You can create and upload your advert in just three steps, and the size of our audience means youll get your car in front of more buyers than on any other site.",
    },
    {
      question: "What paperwork do I need to sell my car?",
      answer:
        "When you sell your car, you will need to hand over the cars handbook, the service logbook (plus receipts) and, if the car is over three years old, the MOT certificate. Buyers may also appreciate older MOT certificates and maintenance receipts.",
    },
    {
      question: "Where can I sell my car?",
      answer:
        "You could sell it directly to a dealership or auction house, or you can sell it online. If you have got the time to wait for the right buyer, selling your car privately on a site like Auto Trader can earn you more money.",
    },
    {
      question: "What is my car worth?",
      answer:
        "Auto Traders free car valuation tool gives you the right guide price. We combine data from thousands of live adverts and dealer websites, plus values from car auctions, and ex-fleet and leasing vehicles. As our guide price represents the entire market and our data is updated daily, your quote is fair, priced to sell, and accurate.",
    },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <>
      <section className="min-h-screen w-full bg-gray-100 dark:bg-gray-700">
        <div className="mx-4 py-10 sm:mx-16 sm:py-20">
          <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2">
            <div>
              <div className="space-y-2">
                <small className="text-xl uppercase">Sell my car</small>
                <h1 className="text-4xl font-semibold text-blue-950 dark:text-red-500">
                  Place an Advert on Car Dealer
                </h1>
                <p>3 simple steps to get your advert online</p>
              </div>
              <div className="mt-5 space-y-2">
                <div className="flex items-center gap-x-2">
                  <FaCheck fontSize={22} />
                  <div>
                    <p>Free, instant online valuation</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <FaCheck fontSize={22} />
                  <div>
                    <p>Advertise to millions</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <FaCheck fontSize={22} />
                  <div>
                    <p>Dedicated support team</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  href={"#"}
                  className="rounded-full bg-blue-950 px-5 py-3 text-white dark:bg-red-500"
                >
                  Create your advert
                </Link>
              </div>
            </div>
            <div className="flex w-full items-center justify-center">
              <Image
                src={"/Luxury SUV.webp"}
                alt="VAN"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="mx-4 py-10 sm:mx-16 sm:py-20">
        <h3 className="text-center text-3xl font-bold text-blue-950 dark:text-red-500">
          How to sell your car, fast
        </h3>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <div className="space-y-4 border border-gray-200 px-3 py-8 text-center shadow-md">
            <div className="flex items-center justify-center">
              <FaCamera fontSize={80} />
            </div>
            <h4 className="text-xl font-semibold uppercase text-blue-950 dark:text-red-500">
              Take great photos
            </h4>
            <p>
              It may sound obvious - but taking good-quality photos can have a
              huge impact on the time it takes to sell your car. Buyers expect
              to see 20 images on an advert
            </p>
          </div>
          <div className="space-y-4 border border-gray-200 px-3 py-8 text-center shadow-md">
            <div className="flex items-center justify-center">
              <BiSolidDetail fontSize={80} />
            </div>
            <h4 className="text-xl font-semibold uppercase text-blue-950 dark:text-red-500">
              Keep it snappy
            </h4>
            <p>
              Keep your vehicle description short and simple. Call out optional
              extras that other similar cars may not have. And dont forget to
              mention full-service history if you have it.
            </p>
          </div>
          <div className="space-y-4 border border-gray-200 px-3 py-8 text-center shadow-md">
            <div className="flex items-center justify-center">
              <MdOutlineVerifiedUser fontSize={80} />
            </div>
            <h4 className="text-xl font-semibold uppercase text-blue-950 dark:text-red-500">
              Be honest
            </h4>
            <p>
              Its important that your vehicle description is accurate. If your
              car has a small scratch on it - be honest about it. Itll save time
              with needless viewings if buyers are aware of any faults from the
              get-go.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-4 py-10 sm:mx-16 sm:py-20">
        <h3 className="text-center text-3xl font-bold text-blue-950 dark:text-red-500">
          Guides to selling your car
        </h3>
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
          <div className="space-y-2 border border-gray-200 px-3 py-8 text-center shadow-md">
            <div className="flex items-center justify-center">
              <MdLocalCarWash fontSize={80} />
            </div>
            <h4 className="text-xl font-semibold uppercase text-blue-950 dark:text-red-500">
              Preparing your car
            </h4>
            <p>
              From keeping it clean to sorting repairs, here is how to get your
              car ready for sale.
            </p>
          </div>
          <div className="space-y-2 border border-gray-200 px-3 py-8 text-center shadow-md">
            <div className="flex items-center justify-center">
              <FcAdvertising fontSize={80} />
            </div>
            <h4 className="text-xl font-semibold uppercase text-blue-950 dark:text-red-500">
              Creating your advert
            </h4>
            <p>
              Good-quality adverts lead to a fast sale. Read our tips to create
              an effective advert.
            </p>
          </div>
          <div className="space-y-2 border border-gray-200 px-3 py-8 text-center shadow-md">
            <div className="flex items-center justify-center">
              <MdOutlinePayments fontSize={80} />
            </div>
            <h4 className="text-xl font-semibold uppercase text-blue-950 dark:text-red-500">
              Taking Payment
            </h4>
            <p>
              Cash, bank transfer, cheque? Learn the best way to accept payment
              and keep yourself secure.
            </p>
          </div>
          <div className="space-y-2 border border-gray-200 px-3 py-8 text-center shadow-md">
            <div className="flex items-center justify-center">
              <GoAlertFill fontSize={80} />
            </div>
            <h4 className="text-xl font-semibold uppercase text-blue-950 dark:text-red-500">
              Avoiding scams
            </h4>
            <p>
              Learn how to stay safe online and protect yourself from fraud.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-3xl px-4 py-10">
          <h3 className="text-center text-3xl font-bold text-blue-950 dark:text-red-500">
            Frequently Asked Questions
          </h3>
          <div className="mt-5 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-lg border shadow-sm">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left focus:outline-none"
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`size-5 transition-transform ${
                      activeIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {activeIndex === index && (
                  <div className="px-4 py-2 text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <ChooseUs />
    </>
  );
}
