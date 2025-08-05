import HeroSection from "./Herosection";
import Homepage from "../models/Homepage";
import connectDB from "../lib/mongodb";


export default async function HomePage() {
  await connectDB();

  const homepage = await Homepage.findOne().lean();

  return (
    <>
      <HeroSection heading={homepage?.searchSection?.mainHeading || ""} />
      </>
  );
}
