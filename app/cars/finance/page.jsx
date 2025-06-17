"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

export default function Home() {
  const t = useTranslations("carFinance");
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
        "You could sell it directly to a dealership or auction house, or you can sell it online. If you’ve got the time to wait for the right buyer, selling your car privately on a site like Auto Trader can earn you more money.",
    },
    {
      question: "What is my car worth?",
      answer:
        "Auto Trader’s free car valuation tool gives you the right guide price. We combine data from thousands of live adverts and dealer websites, plus values from car auctions, and ex-fleet and leasing vehicles. As our guide price represents the entire market and our data is updated daily, your quote is fair, priced to sell, and accurate.",
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
                <small className="text-xl uppercase">{t("financeTitle")}</small>
                <h1 className="text-4xl font-semibold text-blue-950 dark:text-red-500">
                  {t("financeHeading")}
                </h1>
                <p>{t("financeDescription")}</p>
              </div>
              <div className="mt-5 space-y-2">
                <div className="flex items-center gap-x-2">
                  <FaCheck fontSize={22} />
                  <div>
                    <p>{t("interestRates")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <FaCheck fontSize={22} />
                  <div>
                    <p>{t("comparisonRates")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <FaCheck fontSize={22} />
                  <div>
                    <p>{t("support")}</p>
                  </div>
                </div>
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
      <section className="mx-4 py-10 sm:mx-12 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2">
          <div className="flex w-full items-center justify-center">
            <Image src={"/sydney.jpg"} alt="VAN" width={500} height={500} />
          </div>
          <div>
            <h3 className="text-4xl text-blue-950 dark:text-red-500">
              {t("cartypeHeading")}
            </h3>
            <ul className="mt-5 space-y-5">
              <li className="flex items-center gap-3">
                <div className="rounded-full bg-blue-950 p-3 dark:bg-red-500">
                  <FaCheck fontSize={22} color="white" />
                </div>
                <p>{t("cartypePoint1")}</p>
              </li>
              <li className="flex items-center gap-3">
                <div className="rounded-full bg-blue-950 p-3 dark:bg-red-500">
                  <FaCheck fontSize={22} color="white" />
                </div>
                <p>{t("cartypePoint2")}</p>
              </li>
              <li className="flex items-center gap-3">
                <div className="rounded-full bg-blue-950 p-3 dark:bg-red-500">
                  <FaCheck fontSize={22} color="white" />
                </div>
                <p>{t("cartypePoint3")}</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="mx-4 py-10 sm:mx-12 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2">
          <div className="order-2 flex w-full items-center justify-center">
            <Image src={"/sydney.jpg"} alt="VAN" width={500} height={500} />
          </div>
          <div>
            <h3 className="text-4xl text-blue-950 dark:text-red-500">
              {t("financeLoanHeading")}
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-5">
              <li className="flex items-center gap-3">
                <div className="rounded-full bg-blue-950 p-3 dark:bg-red-500">
                  <FaCheck fontSize={22} color="white" />
                </div>
                <p>{t("financeLoanPoint1")}</p>
              </li>
              <li className="flex items-center gap-3">
                <div className="rounded-full bg-blue-950 p-3 dark:bg-red-500">
                  <FaCheck fontSize={22} color="white" />
                </div>
                <p>{t("financeLoanPoint2")}</p>
              </li>
              <li className="flex items-center gap-3">
                <div className="rounded-full bg-blue-950 p-3 dark:bg-red-500">
                  <FaCheck fontSize={22} color="white" />
                </div>
                <p>{t("financeLoanPoint3")}</p>
              </li>
              <li className="flex items-center gap-3">
                <div className="rounded-full bg-blue-950 p-3 dark:bg-red-500">
                  <FaCheck fontSize={22} color="white" />
                </div>
                <p>${t("financeLoanPoint4")}</p>
              </li>
              <li className="flex items-center gap-3">
                <div className="rounded-full bg-blue-950 p-3 dark:bg-red-500">
                  <FaCheck fontSize={22} color="white" />
                </div>
                <p>${t("financeLoanPoint5")}</p>
              </li>
              <li className="flex items-center gap-3">
                <div className="rounded-full bg-blue-950 p-3 dark:bg-red-500">
                  <FaCheck fontSize={22} color="white" />
                </div>
                <p>{t("financeLoanPoint6")}</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="mx-4 py-10 sm:mx-12 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2">
          <div className="flex w-full items-center justify-center">
            <Image src={"/sydney.jpg"} alt="VAN" width={500} height={500} />
          </div>
          <div>
            <h3 className="text-4xl text-blue-950 dark:text-red-500">
              {t("loanTypeHeading")}
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-5">
              <li className="flex items-center gap-3">
                <div className="rounded-full bg-blue-950 p-3 dark:bg-red-500">
                  <FaCheck fontSize={22} color="white" />
                </div>
                <p>{t("loanTypePoint1")}</p>
              </li>
              <li className="flex items-center gap-3">
                <div className="rounded-full bg-blue-950 p-3 dark:bg-red-500">
                  <FaCheck fontSize={22} color="white" />
                </div>
                <p>{t("loanTypePoint2")}</p>
              </li>
              <li className="flex items-center gap-3">
                <div className="rounded-full bg-blue-950 p-3 dark:bg-red-500">
                  <FaCheck fontSize={22} color="white" />
                </div>
                <p>{t("loanTypePoint3")}</p>
              </li>
              <li className="flex items-center gap-3">
                <div className="rounded-full bg-blue-950 p-3 dark:bg-red-500">
                  <FaCheck fontSize={22} color="white" />
                </div>
                <p>{t("loanTypePoint4")} </p>
              </li>
              <li className="flex items-center gap-3">
                <div className="rounded-full bg-blue-950 p-3 dark:bg-red-500">
                  <FaCheck fontSize={22} color="white" />
                </div>
                <p>{t("loanTypePoint5")}</p>
              </li>
              <li className="flex items-center gap-3">
                <div className="rounded-full bg-blue-950 p-3 dark:bg-red-500">
                  <FaCheck fontSize={22} color="white" />
                </div>
                <p>{t("loanTypePoint6")}</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="mx-4 py-10 sm:mx-12 sm:py-20">
        <h3 className="text-center text-3xl font-semibold text-blue-950 dark:text-red-500">
          Learn more about car loans
        </h3>
        <p className="mt-3 text-center">
          When it comes to finding the best car loan, it’s not one size fits
          all. View our comprehensive guides to learn more.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="overflow-hidden rounded-lg border border-gray-500 shadow-md">
            <div className="w-full">
              <Image
                src={"/Luxury SUV.webp"}
                alt="VAN"
                width={500}
                height={500}
              />
            </div>
            <div className="space-y-2 p-4">
              <h4 className="text-lg font-semibold text-blue-950 dark:text-red-500">
                Can I get a car loan with bad credit?
              </h4>
              <p>
                Your credit score isn’t the only factor that lenders consider
                when deciding whether to approve you for a car loan.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-500 shadow-md">
            <div className="w-full">
              <Image
                src={"/Luxury SUV.webp"}
                alt="VAN"
                width={500}
                height={500}
              />
            </div>
            <div className="space-y-2 p-4">
              <h4 className="text-lg font-semibold text-blue-950 dark:text-red-500">
                Can I get a car loan with bad credit?
              </h4>
              <p>
                Your credit score isn’t the only factor that lenders consider
                when deciding whether to approve you for a car loan.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-500 shadow-md">
            <div className="w-full">
              <Image
                src={"/Luxury SUV.webp"}
                alt="VAN"
                width={500}
                height={500}
              />
            </div>
            <div className="space-y-2 p-4">
              <h4 className="text-lg font-semibold text-blue-950 dark:text-red-500">
                Can I get a car loan with bad credit?
              </h4>
              <p>
                Your credit score isn’t the only factor that lenders consider
                when deciding whether to approve you for a car loan.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-500 shadow-md">
            <div className="w-full">
              <Image
                src={"/Luxury SUV.webp"}
                alt="VAN"
                width={500}
                height={500}
              />
            </div>
            <div className="space-y-2 p-4">
              <h4 className="text-lg font-semibold text-blue-950 dark:text-red-500">
                Can I get a car loan with bad credit?
              </h4>
              <p>
                Your credit score isn’t the only factor that lenders consider
                when deciding whether to approve you for a car loan.
              </p>
            </div>
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
    </>
  );
}
