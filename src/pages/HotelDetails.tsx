
import React from 'react';
import { useParams } from 'react-router-dom';

const HotelDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Hotel Details: {slug}</h1>
      <p className="text-lg">Detailed information about this hotel will be displayed here.</p>
    </div>
  );
};

export default HotelDetails;
