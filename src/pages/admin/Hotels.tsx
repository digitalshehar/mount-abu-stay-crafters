
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Hotel, NewHotel, Room } from "@/components/admin/hotels/types";
import HotelList from "@/components/admin/hotels/HotelList";
import HotelSearchBar from "@/components/admin/hotels/HotelSearchBar";
import AddHotelDialog from "@/components/admin/hotels/AddHotelDialog";

const AdminHotels = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [hotels, setHotels] = useState<Hotel[]>([
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

  const [newHotel, setNewHotel] = useState<NewHotel>({
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewHotel({
      ...newHotel,
      [name]: type === "checkbox" ? checked : 
              name === "stars" || name === "pricePerNight" ? Number(value) : 
              value
    });
  };

  const handleAmenityToggle = (amenity: string) => {
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

  const handleRoomChange = (index: number, field: string, value: any) => {
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

  const handleAddRoom = () => {
    setNewHotel({
      ...newHotel,
      rooms: [...newHotel.rooms, { type: "", capacity: 2, price: 0, count: 1 }]
    });
  };

  const handleRemoveRoom = (index: number) => {
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

  const handleAddHotel = () => {
    const slug = newHotel.name.toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
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

    setIsDialogOpen(false);
  };

  const handleDeleteHotel = (id: number) => {
    setHotels(hotels.filter(hotel => hotel.id !== id));
    
    toast({
      title: "Hotel deleted",
      description: "The hotel has been deleted successfully.",
      variant: "destructive"
    });
  };

  const handleToggleHotelStatus = (id: number) => {
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

  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Hotels</h1>
        
        <AddHotelDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          onAddHotel={handleAddHotel}
          newHotel={newHotel}
          setNewHotel={setNewHotel}
          handleInputChange={handleInputChange}
          handleAmenityToggle={handleAmenityToggle}
          handleRoomChange={handleRoomChange}
          handleAddRoom={handleAddRoom}
          handleRemoveRoom={handleRemoveRoom}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <HotelSearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        
        <HotelList 
          hotels={hotels}
          filteredHotels={filteredHotels}
          onDelete={handleDeleteHotel}
          onToggleStatus={handleToggleHotelStatus}
        />
      </div>
    </div>
  );
};

export default AdminHotels;
