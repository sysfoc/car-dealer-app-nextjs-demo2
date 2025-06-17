import mongoose from "mongoose";

const SocialMediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  icon: { type: String, required: true },
  order: { type: Number, required: true },
});

export default mongoose.models.SocialMedia ||
  mongoose.model("SocialMedia", SocialMediaSchema);
