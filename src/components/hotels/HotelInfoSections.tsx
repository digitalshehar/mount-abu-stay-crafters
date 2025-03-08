
import React from "react";
import HotelInfoMain from "./info/HotelInfoMain";
import HotelFaq from "./info/HotelFaq";
import HotelRegionInfo from "./info/HotelRegionInfo";

const HotelInfoSections = () => {
  return (
    <>
      <HotelInfoMain />
      <HotelRegionInfo />
      <HotelFaq />
    </>
  );
};

export default HotelInfoSections;
