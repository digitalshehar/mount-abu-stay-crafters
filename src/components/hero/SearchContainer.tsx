
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import { validateSearch } from "./HeroUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileSearchTrigger from "./MobileSearchTrigger";
import DesktopSearchForm from "./DesktopSearchForm";

const SearchContainer = () => {
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  const [activeTab, setActiveTab] = useState("hotels");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Updated booking types - removed Flight + Hotel and Airport transfer
  const bookingTypes = [
    { id: "hotels", label: "Hotels" },
    { id: "homes", label: "Homes & Apts" },
    { id: "flights", label: "Flights" },
    { id: "activities", label: "Activities", badge: "New!" },
    { id: "cars", label: "Cars" },
    { id: "bikes", label: "Bikes" }
  ];
  
  // Stay types
  const [stayType, setStayType] = useState("overnight");
  
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
        if (stayType) searchParams.append("stayType", stayType);
        
        // Validate and navigate
        if (!validateSearch(searchParams, uiToast)) return;
        navigate(`/hotels?${searchParams.toString()}`);
        break;
        
      case "homes":
        if (hotelSearch.location) searchParams.append("location", hotelSearch.location);
        if (hotelSearch.dates) searchParams.append("dates", hotelSearch.dates);
        if (hotelSearch.guests) searchParams.append("guests", hotelSearch.guests);
        
        // Validate and navigate
        if (!validateSearch(searchParams, uiToast)) return;
        navigate(`/hotels?type=apartment&${searchParams.toString()}`);
        break;
        
      case "flights":
        if (hotelSearch.location) searchParams.append("destination", hotelSearch.location);
        if (hotelSearch.dates) searchParams.append("dates", hotelSearch.dates);
        
        // Validate and navigate
        if (!validateSearch(searchParams, uiToast)) return;
        navigate(`/flights?${searchParams.toString()}`);
        break;
        
      case "cars":
        if (carSearch.location) searchParams.append("location", carSearch.location);
        if (carSearch.dates) searchParams.append("dates", carSearch.dates);
        if (carSearch.type) searchParams.append("type", carSearch.type);
        
        // Validate and navigate
        if (!validateSearch(searchParams, uiToast)) return;
        navigate(`/rentals/car?${searchParams.toString()}`);
        break;
        
      case "bikes":
        if (bikeSearch.location) searchParams.append("location", bikeSearch.location);
        if (bikeSearch.dates) searchParams.append("dates", bikeSearch.dates);
        if (bikeSearch.type) searchParams.append("type", bikeSearch.type);
        
        // Validate and navigate
        if (!validateSearch(searchParams, uiToast)) return;
        navigate(`/bike-rentals?${searchParams.toString()}`);
        break;
        
      case "activities":
        if (activitySearch.location) searchParams.append("location", activitySearch.location);
        if (activitySearch.date) searchParams.append("date", activitySearch.date);
        if (activitySearch.type) searchParams.append("type", activitySearch.type);
        
        // Validate and navigate
        if (!validateSearch(searchParams, uiToast)) return;
        navigate(`/adventures?${searchParams.toString()}`);
        break;
    }
    
    // Close the sheet on mobile after search
    setIsSheetOpen(false);
    
    // Success toast
    if (searchParams.toString() !== "") {
      toast.success(`Searching ${activeTab}...`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up animation-delay-400">
      {/* Mobile search trigger */}
      <MobileSearchTrigger 
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookingTypes={bookingTypes}
        stayType={stayType}
        setStayType={setStayType}
        hotelSearch={hotelSearch}
        setHotelSearch={setHotelSearch}
        carSearch={carSearch}
        setCarSearch={setCarSearch}
        bikeSearch={bikeSearch}
        setBikeSearch={setBikeSearch}
        activitySearch={activitySearch}
        setActivitySearch={setActivitySearch}
        handleSearch={handleSearch}
      />
      
      {/* Desktop search container */}
      <DesktopSearchForm
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookingTypes={bookingTypes}
        stayType={stayType}
        setStayType={setStayType}
        hotelSearch={hotelSearch}
        setHotelSearch={setHotelSearch}
        carSearch={carSearch}
        setCarSearch={setCarSearch}
        bikeSearch={bikeSearch}
        setBikeSearch={setBikeSearch}
        activitySearch={activitySearch}
        setActivitySearch={setActivitySearch}
        handleSearch={handleSearch}
      />
    </div>
  );
};

export default SearchContainer;
