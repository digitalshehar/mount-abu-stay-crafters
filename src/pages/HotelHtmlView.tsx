
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHotelDetail } from "@/hooks/useHotelDetail";

const HotelHtmlView = () => {
  const { hotelSlug } = useParams<{ hotelSlug: string }>();
  const { hotel, loading, error } = useHotelDetail(hotelSlug);

  useEffect(() => {
    // Set the HTML title
    if (hotel) {
      document.title = `${hotel.name} - ${hotel.location} | Book Now`;
    }
  }, [hotel]);

  if (loading) {
    return <div>Loading hotel information...</div>;
  }

  if (error || !hotel) {
    return <div>Error loading hotel: {error || "Hotel not found"}</div>;
  }

  // Create SEO-friendly HTML version with Schema.org structured data
  return (
    <div className="hotel-html-view">
      {/* Add structured data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ 
        __html: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Hotel",
          "name": hotel.name,
          "description": hotel.description,
          "url": window.location.href,
          "image": hotel.image,
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "Rajasthan",
            "addressCountry": "India",
            "addressLocality": hotel.location
          },
          "starRating": {
            "@type": "Rating",
            "ratingValue": hotel.stars
          },
          "aggregateRating": hotel.rating ? {
            "@type": "AggregateRating",
            "ratingValue": hotel.rating,
            "reviewCount": hotel.reviewCount
          } : undefined,
          "priceRange": `₹${hotel.price} per night`,
          "telephone": hotel.contactInfo?.phone
        })
      }} />

      <h1>{hotel.name}</h1>
      <div className="hotel-location">{hotel.location}, Mount Abu, Rajasthan, India</div>
      
      <meta name="description" content={`Book ${hotel.name} in ${hotel.location}. ${hotel.stars} star accommodation with best rates and amenities. Book directly for best price guaranteed.`} />
      <meta name="keywords" content={`${hotel.name}, hotel in ${hotel.location}, Mount Abu hotels, Rajasthan hotels, ${hotel.stars} star hotel, hotel booking`} />
      
      {/* Hidden content for SEO */}
      <div style={{ display: "none" }}>
        <p>{hotel.description}</p>
        <h2>Amenities at {hotel.name}</h2>
        <ul>
          {hotel.amenities.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
        <h2>Rooms at {hotel.name}</h2>
        <ul>
          {hotel.rooms && hotel.rooms.map((room, index) => (
            <li key={index}>{room.type} - ₹{room.price} per night</li>
          ))}
        </ul>
      </div>
      
      {/* Redirect to main hotel page - improves user experience while preserving SEO value */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            setTimeout(function() {
              window.location.href = "/hotel/${hotelSlug}";
            }, 100);
          `
        }}
      />
    </div>
  );
};

export default HotelHtmlView;
