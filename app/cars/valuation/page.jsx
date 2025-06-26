// "use client";

// import { useState, useEffect } from "react";
// import BrandsList from "@/app/components/BrandsList";
// import ChooseUs from "@/app/components/ChooseUs";
// import { Button, Card, Label, Select } from "flowbite-react";
// import { AiOutlineDollar } from "react-icons/ai";
// import { MdSell } from "react-icons/md";
// import { FaExchangeAlt, FaCar, FaShieldAlt, FaClock } from "react-icons/fa";
// import Swal from "sweetalert2";
// import axios from "axios";

// export default function Home() {
//   const [formData, setFormData] = useState({
//     make: "",
//     model: "",
//     valuationType: "",
//   });

//   const [makes, setMakes] = useState([]);
//   const [models, setModels] = useState([]);

//   // Fetch car makes on mount
//   useEffect(() => {
//     const fetchMakes = async () => {
//       try {
//         const response = await axios.get("/api/makes");
//         setMakes(response.data);
//       } catch (error) {
//         console.error("Failed to fetch makes", error);
//       }
//     };
//     fetchMakes();
//   }, []);

//   useEffect(() => {
//     const fetchModels = async () => {
//       if (formData.make) {
//         try {
//           const response = await axios.get(
//             `/api/models?makeId=${formData.make}`,
//           );
//           setModels(response.data);
//         } catch (error) {
//           console.error("Failed to fetch models", error);
//         }
//       } else {
//         setModels([]); 
//       }
//     };
//     fetchModels();
//   }, [formData.make]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleValuationType = (type) => {
//     setFormData((prev) => ({ ...prev, valuationType: type }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.make || !formData.model || !formData.valuationType) {
//       Swal.fire("Validation Error", "Please complete all fields.", "warning");
//       return;
//     }

//     try {
//       const response = await fetch("/api/valuation", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         Swal.fire("Success", "Valuation submitted!", "success");
//         setFormData({ make: "", model: "", valuationType: "" });
//         setModels([]);
//       } else {
//         throw new Error("Failed to submit");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Something went wrong!", "error");
//       console.error(error);
//     }
//   };
// return (
//   <>
//     <section className="relative min-h-screen w-full overflow-hidden">
//       {/* Background with overlay */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: "url('/sydney.jpg')",
//         }}
//       />
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-blue-900/90" />
      
//       {/* Hero Content */}
//       <div className="relative z-10 min-h-screen flex items-center">
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-4xl mx-auto">
            
//             {/* Header Section */}
//             <div className="text-center mb-8">
//               <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
//                 Get Your Cars
//                 <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">
//                   True Value
//                 </span>
//               </h1>
//               <p className="text-gray-300 dark:text-gray-400 max-w-xl mx-auto">
//                 Professional car valuation in minutes
//               </p>
//             </div>

//             {/* Main Form Card */}
//             <div className="max-w-xl mx-auto">
//               <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/20 dark:border-gray-700">
                
//                 {/* Form Header */}
//                 <div className="text-center mb-6">
//                   <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
//                     Free Car Valuation
//                   </h2>
//                   <p className="text-gray-600 dark:text-gray-400 text-sm">
//                     What type of valuation do you need?
//                   </p>
//                 </div>

//                 {/* Valuation Type Selection - Compact Design */}
//                 <div className="mb-6">
//                   <div className="flex flex-wrap gap-2 justify-center">
//                     <button
//                       type="button"
//                       onClick={() => handleValuationType("Selling")}
//                       className={`flex items-center px-4 py-2 rounded-xl border transition-all duration-200 ${
//                         formData.valuationType === "Selling"
//                           ? "border-blue-500 bg-blue-500 text-white shadow-md"
//                           : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-blue-300"
//                       }`}
//                     >
//                       <AiOutlineDollar className="mr-2 text-lg" />
//                       I&apos;m Selling
//                     </button>

