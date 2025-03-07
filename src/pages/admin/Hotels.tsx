import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import HotelList from "@/components/admin/hotels/HotelList";
import HotelSearchBar from "@/components/admin/hotels/HotelSearchBar";
import HotelFilterPanel, { FilterOptions } from "@/components/admin/hotels/HotelFilterPanel";
import AddHotelDialog from "@/components/admin/hotels/AddHotelDialog";
import { Room, NewHotel, Hotel } from "@/components/admin/hotels/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const HotelsManagement = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddHotelOpen, setIsAddHotelOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const { toast } = useToast();

  const getMaxPrice = () => {
    if (hotels.length === 0) return 10000;
    return Math.max(...hotels.map(hotel => hotel.pricePerNight)) + 1000;
  };

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    priceRange: [0, getMaxPrice()],
    starRating: [],
    amenities: [],
    maxPrice: getMaxPrice()
  });

  const [newHotel, setNewHotel] = useState<NewHotel>({
    name: "",
    location: "",
    stars: 3,
    pricePerNight: 0,
    image: "",
    description: "",
    amenities: [],
    rooms: [{ type: "Standard", capacity: 2, price: 0, count: 1 }],
    featured: false,
  });

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("hotels")
        .select("*")
        .order("name");

      if (error) throw error;

      const formattedHotels = data.map((hotel: any) => ({
        id: hotel.id,
        name: hotel.name,
        slug: hotel.slug || hotel.name.toLowerCase().replace(/\s+/g, "-"),
        location: hotel.location,
        stars: hotel.stars,
        pricePerNight: hotel.price_per_night,
        image: hotel.image,
        status: hotel.status,
        description: hotel.description || "",
        amenities: hotel.amenities || [],
        featured: hotel.featured || false,
        reviewCount: hotel.review_count || 0,
        rating: hotel.rating || 0,
        rooms: [],
      }));

      setHotels(formattedHotels);
      setFilteredHotels(formattedHotels);
      
      const maxPrice = Math.max(...formattedHotels.map(hotel => hotel.pricePerNight)) + 1000;
      setFilterOptions(prev => ({
        ...prev,
        priceRange: [prev.priceRange[0], maxPrice],
        maxPrice: maxPrice
      }));
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching hotels",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const applyFilters = (hotels: Hotel[]) => {
    if (!hotels.length) return [];
    
    return hotels.filter(hotel => {
      const priceInRange = hotel.pricePerNight >= filterOptions.priceRange[0] && 
                          hotel.pricePerNight <= filterOptions.priceRange[1];
      
      const starMatch = filterOptions.starRating.length === 0 || 
                        filterOptions.starRating.includes(hotel.stars);
      
      const amenitiesMatch = filterOptions.amenities.length === 0 || 
                            filterOptions.amenities.every(amenity => 
                              hotel.amenities.includes(amenity));
      
      return priceInRange && starMatch && amenitiesMatch;
    });
  };

  const applySearchAndFilters = () => {
    let result = [...hotels];
    
    if (searchTerm.trim()) {
      result = result.filter(
        hotel =>
          hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    result = applyFilters(result);
    
    setFilteredHotels(result);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applySearchAndFilters();
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilterOptions(newFilters);
    
    setTimeout(() => {
      applySearchAndFilters();
    }, 0);
  };

  const handleClearFilters = () => {
    const resetFilters = {
      priceRange: [0, getMaxPrice()],
      starRating: [],
      amenities: [],
      maxPrice: getMaxPrice()
    };
    
    setFilterOptions(resetFilters);
    
    setTimeout(() => {
      applySearchAndFilters();
    }, 0);
  };

  useEffect(() => {
    applySearchAndFilters();
  }, [filterOptions]);

  const handleAddHotel = async () => {
    try {
      const slug = newHotel.name.toLowerCase().replace(/\s+/g, "-");

      const hotelData = {
        name: newHotel.name,
        slug: slug,
        location: newHotel.location,
        stars: newHotel.stars,
        price_per_night: newHotel.pricePerNight,
        image: newHotel.image,
        description: newHotel.description,
        amenities: newHotel.amenities,
        featured: newHotel.featured,
        status: "active",
      };

      const { data, error } = await supabase
        .from("hotels")
        .insert(hotelData)
        .select();

      if (error) throw error;

      if (data && data[0]?.id) {
        const hotelId = data[0].id;
        
        const roomsPromises = newHotel.rooms.map(room => {
          return supabase.from("rooms").insert({
            hotel_id: hotelId,
            type: room.type,
            capacity: room.capacity,
            price: room.price,
            count: room.count
          });
        });
        
        await Promise.all(roomsPromises);
      }

      toast({
        title: "Hotel added",
        description: "The hotel has been added successfully",
      });

      setNewHotel({
        name: "",
        location: "",
        stars: 3,
        pricePerNight: 0,
        image: "",
        description: "",
        amenities: [],
        rooms: [{ type: "Standard", capacity: 2, price: 0, count: 1 }],
        featured: false,
      });
      setIsAddHotelOpen(false);
      
      fetchHotels();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error adding hotel",
        description: error.message,
      });
    }
  };

  const handleDeleteHotel = (id: number) => {
    setSelectedHotelId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedHotelId) return;

    try {
      const { error: roomsError } = await supabase
        .from("rooms")
        .delete()
        .eq("hotel_id", selectedHotelId);

      if (roomsError) throw roomsError;

      const { error } = await supabase
        .from("hotels")
        .delete()
        .eq("id", selectedHotelId);

      if (error) throw error;

      toast({
        title: "Hotel deleted",
        description: "The hotel has been deleted successfully",
      });

      fetchHotels();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error deleting hotel",
        description: error.message,
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedHotelId(null);
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      const hotel = hotels.find((h) => h.id === id);
      if (!hotel) return;

      const newStatus = hotel.status === "active" ? "inactive" : "active";

      const { error } = await supabase
        .from("hotels")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Hotel updated",
        description: `Hotel status changed to ${newStatus}`,
      });

      fetchHotels();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating hotel",
        description: error.message,
      });
    }
  };

  const handleToggleFeatured = async (id: number, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from("hotels")
        .update({ featured: !currentValue })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Hotel updated",
        description: currentValue 
          ? "Hotel removed from featured list" 
          : "Hotel added to featured list",
      });

      fetchHotels();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating hotel",
        description: error.message,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setNewHotel({ ...newHotel, [name]: checked });
    } else {
      setNewHotel({ ...newHotel, [name]: value });
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    if (newHotel.amenities.includes(amenity)) {
      setNewHotel({
        ...newHotel,
        amenities: newHotel.amenities.filter((a) => a !== amenity),
      });
    } else {
      setNewHotel({
        ...newHotel,
        amenities: [...newHotel.amenities, amenity],
      });
    }
  };

  const handleRoomChange = (index: number, field: string, value: any) => {
    const updatedRooms = [...newHotel.rooms];
    updatedRooms[index] = {
      ...updatedRooms[index],
      [field]: field === 'capacity' || field === 'price' || field === 'count' 
        ? Number(value) 
        : value,
    };
    setNewHotel({ ...newHotel, rooms: updatedRooms });
  };

  const handleAddRoom = () => {
    setNewHotel({
      ...newHotel,
      rooms: [
        ...newHotel.rooms,
        { type: "Deluxe", capacity: 2, price: 0, count: 1 },
      ],
    });
  };

  const handleRemoveRoom = (index: number) => {
    const updatedRooms = [...newHotel.rooms];
    updatedRooms.splice(index, 1);
    setNewHotel({ ...newHotel, rooms: updatedRooms });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hotel Management</h1>
        <Button onClick={() => setIsAddHotelOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Hotel
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-6">
        <HotelSearchBar 
          searchQuery={searchTerm} 
          setSearchQuery={setSearchTerm} 
          handleFilter={() => setIsFilterPanelOpen(true)} 
          onSearch={handleSearch}
          activeFilters={filterOptions}
          onClearFilters={handleClearFilters}
        />

        <HotelList
          hotels={hotels}
          filteredHotels={filteredHotels}
          onDelete={handleDeleteHotel}
          onToggleStatus={handleToggleStatus}
          onToggleFeatured={handleToggleFeatured}
          isLoading={loading}
        />
      </div>

      <HotelFilterPanel 
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        onApplyFilters={handleFilterChange}
        currentFilters={filterOptions}
      />

      <AddHotelDialog
        isOpen={isAddHotelOpen}
        setIsOpen={setIsAddHotelOpen}
        onAddHotel={handleAddHotel}
        newHotel={newHotel}
        setNewHotel={setNewHotel}
        handleInputChange={handleInputChange}
        handleAmenityToggle={handleAmenityToggle}
        handleRoomChange={handleRoomChange}
        handleAddRoom={handleAddRoom}
        handleRemoveRoom={handleRemoveRoom}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              hotel and all associated rooms.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default HotelsManagement;
