"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LuCrown } from "react-icons/lu";
import Slider from "@/app/components/Slider";
import Table from "@/app/components/Tables";
import SellerComment from "@/app/components/SellerComment";
import Features from "@/app/components/Features";
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Textarea,
  TextInput,
} from "flowbite-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslations } from "next-intl";
import { useCurrency } from "@/app/context/CurrencyContext";

export default function Home() {
  const t = useTranslations("carDetails");
  const [openModal, setOpenModal] = useState(false);
  const { slug } = useParams();
  const [car, setCar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dealer, setDealer] = useState(null);
  const [error, setError] = useState(null);
  const { selectedCurrency } = useCurrency();

  useEffect(() => {
    if (slug) {
      setLoading(true);
      setError(null);

      fetch(`/api/cars?slug=${slug}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch car details");
          }
          return response.json();
        })
        .then((data) => {
          const selectedCar = data.cars?.find((c) => c.slug === slug);
          console.log("Car Data:", selectedCar);
          setCar(selectedCar || null);

          if (selectedCar?.dealerId) {
            fetch(`/api/dealor`)
              .then((res) => res.json())
              .then((dealerData) => {
                console.log("Dealer Data:", dealerData);

                const matchedDealer = dealerData.find(
                  (dealer) => dealer._id === selectedCar.dealerId,
                );
                console.log("Matched Dealer:", matchedDealer);

                setDealer(matchedDealer || null);
              })
              .catch((err) => console.error("Error fetching dealer:", err));
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setCar(null);
          setLoading(false);
        });
    }
  }, [slug]);

  if (!slug) {
    return <div>Sorry! No Car Found</div>;
  }
  if (error) {
    return <div>An Error Occured While Searching</div>;
  }
  if (!car) {
    return <div>No Car Found </div>;
  }
  return (
    <section className="mx-4 my-5 sm:mx-8">
      <div className="grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-3">
        <div className="col-span-2">
          <div className="flex items-center gap-2 bg-blue-950 p-3 dark:bg-gray-700">
            <div>
              <LuCrown fontSize={25} className="text-white" />
            </div>
            <h3 className="text-lg font-bold uppercase text-white">
              Used Vehicle
            </h3>
          </div>
          <div>
            <Slider loadingState={loading} carData={car} />
          </div>
          <div className="my-5">
            <h3 className="text-2xl font-semibold">
              {loading ? <Skeleton /> : car.modelName}
            </h3>
            <h4 className="my-2 text-3xl font-semibold text-blue-950 dark:text-red-500">
              {loading ? <Skeleton width={60} /> : `${selectedCurrency?.symbol} ${Math.round(car.price)}`}
            </h4>
          </div>
          <div className="flex items-center gap-x-3">
            <Button
              color={"white"}
              className="border border-blue-950 text-sm uppercase hover:bg-blue-950 hover:text-white dark:border-red-500 dark:hover:bg-red-500"
              onClick={() => setOpenModal(true)}
            >
              {t("enquireNow")}
            </Button>
            <Button
              color={"white"}
              className="bg-blue-950 text-sm uppercase text-white dark:bg-red-500"
              onClick={() => {
                window.location.href = "tel:+1234567890";
              }}
            >
              {t("callUs")}
            </Button>
          </div>
          <Modal
            dismissible
            show={openModal}
            onClose={() => setOpenModal(false)}
          >
            <ModalHeader>{t("enquireNow")}</ModalHeader>
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
                        placeholder="+92 333 333333"
                      />
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <Label htmlFor="comment">Comment</Label>
                      <Textarea rows={5} placeholder="Comment"></Textarea>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-col">
                    <Button
                      color={"dark"}
                      className="w-full text-lg font-semibold uppercase"
                    >
                      Send Enquiry
                    </Button>
                  </div>
                </form>
              </div>
            </ModalBody>
          </Modal>
          <div className="mt-3 border-b-2 border-blue-950 dark:border-gray-700"></div>
          <div>
            {/* <Features loadingState={loading} carData={dealer} translation={t} /> */}
            {dealer && (
              <Features
                loadingState={loading}
                carData={dealer}
                car={car}
                translation={t}
              />
            )}
          </div>
        </div>
        <div>
          <Table loadingState={loading} carData={car} translation={t} />
          {/* <SellerComment loadingState={loading} car={car} translation={t} /> */}
          {car ? (
            <SellerComment loadingState={loading} car={car} translation={t} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="mt-8">
        <div className="mt-8">
          {dealer ? (
            dealer.map ? (
              <iframe
                src={dealer.map}
                width="600"
                height="450"
                style={{ border: 0, width: "100%" }}
                loading="lazy"
              ></iframe>
            ) : (
              <p>Map is not available</p>
            )
          ) : (
            <p>Loading dealer information...</p>
          )}
        </div>
      </div>
    </section>
  );
}


