
import React from 'react';
import SearchTabs from "./SearchTabs";
import HotelSearchForm from "./HotelSearchForm";
import CarSearchForm from "./CarSearchForm";
import BikeSearchForm from "./BikeSearchForm";
import ActivitySearchForm from "./ActivitySearchForm";
import SearchButton from "./SearchButton";

interface DesktopSearchFormProps {
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

const DesktopSearchForm: React.FC<DesktopSearchFormProps> = ({
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

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="hidden md:block bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg">
      <SearchTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <form onSubmit={handleSubmitForm}>
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
      </form>
    </div>
  );
};

export default DesktopSearchForm;
