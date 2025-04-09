
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NewHotel, SeasonalPrice } from "@/components/admin/hotels/types";
import AddHotelTabs from "./dialog/AddHotelTabs";
import AddHotelFooter from "./dialog/AddHotelFooter";

interface AddHotelDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onAddHotel: () => Promise<void>;
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
  isEditing?: boolean;
}

const AddHotelDialog = ({
  isOpen,
  setIsOpen,
  onAddHotel,
  newHotel,
  handleInputChange,
  handleAmenityToggle,
  handleRoomChange,
  handleAddRoom,
  handleRemoveRoom,
  handleImageUpload,
  addGalleryImage,
  removeGalleryImage,
  isEditing = false,
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
      console.error("Error during hotel submission:", error);
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

  const isFormValid = () => {
    return (
      newHotel.name.trim() !== "" &&
      newHotel.location.trim() !== "" &&
      newHotel.pricePerNight > 0 &&
      newHotel.image.trim() !== ""
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Hotel' : 'Add New Hotel'}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Edit the details of this hotel.' 
              : 'Fill in the details below to add a new hotel to your inventory.'}
          </DialogDescription>
        </DialogHeader>
        
        <AddHotelTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          newHotel={newHotel}
          handleInputChange={handleInputChange}
          handleAmenityToggle={handleAmenityToggle}
          handleRoomChange={handleRoomChange}
          handleAddRoom={handleAddRoom}
          handleRemoveRoom={handleRemoveRoom}
          handleImageUpload={handleImageUpload}
          addGalleryImage={addGalleryImage}
          removeGalleryImage={removeGalleryImage}
          seoTitle={seoTitle}
          seoDescription={seoDescription}
          seoKeywords={seoKeywords}
          handleSeoInputChange={handleSeoInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          validationErrors={validationErrors}
          handleNavigateToTab={handleNavigateToTab}
        />
        
        <AddHotelFooter 
          isLoading={isLoading}
          isFormValid={isFormValid()}
          onCancel={() => setIsOpen(false)}
          onSubmit={handleSubmit}
          isEditing={isEditing}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddHotelDialog;
