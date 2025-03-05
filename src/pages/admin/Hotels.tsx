import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Hotel, NewHotel, Room } from "@/components/admin/hotels/types";
import HotelList from "@/components/admin/hotels/HotelList";
import HotelSearchBar from "@/components/admin/hotels/HotelSearchBar";
import AddHotelDialog from "@/components/admin/hotels/AddHotelDialog";
import { supabase } from "@/integrations/supabase/client";

const AdminHotels = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hotels, setHotels] = useState<Hotel[]>([]);

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

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    setIsLoading(true);
    try {
      const { data: hotelData, error: hotelError } = await supabase
        .from('hotels')
        .select('*');
      
      if (hotelError) throw hotelError;
      
      if (!hotelData || hotelData.length === 0) {
        setHotels([]);
        setIsLoading(false);
        return;
      }
      
      const hotelsWithRooms = await Promise.all(
        hotelData.map(async (hotel) => {
          const { data: roomData, error: roomError } = await supabase
            .from('rooms')
            .select('*')
            .eq('hotel_id', hotel.id);
          
          if (roomError) {
            console.error("Error fetching rooms:", roomError);
            return {
              id: hotel.id,
              name: hotel.name,
              slug: hotel.slug,
              location: hotel.location,
              stars: hotel.stars,
              pricePerNight: parseFloat(hotel.price_per_night.toString()),
              image: hotel.image,
              status: hotel.status as 'active' | 'inactive',
              description: hotel.description || "",
              amenities: hotel.amenities || ["WiFi"],
              featured: hotel.featured || false,
              reviewCount: hotel.review_count || 0,
              rating: parseFloat(hotel.rating?.toString() || "0"),
              rooms: []
            };
          }
          
          const rooms = roomData ? roomData.map(room => ({
            type: room.type,
            capacity: room.capacity,
            price: parseFloat(room.price.toString()),
            count: room.count
          })) : [];
          
          return {
            id: hotel.id,
            name: hotel.name,
            slug: hotel.slug,
            location: hotel.location,
            stars: hotel.stars,
            pricePerNight: parseFloat(hotel.price_per_night.toString()),
            image: hotel.image,
            status: hotel.status as 'active' | 'inactive',
            description: hotel.description || "",
            amenities: hotel.amenities || ["WiFi"],
            featured: hotel.featured || false,
            reviewCount: hotel.review_count || 0,
            rating: parseFloat(hotel.rating?.toString() || "0"),
            rooms
          };
        })
      );
      
      setHotels(hotelsWithRooms as Hotel[]);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      toast({
        title: "Error fetching hotels",
        description: "There was a problem loading the hotel data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image under 5MB",
        variant: "destructive"
      });
      return;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `hotels/${fileName}`;

      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setNewHotel({
        ...newHotel,
        image: urlData.publicUrl
      });

      toast({
        title: "Image uploaded",
        description: "Image has been uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your image. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleAddHotel = async () => {
    if (!newHotel.name || !newHotel.location || newHotel.pricePerNight <= 0 || !newHotel.image) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      });
      return;
    }
    
    const invalidRooms = newHotel.rooms.filter(room => 
      !room.type || room.capacity <= 0 || room.price <= 0 || room.count <= 0
    );
    
    if (invalidRooms.length > 0) {
      toast({
        title: "Invalid room data",
        description: "Please ensure all room types have valid information",
        variant: "destructive"
      });
      return;
    }
    
    let slug = newHotel.name.toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    slug = `${slug}-${Math.random().toString(36).substring(2, 7)}`;
    
    try {
      const { data: hotelData, error: hotelError } = await supabase
        .from('hotels')
        .insert({
          name: newHotel.name,
          slug: slug,
          location: newHotel.location,
          stars: newHotel.stars,
          price_per_night: newHotel.pricePerNight,
          image: newHotel.image,
          status: 'active',
          description: newHotel.description,
          amenities: newHotel.amenities,
          featured: newHotel.featured,
          review_count: 0,
          rating: 0
        })
        .select()
        .single();
      
      if (hotelError) throw hotelError;
      
      const roomPromises = newHotel.rooms.map(room => 
        supabase.from('rooms').insert({
          hotel_id: hotelData.id,
          type: room.type,
          capacity: room.capacity,
          price: room.price,
          count: room.count
        })
      );
      
      await Promise.all(roomPromises);
      
      await fetchHotels();
      
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
      
    } catch (error) {
      console.error("Error adding hotel:", error);
      toast({
        title: "Error adding hotel",
        description: "There was a problem adding the hotel. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteHotel = async (id: number) => {
    try {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setHotels(prevHotels => prevHotels.filter(hotel => hotel.id !== id));
      
      toast({
        title: "Hotel deleted",
        description: "The hotel has been deleted successfully.",
        variant: "destructive"
      });
    } catch (error) {
      console.error("Error deleting hotel:", error);
      toast({
        title: "Error deleting hotel",
        description: "There was a problem deleting the hotel. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleToggleHotelStatus = async (id: number) => {
    try {
      const hotel = hotels.find(h => h.id === id);
      if (!hotel) return;
      
      const newStatus = hotel.status === "active" ? "inactive" : "active";
      
      const { error } = await supabase
        .from('hotels')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      setHotels(prevHotels => prevHotels.map(hotel => {
        if (hotel.id === id) {
          return { ...hotel, status: newStatus as 'active' | 'inactive' };
        }
        return hotel;
      }));
      
      const action = newStatus === "active" ? "activated" : "deactivated";
      
      toast({
        title: `Hotel ${action}`,
        description: `${hotel.name} has been ${action} successfully.`,
      });
    } catch (error) {
      console.error("Error toggling hotel status:", error);
      toast({
        title: "Error updating hotel",
        description: "There was a problem updating the hotel status. Please try again.",
        variant: "destructive"
      });
    }
  };

  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Hotels</h1>
        
        <Button className="gap-2" onClick={() => setIsDialogOpen(true)} type="button">
          <Plus size={16} />
          Add New Hotel
        </Button>
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
          isLoading={isLoading}
        />
      </div>

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
        handleImageUpload={handleImageUpload}
      />
    </div>
  );
};

export default AdminHotels;
