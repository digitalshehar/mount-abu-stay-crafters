
import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { NewHotel, Room, SeasonalPrice } from "@/components/admin/hotels/types";
import GeneralInfoTab from "@/components/admin/hotels/tabs/GeneralInfoTab";
import AmenitiesTab from "@/components/admin/hotels/tabs/AmenitiesTab";
import GalleryTab from "@/components/admin/hotels/tabs/GalleryTab";
import RoomsTab from "@/components/admin/hotels/tabs/RoomsTab";
import SeoTab from "@/components/admin/hotels/tabs/SeoTab";

interface AddHotelTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  newHotel: NewHotel;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleAmenityToggle: (amenity: string) => void;
  handleRoomChange: (index: number, field: keyof Room, value: any) => void;
  handleAddRoom: () => void;
  handleRemoveRoom: (index: number) => void;
  handleImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addGalleryImage: (imageUrl: string) => void;
  removeGalleryImage: (index: number) => void;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  handleSeoInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: () => Promise<void>;
  isLoading: boolean;
  validationErrors: {[key: string]: string};
  handleNavigateToTab: (nextTab: string) => void;
}

const AddHotelTabs = ({
  activeTab,
  setActiveTab,
  newHotel,
  handleInputChange,
  handleAmenityToggle,
  handleRoomChange,
  handleAddRoom,
  handleRemoveRoom,
  handleImageUpload,
  addGalleryImage,
  removeGalleryImage,
  seoTitle,
  seoDescription,
  seoKeywords,
  handleSeoInputChange,
  handleSubmit,
  isLoading,
  validationErrors,
  handleNavigateToTab
}: AddHotelTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-5 mb-6">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="amenities">Amenities</TabsTrigger>
        <TabsTrigger value="gallery">Gallery</TabsTrigger>
        <TabsTrigger value="rooms">Rooms</TabsTrigger>
        <TabsTrigger value="seo">SEO</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        <GeneralInfoTab 
          newHotel={newHotel}
          handleInputChange={handleInputChange}
          validationErrors={validationErrors}
          handleImageUpload={handleImageUpload}
          onNext={() => handleNavigateToTab("amenities")}
        />
      </TabsContent>
      
      <TabsContent value="amenities">
        <AmenitiesTab 
          newHotel={newHotel}
          handleAmenityToggle={handleAmenityToggle}
          onBack={() => handleNavigateToTab("general")}
          onNext={() => handleNavigateToTab("gallery")}
        />
      </TabsContent>
      
      <TabsContent value="gallery">
        <GalleryTab 
          newHotel={newHotel}
          addGalleryImage={addGalleryImage}
          removeGalleryImage={removeGalleryImage}
          onBack={() => handleNavigateToTab("amenities")}
          onNext={() => handleNavigateToTab("rooms")}
        />
      </TabsContent>
      
      <TabsContent value="rooms">
        <RoomsTab 
          rooms={newHotel.rooms}
          handleRoomChange={handleRoomChange}
          handleAddRoom={handleAddRoom}
          handleRemoveRoom={handleRemoveRoom}
          onBack={() => handleNavigateToTab("gallery")}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </TabsContent>

      <TabsContent value="seo">
        <SeoTab 
          seoTitle={seoTitle || newHotel.name}
          seoDescription={seoDescription}
          seoKeywords={seoKeywords}
          handleInputChange={handleSeoInputChange}
          onBack={() => handleNavigateToTab("rooms")}
          onSave={handleSubmit}
        />
      </TabsContent>
    </Tabs>
  );
};

export default AddHotelTabs;
