
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CarRental } from "@/integrations/supabase/custom-types";
import { useToast } from "@/hooks/use-toast";

const CarRentalDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [car, setCar] = useState<CarRental | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      setIsLoading(true);
      try {
        // Convert id from string to number
        const carId = parseInt(id || '0', 10);
        
        const { data, error } = await supabase
          .from('car_rentals')
          .select('*')
          .eq('id', carId)
          .single();

        if (error) throw error;

        if (data) {
          // Ensure status is one of the accepted values
          let carStatus: 'available' | 'booked' | 'maintenance' = 'available';
          
          if (data.status === 'booked' || data.status === 'maintenance') {
            carStatus = data.status;
          }
          
          setCar({
            id: data.id,
            name: data.name,
            type: data.type,
            capacity: data.capacity,
            transmission: data.transmission,
            price: parseFloat(data.price.toString()),
            image: data.image,
            bookings: data.bookings || 0,
            status: carStatus,
            description: data.description
          });
        }
      } catch (error) {
        console.error("Error fetching car:", error);
        toast({
          title: "Error",
          description: "Failed to load car details. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCar();
    }
  }, [id, toast]);

  // Display loading state or error handling as needed
  if (isLoading) {
    return <div>Loading car details...</div>;
  }

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div>
      <h1>{car.name}</h1>
      {/* Add more details here */}
    </div>
  );
};

export default CarRentalDetail;
