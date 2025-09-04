import React from "react";
import ImageCarousel from "../HomePages/Carousel";
import AdditionalInfo from "../HomePages/AdditionalInfo";
import WhyAdopt from "../HomePages/WhyAdopt";
import FAQ from "../HomePages/FAQ";
import UpcomingEvents from "../HomePages/UpcomingEvents";

function Home() {
  return (
    <div className="Home-pages bg-gray-50 min-h-screen">
      <ImageCarousel />
      <AdditionalInfo />
      <WhyAdopt />
      <UpcomingEvents />
      <FAQ />
    </div>
  );
}

export default Home;
