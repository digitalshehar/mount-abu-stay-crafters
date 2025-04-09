import React from 'react';
import { Search } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import HotelSearchForm from "./HotelSearchForm";
import CarSearchForm from "./CarSearchForm";
import BikeSearchForm from "./BikeSearchForm";
import ActivitySearchForm from "./ActivitySearchForm";
import { useResponsive } from "@/context/ResponsiveContext";

interface MobileSearchTriggerProps {
  isSheetOpen: boolean;
  setIsSheetOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookingTypes: Array<{id: string, label: string, badge?: string}>;
  stayType: string;
  setStayType: (type: string) => void;
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
  bookingTypes = [], // Default empty array
  stayType,
  setStayType,
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
  const { isMobile } = useResponsive();
  
  // If not on mobile, don't render this component
  if (!isMobile) return null;
  
  // Safe array splitting with null checks and default values
  const firstRowTypes = bookingTypes && bookingTypes.length > 0 
    ? bookingTypes.slice(0, Math.min(4, bookingTypes.length)) 
    : [];
    
  const secondRowTypes = bookingTypes && bookingTypes.length > 4 
    ? bookingTypes.slice(4) 
    : [];

  return (
    <div className="w-full px-4">
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
        <SheetContent side="bottom" className="h-[85vh] rounded-t-xl px-4 pt-6 pb-8">
          <div className="h-full overflow-y-auto">
            {/* Booking type selector */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {firstRowTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveTab(type.id)}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-lg border relative",
                    activeTab === type.id
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "border-stone-200 text-stone-600"
                  )}
                >
                  {type.label}
                  {type.badge && (
                    <span className={cn(
                      "absolute -top-2 -right-2 text-[10px] font-bold px-1.5 py-0.5 rounded",
                      type.badge === "New!" ? "bg-red-500 text-white" : "bg-amber-100 text-amber-800"
                    )}>
                      {type.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            {secondRowTypes.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-6">
                {secondRowTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveTab(type.id)}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-lg border relative",
                      activeTab === type.id
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : "border-stone-200 text-stone-600"
                    )}
                  >
                    {type.label}
                    {type.badge && (
                      <span className={cn(
                        "absolute -top-2 -right-2 text-[10px] font-bold px-1.5 py-0.5 rounded",
                        type.badge === "New!" ? "bg-red-500 text-white" : "bg-amber-100 text-amber-800"
                      )}>
                        {type.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
            
            {/* Stay type toggle - Only show for Hotels, Homes */}
            {(activeTab === "hotels" || activeTab === "homes") && (
              <>
                <div className="flex space-x-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setStayType("overnight")}
                    className={cn(
                      "flex-1 px-4 py-2 text-sm rounded-lg border",
                      stayType === "overnight"
                        ? "bg-primary/10 border-primary/30 text-primary font-medium"
                        : "border-stone-200 text-stone-600"
                    )}
                  >
                    Overnight Stays
                  </button>
                  <button
                    type="button"
                    onClick={() => setStayType("dayUse")}
                    className={cn(
                      "flex-1 px-4 py-2 text-sm rounded-lg border",
                      stayType === "dayUse"
                        ? "bg-primary/10 border-primary/30 text-primary font-medium"
                        : "border-stone-200 text-stone-600"
                    )}
                  >
                    Day Use Stays
                  </button>
                </div>
                
                {stayType === "dayUse" && (
                  <div className="flex items-center text-sm text-rose-600 mb-4">
                    <div className="w-5 h-5 mr-2 flex-shrink-0 flex items-center justify-center bg-rose-100 text-rose-600 rounded">
                      <span className="font-bold">ⓘ</span>
                    </div>
                    <p>Day Use Stays are inexpensive, 4-12 hour room rentals that are not overnight. Your check-in and check-out will be on the same date.</p>
                  </div>
                )}
              </>
            )}
            
            {/* Search forms based on active tab */}
            {(activeTab === "hotels" || activeTab === "homes") && (
              <div className="mt-4">
                <HotelSearchForm 
                  search={hotelSearch} 
                  setSearch={setHotelSearch}
                  stayType={stayType}
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
              <Button
                type="button"
                onClick={handleSearch}
                className="w-full py-6 text-base font-medium"
              >
                <Search className="h-5 w-5 mr-2" />
                SEARCH
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSearchTrigger;
