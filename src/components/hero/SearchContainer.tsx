
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search } from "lucide-react";
import SearchTabs from "./SearchTabs";
import HotelSearchForm from "./HotelSearchForm";
import CarSearchForm from "./CarSearchForm";
import BikeSearchForm from "./BikeSearchForm";
import ActivitySearchForm from "./ActivitySearchForm";
import SearchButton from "./SearchButton";
import { validateSearch } from "./HeroUtils";
import { useIsMobile } from "@/hooks/use-mobile";

const SearchContainer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("hotels");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isMobile = useIsMobile();
  
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
        navigate(`/bike-rentals?${searchParams.toString()}`);
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
    
    // Close the sheet on mobile after search
    setIsSheetOpen(false);
    
    // Success toast
    if (searchParams.toString() !== "") {
      toast({
        title: "Search Initiated",
        description: `Searching ${activeTab}...`,
      });
    }
  };

  // Mobile search trigger component
  const MobileSearchTrigger = () => (
    <div className="w-full px-4 md:hidden">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <button 
            className="w-full bg-white rounded-lg px-4 py-3.5 text-left flex items-center shadow-lg"
            aria-label="Open search"
            type="button"
          >
            <Search className="h-5 w-5 text-primary mr-3" />
            <span className="text-stone-500">Where are you going?</span>
          </button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-xl px-4 pt-6 pb-8">
          <div className="h-full overflow-y-auto">
            <SearchTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            
            {activeTab === "hotels" && (
              <div className="mt-4">
                <HotelSearchForm 
                  search={hotelSearch} 
                  setSearch={(newState) => setHotelSearch(newState)}
                />
              </div>
            )}

            {activeTab === "cars" && (
              <div className="mt-4">
                <CarSearchForm 
                  search={carSearch} 
                  setSearch={(newState) => setCarSearch(newState)}
                />
              </div>
            )}

            {activeTab === "bikes" && (
              <div className="mt-4">
                <BikeSearchForm 
                  search={bikeSearch} 
                  setSearch={(newState) => setBikeSearch(newState)}
                />
              </div>
            )}

            {activeTab === "activities" && (
              <div className="mt-4">
                <ActivitySearchForm 
                  search={activitySearch} 
                  setSearch={(newState) => setActivitySearch(newState)}
                />
              </div>
            )}

            <div className="mt-6">
              <button
                type="button"
                onClick={handleSearch}
                className="flex items-center justify-center w-full py-6 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg shadow transition-all text-base"
              >
                <Search className="h-5 w-5 mr-2" />
                Search {activeTab === "hotels" ? "Hotels" : activeTab === "cars" ? "Cars" : activeTab === "bikes" ? "Bikes" : "Activities"}
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );

  // Handle desktop form submission with prevent default
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up animation-delay-400">
      {/* Mobile search trigger */}
      <MobileSearchTrigger />
      
      {/* Desktop search container */}
      <div className="hidden md:block bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg">
        <SearchTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <form onSubmit={handleSubmitForm}>
          {activeTab === "hotels" && (
            <HotelSearchForm search={hotelSearch} setSearch={setHotelSearch} />
          )}

          {activeTab === "cars" && (
            <CarSearchForm 
              search={carSearch} 
              setSearch={setCarSearch} 
            />
          )}

          {activeTab === "bikes" && (
            <BikeSearchForm search={bikeSearch} setSearch={setBikeSearch} />
          )}

          {activeTab === "activities" && (
            <ActivitySearchForm search={activitySearch} setSearch={setActivitySearch} />
          )}

          <SearchButton activeTab={activeTab} handleSearch={handleSearch} />
        </form>
      </div>
    </div>
  );
};

export default SearchContainer;
