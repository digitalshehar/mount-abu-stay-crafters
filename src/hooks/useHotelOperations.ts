
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Hotel, NewHotel, SeasonalPrice } from "@/components/admin/hotels/types";

export const useHotelOperations = (fetchHotels: () => Promise<void>) => {
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddHotel = async (newHotel: NewHotel) => {
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
        gallery: newHotel.gallery,
        categories: newHotel.categories,
        status: "active",
      };

      const { data, error } = await supabase
        .from("hotels")
        .insert(hotelData)
        .select();

      if (error) throw error;

      if (data && data[0]?.id) {
        const hotelId = data[0].id;
        
        // Add rooms
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
        
        // Add seasonal pricing if any
        if (newHotel.seasonalPricing && newHotel.seasonalPricing.length > 0) {
          const seasonalPricingPromises = newHotel.seasonalPricing.map(season => {
            // Using RPC to avoid type errors
            return supabase.rpc('insert_seasonal_pricing', {
              p_hotel_id: hotelId,
              p_name: season.name,
              p_start_date: season.startDate,
              p_end_date: season.endDate,
              p_price_multiplier: season.priceMultiplier
            });
          });
          
          await Promise.all(seasonalPricingPromises);
        }
      }

      toast({
        title: "Hotel added",
        description: "The hotel has been added successfully",
      });

      fetchHotels();
      return true;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error adding hotel",
        description: error.message,
      });
      return false;
    }
  };

  const handleDeleteHotel = (id: number) => {
    setSelectedHotelId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedHotelId) return;

    try {
      // Delete seasonal pricing if any - using rpc to avoid type errors
      await supabase.rpc('delete_seasonal_pricing_by_hotel', {
        p_hotel_id: selectedHotelId
      });

      // Delete rooms
      const { error: roomsError } = await supabase
        .from("rooms")
        .delete()
        .eq("hotel_id", selectedHotelId);

      if (roomsError) throw roomsError;

      // Delete hotel
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

  const handleToggleStatus = async (id: number, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";

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
  
  const handleBulkAction = async (actionType: string, hotelIds: number[]) => {
    if (!hotelIds.length) return;
    
    try {
      switch (actionType) {
        case 'delete':
          // First delete associated rooms and seasonal pricing for all hotels
          for (const id of hotelIds) {
            // Delete seasonal pricing if any - using rpc
            await supabase.rpc('delete_seasonal_pricing_by_hotel', {
              p_hotel_id: id
            });
              
            await supabase
              .from("rooms")
              .delete()
              .eq("hotel_id", id);
          }
          
          // Then delete the hotels
          const { error } = await supabase
            .from("hotels")
            .delete()
            .in("id", hotelIds);
            
          if (error) throw error;
          
          toast({
            title: "Hotels deleted",
            description: `${hotelIds.length} hotels have been deleted`,
          });
          break;
          
        case 'toggleStatus':
          // Get current statuses
          const { data } = await supabase
            .from("hotels")
            .select("id, status")
            .in("id", hotelIds);
            
          if (!data) return;
          
          // Update each hotel with the opposite status
          for (const hotel of data) {
            const newStatus = hotel.status === "active" ? "inactive" : "active";
            await supabase
              .from("hotels")
              .update({ status: newStatus })
              .eq("id", hotel.id);
          }
          
          toast({
            title: "Hotels updated",
            description: `Status changed for ${hotelIds.length} hotels`,
          });
          break;
          
        case 'toggleFeatured':
          // Get current featured statuses
          const { data: featuredData } = await supabase
            .from("hotels")
            .select("id, featured")
            .in("id", hotelIds);
            
          if (!featuredData) return;
          
          // Update each hotel with the opposite featured status
          for (const hotel of featuredData) {
            await supabase
              .from("hotels")
              .update({ featured: !hotel.featured })
              .eq("id", hotel.id);
          }
          
          toast({
            title: "Hotels updated",
            description: `Featured status changed for ${hotelIds.length} hotels`,
          });
          break;
      }
      
      fetchHotels();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Error performing ${actionType}`,
        description: error.message,
      });
    }
  };
  
  const handleCloneHotel = async (hotel: Hotel) => {
    try {
      // Create a new name with (Copy) appended
      const newName = `${hotel.name} (Copy)`;
      const newSlug = `${hotel.slug}-copy-${Date.now().toString().slice(-4)}`;
      
      // Clone the hotel data
      const { data, error } = await supabase
        .from("hotels")
        .insert({
          name: newName,
          slug: newSlug,
          location: hotel.location,
          stars: hotel.stars,
          price_per_night: hotel.pricePerNight,
          image: hotel.image,
          description: hotel.description,
          amenities: hotel.amenities,
          featured: false, // Default to not featured for cloned hotels
          status: "inactive", // Default to inactive for review
          categories: hotel.categories || [],
          gallery: hotel.gallery || []
        })
        .select();
        
      if (error) throw error;
      
      if (data && data[0]?.id) {
        const newHotelId = data[0].id;
        
        // Clone the rooms if any
        if (hotel.rooms && hotel.rooms.length > 0) {
          const roomPromises = hotel.rooms.map(room => {
            return supabase.from("rooms").insert({
              hotel_id: newHotelId,
              type: room.type,
              capacity: room.capacity,
              price: room.price,
              count: room.count
            });
          });
          
          await Promise.all(roomPromises);
        }
        
        // Clone seasonal pricing if any
        if (hotel.seasonalPricing && hotel.seasonalPricing.length > 0) {
          const seasonalPromises = hotel.seasonalPricing.map(season => {
            // Using RPC to avoid type errors
            return supabase.rpc('insert_seasonal_pricing', {
              p_hotel_id: newHotelId,
              p_name: season.name,
              p_start_date: season.startDate,
              p_end_date: season.endDate,
              p_price_multiplier: season.priceMultiplier
            });
          });
          
          await Promise.all(seasonalPromises);
        }
      }
      
      toast({
        title: "Hotel cloned",
        description: `${hotel.name} has been successfully cloned as ${newName}`,
      });
      
      fetchHotels();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error cloning hotel",
        description: error.message,
      });
    }
  };

  return {
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedHotelId,
    handleAddHotel,
    handleDeleteHotel,
    confirmDelete,
    handleToggleStatus,
    handleToggleFeatured,
    handleBulkAction,
    handleCloneHotel
  };
};
