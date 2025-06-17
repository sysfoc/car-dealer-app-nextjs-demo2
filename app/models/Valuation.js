import mongoose from "mongoose";

const ValuationSchema = new mongoose.Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    valuationType: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Valuation ||
  mongoose.model("Valuation", ValuationSchema);
