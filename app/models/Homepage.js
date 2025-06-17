import mongoose from "mongoose";
const homepageSchema = new mongoose.Schema(
  {
    seoTitle: {
      type: String,
      required: false,
    },
    seoDescription: {
      type: String,
      required: false,
    },
    searchSection: {
      heading: String,
      text: String,
    },
    brandSection: {
      heading: String,
      subheading: String,
      items: String,
      status: String,
    },
    listingSection: {
      heading: String,
      subheading: String,
      items: String,
      status: String,
    },
    chooseUs: {
      heading: String,
      first: {
        heading: String,
        description: String,
      },
      second: {
        heading: String,
        description: String,
      },
      third: {
        heading: String,
        description: String,
      },
      fourth: {
        heading: String,
        description: String,
      },
    },
    footer: {
      monday: String,
      tuesday: String,
      wednesday: String,
      thursday: String,
      friday: String,
      saturday: String,
    },
    backgroundImage: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Homepage ||
  mongoose.model("Homepage", homepageSchema);