//                     <button
//                       type="button"
//                       onClick={() => handleValuationType("Buying")}
//                       className={`flex items-center px-4 py-2 rounded-xl border transition-all duration-200 ${
//                         formData.valuationType === "Buying"
//                           ? "border-blue-500 bg-blue-500 text-white shadow-md"
//                           : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-blue-300"
//                       }`}
//                     >
//                       <MdSell className="mr-2 text-lg" />
//                       I&apos;m Buying
//                     </button>

//                     <button
//                       type="button"
//                       onClick={() => handleValuationType("Trading")}
//                       className={`flex items-center px-4 py-2 rounded-xl border transition-all duration-200 ${
//                         formData.valuationType === "Trading"
//                           ? "border-blue-500 bg-blue-500 text-white shadow-md"
//                           : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-blue-300"
//                       }`}
//                     >
//                       <FaExchangeAlt className="mr-2 text-lg" />
//                       I&apos;m Trading
//                     </button>
//                   </div>
//                 </div>

//                 {/* Form Fields */}
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="space-y-1">
//                       <Label 
//                         htmlFor="make" 
//                         className="text-sm font-medium text-gray-700 dark:text-gray-200"
//                       >
//                         Make
//                       </Label>
//                       <Select
//                         id="make"
//                         value={formData.make}
//                         onChange={handleChange}
//                         className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-blue-500"
//                       >
//                         <option value="">Select Make</option>
//                         {makes.map((make) => (
//                           <option key={make._id} value={make._id}>
//                             {make.name}
//                           </option>
//                         ))}
//                       </Select>
//                     </div>

//                     <div className="space-y-1">
//                       <Label 
//                         htmlFor="model" 
//                         className="text-sm font-medium text-gray-700 dark:text-gray-200"
//                       >
//                         Model
//                       </Label>
//                       <Select
//                         id="model"
//                         value={formData.model}
//                         onChange={handleChange}
//                         disabled={!formData.make}
//                         className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 dark:disabled:bg-gray-700/50"
//                       >
//                         <option value="">
//                           {!formData.make ? "Select make first" : "Select Model"}
//                         </option>
//                         {models.map((model) => (
//                           <option key={model._id} value={model._id}>
//                             {model.name}
//                           </option>
//                         ))}
//                       </Select>
//                     </div>
//                   </div>

//                   {/* Submit Button */}
//                   <div className="pt-4">
//                     <button
//                       type="submit"
//                       className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
//                     >
//                       Get My Valuation
//                     </button>
//                   </div>

//                   {/* Trust Indicators */}
//                   <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
//                     <div className="flex justify-center space-x-6 text-center text-sm text-gray-600 dark:text-gray-300">
//                       <span className="flex items-center">
//                         <FaClock className="text-blue-500 mr-1" />
//                         Quick
//                       </span>
//                       <span className="flex items-center">
//                         <AiOutlineDollar className="text-green-500 mr-1" />
//                         Free
//                       </span>
//                       <span className="flex items-center">
//                         <FaShieldAlt className="text-purple-500 mr-1" />
//                         No Obligation
//                       </span>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
    
