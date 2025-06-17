import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    content: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    map: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Contact ||
  mongoose.model("Contact", contactSchema);
