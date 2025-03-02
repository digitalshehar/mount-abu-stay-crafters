
import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  Star, 
  Filter, 
  SlidersHorizontal, 
  Eye,
  Image,
  Bed,
  Users,
  Utensils,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const AdminHotels = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("general");
  
  // Sample hotel data - would typically come from API
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: "Mount Abu Palace",
      slug: "mount-abu-palace",
      location: "Near Nakki Lake",
      stars: 5,
      pricePerNight: 6500,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1640&ixlib=rb-4.0.3",
      status: "active",
      description: "Luxury hotel with scenic views of Nakki Lake.",
      amenities: ["WiFi", "Swimming Pool", "Restaurant", "Spa", "24/7 Room Service"],
      rooms: [
        { type: "Deluxe", capacity: 2, price: 6500, count: 20 },
        { type: "Suite", capacity: 4, price: 12000, count: 10 },
        { type: "Family Room", capacity: 6, price: 15000, count: 5 }
      ],
      featured: true,
      reviewCount: 247,
      rating: 4.8
    },
    {
      id: 2,
      name: "Sunset View Resort",
      slug: "sunset-view-resort",
      location: "Sunset Point Road",
      stars: 4,
      pricePerNight: 4200,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3",
      status: "active",
      description: "Charming resort with panoramic sunset views.",
      amenities: ["WiFi", "Restaurant", "Garden", "Terrace"],
      rooms: [
        { type: "Standard", capacity: 2, price: 4200, count: 15 },
        { type: "Deluxe", capacity: 3, price: 5500, count: 8 }
      ],
      featured: false,
      reviewCount: 189,
      rating: 4.5
    },
    {
      id: 3,
      name: "Hillview Hotel",
      slug: "hillview-hotel",
      location: "Guru Shikhar Road",
      stars: 3,
      pricePerNight: 2800,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1640&ixlib=rb-4.0.3",
      status: "inactive",
      description: "Budget-friendly hotel with comfortable accommodations.",
      amenities: ["WiFi", "Room Service", "Parking"],
      rooms: [
        { type: "Standard", capacity: 2, price: 2800, count: 20 }
      ],
      featured: false,
      reviewCount: 124,
      rating: 3.9
    },
  ]);

  // Form state for new hotel
  const [newHotel, setNewHotel] = useState({
    name: "",
    location: "",
    stars: 4,
    pricePerNight: 0,
    image: "",
    description: "",
    amenities: ["WiFi"],
    rooms: [{ type: "Standard", capacity: 2, price: 0, count: 1 }],
    featured: false,
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewHotel({
      ...newHotel,
      [name]: type === "checkbox" ? checked : 
              name === "stars" || name === "pricePerNight" ? Number(value) : 
              value
    });
  };

  // Handle amenity changes
  const handleAmenityToggle = (amenity) => {
    if (newHotel.amenities.includes(amenity)) {
      setNewHotel({
        ...newHotel,
        amenities: newHotel.amenities.filter(a => a !== amenity)
      });
    } else {
      setNewHotel({
        ...newHotel,
        amenities: [...newHotel.amenities, amenity]
      });
    }
  };

  // Handle room changes
  const handleRoomChange = (index, field, value) => {
    const updatedRooms = [...newHotel.rooms];
    updatedRooms[index] = {
      ...updatedRooms[index],
      [field]: field === "capacity" || field === "price" || field === "count" ? 
               Number(value) : value
    };
    
    setNewHotel({
      ...newHotel,
      rooms: updatedRooms
    });
  };

  // Add new room
  const handleAddRoom = () => {
    setNewHotel({
      ...newHotel,
      rooms: [...newHotel.rooms, { type: "", capacity: 2, price: 0, count: 1 }]
    });
  };

  // Remove room
  const handleRemoveRoom = (index) => {
    if (newHotel.rooms.length <= 1) {
      toast({
        title: "Cannot remove room",
        description: "At least one room type is required.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedRooms = [...newHotel.rooms];
    updatedRooms.splice(index, 1);
    
    setNewHotel({
      ...newHotel,
      rooms: updatedRooms
    });
  };

  // Handle adding a new hotel
  const handleAddHotel = () => {
    // Auto-generate slug from name
    const slug = newHotel.name.toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    // Validation would happen here in a real application
    const newId = hotels.length > 0 ? Math.max(...hotels.map(hotel => hotel.id)) + 1 : 1;
    
    const hotelToAdd = {
      ...newHotel,
      id: newId,
      slug,
      status: "active",
      reviewCount: 0,
      rating: 0
    };
    
    setHotels([...hotels, hotelToAdd]);
    
    setNewHotel({
      name: "",
      location: "",
      stars: 4,
      pricePerNight: 0,
      image: "",
      description: "",
      amenities: ["WiFi"],
      rooms: [{ type: "Standard", capacity: 2, price: 0, count: 1 }],
      featured: false,
    });
    
    toast({
      title: "Hotel added",
      description: `${newHotel.name} has been added successfully.`,
    });
  };

  // Handle deleting a hotel
  const handleDeleteHotel = (id) => {
    setHotels(hotels.filter(hotel => hotel.id !== id));
    
    toast({
      title: "Hotel deleted",
      description: "The hotel has been deleted successfully.",
      variant: "destructive"
    });
  };

  // Handle toggling hotel status
  const handleToggleHotelStatus = (id) => {
    setHotels(hotels.map(hotel => {
      if (hotel.id === id) {
        const newStatus = hotel.status === "active" ? "inactive" : "active";
        return { ...hotel, status: newStatus };
      }
      return hotel;
    }));
    
    const hotel = hotels.find(h => h.id === id);
    const action = hotel.status === "active" ? "deactivated" : "activated";
    
    toast({
      title: `Hotel ${action}`,
      description: `${hotel.name} has been ${action} successfully.`,
    });
  };

  // Available amenities for selection
  const availableAmenities = [
    "WiFi", "Swimming Pool", "Restaurant", "Spa", "Gym", "Bar", 
    "24/7 Room Service", "Parking", "Laundry", "Pet Friendly", 
    "Air Conditioning", "TV", "Breakfast", "Minibar"
  ];

  // Filter hotels based on search query
  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Hotels</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Add New Hotel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Add New Hotel</DialogTitle>
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
                    <Input 
                      id="image"
                      name="image"
                      value={newHotel.image}
                      onChange={handleInputChange}
                      placeholder="Enter image URL"
                    />
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
                          {/* Default icon for other amenities */}
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
                    <Button variant="outline" size="sm" onClick={handleAddRoom}>
                      <Plus size={16} className="mr-1" /> Add Room Type
                    </Button>
                  </div>
                  
                  {newHotel.rooms.map((room, index) => (
                    <div key={index} className="p-4 border rounded-lg mb-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium">Room Type {index + 1}</h4>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveRoom(index)}>
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
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`price-${index}`}>Price Per Night (₹)*</Label>
                          <Input 
                            id={`price-${index}`}
                            type="number"
                            min="0"
                            value={room.price}
                            onChange={(e) => handleRoomChange(index, 'price', e.target.value)}
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
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between gap-2 mt-4">
                  <Button variant="outline" onClick={() => setActiveTab("amenities")}>Back: Amenities</Button>
                  <DialogClose asChild>
                    <Button 
                      onClick={handleAddHotel}
                      disabled={!newHotel.name || !newHotel.location || newHotel.pricePerNight <= 0}
                    >
                      Add Hotel
                    </Button>
                  </DialogClose>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
            <Input
              placeholder="Search hotels by name or location..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            Filters
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-stone-500 border-b">
                <th className="px-6 py-3 font-medium">Image</th>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Location</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Rating</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHotels.map((hotel) => (
                <tr key={hotel.id} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="px-6 py-4">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name} 
                      className="w-16 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {hotel.name}
                    {hotel.featured && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-stone-600">{hotel.location}</td>
                  <td className="px-6 py-4">₹{hotel.pricePerNight.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="ml-1">{hotel.stars}</span>
                      {hotel.rating > 0 && (
                        <span className="ml-2 text-sm text-stone-500">
                          ({hotel.rating} from {hotel.reviewCount} reviews)
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      hotel.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-stone-100 text-stone-800'
                    }`}>
                      {hotel.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title={hotel.status === 'active' ? 'Deactivate' : 'Activate'}
                        onClick={() => handleToggleHotelStatus(hotel.id)}
                      >
                        {hotel.status === 'active' ? 
                          <X size={16} className="text-amber-500" /> : 
                          <Check size={16} className="text-green-500" />
                        }
                      </Button>
                      <Button variant="ghost" size="icon" title="View">
                        <Eye size={16} className="text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit">
                        <Edit size={16} className="text-amber-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Delete"
                        onClick={() => handleDeleteHotel(hotel.id)}
                      >
                        <Trash size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredHotels.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-stone-500">
                    No hotels found. Try a different search or add a new hotel.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHotels;
