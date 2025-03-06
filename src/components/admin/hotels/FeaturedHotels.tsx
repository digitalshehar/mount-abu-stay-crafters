
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Star, Trash } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

const FeaturedHotels = () => {
  const [featuredHotels, setFeaturedHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchFeaturedHotels = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('hotels')
        .select('id, name, location, image, price_per_night, featured')
        .eq('featured', true)
        .eq('status', 'active')
        .limit(5);

      if (error) throw error;
      setFeaturedHotels(data || []);
    } catch (error: any) {
      console.error('Error fetching featured hotels:', error.message);
      toast({
        variant: "destructive",
        title: "Error fetching hotels",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFeaturedStatus = async (id: number) => {
    try {
      const { error } = await supabase
        .from('hotels')
        .update({ featured: false })
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Hotel updated",
        description: "Hotel removed from featured list",
      });
      
      fetchFeaturedHotels();
    } catch (error: any) {
      console.error('Error updating hotel:', error.message);
      toast({
        variant: "destructive",
        title: "Error updating hotel",
        description: error.message,
      });
    }
  };

  useEffect(() => {
    fetchFeaturedHotels();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <Skeleton className="h-32 w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (featuredHotels.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-stone-500">No featured hotels. Mark hotels as featured from the Hotels management page.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.location.href = '/admin/hotels'}
          >
            Go to Hotels
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {featuredHotels.map((hotel) => (
        <Card key={hotel.id} className="overflow-hidden">
          <div className="h-32 relative">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-amber-500/80 text-white px-2 py-0.5 rounded-md text-xs">
              <Star size={12} className="fill-white" />
              <span>Featured</span>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{hotel.name}</h3>
                <p className="text-xs text-stone-500">{hotel.location}</p>
                <p className="text-sm mt-1">₹{hotel.price_per_night}/night</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFeaturedStatus(hotel.id)}
                title="Remove from featured"
              >
                <Trash size={16} className="text-red-500" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeaturedHotels;
