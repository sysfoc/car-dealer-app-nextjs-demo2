import Image from "next/image";
import React, { useState } from "react";
import { IoSpeedometer } from "react-icons/io5";
import { TbManualGearbox } from "react-icons/tb";
import {
  GiCarSeat,
  GiPathDistance,
  GiCarDoor,
  GiGasPump,
} from "react-icons/gi";
import { GrSort } from "react-icons/gr";
import { FiGrid, FiList } from "react-icons/fi";
import { Button, Select } from "flowbite-react";
import { useTranslations } from "next-intl";

const LeasingCarsDetail = () => {
  const t = useTranslations("Filters");
  const [isGridView, setIsGridView] = useState(true);
  return (
    <>
      <div className="mb-2 flex items-center justify-between rounded-md border border-gray-200 px-3 py-2 dark:border-gray-700">
        <div>
          <span className="text-sm">
            <strong>4</strong> {t("outOf")} <strong>500</strong> {t("results")}
          </span>
        </div>
        <div className="flex items-center gap-x-3">
          <Select icon={GrSort}>
            <option value="recent">{t("updatedDateRecent")}</option>
            <option value="oldest">{t("updatedDateOldest")}</option>
            <option value="price-lh">{t("priceLowToHigh")}</option>
            <option value="price-hl">{t("priceHighToLow")}</option>
            <option value="model-latest">{t("modelLatest")}</option>
            <option value="model-oldest">{t("modelOldest")}</option>
            <option value="mileage-lh">{t("mileageLowToHigh")}</option>
            <option value="mileage-hl">{t("mileageHighToLow")}</option>
          </Select>
          <Button color={"light"} onClick={() => setIsGridView(!isGridView)}>
            {isGridView ? <FiList fontSize={20} /> : <FiGrid fontSize={20} />}
          </Button>
        </div>
      </div>
      <div
        className={`${
          isGridView
            ? "grid grid-cols-1 gap-5 md:grid-cols-2"
            : "grid grid-cols-1 space-y-5"
        }`}
      >
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`border border-gray-200 shadow-md ${
              isGridView ? "" : "flex flex-col gap-x-3 md:flex-row"
            }`}
          >
            <div className={`${isGridView ? "" : "w-full md:w-2/4"}`}>
              <Image
                src={"/Luxury SUV.webp"}
                alt="car-image"
                width={300}
                height={200}
                style={{ objectPosition: "center" }}
                className="size-full"
              />
            </div>
            <div
              className={`${isGridView ? "p-4" : "w-full p-4 md:w-2/4 md:p-2"}`}
            >
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <p>From</p>
                  <h3 className="text-2xl font-bold text-blue-950 dark:text-red-500">
                    $300{" "}
                    <small className="text-sm font-normal text-black dark:text-gray-300">
                      Per month inc. VAT
                    </small>
                  </h3>
                </div>
              </div>
              <div
                className="mt-2 border-gray-300"
                style={{ borderWidth: "1px" }}
              ></div>
              <div className="my-1">
                <h2 className="text-xl font-semibold text-blue-950 dark:text-red-500">
                  Toyota Corolla
                </h2>
                <p className="mt-1">72.6kWh SE Long Range Auto 5dr</p>
              </div>
              <div
                className="mt-2 border-gray-300"
                style={{ borderWidth: "1px" }}
              ></div>
              <div className="my-3 grid grid-cols-3 gap-x-8 gap-y-4">
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <IoSpeedometer fontSize={25} />
                  </div>
                  <p className="mt-2 text-sm">200 Miles</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <GiGasPump fontSize={25} />
                  </div>
                  <p className="mt-2 text-sm">Petroll</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <TbManualGearbox fontSize={25} />
                  </div>
                  <p className="mt-2 text-sm">Manual</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <GiCarSeat fontSize={25} />
                  </div>
                  <p className="mt-2 text-sm">5 Seats</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <GiCarDoor fontSize={25} />
                  </div>
                  <p className="mt-2 text-sm">4 Doors</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <GiPathDistance fontSize={25} />
                  </div>
                  <p className="mt-2 text-sm">200 Miles</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LeasingCarsDetail;
