
// This file re-exports all hotel services for backward compatibility
import * as baseHotelService from "./hotelManagement/baseHotelService";
import * as seasonalPricingService from "./hotelManagement/seasonalPricingService";
import * as bulkOperationsService from "./hotelManagement/bulkOperationsService";
import * as hotelCloneService from "./hotelManagement/hotelCloneService";

// Re-export all services for backward compatibility
export const {
  addHotel,
  addRooms,
  deleteHotel,
  updateHotelStatus,
  updateHotelFeatured
} = baseHotelService;

export const {
  addSeasonalPricing,
  getSeasonalPricing,
  updateSeasonalPricing,
  deleteSeasonalPricing
} = seasonalPricingService;

export const {
  bulkDeleteHotels,
  bulkToggleStatus,
  bulkToggleFeatured
} = bulkOperationsService;

export const {
  cloneHotel
} = hotelCloneService;