//     <BrandsList />
//     <ChooseUs />
//   </>
// );
// }
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
  const [isLoadingMakes, setIsLoadingMakes] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(false);

  useEffect(() => {
    const fetchMakes = async () => {
      setIsLoadingMakes(true);
      try {
        const response = await axios.get(
          "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json"
        );
        
        if (response.data && response.data.Results) {
          const sortedMakes = response.data.Results
            .filter(make => make.Make_Name && make.Make_Name.trim())
            .sort((a, b) => a.Make_Name.localeCompare(b.Make_Name));
          
          setMakes(sortedMakes);
        }
      } catch (error) {
        console.error("Failed to fetch makes from NHTSA API:", error);
        Swal.fire(
          "Error", 
          "Failed to load car makes. Please try again later.", 
          "error"
        );
      } finally {
        setIsLoadingMakes(false);
      }
    };
    
    fetchMakes();
  }, []);

  useEffect(() => {
    const fetchModels = async () => {
      if (formData.make) {
        setIsLoadingModels(true);
        try {
          const selectedMake = makes.find(make => make.Make_ID.toString() === formData.make);
          const makeName = selectedMake ? selectedMake.Make_Name : '';
          
          if (makeName) {
            const response = await axios.get(
              `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${encodeURIComponent(makeName)}?format=json`
            );
            
            if (response.data && response.data.Results) {
              const uniqueModels = response.data.Results
                .filter(model => model.Model_Name && model.Model_Name.trim())
                .reduce((acc, current) => {
                  const exists = acc.find(item => item.Model_Name === current.Model_Name);
                  if (!exists) {
                    acc.push(current);
                  }
                  return acc;
                }, [])
                .sort((a, b) => a.Model_Name.localeCompare(b.Model_Name));
              
              setModels(uniqueModels);
            }
          }
        } catch (error) {
          console.error("Failed to fetch models from NHTSA API:", error);
          setModels([]);
          Swal.fire(
            "Error", 
            "Failed to load models for the selected make. Please try again.", 
            "error"
          );
        } finally {
          setIsLoadingModels(false);
        }
      } else {
        setModels([]);
      }
    };
    
    fetchModels();
  }, [formData.make, makes]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [id]: value,
      // Reset model when make changes
      ...(id === 'make' && { model: '' })
    }));
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
      // Get the actual make and model names for submission
      const selectedMake = makes.find(make => make.Make_ID.toString() === formData.make);
      const selectedModel = models.find(model => model.Model_ID.toString() === formData.model);
      
      const submissionData = {
        makeId: formData.make,
        makeName: selectedMake?.Make_Name || '',
        modelId: formData.model,
        modelName: selectedModel?.Model_Name || '',
        valuationType: formData.valuationType
      };

      const response = await fetch("/api/valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        Swal.fire("Success", "Valuation submitted successfully!", "success");
        setFormData({ make: "", model: "", valuationType: "" });
        setModels([]);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to submit valuation");
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire("Error", "Something went wrong! Please try again.", "error");
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
                  Get Your Cars{' '}
                  <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">
                    True Value
                  </span>
                </h1>
                <p className="text-gray-300 dark:text-gray-400 max-w-xl mx-auto">
                  Professional car valuation in minutes using official NHTSA vehicle database
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label 
                          htmlFor="make" 
                          className="text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                          Make
                        </Label>
                        <Select
                          id="make"
                          value={formData.make}
                          onChange={handleChange}
                          disabled={isLoadingMakes}
                          className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="">
                            {isLoadingMakes ? "Loading makes..." : "Select Make"}
                          </option>
                          {makes.map((make) => (
                            <option key={make.Make_ID} value={make.Make_ID}>
                              {make.Make_Name}
                            </option>
                          ))}
                        </Select>
                      </div>

                      <div className="space-y-1">
                        <Label 
                          htmlFor="model" 
                          className="text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                          Model
                        </Label>
                        <Select
                          id="model"
                          value={formData.model}
                          onChange={handleChange}
                          disabled={!formData.make || isLoadingModels}
                          className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 dark:disabled:bg-gray-700/50"
                        >
                          <option value="">
                            {isLoadingModels 
                              ? "Loading models..." 
                              : !formData.make 
                                ? "Select make first" 
                                : "Select Model"
                            }
                          </option>
                          {models.map((model) => (
                            <option key={model.Model_ID} value={model.Model_ID}>
                              {model.Model_Name}
                            </option>
                          ))}
                        </Select>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isLoadingMakes || isLoadingModels}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoadingMakes || isLoadingModels ? "Loading..." : "Get My Valuation"}
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
                      
                      {/* Data Source Credit */}
                      <div className="text-center mt-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Vehicle data provided by NHTSA VPIC Database
                        </p>
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