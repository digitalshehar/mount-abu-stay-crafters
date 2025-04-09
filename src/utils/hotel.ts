
import { format } from 'date-fns';
import { Hotel } from '@/types';

// Generate SEO-friendly hotel description
export const generateHotelDescription = (hotel: Hotel): string => {
  const { name, location, stars, amenities = [] } = hotel;
  const starsText = stars ? `${stars}-star` : 'luxury';
  const amenitiesText = amenities.length > 0 
    ? `featuring ${amenities.slice(0, 3).join(', ')}`
    : 'with modern amenities';
    
  return `Book your stay at ${name}, a ${starsText} hotel in ${location}, ${amenitiesText}. Best rates guaranteed, book direct for exclusive offers.`;
};

// Generate structured data for SEO
export const generateHotelSchema = (hotel: Hotel, url: string) => {
  const { 
    name, 
    description, 
    image, 
    pricePerNight, 
    price,
    rating, 
    reviewCount,
    stars,
    location
  } = hotel;
  
  return {
    "@context": "https://schema.org/",
    "@type": "Hotel",
    "name": name,
    "description": description || generateHotelDescription(hotel),
    "starRating": {
      "@type": "Rating",
      "ratingValue": stars || 3
    },
    "image": image,
    "url": url,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location,
      "addressRegion": "Rajasthan",
      "addressCountry": "IN"
    },
    "aggregateRating": rating ? {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "reviewCount": reviewCount || 5
    } : undefined,
    "priceRange": `₹${pricePerNight || price || 3000}-₹${(pricePerNight || price || 3000) * 1.5}`,
    "telephone": hotel.contactInfo?.phone || "+91-123-456-7890"
  };
};

// Format price with currency symbol
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

// Get season based on date
export const getSeason = (date: Date): 'peak' | 'high' | 'low' => {
  const month = date.getMonth();
  
  // Peak season: December to February (winter)
  if (month >= 11 || month <= 1) {
    return 'peak';
  }
  // High season: September to November & March to May
  else if ((month >= 8 && month <= 10) || (month >= 2 && month <= 4)) {
    return 'high';
  }
  // Low season: June to August (summer)
  else {
    return 'low';
  }
};

// Get price multiplier based on season
export const getSeasonalMultiplier = (date: Date): number => {
  const season = getSeason(date);
  switch (season) {
    case 'peak': return 1.3;
    case 'high': return 1.1;
    case 'low': return 0.9;
    default: return 1.0;
  }
};

// Calculate price for specific dates
export const calculatePriceForDates = (
  basePrice: number, 
  checkIn: Date, 
  checkOut: Date
): { 
  nightlyPrices: { date: string, price: number }[], 
  totalPrice: number, 
  averagePrice: number 
} => {
  const nightlyPrices = [];
  let totalPrice = 0;
  
  // Calculate number of nights
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  
  // Calculate price for each night
  for (let i = 0; i < nights; i++) {
    const currentDate = new Date(checkIn);
    currentDate.setDate(currentDate.getDate() + i);
    
    // Apply seasonal pricing
    const seasonalMultiplier = getSeasonalMultiplier(currentDate);
    
    // Weekend pricing (Friday and Saturday)
    const dayOfWeek = currentDate.getDay();
    const weekendMultiplier = (dayOfWeek === 5 || dayOfWeek === 6) ? 1.2 : 1.0;
    
    // Calculate final price for this night
    const nightPrice = Math.round(basePrice * seasonalMultiplier * weekendMultiplier);
    totalPrice += nightPrice;
    
    nightlyPrices.push({
      date: format(currentDate, 'MMM dd, yyyy'),
      price: nightPrice
    });
  }
  
  return {
    nightlyPrices,
    totalPrice,
    averagePrice: Math.round(totalPrice / nights)
  };
};
