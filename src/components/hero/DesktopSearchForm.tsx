
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import HotelSearchForm from "./HotelSearchForm";
import CarSearchForm from "./CarSearchForm";
import BikeSearchForm from "./BikeSearchForm";
import ActivitySearchForm from "./ActivitySearchForm";

interface DesktopSearchFormProps {
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

const DesktopSearchForm: React.FC<DesktopSearchFormProps> = ({
  activeTab,
  setActiveTab,
  bookingTypes,
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

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="hidden md:block bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg">
      {/* Booking type tabs (Hotels, Homes, Flights, etc.) */}
      <div className="flex overflow-x-auto space-x-1 pb-4 -mx-1 px-1 border-b border-stone-100">
        {bookingTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveTab(type.id)}
            className={cn(
              "flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg flex-1 transition-colors relative",
              activeTab === type.id
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
      
      {/* Stay type toggle (Overnight/Day Use) - Only show for Hotels, Homes */}
      {(activeTab === "hotels" || activeTab === "homes") && (
        <div className="flex space-x-2 mt-4 mb-2">
          <button
            type="button"
            onClick={() => setStayType("overnight")}
            className={cn(
              "px-4 py-2 text-sm rounded-full border",
              stayType === "overnight"
                ? "bg-primary/10 border-primary/30 text-primary font-medium"
                : "border-stone-200 text-stone-600 hover:bg-stone-50"
            )}
          >
            Overnight Stays
          </button>
          <button
            type="button"
            onClick={() => setStayType("dayUse")}
            className={cn(
              "px-4 py-2 text-sm rounded-full border",
              stayType === "dayUse"
                ? "bg-primary/10 border-primary/30 text-primary font-medium"
                : "border-stone-200 text-stone-600 hover:bg-stone-50"
            )}
          >
            Day Use Stays
          </button>
        </div>
      )}
      
      {/* Day use description - shown when day use is selected */}
      {stayType === "dayUse" && (activeTab === "hotels" || activeTab === "homes") && (
        <div className="flex items-center text-sm text-rose-600 mb-4 mt-2">
          <div className="w-5 h-5 mr-2 flex items-center justify-center bg-rose-100 text-rose-600 rounded">
            <span className="font-bold">ⓘ</span>
          </div>
          <p>Day Use Stays are inexpensive, 4-12 hour room rentals that are not overnight. Your check-in and check-out will be on the same date.</p>
        </div>
      )}

      <form onSubmit={handleSubmitForm} className="mt-3">
        {(activeTab === "hotels" || activeTab === "homes" || activeTab === "flightHotel") && (
          <HotelSearchForm 
            search={hotelSearch} 
            setSearch={setHotelSearch}
            stayType={stayType}
          />
        )}

        {activeTab === "cars" && (
          <CarSearchForm 
            search={carSearch} 
            setSearch={setCarSearch} 
          />
        )}

        {activeTab === "bikes" && (
          <BikeSearchForm 
            search={bikeSearch} 
            setSearch={setBikeSearch} 
          />
        )}

        {activeTab === "activities" && (
          <ActivitySearchForm 
            search={activitySearch} 
            setSearch={setActivitySearch} 
          />
        )}

        <div className="flex justify-center mt-6">
          <Button 
            type="submit" 
            className="w-full max-w-xs py-6 text-lg font-medium"
            onClick={handleSearch}
          >
            <Search className="h-5 w-5 mr-2" />
            SEARCH
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DesktopSearchForm;
