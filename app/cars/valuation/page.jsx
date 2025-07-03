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
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [jsonData, setJsonData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJsonData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/Vehicle make and model data (2).json');
        const data = await response.json();
        setJsonData(data.Sheet1);
        
        // Extract unique makes
        const uniqueMakes = [...new Set(data.Sheet1.map(item => item.Maker))];
        setMakes(uniqueMakes);
      } catch (error) {
        console.error("Error loading vehicle data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJsonData();
  }, []);

  useEffect(() => {
    if (selectedMake && jsonData.length > 0) {
      const makeData = jsonData.find(item => item.Maker === selectedMake);
      if (makeData && makeData["model "]) {
        // Split models string into array and trim whitespace
        const modelArray = makeData["model "].split(",").map(model => model.trim());
        setModels(modelArray);
      } else {
        setModels([]);
      }
      setSelectedModel("");
      
      // Update form data
      setFormData(prev => ({
        ...prev,
        make: selectedMake,
        model: "" // Reset model when make changes
      }));
    }
  }, [selectedMake, jsonData]);

  useEffect(() => {
    // Update form data when model changes
    if (selectedModel) {
      setFormData(prev => ({
        ...prev,
        model: selectedModel
      }));
    }
  }, [selectedModel]);

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
        setSelectedMake("");
        setSelectedModel("");
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
                  Get Your Cars
                  <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">
                    True Value
                  </span>
                </h1>
                <p className="text-gray-300 dark:text-gray-400 max-w-xl mx-auto">
                  Professional car valuation in minutes
                </p>
              </div>

              {/* Main Form Card */}
              <div className="max-w-xl mx-auto">
                <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/20 dark:border-gray-700">
                  
                  {/* Form Header */}
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Free Car Valuation
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
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
                            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <AiOutlineDollar className="mr-2 text-lg" />
                        I&apos;m Selling
                      </button>

                      <button
                        type="button"
                        onClick={() => handleValuationType("Buying")}
                        className={`flex items-center px-4 py-2 rounded-xl border transition-all duration-200 ${
                          formData.valuationType === "Buying"
                            ? "border-blue-500 bg-blue-500 text-white shadow-md"
                            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <MdSell className="mr-2 text-lg" />
                        I&apos;m Buying
                      </button>

                      <button
                        type="button"
                        onClick={() => handleValuationType("Trading")}
                        className={`flex items-center px-4 py-2 rounded-xl border transition-all duration-200 ${
                          formData.valuationType === "Trading"
                            ? "border-blue-500 bg-blue-500 text-white shadow-md"
                            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <FaExchangeAlt className="mr-2 text-lg" />
                        I&apos;m Trading
                      </button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label 
                          htmlFor="make"
                          className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                        >
                          Make
                        </label>
                        <div className="relative">
                          <select
                            value={selectedMake}
                            onChange={(e) => setSelectedMake(e.target.value)}
                            aria-label="Select Make"
                            className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-blue-400 dark:focus:border-blue-400 dark:focus:ring-blue-800"
                            disabled={loading}
                          >
                            <option value="">Select Make</option>
                            {makes.map((make, index) => (
                              <option key={index} value={make}>
                                {make}
                              </option>
                            ))}
                          </select>
                          {loading && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label 
                          htmlFor="model"
                          className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                        >
                          Model
                        </label>
                        <div className="relative">
                          <select
                            value={selectedModel}
                            aria-label="Select Model"
                            onChange={(e) => setSelectedModel(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 transition-all duration-200 hover:border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-purple-400 dark:focus:border-purple-400 dark:focus:ring-purple-800"
                            disabled={!selectedMake || loading}
                          >
                            <option value="">Select Model</option>
                            {models.map((model, index) => (
                              <option key={index} value={model}>
                                {model}
                              </option>
                            ))}
                          </select>
                          {loading && selectedMake && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-purple-600 border-t-transparent"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Submit button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        Get My Valuation
                      </button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-center space-x-6 text-center text-sm text-gray-600 dark:text-gray-300">
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