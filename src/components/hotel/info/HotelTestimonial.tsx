
import React from "react";

interface HotelTestimonialProps {
  name: string;
  location: string;
}

const HotelTestimonial = ({ name, location }: HotelTestimonialProps) => {
  return (
    <div className="bg-primary/5 p-6 rounded-xl">
      <h3 className="font-semibold mb-3">Guest Testimonial</h3>
      <p className="text-stone-600 italic">
        "{name} exceeded our expectations in every way. The staff was incredibly attentive, 
        the rooms were spotless, and the location couldn't be more perfect. 
        We especially enjoyed the beautiful views from our room and the delicious breakfast. 
        We'll definitely be coming back on our next visit to {location}."
      </p>
      <p className="text-right mt-3 text-sm font-medium">- Recent Guest</p>
    </div>
  );
};

export default HotelTestimonial;
