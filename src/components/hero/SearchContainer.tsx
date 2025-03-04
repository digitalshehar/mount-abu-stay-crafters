
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import SearchTabs from "./SearchTabs";
import HotelSearchForm from "./HotelSearchForm";
import CarSearchForm from "./CarSearchForm";
import BikeSearchForm from "./BikeSearchForm";
import ActivitySearchForm from "./ActivitySearchForm";
import SearchButton from "./SearchButton";
import { validateSearch } from "./HeroUtils";

const SearchContainer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("hotels");
  
  // Search form state
  const [hotelSearch, setHotelSearch] = useState({
    location: "",
    dates: "",
    guests: ""
  });
  
  const [carSearch, setCarSearch] = useState({
    location: "",
    dates: "",
    type: ""
  });
  
  const [bikeSearch, setBikeSearch] = useState({
    location: "",
    dates: "",
    type: ""
  });
  
  const [activitySearch, setActivitySearch] = useState({
    location: "",
    date: "",
    type: ""
  });

  const handleSearch = () => {
    // Prepare search parameters based on active tab
    let searchParams = new URLSearchParams();
    
    switch(activeTab) {
      case "hotels":
        if (hotelSearch.location) searchParams.append("location", hotelSearch.location);
        if (hotelSearch.dates) searchParams.append("dates", hotelSearch.dates);
        if (hotelSearch.guests) searchParams.append("guests", hotelSearch.guests);
        
        // Validate and navigate
        if (!validateSearch(searchParams, toast)) return;
        navigate(`/hotels?${searchParams.toString()}`);
        break;
        
      case "cars":
        if (carSearch.location) searchParams.append("location", carSearch.location);
        if (carSearch.dates) searchParams.append("dates", carSearch.dates);
        if (carSearch.type) searchParams.append("type", carSearch.type);
        
        // Validate and navigate
        if (!validateSearch(searchParams, toast)) return;
        navigate(`/rentals/car?${searchParams.toString()}`);
        break;
        
      case "bikes":
        if (bikeSearch.location) searchParams.append("location", bikeSearch.location);
        if (bikeSearch.dates) searchParams.append("dates", bikeSearch.dates);
        if (bikeSearch.type) searchParams.append("type", bikeSearch.type);
        
        // Validate and navigate
        if (!validateSearch(searchParams, toast)) return;
        navigate(`/rentals/bike?${searchParams.toString()}`);
        break;
        
      case "activities":
        if (activitySearch.location) searchParams.append("location", activitySearch.location);
        if (activitySearch.date) searchParams.append("date", activitySearch.date);
        if (activitySearch.type) searchParams.append("type", activitySearch.type);
        
        // Validate and navigate
        if (!validateSearch(searchParams, toast)) return;
        navigate(`/adventures?${searchParams.toString()}`);
        break;
    }
    
    // Success toast
    if (searchParams.toString() !== "") {
      toast({
        title: "Search Initiated",
        description: `Searching ${activeTab}...`,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg animate-fade-in-up animation-delay-400">
      <SearchTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "hotels" && (
        <HotelSearchForm search={hotelSearch} setSearch={setHotelSearch} />
      )}

      {activeTab === "cars" && (
        <CarSearchForm search={carSearch} setSearch={setCarSearch} />
      )}

      {activeTab === "bikes" && (
        <BikeSearchForm search={bikeSearch} setSearch={setBikeSearch} />
      )}

      {activeTab === "activities" && (
        <ActivitySearchForm search={activitySearch} setSearch={setActivitySearch} />
      )}

      <SearchButton activeTab={activeTab} handleSearch={handleSearch} />
    </div>
  );
};

export default SearchContainer;
