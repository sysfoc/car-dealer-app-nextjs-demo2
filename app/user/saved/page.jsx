"use client";
import {
  Alert,
  Button,
  Carousel,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Textarea,
  TextInput,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { IoSpeedometer } from "react-icons/io5";
import { GiGasPump } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";
import { GiCarDoor } from "react-icons/gi";
import { GiCarSeat } from "react-icons/gi";
import { FaCalendarCheck } from "react-icons/fa6";
import { IoIosColorPalette } from "react-icons/io";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [favorites, setFavorites] = useState(Array(4).fill(false));

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleFavoriteToggle = (index) => {
    setFavorites((prev) => prev.map((fav, i) => (i === index ? !fav : fav)));
  };

  const vehicalImages = [
    {
      name: "/Luxury SUV.webp",
      alt: "luxury Car",
    },
    {
      name: "/Luxury SUV.webp",
      alt: "luxury Car",
    },
    {
      name: "/Luxury SUV.webp",
      alt: "luxury Car",
    },
    {
      name: "/Luxury SUV.webp",
      alt: "luxury Car",
    },
    {
      name: "/Luxury SUV.webp",
      alt: "luxury Car",
    },
  ];

  return (
    <section className="mx-4 py-10 sm:mx-12">
      {showAlert && (
        <Alert color={"success"} className="fixed right-5 top-5 z-10 w-fit">
          Ad removed from the Favourites, Successfully!!
        </Alert>
      )}
      <h2 className="mt-5 text-center text-3xl font-semibold">
        Saved Advertisements
      </h2>
      <div className="mt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="relative rounded-lg shadow-lg dark:bg-gray-700"
            >
              <div className="mt-3 h-48 sm:h-64">
                <Carousel slideInterval={3000}>
                  {vehicalImages.map((image, i) => {
                    return loading ? (
                      <Skeleton key={i} width={500} height={300} />
                    ) : (
                      <Image
                        key={i}
                        src={image.name}
                        alt={image.alt}
                        width={300}
                        height={200}
                      />
                    );
                  })}
                </Carousel>
              </div>
              <div className="absolute left-2 top-2 flex items-center gap-x-2">
                <span className="rounded bg-blue-950 px-3 py-1 text-xs uppercase text-white dark:bg-red-500">
                  New
                </span>
                <span className="rounded bg-blue-950 px-3 py-1 text-xs uppercase text-white dark:bg-red-500">
                  Finance Available
                </span>
              </div>
              <div className="p-4">
                <div>
                  <Link
                    href="/car-detail/1"
                    className="hover:text-blue-950 hover:underline dark:hover:text-red-500"
                  >
                    <h3 className="font-bold uppercase">
                      {loading ? (
                        <Skeleton height={25} />
                      ) : (
                        "1996 Mercury Cougar XR7"
                      )}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <h4 className="text-2xl font-bold text-blue-950 dark:text-red-500">
                      {loading ? (
                        <Skeleton height={25} width={100} />
                      ) : (
                        "$3,500"
                      )}
                    </h4>
                    <div>
                    <Button
                        color={"white"}
                        onClick={() => handleFavoriteToggle(index)}
                      >
                        {favorites[index] ? (
                          <CiHeart fontSize={22} color="gray" />
                        ) : (
                          <FaHeart
                            fontSize={22}
                            color="red"
                            onClick={handleShowAlert}
                          />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div
                    className="mt-2 border-gray-300"
                    style={{ borderWidth: "1px" }}
                  ></div>
                  <div className="my-3 grid grid-cols-3 gap-x-3 gap-y-4 sm:grid-cols-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <FaLocationCrosshairs fontSize={22} />
                      </div>
                      <p className="mt-2 text-sm">Multan</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <FaCalendarCheck fontSize={22} />
                      </div>
                      <p className="mt-2 text-sm">2009</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <IoSpeedometer fontSize={22} />
                      </div>
                      <p className="mt-2 text-sm">200 Miles</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <GiGasPump fontSize={22} />
                      </div>
                      <p className="mt-2 text-sm">Petrol</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <TbManualGearbox fontSize={22} />
                      </div>
                      <p className="mt-2 text-sm">Manual</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <IoIosColorPalette fontSize={22} />
                      </div>
                      <p className="mt-2 text-sm">Blue</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <GiCarSeat fontSize={22} />
                      </div>
                      <p className="mt-2 text-sm">5 Seats</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <GiCarDoor fontSize={22} />
                      </div>
                      <p className="mt-2 text-sm">4 Doors</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-x-3">
                  <Button
                    color={"white"}
                    className="border border-blue-950 text-sm uppercase hover:bg-blue-950 hover:text-white dark:border-red-500 dark:hover:bg-red-500"
                    onClick={() => setOpenModal(true)}
                  >
                    Enquire Now
                  </Button>
                  <Link href={"#"} className="flex flex-col">
                    <Button
                      color={"white"}
                      className="bg-blue-950 text-sm uppercase text-white dark:bg-red-500"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <Modal
            dismissible
            show={openModal}
            onClose={() => setOpenModal(false)}
          >
            <ModalHeader>Enquire Now</ModalHeader>
            <ModalBody>
              <div>
                <form>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-y-1">
                      <Label htmlFor="fname">First Name</Label>
                      <TextInput
                        type="text"
                        id="fname"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <Label htmlFor="lname">Last Name</Label>
                      <TextInput
                        type="text"
                        id="lname"
                        placeholder="Last Name"
                      />
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <Label htmlFor="email">Email</Label>
                      <TextInput
                        type="email"
                        id="email"
                        placeholder="Active Email Address"
                      />
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <Label htmlFor="phone">Phone</Label>
                      <TextInput
                        type="tel"
                        id="phone"
                        placeholder="+92 333 1234567"
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex flex-col gap-y-1">
                    <Label htmlFor="enquiry">Your Enquiry</Label>
                    <Textarea
                      id="enquiry"
                      rows={5}
                      placeholder="Write your enquiry here"
                    ></Textarea>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button>Submit</Button>
                  </div>
                </form>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </section>
  );
}
