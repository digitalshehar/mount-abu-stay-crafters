
import React from 'react';
import { Search } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchTabs from "./SearchTabs";
import HotelSearchForm from "./HotelSearchForm";
import CarSearchForm from "./CarSearchForm";
import BikeSearchForm from "./BikeSearchForm";
import ActivitySearchForm from "./ActivitySearchForm";

interface MobileSearchTriggerProps {
  isSheetOpen: boolean;
  setIsSheetOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hotelSearch: { location: string; dates: string; guests: string };
  setHotelSearch: React.Dispatch<React.SetStateAction<{ location: string; dates: string; guests: string }>>;
  carSearch: { location: string; dates: string; type: string };
  setCarSearch: React.Dispatch<React.SetStateAction<{ location: string; dates: string; type: string }>>;
  bikeSearch: { location: string; dates: string; type: string };
  setBikeSearch: React.Dispatch<React.SetStateAction<{ location: string; dates: string; type: string }>>;
  activitySearch: { location: string; date: string; type: string };
  setActivitySearch: React.Dispatch<React.SetStateAction<{ location: string; date: string; type: string }>>;
  handleSearch: () => void;
}

const MobileSearchTrigger: React.FC<MobileSearchTriggerProps> = ({
  isSheetOpen,
  setIsSheetOpen,
  activeTab,
  setActiveTab,
  hotelSearch,
  setHotelSearch,
  carSearch,
  setCarSearch,
  bikeSearch,
  setBikeSearch,
  activitySearch,
  setActivitySearch,
  handleSearch
}) => {
  return (
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
                  setSearch={setHotelSearch}
                />
              </div>
            )}

            {activeTab === "cars" && (
              <div className="mt-4">
                <CarSearchForm 
                  search={carSearch} 
                  setSearch={setCarSearch}
                />
              </div>
            )}

            {activeTab === "bikes" && (
              <div className="mt-4">
                <BikeSearchForm 
                  search={bikeSearch} 
                  setSearch={setBikeSearch}
                />
              </div>
            )}

            {activeTab === "activities" && (
              <div className="mt-4">
                <ActivitySearchForm 
                  search={activitySearch} 
                  setSearch={setActivitySearch}
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
};

export default MobileSearchTrigger;
