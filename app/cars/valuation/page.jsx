"use client";

import { useState, useEffect } from "react";
import BrandsList from "@/app/components/BrandsList";
import ChooseUs from "@/app/components/ChooseUs";
import { Button, Card, Label, Select } from "flowbite-react";
import { AiOutlineDollar } from "react-icons/ai";
import { MdSell } from "react-icons/md";
import { FaExchangeAlt, FaCar, FaShieldAlt, FaClock } from "react-icons/fa";
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
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* Background with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/sydney.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-blue-900/90" />
        
        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              
              {/* Header Section */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                  Get Your Car's
                  <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">
                    True Value
                  </span>
                </h1>
                <p className="text-gray-300 max-w-xl mx-auto">
                  Professional car valuation in minutes
                </p>
              </div>

              {/* Main Form Card */}
              <div className="max-w-xl mx-auto">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/20">
                  
                  {/* Form Header */}
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      Free Car Valuation
                    </h2>
                    <p className="text-gray-600 text-sm">
                      What type of valuation do you need?
                    </p>
                  </div>

                  {/* Valuation Type Selection - Compact Design */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button
                        type="button"
                        onClick={() => handleValuationType("Selling")}
                        className={`flex items-center px-4 py-2 rounded-xl border transition-all duration-200 ${
                          formData.valuationType === "Selling"
                            ? "border-blue-500 bg-blue-500 text-white shadow-md"
                            : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"
                        }`}
                      >
                        <AiOutlineDollar className="mr-2 text-lg" />
                        I'm Selling
                      </button>

                      <button
                        type="button"
                        onClick={() => handleValuationType("Buying")}
                        className={`flex items-center px-4 py-2 rounded-xl border transition-all duration-200 ${
                          formData.valuationType === "Buying"
                            ? "border-blue-500 bg-blue-500 text-white shadow-md"
                            : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"
                        }`}
                      >
                        <MdSell className="mr-2 text-lg" />
                        I'm Buying
                      </button>

                      <button
                        type="button"
                        onClick={() => handleValuationType("Trading")}
                        className={`flex items-center px-4 py-2 rounded-xl border transition-all duration-200 ${
                          formData.valuationType === "Trading"
                            ? "border-blue-500 bg-blue-500 text-white shadow-md"
                            : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"
                        }`}
                      >
                        <FaExchangeAlt className="mr-2 text-lg" />
                        I'm Trading
                      </button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label 
                          htmlFor="make" 
                          className="text-sm font-medium text-gray-700"
                        >
                          Make
                        </Label>
                        <Select
                          id="make"
                          value={formData.make}
                          onChange={handleChange}
                          className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="">Select Make</option>
                          {makes.map((make) => (
                            <option key={make._id} value={make._id}>
                              {make.name}
                            </option>
                          ))}
                        </Select>
                      </div>

                      <div className="space-y-1">
                        <Label 
                          htmlFor="model" 
                          className="text-sm font-medium text-gray-700"
                        >
                          Model
                        </Label>
                        <Select
                          id="model"
                          value={formData.model}
                          onChange={handleChange}
                          disabled={!formData.make}
                          className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50"
                        >
                          <option value="">
                            {!formData.make ? "Select make first" : "Select Model"}
                          </option>
                          {models.map((model) => (
                            <option key={model._id} value={model._id}>
                              {model.name}
                            </option>
                          ))}
                        </Select>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        Get My Valuation
                      </button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-center space-x-6 text-center text-sm text-gray-600">
                        <span className="flex items-center">
                          <FaClock className="text-blue-500 mr-1" />
                          Quick
                        </span>
                        <span className="flex items-center">
                          <AiOutlineDollar className="text-green-500 mr-1" />
                          Free
                        </span>
                        <span className="flex items-center">
                          <FaShieldAlt className="text-purple-500 mr-1" />
                          No Obligation
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <BrandsList />
      <ChooseUs />
    </>
  );
}