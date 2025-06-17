"use client";

import {
  Button,
  Carousel,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Select,
  Textarea,
  TextInput,
  Spinner,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GrSort } from "react-icons/gr";
import { FiGrid, FiList } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { FaLocationCrosshairs, FaCalendarCheck } from "react-icons/fa6";
import { IoSpeedometer } from "react-icons/io5";
import { GiGasPump, GiCarDoor, GiCarSeat } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";
import { IoIosColorPalette } from "react-icons/io";
import { useTranslations } from "next-intl";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useMemo } from "react";
import { useCurrency } from "../context/CurrencyContext.tsx";

const CardetailCard = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const searchParams = useSearchParams();
  const { currency, selectedCurrency } = useCurrency();

  // Get all filters at once
  const filters = useMemo(() => {
    return Object.fromEntries(searchParams.entries());
  }, [searchParams]);

  // Parse array parameters from query string
  const parseArrayParam = (param) => {
    if (!param) return [];
    return Array.isArray(param) ? param : [param];
  };

  const parseNumberParam = (param) => {
    if (!param) return [];
    const parsed = Array.isArray(param) 
      ? param.map(p => parseInt(p, 10)).filter(Number.isInteger)
      : [parseInt(param, 10)].filter(Number.isInteger);
    return parsed;
  };

  // Parsed filter values
  const parsedFilters = useMemo(() => {
    return {
      keyword: filters.keyword || "",
      condition: parseArrayParam(filters.condition),
      location: parseArrayParam(filters.location),
      // price: parseNumberParam(filters.price),
      minPrice: filters.minPrice ? parseInt(filters.minPrice, 10) : null,
    maxPrice: filters.maxPrice ? parseInt(filters.maxPrice, 10) : null,
      minYear: filters.minYear || "",
      maxYear: filters.maxYear || "",
      model: parseArrayParam(filters.model),
      millageFrom: filters.millageFrom || "",
      millageTo: filters.millageTo || "",
      gearBox: parseArrayParam(filters.gearBox),
      bodyType: parseArrayParam(filters.bodyType),
      color: parseArrayParam(filters.color),
      doors: parseNumberParam(filters.doors),
      seats: parseNumberParam(filters.seats),
      fuel: parseArrayParam(filters.fuel),
      engineSizeFrom: filters.engineSizeFrom || "",
      engineSizeTo: filters.engineSizeTo || "",
      enginePowerFrom: filters.enginePowerFrom || "",
      enginePowerTo: filters.enginePowerTo || "",
      battery: filters.battery || "Any",
      charging: filters.charging || "Any",
      fuelConsumption: filters.fuelConsumption || "Any",
      co2Emission: filters.co2Emission || "Any",
      driveType: parseArrayParam(filters.driveType),
    };
  }, [filters]);

  const t = useTranslations("Filters");
  const [isGridView, setIsGridView] = useState(true);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(filters).toString();
    const apiUrl = "/api";
    console.log("API URL:", `${apiUrl}/cars?${query}`);

    setLoading(true);
    fetch(`${apiUrl}/cars?${query}`)
      .then((res) => {
        if (!res.ok) {
          console.error(`API error: ${res.status} ${res.statusText}`);
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("API Data:", data);
        setCars(data.cars || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setCars([]);
        setLoading(false);
      });
  }, [filters]);

  useEffect(() => {
    const filtered = (cars || []).filter((car) => {
      // Match against makeName and modelName instead of directly using make/model fields
      const matchesKeyword = parsedFilters.keyword
        ? (car.makeName?.toLowerCase().includes(parsedFilters.keyword.toLowerCase()) ||
          car.modelName?.toLowerCase().includes(parsedFilters.keyword.toLowerCase()))
        : true;

      const matchesCondition = parsedFilters.condition.length
        ? parsedFilters.condition.includes(car.condition?.toLowerCase())
        : true;

      const matchesLocation = parsedFilters.location.length
        ? parsedFilters.location.some((loc) =>
          car.location?.toLowerCase().includes(loc.toLowerCase()),
        )
        : true;

      // const matchesPrice = parsedFilters.price.length
      //   ? parsedFilters.price.some((singlePrice) => {
      //     const carPrice = car.price ? parseInt(car.price, 10) : null;
      //     return carPrice >= singlePrice;
      //   })
      //   : true;

      const carPrice = car.price ? parseInt(car.price, 10) : null;
  const matchesPrice = 
    (parsedFilters.minPrice === null && parsedFilters.maxPrice === null) || 
    (carPrice !== null &&
      (parsedFilters.minPrice === null || carPrice >= parsedFilters.minPrice) &&
      (parsedFilters.maxPrice === null || carPrice <= parsedFilters.maxPrice));

      // Use modelYear if year is not available
      const carYear = car.year || car.modelYear;
      const matchesYear =
        carYear &&
        (!parsedFilters.minYear || parseInt(carYear, 10) >= parseInt(parsedFilters.minYear, 10)) &&
        (!parsedFilters.maxYear || parseInt(carYear, 10) <= parseInt(parsedFilters.maxYear, 10));

      // Match using modelName or modelId
      const matchesModel = parsedFilters.model.length
        ? parsedFilters.model.some(
          (modelVal) => {
            if (car.modelName) {
              return modelVal.toLowerCase() === car.modelName.toLowerCase();
            }
            if (car.modelId) {
              return modelVal === car.modelId;
            }
            return false;
          }
        )
        : true;

      // Use kms field if mileage is not available
      const carMileageField = car.mileage || car.kms;
      const matchesMileage = carMileageField
        ? (() => {
          const carMileage = parseInt(String(carMileageField).replace(/[^\d]/g, ""), 10) || 0;
          const from = parsedFilters.millageFrom ? parseInt(parsedFilters.millageFrom, 10) : null;
          const to = parsedFilters.millageTo ? parseInt(parsedFilters.millageTo, 10) : null;
          return (!from || carMileage >= from) && (!to || carMileage <= to);
        })()
        : true;

      const matchesGearBox = parsedFilters.gearBox.length
        ? parsedFilters.gearBox.includes(car.gearbox?.toLowerCase())
        : true;

      const matchesbodyType = parsedFilters.bodyType.length
        ? parsedFilters.bodyType.includes(car.bodyType?.toLowerCase())
        : true;

      const matchesColor = parsedFilters.color.length
        ? parsedFilters.color.includes(car.color?.toLowerCase())
        : true;

      // Convert to number if string
      const carDoors = typeof car.doors === 'string' && car.doors !== 'Select' ?
        parseInt(car.doors, 10) : car.doors;

      const matchesDoors = parsedFilters.doors.length
        ? parsedFilters.doors.includes(carDoors)
        : true;

      // Convert to number if string  
      const carSeats = typeof car.seats === 'string' && car.seats !== 'Select' ?
        parseInt(car.seats, 10) : car.seats;

      const matchesSeats = parsedFilters.seats.length
        ? parsedFilters.seats.includes(carSeats)
        : true;

      const matchesFuelType = parsedFilters.fuel.length
        ? parsedFilters.fuel.includes(car.fuelType?.toLowerCase())
        : true;

      const matchesDriveType = parsedFilters.driveType.length
        ? parsedFilters.driveType.includes(car.driveType?.toLowerCase())
        : true;

      const matchesBatteryrange = car.batteryRange
        ? (() => {
          const batteryRange = parsedFilters.battery !== "Any" ? parseInt(parsedFilters.battery, 10) : null;
          const carBatteryRange = car.batteryRange
            ? parseInt(car.batteryRange, 10)
            : null;
          return batteryRange ? carBatteryRange >= batteryRange : true;
        })()
        : true;

      const matchesChargingTime = car.chargingTime
        ? (() => {
          const chargingTime = parsedFilters.charging !== "Any" ? parseInt(parsedFilters.charging, 10) : null;
          const carChargingTime = car.chargingTime
            ? parseInt(car.chargingTime, 10)
            : null;
          return chargingTime ? carChargingTime >= chargingTime : true;
        })()
        : true;

      const matchesEngineSize =
        (!parsedFilters.engineSizeFrom ||
          parseInt(String(car.engineSize), 10) >= parseInt(parsedFilters.engineSizeFrom, 10)) &&
        (!parsedFilters.engineSizeTo ||
          parseInt(String(car.engineSize), 10) <= parseInt(parsedFilters.engineSizeTo, 10));

      const matchesEnginePower =
        (!parsedFilters.enginePowerFrom ||
          parseInt(String(car.enginePower), 10) >= parseInt(parsedFilters.enginePowerFrom, 10)) &&
        (!parsedFilters.enginePowerTo ||
          parseInt(String(car.enginePower), 10) <= parseInt(parsedFilters.enginePowerTo, 10));

      const matchesFuelConsumption = car.fuelConsumption
        ? (() => {
          const selectedFuelConsumption = parsedFilters.fuelConsumption !== "Any"
            ? parseInt(parsedFilters.fuelConsumption, 10)
            : null;
          const carFuelConsumption = car.fuelConsumption
            ? parseInt(car.fuelConsumption, 10)
            : null;
          return selectedFuelConsumption
            ? carFuelConsumption === selectedFuelConsumption
            : true;
        })()
        : true;

      const matchesCo2Emission = car.co2Emission
        ? (() => {
          const selectedCo2Emission = parsedFilters.co2Emission !== "Any"
            ? parseInt(parsedFilters.co2Emission, 10)
            : null;
          const carCo2Emission = car.co2Emission
            ? parseInt(car.co2Emission, 10)
            : null;
          return selectedCo2Emission
            ? carCo2Emission === selectedCo2Emission
            : true;
        })()
        : true;

      return (
        matchesKeyword && matchesCondition && matchesLocation && matchesPrice && matchesYear &&
        matchesModel && matchesMileage && matchesGearBox && matchesbodyType && matchesColor && matchesDoors &&
        matchesSeats && matchesFuelType && matchesBatteryrange && matchesChargingTime && matchesEngineSize &&
        matchesEnginePower && matchesFuelConsumption && matchesCo2Emission && matchesDriveType
      );
    });

    console.log("Filtered Cars:", filtered);
    setFilteredCars(filtered);
  }, [cars, parsedFilters]);

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-2xl px-8 py-6 shadow-2xl border border-slate-200 dark:border-gray-700">
          <Spinner aria-label="Loading vehicles" size="lg" className="text-white" />
          <div>
            <span className="text-gray-800 dark:text-gray-200 font-semibold text-lg">Loading vehicles...</span>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Please wait while we fetch the latest listings</p>
          </div>
        </div>
      </div>
    );
  }

  // No Results State
  if (!filteredCars.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-gray-700 max-w-md">
          <div className="w-20 h-20 bg-slate-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-slate-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.664-2.647l.835-1.252A6 6 0 0112 13a6 6 0 014.829-1.899l.835 1.252zm.835-1.252A7.962 7.962 0 0112 9c-2.34 0-4.29 1.009-5.664 2.647L5.5 10.395A9.969 9.969 0 0112 7c2.477 0 4.73.901 6.5 2.395l-.835 1.252z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">No vehicles found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            We could not find any vehicles matching your current filters. Try adjusting your search criteria or clearing some filters.
          </p>
        </div>
      </div>
    );
  }
