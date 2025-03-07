
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useHotelDetail = (hotelSlug: string | undefined) => {
  const [hotel, setHotel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nearbyAttractions, setNearbyAttractions] = useState([
    { name: "Nakki Lake", distance: "1.2 km", description: "A popular recreational spot offering boating and scenic views." },
    { name: "Sunset Point", distance: "2.5 km", description: "Perfect spot to enjoy beautiful sunsets over the hills of Mount Abu." },
    { name: "Dilwara Temples", distance: "3.8 km", description: "Famous Jain temples known for their stunning marble architecture." },
    { name: "Guru Shikhar", distance: "6.5 km", description: "The highest peak of Aravalli Range offering panoramic views of the surroundings." }
  ]);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!hotelSlug) {
          setError("Hotel slug is missing");
          setLoading(false);
          return;
        }

        console.log("Fetching hotel with slug:", hotelSlug);
        
        const { data: hotelData, error: hotelError } = await supabase
          .from('hotels')
          .select('*')
          .eq('slug', hotelSlug)
          .single();
        
        if (hotelError) {
          console.error("Error fetching hotel:", hotelError);
          setError(hotelError.message || "Failed to fetch hotel data");
          setHotel(null);
          setLoading(false);
          return;
        }

        if (!hotelData) {
          setError("Hotel not found");
          setHotel(null);
          setLoading(false);
          return;
        }
        
        console.log("Hotel data fetched:", hotelData);
        
        const { data: roomData, error: roomError } = await supabase
          .from('rooms')
          .select('*')
          .eq('hotel_id', hotelData.id);
        
        if (roomError) {
          console.error("Error fetching rooms:", roomError);
        }
        
        console.log("Room data fetched:", roomData);
        
        const formattedHotel = {
          id: hotelData.id,
          name: hotelData.name,
          slug: hotelData.slug,
          location: hotelData.location,
          description: hotelData.description || "",
          price: parseFloat(hotelData.price_per_night.toString()),
          stars: hotelData.stars,
          rating: parseFloat(hotelData.rating?.toString() || "0"),
          reviewCount: hotelData.review_count || 0,
          image: hotelData.image,
          images: [
            hotelData.image,
            "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1540304453527-62f979142a17?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3"
          ],
          amenities: hotelData.amenities || ["WiFi", "Breakfast", "TV", "Bathroom"],
          rooms: roomData ? roomData.map((room: any) => ({
            type: room.type,
            price: parseFloat(room.price.toString()),
            capacity: room.capacity
          })) : [],
          reviews: [
            { name: "Guest Review", rating: 4, comment: "Great hotel with excellent service." }
          ],
          checkInTime: "2:00 PM",
          checkOutTime: "12:00 PM",
          policies: [
            "No smoking in rooms", 
            "Pets not allowed", 
            "Free cancellation up to 48 hours before check-in", 
            "Extra bed available upon request (additional charges may apply)"
          ],
          contactInfo: {
            phone: "+91 2974 123456",
            email: "info@hotelmountabu.com",
            website: "www.hotelmountabu.com"
          },
          address: `${hotelData.location}, Mount Abu, Rajasthan, India`,
          landmarks: {
            airport: "Udaipur Airport (100 km)",
            busStation: "Mount Abu Bus Station (1.5 km)",
            cityCenter: "Mount Abu City Center (0.5 km)"
          }
        };
        
        setHotel(formattedHotel);
        
        document.title = `${formattedHotel.name} - HotelInMountAbu`;
      } catch (error: any) {
        console.error("Error in fetching hotel data:", error);
        setError(error.message || "An unexpected error occurred");
        setHotel(null);
      } finally {
        setLoading(false);
      }
    };

    if (hotelSlug) {
      fetchHotelData();
    }
  }, [hotelSlug]);

  return { hotel, loading, error, nearbyAttractions };
};
