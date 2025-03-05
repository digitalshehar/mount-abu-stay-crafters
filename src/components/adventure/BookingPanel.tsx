
import React, { useState } from "react";
import { Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Adventure } from "@/integrations/supabase/custom-types";

interface BookingPanelProps {
  adventure: Adventure;
}

const BookingPanel: React.FC<BookingPanelProps> = ({ adventure }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [numParticipants, setNumParticipants] = useState("2");
  const { toast } = useToast();

  // Generate dates for the next 30 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        weekday: 'short'
      }).format(date);
      
      dates.push({ value: dateString, label: formattedDate });
    }
    
    return dates;
  };

  const handleBookNow = () => {
    if (!selectedDate) {
      toast({
        title: "Please select a date",
        description: "You must select a date for your adventure.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Booking successful!",
      description: `Your ${adventure?.name} adventure has been booked for ${selectedDate} with ${numParticipants} participants.`,
    });
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-md p-6 border border-stone-100 sticky top-24">
        <h2 className="text-2xl font-display font-semibold mb-2">Book This Adventure</h2>
        <p className="text-2xl font-bold text-primary mb-6">₹{adventure.price.toLocaleString()}<span className="text-sm font-normal text-stone-500">/person</span></p>
        
        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-stone-600 mb-1">Select Date</label>
            <select
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
            >
              <option value="">Select a date</option>
              {generateDates().map((date) => (
                <option key={date.value} value={date.value}>
                  {date.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="participants" className="block text-sm font-medium text-stone-600 mb-1">Number of Participants</label>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
              <select
                id="participants"
                value={numParticipants}
                onChange={(e) => setNumParticipants(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num.toString()}>
                    {num} {num === 1 ? 'Person' : 'People'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="text-stone-600">Adventure price</span>
            <span>₹{adventure.price.toLocaleString()} × {numParticipants}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-600">Taxes & fees</span>
            <span>₹{Math.round(adventure.price * parseInt(numParticipants) * 0.05).toLocaleString()}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{(adventure.price * parseInt(numParticipants) + Math.round(adventure.price * parseInt(numParticipants) * 0.05)).toLocaleString()}</span>
          </div>
        </div>
        
        <Button className="w-full" size="lg" onClick={handleBookNow}>
          Book Now
        </Button>
        
        <div className="mt-4 text-sm text-stone-500">
          <p className="flex items-center mb-1">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Free cancellation {adventure.cancellationPolicy}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingPanel;
