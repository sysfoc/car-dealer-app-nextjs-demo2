"use client";

import { useState, useEffect } from "react";
import BrandsList from "@/app/components/BrandsList";
import ChooseUs from "@/app/components/ChooseUs";
import { Button, Card, Label, Select } from "flowbite-react";
import { AiOutlineDollar } from "react-icons/ai";
import { MdSell } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

export default function Home() {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    valuationType: "",
  });

  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

  // Fetch car makes on mount
  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await axios.get("/api/makes");
        setMakes(response.data);
      } catch (error) {
        console.error("Failed to fetch makes", error);
      }
    };
    fetchMakes();
  }, []);


  useEffect(() => {
    const fetchModels = async () => {
      if (formData.make) {
        try {
          const response = await axios.get(
            `/api/models?makeId=${formData.make}`,
          );
          setModels(response.data);
        } catch (error) {
          console.error("Failed to fetch models", error);
        }
      } else {
        setModels([]); 
      }
    };
    fetchModels();
  }, [formData.make]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleValuationType = (type) => {
    setFormData((prev) => ({ ...prev, valuationType: type }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.make || !formData.model || !formData.valuationType) {
      Swal.fire("Validation Error", "Please complete all fields.", "warning");
      return;
    }

    try {
      const response = await fetch("/api/valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire("Success", "Valuation submitted!", "success");
        setFormData({ make: "", model: "", valuationType: "" });
        setModels([]);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error");
      console.error(error);
    }
  };

  return (
    <>
      <section
        className="min-h-screen w-full"
        style={{
          background: "url('/sydney.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#000000bf",
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="flex min-h-screen w-full items-center justify-center px-5">
          <div className="w-full sm:w-[45%]">
            <Card>
              <h5 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Get a free car valuation in a minute
              </h5>
              <p className="text-center font-normal text-gray-700 dark:text-gray-400">
                What kind of valuation are you doing?
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  color={formData.valuationType === "Selling" ? "dark" : "gray"}
                  onClick={() => handleValuationType("Selling")}
                >
                  <AiOutlineDollar className="mr-2" fontSize={20} />
                   I&apos;m Selling
                </Button>
                <Button
                  color={formData.valuationType === "Buying" ? "dark" : "gray"}
                  onClick={() => handleValuationType("Buying")}
                >
                  <MdSell className="mr-2" fontSize={20} />
                   I&apos;m Buying
                </Button>
                <Button
                  color={formData.valuationType === "Trading" ? "dark" : "gray"}
                  onClick={() => handleValuationType("Trading")}
                >
                  <FaExchangeAlt className="mr-2" fontSize={20} />
                   I&apos;m Trading in
                </Button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <Label htmlFor="make">Make</Label>
                    <Select
                      id="make"
                      value={formData.make}
                      onChange={handleChange}
                    >
                      <option value="">Select Make</option>
                      {makes.map((make) => (
                        <option key={make._id} value={make._id}>
                          {make.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="model">Model</Label>
                    
                    <Select
                      id="model"
                      value={formData.model}
                      onChange={handleChange}
                      disabled={!formData.make}
                    >
                      <option value="">Select Model</option>
                      {models.map((model) => (
                        <option key={model._id} value={model._id}>
                          {model.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-center">
                  <Button size={"md"} color={"dark"} type="submit">
                    Get my valuation
                  </Button>
                </div>
                <div className="mt-8">
                  <p className="text-center">Quick. Free. No obligation.</p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>
      <BrandsList />
      <ChooseUs />
    </>
  );
}
