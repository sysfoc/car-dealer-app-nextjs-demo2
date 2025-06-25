import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { IoSpeedometer } from "react-icons/io5";
import { GiGasPump } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";
import { FaHeart, FaEye, FaCalendarAlt } from "react-icons/fa";
import { BiTachometer } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslations } from "next-intl";
import { useCurrency } from "../context/CurrencyContext";
import { FaRegHeart } from "react-icons/fa6";

const VehicalsList = ({ loadingState }) => {
  const t = useTranslations("HomePage");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currency, selectedCurrency } = useCurrency();
  const [userLikedCars, setUserLikedCars] = useState([]); // Initialize as empty array
  const [user, setUser] = useState(null);

  const fetchVehicles = async () => {
    try {
      const response = await fetch("/api/cars");
      if (!response.ok) throw new Error("Failed to fetch vehicles");
      const data = await response.json();
      console.log("API response:", data);
      console.log("All cars:", data.cars);
      const filteredCars = data.cars.filter(
        (car) => car.status === 1 || car.status === "1",
      );
      console.log("Filtered cars (status=1):", filteredCars);
      setVehicles(filteredCars);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/users/me");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setUserLikedCars(
          Array.isArray(data.user?.likedCars) ? data.user.likedCars : [],
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Keep userLikedCars as empty array on error
    }
  };

  const handleLikeToggle = async (carId) => {
    try {
      const response = await fetch("/api/users/liked-cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ carId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response:", data);
        setUserLikedCars(Array.isArray(data.likedCars) ? data.likedCars : []);

        setUser((prev) => ({
          ...prev,
          likedCars: data.likedCars,
        }));
      } else {
        console.error("Failed to update liked cars");
      }
    } catch (error) {
      console.error("Error updating liked cars:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
    fetchUserData();
  }, []);

  if (error) {
    return (
      <div className="mx-4 my-10 sm:mx-8 md:my-20">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
          <div className="flex items-center space-x-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500">
              <span className="text-sm text-white">!</span>
            </div>
            <span className="font-medium">Error: {error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-4 my-10 sm:mx-8 md:my-16">
      <div className="mb-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <BiTachometer className="h-4 w-4" />
            <span>Premium Collection</span>
          </div>

          <h2 className="mb-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-white dark:via-slate-100 dark:to-slate-300 md:text-5xl lg:text-6xl">
            {t("exploreVehical")}
          </h2>
          <Link href={"/car-for-sale"}>
            <div className="group inline-flex transform items-center gap-3 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-slate-800 hover:to-slate-600 hover:shadow-2xl dark:from-slate-100 dark:to-slate-300 dark:text-slate-900 dark:hover:from-white dark:hover:to-slate-200">
              <span>{t("viewAll")}</span>
              <MdOutlineArrowOutward className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
        {loading
          ? Array(4)
              .fill()
              .map((_, index) => (
                <div
                  className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800"
                  key={index}
                >
                  <div className="relative">
                    <Skeleton className="h-64 w-full" />
                  </div>

                  <div className="space-y-4 p-6">
                    <div className="space-y-3">
                      <Skeleton height={28} />
                      <Skeleton height={16} width="70%" />
                    </div>

                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Skeleton circle width={32} height={32} />
                          <Skeleton height={16} width="60%" />
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-slate-100 pt-4 dark:border-slate-700">
                      <Skeleton height={32} width="50%" />
                      <Skeleton height={40} className="mt-3" />
                    </div>
                  </div>
                </div>
              ))
          : vehicles.slice(0,4).map((vehicle) => (
              <div
                className="group transform overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
                key={vehicle._id}
              >
                <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-900">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={vehicle.imageUrls?.[0]}
                      fill
                      alt={`${vehicle?.makeName} ${vehicle?.modelName}`}
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                    <div className="absolute left-4 top-4">
                      <div className="rounded-full bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white shadow-lg backdrop-blur-sm">
                        <div className="flex items-center gap-1.5">
                          <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>
                          Available
                        </div>
                      </div>
                    </div>

                    <div className="absolute right-4 top-4 flex translate-x-4 transform gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleLikeToggle(vehicle._id);
                        }}
                         aria-label={userLikedCars?.includes(vehicle._id) ? "Unlike Car" : "Like Car"}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-white hover:shadow-xl"
                      >
                        {userLikedCars &&
                        Array.isArray(userLikedCars) &&
                        userLikedCars.includes(vehicle._id) ? (
                          <FaHeart className="h-4 w-4 text-red-500" />
                        ) : (
                          <FaRegHeart className="h-4 w-4 hover:text-red-500" />
                        )}
                      </button>
                    </div>

                    <div className="absolute bottom-4 right-4 rounded-2xl bg-white/95 px-4 py-2 shadow-lg backdrop-blur-md dark:bg-slate-800/95">
                      <div className="text-right">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          From
                        </p>
                        <p className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-lg font-bold text-transparent dark:from-white dark:to-slate-300">
                          {selectedCurrency?.symbol}
                          {Math.round(
                            (vehicle?.price * (selectedCurrency?.value || 1)) /
                              (currency?.value || 1),
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="mb-2 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {vehicle?.makeName} {vehicle?.modelName}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {vehicle?.description?.slice(0, 80)}...
                    </p>
                  </div>

                  <div className="mb-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30">
                        <IoSpeedometer className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-slate-600 dark:text-slate-400">
                        Mileage:
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {vehicle?.kms} KM
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/30">
                        <GiGasPump className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="text-slate-600 dark:text-slate-400">
                        Fuel Type:
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {vehicle?.fuelType}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-900/30">
                        <TbManualGearbox className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="text-slate-600 dark:text-slate-400">
                        Transmission:
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {vehicle?.gearbox}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href="https://car-dealer-app-nextjs-demo2.vercel.app/car-for-sale"
                    className="group/cta block w-full"
                  >
                    <div className="transform rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-3.5 text-center font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-slate-800 hover:to-slate-600 hover:shadow-xl dark:from-slate-100 dark:to-slate-300 dark:text-slate-900 dark:hover:from-white dark:hover:to-slate-200">
                      <div className="flex items-center justify-center gap-2">
                        <span>View Details</span>
                        <MdOutlineArrowOutward className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-1 group-hover/cta:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
      </div>

      {/* Empty State */}
      {vehicles.length === 0 && !loading && (
        <div className="py-20 text-center">
          <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-slate-50 shadow-inner dark:bg-slate-800">
            <svg
              className="h-16 w-16 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
          <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
            No Vehicles Available
          </h3>
          <p className="mx-auto max-w-md text-lg text-slate-600 dark:text-slate-400">
            Our premium collection is currently being updated. Please check back
            soon for the latest additions.
          </p>
        </div>
      )}
    </section>
  );
};

export default VehicalsList;
