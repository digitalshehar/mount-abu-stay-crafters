
export const generateHotelDescription = (hotel: any) => {
  if (!hotel) return "";
  
  return `Experience luxury at ${hotel.name}, a ${hotel.stars}-star hotel in ${hotel.location}. Enjoy amenities like ${hotel.amenities.slice(0, 3).join(', ')} and more. Book now starting from ₹${hotel.price} per night.`;
};

export const generateHotelSchema = (hotel: any, currentUrl: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": hotel.name,
    "description": hotel.description,
    "url": currentUrl,
    "image": hotel.image,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": hotel.location,
      "addressLocality": "Mount Abu",
      "addressRegion": "Rajasthan",
      "addressCountry": "IN"
    },
    "telephone": hotel.contactInfo?.phone,
    "starRating": {
      "@type": "Rating",
      "ratingValue": hotel.stars
    },
    "aggregateRating": hotel.rating > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": hotel.rating,
      "reviewCount": hotel.reviewCount
    } : undefined,
    "priceRange": `₹${hotel.price} - ₹${hotel.price * 2}`,
    "amenityFeature": hotel.amenities.map((amenity: string) => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity
    }))
  };
};

// Add the missing formatCurrency function
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
