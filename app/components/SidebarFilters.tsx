"use client";
import { Checkbox, Label, Select, TextInput } from "flowbite-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { VscSymbolKeyword } from "react-icons/vsc";
import { SiCmake, SiGoogleearthengine } from "react-icons/si";
import { TbEngine } from "react-icons/tb";
import { useRouter } from "next/navigation";
import {
  IoMdArrowDropdown,
  IoIosColorPalette,
  IoIosSpeedometer,
} from "react-icons/io";
import { IoPricetag } from "react-icons/io5";
import {
  FaLocationDot,
  FaRecycle,
  FaRegCalendarCheck,
  FaCar,
  FaHourglassEnd,
} from "react-icons/fa6";
import {
  GiCarDoor,
  GiCartwheel,
  GiGearStickPattern,
  GiPathDistance,
  GiCarSeat,
  GiGasPump,
  GiBatteryPack,
  GiElectric,
  GiPowerLightning,
  GiCarWheel,
} from "react-icons/gi";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdBatteryCharging50, MdOutlineCo2 } from "react-icons/md";
import { ImPower } from "react-icons/im";
import { useTranslations } from "next-intl";
import { useDebouncedCallback } from "use-debounce";

const SidebarFilters = () => {
  const t = useTranslations("Filters");
  const router = useRouter();
  const [localFilters, setLocalFilters] = useState<Record<string, any>>({});
  const [openSections, setOpenSections] = useState<string[]>([]);
  
  // Track active input to preserve focus
  const activeInputRef = useRef<string | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | HTMLSelectElement>>({});
  
  // Track if we're currently updating from URL (to prevent focus restoration during external navigation)
  const isUpdatingFromURL = useRef(false);

  // Initialize from URL
  useEffect(() => {
    isUpdatingFromURL.current = true;
    const params = new URLSearchParams(window.location.search);
    const initialFilters: Record<string, any> = {};
    
    params.forEach((value, key) => {
      if (initialFilters[key]) {
        if (Array.isArray(initialFilters[key])) {
          initialFilters[key].push(value);
        } else {
          initialFilters[key] = [initialFilters[key], value];
        }
      } else {
        initialFilters[key] = value;
      }
    });
    
    setLocalFilters(initialFilters);
    
    // Reset the flag after state update
    setTimeout(() => {
      isUpdatingFromURL.current = false;
    }, 100);
  }, []);

  const updateURL = useCallback(() => {
  const activeElement = document.activeElement as HTMLInputElement | HTMLSelectElement;
  const activeId = activeElement?.id || activeElement?.name;
  
  if (activeId && inputRefs.current[activeId]) {
    activeInputRef.current = activeId;
  }

  const params = new URLSearchParams();
  
  Object.entries(localFilters).forEach(([key, value]) => {
    if (key === 'minPrice' || key === 'maxPrice') {
      if (localFilters.minPrice && localFilters.maxPrice) {
        if (key === 'minPrice' && localFilters.minPrice) {
          params.set('minPrice', localFilters.minPrice);
        }
        if (key === 'maxPrice' && localFilters.maxPrice) {
          params.set('maxPrice', localFilters.maxPrice);
        }
      }
    } else if (Array.isArray(value)) {
      value.forEach(v => params.append(key, v));
    } else if (value !== undefined && value !== "") {
      params.set(key, value);
    }
  });
  
  router.replace(`?${params.toString()}`, { scroll: false });
}, [localFilters, router]);

  const debouncedUpdateURL = useDebouncedCallback(updateURL, 500); // Reduced from 800ms for better responsiveness

  // Update URL when filters change
  useEffect(() => {
    if (!isUpdatingFromURL.current) {
      debouncedUpdateURL();
    }
  }, [localFilters, debouncedUpdateURL]);

  // Restore focus after component re-render
  useEffect(() => {
    if (activeInputRef.current && inputRefs.current[activeInputRef.current] && !isUpdatingFromURL.current) {
      const element = inputRefs.current[activeInputRef.current];
      if (element && document.activeElement !== element) {
        // Use setTimeout to ensure the element is ready
        setTimeout(() => {
          element.focus();
          
          // For text inputs, restore cursor position to the end
          if (element.type === 'text' || element.type === 'number') {
            const input = element as HTMLInputElement;
            const length = input.value.length;
            input.setSelectionRange(length, length);
          }
        }, 0);
      }
      activeInputRef.current = null;
    }
  });

  // Handle browser navigation
  useEffect(() => {
    const handleRouteChange = () => {
      isUpdatingFromURL.current = true;
      const params = new URLSearchParams(window.location.search);
      const newFilters: Record<string, any> = {};
      
      params.forEach((value, key) => {
        if (newFilters[key]) {
          if (Array.isArray(newFilters[key])) {
            newFilters[key].push(value);
          } else {
            newFilters[key] = [newFilters[key], value];
          }
        } else {
          newFilters[key] = value;
        }
      });
      
      setLocalFilters(newFilters);
      
      setTimeout(() => {
        isUpdatingFromURL.current = false;
      }, 100);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  // Enhanced input change handler with ref management
  const handleInputChange = (key: string, value: string, elementId?: string) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
    
    // Track the active input for focus restoration
    if (elementId) {
      activeInputRef.current = elementId;
    }
  };

  // Enhanced checkbox handler
  const handleCheckboxChange = (key: string, value: string) => {
    setLocalFilters(prev => {
      const current = prev[key] || [];
      const array = Array.isArray(current) ? current : [current];
      
      if (array.includes(value)) {
        return {
          ...prev,
          [key]: array.filter(v => v !== value)
        };
      } else {
        return {
          ...prev,
          [key]: [...array, value]
        };
      }
    });
  };

  const handleApplyFilters = () => {
    debouncedUpdateURL.flush();
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(item => item !== section) 
        : [...prev, section]
    );
  };

  // Enhanced ref callback for input elements
  const setInputRef = (key: string) => (element: HTMLInputElement | HTMLSelectElement | null) => {
    if (element) {
      inputRefs.current[key] = element;
    } else {
      delete inputRefs.current[key];
    }
  };

  // Helper components with enhanced focus management
  const FilterSection = ({ label, content, symbol, children }: any) => (
    <div className="group mb-6 relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
      <div className="relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm">
        <div
          className="flex cursor-pointer items-center justify-between p-6 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-slate-900 dark:via-gray-900 dark:to-blue-900 hover:from-violet-50 dark:hover:from-violet-900 border-b border-gray-100 dark:border-gray-800 transition-all duration-300"
          onClick={() => toggleSection(content)}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl blur opacity-30"></div>
              <div className="relative bg-gradient-to-br from-violet-500 to-purple-600 p-3 rounded-xl shadow-lg">
                <div className="text-white text-xl">
                  {symbol}
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-tight">
                {label}
              </h3>
              <div className="h-0.5 w-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full opacity-60"></div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
            <div className={`relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 transition-all duration-500 ${
              openSections.includes(content) ? "rotate-180 bg-violet-100 dark:bg-violet-900" : ""
            }`}>
              <div className="w-6 h-6 text-gray-700 dark:text-gray-300">▼</div>
            </div>
          </div>
        </div>
        <div
          className={`transition-all duration-500 ease-out ${
            openSections.includes(content) 
              ? "max-h-[600px] opacity-100" 
              : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="p-6 bg-gradient-to-br from-gray-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  const CustomCheckbox = ({ id, checked, onChange, label, className = "" }: any) => (
    <div className={`group flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 dark:hover:from-violet-900/20 dark:hover:to-purple-900/20 transition-all duration-300 border border-transparent hover:border-violet-200 dark:hover:border-violet-800 ${className}`}>
      <div className="relative flex-shrink-0">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div 
          className={`relative w-6 h-6 rounded-lg cursor-pointer transition-all duration-300 shadow-lg ${
            checked 
              ? 'bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 border-2 border-violet-400 shadow-violet-200 dark:shadow-violet-800' 
              : 'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-violet-400 dark:hover:border-violet-500 shadow-gray-200 dark:shadow-gray-800'
          }`}
          onClick={onChange}
        >
          {checked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-4 h-4 text-white font-bold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          <div className={`absolute -inset-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg blur opacity-0 transition-opacity duration-300 ${checked ? 'opacity-20' : 'group-hover:opacity-10'}`}></div>
        </div>
      </div>
      <label htmlFor={id} className="text-base font-medium text-gray-800 dark:text-gray-200 cursor-pointer select-none flex-grow group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors duration-300">
        {label}
      </label>
    </div>
  );

  return (
    <div className="space-y-4 max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-violet-300 scrollbar-track-transparent pr-2">
      {[
        {
          label: t("keyword"),
          content: "keyword",
          symbol: <VscSymbolKeyword />,
          render: (
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                <label htmlFor="keyword" className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Search Keywords
                </label>
              </div>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition-all duration-300"></div>
                <div className="relative">
                  <TextInput
                    type="text"
                    id="keyword"
                    name="keyword"
                    ref={setInputRef("keyword")}
                    value={localFilters.keyword || ""}
                    placeholder="e.g., Toyota, BMW, Sedan..."
                    onChange={(e) => handleInputChange("keyword", e.target.value, "keyword")}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-base font-medium shadow-lg transition-all duration-300"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-500 text-xl">
                    <VscSymbolKeyword />
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          label: t("year"),
          content: "year",
          symbol: <FaRegCalendarCheck />, 
          render: (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Manufacturing Year
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="minYear" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                    From Year
                  </Label>
                  <div className="relative group">
                    <TextInput
                      type="number"
                      name="minYear"
                      id="minYear"
                      ref={setInputRef("minYear")}
                      value={localFilters.minYear || ""}
                      placeholder="2010"
                      onChange={(e) => handleInputChange("minYear", e.target.value, "minYear")}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium shadow-lg transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="maxYear" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    To Year
                  </Label>
                  <div className="relative group">
                    <TextInput
                      type="number"
                      name="maxYear"
                      id="maxYear"
                      ref={setInputRef("maxYear")}
                      value={localFilters.maxYear || ""}
                      placeholder="2024"
                      onChange={(e) => handleInputChange("maxYear", e.target.value, "maxYear")}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium shadow-lg transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          label: t("mileage"),
          content: "mileage",
          symbol: <IoIosSpeedometer />,
          render: (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Mileage Range
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="millageFrom" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                    {t("from")}
                  </Label>
                  <div className="relative group">
                    <Select
                      id="millageFrom"
                      name="millageFrom"
                      ref={setInputRef("millageFrom")}
                      value={localFilters.millageFrom || ""}
                      onChange={(e) => handleInputChange("millageFrom", e.target.value, "millageFrom")}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 font-medium shadow-lg transition-all duration-300"
                    >
                      <option value="">Any</option>
                      <option value="25000">25,000 km</option>
                      <option value="26000">26,000 km</option>
                      <option value="27000">27,000 km</option>
                    </Select>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="millageTo" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    {t("to")}
                  </Label>
                  <div className="relative group">
                    <Select
                      id="millageTo"
                      name="millageTo"
                      ref={setInputRef("millageTo")}
                      value={localFilters.millageTo || ""}
                      onChange={(e) => handleInputChange("millageTo", e.target.value, "millageTo")}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 font-medium shadow-lg transition-all duration-300"
                    >
                      <option value="">Any</option>
                      <option value="24000">24,000 km</option>
                      <option value="26000">26,000 km</option>
                      <option value="27000">27,000 km</option>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        // New sections starting from here
        {
          label: t("condition"),
          content: "condition",
          symbol: <FaRecycle />, 
          render: (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Vehicle Condition
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <CustomCheckbox
                  id="new"
                  checked={Array.isArray(localFilters.condition) && localFilters.condition.includes("new")}
                  onChange={() => handleCheckboxChange("condition", "new")}
                  label="New"
                />
                <CustomCheckbox
                  id="used"
                  checked={Array.isArray(localFilters.condition) && localFilters.condition.includes("used")}
                  onChange={() => handleCheckboxChange("condition", "used")}
                  label="Used"
                />
              </div>
            </div>
          ),
        },
        {
          label: t("location"),
          content: "location",
          symbol: <FaLocationDot />,
          render: (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Location
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <CustomCheckbox
                  id="Cityville"
                  checked={Array.isArray(localFilters.location) && localFilters.location.includes("Cityville")}
                  onChange={() => handleCheckboxChange("location", "Cityville")}
                  label="Cityville"
                />
                <CustomCheckbox
                  id="uk"
                  checked={Array.isArray(localFilters.location) && localFilters.location.includes("uk")}
                  onChange={() => handleCheckboxChange("location", "uk")}
                  label="United Kingdom"
                />
              </div>
            </div>
          ),
        },
        {
          label: t("price"),
          content: "price",
          symbol: <IoPricetag />, 
          render: (
  <div className="space-y-6">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
      <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
        Price Range
      </h4>
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-3">
        <Label htmlFor="minPrice" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
          Minimum Price
        </Label>
        <div className="relative group">
          <Select
            id="minPrice"
            name="minPrice"
            ref={setInputRef("minPrice")}
            value={localFilters.minPrice || ""}
            onChange={(e) => handleInputChange("minPrice", e.target.value, "minPrice")}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 font-medium shadow-lg transition-all duration-300"
          >
            <option value="">Any Min</option>
            <option value="100">$100</option>
            <option value="500">$500</option>
            <option value="1000">$1,000</option>
            <option value="5000">$5,000</option>
            <option value="10000">$10,000</option>
            <option value="15000">$15,000</option>
            <option value="20000">$20,000</option>
            <option value="25000">$25,000</option>
            <option value="30000">$30,000</option>
            <option value="40000">$40,000</option>
            <option value="50000">$50,000</option>
          </Select>
        </div>
      </div>
      <div className="space-y-3">
        <Label htmlFor="maxPrice" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
          Maximum Price
        </Label>
        <div className="relative group">
          <Select
            id="maxPrice"
            name="maxPrice"
            ref={setInputRef("maxPrice")}
            value={localFilters.maxPrice || ""}
            onChange={(e) => handleInputChange("maxPrice", e.target.value, "maxPrice")}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 font-medium shadow-lg transition-all duration-300"
          >
            <option value="">Any Max</option>
             <option value="500">$500</option>
            <option value="1000">$1,000</option>
            <option value="5000">$5,000</option>
            <option value="10000">$10,000</option>
            <option value="15000">$15,000</option>
            <option value="20000">$20,000</option>
            <option value="25000">$25,000</option>
            <option value="30000">$30,000</option>
            <option value="40000">$40,000</option>
            <option value="50000">$50,000</option>
            <option value="75000">$75,000</option>
            <option value="100000">$100,000</option>
          </Select>
        </div>
      </div>
    </div>
  </div>
),
        },
        {
          label: "Model",
          content: "Model",
          symbol: <SiCmake />, 
          render: (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Car Models
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {["Corolla", "sequoio", "147", "146", "159"].map((value) => (
                  <CustomCheckbox
                    key={value}
                    id={value}
                    checked={Array.isArray(localFilters.model) && localFilters.model.includes(value)}
                    onChange={() => handleCheckboxChange("model", value)}
                    label={value}
                  />
                ))}
              </div>
            </div>
          ),
        },
        {
          label: t("gearbox"),
          content: "gearbox",
          symbol: <GiGearStickPattern />,
          render: (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Transmission Type
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <CustomCheckbox
                  id="automatic"
                  checked={Array.isArray(localFilters.gearBox) && localFilters.gearBox.includes("automatic")}
                  onChange={() => handleCheckboxChange("gearBox", "automatic")}
                  label="Automatic"
                />
                <CustomCheckbox
                  id="manual"
                  checked={Array.isArray(localFilters.gearBox) && localFilters.gearBox.includes("manual")}
                  onChange={() => handleCheckboxChange("gearBox", "manual")}
                  label="Manual"
                />
              </div>
            </div>
          ),
        },
        {
          label: t("body"),
          content: "bodytype",
          symbol: <GiCarDoor />,
          render: (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Body Style
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: "convertible", label: "Convertible" },
                  { id: "coupe", label: "Coupe" },
                  { id: "estate", label: "Estate" },
                  { id: "hatchback", label: "Hatchback" },
                  { id: "saloon", label: "Saloon" },
                  { id: "suv", label: "SUV" },
                ].map(({ id, label }) => (
                  <CustomCheckbox
                    key={id}
                    id={id}
                    checked={Array.isArray(localFilters.bodyType) && localFilters.bodyType.includes(id)}
                    onChange={() => handleCheckboxChange("bodyType", id)}
                    label={label}
                  />
                ))}
              </div>
            </div>
          ),
        },
        {
          label: t("color"),
          content: "color",
          symbol: <IoIosColorPalette />,
          render: (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Exterior Color
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: "black", label: "Black" },
                  { id: "blue", label: "Blue" },
                  { id: "gray", label: "Gray" },
                  { id: "white", label: "White" },
                  { id: "silver", label: "Silver" },
                  { id: "red", label: "Red" },
                  { id: "green", label: "Green" },
                ].map(({ id, label }) => (
                  <CustomCheckbox
                    key={id}
                    id={id}
                    checked={Array.isArray(localFilters.color) && localFilters.color.includes(id)}
                    onChange={() => handleCheckboxChange("color", id)}
                    label={label}
                  />
                ))}
              </div>
            </div>
          ),
        },
        {
          label: t("doors"),
          content: "doors",
          symbol: <GiCarDoor />,
          render: (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Number of Doors
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "2", label: "2 Doors" },
                  { id: "3", label: "3 Doors" },
                  { id: "4", label: "4 Doors" },
                  { id: "5", label: "5 Doors" },
                ].map(({ id, label }) => (
                  <CustomCheckbox
                    key={id}
                    id={id}
                    checked={Array.isArray(localFilters.doors) && localFilters.doors.includes(id)}
                    onChange={() => handleCheckboxChange("doors", id)}
                    label={label}
                  />
                ))}
              </div>
            </div>
          ),
        },
        {
          label: t("seats"),
          content: "Seats",
          symbol: <GiCarSeat />,
          render: (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Seating Capacity
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "2", label: "2 Seats" },
                  { id: "3", label: "3 Seats" },
                  { id: "4", label: "4 Seats" },
                  { id: "5", label: "5 Seats" },
                  { id: "7", label: "7 Seats" },
                ].map(({ id, label }) => (
                  <CustomCheckbox
                    key={id}
                    id={id}
                    checked={Array.isArray(localFilters.seats) && localFilters.seats.includes(id)}
                    onChange={() => handleCheckboxChange("seats", id)}
                    label={label}
                  />
                ))}
              </div>
            </div>
          ),
        },
        {
          label: t("fuel"),
          content: "fueltype",
          symbol: <GiGasPump />,
          render: (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Fuel Type
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: "petrol", label: "Petrol" },
                  { id: "diesel", label: "Diesel" },
                  { id: "electric", label: "Electric" },
                  { id: "hybrid", label: "Hybrid" },
                  { id: "bi-fuel", label: "Bi Fuel" },
                ].map(({ id, label }) => (
                  <CustomCheckbox
                    key={id}
                    id={id}
                    checked={Array.isArray(localFilters.fuel) && localFilters.fuel.includes(id)}
                    onChange={() => handleCheckboxChange("fuel", id)}
                    label={label}
                  />
                ))}
              </div>
            </div>
          ),
        },
        {
          label: t("battery"),
          content: "battery",
          symbol: <GiBatteryPack />,
          render: (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Battery Range
                </h4>
              </div>
              <div className="space-y-3">
                <Label htmlFor="battery" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                  Select Range
                </Label>
                <div className="relative group">
                  <Select
                    id="battery"
                    ref={setInputRef("battery")}
                    value={localFilters.battery || "Any"}
                    onChange={(e) => handleInputChange("battery", e.target.value, "battery")}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 font-medium shadow-lg transition-all duration-300"
                  >
                    <option value="Any">Any Range</option>
                    <option value="100">0-100 Miles</option>
                    <option value="1000">100-200 Miles</option>
                    <option value="2000">200+ Miles</option>
                  </Select>
                </div>
              </div>
            </div>
          ),
        },
        {
            label: t("charging"),
            content: "charging",
            symbol: <GiElectric />,
            render: (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    Charging Speed
                  </h4>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="charging" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                    Maximum Charging Rate
                  </Label>
                  <div className="relative group">
                    <Select
                      id="charging"
                      ref={setInputRef("charging")}
                      value={localFilters.charging || "Any"}
                      onChange={(e) => handleInputChange("charging", e.target.value, "charging")}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 font-medium shadow-lg transition-all duration-300"
                    >
                      <option value="Any">Any Speed</option>
                      <option value="100">Standard (0-50kW)</option>
                      <option value="1000">Fast (50-150kW)</option>
                      <option value="2000">Rapid (150kW+)</option>
                    </Select>
                  </div>
                </div>
              </div>
            ),
          },
          {
            label: t("engineSize"),
            content: "engine-size",
            symbol: <SiGoogleearthengine />,
            render: (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    Engine Size Range
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="engine-from" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                      {t("from")}
                    </Label>
                    <div className="relative group">
                      <Select
                        id="engine-from"
                        ref={setInputRef("engineSizeFrom")}
                        value={localFilters.engineSizeFrom || ""}
                        onChange={(e) => handleInputChange("engineSizeFrom", e.target.value, "engineSizeFrom")}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 font-medium shadow-lg transition-all duration-300"
                      >
                        <option value="">Any</option>
                        <option value="0">0.0L</option>
                        <option value="1">1.0L</option>
                        <option value="2">2.0L</option>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="engine-to" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      {t("to")}
                    </Label>
                    <div className="relative group">
                      <Select
                        id="engine-to"
                        ref={setInputRef("engineSizeTo")}
                        value={localFilters.engineSizeTo || ""}
                        onChange={(e) => handleInputChange("engineSizeTo", e.target.value, "engineSizeTo")}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 font-medium shadow-lg transition-all duration-300"
                      >
                        <option value="">Any</option>
                        <option value="0">0.0L</option>
                        <option value="1">1.0L</option>
                        <option value="2">2.0L</option>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            ),
          },
          {
            label: t("enginePower"),
            content: "engine-power",
            symbol: <GiPowerLightning />,
            render: (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    Engine Power Range
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="engine-power-from" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                      {t("from")}
                    </Label>
                    <div className="relative group">
                      <Select
                        id="engine-power-from"
                        ref={setInputRef("enginePowerFrom")}
                        value={localFilters.enginePowerFrom || "Any"}
                        onChange={(e) => handleInputChange("enginePowerFrom", e.target.value, "enginePowerFrom")}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 font-medium shadow-lg transition-all duration-300"
                      >
                        <option value="Any">Any</option>
                        <option value="50">50 bhp</option>
                        <option value="100">100 bhp</option>
                        <option value="150">150 bhp</option>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="engine-power-to" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      {t("to")}
                    </Label>
                    <div className="relative group">
                      <Select
                        id="engine-power-to"
                        ref={setInputRef("enginePowerTo")}
                        value={localFilters.enginePowerTo || "Any"}
                        onChange={(e) => handleInputChange("enginePowerTo", e.target.value, "enginePowerTo")}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 font-medium shadow-lg transition-all duration-300"
                      >
                        <option value="Any">Any</option>
                        <option value="50">50 bhp</option>
                        <option value="100">100 bhp</option>
                        <option value="150">150 bhp</option>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            ),
          },
          {
            label: t("fuelConsumption"),
            content: "fuel-comsumption",
            symbol: <FaHourglassEnd/>,
            render: (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    Fuel Economy
                  </h4>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="fuel-comsumption" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                    Minimum MPG
                  </Label>
                  <div className="relative group">
                    <Select
                      id="fuel-comsumption"
                      ref={setInputRef("fuelConsumption")}
                      value={localFilters.fuelConsumption || "Any"}
                      onChange={(e) => handleInputChange("fuelConsumption", e.target.value, "fuelConsumption")}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 font-medium shadow-lg transition-all duration-300"
                    >
                      <option value="Any">Any MPG</option>
                      <option value="30">30+ MPG</option>
                      <option value="40">40+ MPG</option>
                      <option value="50">50+ MPG</option>
                      <option value="60">60+ MPG</option>
                    </Select>
                  </div>
                </div>
              </div>
            ),
          },
          {
            label: t("co2"),
            content: "c02-emission",
            symbol:<MdOutlineCo2 />,
            render: (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    CO2 Emissions
                  </h4>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="c02-emission" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                    Maximum CO2 Output
                  </Label>
                  <div className="relative group">
                    <Select
                      id="c02-emission"
                      ref={setInputRef("co2Emission")}
                      value={localFilters.co2Emission || "Any"}
                      onChange={(e) => handleInputChange("co2Emission", e.target.value, "co2Emission")}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50 text-gray-800 dark:text-gray-200 font-medium shadow-lg transition-all duration-300"
                    >
                      <option value="Any">Any Emission</option>
                      <option value="30">Up to 30 g/km CO2</option>
                      <option value="75">Up to 75 g/km CO2</option>
                      <option value="100">Up to 100 g/km CO2</option>
                      <option value="110">Up to 110 g/km CO2</option>
                      <option value="120">Up to 120 g/km CO2</option>
                    </Select>
                  </div>
                </div>
              </div>
            ),
          },
          {
            label: t("driveType"),
            content: "drive-type",
            symbol:<GiCarWheel />,
            render: (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    Drivetrain Configuration
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: "four", label: "Four Wheel Drive" },
                    { id: "front", label: "Front Wheel Drive" },
                    { id: "rear", label: "Rear Wheel Drive" },
                  ].map((option) => (
                    <CustomCheckbox
                      key={option.id}
                      id={option.id}
                      checked={Array.isArray(localFilters.driveType) && localFilters.driveType.includes(option.id)}
                      onChange={() => handleCheckboxChange("driveType", option.id)}
                      label={option.label}
                    />
                  ))}
                </div>
              </div>
            ),
          },
      ].map((section, index) => (
        <FilterSection
          key={index}
          label={section.label}
          content={section.content}
          symbol={section.symbol}
        >
          {section.render}
        </FilterSection>
      ))}
      
      {/* Apply Filters Button */}
      <div className="sticky bottom-0 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent pt-4 pb-6">
        <button
          onClick={handleApplyFilters}
          className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:from-violet-700 hover:to-purple-700 active:scale-[0.98]"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default SidebarFilters;