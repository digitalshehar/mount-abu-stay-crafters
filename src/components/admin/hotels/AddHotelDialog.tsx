import React, { useState } from "react";
import { Plus, Check, X, Wifi, Droplets, Coffee, Utensils, Upload, HelpCircle, Camera, Trash, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Room, NewHotel } from "@/components/admin/hotels/types";

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
}: AddHotelDialogProps) => {
  const [activeTab, setActiveTab] = useState("general");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [newGalleryImage, setNewGalleryImage] = useState("");

  const availableAmenities = [
    "WiFi", "Swimming Pool", "Restaurant", "Spa", "Gym", "Bar", 
    "24/7 Room Service", "Parking", "Laundry", "Pet Friendly", 
    "Air Conditioning", "TV", "Breakfast", "Minibar", "Balcony",
    "Ocean View", "Mountain View", "Airport Shuttle", "Concierge Service"
  ];

  const locationSuggestions = [
    "Mumbai", "Delhi", "Bangalore", "Goa", "Jaipur", 
    "Chennai", "Kolkata", "Hyderabad", "Udaipur", "Kochi"
  ];

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
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewHotel({ ...newHotel, image: value });
    
    if (value.trim()) {
      setPreviewImage(value);
    } else {
      setPreviewImage(null);
    }
  };
  
  const handleLocationSelect = (location: string) => {
    setNewHotel({ ...newHotel, location });
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

  const handleAddGalleryImage = () => {
    if (newGalleryImage.trim()) {
      if (!newHotel.gallery.includes(newGalleryImage)) {
        setNewHotel({
          ...newHotel,
          gallery: [...newHotel.gallery, newGalleryImage]
        });
        setNewGalleryImage("");
      } else {
        alert("This image is already in the gallery");
      }
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    const updatedGallery = [...newHotel.gallery];
    updatedGallery.splice(index, 1);
    setNewHotel({
      ...newHotel,
      gallery: updatedGallery
    });
  };

  const roomPriceAnalysis = (roomType: string, price: number) => {
    const basePrice = newHotel.pricePerNight;
    if (price < basePrice * 0.7) {
      return "Low price compared to base rate";
    } else if (price > basePrice * 1.5) {
      return "High price compared to base rate";
    }
    return "Price is within normal range";
  };
  
  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "WiFi": return <Wifi className="h-5 w-5 text-stone-500" />;
      case "Swimming Pool": return <Droplets className="h-5 w-5 text-stone-500" />;
      case "Restaurant": return <Utensils className="h-5 w-5 text-stone-500" />;
      case "Breakfast": return <Coffee className="h-5 w-5 text-stone-500" />;
      default: return <Check className="h-5 w-5 text-stone-500" />;
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
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="name" className={validationErrors.name ? "text-red-500" : ""}>
                    Hotel Name*
                  </Label>
                  {validationErrors.name && (
                    <span className="text-xs text-red-500">{validationErrors.name}</span>
                  )}
                </div>
                <Input 
                  id="name"
                  name="name"
                  value={newHotel.name}
                  onChange={handleInputChange}
                  placeholder="Enter hotel name"
                  className={validationErrors.name ? "border-red-500" : ""}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="location" className={validationErrors.location ? "text-red-500" : ""}>
                    Location*
                  </Label>
                  {validationErrors.location && (
                    <span className="text-xs text-red-500">{validationErrors.location}</span>
                  )}
                </div>
                <div className="relative">
                  <Input 
                    id="location"
                    name="location"
                    value={newHotel.location}
                    onChange={handleInputChange}
                    placeholder="Enter location"
                    className={validationErrors.location ? "border-red-500" : ""}
                    required
                  />
                  {newHotel.location === "" && (
                    <div className="mt-1">
                      <div className="text-xs text-stone-500 mb-1">Popular locations:</div>
                      <div className="flex flex-wrap gap-1">
                        {locationSuggestions.slice(0, 5).map((location) => (
                          <button
                            key={location}
                            type="button"
                            onClick={() => handleLocationSelect(location)}
                            className="px-2 py-1 text-xs bg-stone-100 rounded hover:bg-stone-200"
                          >
                            {location}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="pricePerNight" className={validationErrors.pricePerNight ? "text-red-500" : ""}>
                    Base Price Per Night (₹)*
                  </Label>
                  {validationErrors.pricePerNight && (
                    <span className="text-xs text-red-500">{validationErrors.pricePerNight}</span>
                  )}
                </div>
                <Input 
                  id="pricePerNight"
                  name="pricePerNight"
                  type="number"
                  value={newHotel.pricePerNight}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  min="1"
                  className={validationErrors.pricePerNight ? "border-red-500" : ""}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <Label htmlFor="stars">Star Rating*</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-stone-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">Star rating affects pricing expectations and search filters.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <select
                  id="stars"
                  name="stars"
                  value={newHotel.stars}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-stone-200 px-3 py-2"
                  required
                >
                  <option value={1}>1 Star</option>
                  <option value={2}>2 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={5}>5 Stars</option>
                </select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="image" className={validationErrors.image ? "text-red-500" : ""}>
                    Main Image URL*
                  </Label>
                  {validationErrors.image && (
                    <span className="text-xs text-red-500">{validationErrors.image}</span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Input 
                    id="image"
                    name="image"
                    value={newHotel.image}
                    onChange={handleImageChange}
                    placeholder="Enter image URL"
                    className={`flex-1 ${validationErrors.image ? "border-red-500" : ""}`}
                    required
                  />
                  {handleImageUpload && (
                    <div className="relative">
                      <Input
                        type="file"
                        id="image-upload"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        accept="image/*"
                      />
                      <Button type="button" variant="outline" className="h-10">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  )}
                </div>
                
                {(previewImage || newHotel.image) && (
                  <div className="mt-2 relative">
                    <div className="h-[150px] rounded-md overflow-hidden border border-stone-200">
                      <img 
                        src={previewImage || newHotel.image} 
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  name="description"
                  value={newHotel.description}
                  onChange={handleInputChange}
                  placeholder="Enter hotel description"
                  rows={4}
                />
                {newHotel.description && (
                  <div className="flex justify-between text-xs text-stone-500">
                    <span>{newHotel.description.length} characters</span>
                    <span>{250 - newHotel.description.length} characters remaining</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-1 md:col-span-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={newHotel.featured}
                    onChange={handleInputChange}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="featured">Feature this hotel on the homepage</Label>
                </div>
                <p className="text-xs text-stone-500 ml-6">Featured hotels receive more visibility and appear in special sections.</p>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => handleNavigateToTab("amenities")}>Next: Amenities</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="amenities" className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="block">Select Amenities</Label>
                <span className="text-sm text-stone-500">
                  {newHotel.amenities.length} selected
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {availableAmenities.map((amenity) => (
                  <div 
                    key={amenity}
                    className={`
                      relative flex items-center px-3 py-2 rounded-lg border cursor-pointer
                      ${newHotel.amenities.includes(amenity) ? 'border-primary bg-primary/5' : 'border-stone-200'}
                    `}
                    onClick={() => handleAmenityToggle(amenity)}
                  >
                    <div className="mr-3">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span>{amenity}</span>
                    {newHotel.amenities.includes(amenity) && (
                      <div className="absolute right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                        <Check className="text-white w-3 h-3" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {newHotel.amenities.length > 0 && (
                <div className="mt-4 p-4 border border-stone-200 rounded-lg bg-stone-50">
                  <h4 className="text-sm font-medium mb-2">Selected Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {newHotel.amenities.map((amenity) => (
                      <div 
                        key={amenity}
                        className="bg-white px-2 py-1 rounded border border-stone-200 text-sm flex items-center"
                      >
                        {amenity}
                        <button 
                          type="button" 
                          onClick={() => handleAmenityToggle(amenity)}
                          className="ml-1.5 text-stone-400 hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-between gap-2 mt-4">
              <Button variant="outline" onClick={() => handleNavigateToTab("general")}>Back: General</Button>
              <Button variant="outline" onClick={() => handleNavigateToTab("gallery")}>Next: Gallery</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="gallery" className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Images className="h-5 w-5 text-primary" />
                  <Label className="text-lg font-medium">Photo Gallery</Label>
                </div>
                <span className="text-sm text-stone-500">
                  {newHotel.gallery.length} photos
                </span>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-stone-600 mb-2">
                  Add additional photos to showcase your hotel. The main image you added in the general tab will be shown first.
                </p>
                
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Enter image URL"
                    value={newGalleryImage}
                    onChange={(e) => setNewGalleryImage(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleAddGalleryImage}
                    disabled={!newGalleryImage.trim()}
                    type="button"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
                
                {newHotel.gallery.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {newHotel.gallery.map((image, index) => (
                      <div key={index} className="relative group rounded-md overflow-hidden border border-stone-200">
                        <img 
                          src={image} 
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-40 object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder.svg";
                          }}
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button 
                            variant="destructive" 
                            size="icon"
                            onClick={() => handleRemoveGalleryImage(index)}
                            className="h-8 w-8"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 bg-stone-50 border border-dashed border-stone-200 rounded-lg text-center">
                    <Camera className="h-10 w-10 text-stone-400 mx-auto mb-2" />
                    <p className="text-stone-500">No gallery images added yet</p>
                    <p className="text-xs text-stone-400 mt-1">Add URLs to showcase your hotel with multiple photos</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between gap-2 mt-4">
              <Button variant="outline" onClick={() => handleNavigateToTab("amenities")}>Back: Amenities</Button>
              <Button variant="outline" onClick={() => handleNavigateToTab("rooms")}>Next: Rooms</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="rooms" className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-4">
                <Label>Room Types</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddRoom}
                  type="button"
                >
                  <Plus size={16} className="mr-1" /> Add Room Type
                </Button>
              </div>
              
              <div className="flex justify-end mb-4">
                <Button 
                  onClick={handleSubmit}
                  disabled={isLoading || !newHotel.name || !newHotel.location || newHotel.pricePerNight <= 0 || !newHotel.image}
                  type="button"
                >
                  {isLoading ? "Adding..." : "Add Hotel"}
                </Button>
              </div>
              
              <div className="max-h-[400px] overflow-y-auto">
                {newHotel.rooms.map((room, index) => (
                  <div key={index} className="p-4 border rounded-lg mb-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium">Room Type {index + 1}</h4>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveRoom(index)}
                        type="button"
                        disabled={newHotel.rooms.length === 1}
                      >
                        <X size={18} className="text-red-500" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`roomType-${index}`}>Room Type*</Label>
                        <select
                          id={`roomType-${index}`}
                          value={room.type}
                          onChange={(e) => handleRoomChange(index, 'type', e.target.value)}
                          className="w-full rounded-md border border-stone-200 px-3 py-2"
                        >
                          <option value="Standard">Standard</option>
                          <option value="Deluxe">Deluxe</option>
                          <option value="Suite">Suite</option>
                          <option value="Family">Family</option>
                          <option value="Executive">Executive</option>
                          <option value="Presidential">Presidential</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`capacity-${index}`}>Capacity (Guests)*</Label>
                        <Input 
                          id={`capacity-${index}`}
                          type="number"
                          min="1"
                          value={room.capacity}
                          onChange={(e) => handleRoomChange(index, 'capacity', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`price-${index}`}>Price Per Night (₹)*</Label>
                        <Input 
                          id={`price-${index}`}
                          type="number"
                          min="1"
                          value={room.price}
                          onChange={(e) => handleRoomChange(index, 'price', e.target.value)}
                          required
                        />
                        {room.price > 0 && (
                          <p className="text-xs text-stone-500">
                            {roomPriceAnalysis(room.type, room.price)}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`count-${index}`}>Number of Rooms*</Label>
                        <Input 
                          id={`count-${index}`}
                          type="number"
                          min="1"
                          value={room.count}
                          onChange={(e) => handleRoomChange(index, 'count', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between gap-2 mt-4">
              <Button variant="outline" onClick={() => handleNavigateToTab("gallery")}>Back: Gallery</Button>
              <Button 
                onClick={handleSubmit}
                disabled={isLoading || !newHotel.name || !newHotel.location || newHotel.pricePerNight <= 0 || !newHotel.image}
                type="button"
              >
                {isLoading ? "Adding..." : "Add Hotel"}
              </Button>
            </div>
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
