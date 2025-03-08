
import { supabase } from "@/integrations/supabase/client";
import { Hotel, HotelVersion } from "@/components/admin/hotels/types";

export const addHotelVersion = async (hotel: Hotel, userId: string, userName: string) => {
  const { data, error } = await supabase
    .from('hotel_versions')
    .insert({
      hotel_id: hotel.id,
      version_data: hotel,
      created_by: userId,
      created_by_name: userName
    })
    .select();

  if (error) throw error;
  return data;
};

export const getHotelVersions = async (hotelId: number) => {
  const { data, error } = await supabase
    .from('hotel_versions')
    .select('*')
    .eq('hotel_id', hotelId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  
  return data.map(version => ({
    id: version.id,
    hotelId: version.hotel_id,
    versionData: version.version_data as Hotel,
    createdAt: version.created_at,
    createdBy: version.created_by_name
  }));
};

export const restoreHotelVersion = async (versionId: number, userId: string, userName: string) => {
  // First get the version data
  const { data: versionData, error: versionError } = await supabase
    .from('hotel_versions')
    .select('*')
    .eq('id', versionId)
    .single();

  if (versionError) throw versionError;
  
  const hotelVersion = versionData.version_data as Hotel;
  const hotelId = versionData.hotel_id;
  
  // Prepare data for update
  const updateData = {
    name: hotelVersion.name,
    location: hotelVersion.location,
    stars: hotelVersion.stars,
    price_per_night: hotelVersion.pricePerNight,
    image: hotelVersion.image,
    description: hotelVersion.description,
    amenities: hotelVersion.amenities,
    featured: hotelVersion.featured,
    gallery: hotelVersion.gallery,
    categories: hotelVersion.categories,
    last_modified_by: userName,
    last_modified_at: new Date().toISOString()
  };
  
  // Update the hotel
  const { data, error } = await supabase
    .from('hotels')
    .update(updateData)
    .eq('id', hotelId)
    .select();

  if (error) throw error;
  
  // Log the restore action
  await supabase
    .from('audit_logs')
    .insert({
      entity_type: 'hotel',
      entity_id: hotelId,
      action: 'update',
      details: `Restored from version ${versionId}`,
      user_id: userId,
      user_name: userName
    });
  
  return data;
};
