
import React, { createContext, useContext, useState } from "react";

interface BookingDetails {
  hotel?: {
    id: number;
    name: string;
    location: string;
    image: string;
  };
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  rooms?: number;
  totalPrice?: number;
}

interface BookingContextType {
  bookingDetails: BookingDetails;
  setBookingDetails: React.Dispatch<React.SetStateAction<BookingDetails>>;
  clearBookingDetails: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({});

  const clearBookingDetails = () => {
    setBookingDetails({});
  };

  return (
    <BookingContext.Provider
      value={{
        bookingDetails,
        setBookingDetails,
        clearBookingDetails,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
