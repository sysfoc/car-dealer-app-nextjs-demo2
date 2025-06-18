import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";

export default function Home() {
  const brandLists = [
    {
      name: "BMW",
      image: "/bmw.avif",
      alt: "bmw cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
    },
    {
      name: "Bentley",
      image: "/bentley.avif",
      alt: "bentley cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
    },
    {
      name: "Honda",
      image: "/honda.avif",
      alt: "honda cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
    },
    {
      name: "Hyundai",
      image: "/hyundai.avif",
      alt: "hyundai cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
    },
    {
      name: "Kia",
      image: "/kia.avif",
      alt: "Kia cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
    },
    {
      name: "BMW",
      image: "/bmw.avif",
      alt: "bmw cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
    },
    {
      name: "Bentley",
      image: "/bentley.avif",
      alt: "bentley cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
    },
    {
      name: "Honda",
      image: "/honda.avif",
      alt: "honda cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
    },
    {
      name: "Hyundai",
      image: "/hyundai.avif",
      alt: "hyundai cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
    },
    {
      name: "Kia",
      image: "/kia.avif",
      alt: "Kia cars",
      url: "https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale",
    },
  ];
  return (
    <section className="bg-[#F9FBFC] px-4 py-10 dark:bg-gray-800 sm:px-8 md:py-20">
      <h2 className="text-center text-2xl font-semibold md:text-3xl">
        Our Premium Brands
      </h2>
      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {brandLists.map((brand, index) => (
          <div
            className="rounded-xl border border-gray-100 bg-white p-5 transition-all delay-75 hover:border-blue-600 dark:bg-gray-700"
            key={index}
          >
            <Link href={`${brand.url}`}>
              <div>
                <div>
                  <Image
                    src={`${brand.image}`}
                    alt={`${brand.alt}`}
                    width={200}
                    height={200}
                    className="size-full"
                    style={{ objectPosition: "center" }}
                  />
                </div>
                <div className="mt-3">
                  <p className="text-center text-lg">{brand.name}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
