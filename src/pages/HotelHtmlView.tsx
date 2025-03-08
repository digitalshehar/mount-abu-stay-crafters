
import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useHotelDetail } from "@/hooks/useHotelDetail";

const HotelHtmlView = () => {
  const { hotelSlug } = useParams<{ hotelSlug: string }>();
  const [searchParams] = useSearchParams();
  const { hotel, loading, error } = useHotelDetail(hotelSlug);

  useEffect(() => {
    // Set the HTML title
    if (hotel) {
      document.title = `${hotel.name} - HTML View`;
    }
  }, [hotel]);

  if (loading) {
    return <div>Loading hotel information...</div>;
  }

  if (error || !hotel) {
    return <div>Error loading hotel: {error || "Hotel not found"}</div>;
  }

  // Create a printable HTML version
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="text-right mb-4">
        <button 
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Print
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-4">{hotel.name}</h1>
      
      <div className="mb-4">
        <strong>Location:</strong> {hotel.location}
      </div>
      
      <div className="mb-4">
        <strong>Rating:</strong> {hotel.stars} Stars 
        {hotel.rating && (
          <span> | {hotel.rating}/5 ({hotel.reviewCount} reviews)</span>
        )}
      </div>

      <div className="mb-4">
        <strong>Price:</strong> ₹{hotel.price} per night
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p>{hotel.description}</p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Amenities</h2>
        <ul className="list-disc pl-5">
          {hotel.amenities.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Available Rooms</h2>
        {hotel.rooms && hotel.rooms.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Room Type</th>
                <th className="border border-gray-300 p-2 text-left">Capacity</th>
                <th className="border border-gray-300 p-2 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {hotel.rooms.map((room, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{room.type}</td>
                  <td className="border border-gray-300 p-2">{room.capacity} Person(s)</td>
                  <td className="border border-gray-300 p-2">₹{room.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No room information available</p>
        )}
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Hotel Policies</h2>
        <div className="mb-2">
          <strong>Check-in:</strong> {hotel.checkInTime}
        </div>
        <div className="mb-2">
          <strong>Check-out:</strong> {hotel.checkOutTime}
        </div>
        <ul className="list-disc pl-5">
          {hotel.policies && hotel.policies.map((policy, index) => (
            <li key={index}>{policy}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        {hotel.contactInfo && (
          <>
            <div><strong>Phone:</strong> {hotel.contactInfo.phone}</div>
            <div><strong>Email:</strong> {hotel.contactInfo.email}</div>
            <div><strong>Website:</strong> {hotel.contactInfo.website}</div>
          </>
        )}
        <div className="mt-2"><strong>Address:</strong> {hotel.address}</div>
      </div>
      
      <div className="text-sm text-gray-500 mt-8 pt-4 border-t border-gray-300">
        <p>This information was generated from HotelInMountAbu.com on {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default HotelHtmlView;
