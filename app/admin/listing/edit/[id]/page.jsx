"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const CarEditPage = ({ params }) => {
  const router = useRouter();
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    description: "",
    price: "",
    type: "",
    kms: "",
    fuelType: "",
    fuelTankFillPrice: "",
    fuelCapacityPerTank: "",
    gearbox: "",
    condition: "",
    location: "",
    modelYear: "",
    mileage: "",
    registerationPlate: "",
    registerationExpire: "",
    unit: "miles",
    bodyType: "",
    color: "",
    driveType: "",
    doors: "",
    seats: "",
    noOfGears: "",
    cylinder: "",
    batteryRange: "",
    chargingTime: "",
    engineSize: "",
    enginePower: "",
    fuelConsumption: "",
    co2Emission: "",
    features: [],
    vehicleFullName: "",
    sellerComments: "",
    images: [],
    imageUrls: [],
    video: "",
    isFinance: "",
    isLease: false,
    slug: "",
  });

  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [jsonData, setJsonData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const res = await fetch(`/api/cars/${id}`, { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          console.log("Fetched Car Data:", data.car);
          setFormData({
            ...data.car,
            images: data.car.imageUrls || [],
            slug: data.car.make.toLowerCase().replace(/\s+/g, "-"),
          });
          setCar(data.car);
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, [id]);

  useEffect(() => {
    const fetchJsonData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/Vehicle make and model data (2).json");
        const data = await response.json();
        setJsonData(data.Sheet1);

        // Extract unique makes
        const uniqueMakes = [...new Set(data.Sheet1.map((item) => item.Maker))];
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
      const makeData = jsonData.find((item) => item.Maker === selectedMake);

      if (makeData && makeData["model "]) {
        // Split models string into array and trim whitespace
        const modelArray = makeData["model "]
          .split(",")
          .map((model) => model.trim());
        setModels(modelArray);
      } else {
        setModels([]);
      }

      setSelectedModel("");
    }
  }, [selectedMake, jsonData]);

  // Update form data when make changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      make: selectedMake,
      model: "", // Reset model when make changes
    }));
  }, [selectedMake]);

  // Update form data when model changes
  useEffect(() => {
    if (selectedModel) {
      setFormData((prev) => ({
        ...prev,
        model: selectedModel,
      }));
    }
  }, [selectedModel]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        features: {
          ...prev.features,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFeatureChange = (e) => {
    const feature = e.target.value;
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === "_id") continue;
      if (key === "images" && formData.images && formData.images.length > 0) {
        formData.images.forEach((image, index) => {
          if (image instanceof File) {
            formDataToSend.append("images", image);
          }
        });
      } else if (key === "video" && formData.video) {
        formDataToSend.append("video", formData.video);
      } else if (key === "features") {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else if (key === "description") {
        formDataToSend.append(key, formData[key] || "");
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const res = await fetch(`/api/cars/${id}`, {
        method: "PATCH",
        body: formDataToSend,
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Car updated successfully:", data);
        alert("Car updated successfully!");
        router.push("/admin/listing/view");
      } else {
        const errorData = await res.json();
        console.error("Failed to update car:", errorData);
        alert(`Failed to update car: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating car:", error);
      alert("An error occurred while updating the car.");
    }
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <section className="my-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Edit Car Listing</h2>
        <Link
          href={"/admin/listing/view"}
          className="rounded-lg bg-blue-500 p-3 text-sm text-white"
        >
          View All
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <Label htmlFor="make">Make:</Label>
            <Select
              id="make"
              name="make"
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
              aria-label="Select Make"
              disabled={loading}
            >
              <option value="">Select Make</option>
              {makes.map((make, index) => (
                <option key={index} value={make}>
                  {make}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="model">Model:</Label>
            <Select
              id="model"
              name="model"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              aria-label="Select Model"
              disabled={!selectedMake || loading}
            >
              <option value="">Select Model</option>
              {models.map((model, index) => (
                <option key={index} value={model}>
                  {model}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="price">Price:</Label>
            <TextInput
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="type">Vehicle Type:</Label>
            <Select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option>Select Type</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Convertible">Convertible</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="fuelType">Fuel Type:</Label>
            <Select
              id="fuelType"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleInputChange}
            >
              <option>Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="kms">Kilometers:</Label>
            <TextInput
              id="kms"
              name="kms"
              value={formData.kms}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="gearbox">Gearbox:</Label>
            <Select
              id="gearbox"
              name="gearbox"
              value={formData.gearbox}
              onChange={handleInputChange}
            >
              <option>Select Gearbox</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="condition">Condition:</Label>
            <Select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
            >
              <option>Select Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="year">Year:</Label>
            <Select
              id="year"
              name="modelYear"
              value={formData.modelYear}
              onChange={handleInputChange}
            >
              <option>Select Year</option>
              {[...Array(20)].map((_, i) => (
                <option key={i} value={2025 - i}>
                  {2025 - i}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <Label htmlFor="fuelTankFillPrice">Fuel Tank Fill Price:</Label>
            <TextInput
              id="fuelTankFillPrice"
              name="fuelTankFillPrice"
              value={formData.fuelTankFillPrice}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="fuelCapacityPerTank">Fuel Capacity Per Tank:</Label>
            <TextInput
              id="fuelCapacityPerTank"
              name="fuelCapacityPerTank"
              value={formData.fuelCapacityPerTank}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="noOfGears">Number of Gears:</Label>
            <TextInput
              id="noOfGears"
              name="noOfGears"
              value={formData.noOfGears}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="cylinder">Cylinder:</Label>
            <TextInput
              id="cylinder"
              name="cylinder"
              value={formData.cylinder}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="batteryRange">Battery Range:</Label>
            <TextInput
              id="batteryRange"
              name="batteryRange"
              value={formData.batteryRange}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="chargingTime">Charging Time:</Label>
            <TextInput
              id="chargingTime"
              name="chargingTime"
              value={formData.chargingTime}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="engineSize">Engine Size:</Label>
            <TextInput
              id="engineSize"
              name="engineSize"
              value={formData.engineSize}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="enginePower">Engine Power:</Label>
            <TextInput
              id="enginePower"
              name="enginePower"
              value={formData.enginePower}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="fuelConsumption">Fuel Consumption:</Label>
            <TextInput
              id="fuelConsumption"
              name="fuelConsumption"
              value={formData.fuelConsumption}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="co2Emission">CO2 Emission:</Label>
            <TextInput
              id="co2Emission"
              name="co2Emission"
              value={formData.co2Emission}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="vehicleFullName">Vehicle Full Name:</Label>
            <TextInput
              id="vehicleFullName"
              name="vehicleFullName"
              value={formData.vehicleFullName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="sellerComments">Seller Comments:</Label>
            <Textarea
              id="sellerComments"
              name="sellerComments"
              value={formData.sellerComments}
              onChange={handleInputChange}
            />
          </div>

          <div className="sm:col-span-1">
            <Label htmlFor="description">Description:</Label>
            <Textarea
              id="description"
              name="description"
              rows={2}
              value={formData.description || ""}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="location">Location:</Label>
            <TextInput
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="mileage">Mileage:</Label>
            <TextInput
              id="mileage"
              name="mileage"
              value={formData.mileage}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="bodyType">Body Type:</Label>
            <TextInput
              id="bodyType"
              name="bodyType"
              value={formData.bodyType}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="color">Color:</Label>
            <TextInput
              id="color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="driveType">Drive Type:</Label>
            <TextInput
              id="driveType"
              name="driveType"
              value={formData.driveType}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="doors">Doors:</Label>
            <TextInput
              id="doors"
              name="doors"
              value={formData.doors}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="seats">Seats:</Label>
            <TextInput
              id="seats"
              name="seats"
              value={formData.seats}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="isFinance">Finance:</Label>
            <TextInput
              id="isFinance"
              name="isFinance"
              value={formData.isFinance}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <Checkbox
              id="isLease"
              name="isLease"
              checked={formData.isLease || false}
              onChange={handleInputChange}
            />
            <Label htmlFor="isLease" className="ml-2">
              Available for Lease
            </Label>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-sm font-semibold">Features:</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {["Air Conditioning", "Bluetooth", "Backup Camera", "Sunroof"].map(
              (feature) => (
                <div key={feature} className="flex items-center">
                  <Checkbox
                    id={feature}
                    value={feature}
                    checked={formData.features.includes(feature)}
                    onChange={handleFeatureChange}
                  />
                  <Label htmlFor={feature} className="ml-2">
                    {feature}
                  </Label>
                </div>
              ),
            )}
          </div>
        </div>
        <div className="mt-5">
          <Label>Existing Images:</Label>
          <div className="flex gap-2">
            {formData.images &&
            Array.isArray(formData.images) &&
            formData.images.length > 0 ? (
              formData.images.map((image, index) => (
                <Image
                  key={index}
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt={`Car Image ${index}`}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              ))
            ) : (
              <p>No images available.</p>
            )}
          </div>
        </div>

        <div className="mt-5">
          <Label>Existing Video:</Label>
          {formData.video && (
            <video controls width="300" className="mt-2">
              <source src={formData.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <div className="mt-5">
          <Label htmlFor="images">Upload Images:</Label>
          <FileInput
            id="images"
            name="images"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setFormData((prev) => ({ ...prev, images: files }));
            }}
          />
        </div>

        <div className="mt-5">
          <Label htmlFor="video">Upload Video:</Label>
          <FileInput
            id="video"
            name="video"
            onChange={(e) => {
              const file = e.target.files[0];
              setFormData((prev) => ({ ...prev, video: file }));
            }}
          />
        </div>

        <div className="mt-5">
          <Button type="submit">Update Car</Button>
        </div>
      </form>
    </section>
  );
};

export default CarEditPage;
