import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Hotel, NewHotel, SeasonalPrice } from "@/components/admin/hotels/types";
import { useToast } from "@/hooks/use-toast";

export const useHotelOperations = (fetchHotels: () => Promise<void>) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState<number | null>(null);
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to add a new hotel
  const handleAddHotel = async (newHotel: NewHotel) => {
    setIsSubmitting(true);
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
        gallery: Array.isArray(newHotel.gallery) ? newHotel.gallery : [],
        categories: newHotel.categories,
        status: "active" as const
      };

      const { data, error } = await supabase
        .from("hotels")
        .insert(hotelData)
        .select();

      if (error) {
        console.error("Error adding hotel:", error);
        toast({
          variant: "destructive",
          title: "Failed to Add Hotel",
          description: "There was an error adding the hotel.",
        });
        return false;
      }

      const hotelId = data?.[0]?.id;

      // Add rooms
      if (hotelId && newHotel.rooms && newHotel.rooms.length > 0) {
        const roomsPromises = newHotel.rooms.map(room => {
          return supabase.from("rooms").insert({
            hotel_id: hotelId,
            type: room.type,
            capacity: room.capacity,
            price: room.price,
            count: room.count,
            images: room.images || []
          });
        });

        await Promise.all(roomsPromises);
      }

      // Add seasonal pricing
      if (hotelId && newHotel.seasonalPricing && newHotel.seasonalPricing.length > 0) {
        const seasonalPricingPromises = newHotel.seasonalPricing.map(price => {
          return supabase.from("seasonal_pricing").insert({
            hotel_id: hotelId,
            start_date: price.startDate,
            end_date: price.endDate,
            price: price.price
          });
        });

        await Promise.all(seasonalPricingPromises);
      }

      await fetchHotels();
      return true;
    } catch (error) {
      console.error("Error adding hotel:", error);
      toast({
        variant: "destructive",
        title: "Failed to Add Hotel",
        description: "There was an error adding the hotel.",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle editing an existing hotel
  const handleEditHotel = async (hotelId: number, hotel: NewHotel) => {
    setIsSubmitting(true);
    try {
      const slug = hotel.name.toLowerCase().replace(/\s+/g, "-");

      const hotelData = {
        name: hotel.name,
        slug: slug,
        location: hotel.location,
        stars: hotel.stars,
        price_per_night: hotel.pricePerNight,
        image: hotel.image,
        description: hotel.description,
        amenities: hotel.amenities,
        featured: hotel.featured,
        gallery: Array.isArray(hotel.gallery) ? hotel.gallery : [],
        categories: hotel.categories,
      };

      const { error } = await supabase
        .from("hotels")
        .update(hotelData)
        .eq("id", hotelId);

      if (error) {
        console.error("Error updating hotel:", error);
        toast({
          variant: "destructive",
          title: "Failed to Update Hotel",
          description: "There was an error updating the hotel.",
        });
        return false;
      }

      // Update rooms
      // First delete existing rooms
      await supabase
        .from("rooms")
        .delete()
        .eq("hotel_id", hotelId);

      // Then add the new/updated rooms
      const roomsPromises = hotel.rooms.map(room => {
        return supabase.from("rooms").insert({
          hotel_id: hotelId,
          type: room.type,
          capacity: room.capacity,
          price: room.price,
          count: room.count,
          images: room.images || []
        });
      });

      await Promise.all(roomsPromises);

      // Update seasonal pricing
      // First delete existing seasonal pricing
      await supabase
        .from("seasonal_pricing")
        .delete()
        .eq("hotel_id", hotelId);

      // Then add the new/updated seasonal pricing
      if (hotel.seasonalPricing && hotel.seasonalPricing.length > 0) {
        const seasonalPricingPromises = hotel.seasonalPricing.map(price => {
          return supabase.from("seasonal_pricing").insert({
            hotel_id: hotelId,
            start_date: price.startDate,
            end_date: price.endDate,
            price: price.price
          });
        });

        await Promise.all(seasonalPricingPromises);
      }

      return true;
    } catch (error) {
      console.error("Error updating hotel:", error);
      toast({
        variant: "destructive",
        title: "Failed to Update Hotel",
        description: "There was an error updating the hotel.",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle deleting a hotel
  const handleDeleteHotel = (id: number) => {
    setHotelToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  // Function to confirm the deletion of a hotel
  const confirmDelete = async () => {
    if (!hotelToDelete) return;

    try {
      // Delete seasonal pricing
      await supabase.rpc('bulk_delete_seasonal_pricing', {
        p_hotel_ids: [hotelToDelete]
      });

      // Delete rooms
      await supabase
        .from("rooms")
        .delete()
        .eq("hotel_id", hotelToDelete);

      // Delete hotel
      const { error } = await supabase
        .from("hotels")
        .delete()
        .eq("id", hotelToDelete);

      if (error) {
        console.error("Error deleting hotel:", error);
        toast({
          variant: "destructive",
          title: "Failed to Delete Hotel",
          description: "There was an error deleting the hotel.",
        });
        return;
      }

      await fetchHotels();
      toast({
        title: "Hotel Deleted",
        description: "The hotel has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting hotel:", error);
      toast({
        variant: "destructive",
        title: "Failed to Delete Hotel",
        description: "There was an error deleting the hotel.",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setHotelToDelete(null);
    }
  };

  // Function to toggle the status of a hotel
  const handleToggleStatus = async (id: number, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";

      const { error } = await supabase
        .from("hotels")
        .update({ status: newStatus as "active" | "inactive" })
        .eq("id", id);

      if (error) {
        console.error("Error toggling hotel status:", error);
        toast({
          variant: "destructive",
          title: "Failed to Toggle Status",
          description: "There was an error toggling the hotel status.",
        });
        return;
      }

      await fetchHotels();
      toast({
        title: "Hotel Status Updated",
        description: "The hotel status has been updated successfully.",
      });
    } catch (error) {
      console.error("Error toggling hotel status:", error);
      toast({
        variant: "destructive",
        title: "Failed to Toggle Status",
        description: "There was an error toggling the hotel status.",
      });
    }
  };

  // Function to toggle the featured status of a hotel
  const handleToggleFeatured = async (id: number, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from("hotels")
        .update({ featured: !currentValue })
        .eq("id", id);

      if (error) {
        console.error("Error toggling hotel featured status:", error);
        toast({
          variant: "destructive",
          title: "Failed to Toggle Featured",
          description: "There was an error toggling the hotel featured status.",
        });
        return;
      }

      await fetchHotels();
      toast({
        title: "Hotel Featured Status Updated",
        description: "The hotel featured status has been updated successfully.",
      });
    } catch (error) {
      console.error("Error toggling hotel featured status:", error);
      toast({
        variant: "destructive",
        title: "Failed to Toggle Featured",
        description: "There was an error toggling the hotel featured status.",
      });
    }
  };

  // Function to handle bulk actions on selected hotels
  const handleBulkAction = async (actionType: string, hotelIds: number[]) => {
    if (hotelIds.length === 0) return;

    try {
      switch (actionType) {
        case 'delete':
          // Delete seasonal pricing
          await supabase.rpc('bulk_delete_seasonal_pricing', {
            p_hotel_ids: hotelIds
          });

          // Delete rooms
          await supabase
            .from("rooms")
            .delete()
            .in("hotel_id", hotelIds);

          // Delete hotels
          const { error: deleteError } = await supabase
            .from("hotels")
            .delete()
            .in("id", hotelIds);

          if (deleteError) {
            console.error("Error bulk deleting hotels:", deleteError);
            toast({
              variant: "destructive",
              title: "Failed to Bulk Delete Hotels",
              description: "There was an error deleting the selected hotels.",
            });
            return;
          }
          toast({
            title: "Hotels Deleted",
            description: "The selected hotels have been deleted successfully.",
          });
          break;

        case 'toggleStatus':
          // Fetch current statuses
          const { data: currentHotels, error: fetchError } = await supabase
            .from('hotels')
            .select('id, status')
            .in('id', hotelIds);

          if (fetchError) {
            console.error("Error fetching hotel statuses:", fetchError);
            toast({
              variant: "destructive",
              title: "Failed to Bulk Toggle Status",
              description: "There was an error fetching the hotel statuses.",
            });
            return;
          }

          // Determine new statuses
          const updates = currentHotels.map(hotel => ({
            id: hotel.id,
            status: hotel.status === 'active' ? 'inactive' : 'active'
          }));

          // Bulk update statuses
          const { error: updateError } = await supabase
            .from('hotels')
            .upsert(updates);

          if (updateError) {
            console.error("Error bulk updating hotel statuses:", updateError);
            toast({
              variant: "destructive",
              title: "Failed to Bulk Toggle Status",
              description: "There was an error updating the hotel statuses.",
            });
            return;
          }
          toast({
            title: "Hotel Statuses Updated",
            description: "The selected hotel statuses have been updated successfully.",
          });
          break;

        case 'toggleFeatured':
          // Fetch current featured statuses
          const { data: currentFeaturedHotels, error: fetchFeaturedError } = await supabase
            .from('hotels')
            .select('id, featured')
            .in('id', hotelIds);

          if (fetchFeaturedError) {
            console.error("Error fetching hotel featured statuses:", fetchFeaturedError);
            toast({
              variant: "destructive",
              title: "Failed to Bulk Toggle Featured",
              description: "There was an error fetching the hotel featured statuses.",
            });
            return;
          }

          // Determine new featured statuses
          const featuredUpdates = currentFeaturedHotels.map(hotel => ({
            id: hotel.id,
            featured: !hotel.featured
          }));

          // Bulk update featured statuses
          const { error: updateFeaturedError } = await supabase
            .from('hotels')
            .upsert(featuredUpdates);

          if (updateFeaturedError) {
            console.error("Error bulk updating hotel featured statuses:", updateFeaturedError);
            toast({
              variant: "destructive",
              title: "Failed to Bulk Toggle Featured",
              description: "There was an error updating the hotel featured statuses.",
            });
            return;
          }
          toast({
            title: "Hotel Featured Statuses Updated",
            description: "The selected hotel featured statuses have been updated successfully.",
          });
          break;

        default:
          console.warn("Unknown bulk action type:", actionType);
          return;
      }

      await fetchHotels();
    } catch (error) {
      console.error("Error performing bulk action:", error);
      toast({
        variant: "destructive",
        title: "Failed to Perform Bulk Action",
        description: "There was an error performing the bulk action.",
      });
    }
  };

  const handleCloneHotel = async (hotel: Hotel) => {
    setIsSubmitting(true);
    try {
      // Prepare the data for cloning
      const { id, slug, ...hotelData } = hotel;
      const newSlug = `${hotelData.name.toLowerCase().replace(/\s+/g, "-")}-clone`;

      const newHotelData = {
        ...hotelData,
        slug: newSlug,
        name: `${hotelData.name} (Clone)`
      };

      // Insert the cloned hotel
      const { data, error } = await supabase
        .from("hotels")
        .insert([newHotelData])
        .select();

      if (error) {
        console.error("Error cloning hotel:", error);
        toast({
          variant: "destructive",
          title: "Failed to Clone Hotel",
          description: "There was an error cloning the hotel.",
        });
        return;
      }

      const newHotelId = data?.[0]?.id;

      // Clone the rooms
      if (hotel.rooms && hotel.rooms.length > 0) {
        const newRooms = hotel.rooms.map(room => ({
          hotel_id: newHotelId,
          type: room.type,
          capacity: room.capacity,
          price: room.price,
          count: room.count,
          images: room.images || []
        }));

        const { error: roomsError } = await supabase
          .from("rooms")
          .insert(newRooms);

        if (roomsError) {
          console.error("Error cloning hotel rooms:", roomsError);
          toast({
            variant: "destructive",
            title: "Failed to Clone Hotel Rooms",
            description: "There was an error cloning the hotel rooms.",
          });
          return;
        }
      }

      // Clone the seasonal pricing
      const { data: seasonalPricing, error: seasonalPricingError } = await supabase
        .from("seasonal_pricing")
        .select('*')
        .eq('hotel_id', hotel.id);

      if (seasonalPricingError) {
        console.error("Error fetching seasonal pricing:", seasonalPricingError);
        toast({
          variant: "destructive",
          title: "Failed to Fetch Seasonal Pricing",
          description: "There was an error fetching the seasonal pricing.",
        });
        return;
      }

      if (seasonalPricing && seasonalPricing.length > 0) {
        const newSeasonalPricing = seasonalPricing.map(price => ({
          hotel_id: newHotelId,
          start_date: price.start_date,
          end_date: price.end_date,
          price: price.price
        }));

        const { error: newSeasonalPricingError } = await supabase
          .from("seasonal_pricing")
          .insert(newSeasonalPricing);

        if (newSeasonalPricingError) {
          console.error("Error cloning seasonal pricing:", newSeasonalPricingError);
          toast({
            variant: "destructive",
            title: "Failed to Clone Seasonal Pricing",
            description: "There was an error cloning the seasonal pricing.",
          });
          return;
        }
      }

      await fetchHotels();
      toast({
        title: "Hotel Cloned",
        description: "The hotel has been cloned successfully.",
      });
    } catch (error) {
      console.error("Error cloning hotel:", error);
      toast({
        variant: "destructive",
        title: "Failed to Clone Hotel",
        description: "There was an error cloning the hotel.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleAddHotel,
    handleEditHotel,
    handleDeleteHotel,
    confirmDelete,
    handleToggleStatus,
    handleToggleFeatured,
    handleBulkAction,
    handleCloneHotel,
    isSubmitting
  };
};
