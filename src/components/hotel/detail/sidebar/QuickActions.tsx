
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface QuickActionsProps {
  hotel: any;
  onSelectRooms: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ hotel, onSelectRooms }) => {
  const navigate = useNavigate();
  
  const handleAskQuestion = () => {
    toast.info("Question form", {
      description: "Please navigate to the rooms tab to ask your questions."
    });
    onSelectRooms();
  };
  
  const handleBookTransportation = () => {
    navigate(`/hotel/${hotel.slug}?tab=transport`);
  };
  
  const handleViewLocalEvents = () => {
    navigate(`/hotel/${hotel.slug}?tab=events`);
  };
  
  const handleViewAccessibility = () => {
    navigate(`/hotel/${hotel.slug}?tab=accessibility`);
  };

  return (
    <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <MessageCircle className="h-5 w-5 text-primary mr-2" />
        <h3 className="font-semibold text-lg">Quick Actions</h3>
      </div>
      <div className="space-y-3">
        <Button 
          variant="outline" 
          className="w-full justify-start text-left"
          onClick={handleAskQuestion}
        >
          Ask a Question
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start text-left"
          onClick={handleBookTransportation}
        >
          Book Transportation
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start text-left"
          onClick={handleViewLocalEvents}
        >
          Explore Local Events
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start text-left"
          onClick={handleViewAccessibility}
        >
          View Accessibility Features
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
