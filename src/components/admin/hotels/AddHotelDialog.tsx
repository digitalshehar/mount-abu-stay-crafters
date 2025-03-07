
import React, { useState } from "react";
import { Plus, Check, X, Wifi, Droplets, Coffee, Utensils, Upload } from "lucide-react";
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
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  
  const availableAmenities = [
    "WiFi", "Swimming Pool", "Restaurant", "Spa", "Gym", "Bar", 
    "24/7 Room Service", "Parking", "Laundry", "Pet Friendly", 
    "Air Conditioning", "TV", "Breakfast", "Minibar"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add New Hotel</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new hotel to your inventory.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="general">General Information</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="rooms">Rooms & Pricing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="name">Hotel Name*</Label>
                <Input 
                  id="name"
                  name="name"
                  value={newHotel.name}
                  onChange={handleInputChange}
                  placeholder="Enter hotel name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location*</Label>
                <Input 
                  id="location"
                  name="location"
                  value={newHotel.location}
                  onChange={handleInputChange}
                  placeholder="Enter location"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pricePerNight">Base Price Per Night (₹)*</Label>
                <Input 
                  id="pricePerNight"
                  name="pricePerNight"
                  type="number"
                  value={newHotel.pricePerNight}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  min="1"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stars">Star Rating*</Label>
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
              
              <div className="space-y-2">
                <Label htmlFor="image">Main Image URL*</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="image"
                    name="image"
                    value={newHotel.image}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                    className="flex-1"
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
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  name="description"
                  value={newHotel.description}
                  onChange={handleInputChange}
                  placeholder="Enter hotel description"
                  rows={4}
                />
              </div>
              
              <div className="space-y-1 col-span-2">
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
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setActiveTab("amenities")}>Next: Amenities</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="amenities" className="space-y-4">
            <div>
              <Label className="block mb-3">Select Amenities</Label>
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
                      {amenity === "WiFi" && <Wifi className="h-5 w-5 text-stone-500" />}
                      {amenity === "Swimming Pool" && <Droplets className="h-5 w-5 text-stone-500" />}
                      {amenity === "Restaurant" && <Utensils className="h-5 w-5 text-stone-500" />}
                      {amenity === "Breakfast" && <Coffee className="h-5 w-5 text-stone-500" />}
                      {!["WiFi", "Swimming Pool", "Restaurant", "Breakfast"].includes(amenity) && 
                        <Check className="h-5 w-5 text-stone-500" />}
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
            </div>
            
            <div className="flex justify-between gap-2 mt-4">
              <Button variant="outline" onClick={() => setActiveTab("general")}>Back: General</Button>
              <Button variant="outline" onClick={() => setActiveTab("rooms")}>Next: Rooms</Button>
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
              
              {/* Add Hotel button at the top of the rooms tab */}
              <div className="flex justify-end mb-4">
                <Button 
                  onClick={onAddHotel}
                  disabled={!newHotel.name || !newHotel.location || newHotel.pricePerNight <= 0 || !newHotel.image}
                  type="button"
                >
                  Add Hotel
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
                      >
                        <X size={18} className="text-red-500" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`roomType-${index}`}>Room Type*</Label>
                        <Input 
                          id={`roomType-${index}`}
                          value={room.type}
                          onChange={(e) => handleRoomChange(index, 'type', e.target.value)}
                          placeholder="e.g. Standard, Deluxe, Suite"
                          required
                        />
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
              <Button variant="outline" onClick={() => setActiveTab("amenities")}>Back: Amenities</Button>
              <Button 
                onClick={onAddHotel}
                disabled={!newHotel.name || !newHotel.location || newHotel.pricePerNight <= 0 || !newHotel.image}
                type="button"
              >
                Add Hotel
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddHotelDialog;
