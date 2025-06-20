import mongoose from "mongoose";
const CarSchema = new mongoose.Schema(
  {
    id: Number,
    dealerId: Number,
    userId: String,
    make: { type: mongoose.Schema.Types.ObjectId, ref: "Make", required: true },
    model: { type: mongoose.Schema.Types.ObjectId, ref: "Model", required: true },
    price: Number,
    type: String,
    kms: String,
    fuelType: String,
    fuelTankFillPrice: String,
    fuelCapacityPerTank: String,
    noOfGears: Number,
    cylinder: Number,
    features: [String],
    doors: Number,
    seats: Number,
    gearbox: String,
    engineCapacity: String,
    images: [String],
    video: String,
    sellerComments: String,
    condition: String,
    location: String,
    year: String,
    mileage: String,
    bodyType: String,
    color: String,
    batteryRange: Number,
    chargingTime: Number,
    engineSize: Number,
    enginePower: Number,
    fuelConsumption: Number,
    isFinance: String,
    isLease: { type: Boolean, default: false },
    slug: String,
    co2Emission: Number,
    driveType: String,
    description: String,
    imageUrls: [],
    status: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.models.Car || mongoose.model("Car", CarSchema);