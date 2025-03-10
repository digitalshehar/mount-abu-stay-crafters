
import React from 'react';

const NoBookingsFound: React.FC = () => {
  return (
    <div className="text-center py-12 border rounded-lg">
      <h3 className="text-lg font-semibold">No bookings found</h3>
      <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
    </div>
  );
};

export default NoBookingsFound;
