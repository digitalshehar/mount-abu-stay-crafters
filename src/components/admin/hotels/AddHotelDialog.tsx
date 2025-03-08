
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { NewHotel, SeasonalPrice } from "@/components/admin/hotels/types";
import GeneralInfoTab from "@/components/admin/hotels/tabs/GeneralInfoTab";
import AmenitiesTab from "@/components/admin/hotels/tabs/AmenitiesTab";
import GalleryTab from "@/components/admin/hotels/tabs/GalleryTab";
import RoomsTab from "@/components/admin/hotels/tabs/RoomsTab";
import SeoTab from "@/components/admin/hotels/tabs/SeoTab";

interface AddHotelDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onAddHotel: () => void;
  newHotel: NewHotel;
  setNewHotel: (hotel: NewHotel) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleAmenityToggle: (amenity: string) => void;
  handleRoomChange: (index: number, field: string, value: any) => void;
  handleAddRoom: () => void;
  handleRemoveRoom: (index: number) => void;
  handleImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryToggle: (category: string) => void;
  handleAddCategory: (category: string) => void;
  handleRemoveCategory: (category: string) => void;
  addGalleryImage: (imageUrl: string) => void;
  removeGalleryImage: (index: number) => void;
  handleAddSeasonalPrice: (season: SeasonalPrice) => void;
  handleUpdateSeasonalPrice: (index: number, field: string, value: any) => void;
  handleRemoveSeasonalPrice: (index: number) => void;
}

const AddHotelDialog = ({
  isOpen,
  setIsOpen,
  onAddHotel,
  newHotel,
  setNewHotel,
  handleInputChange,
  handleAmenityToggle,
  handleRoomChange,
  handleAddRoom,
  handleRemoveRoom,
  handleImageUpload,
  handleCategoryToggle,
  handleAddCategory,
  handleRemoveCategory,
  addGalleryImage,
  removeGalleryImage,
  handleAddSeasonalPrice,
  handleUpdateSeasonalPrice,
  handleRemoveSeasonalPrice
}: AddHotelDialogProps) => {
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");

  const validateGeneral = () => {
    const errors: {[key: string]: string} = {};
    
    if (!newHotel.name.trim()) {
      errors.name = "Hotel name is required";
    }
    
    if (!newHotel.location.trim()) {
      errors.location = "Location is required";
    }
    
    if (newHotel.pricePerNight <= 0) {
      errors.pricePerNight = "Price must be greater than 0";
    }
    
    if (!newHotel.image.trim()) {
      errors.image = "Image URL is required";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleNavigateToTab = (nextTab: string) => {
    if (activeTab === "general" && nextTab === "amenities") {
      if (!validateGeneral()) {
        return;
      }
    }
    
    setActiveTab(nextTab);
  };
  
  const handleSubmit = async () => {
    if (!validateGeneral()) {
      setActiveTab("general");
      return;
    }
    
    setIsLoading(true);
    try {
      await onAddHotel();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleSeoInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    switch (name) {
      case "seoTitle":
        setSeoTitle(value);
        break;
      case "seoDescription":
        setSeoDescription(value);
        break;
      case "seoKeywords":
        setSeoKeywords(value);
        break;
      default:
        handleInputChange(e);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Hotel</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new hotel to your inventory.
          </DialogDescription>
        </DialogHeader>
        
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
              newHotel={newHotel}
              handleRoomChange={handleRoomChange}
              handleAddRoom={handleAddRoom}
              handleRemoveRoom={handleRemoveRoom}
              onBack={() => handleNavigateToTab("gallery")}
              onNext={() => handleNavigateToTab("seo")}
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
        
        <DialogFooter className="mt-4">
          <div className="flex justify-between w-full items-center">
            <div className="text-xs text-stone-500">
              {!newHotel.name || !newHotel.location || newHotel.pricePerNight <= 0 || !newHotel.image ? (
                <span className="text-amber-500">* Required fields must be filled</span>
              ) : (
                <span className="text-green-500">✓ All required fields complete</span>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isLoading || !newHotel.name || !newHotel.location || newHotel.pricePerNight <= 0 || !newHotel.image}
              >
                {isLoading ? "Adding..." : "Add Hotel"}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddHotelDialog;
