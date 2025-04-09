
import { Hotel } from '@/components/admin/hotels/types';

// Generate a description for hotel SEO
export const generateHotelDescription = (hotel: Hotel): string => {
  const amenities = hotel.amenities?.slice(0, 3).join(', ') || '';
  return `Experience luxury at ${hotel.name}, a ${hotel.stars}-star hotel in ${hotel.location}. Enjoy comfortable rooms, ${amenities}, and exceptional services. Book your stay at the best rates.`;
};

// Generate JSON-LD schema markup for hotel
export const generateHotelSchema = (hotel: Hotel, url: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": hotel.name,
    "description": hotel.description,
    "url": url,
    "image": hotel.image,
    "priceRange": `₹${hotel.pricePerNight} - ₹${Math.floor(hotel.pricePerNight * 2)}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": hotel.location,
      "addressRegion": "Rajasthan",
      "addressCountry": "IN"
    },
    "telephone": "+91 2974 123456",
    "starRating": {
      "@type": "Rating",
      "ratingValue": hotel.stars
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": hotel.rating,
      "reviewCount": hotel.reviewCount
    }
  };
};

// Format currency in INR
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// Check if a hotel is on sale
export const isHotelOnSale = (hotel: Hotel): boolean => {
  return hotel.featured === true;
};

// Calculate discount percentage
export const calculateDiscount = (originalPrice: number, discountedPrice: number): number => {
  if (!originalPrice || !discountedPrice) return 0;
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.round(discount);
};

// Generate a URL-friendly slug from hotel name
export const generateHotelSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
