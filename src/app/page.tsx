import BetaBanner from "@/components/BetaBanner";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import HowWorks from "@/components/HowWorks";
import Pricing from "@/components/Pricing";
import SecondComp from "@/components/SecondComp";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <SecondComp />
      <HowWorks />
      {/* <Pricing /> */}
      {/* <Contact /> */}
    </div>
  );
}