return (
  <>
    {/* Results Header */}
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-slate-200 dark:border-gray-600">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              <span className="text-blue-600 dark:text-blue-400">{filteredCars.length}</span>
              <span className="text-gray-500 dark:text-gray-400 mx-2">of</span>
              <span className="text-gray-800 dark:text-gray-200">{cars.length}</span>
              <span className="text-gray-500 dark:text-gray-400 ml-2">vehicles found</span>
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Select 
            icon={GrSort} 
            className="min-w-[180px] bg-white dark:bg-gray-700 border-slate-300 dark:border-gray-600 rounded-xl text-sm font-medium shadow-sm"
          >
            <option value="recent">{t("updatedDateRecent")}</option>
            <option value="oldest">{t("updatedDateOldest")}</option>
            <option value="price-lh">{t("priceLowToHigh")}</option>
            <option value="price-hl">{t("priceHighToLow")}</option>
            <option value="model-latest">{t("modelLatest")}</option>
            <option value="model-oldest">{t("modelOldest")}</option>
            <option value="mileage-lh">{t("mileageLowToHigh")}</option>
            <option value="mileage-hl">{t("mileageHighToLow")}</option>
          </Select>
          
          <div className="flex bg-white dark:bg-gray-700 rounded-xl p-1 border border-slate-300 dark:border-gray-600 shadow-sm">
            <button
              onClick={() => setIsGridView(false)}
              className={`p-2.5 rounded-lg transition-all duration-200 ${
                !isGridView 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <FiList size={18} />
            </button>
            <button
              onClick={() => setIsGridView(true)}
              className={`p-2.5 rounded-lg transition-all duration-200 ${
                isGridView 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <FiGrid size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Car Cards Container */}
    {/* <div className={`gap-6 ${
      isGridView 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
        : "space-y-6"
    }`}> */}
    <div className={`gap-6 ${
  isGridView 
    ? "grid grid-cols-1 sm:grid-cols-2" 
    : "space-y-6"
}`}>
      {filteredCars.map((car, index) => (
        <div
          key={car._id}
          className={`group bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${
            isGridView 
              ? "flex flex-col h-full" 
              : "flex flex-col sm:flex-row max-w-5xl mx-auto"
          }`}
        >
          {/* Image Section */}
          <div className={`relative flex-shrink-0 ${
            isGridView 
              ? "h-48 sm:h-52 w-full" 
              : "h-64 sm:h-64 sm:w-80 md:w-96"
          }`}>
            <Carousel slideInterval={3000} className="h-full w-full rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none overflow-hidden">
              {Array.isArray(car.imageUrls) && car.imageUrls.length > 0 ? (
                car.imageUrls.map((image, i) => (
                  <div key={i} className="relative h-full w-full">
                    <Image
                      src={image.src || image}
                      alt={image.alt || `${car.makeName} ${car.modelName} Image ${i + 1}`}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                ))
              ) : (
                <div className="flex h-full items-center justify-center bg-slate-100 dark:bg-gray-700">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-slate-200 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-gray-400">No images available</span>
                  </div>
                </div>
              )}
            </Carousel>

            {/* Overlay Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold uppercase rounded-full shadow-lg backdrop-blur-sm">
                {car.condition && car.condition !== "Select" ? car.condition : car.type || "Used"}
              </span>
              {car.isFinance && car.isFinance !== "km" && (
                <span className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold uppercase rounded-full shadow-lg backdrop-blur-sm">
                  {car.isFinance}
                </span>
              )}
            </div>

            {/* Wishlist & Image Counter */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              {Array.isArray(car.imageUrls) && car.imageUrls.length > 1 && (
                <div className="px-2.5 py-1 bg-black/70 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                  1/{car.imageUrls.length}
                </div>
              )}
              <button className="w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                <CiHeart size={22} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className={`flex-1 flex flex-col ${
            isGridView ? "p-4" : "p-5 sm:p-6"
          }`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 pr-4">
                <Link href={`car-detail/${car.slug}`} className="group/link">
                  <h3 className={`font-bold text-gray-900 dark:text-white group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400 transition-colors line-clamp-2 ${
                    isGridView ? "text-lg leading-tight" : "text-xl sm:text-2xl"
                  }`}>
                    {loading ? (
                      <Skeleton height={28} />
                    ) : (
                      `${car.makeName || "Unknown"} ${car.modelName || "Unknown"}`
                    )}
                  </h3>
                </Link>
                
                {(car.year || car.modelYear) && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-1 bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-300 text-xs font-semibold rounded-lg">
                      {car.year || car.modelYear} Model
                    </span>
                  </div>
                )}
              </div>
              
              <div className="text-right">
                <div className={`font-bold text-blue-600 dark:text-blue-400 ${
                  isGridView ? "text-xl" : "text-2xl sm:text-3xl"
                }`}>
                  {loading ? (
                    <Skeleton height={32} width={120} />
                  ) : (
                    `${selectedCurrency?.symbol}${Math.round(car.price) || 0}`
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">Starting price</p>
              </div>
            </div>

            {/* Key Specifications */}
            <div className="flex-1 mb-4">
              <div className={`grid gap-3 ${
                isGridView 
                  ? "grid-cols-1 sm:grid-cols-2" 
                  : "grid-cols-2 sm:grid-cols-3"
              }`}>
                <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaLocationCrosshairs className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide leading-tight">Location</p>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white leading-tight break-words">
                      {car.location || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IoSpeedometer className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide leading-tight">Mileage</p>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white leading-tight break-words">
                      {car.kms || car.mileage || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GiGasPump className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide leading-tight">Fuel</p>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white leading-tight break-words">
                      {car.fuelType || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TbManualGearbox className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide leading-tight">Gearbox</p>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white leading-tight break-words">
                      {car.gearbox || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="w-8 h-8 bg-rose-100 dark:bg-rose-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IoIosColorPalette className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide leading-tight">Color</p>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white leading-tight break-words">
                      {car.color || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GiCarSeat className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wide leading-tight">Seats</p>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white leading-tight break-words">
                      {car.seats && car.seats !== "Select" ? car.seats : "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-auto">
              <button
                onClick={() => setOpenModal(true)}
                className={`flex-1 border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-white transition-all duration-200 text-center ${
                  isGridView ? "px-4 py-2.5 text-sm" : "px-6 py-3"
                }`}
              >
                {t("enquireNow")}
              </button>
              <Link href={`car-detail/${car.slug}`} className="flex-1">
                <button className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 ${
                  isGridView ? "px-4 py-2.5 text-sm" : "px-6 py-3"
                }`}>
                  {t("viewDetails")}
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Enquiry Modal */}
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} className="backdrop-blur-sm">
      <ModalHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Get in Touch</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">We will get back to you within 24 hours</p>
      </ModalHeader>
      
      <ModalBody className="p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fname" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                First Name *
              </Label>
              <TextInput
                type="text"
                id="fname"
                placeholder="Enter your first name"
                className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-2"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lname" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Last Name *
              </Label>
              <TextInput 
                type="text" 
                id="lname" 
                placeholder="Enter your last name" 
                className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-2"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email Address *
              </Label>
              <TextInput
                type="email"
                id="email"
                placeholder="your.email@example.com"
                className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-2"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Phone Number *
              </Label>
              <TextInput
                type="tel"
                id="phone"
                placeholder="+92 300 1234567"
                className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-2"
                required
              />
            </div>
            
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="comment" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Your Message
              </Label>
              <Textarea 
                rows={4} 
                placeholder="Tell us about your requirements, budget, or any specific questions..."
                className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-2 resize-none"
              />
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Send Enquiry
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  </>
);
}
export default CardetailCard;